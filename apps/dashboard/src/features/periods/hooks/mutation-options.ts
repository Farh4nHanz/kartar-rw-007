import { type MutationOptions, mutationOptions } from "@tanstack/react-query";
import { PERIODS_MUTATION_KEYS } from "@/features/periods/constants";
import type { AddPeriodFormValue as AddPeriodPayload } from "@/features/periods/schemas";
import { addNewPeriod, deletePeriodById } from "@/features/periods/services";
import type { ErrorResponse, SuccessResponse } from "@/shared/types/api";

export function addPeriodMutationOpions(
	options?: MutationOptions<SuccessResponse, ErrorResponse, AddPeriodPayload>,
) {
	return mutationOptions({
		mutationKey: PERIODS_MUTATION_KEYS.add,
		mutationFn: (payload: AddPeriodPayload) => addNewPeriod(payload),
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
