export const NEWS_QUERY_KEYS = {
	all: ["news"],
	bySlug: (slug: string) => [...NEWS_QUERY_KEYS.all, slug],
} as const;

export const NEWS_MUTATION_KEYS = {
	add: [...NEWS_QUERY_KEYS.all, "add"],
	updateById: (id: string) => [...NEWS_QUERY_KEYS.all, "update", id],
	updateBySlug: (slug: string) => [...NEWS_QUERY_KEYS.all, "update", slug],
	deleteById: (id: string) => [...NEWS_QUERY_KEYS.all, "delete", id],
};
