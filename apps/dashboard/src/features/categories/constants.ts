export const CATEGORIES_QUERY_KEYS = {
	all: ["categories"],
} as const;

export const CATEGORIES_MUTATION_KEYS = {
	add: [...CATEGORIES_QUERY_KEYS.all, "add"],
	updateById: (id: string) => [...CATEGORIES_QUERY_KEYS.all, "update", id],
	deleteById: (id: string) => [...CATEGORIES_QUERY_KEYS.all, "delete", id],
};
