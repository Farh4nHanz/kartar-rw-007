import type { Tables } from "@workspace/supabase/database.types";
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
	_params?: GetAllPositionsParams,
): Promise<SuccessResponseWithMeta<Position[], Meta>> {
	// const { page, limit, sort, status } = params;

	// let query = supabase.from("positions").select("*", { count: "exact" });

	// // Status filter
	// if (status) {
	// 	const isActive = status === "active";
	// 	query = query.eq("is_active", isActive);
	// }

	// // Sorting
	// if (sort) {
	// 	const [field, direction] = sort.split(".");
	// 	query = query.order(field, {
	// 		ascending: direction === "asc",
	// 	});
	// } else {
	// 	// Default sort by created_at descending
	// 	query = query.order("sort_order", { ascending: false });
	// }

	// let data: Position[] = [];
	// let count = 0;

	// // Pagination
	// if (page && limit) {
	// const offset = (page - 1) * limit;
	// const { data: paginatedData, error, count: countData } = await query.range(offset, offset + limit - 1);

	// if (error) throw new ApiError(error.message, error.code);

	// data = paginatedData || [];
	// count = countData
	// } else {
	// const { data: allData, error, count: allCount } = await query;

	// if (error) throw new ApiError(error.message, error.code);

	// data = paginatedData || [];
	// count = countData
	// }

	await new Promise((r) => setTimeout(r, 3000));
	return {
		success: true,
		message: "Data diambil dengan sukses.",
		// data: data || [],
		data: [
			{
				id: "okdowd1",
				name: "Ketua",
				description: "Pemimpin organisasi",
				sort_order: 1,
				is_active: true,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{
				id: "okdowd1qokwoqk",
				name: "Wakil Ketua",
				description: "Wakil pemimpin",
				sort_order: 2,
				is_active: true,
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

export async function addNewPosition(
	_payload: PositionPayload,
): Promise<SuccessResponse> {
	// const { error } = await supabase.from("positions").insert(payload);

	// if (error) throw new ApiError(error.message, error.code);

	await new Promise((r) => setTimeout(r, 3000));
	return {
		success: true,
		message: "Jabatan baru berhasil ditambahkan.",
	};
}

export async function updatePositionById(
	_id: string,
	_payload: PositionPayload,
): Promise<SuccessResponse> {
	// const { error } = await supabase
	// 	.from("positions")
	// 	.update(payload)
	// 	.eq("id", id);

	// if (error) throw new ApiError(error.message, error.code);

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Jabatan berhasil diperbarui.",
	};
}

export async function deletePositionById(
	_id: string,
): Promise<SuccessResponse> {
	// const { error } = await supabase.from("positions").delete().eq("id", id);

	// if (error) throw new ApiError(error.message, error.code);

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Jabatan berhasil dihapus.",
	};
}
