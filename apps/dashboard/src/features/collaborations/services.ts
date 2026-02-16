import type { Tables } from "@workspace/supabase/database.types";
import { supabase } from "@/lib/supabase";
import { ApiError } from "@/shared/lib/api-error";
import { generateFilePath } from "@/shared/lib/utils/generate-file-path";
import { getPublicImageUrl } from "@/shared/lib/utils/get-public-image-url";
import type {
	SuccessResponse,
	SuccessResponseWithData,
} from "@/shared/types/api";
import type { CollaborationFormValues as CollaborationPayload } from "./schemas";

export type GetAllCollaborationsParams = {
	name?: string;
	category?: string;
	period?: string;
};

export type Collaboration = Pick<
	Tables<"collaborations">,
	"id" | "description" | "partner_name"
> & {
	category: Pick<Tables<"categories">, "id" | "name" | "type">;
	period: Pick<Tables<"periods">, "id" | "start_year" | "end_year">;
	logo_url: string | null;
};

const BUCKET_NAME = "partners";

export async function getAllCollaborations(
	params?: GetAllCollaborationsParams,
): Promise<SuccessResponseWithData<Collaboration[]>> {
	const { name, category, period } = params || {};

	let query = supabase.from("collaborations").select(
		`
			id,
			partner_name,
			description,
			logo_path,
			category:categories(id, name, type),
			period:periods(id, start_year, end_year)
			`,
		{ count: "exact" },
	);

	if (name) {
		query = query.ilike("name", `%${name}%`);
	}

	if (period) {
		const [start, end] = period.split("-");
		query = query.eq("period.start_year", +start).eq("period.end_year", +end);
	}

	if (category) {
		query = query.eq("category.type", category);
	}

	const { data, error } = await query;

	if (error) throw new ApiError(error.message, error.code);

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

export async function addNewCollaboration(
	payload: CollaborationPayload,
): Promise<SuccessResponse> {
	let logoPath: string | null = null;

	const { logo, ...restPayload } = payload;

	if (logo) {
		logoPath = generateFilePath(logo);

		const { error: uploadError } = await supabase.storage
			.from(BUCKET_NAME)
			.upload(logoPath, logo);

		if (uploadError) throw new ApiError(uploadError.message, uploadError.name);
	}

	const { error } = await supabase.from("collaborations").insert({
		...restPayload,
		logo_path: logoPath,
	});

	if (error) {
		if (error.code === "23505") {
			throw new ApiError("Mitra tersebut sudah ada.");
		}
		throw new ApiError(error.message, error.code);
	}

	return {
		success: true,
		message: "Mitra baru berhasil ditambahkan.",
	};
}

export async function updateCollaborationById(
	id: string,
	payload: CollaborationPayload,
): Promise<SuccessResponse> {
	const { data: existing, error: fetchError } = await supabase
		.from("collaborations")
		.select("logo_path")
		.eq("id", id)
		.single();

	if (fetchError) throw new ApiError(fetchError.message, fetchError.code);

	let newLogoPath: string | null = existing.logo_path;

	const { logo, ...restPayload } = payload;

	if (logo) {
		newLogoPath = generateFilePath(logo);

		const { error: uploadError } = await supabase.storage
			.from(BUCKET_NAME)
			.upload(newLogoPath, logo);

		if (uploadError) throw new ApiError(uploadError.message, uploadError.name);

		if (existing.logo_path) {
			const { error: deleteError } = await supabase.storage
				.from(BUCKET_NAME)
				.remove([existing.logo_path]);

			if (deleteError)
				throw new ApiError(deleteError.message, deleteError.name);
		}
	}

	const { error: updateError } = await supabase
		.from("collaborations")
		.update({
			...restPayload,
			logo_path: newLogoPath,
		})
		.eq("id", id);

	if (updateError) {
		if (updateError.code === "23505") {
			throw new ApiError("Mitra tersebut sudah ada.");
		}
		throw new ApiError(updateError.message, updateError.code);
	}

	return {
		success: true,
		message: "Data kolaborasi berhasil diperbarui.",
	};
}

export async function deleteCollaborationById(
	id: string,
): Promise<SuccessResponse> {
	const { data: existing, error: fetchError } = await supabase
		.from("collaborations")
		.select("logo_path")
		.eq("id", id)
		.single();

	if (fetchError) throw new ApiError(fetchError.message, fetchError.code);

	const { error: deleteCollaborationError } = await supabase
		.from("collaborations")
		.delete()
		.eq("id", id);

	if (deleteCollaborationError)
		throw new ApiError(
			deleteCollaborationError.message,
			deleteCollaborationError.code,
		);

	if (existing.logo_path) {
		const { error: deleteFileError } = await supabase.storage
			.from(BUCKET_NAME)
			.remove([existing.logo_path]);

		if (deleteFileError)
			throw new ApiError(deleteFileError.message, deleteFileError.name);
	}

	return {
		success: true,
		message: "Data kolaborasi berhasil dihapus.",
	};
}
