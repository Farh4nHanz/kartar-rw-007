import type { Tables } from "@workspace/supabase/database.types";
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

export type GalleryDB = Omit<
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

const _GALLERY_BUCKET = "galleries";

export async function getAllGalleries(
	_params?: GetAllGalleriesParams,
): Promise<SuccessResponseWithMeta<Gallery[], Meta>> {
	// const { page, limit, name } = params || {};

	// let query = supabase.from("galleries").select(
	// `
	// 	id,
	// 	title,
	// 	description,
	// 	activity_date,
	// 	category:categories(id, name, type),
	// 	images:gallery_images(id, image_path)
	// 	`,
	// 	{ count: "exact" },
	// );

	// if (name) {
	// 	query = query.ilike("title", `%${name}%`);
	// }

	// let data: GalleryDB[] = [];
	// let count = 0;

	// if (page && limit) {
	// 	const offset = (page - 1) * limit;
	// 	const {
	// 		data: paginatedData,
	// 		error,
	// 		count: countData,
	// 	} = await query.range(offset, offset + limit - 1);

	// 	if (error) throw new ApiError(error.message, error.code);

	// 	data = paginatedData ?? [];
	// 	count = countData ?? 0;
	// } else {
	// 	const { data: allData, error, count: allCount } = await query;

	// 	if (error) throw new ApiError(error.message, error.code);

	// 	data = allData ?? [];
	// 	count = allCount ?? 0;
	// }

	// const galleries: Gallery[] = data.map((gallery) => ({
	// 	...gallery,
	// 	images: gallery.images.map((image) => ({
	// 		id: image.id,
	// 		image_url: image.image_path ? getPublicImageUrl(image.image_path) : null,
	// 	})),
	// }));

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data: [
			{
				id: "1",
				title: "Galeri 1",
				description: "Deskripsi galeri 1",
				category: {
					id: "1",
					name: "galeri",
					type: "galeri",
				},
				activity_date: new Date().toISOString(),
				images: [
					{
						id: "1",
						image_url: "https://placehold.co/600x400",
					},
				],
			},
		],
		// galleries,
		meta: {
			totalPages: 1,
			currentPage: 1,
			pageSize: 1,
			// totalPages: page && limit ? Math.ceil(count / limit) : 1,
			// currentPage: page ?? 1,
			// pageSize: limit ?? 10,
		},
	};
}

export const getGalleryDetailById = async (
	_id: string,
): Promise<SuccessResponseWithData<Gallery>> => {
	// const { data, error } = await supabase
	// 	.from("galleries")
	// 	.select(
	// 		`
	// 		id,
	// 		title,
	// 		description,
	// 		activity_date,
	// 		category:categories(id, name, type),
	// 		images:gallery_images(id, image_path)
	// 		`,
	// 	)
	// 	.eq("id", id)
	// 	.single();

	// if (error) {
	// 	throw new ApiError(error.message, error.code);
	// }

	// const images: Gallery["images"] = data.images.map((image) => ({
	// 	id: image.id,
	// 	image_url: getPublicImageUrl(GALLERY_BUCKET, image.image_path),
	// }));

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data: {
			id: "1",
			title: "Galeri 1",
			description: "Deskripsi galeri 1",
			category: {
				id: "1",
				name: "galeri",
				type: "galeri",
			},
			activity_date: new Date().toISOString(),
			images: [
				{
					id: "1",
					image_url: "https://placehold.co/600x400",
				},
			],
			// id: data.id,
			// title: data.title,
			// description: data.description,
			// activity_date: data.activity_date,
			// category: data.category,
			// images,
		},
	};
};

export async function addNewGallery(
	_payload: AddGalleryPayload,
): Promise<SuccessResponse> {
	// const { title, description, category_id, activity_date, images } = payload;

	// const { data: gallery, error: galleryError } = await supabase
	// 	.from("galleries")
	// 	.insert({
	// 		title,
	// 		description,
	// 		category_id,
	// 		activity_date: activity_date.toISOString(),
	// 	})
	// 	.select("id")
	// 	.single();

	// if (galleryError || !gallery) {
	// 	throw new ApiError(
	// 		galleryError?.message ?? "Gagal menambahkan galeri.",
	// 		galleryError?.code,
	// 	);
	// }

	// const galleryId = gallery.id;

	// const uploadedPaths: string[] = [];

	// try {
	// 	const uploadResults = await Promise.all(
	// 		images.map(async (file) => {
	// 			const filePath = generateFilePath(file);

	// 			const { error } = await supabase.storage
	// 				.from(GALLERY_BUCKET)
	// 				.upload(filePath, file);

	// 			if (error) throw error;

	// 			uploadedPaths.push(filePath);
	// 			return filePath;
	// 		}),
	// 	);

	// 	const { error: imageInsertError } = await supabase
	// 		.from("gallery_images")
	// 		.insert(
	// 			uploadResults.map((path) => ({
	// 				gallery_id: galleryId,
	// 				image_path: path,
	// 			})),
	// 		);

	// 	if (imageInsertError) throw imageInsertError;
	// } catch (error) {
	// 	await Promise.all(
	// 		uploadedPaths.map((path) =>
	// 			supabase.storage.from(GALLERY_BUCKET).remove([path]),
	// 		),
	// 	);

	// 	await supabase.from("galleries").delete().eq("id", galleryId);

	// 	if (error instanceof Error) {
	// 		throw new ApiError(
	// 			error.message ?? "Gagal upload gambar galeri.",
	// 			error.name,
	// 		);
	// 	}

	// 	throw new ApiError("Gagal upload gambar galeri.");
	// }

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Galeri berhasil dibuat.",
	};
}

