import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "@workspace/ui/components/404";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { ArrowLeft, Calendar, Image as ImageIcon } from "lucide-react";
import { getGalleryDetailByIdQueryOptions } from "@/hooks/query-options";

export const Route = createFileRoute("/galeri/$id/detail")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();

	const { data: gallery, isLoading: isGalleryDataFetchLoading } = useQuery(
		getGalleryDetailByIdQueryOptions(id),
	);

	if (isGalleryDataFetchLoading) return <GalleryDetailSkeleton />;
	if (!gallery?.data) return <NotFound />;

	return (
		<section className="container mx-auto px-4 py-10">
			{/* Back button */}
			<Button
				variant="ghost"
				className="mb-6 gap-2 text-blue-900"
				onClick={() => window.history.back()}
			>
				<ArrowLeft className="size-4" />
				Kembali
			</Button>

			{/* Header */}
			<div className="mb-6 space-y-4">
				<div className="flex flex-wrap items-center gap-3">
					<Badge className="bg-blue-100 text-blue-900 capitalize hover:bg-blue-100">
						{gallery.data.category.name}
					</Badge>

					<span className="flex items-center gap-1 text-muted-foreground text-sm">
						<Calendar className="size-4" />
						{new Intl.DateTimeFormat("id-ID", {
							dateStyle: "long",
						}).format(new Date(gallery.data.activity_date))}
					</span>

					<span className="text-muted-foreground text-sm">
						• {gallery.data.images.length} Foto
					</span>
				</div>

				<h1 className="font-bold text-3xl text-blue-900 capitalize leading-tight md:text-4xl">
					{gallery.data.title}
				</h1>

				<p className="text-lg text-muted-foreground leading-relaxed first-letter:capitalize">
					{gallery.data.description}
				</p>
			</div>

			<Separator className="my-8" />

			{/* Gallery Images */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<ImageIcon className="size-5" />
						Dokumentasi Kegiatan
					</CardTitle>
				</CardHeader>

				<CardContent className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
					{gallery.data.images.length ? (
						gallery.data.images.map((image) => (
							<div
								key={image.id}
								className="group relative aspect-square overflow-hidden rounded-lg border hover:cursor-pointer"
								onClick={() =>
									image.image_url && window.open(image.image_url, "_blank")
								}
							>
								<img
									src={image.image_url || "https://placehold.co/400x400"}
									alt={gallery.data.title}
									className="h-full w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-105"
								/>

								{/* Hover overlay */}
								<div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
							</div>
						))
					) : (
						<div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground">
							<ImageIcon className="mb-2 size-12" />
							<p>Tidak ada foto untuk galeri ini</p>
						</div>
					)}
				</CardContent>
			</Card>
		</section>
	);
}

export function GalleryDetailSkeleton() {
	return (
		<section className="container mx-auto animate-pulse px-4 py-10">
			{/* Back button */}
			<Button variant="ghost" className="mb-6 gap-2 text-blue-900" disabled>
				<ArrowLeft className="size-4" />
				Kembali
			</Button>

			{/* Header */}
			<div className="mb-6 space-y-4">
				<div className="flex flex-wrap items-center gap-3">
					<Skeleton className="h-6 w-24 rounded-full" />
					<Skeleton className="h-4 w-40" />
					<Skeleton className="h-4 w-20" />
				</div>

				<Skeleton className="h-10 w-3/4" />

				<div className="space-y-2">
					<Skeleton className="h-5 w-full" />
					<Skeleton className="h-5 w-5/6" />
				</div>
			</div>

			{/* Divider */}
			<Skeleton className="my-8 h-px w-full" />

			{/* Images */}
			<Card>
				<CardHeader>
					<Skeleton className="h-6 w-48" />
				</CardHeader>

				<CardContent className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
					{Array.from({ length: 6 }).map((_, i) => (
						<Skeleton key={i} className="aspect-square w-full rounded-lg" />
					))}
				</CardContent>
			</Card>
		</section>
	);
}
