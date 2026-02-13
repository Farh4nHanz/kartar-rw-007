import type { Tables } from "@workspace/supabase/database.types";
import { supabase } from "@/lib/supabase";
import { ApiError } from "@/shared/lib/api-error";
import { generateFilePath } from "@/shared/lib/utils/generate-file-path";
import { getPublicImageUrl } from "@/shared/lib/utils/get-public-image-url";
import type {
	SuccessResponse,
	SuccessResponseWithData,
} from "@/shared/types/api";
import type {
	AddMemberFormValues as AddMemberPayload,
	EditMemberFormValues as EditMemberPayload,
} from "./schemas";

export type Member = Pick<Tables<"organization_members">, "id" | "name"> & {
	periods: Pick<Tables<"periods">, "id" | "start_year" | "end_year">;
	positions: Pick<Tables<"positions">, "id" | "name" | "sort_order">;
	photo_url: string | null;
};

export type GetAllMembersParams = {
	name?: string;
	period?: string;
	position?: string;
};

const BUCKET_NAME = "profiles";

export async function getAllMembers(
	params?: GetAllMembersParams,
): Promise<SuccessResponseWithData<Member[]>> {
	const { name, period, position } = params || {};

	let query = supabase
		.from("organization_members")
		.select(
			"id, name, photo_path, created_at, updated_at, periods(id, start_year, end_year), positions(id, name, sort_order)",
			{ count: "exact" },
		);

	if (name) {
		query = query.ilike("name", `%${name}%`);
	}

	if (period) {
		const [start, end] = period.split("-");
		query = query.eq("periods.start_year", +start).eq("periods.end_year", +end);
	}

	if (position) {
		query = query.eq("positions.name", position);
	}

	const { data, error } = await query;

	if (error) throw new ApiError(error.message, error.code);

	const members = data.map((member) => ({
		...member,
		photo_url: getPublicImageUrl(BUCKET_NAME, member.photo_path),
	}));

	const res: Member[] = members.map((member) => ({
		id: member.id,
		name: member.name,
		periods: member.periods,
		positions: member.positions,
		photo_url: member.photo_url,
	}));

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data: res,
	};
}

export async function addNewMember(
	payload: AddMemberPayload,
): Promise<SuccessResponse> {
	const photoPath = generateFilePath(payload.photo);

	const { error: uploadError } = await supabase.storage
		.from(BUCKET_NAME)
		.upload(photoPath, payload.photo);

	if (uploadError) throw new ApiError(uploadError.message, uploadError.name);

	const { error } = await supabase.from("organization_members").insert({
		name: payload.name,
		period_id: payload.period_id,
		position_id: payload.position_id,
		photo_path: photoPath,
	});

	if (error) throw new ApiError(error.message, error.code);

	return {
		success: true,
		message: "Anggota baru berhasil ditambahkan.",
	};
}

export async function updateMemberById(
	id: string,
	payload: EditMemberPayload,
): Promise<SuccessResponse> {
	const { data: existing, error: fetchError } = await supabase
		.from("organization_members")
		.select("photo_path")
		.eq("id", id)
		.single();

	if (fetchError) throw new ApiError(fetchError.message, fetchError.code);

	let newPhotoPath: string | null = existing.photo_path;

	if (payload.photo) {
		newPhotoPath = generateFilePath(payload.photo);

		const { error: uploadError } = await supabase.storage
			.from(BUCKET_NAME)
			.upload(newPhotoPath, payload.photo);

		if (uploadError) throw new ApiError(uploadError.message, uploadError.name);

		if (existing.photo_path) {
			const { error: deleteError } = await supabase.storage
				.from(BUCKET_NAME)
				.remove([existing.photo_path]);

			if (deleteError)
				throw new ApiError(deleteError.message, deleteError.name);
		}
	}

	const { error: updateError } = await supabase
		.from("organization_members")
		.update({
			name: payload.name,
			period_id: payload.period_id,
			position_id: payload.position_id,
			photo_path: newPhotoPath,
		})
		.eq("id", id);

	if (updateError) throw new ApiError(updateError.message, updateError.code);

	return {
		success: true,
		message: "Data anggota berhasil diperbarui.",
	};
}

export async function deleteMemberById(id: string): Promise<SuccessResponse> {
	const { data: existing, error: fetchError } = await supabase
		.from("organization_members")
		.select("photo_path")
		.eq("id", id)
		.single();

	if (fetchError) throw new ApiError(fetchError.message, fetchError.code);

	const { error: deleteMemberError } = await supabase
		.from("organization_members")
		.delete()
		.eq("id", id);

	if (deleteMemberError)
		throw new ApiError(deleteMemberError.message, deleteMemberError.code);

	if (existing.photo_path) {
		const { error: deleteFileError } = await supabase.storage
			.from(BUCKET_NAME)
			.remove([existing.photo_path]);

		if (deleteFileError)
			throw new ApiError(deleteFileError.message, deleteFileError.name);
	}

	return {
		success: true,
		message: "Data anggota berhasil dihapus.",
	};
}
