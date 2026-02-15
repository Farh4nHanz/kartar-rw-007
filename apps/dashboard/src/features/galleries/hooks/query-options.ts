import { queryOptions } from "@tanstack/react-query";
import { GALLERIES_QUERY_KEYS } from "@/features/galleries/constants";
import {
	type GetAllGalleriesParams,
	getAllGalleries,
	getGalleryDetailBySlug,
} from "@/features/galleries/services";

export function getAllGalleriesQueryOptions(params?: GetAllGalleriesParams) {
	return queryOptions({
		queryKey: [...GALLERIES_QUERY_KEYS.all, params],
		queryFn: () => getAllGalleries(params),
	});
}

export function getGalleryDetailBySlugQueryOptions(slug: string) {
	return queryOptions({
		queryKey: GALLERIES_QUERY_KEYS.bySlug(slug),
		queryFn: () => getGalleryDetailBySlug(slug),
	});
}
