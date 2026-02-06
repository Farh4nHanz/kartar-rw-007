export const MEMBER_QUERY_KEYS = {
	all: ["members"],
	byId: (id: string) => [...MEMBER_QUERY_KEYS.all, id],
};
