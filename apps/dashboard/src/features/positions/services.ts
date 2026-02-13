import type { Tables } from "@workspace/supabase/database.types";
import { supabase } from "@/lib/supabase";
import { ApiError } from "@/shared/lib/api-error";
import type {
	Meta,
	SuccessResponse,
	SuccessResponseWithMeta,
} from "@/shared/types/api";
import type { PositionFormValue as PositionPayload } from "./schemas";

export type Position = Tables<"positions">;

export type GetAllPositionsParams = {
	page?: number;
	limit?: number;
	sort?: string;
	status?: string;
};

export async function getAllPositions(
	params?: GetAllPositionsParams,
): Promise<SuccessResponseWithMeta<Position[], Meta>> {
	const { page, limit, sort, status } = params || {};

	let query = supabase
		.from("positions")
		.select("*", { count: "exact" })
		.order("sort_order", { ascending: true });

	// Status filter
	if (status) {
		const isActive = status === "active";
		query = query.eq("is_active", isActive);
	}

	// Sorting
	if (sort) {
		const [field, direction] = sort.split(".");
		query = query.order(field, {
			ascending: direction === "asc",
		});
	} else {
		// Default sort by created_at descending
		query = query.order("sort_order", { ascending: false });
	}

	let data: Position[] = [];
	let count = 0;

	// Pagination
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

export async function addNewPosition(
	payload: PositionPayload,
): Promise<SuccessResponse> {
	const { error } = await supabase.from("positions").insert(payload);

	if (error) {
		if (error.code === "23505") {
			throw new ApiError(
				"Tingkat jabatan sudah dimiliki oleh jabatan lain dan tidak boleh sama.",
			);
		}
		throw new ApiError(error.message, error.code);
	}

	return {
		success: true,
		message: "Jabatan baru berhasil ditambahkan.",
	};
}

export async function updatePositionById(
	id: string,
	payload: PositionPayload,
): Promise<SuccessResponse> {
	const { error } = await supabase
		.from("positions")
		.update(payload)
		.eq("id", id);

	if (error) {
		if (error.code === "23505") {
			throw new ApiError(
				"Tingkat jabatan sudah dimiliki oleh jabatan lain dan tidak boleh sama.",
			);
		}
		throw new ApiError(error.message, error.code);
	}

	return {
		success: true,
		message: "Jabatan berhasil diperbarui.",
	};
}

export async function deletePositionById(id: string): Promise<SuccessResponse> {
	const { error } = await supabase.from("positions").delete().eq("id", id);

	if (error) throw new ApiError(error.message, error.code);

	return {
		success: true,
		message: "Jabatan berhasil dihapus.",
	};
}
