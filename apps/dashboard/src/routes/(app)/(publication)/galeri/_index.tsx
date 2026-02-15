import { createFileRoute } from "@tanstack/react-router";
import { GalleryList } from "@/features/galleries/components/gallery-list";
import { getAllGalleriesQueryOptions } from "@/features/galleries/hooks/query-options";
import type { GetAllGalleriesParams } from "@/features/galleries/services";

export const Route = createFileRoute("/(app)/(publication)/galeri/_index")({
	validateSearch: (search: GetAllGalleriesParams): GetAllGalleriesParams => ({
		page: search.page || 1,
		limit: search.limit || 10,
		name: search.name || undefined,
	}),
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(getAllGalleriesQueryOptions()),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-full min-h-dvh w-full space-y-8 overflow-x-auto px-4 pt-20 pb-6">
			<h2 className="mb-2 font-bold text-2xl">Galeri Kegiatan</h2>
			<p className="text-muted-foreground">
				Kelola dokumentasi kegiatan yang dimiliki oleh organisasi.
			</p>

			<GalleryList />
		</div>
	);
}
