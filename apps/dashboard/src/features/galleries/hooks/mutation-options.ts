import { type MutationOptions, mutationOptions } from "@tanstack/react-query";
import { GALLERIES_MUTATION_KEYS } from "@/features/galleries/constants";
import type {
	AddGalleryFormValues as AddGalleryPayload,
	EditGalleryFormValues as EditGalleryPayload,
} from "@/features/galleries/schemas";
import {
	addNewGallery,
	deleteGalleryBySlug,
	updateGalleryBySlug,
} from "@/features/galleries/services";
import type { ErrorResponse, SuccessResponse } from "@/shared/types/api";

export function addGalleryMutationOptions(
	options?: MutationOptions<SuccessResponse, ErrorResponse, AddGalleryPayload>,
) {
	return mutationOptions({
		mutationKey: GALLERIES_MUTATION_KEYS.add,
		mutationFn: (payload) => addNewGallery(payload),
		...options,
	});
}

export function updateGalleryBySlugMutationOptions(
	slug: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse, EditGalleryPayload>,
) {
	return mutationOptions({
		mutationKey: GALLERIES_MUTATION_KEYS.updateBySlug(slug),
		mutationFn: (payload) => updateGalleryBySlug(slug, payload),
		...options,
	});
}

export function deleteGalleryBySlugMutationOptions(
	slug: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse>,
) {
	return mutationOptions({
		mutationKey: GALLERIES_MUTATION_KEYS.deleteBySlug(slug),
		mutationFn: () => deleteGalleryBySlug(slug),
		...options,
	});
}
