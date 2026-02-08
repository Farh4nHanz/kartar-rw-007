import { type MutationOptions, mutationOptions } from "@tanstack/react-query";
import { PROGRAMS_MUTATION_KEYS } from "@/features/programs/constants";
import type { ProgramFormValue as ProgramPayload } from "@/features/programs/schemas";
import {
	addNewProgram,
	deleteProgramById,
	updateProgramById,
} from "@/features/programs/services";
import type { ErrorResponse, SuccessResponse } from "@/shared/types/api";

export function addNewProgramMutationOptions(
	options?: MutationOptions<SuccessResponse, ErrorResponse, ProgramPayload>,
) {
	return mutationOptions({
		mutationKey: PROGRAMS_MUTATION_KEYS.add,
		mutationFn: (payload) => addNewProgram(payload),
		...options,
	});
}

export function updateProgramByIdMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse, ProgramPayload>,
) {
	return mutationOptions({
		mutationKey: PROGRAMS_MUTATION_KEYS.updateById(id),
		mutationFn: (payload) => updateProgramById(id, payload),
		...options,
	});
}

export function deleteProgramByIdMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse>,
) {
	return mutationOptions({
		mutationKey: PROGRAMS_MUTATION_KEYS.deleteById(id),
		mutationFn: () => deleteProgramById(id),
		...options,
	});
}
