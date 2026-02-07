export const MEMBERS_QUERY_KEYS = {
	all: ["members"],
} as const;

export const MEMBERS_MUTATION_KEYS = {
	add: [...MEMBERS_QUERY_KEYS.all, "add"],
	updateById: (id: string) => [...MEMBERS_QUERY_KEYS.all, "update", id],
	deleteById: (id: string) => [...MEMBERS_QUERY_KEYS.all, "delete", id],
} as const;
