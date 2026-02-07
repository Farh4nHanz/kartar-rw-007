import { type MutationOptions, mutationOptions } from "@tanstack/react-query";
import { MEMBERS_MUTATION_KEYS } from "@/features/members/constants";
import type {
	AddMemberFormValues as AddMemberPayload,
	EditMemberFormValues as EditMemberPayload,
} from "@/features/members/schemas";
import {
	addNewMember,
	deleteMemberById,
	updateMemberById,
} from "@/features/members/services";
import type { ErrorResponse, SuccessResponse } from "@/shared/types/api";

export function addMemberMutationOptions(
	options?: MutationOptions<SuccessResponse, ErrorResponse, AddMemberPayload>,
) {
	return mutationOptions({
		mutationKey: MEMBERS_MUTATION_KEYS.add,
		mutationFn: (payload) => addNewMember(payload),
		...options,
	});
}

export function updateMemberByIdMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse, EditMemberPayload>,
) {
	return mutationOptions({
		mutationKey: MEMBERS_MUTATION_KEYS.updateById(id),
		mutationFn: (payload) => updateMemberById(id, payload),
		...options,
	});
}

export function deleteMemberByIdMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse>,
) {
	return mutationOptions({
		mutationKey: MEMBERS_MUTATION_KEYS.deleteById(id),
		mutationFn: () => deleteMemberById(id),
		...options,
	});
}
