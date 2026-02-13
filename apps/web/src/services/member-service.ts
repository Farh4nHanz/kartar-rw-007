import type { Tables } from "@workspace/supabase/database.types";
import { supabase } from "@/lib/supabase";
import { getPublicImageUrl } from "@/lib/utils/get-public-image-url";
import type { SuccessResponseWithData } from "@/types/api";

export type Member = Pick<Tables<"organization_members">, "id" | "name"> & {
	period: Pick<Tables<"periods">, "id" | "start_year" | "end_year">;
	position: Pick<Tables<"positions">, "id" | "name" | "sort_order">;
	photo_url: string | null;
};

const BUCKET_NAME = "profiles";

export async function getAllMembers(): Promise<
	SuccessResponseWithData<Member[]>
> {
	const { data, error } = await supabase
		.from("organization_members")
		.select(
			`
        id,
        name,
        photo_path,
        period:periods(id, start_year, end_year, is_active),
        position:positions(id, name, sort_order)
      `,
		)
		.eq("periods.is_active", true);

	if (error) throw new Error("Gagal mengambil data.");

	const members: Member[] = data.map((member) => ({
		id: member.id,
		name: member.name,
		period: member.period,
		position: member.position,
		photo_url: getPublicImageUrl(BUCKET_NAME, member.photo_path),
	}));

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data: members,
	};
}
