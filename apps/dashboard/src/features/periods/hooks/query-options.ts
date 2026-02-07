import { queryOptions } from "@tanstack/react-query";
import { PERIODS_QUERY_KEYS } from "@/features/periods/constants";
import {
	type GetAllPeriodsParams,
	getAllPeriods,
} from "@/features/periods/services";

export function getAllPeriodsQueryOptions(params: GetAllPeriodsParams) {
	return queryOptions({
		queryKey: [...PERIODS_QUERY_KEYS.all, params],
		queryFn: () => getAllPeriods(params),
	});
}
