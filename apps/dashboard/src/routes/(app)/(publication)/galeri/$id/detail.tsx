import { useQuery } from "@tanstack/react-query";
import {
	createFileRoute,
	Link,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { ArrowLeft, Pencil } from "lucide-react";
import { useMemo } from "react";
import { getGalleryDetailByIdQueryOptions } from "@/features/galleries/hooks/query-options";

export const Route = createFileRoute("/(app)/(publication)/galeri/$id/detail")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = useParams({
		from: "/(app)/(publication)/galeri/$id/detail",
	});

	const _navigate = useNavigate({
		from: "/galeri/$id/detail",
	});

	const { data: gallery, isLoading } = useQuery(
		getGalleryDetailByIdQueryOptions(id),
	);

	const getActivityDate = useMemo(
		() =>
			gallery?.data.activity_date !== null &&
			gallery?.data.activity_date !== undefined
				? new Intl.DateTimeFormat("id-ID", {
						dateStyle: "long",
					}).format(new Date(gallery?.data.activity_date as string))
				: "Belum dipublikasi",
		[gallery?.data.activity_date],
	);

	if (isLoading) {
		return <GalleryDetailSkeleton />;
	}

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

				<div className="flex-1">
					<h1 className="font-bold text-2xl">{gallery?.data.title}</h1>
					<p className="text-muted-foreground text-sm">
						Detail galeri kegiatan
					</p>
				</div>

				<Button
					className="gap-2 justify-self-end bg-yellow-400 hover:bg-yellow-500"
					// onClick={() => navigate({ to: "/berita/$slug/edit", params: { id } })}
				>
					<Pencil />
					Edit Galeri
				</Button>
			</div>

			{/* Gallery Information */}
			<Card>
				<CardContent className="grid grid-cols-1 gap-6 [&_div]:space-y-2 [&_h3]:font-semibold [&_h3]:text-sm [&_h5]:text-muted-foreground [&_h5]:text-xs">
					<div>
						<h5>Tanggal Kegiatan</h5>
						<h3>{getActivityDate}</h3>
					</div>
					<div>
						<h5>Kategori</h5>
						<Badge className="bg-gray-200 text-gray-700 capitalize dark:bg-gray-500 dark:text-gray-50">
							{gallery?.data.category.name}
						</Badge>
					</div>
					<div>
						<h5>Jumlah Foto</h5>
						<h3>{gallery?.data.images.length} foto</h3>
					</div>
				</CardContent>
			</Card>

			{/* Gallery Images */}
			<Card>
				<CardHeader>
					<CardTitle>Semua Foto</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] items-center justify-center gap-4">
					{gallery?.data.images.map((image) => (
						<div
							key={image.id}
							className="group relative aspect-square overflow-hidden rounded-lg border border-border"
						>
							<img
								src={image.image_url || "https://placehold.co/300x300"}
								alt={image.id}
								className="h-full w-full cursor-pointer object-cover transition-transform hover:scale-105"
								onClick={() =>
									image.image_url !== null &&
									window.open(image.image_url, "_blank")
								}
							/>
							<div className="absolute right-0 bottom-0 left-0 bg-black/70 px-2 py-1 text-white opacity-0 transition-opacity group-hover:opacity-100">
								<p className="truncate text-xs">{image.image_url}</p>
							</div>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}

export function GalleryDetailSkeleton() {
	return (
		<div className="h-full min-h-dvh w-full space-y-8 overflow-x-auto px-4 pt-20 pb-6">
			{/* Header */}
			<div className="flex flex-nowrap items-center gap-4">
				<Skeleton className="h-10 w-10 shrink-0 rounded-md" />

				<div className="flex flex-1 flex-col gap-3">
					<Skeleton className="h-7 w-64" />
					<Skeleton className="h-3 w-40" />
				</div>

				<Skeleton className="h-10 w-32 rounded-md" />
			</div>

			{/* Gallery Information */}
			<Card>
				<CardContent className="grid grid-cols-1 gap-6 py-6">
					<div className="space-y-2">
						<Skeleton className="h-3 w-32" />
						<Skeleton className="h-5 w-48" />
					</div>

					<div className="space-y-2">
						<Skeleton className="h-3 w-20" />
						<Skeleton className="h-6 w-24 rounded-full" />
					</div>

					<div className="space-y-2">
						<Skeleton className="h-3 w-24" />
						<Skeleton className="h-5 w-32" />
					</div>
				</CardContent>
			</Card>

			{/* Gallery Images */}
			<Card>
				<CardHeader>
					<Skeleton className="h-6 w-32" />
				</CardHeader>

				<CardContent className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
					{Array.from({ length: 8 }).map((_, i) => (
						<Skeleton key={i} className="aspect-square w-full rounded-lg" />
					))}
				</CardContent>
			</Card>
		</div>
	);
}
