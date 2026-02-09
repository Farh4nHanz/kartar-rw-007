import { queryOptions } from "@tanstack/react-query";
import { NEWS_QUERY_KEYS } from "@/features/news/constants";
import {
	type GetAllNewsParams,
	getAllNews,
	getNewsDetailBySlug,
} from "@/features/news/services";

export function getAllNewsQueryOptions(params?: GetAllNewsParams) {
	return queryOptions({
		queryKey: [...NEWS_QUERY_KEYS.all, params],
		queryFn: () => getAllNews(params),
	});
}

export function getNewsDetailBySlugQueryOptions(slug: string) {
	return queryOptions({
		queryKey: NEWS_QUERY_KEYS.bySlug(slug),
		queryFn: () => getNewsDetailBySlug(slug),
	});
}
