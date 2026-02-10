import { type MutationOptions, mutationOptions } from "@tanstack/react-query";
import { GALLERIES_MUTATION_KEYS } from "@/features/galleries/constants";
import type {
	AddGalleryFormValues as AddGalleryPayload,
	EditGalleryFormValues as EditGalleryPayload,
} from "@/features/galleries/schemas";
import {
	addNewGallery,
	deleteGalleryById,
	updateGalleryById,
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

export function updateGalleryByIdMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse, EditGalleryPayload>,
) {
	return mutationOptions({
		mutationKey: GALLERIES_MUTATION_KEYS.updateById(id),
		mutationFn: (payload) => updateGalleryById(id, payload),
		...options,
	});
}

export function deleteGalleryByIdMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse>,
) {
	return mutationOptions({
		mutationKey: GALLERIES_MUTATION_KEYS.deleteById(id),
		mutationFn: () => deleteGalleryById(id),
		...options,
	});
}
