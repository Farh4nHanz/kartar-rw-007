import type { Tables } from "@workspace/supabase/database.types";
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

export type News = Omit<Tables<"news">, "category_id" | "image_path"> & {
	category: Pick<Tables<"categories">, "id" | "name">;
	thumbnail_url: string | null;
};

export async function getAllNews(
	_params?: GetAllNewsParams,
): Promise<SuccessResponseWithMeta<News[], Meta>> {
	// const { page, limit, category, status, title } = params || {};

	// let query = supabase
	// 	.from("news")
	// 	.select("*, category:categories(id, name, type)", { count: "exact" });

	// if (category) {
	// 	query = query.eq("category.type", category);
	// }

	// if (status) {
	//  const isPublished = status === "published";
	// 	query = query.eq("is_published", isPublished);
	// }

	// if (title) {
	// 	query = query.ilike("title", `%${title}%`);
	// }

	// let data: News[] = [];
	// let count = 0;

	// if (page && limit) {
	// 	const offset = (page - 1) * limit;
	// 	const {
	// 		data: paginatedData,
	// 		error,
	// 		count: countData,
	// 	} = await query.range(offset, offset + limit - 1);

	// 	if (error) throw new ApiError(error.message, error.code);

	// 	data = paginatedData || [];
	// 	count = countData || 0;
	// } else {
	// 	const { data: allData, error, count: allCount } = await query;

	// 	if (error) throw new ApiError(error.message, error.code);

	// 	data = allData || [];
	// 	count = allCount || 0;
	// }

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		// data: data || [],
		data: [
			{
				id: "1",
				title: "Kegiatan Bersih-Bersih Lingkungan Sukses Dilaksanakan",
				slug: "kegiatan-bersih-bersih-lingkungan-sukses-dilaksanakan",
				category: {
					id: "1",
					name: "Sosial",
				},
				excerpt:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, autem.",
				content:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. A, dolore voluptate nobis nostrum veniam consequatur reprehenderit saepe. Esse tempora voluptatum tenetur voluptatem deserunt obcaecati repellat nemo et rerum itaque impedit quos, ipsa qui officia, asperiores minima nulla dolor corporis non. Debitis repellendus quo laboriosam quibusdam aut, veritatis facilis commodi architecto.",
				thumbnail_url:
					"https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
				is_published: true,
				published_at: "2022-07-01T12:34:56.789Z",
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{
				id: "2",
				title: "Rapat Koordinasi Bulanan Februari 2026",
				slug: "rapat-koordinasi-bulanan-februari-2026",
				category: {
					id: "1",
					name: "Sosial",
				},
				excerpt:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, autem.",
				content:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. A, dolore voluptate nobis nostrum veniam consequatur reprehenderit saepe. Esse tempora voluptatum tenetur voluptatem deserunt obcaecati repellat nemo et rerum itaque impedit quos, ipsa qui officia, asperiores minima nulla dolor corporis non. Debitis repellendus quo laboriosam quibusdam aut, veritatis facilis commodi architecto.",
				thumbnail_url: null,
				is_published: false,
				published_at: null,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
		],
		meta: {
			totalPages: 1,
			currentPage: 1,
			pageSize: 1,
			// totalPages: page && limit ? Math.ceil(count / limit) : 1,
			// currentPage: page,
			// pageSize: limit,
		},
	};
}

export async function getNewsDetailBySlug(
	_slug: string,
): Promise<SuccessResponseWithData<News>> {
	// const { data, error } = await supabase
	// 	.from("news")
	// 	.select("*, category:categories(id, name, type)")
	// 	.eq("slug", slug)
	// 	.single();

	// if (error) throw new ApiError(error.message, error.code);

	// const thumbnailUrl = data?.image_path
	// 	? getPublicImageUrl("news", data.image_path)
	// 	: null;

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data: {
			id: "1",
			title: "Kegiatan Bersih-Bersih Lingkungan Sukses Dilaksanakan",
			slug: "kegiatan-bersih-bersih-lingkungan-sukses-dilaksanakan",
			category: {
				id: "1",
				name: "Sosial",
			},
			excerpt:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, autem.",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. A, dolore voluptate nobis nostrum veniam consequatur reprehenderit saepe. Esse tempora voluptatum tenetur voluptatem deserunt obcaecati repellat nemo et rerum itaque impedit quos, ipsa qui officia, asperiores minima nulla dolor corporis non. Debitis repellendus quo laboriosam quibusdam aut, veritatis facilis commodi architecto.",
			thumbnail_url:
				"https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
			is_published: true,
			published_at: "2022-07-01T12:34:56.789Z",
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		},
	};
}