export async function updateGalleryById(
	_id: string,
	_payload: EditGalleryPayload,
): Promise<SuccessResponse> {
	// const {
	// 	title,
	// 	description,
	// 	category_id,
	// 	activity_date,
	// 	added_images = [],
	// 	deleted_image_ids = [],
	// } = payload;

	// // Update gallery metadata
	// const { error: updateError } = await supabase
	// 	.from("galleries")
	// 	.update({
	// 		title,
	// 		description,
	// 		category_id,
	// 		activity_date: activity_date.toDateString(),
	// 	})
	// 	.eq("id", id);

	// if (updateError) {
	// 	throw new ApiError(updateError.message, updateError.code);
	// }

	// // Delete images (DB + Storage)
	// if (deleted_image_ids.length > 0) {
	// 	// Get image paths first
	// 	const { data: imagesToDelete, error: fetchError } = await supabase
	// 		.from("gallery_images")
	// 		.select("id, image_path")
	// 		.eq("gallery_id", id)
	// 		.in("id", deleted_image_ids);

	// 	if (fetchError) {
	// 		throw new ApiError(fetchError.message, fetchError.code);
	// 	}

	// 	if (imagesToDelete && imagesToDelete.length > 0) {
	// 		// Remove from storage
	// 		await supabase.storage
	// 			.from(GALLERY_BUCKET)
	// 			.remove(imagesToDelete.map((img) => img.image_path) as string[]);

	// 		// Remove DB records
	// 		const { error: deleteError } = await supabase
	// 			.from("gallery_images")
	// 			.delete()
	// 			.in("id", deleted_image_ids);

	// 		if (deleteError) {
	// 			throw new ApiError(deleteError.message, deleteError.code);
	// 		}
	// 	}
	// }

	// const uploadedPaths: string[] = [];

	// try {
	// 	if (added_images.length > 0) {
	// 		const uploadResults = await Promise.all(
	// 			added_images.map(async (file) => {
	// 				const filePath = generateFilePath(file);

	// 				const { error } = await supabase.storage
	// 					.from(GALLERY_BUCKET)
	// 					.upload(filePath, file);

	// 				if (error) throw error;

	// 				uploadedPaths.push(filePath);
	// 				return filePath;
	// 			}),
	// 		);

	// 		// Insert image records
	// 		const { error: insertError } = await supabase
	// 			.from("gallery_images")
	// 			.insert(
	// 				uploadResults.map((path) => ({
	// 					gallery_id: id,
	// 					image_path: path,
	// 				})),
	// 			);

	// 		if (insertError) throw insertError;
	// 	}
	// } catch (error) {
	// 	// Rollback newly uploaded images
	// 	if (uploadedPaths.length > 0) {
	// 		await supabase.storage.from(GALLERY_BUCKET).remove(uploadedPaths);
	// 	}

	// 	if (error instanceof Error) {
	// 		throw new ApiError(
	// 			error.message ?? "Gagal memperbarui gambar galeri.",
	// 			error.name,
	// 		);
	// 	}

	// 	throw new ApiError("Gagal memperbarui gambar galeri.");
	// }

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Galeri berhasil diperbarui.",
	};
}

export async function deleteGalleryById(_id: string): Promise<SuccessResponse> {
	// const { data: images, error: imageError } = await supabase
	// 	.from("gallery_images")
	// 	.select("image_path")
	// 	.eq("gallery_id", id);

	// if (imageError) {
	// 	throw new ApiError(imageError.message, imageError.code);
	// }

	// if (images && images.length > 0) {
	// 	const paths = images.map((img) => img.image_path);

	// 	const { error: storageError } = await supabase.storage
	// 		.from(GALLERY_BUCKET)
	// 		.remove(paths as string[]);

	// 	if (storageError) {
	// 		throw new ApiError(storageError.message, storageError.name);
	// 	}
	// }

	// const { error: galleryError } = await supabase
	// 	.from("galleries")
	// 	.delete()
	// 	.eq("id", id);

	// if (galleryError) {
	// 	throw new ApiError(galleryError.message, galleryError.code);
	// }

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Galeri berhasil dihapus.",
	};
}
