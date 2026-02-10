import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { getAllCategoriesQueryOptions } from "@/features/categories/hooks/query-options";
import { EditGalleryForm } from "@/features/galleries/components/forms/edit-gallery-form";
import { getGalleryDetailByIdQueryOptions } from "@/features/galleries/hooks/query-options";
import type { Gallery } from "@/features/galleries/services";

export const Route = createFileRoute("/(app)/(publication)/galeri/$id/edit")({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(
			getAllCategoriesQueryOptions({ type: "galeri" }),
		),
});

function RouteComponent() {
	const { id } = useParams({
		from: "/(app)/(publication)/galeri/$id/edit",
	});

	const { data: gallery, isLoading: isGalleryDataFetchLoading } = useQuery(
		getGalleryDetailByIdQueryOptions(id),
	);

	const { data: categories, isLoading: isCategoriesDataFetchLoading } =
		useQuery(getAllCategoriesQueryOptions({ type: "galeri" }));

	return (
		<div className="h-full min-h-dvh w-full space-y-8 overflow-x-auto px-4 pt-20 pb-6">
			<div className="flex flex-nowrap items-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					className="shrink-0 self-start"
					asChild
				>
					<Link to="/galeri">
						<ArrowLeft />
					</Link>
				</Button>

				<hgroup className="space-y-1">
					<h1 className="font-bold text-2xl">Edit Galeri</h1>
					<h3 className="text-muted-foreground text-sm">
						{gallery?.data?.title}
					</h3>
				</hgroup>
			</div>

			<EditGalleryForm
				isLoading={isCategoriesDataFetchLoading || isGalleryDataFetchLoading}
				selectedData={gallery?.data as Gallery}
				categories={categories?.data || []}
			/>
		</div>
	);
}
