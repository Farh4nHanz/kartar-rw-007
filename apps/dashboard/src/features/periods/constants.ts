export const PERIODS_QUERY_KEYS = {
	all: ["periods"],
} as const;

export const PERIODS_MUTATION_KEYS = {
	add: [...PERIODS_QUERY_KEYS.all, "add"],
	updateById: (id: string) => [...PERIODS_QUERY_KEYS.all, "update", id],
	deleteById: (id: string) => [...PERIODS_QUERY_KEYS.all, "delete", id],
} as const;
