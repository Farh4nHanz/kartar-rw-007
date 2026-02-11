import { queryOptions } from "@tanstack/react-query";
import { DASHBOARD_QUERY_KEYS } from "@/features/dashboard/constants";
import {
	getDashboardStatistics,
	getRecentGalleries,
	getRecentNews,
} from "@/features/dashboard/services";

export function dashboardStatisticsQueryOptions() {
	return queryOptions({
		queryKey: DASHBOARD_QUERY_KEYS.statistics(),
		queryFn: getDashboardStatistics,
	});
}

export function recentNewsQueryOptions() {
	return queryOptions({
		queryKey: DASHBOARD_QUERY_KEYS.recentNews(),
		queryFn: getRecentNews,
	});
}

export function recentGalleriesQueryOptions() {
	return queryOptions({
		queryKey: DASHBOARD_QUERY_KEYS.recentGalleries(),
		queryFn: getRecentGalleries,
	});
}
