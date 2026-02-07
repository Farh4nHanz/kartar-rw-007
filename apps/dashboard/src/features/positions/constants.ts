export const POSITIONS_QUERY_KEYS = {
	all: ["positions"],
} as const;

export const POSITIONS_MUTATION_KEYS = {
	add: [...POSITIONS_QUERY_KEYS.all, "add"],
	updateById: (id: string) => [...POSITIONS_QUERY_KEYS.all, "update", id],
	deleteById: (id: string) => [...POSITIONS_QUERY_KEYS.all, "delete", id],
} as const;
