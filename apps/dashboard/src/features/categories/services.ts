import type { Tables } from "@workspace/supabase/database.types";
import { supabase } from "@/lib/supabase";
import { ApiError } from "@/shared/lib/api-error";
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
	type?: string;
};

export type Category = Tables<"categories">;

export async function getAllCategories(
	params?: GetAllCategoriesParams,
): Promise<SuccessResponseWithMeta<Category[], Meta>> {
	const { page, limit, sort, type } = params || {};

	let query = supabase.from("categories").select("*", { count: "exact" });

	if (sort) {
		const [field, direction] = sort.split(".");
		query = query.order(field, {
			ascending: direction === "asc",
		});
	}

	if (type) {
		query = query.eq("type", type);
	}

	let data: Category[] = [];
	let count = 0;

	if (page && limit) {
		const offset = (page - 1) * limit;
		const {
			data: paginatedData,
			error,
			count: countData,
		} = await query.range(offset, offset + limit - 1);

		if (error) throw new ApiError(error.message, error.code);

		data = paginatedData || [];
		count = countData || 0;
	} else {
		const { data: allData, error, count: allCount } = await query;

		if (error) throw new ApiError(error.message, error.code);

		data = allData || [];
		count = allCount || 0;
	}

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data,
		meta: {
			totalPages: page && limit ? Math.ceil(count / limit) : 1,
			currentPage: page || 1,
			pageSize: limit || 10,
		},
	};
}

export async function addNewCategory(
	payload: CategoryPayload,
): Promise<SuccessResponse> {
	const { error } = await supabase.from("categories").insert(payload);

	if (error) {
		if (error.code === "23505") {
			throw new ApiError(
				"Kategori tersebut sudah dimiliki oleh tipe yang dipilih.",
			);
		}
		throw new ApiError(error.message, error.code);
	}

	return {
		success: true,
		message: "Kategori baru berhasil ditambahkan.",
	};
}

export async function updateCategoryById(
	id: string,
	payload: CategoryPayload,
): Promise<SuccessResponse> {
	const { error } = await supabase
		.from("categories")
		.update(payload)
		.eq("id", id);

	if (error) {
		if (error.code === "23505") {
			throw new ApiError(
				"Kategori tersebut sudah dimiliki oleh tipe yang dipilih.",
			);
		}
		throw new ApiError(error.message, error.code);
	}

	return {
		success: true,
		message: "Data kategori berhasil diperbarui.",
	};
}

export async function deleteCategoryById(id: string): Promise<SuccessResponse> {
	const { error } = await supabase.from("categories").delete().eq("id", id);

	if (error) throw new ApiError(error.message, error.code);

	return {
		success: true,
		message: "Data kategori berhasil dihapus.",
	};
}
