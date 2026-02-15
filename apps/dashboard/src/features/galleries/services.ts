import type { Tables } from "@workspace/supabase/database.types";
import { supabase } from "@/lib/supabase";
import { ApiError } from "@/shared/lib/api-error";
import { generateFilePath } from "@/shared/lib/utils/generate-file-path";
import { getPublicImageUrl } from "@/shared/lib/utils/get-public-image-url";
import type {
	Meta,
	SuccessResponse,
	SuccessResponseWithData,
	SuccessResponseWithMeta,
} from "@/shared/types/api";
import type {
	AddGalleryFormValues as AddGalleryPayload,
	EditGalleryFormValues as EditGalleryPayload,
} from "./schemas";

type GalleryDB = Omit<
	Tables<"galleries">,
	"category_id" | "created_at" | "updated_at"
> & {
	category: Pick<Tables<"categories">, "id" | "name" | "type">;
	images: {
		id: string;
		image_path: string | null;
	}[];
};

export type Gallery = Omit<
	Tables<"galleries">,
	"category_id" | "created_at" | "updated_at"
> & {
	category: Pick<Tables<"categories">, "id" | "name" | "type">;
	images: {
		id: string;
		image_url: string | null;
	}[];
};

export type GetAllGalleriesParams = {
	page?: number;
	limit?: number;
	name?: string;
};

const BUCKET_NAME = "galleries";

export async function getAllGalleries(
	params?: GetAllGalleriesParams,
): Promise<SuccessResponseWithMeta<Gallery[], Meta>> {
	const { page, limit, name } = params || {};

	let query = supabase.from("galleries").select(
		`
		id,
		title,
		slug,
		description,
		activity_date,
		category:categories(id, name, type),
		images:gallery_images(id, image_path)
		`,
		{ count: "exact" },
	);

	if (name) {
		query = query.ilike("title", `%${name}%`);
	}

	let data: GalleryDB[] = [];
	let count = 0;

	if (page && limit) {
		const offset = (page - 1) * limit;
		const {
			data: paginatedData,
			error,
			count: countData,
		} = await query.range(offset, offset + limit - 1);

		if (error) throw new ApiError(error.message, error.code);

		data = paginatedData ?? [];
		count = countData ?? 0;
	} else {
		const { data: allData, error, count: allCount } = await query;

		if (error) throw new ApiError(error.message, error.code);

		data = allData ?? [];
		count = allCount ?? 0;
	}

	const galleries: Gallery[] = data.map((gallery: GalleryDB) => ({
		...gallery,
		images: gallery.images.map((image) => ({
			id: image.id,
			image_url: getPublicImageUrl(BUCKET_NAME, image.image_path),
		})),
	}));

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data: galleries,
		meta: {
			totalPages: page && limit ? Math.ceil(count / limit) : 1,
			currentPage: page || 1,
			pageSize: limit || 10,
		},
	};
}

export const getGalleryDetailBySlug = async (
	slug: string,
): Promise<SuccessResponseWithData<Gallery>> => {
	const { data, error } = await supabase
		.from("galleries")
		.select(
			`
			id,
			title,
			slug,
			description,
			activity_date,
			category:categories(id, name, type),
			images:gallery_images(id, image_path)
			`,
		)
		.eq("slug", slug)
		.single();

	if (error) {
		if (error.code === "PGRST116")
			throw new ApiError("Data tidak ditemukan.", error.code);

		throw new ApiError(error.message, error.code);
	}

	const images: Gallery["images"] = data.images.map((image) => ({
		id: image.id,
		image_url: getPublicImageUrl(BUCKET_NAME, image.image_path),
	}));

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data: {
			id: data.id,
			title: data.title,
			slug: data.slug,
			description: data.description,
			activity_date: data.activity_date,
			category: data.category,
			images,
		},
	};
};

export async function addNewGallery(
	payload: AddGalleryPayload,
): Promise<SuccessResponse> {
	const { title, slug, description, category_id, activity_date, images } =
		payload;

	const { data: gallery, error: galleryError } = await supabase
		.from("galleries")
		.insert({
			title,
			slug,
			description,
			category_id,
			activity_date,
		})
		.select("id")
		.single();

	if (galleryError || !gallery) {
		throw new ApiError(
			galleryError?.message ?? "Gagal menambahkan galeri.",
			galleryError?.code,
		);
	}

	const galleryId = gallery.id;

	const uploadedPaths: string[] = [];

	try {
		const uploadResults = await Promise.all(
			images.map(async (file) => {
				const filePath = generateFilePath(file);

				const { error } = await supabase.storage
					.from(BUCKET_NAME)
					.upload(filePath, file);

				if (error) throw error;

				uploadedPaths.push(filePath);
				return filePath;
			}),
		);

		const { error: imageInsertError } = await supabase
			.from("gallery_images")
			.insert(
				uploadResults.map((path) => ({
					gallery_id: galleryId,
					image_path: path,
				})),
			);

		if (imageInsertError) throw imageInsertError;
	} catch (error) {
		await Promise.all(
			uploadedPaths.map((path) =>
				supabase.storage.from(BUCKET_NAME).remove([path]),
			),
		);

		await supabase.from("galleries").delete().eq("id", galleryId);

		if (error instanceof Error) {
			throw new ApiError(
				error.message ?? "Gagal upload gambar galeri.",
				error.name,
			);
		}

		throw new ApiError("Gagal upload gambar galeri.");
	}

	return {
		success: true,
		message: "Galeri baru berhasil ditambahkan.",
	};
}

