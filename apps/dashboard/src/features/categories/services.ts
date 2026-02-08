import type { Tables } from "@workspace/supabase/database.types";
import type {
	Meta,
	SuccessResponse,
	SuccessResponseWithMeta,
} from "@/shared/types/api";
import type { CategoryFormValue as CategoryPayload } from "./schemas";

export type GetAllCategoriesParams = {
	page?: number;
	limit?: number;
	sort?: string;
};

export type Category = Tables<"categories">;

export async function getAllCategories(
	_params?: GetAllCategoriesParams,
): Promise<SuccessResponseWithMeta<Category[], Meta>> {
	// const { page, limit, sort } = params || {};

	// let query = supabase.from("categories").select("*", { count: "exact" });

	// if (sort) {
	// 	const [field, direction] = sort.split(".");
	// 	query = query.order(field, {
	// 		ascending: direction === "asc",
	// 	});
	// }

	// let data: Category[] = [];
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
				name: "Sosial",
				type: "galeri",
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{
				id: "2",
				name: "Sosial 2",
				type: "program",
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{
				id: "3",
				name: "Sosial 3",
				type: "berita",
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{
				id: "4",
				name: "Sosial 4",
				type: "kolaborasi",
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

export async function addNewCategory(
	_payload: CategoryPayload,
): Promise<SuccessResponse> {
	// const { error } = await supabase
	// 	.from("categories")
	// 	.insert(payload);

	// if (error) throw new ApiError(error.message, error.code);

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Kategori baru berhasil ditambahkan.",
	};
}

export async function updateCategoryById(
	_id: string,
	_payload: CategoryPayload,
): Promise<SuccessResponse> {
	// const { error } = await supabase
	// 	.from("categories")
	// 	.update(payload)
	// 	.eq("id", id);

	// if (error) throw new ApiError(error.message, error.code);

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Data kategori berhasil diperbarui.",
	};
}

export async function deleteCategoryById(
	_id: string,
): Promise<SuccessResponse> {
	// const { error } = await supabase.from("categories").delete().eq("id", id);

	// if (error) throw new ApiError(error.message, error.code);

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Data kategori berhasil dihapus.",
	};
}
