import type { Tables } from "@workspace/supabase/database.types";
import type { Meta, SuccessResponseWithMeta } from "@/shared/types/api";

export type Position = Tables<"positions">;

export type GetAllPositionsParams = {
	page: number;
	limit: number;
	sort?: string;
	status?: string;
};

export async function getAllPositions(
	_params: GetAllPositionsParams,
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

	// // Pagination
	// const offset = (page - 1) * limit;
	// const { data, error, count } = await query.range(offset, offset + limit - 1);

	// if (error) throw new ApiError(error.message, error.code);

	// const totalPages = count ? Math.ceil(count / limit) : 0;

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
			// totalPages,
			// currentPage: page,
			// pageSize: limit,
		},
	};
}
