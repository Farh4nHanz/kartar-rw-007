import type { Tables } from "@workspace/supabase/database.types";
import { supabase } from "@workspace/supabase/supabase";
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
	AddNewsFormValue as AddNewsPayload,
	EditNewsFormValue as EditNewsPayload,
} from "./schemas";

export type GetAllNewsParams = {
	page?: number;
	limit?: number;
	category?: string;
	status?: string;
	title?: string;
};

export type NewsDB = Omit<
	Tables<"news">,
	"category_id" | "created_at" | "updated_at"
> & {
	category: Pick<Tables<"categories">, "id" | "name" | "type">;
};

export type News = Omit<
	Tables<"news">,
	"category_id" | "image_path" | "created_at" | "updated_at"
> & {
	category: Pick<Tables<"categories">, "id" | "name" | "type">;
	thumbnail_url: string | null;
};

const BUCKET_NAME = "news";

export async function getAllNews(
	params?: GetAllNewsParams,
): Promise<SuccessResponseWithMeta<News[], Meta>> {
	const { page, limit, category, status, title } = params || {};

	let query = supabase.from("news").select(
		`
				id,
				title,
				slug,
				content,
				excerpt,
				is_published,
				published_at,
				image_path,
				category:categories(
					id,
					name,
					type
				)
			`,
		{ count: "exact" },
	);

	if (category) {
		query = query.eq("category.type", category);
	}

	if (status) {
		const isPublished = status === "published";
		query = query.eq("is_published", isPublished);
	}

	if (title) {
		query = query.ilike("title", `%${title}%`);
	}

	let newsData: NewsDB[] = [];
	let count = 0;

	if (page && limit) {
		const offset = (page - 1) * limit;
		const {
			data: paginatedData,
			error,
			count: countData,
		} = await query.range(offset, offset + limit - 1);

		if (error) throw new ApiError(error.message, error.code);

		newsData = paginatedData || [];
		count = countData || 0;
	} else {
		const { data: allData, error, count: allCount } = await query;

		if (error) throw new ApiError(error.message, error.code);

		newsData = allData || [];
		count = allCount || 0;
	}

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data: [
			...newsData.map((news) => ({
				id: news.id,
				title: news.title,
				slug: news.slug,
				category: news.category,
				excerpt: news.excerpt,
				content: news.content,
				is_published: news.is_published,
				published_at: news.published_at,
				thumbnail_url: getPublicImageUrl(BUCKET_NAME, news.image_path),
			})),
		],
		meta: {
			totalPages: page && limit ? Math.ceil(count / limit) : 1,
			currentPage: page || 1,
			pageSize: limit || 10,
		},
	};
}

export async function getNewsDetailBySlug(
	slug: string,
): Promise<SuccessResponseWithData<News>> {
	const { data: newsData, error } = await supabase
		.from("news")
		.select(
			`
				id,
				title,
				slug,
				content,
				excerpt,
				is_published,
				published_at,
				image_path,
				category:categories(
					id,
					name,
					type
				)
			`,
		)
		.eq("slug", slug)
		.single();

	if (error) throw new ApiError(error.message, error.code);

	const thumbnailUrl = newsData?.image_path
		? getPublicImageUrl(BUCKET_NAME, newsData.image_path)
		: null;

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data: {
			id: newsData.id,
			title: newsData.title,
			slug: newsData.slug,
			category: newsData.category,
			excerpt: newsData.excerpt,
			content: newsData.content,
			is_published: newsData.is_published,
			published_at: newsData.published_at,
			thumbnail_url: thumbnailUrl,
		},
	};
}

export async function addNewNews(
	payload: AddNewsPayload,
): Promise<SuccessResponse> {
	const filePath = generateFilePath(payload.thumbnail);

	const { error: uploadError } = await supabase.storage
		.from(BUCKET_NAME)
		.upload(filePath, payload.thumbnail);

	if (uploadError) throw new ApiError(uploadError.message, uploadError.name);

	const { thumbnail, ...restPayload } = payload;
	const body: Omit<Tables<"news">, "id" | "created_at" | "updated_at"> = {
		...restPayload,
		image_path: filePath,
	};

	const { error: insertError } = await supabase.from("news").insert(body);

	if (insertError) throw new ApiError(insertError.message, insertError.code);

	return {
		success: true,
		message: "Berita baru berhasil ditambahkan.",
	};
}

