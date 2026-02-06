import { queryOptions } from "@tanstack/react-query";
import { DASHBOARD_QUERY_KEYS } from "@/features/dashboard/constants";
import {
	type DashboardStatistics,
	getDashboardStatistics,
	getRecentGalleries,
	getRecentNews,
	type RecentGalleries,
	type RecentNews,
} from "@/features/dashboard/services";

export function dashboardStatisticsQueryOptions() {
	return queryOptions<DashboardStatistics, Error>({
		queryKey: DASHBOARD_QUERY_KEYS.statistics(),
		queryFn: getDashboardStatistics,
	});
}

export function recentNewsQueryOptions() {
	return queryOptions<RecentNews[], Error>({
		queryKey: DASHBOARD_QUERY_KEYS.recentNews(),
		queryFn: getRecentNews,
	});
}

export function recentGalleriesQueryOptions() {
	return queryOptions<RecentGalleries[], Error>({
		queryKey: DASHBOARD_QUERY_KEYS.recentGalleries(),
		queryFn: getRecentGalleries,
	});
}
