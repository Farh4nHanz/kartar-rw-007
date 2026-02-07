import { type MutationOptions, mutationOptions } from "@tanstack/react-query";
import { POSITIONS_MUTATION_KEYS } from "@/features/positions/constants";
import type { PositionFormValue as PositionPayload } from "@/features/positions/schemas";
import {
	addNewPosition,
	deletePositionById,
	updatePositionById,
} from "@/features/positions/services";
import type { ErrorResponse, SuccessResponse } from "@/shared/types/api";

export function addPositionMutationOpions(
	options?: MutationOptions<SuccessResponse, ErrorResponse, PositionPayload>,
) {
	return mutationOptions({
		mutationKey: POSITIONS_MUTATION_KEYS.add,
		mutationFn: (payload: PositionPayload) => addNewPosition(payload),
		...options,
	});
}

export function updatePositionByIdMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse, PositionPayload>,
) {
	return mutationOptions({
		mutationKey: POSITIONS_MUTATION_KEYS.updateById(id),
		mutationFn: (payload: PositionPayload) => updatePositionById(id, payload),
		...options,
	});
}

export function deletePositionByIdMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse>,
) {
	return mutationOptions({
		mutationKey: POSITIONS_MUTATION_KEYS.deleteById(id),
		mutationFn: () => deletePositionById(id),
		...options,
	});
}
