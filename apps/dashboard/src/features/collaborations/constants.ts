export const COLLABORATIONS_QUERY_KEYS = {
	all: ["collaborations"],
} as const;

export const COLLABORATIONS_MUTATION_KEYS = {
	add: [...COLLABORATIONS_QUERY_KEYS.all, "add"],
	updateById: (id: string) => [...COLLABORATIONS_QUERY_KEYS.all, "update", id],
	deleteById: (id: string) => [...COLLABORATIONS_QUERY_KEYS.all, "delete", id],
} as const;
