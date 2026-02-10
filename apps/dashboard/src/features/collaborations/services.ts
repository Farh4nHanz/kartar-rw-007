import type { Tables } from "@workspace/supabase/database.types";
import type {
	SuccessResponse,
	SuccessResponseWithData,
} from "@/shared/types/api";
import type { CollaborationFormValues as CollaborationPayload } from "./schemas";

export type Collaboration = Pick<
	Tables<"collaborations">,
	"id" | "description" | "partner_name"
> & {
	category: Pick<Tables<"categories">, "id" | "name" | "type">;
	period: Pick<Tables<"periods">, "id" | "start_year" | "end_year">;
	logo_url: string | null;
};

export type GetAllCollaborationsParams = {
	name?: string;
	category?: string;
	period?: string;
};

export async function getAllCollaborations(
	_params?: GetAllCollaborationsParams,
): Promise<SuccessResponseWithData<Collaboration[]>> {
	// const { name, category, period } = params || {};

	// let query = supabase
	// 	.from("collaborations")
	// 	.select(
	// 		"id, partner_name, description, logo_path, category:categories(id, name, type), period:periods(id, start_year, end_year)",
	// 		{ count: "exact" },
	// 	);

	// if (name) {
	// 	query = query.ilike("name", `%${name}%`);
	// }

	// if (period) {
	// 	const [start, end] = period.split("-");
	// 	query = query.eq("period.start_year", +start).eq("period.end_year", +end);
	// }

	// if (category) {
	// 	query = query.eq("category.type", category);
	// }

	// const { data, error } = await query;

	// if (error) throw new ApiError(error.message, error.code);

	// const collaborations: Collaboration[] = data.map((collaboration) => ({
	// 	...collaboration,
	// 	logo_url: getPublicImageUrl("partners", collaboration.logo_path),
	// }));

	const data: Collaboration[] = [
		{
			id: "1",
			partner_name: "Partner 1",
			description: "Description 1",
			category: {
				id: "4",
				name: "Sosial 4",
				type: "kolaborasi",
			},
			period: {
				id: "193928310981ooksqo",
				start_year: 2020,
				end_year: 2025,
			},
			logo_url: null,
		},
	];

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data,
		// collaborations,
	};
}

export async function addNewCollaboration(
	_payload: CollaborationPayload,
): Promise<SuccessResponse> {
	// let logoPath: string | null = null;

	// const { logo, ...restPayload } = payload;

	// if (logo) {
	// 	logoPath = generateFilePath(logo);

	// 	const { error: uploadError } = await supabase.storage
	// 		.from("profiles")
	// 		.upload(logoPath, logo);

	// 	if (uploadError) throw new ApiError(uploadError.message, uploadError.name);
	// }

	// const { error } = await supabase.from("collaborations").insert({
	// 	...restPayload,
	// 	logo_path: logoPath,
	// });

	// if (error) throw new ApiError(error.message, error.code);

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Mitra baru berhasil ditambahkan.",
	};
}

export async function updateCollaborationById(
	_id: string,
	_payload: CollaborationPayload,
): Promise<SuccessResponse> {
	// const { data: existing, error: fetchError } = await supabase
	// 	.from("collaborations")
	// 	.select("logo_path")
	// 	.eq("id", id)
	// 	.single();

	// if (fetchError) throw new ApiError(fetchError.message, fetchError.code);

	// let newLogoPath: string | null = existing.logo_path;

	// const { logo, ...restPayload } = payload;

	// if (logo) {
	// 	newLogoPath = generateFilePath(logo);

	// 	const { error: uploadError } = await supabase.storage
	// 		.from("partners")
	// 		.upload(newLogoPath, logo);

	// 	if (uploadError) throw new ApiError(uploadError.message, uploadError.name);

	// 	if (existing.logo_path) {
	// 		const { error: deleteError } = await supabase.storage
	// 			.from("partners")
	// 			.remove([existing.logo_path]);

	// 		if (deleteError)
	// 			throw new ApiError(deleteError.message, deleteError.name);
	// 	}
	// }

	// const { error: updateError } = await supabase
	// 	.from("collaborations")
	// 	.update({
	// 		...restPayload,
	// 		logo_path: newLogoPath,
	// 	})
	// 	.eq("id", id);

	// if (updateError) throw new ApiError(updateError.message, updateError.code);

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Data kolaborasi berhasil diperbarui.",
	};
}

export async function deleteCollaborationById(
	_id: string,
): Promise<SuccessResponse> {
	// const { data: existing, error: fetchError } = await supabase
	// 	.from("collaborations")
	// 	.select("logo_path")
	// 	.eq("id", id)
	// 	.single();

	// if (fetchError) throw new ApiError(fetchError.message, fetchError.code);

	// const { error: deleteCollaborationError } = await supabase
	// 	.from("collaborations")
	// 	.delete()
	// 	.eq("id", id);

	// if (deleteCollaborationError)
	// 	throw new ApiError(
	// 		deleteCollaborationError.message,
	// 		deleteCollaborationError.code,
	// 	);

	// if (existing.logo_path) {
	// 	const { error: deleteFileError } = await supabase.storage
	// 		.from("partners")
	// 		.remove([existing.logo_path]);

	// 	if (deleteFileError)
	// 		throw new ApiError(deleteFileError.message, deleteFileError.name);
	// }

	await new Promise((r) => setTimeout(r, 3000));

	return {
		success: true,
		message: "Data kolaborasi berhasil dihapus.",
	};
}
