import { queryOptions } from "@tanstack/react-query";
import { POSITIONS_QUERY_KEYS } from "@/features/positions/constants";
import {
	type GetAllPositionsParams,
	getAllPositions,
} from "@/features/positions/services";

export function getAllPositionsQueryOptions(params: GetAllPositionsParams) {
	return queryOptions({
		queryKey: [...POSITIONS_QUERY_KEYS.all, params],
		queryFn: () => getAllPositions(params),
	});
}
