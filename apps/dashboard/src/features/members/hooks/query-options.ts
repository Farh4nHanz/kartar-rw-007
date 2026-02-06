import { type QueryOptions, queryOptions } from "@tanstack/react-query";
import { MEMBER_QUERY_KEYS } from "@/features/members/constants";

export function getAllMemberQueryOptions(options?: QueryOptions) {
	return queryOptions({
		queryKey: MEMBER_QUERY_KEYS.all,
		queryFn: async () => {},
		retry: 1,
		retryDelay: 1000,
		...options,
	});
}
