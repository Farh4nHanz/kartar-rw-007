export const PERIODS_QUERY_KEYS = {
	all: ["periods"],
} as const;

export const PERIODS_MUTATION_KEYS = {
	add: ["periods", "add"],
	updateById: (id: string) => ["periods", "update", id],
	deleteById: (id: string) => ["periods", "delete", id],
} as const;
