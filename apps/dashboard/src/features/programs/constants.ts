export const PROGRAMS_QUERY_KEYS = {
	all: ["programs"],
} as const;

export const PROGRAMS_MUTATION_KEYS = {
	add: [...PROGRAMS_QUERY_KEYS.all, "add"],
	updateById: (id: string) => [...PROGRAMS_QUERY_KEYS.all, "update", id],
	deleteById: (id: string) => [...PROGRAMS_QUERY_KEYS.all, "delete", id],
};