export async function addNewNews(
	_payload: AddNewsPayload,
): Promise<SuccessResponse> {
	// const filePath = generateFilePath(payload.thumbnail);

	// const { error: uploadError } = await supabase.storage
	// 	.from("news")
	// 	.upload(filePath, payload.thumbnail);

	// if (uploadError) throw new ApiError(uploadError.message, uploadError.name);

	// const { thumbnail, ...restPayload } = payload;
	// const body: Omit<Tables<"news">, "id" | "created_at" | "updated_at"> = {
	// 	...restPayload,
	// 	image_path: filePath,
	// };

	// const { error: insertError } = await supabase.from("news").insert(body);

	// if (insertError) throw new ApiError(insertError.message, insertError.code);

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Berita baru berhasil ditambahkan.",
	};
}

export async function updateNewsById(
	_id: string,
	_payload: EditNewsPayload,
): Promise<SuccessResponse> {
	// const { data: existing, error: fetchError } = await supabase
	// 	.from("news")
	// 	.select("image_path")
	// 	.eq("id", id)
	// 	.single();

	// if (fetchError) throw new ApiError(fetchError.message, fetchError.code);

	// let newThumbnailPath: string | null = existing.image_path;

	// if (payload.thumbnail) {
	// 	newThumbnailPath = generateFilePath(payload.thumbnail);

	// 	const { error: uploadError } = await supabase.storage
	// 		.from("news")
	// 		.upload(newThumbnailPath, payload.thumbnail);

	// 	if (uploadError) throw new ApiError(uploadError.message, uploadError.name);

	// 	if (existing.image_path) {
	// 		const { error: deleteError } = await supabase.storage
	// 			.from("news")
	// 			.remove([existing.image_path]);

	// 		if (deleteError)
	// 			throw new ApiError(deleteError.message, deleteError.name);
	// 	}
	// }

	// const { error: updateError } = await supabase
	// 	.from("news")
	// 	.update({
	// 		...payload,
	// 		image_path: newThumbnailPath,
	// 	})
	// 	.eq("id", id);

	// if (updateError) throw new ApiError(updateError.message, updateError.code);

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Berita berhasil diperbarui.",
	};
}

export async function updateNewsBySlug(
	_slug: string,
	_payload: EditNewsPayload,
): Promise<SuccessResponse> {
	// const { data: existing, error: fetchError } = await supabase
	// 	.from("news")
	// 	.select("image_path")
	// 	.eq("slug", slug)
	// 	.single();

	// if (fetchError) throw new ApiError(fetchError.message, fetchError.code);

	// let newThumbnailPath: string | null = existing.image_path;

	// if (payload.thumbnail) {
	// 	newThumbnailPath = generateFilePath(payload.thumbnail);

	// 	const { error: uploadError } = await supabase.storage
	// 		.from("news")
	// 		.upload(newThumbnailPath, payload.thumbnail);

	// 	if (uploadError) throw new ApiError(uploadError.message, uploadError.name);

	// 	if (existing.image_path) {
	// 		const { error: deleteError } = await supabase.storage
	// 			.from("news")
	// 			.remove([existing.image_path]);

	// 		if (deleteError)
	// 			throw new ApiError(deleteError.message, deleteError.name);
	// 	}
	// }

	// const { error: updateError } = await supabase
	// 	.from("news")
	// 	.update({
	// 		...payload,
	// 		image_path: newThumbnailPath,
	// 	})
	// 	.eq("slug", slug);

	// if (updateError) throw new ApiError(updateError.message, updateError.code);

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Berita berhasil diperbarui.",
	};
}

export async function updateNewsStatusById(
	_id: string,
	isPublished: boolean,
): Promise<SuccessResponse> {
	// const { error } = await supabase
	// 	.from("news")
	// 	.update({ is_published: isPublished })
	// 	.eq("id", id);

	// if (error) throw new ApiError(error.message, error.code);

	const message = isPublished
		? "Berita berhasil dipublish."
		: "Berita disimpan ke dalam draft.";

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message,
	};
}

export async function deleteNewsById(_id: string): Promise<SuccessResponse> {
	// const { data: existing, error: fetchError } = await supabase
	// 	.from("news")
	// 	.select("image_path")
	// 	.eq("id", id)
	// 	.single();

	// if (fetchError) throw new ApiError(fetchError.message, fetchError.code);

	// const { error: deleteNewsError } = await supabase
	// 	.from("news")
	// 	.delete()
	// 	.eq("id", id);

	// if (deleteNewsError)
	// 	throw new ApiError(deleteNewsError.message, deleteNewsError.code);

	// if (existing.image_path) {
	// 	const { error: deleteFileError } = await supabase.storage
	// 		.from("news")
	// 		.remove([existing.image_path]);

	// 	if (deleteFileError)
	// 		throw new ApiError(deleteFileError.message, deleteFileError.name);
	// }

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Berita berhasil dihapus.",
	};
}
