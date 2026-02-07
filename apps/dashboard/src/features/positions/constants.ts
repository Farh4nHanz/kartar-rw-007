export const POSITIONS_QUERY_KEYS = {
	all: ["positions"],
} as const;

export const POSITIONS_MUTATION_KEYS = {
	add: ["positions", "add"],
	updateById: (id: string) => ["positions", "update", id],
	deleteById: (id: string) => ["positions", "delete", id],
} as const;
