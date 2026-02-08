import { type MutationOptions, mutationOptions } from "@tanstack/react-query";
import { CATEGORIES_MUTATION_KEYS } from "@/features/categories/constants";
import type { CategoryFormValue as CategoryPayload } from "@/features/categories/schemas";
import {
	addNewCategory,
	deleteCategoryById,
	updateCategoryById,
} from "@/features/categories/services";
import type { ErrorResponse, SuccessResponse } from "@/shared/types/api";

export function addNewCategoryMutationOptions(
	options?: MutationOptions<SuccessResponse, ErrorResponse, CategoryPayload>,
) {
	return mutationOptions({
		mutationKey: CATEGORIES_MUTATION_KEYS.add,
		mutationFn: (payload) => addNewCategory(payload),
		...options,
	});
}

export function updateCategoryByIdMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse, CategoryPayload>,
) {
	return mutationOptions({
		mutationKey: CATEGORIES_MUTATION_KEYS.updateById(id),
		mutationFn: (payload) => updateCategoryById(id, payload),
		...options,
	});
}

export function deleteCategoryByIdMutationOptions(
	id: string,
	options?: MutationOptions<SuccessResponse, ErrorResponse>,
) {
	return mutationOptions({
		mutationKey: CATEGORIES_MUTATION_KEYS.deleteById(id),
		mutationFn: () => deleteCategoryById(id),
		...options,
	});
}
