import { type MutationOptions, mutationOptions } from "@tanstack/react-query";
import { NEWS_MUTATION_KEYS } from "@/features/news/constants";
import type {
	AddNewsFormValue as AddNewsPayload,
	EditNewsFormValue as EditNewsPayload,
} from "@/features/news/schemas";
import {
	addNewNews,
	deleteNewsById,
	updateNewsBySlug,
	updateNewsStatusById,
} from "@/features/news/services";
import type { ErrorResponse, SuccessResponse } from "@/shared/types/api";

export function addNewNewsMutationOptions(
	options?: MutationOptions<SuccessResponse, ErrorResponse, AddNewsPayload>,
) {
	return mutationOptions({
		mutationKey: NEWS_MUTATION_KEYS.add,
		mutationFn: (payload) => addNewNews(payload),
		...options,
	});
}

export function updateNewsBySlugMutationOptions(
	slug: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse, EditNewsPayload>,
) {
	return mutationOptions({
		mutationKey: NEWS_MUTATION_KEYS.updateBySlug(slug),
		mutationFn: (payload) => updateNewsBySlug(slug, payload),
		...options,
	});
}

export function updateNewsStatusByIdMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse, boolean>,
) {
	return mutationOptions({
		mutationKey: NEWS_MUTATION_KEYS.updateById(id),
		mutationFn: (isPublished) => updateNewsStatusById(id, isPublished),
		...options,
	});
}

export function deleteNewsByIdMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse>,
) {
	return mutationOptions({
		mutationKey: NEWS_MUTATION_KEYS.deleteById(id),
		mutationFn: () => deleteNewsById(id),
		...options,
	});
}
