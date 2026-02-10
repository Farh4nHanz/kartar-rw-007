import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { getAllCategoriesQueryOptions } from "@/features/categories/hooks/query-options";
import { AddGalleryForm } from "@/features/galleries/components/forms/add-gallery-form";

export const Route = createFileRoute("/(app)/(publication)/galeri/new")({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(
			getAllCategoriesQueryOptions({ type: "galeri" }),
		),
});

function RouteComponent() {
	const { data: categories, isLoading: isCategoriesFetchLoading } = useQuery(
		getAllCategoriesQueryOptions({ type: "galeri" }),
	);

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
					<h1 className="font-bold text-2xl">Tambah Galeri</h1>
					<h3 className="text-muted-foreground text-sm">
						Tambahkan koleksi foto dokumentasi kegiatan organisasi ke dalam
						galeri.
					</h3>
				</hgroup>
			</div>

			<AddGalleryForm
				isLoading={isCategoriesFetchLoading}
				categories={categories?.data || []}
			/>
		</div>
	);
}
