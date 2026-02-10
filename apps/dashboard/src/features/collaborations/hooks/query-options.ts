import { queryOptions } from "@tanstack/react-query";
import { COLLABORATIONS_QUERY_KEYS } from "@/features/collaborations/constants";
import {
	type GetAllCollaborationsParams,
	getAllCollaborations,
} from "@/features/collaborations/services";

export function getAllCollaborationsQueryOptions(
	params: GetAllCollaborationsParams,
) {
	return queryOptions({
		queryKey: [...COLLABORATIONS_QUERY_KEYS.all, params],
		queryFn: () => getAllCollaborations(params),
	});
}
