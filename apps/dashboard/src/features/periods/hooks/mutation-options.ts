import { type MutationOptions, mutationOptions } from "@tanstack/react-query";
import { deletePeriodById } from "@/features/periods/services";
import type { ErrorResponse, SuccessResponse } from "@/shared/types/api";

export function deletePeriodByIdMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse>,
) {
	return mutationOptions({
		mutationFn: () => deletePeriodById(id),
		...options,
	});
}
