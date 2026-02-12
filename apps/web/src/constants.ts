export const PROGRAMS_QUERY_KEYS = {
	all: ["programs"],
	byId: (id: string) => [...PROGRAMS_QUERY_KEYS.all, id],
	latest: () => [...PROGRAMS_QUERY_KEYS.all, "latest"],
} as const;

export const NEWS_QUERY_KEYS = {
	all: ["news"],
	bySlug: (slug: string) => [...NEWS_QUERY_KEYS.all, slug],
	latest: () => [...NEWS_QUERY_KEYS.all, "latest"],
} as const;

export const MEMBERS_QUERY_KEYS = {
	all: ["members"],
} as const;
