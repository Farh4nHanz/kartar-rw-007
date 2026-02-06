import { type MutationOptions, mutationOptions } from "@tanstack/react-query";
import type { EditMemberSchema } from "@/features/members/schemas";
import type { ErrorResponse, SuccessResponse } from "@/features/members/types";

export function editMemberMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse, EditMemberSchema>,
) {
	return mutationOptions({
		mutationFn: async (data: EditMemberSchema) => {
			const res = await fetch(`http://localhost:3000/members/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "multipart/form-data" },
				body: JSON.stringify(data),
			});
			const json = await res.json();
			return json as SuccessResponse;
		},
		retry: 3,
		retryDelay: 1000,
		...options,
	});
}

export function deleteMemberMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse>,
) {
	return mutationOptions({
		mutationFn: async () => {
			const res = await fetch(`http://localhost:3000/members/${id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});
			const json = await res.json();
			return json as SuccessResponse;
		},
		retry: 3,
		retryDelay: 1000,
		...options,
	});
}
