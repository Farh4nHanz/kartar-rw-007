import { queryOptions } from "@tanstack/react-query";
import { PROGRAMS_QUERY_KEYS } from "@/features/programs/constants";
import {
	type GetAllProgramsParams,
	getAllPrograms,
} from "@/features/programs/services";

export function getAllProgramsQueryOptions(params?: GetAllProgramsParams) {
	return queryOptions({
		queryKey: [...PROGRAMS_QUERY_KEYS.all, params],
		queryFn: () => getAllPrograms(params),
	});
}
