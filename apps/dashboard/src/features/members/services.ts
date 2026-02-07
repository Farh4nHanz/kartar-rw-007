import type { Tables } from "@workspace/supabase/database.types";
import type {
	Meta,
	SuccessResponse,
	SuccessResponseWithMeta,
} from "@/shared/types/api";
import type {
	AddMemberFormValues as AddMemberPayload,
	EditMemberFormValues as EditMemberPayload,
} from "./schemas";

export type Member = Omit<
	Tables<"organization_members">,
	"period_id" | "position_id" | "photo_path"
> & {
	periods: Pick<Tables<"periods">, "start_year" | "end_year">;
	positions: Pick<Tables<"positions">, "name" | "sort_order">;
	photo_url: string | null;
};

export type GetAllMembersParams = {
	page: number;
	limit: number;
	sort?: string;
	name?: string;
	period?: string;
};

export async function getAllMembers(
	_params: GetAllMembersParams,
): Promise<SuccessResponseWithMeta<Member[], Meta>> {
	// const { page, limit, sort, name, period } = params;

	// let query = supabase
	// 	.from("organization_members")
	// 	.select(
	// 		"id, name, photo_path, created_at, updated_at, periods(start_year, end_year), positions(name, sort_order)",
	// 		{ count: "exact" },
	// 	);

	// if (name) {
	// 	query = query.ilike("name", `%${name}%`);
	// }

	// if (sort) {
	// 	const [field, direction] = sort.split(".");
	// 	query = query.order(field, {
	// 		ascending: direction === "asc",
	// 	});
	// }

	// if (period) {
	// 	const [start, end] = period.split("-");
	// 	query = query.eq("periods.start_year", +start).eq("periods.end_year", +end);
	// }

	// const offset = (page - 1) * limit;
	// const { data, error, count } = await query.range(offset, offset + limit - 1);

	// if (error) throw new ApiError(error.message, error.code);

	// const members: Member[] = data.map((member) => ({
	// 	...member,
	// 	photo_url: getPublicImageUrl("profiles", member.photo_path),
	// }));

	// const totalPages = count ? Math.ceil(count / limit) : 0;

	const data: Member[] = [
		{
			id: "skqosko",
			name: "Fajar Ramadhan",
			positions: {
				name: "Ketua",
				sort_order: 1,
			},
			periods: {
				start_year: 2020,
				end_year: 2025,
			},
			photo_url: "",
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		},
		{
			id: "skqosko",
			name: "Fajar Ramadhan",
			positions: {
				name: "Wakil Ketua",
				sort_order: 2,
			},
			periods: {
				start_year: 2020,
				end_year: 2025,
			},
			photo_url: "",
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		},
		{
			id: "skqosko",
			name: "Fajar Ramadhan",
			positions: {
				name: "Sekretaris",
				sort_order: 3,
			},
			periods: {
				start_year: 2020,
				end_year: 2025,
			},
			photo_url: "",
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		},
	];

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data,
		// members,
		meta: {
			// totalPages,
			// currentPage: page,
			// pageSize: limit,
			totalPages: 1,
			currentPage: 1,
			pageSize: 10,
		},
	};
}

export async function addNewMember(
	_payload: AddMemberPayload,
): Promise<SuccessResponse> {
	// const photoPath = generateFilePath(_payload.photo);

	// const { error: uploadError } = await supabase.storage
	// 	.from("profiles")
	// 	.upload(photoPath, _payload.photo);

	// if (uploadError) throw new ApiError(uploadError.message, uploadError.name);

	// const { error } = await supabase.from("organization_members").insert({
	// 	name: _payload.name,
	// 	period_id: _payload.period_id,
	// 	position_id: _payload.position_id,
	// 	photo_path: photoPath,
	// });

	// if (error) throw new ApiError(error.message, error.code);

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Anggota baru berhasil ditambahkan.",
	};
}

export async function updateMemberById(
	_id: string,
	_payload: EditMemberPayload,
): Promise<SuccessResponse> {
	// const { data: existing, error: fetchError } = await supabase
	// 	.from("organization_members")
	// 	.select("photo_path")
	// 	.eq("id", _id)
	// 	.single();

	// if (fetchError) throw new ApiError(fetchError.message, fetchError.code);

	// let newPhotoPath: string | null = existing.photo_path;

	// if (_payload.photo) {
	// 	newPhotoPath = generateFilePath(_payload.photo);

	// 	const { error: uploadError } = await supabase.storage
	// 		.from("profiles")
	// 		.upload(newPhotoPath, _payload.photo);

	// 	if (uploadError) throw new ApiError(uploadError.message, uploadError.name);

	// 	if (existing.photo_path) {
	// 		const { error: deleteError } = await supabase.storage
	// 			.from("profiles")
	// 			.remove([existing.photo_path]);

	// 		if (deleteError)
	// 			throw new ApiError(deleteError.message, deleteError.name);
	// 	}
	// }

	// const { error: updateError } = await supabase
	// 	.from("organization_members")
	// 	.update({
	// 		name: _payload.name,
	// 		period_id: _payload.period_id,
	// 		position_id: _payload.position_id,
	// 		photo_path: newPhotoPath,
	// 	})
	// 	.eq("id", _id);

	// if (updateError) throw new ApiError(updateError.message, updateError.code);

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Data anggota berhasil diperbarui.",
	};
}

export async function deleteMemberById(_id: string): Promise<SuccessResponse> {
	// const { data: existing, error: fetchError } = await supabase
	// 	.from("organization_members")
	// 	.select("photo_path")
	// 	.eq("id", _id)
	// 	.single();

	// if (fetchError) throw new ApiError(fetchError.message, fetchError.code);

	// const { error: deleteMemberError } = await supabase
	// 	.from("organization_members")
	// 	.delete()
	// 	.eq("id", _id);

	// if (deleteMemberError)
	// 	throw new ApiError(deleteMemberError.message, deleteMemberError.code);

	// if (existing.photo_path) {
	// 	const { error: deleteFileError } = await supabase.storage
	// 		.from("profiles")
	// 		.remove([existing.photo_path]);

	// 	if (deleteFileError)
	// 		throw new ApiError(deleteFileError.message, deleteFileError.name);
	// }

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Data anggota berhasil diperbarui.",
	};
}
