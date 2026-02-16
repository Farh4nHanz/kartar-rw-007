import type { Tables } from "@workspace/supabase/database.types";
import { supabase } from "@/lib/supabase";
import { ApiError } from "@/shared/lib/api-error";
import type {
	Meta,
	SuccessResponse,
	SuccessResponseWithMeta,
} from "@/shared/types/api";
import type { ProgramFormValue as ProgramPayload } from "./schemas";

export type GetAllProgramsParams = {
	page?: number;
	limit?: number;
	sort?: string;
	category?: string;
	status?: string;
	name?: string;
};

export type Program = Omit<Tables<"programs">, "category_id"> & {
	category: Pick<Tables<"categories">, "id" | "name">;
};

export async function getAllPrograms(
	params?: GetAllProgramsParams,
): Promise<SuccessResponseWithMeta<Program[], Meta>> {
	const { page, limit, sort, category, status, name } = params || {};

	let query = supabase
		.from("programs")
		.select("*, category:categories(id, name, type)", { count: "exact" });

	if (sort) {
		const [field, direction] = sort.split(".");
		query = query.order(field, {
			ascending: direction === "asc",
		});
	}

	if (category) {
		query = query.eq("category.type", category);
	}

	if (status) {
		query = query.eq("status", status);
	}

	if (name) {
		query = query.ilike("title", `%${name}%`);
	}

	let data: Program[] = [];
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

export async function addNewProgram(
	payload: ProgramPayload,
): Promise<SuccessResponse> {
	const { error } = await supabase.from("programs").insert(payload);

	if (error) {
		if (error.code === "23505") {
			throw new ApiError("Program tersebut sudah ada.");
		}
		throw new ApiError(error.message, error.code);
	}

	return {
		success: true,
		message: "Program baru berhasil ditambahkan.",
	};
}

export async function updateProgramById(
	id: string,
	payload: ProgramPayload,
): Promise<SuccessResponse> {
	const { error } = await supabase
		.from("programs")
		.update(payload)
		.eq("id", id);

	if (error) throw new ApiError(error.message, error.code);

	return {
		success: true,
		message: "Program berhasil diperbarui.",
	};
}

export async function deleteProgramById(id: string): Promise<SuccessResponse> {
	const { error } = await supabase.from("programs").delete().eq("id", id);

	if (error) throw new ApiError(error.message, error.code);

	return {
		success: true,
		message: "Program berhasil dihapus.",
	};
}
