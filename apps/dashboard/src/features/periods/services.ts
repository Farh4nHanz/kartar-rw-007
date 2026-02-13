import type { Tables } from "@workspace/supabase";
import { supabase } from "@/lib/supabase";
import { ApiError } from "@/shared/lib/api-error";
import type {
	Meta,
	SuccessResponse,
	SuccessResponseWithMeta,
} from "@/shared/types/api";
import type { PeriodFormValue as PeriodPayload } from "./schemas";

export type Period = Tables<"periods">;

export type GetAllPeriodsParams = {
	page?: number;
	limit?: number;
	sort?: string;
	name?: string;
	status?: string;
};

export async function getAllPeriods(
	params?: GetAllPeriodsParams,
): Promise<SuccessResponseWithMeta<Period[], Meta>> {
	const { page, limit, sort, name, status } = params || {};

	let query = supabase.from("periods").select("*", { count: "exact" });

	// Search filter
	if (name) {
		query = query.ilike("name", `%${name}%`);
	}

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
		query = query.order("created_at", { ascending: false });
	}

	let data: Period[] = [];
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

export async function addNewPeriod(
	payload: PeriodPayload,
): Promise<SuccessResponse> {
	const { error } = await supabase.from("periods").insert(payload);

	if (error) {
		if (error.code === "23505") {
			if (error.message.includes("unique_active_period")) {
				throw new ApiError("Hanya boleh ada satu periode aktif.");
			}
			if (error.message.includes("unique_period_year_range")) {
				throw new ApiError(
					"Periode dengan tahun awal dan akhir yang sama sudah ada.",
				);
			}
		}

		throw new ApiError(error.message, error.code);
	}

	return {
		success: true,
		message: "Periode baru berhasil ditambahkan.",
	};
}

export async function updatePeriodById(
	id: string,
	payload: PeriodPayload,
): Promise<SuccessResponse> {
	const { error } = await supabase.from("periods").update(payload).eq("id", id);

	if (error) {
		if (error.code === "23505") {
			if (error.message.includes("unique_active_period")) {
				throw new ApiError("Hanya boleh ada satu periode aktif.");
			}
			if (error.message.includes("unique_period_year_range")) {
				throw new ApiError(
					"Periode dengan tahun awal dan akhir yang sama sudah ada.",
				);
			}
		}

		throw new ApiError(error.message, error.code);
	}

	return {
		success: true,
		message: "Periode berhasil diperbarui.",
	};
}

export async function deletePeriodById(id: string): Promise<SuccessResponse> {
	const { error } = await supabase.from("periods").delete().eq("id", id);

	if (error) throw new ApiError(error.message, error.code);

	return {
		success: true,
		message: "Periode berhasil dihapus.",
	};
}
