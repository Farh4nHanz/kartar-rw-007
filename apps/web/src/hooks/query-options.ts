import { queryOptions } from "@tanstack/react-query";
import { NEWS_QUERY_KEYS, PROGRAMS_QUERY_KEYS } from "@/constants";
import {
	getAllNews,
	getLatestNews,
	getNewsDetailBySlug,
} from "@/services/news-service";
import {
	getAllPrograms,
	getLatestPrograms,
	getProgramDetailById,
} from "@/services/program-service";

export function getAllProgramsQueryOptions() {
	return queryOptions({
		queryKey: PROGRAMS_QUERY_KEYS.all,
		queryFn: getAllPrograms,
	});
}

export function getLatestProgramsQueryOptions() {
	return queryOptions({
		queryKey: PROGRAMS_QUERY_KEYS.latest(),
		queryFn: () => getLatestPrograms(),
	});
}

export function getProgramByIdQueryOptions(id: string) {
	return queryOptions({
		queryKey: PROGRAMS_QUERY_KEYS.byId(id),
		queryFn: () => getProgramDetailById(id),
	});
}

export function getAllNewsQueryOptions() {
	return queryOptions({
		queryKey: NEWS_QUERY_KEYS.all,
		queryFn: getAllNews,
	});
}

export function getLatestNewsQueryOptions() {
	return queryOptions({
		queryKey: NEWS_QUERY_KEYS.latest(),
		queryFn: getLatestNews,
	});
}

export function getNewsBySlugQueryOptions(slug: string) {
	return queryOptions({
		queryKey: NEWS_QUERY_KEYS.bySlug(slug),
		queryFn: () => getNewsDetailBySlug(slug),
	});
}
