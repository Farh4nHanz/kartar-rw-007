import { supabase, type Tables } from "@workspace/supabase";
import type { SuccessResponseWithData } from "@/types/api";

export type Program = Omit<
	Tables<"programs">,
	"category_id" | "created_at" | "updated_at"
> & {
	category: Pick<Tables<"categories">, "id" | "name">;
};

export async function getAllPrograms(): Promise<
	SuccessResponseWithData<Program[]>
> {
	const { data, error } = await supabase
		.from("programs")
		.select(
			`
        id,
        title,
        description,
        status,
        schedule_type,
        is_active,
        category:categories(id, name)
      `,
		)
		.order("created_at", { ascending: true });

	if (error) throw new Error("Gagal mengambil data program.");

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data,
	};
}

export async function getLatestPrograms(): Promise<
	SuccessResponseWithData<Program[]>
> {
	const { data, error } = await supabase
		.from("programs")
		.select(
			`
        id,
        title,
        description,
        status,
        schedule_type,
        is_active,
        category:categories(id, name)
      `,
		)
		.limit(3)
		.order("created_at", { ascending: true });

	if (error) throw new Error("Gagal mengambil data program.");

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data,
	};
}

export async function getProgramDetailById(
	id: string,
): Promise<SuccessResponseWithData<Program>> {
	const { data, error } = await supabase
		.from("programs")
		.select(
			`
        id,
        title,
        description,
        status,
        schedule_type,
        is_active,
        category:categories(id, name)
      `,
		)
		.eq("id", id)
		.single();

	if (error) throw new Error("Gagal mengambil data program.");

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data,
	};
}
