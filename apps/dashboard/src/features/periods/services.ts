import type { Tables } from "@workspace/supabase";
import type {
	Meta,
	SuccessResponse,
	SuccessResponseWithMeta,
} from "@/shared/types/api";
import type { PeriodFormValue as PeriodPayload } from "./schemas";

export type Period = Tables<"periods">;

export type GetAllPeriodsParams = {
	page: number;
	limit: number;
	sort?: string;
	name?: string;
	status?: string;
};

export async function getAllPeriods(
	_params: GetAllPeriodsParams,
): Promise<SuccessResponseWithMeta<Period[], Meta>> {
	// const { page = 1, limit = 10, sort, name, status } = params;

	// let query = supabase.from("periods").select("*", { count: "exact" });

	// // Search filter
	// if (name) {
	// 	query = query.ilike("name", `%${name}%`);
	// }

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
	// 	query = query.order("created_at", { ascending: false });
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
				id: "193928310981ooksqo",
				created_at: new Date().toISOString(),
				end_year: new Date().getFullYear(),
				is_active: true,
				name: "Kepengurusan 2024-2026",
				start_year: new Date().getFullYear() - 2,
				updated_at: new Date().toISOString(),
			},
		],
		// count: count || 0,
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

export async function addNewPeriod(
	_payload: PeriodPayload,
): Promise<SuccessResponse> {
	// const res = await supabase.from("periods").insert(payload);

	// if (res.error) throw new ApiError(res.error.message, res.error.code);

	await new Promise((r) => setTimeout(r, 3000));
	return {
		success: true,
		message: "Periode baru berhasil ditambahkan.",
	};
}

export async function updatePeriodById(
	_id: string,
	_payload: PeriodPayload,
): Promise<SuccessResponse> {
	// const res = await supabase.from("periods").update(payload).eq("id", id);

	// if (res.error) throw new ApiError(res.error.message, res.error.code);

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Periode berhasil diperbarui.",
	};
}

export async function deletePeriodById(_id: string): Promise<SuccessResponse> {
	// const res = await supabase.from("periods").delete().eq("id", id);

	// if (res.error) throw new ApiError(res.error.message, res.error.code);
	await new Promise((r) => setTimeout(r, 3000));
	return {
		success: true,
		message: "Periode berhasil dihapus.",
	};
}