export async function updateGalleryBySlug(
	slug: string,
	payload: EditGalleryPayload,
): Promise<SuccessResponse> {
	const {
		title,
		description,
		category_id,
		activity_date,
		added_images = [],
		deleted_image_ids = [],
	} = payload;

	// Update gallery metadata
	const { data: gallery, error: updateError } = await supabase
		.from("galleries")
		.update({
			title,
			slug: payload.slug,
			description,
			category_id,
			activity_date,
		})
		.eq("slug", slug)
		.select("id")
		.single();

	if (updateError) {
		throw new ApiError(updateError.message, updateError.code);
	}

	// Delete images (DB + Storage)
	if (deleted_image_ids.length > 0) {
		// Get image paths first
		const { data: imagesToDelete, error: fetchError } = await supabase
			.from("gallery_images")
			.select("id, image_path")
			.eq("gallery_id", gallery.id)
			.in("id", deleted_image_ids);

		if (fetchError) {
			throw new ApiError(fetchError.message, fetchError.code);
		}

		if (imagesToDelete && imagesToDelete.length > 0) {
			// Remove from storage
			await supabase.storage
				.from(BUCKET_NAME)
				.remove(imagesToDelete.map((img) => img.image_path) as string[]);

			// Remove DB records
			const { error: deleteError } = await supabase
				.from("gallery_images")
				.delete()
				.in("id", deleted_image_ids);

			if (deleteError) {
				throw new ApiError(deleteError.message, deleteError.code);
			}
		}
	}

	const uploadedPaths: string[] = [];

	try {
		if (added_images.length > 0) {
			const uploadResults = await Promise.all(
				added_images.map(async (file) => {
					const filePath = generateFilePath(file);

					const { error } = await supabase.storage
						.from(BUCKET_NAME)
						.upload(filePath, file);

					if (error) throw error;

					uploadedPaths.push(filePath);
					return filePath;
				}),
			);

			// Insert image records
			const { error: insertError } = await supabase
				.from("gallery_images")
				.insert(
					uploadResults.map((path) => ({
						gallery_id: gallery.id,
						image_path: path,
					})),
				);

			if (insertError) throw insertError;
		}
	} catch (error) {
		// Rollback newly uploaded images
		if (uploadedPaths.length > 0) {
			await supabase.storage.from(BUCKET_NAME).remove(uploadedPaths);
		}

		if (error instanceof Error) {
			throw new ApiError(
				error.message ?? "Gagal memperbarui gambar galeri.",
				error.name,
			);
		}

		throw new ApiError("Gagal memperbarui gambar galeri.");
	}

	return {
		success: true,
		message: "Galeri berhasil diperbarui.",
	};
}

export async function deleteGalleryBySlug(
	slug: string,
): Promise<SuccessResponse> {
	const { data: gallery, error: galleryFetchError } = await supabase
		.from("galleries")
		.select("id")
		.eq("slug", slug)
		.single();

	if (galleryFetchError) {
		throw new ApiError(galleryFetchError.message, galleryFetchError.code);
	}

	const { data: images, error: imageError } = await supabase
		.from("gallery_images")
		.select("image_path")
		.eq("gallery_id", gallery.id);

	if (imageError) {
		throw new ApiError(imageError.message, imageError.code);
	}

	if (images && images.length > 0) {
		const paths = images.map((img) => img.image_path) as string[];

		const { error: storageError } = await supabase.storage
			.from(BUCKET_NAME)
			.remove(paths);

		if (storageError) {
			throw new ApiError(storageError.message, storageError.name);
		}
	}

	const { error: deleteError } = await supabase
		.from("galleries")
		.delete()
		.eq("id", gallery.id);

	if (deleteError) {
		throw new ApiError(deleteError.message, deleteError.code);
	}

	return {
		success: true,
		message: "Galeri berhasil dihapus.",
	};
}