export async function updateNewsById(
	id: string,
	payload: EditNewsPayload,
): Promise<SuccessResponse> {
	const { data: existing, error: fetchError } = await supabase
		.from("news")
		.select("image_path")
		.eq("id", id)
		.single();

	if (fetchError) throw new ApiError(fetchError.message, fetchError.code);

	let newThumbnailPath: string | null = existing.image_path;

	if (payload.thumbnail) {
		newThumbnailPath = generateFilePath(payload.thumbnail);

		const { error: uploadError } = await supabase.storage
			.from(BUCKET_NAME)
			.upload(newThumbnailPath, payload.thumbnail);

		if (uploadError) throw new ApiError(uploadError.message, uploadError.name);

		if (existing.image_path) {
			const { error: deleteError } = await supabase.storage
				.from(BUCKET_NAME)
				.remove([existing.image_path]);

			if (deleteError)
				throw new ApiError(deleteError.message, deleteError.name);
		}
	}

	const { error: updateError } = await supabase
		.from("news")
		.update({
			...payload,
			image_path: newThumbnailPath,
		})
		.eq("id", id);

	if (updateError) throw new ApiError(updateError.message, updateError.code);

	return {
		success: true,
		message: "Berita berhasil diperbarui.",
	};
}

export async function updateNewsBySlug(
	slug: string,
	payload: EditNewsPayload,
): Promise<SuccessResponse> {
	// Fetch existing image path
	const { data: existing, error: fetchError } = await supabase
		.from("news")
		.select("image_path")
		.eq("slug", slug)
		.single();

	if (fetchError) {
		throw new ApiError(fetchError.message, fetchError.code);
	}

	let finalImagePath: string | null = existing?.image_path ?? null;

	// Handle thumbnail upload (if provided)
	if (payload.thumbnail instanceof File) {
		const newImagePath = generateFilePath(payload.thumbnail);

		// Upload new image
		const { error: uploadError } = await supabase.storage
			.from(BUCKET_NAME)
			.upload(newImagePath, payload.thumbnail, {
				upsert: false,
			});

		if (uploadError) {
			throw new ApiError(uploadError.message, uploadError.name);
		}

		// Delete old image AFTER successful upload
		if (existing?.image_path) {
			const { error: deleteError } = await supabase.storage
				.from(BUCKET_NAME)
				.remove([existing.image_path]);

			if (deleteError) {
				throw new ApiError(deleteError.message, deleteError.name);
			}
		}

		finalImagePath = newImagePath;
	}

	// Remove non-DB fields from payload
	const { thumbnail, ...dbPayload } = payload;

	// Update database (ONLY valid columns)
	const { error: updateError } = await supabase
		.from("news")
		.update({
			...dbPayload,
			image_path: finalImagePath,
		})
		.eq("slug", slug);

	if (updateError) {
		throw new ApiError(updateError.message, updateError.code);
	}

	return {
		success: true,
		message: "Berita berhasil diperbarui.",
	};
}

export async function updateNewsStatusById(
	id: string,
	isPublished: boolean,
): Promise<SuccessResponse> {
	const { error } = await supabase
		.from("news")
		.update({ is_published: isPublished })
		.eq("id", id);

	if (error) throw new ApiError(error.message, error.code);

	const message = isPublished
		? "Berita berhasil dipublish."
		: "Berita disimpan ke dalam draft.";

	return {
		success: true,
		message,
	};
}

export async function deleteNewsById(id: string): Promise<SuccessResponse> {
	const { data: existing, error: fetchError } = await supabase
		.from("news")
		.select("image_path")
		.eq("id", id)
		.single();

	if (fetchError) throw new ApiError(fetchError.message, fetchError.code);

	const { error: deleteNewsError } = await supabase
		.from("news")
		.delete()
		.eq("id", id);

	if (deleteNewsError)
		throw new ApiError(deleteNewsError.message, deleteNewsError.code);

	if (existing.image_path) {
		const { error: deleteFileError } = await supabase.storage
			.from(BUCKET_NAME)
			.remove([existing.image_path]);

		if (deleteFileError)
			throw new ApiError(deleteFileError.message, deleteFileError.name);
	}

	return {
		success: true,
		message: "Berita berhasil dihapus.",
	};
}
