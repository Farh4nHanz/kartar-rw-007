export const GALLERIES_QUERY_KEYS = {
	all: ["galleries"],
	byId: (id: string) => [...GALLERIES_QUERY_KEYS.all, id],
} as const;

export const GALLERIES_MUTATION_KEYS = {
	add: [...GALLERIES_QUERY_KEYS.all, "add"],
	updateById: (id: string) => [...GALLERIES_QUERY_KEYS.all, "update", id],
	deleteById: (id: string) => [...GALLERIES_QUERY_KEYS.all, "delete", id],
} as const;
