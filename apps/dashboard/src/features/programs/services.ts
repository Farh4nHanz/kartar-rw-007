import type { Tables } from "@workspace/supabase/database.types";
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
	_params?: GetAllProgramsParams,
): Promise<SuccessResponseWithMeta<Program[], Meta>> {
	// const { page, limit, sort, category, status, name } = params || {};

	// let query = supabase.from("programs").select("*", { count: "exact" });

	// if (sort) {
	// 	const [field, direction] = sort.split(".");
	// 	query = query.order(field, {
	// 		ascending: direction === "asc",
	// 	});
	// }

	// if (category) {
	// 	const { data: categoryData, error: categoryError } = await supabase
	// 		.from("categories")
	// 		.select("id")
	// 		.eq("name", category)
	// 		.single();

	// 	if (categoryError)
	// 		throw new ApiError(categoryError.message, categoryError.code);

	// 	if (!categoryData) throw new ApiError("Kategori tidak ditemukan.");

	// 	query = query.eq("category_id", categoryData.id);
	// }

	// if (status) {
	// 	query = query.eq("status", status);
	// }

	// if (name) {
	// 	query = query.ilike("title", `%${name}%`);
	// }

	// let data: Program[] = [];
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
				title: "Kerja Bakti Mingguan",
				description: "Program rutin kerja bakti mingguan di lingkungan RW 07.",
				category: {
					id: "1",
					name: "Sosial",
				},
				schedule_type: "mingguan",
				status: "rutin",
				is_active: true,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{
				id: "1",
				title: "Kerja Bakti Mingguan",
				description: "Program rutin kerja bakti mingguan di lingkungan RW 07.",
				category: {
					id: "2",
					name: "Sosial 2",
				},
				schedule_type: "bulanan",
				status: "insidental",
				is_active: false,
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

export async function addNewProgram(
	_payload: ProgramPayload,
): Promise<SuccessResponse> {
	// const { error } = await supabase
	// 	.from("programs")
	// 	.insert(payload);

	// if (error) throw new ApiError(error.message, error.code);

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Kategori baru berhasil ditambahkan.",
	};
}

export async function updateProgramById(
	_id: string,
	_payload: ProgramPayload,
): Promise<SuccessResponse> {
	// const { error } = await supabase
	// 	.from("programs")
	// 	.update(payload)
	// 	.eq("id", id);

	// if (error) throw new ApiError(error.message, error.code);

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Data kategori berhasil diperbarui.",
	};
}

export async function deleteProgramById(_id: string): Promise<SuccessResponse> {
	// const { error } = await supabase.from("programs").delete().eq("id", id);

	// if (error) throw new ApiError(error.message, error.code);

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Data kategori berhasil dihapus.",
	};
}
