import { queryOptions } from "@tanstack/react-query";
import { GALLERIES_QUERY_KEYS } from "@/features/galleries/constants";
import {
	type GetAllGalleriesParams,
	getAllGalleries,
	getGalleryDetailById,
} from "@/features/galleries/services";

export function getAllGalleriesQueryOptions(params?: GetAllGalleriesParams) {
	return queryOptions({
		queryKey: [...GALLERIES_QUERY_KEYS.all, params],
		queryFn: () => getAllGalleries(params),
	});
}

export function getGalleryDetailByIdQueryOptions(id: string) {
	return queryOptions({
		queryKey: GALLERIES_QUERY_KEYS.byId(id),
		queryFn: () => getGalleryDetailById(id),
	});
}
