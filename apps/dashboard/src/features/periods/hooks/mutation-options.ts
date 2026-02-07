import { type MutationOptions, mutationOptions } from "@tanstack/react-query";
import { PERIODS_MUTATION_KEYS } from "@/features/periods/constants";
import type { PeriodFormValue as PeriodPayload } from "@/features/periods/schemas";
import {
	addNewPeriod,
	deletePeriodById,
	updatePeriodById,
} from "@/features/periods/services";
import type { ErrorResponse, SuccessResponse } from "@/shared/types/api";

export function addPeriodMutationOpions(
	options?: MutationOptions<SuccessResponse, ErrorResponse, PeriodPayload>,
) {
	return mutationOptions({
		mutationKey: PERIODS_MUTATION_KEYS.add,
		mutationFn: (payload: PeriodPayload) => addNewPeriod(payload),
		...options,
	});
}

export function updatePeriodByIdMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse, PeriodPayload>,
) {
	return mutationOptions({
		mutationKey: PERIODS_MUTATION_KEYS.updateById(id),
		mutationFn: (payload: PeriodPayload) => updatePeriodById(id, payload),
		...options,
	});
}

export function deletePeriodByIdMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse>,
) {
	return mutationOptions({
		mutationKey: PERIODS_MUTATION_KEYS.deleteById(id),
		mutationFn: () => deletePeriodById(id),
		...options,
	});
}
