export const DASHBOARD_QUERY_KEYS = {
	all: ["dashboard"],
	statistics: () => [...DASHBOARD_QUERY_KEYS.all, "statistics"],
	recentNews: () => [...DASHBOARD_QUERY_KEYS.all, "recent-news"],
	recentGalleries: () => [...DASHBOARD_QUERY_KEYS.all, "recent-galleries"],
} as const;
