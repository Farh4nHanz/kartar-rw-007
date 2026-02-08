import { queryOptions } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEYS } from "@/features/categories/constants";
import {
	type GetAllCategoriesParams,
	getAllCategories,
} from "@/features/categories/services";

export function getAllCategoriesQueryOptions(params?: GetAllCategoriesParams) {
	return queryOptions({
		queryKey: CATEGORIES_QUERY_KEYS.all,
		queryFn: () => getAllCategories(params),
	});
}
