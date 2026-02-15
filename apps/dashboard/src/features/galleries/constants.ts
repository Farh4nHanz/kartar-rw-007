export const GALLERIES_QUERY_KEYS = {
	all: ["galleries"],
	bySlug: (slug: string) => [...GALLERIES_QUERY_KEYS.all, slug],
} as const;

export const GALLERIES_MUTATION_KEYS = {
	add: [...GALLERIES_QUERY_KEYS.all, "add"],
	updateBySlug: (slug: string) => [...GALLERIES_QUERY_KEYS.all, "update", slug],
	deleteBySlug: (slug: string) => [...GALLERIES_QUERY_KEYS.all, "delete", slug],
} as const;
