import { type MutationOptions, mutationOptions } from "@tanstack/react-query";
import { COLLABORATIONS_MUTATION_KEYS } from "@/features/collaborations/constants";
import type { CollaborationFormValues as CollaborationPayload } from "@/features/collaborations/schemas";
import {
	addNewCollaboration,
	deleteCollaborationById,
	updateCollaborationById,
} from "@/features/collaborations/services";
import type { ErrorResponse, SuccessResponse } from "@/shared/types/api";

export function addCollaborationMutationOptions(
	options?: MutationOptions<
		SuccessResponse,
		ErrorResponse,
		CollaborationPayload
	>,
) {
	return mutationOptions({
		mutationKey: COLLABORATIONS_MUTATION_KEYS.add,
		mutationFn: (payload) => addNewCollaboration(payload),
		...options,
	});
}

export function updateCollaborationByIdMutationOptions(
	id: string,
	options?: MutationOptions<
		SuccessResponse,
		ErrorResponse,
		CollaborationPayload
	>,
) {
	return mutationOptions({
		mutationKey: COLLABORATIONS_MUTATION_KEYS.updateById(id),
		mutationFn: (payload) => updateCollaborationById(id, payload),
		...options,
	});
}

export function deleteCollaborationByIdMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse>,
) {
	return mutationOptions({
		mutationKey: COLLABORATIONS_MUTATION_KEYS.deleteById(id),
		mutationFn: () => deleteCollaborationById(id),
		...options,
	});
}
