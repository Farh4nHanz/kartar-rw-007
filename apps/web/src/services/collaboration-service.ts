import type { Tables } from "@workspace/supabase/database.types";
import { supabase } from "@workspace/supabase/supabase";
import { getPublicImageUrl } from "@/lib/utils/get-public-image-url";
import type { SuccessResponseWithData } from "@/types/api";

export type Collaboration = Pick<
	Tables<"collaborations">,
	"id" | "description" | "partner_name"
> & {
	category: Pick<Tables<"categories">, "id" | "name" | "type">;
	period: Pick<Tables<"periods">, "id" | "start_year" | "end_year">;
	logo_url: string | null;
};

const BUCKET_NAME = "partners";

export async function getAllCollaborations(): Promise<
	SuccessResponseWithData<Collaboration[]>
> {
	const { data, error } = await supabase.from("collaborations").select(
		`
			id,
			partner_name,
			description,
			logo_path,
			category:categories(id, name, type),
			period:periods(id, start_year, end_year)
		`,
	);

	if (error) throw new Error("Gagal mengambil data.");

	const collaborations: Collaboration[] = data.map((collaboration) => ({
		id: collaboration.id,
		partner_name: collaboration.partner_name,
		description: collaboration.description,
		period: collaboration.period,
		category: collaboration.category,
		logo_url: getPublicImageUrl(BUCKET_NAME, collaboration.logo_path),
	}));

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data: collaborations,
	};
}
