import { queryOptions } from "@tanstack/react-query";
import { MEMBERS_QUERY_KEYS } from "@/features/members/constants";
import {
	type GetAllMembersParams,
	getAllMembers,
} from "@/features/members/services";

export function getAllMembersQueryOptions(params: GetAllMembersParams) {
	return queryOptions({
		queryKey: [...MEMBERS_QUERY_KEYS.all, params],
		queryFn: () => getAllMembers(params),
	});
}
