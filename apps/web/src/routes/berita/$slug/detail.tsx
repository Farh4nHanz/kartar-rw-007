import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { ArrowLeft, Calendar } from "lucide-react";
import { getNewsBySlugQueryOptions } from "@/hooks/query-options";

export const Route = createFileRoute("/berita/$slug/detail")({
	component: RouteComponent,
});

function RouteComponent() {
	const { slug } = Route.useParams();

	const { data: news, isLoading: isNewsDataFetchLoading } = useQuery(
		getNewsBySlugQueryOptions(slug),
	);

	if (isNewsDataFetchLoading) return <SkeletonUI />;

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
						{news?.data.category.name}
					</Badge>

					{news?.data.published_at && (
						<span className="flex items-center gap-1 text-muted-foreground text-sm">
							<Calendar className="size-4" />
							{new Intl.DateTimeFormat("id-ID", {
								dateStyle: "long",
							}).format(new Date(news.data?.published_at))}
						</span>
					)}
				</div>

				<h1 className="font-bold text-3xl text-blue-900 capitalize leading-tight md:text-4xl">
					{news?.data.title}
				</h1>

				<p className="text-lg text-muted-foreground leading-relaxed first-letter:capitalize">
					{news?.data.excerpt}
				</p>
			</div>

			{/* Thumbnail */}
			{news?.data.thumbnail_url && (
				<Card className="mb-8 max-h-96 overflow-hidden p-0">
					<img
						src={news.data.thumbnail_url}
						alt={news.data.title}
						className="aspect-video w-full object-cover italic"
					/>
				</Card>
			)}

			<Separator className="my-8" />

			{/* Content */}
			<Card>
				<CardContent className="prose prose-blue max-w-none py-8">
					<p className="whitespace-pre-line first-letter:capitalize">
						{news?.data.content}
					</p>
				</CardContent>
			</Card>
		</section>
	);
}

function SkeletonUI() {
	return (
		<section className="container mx-auto px-4 py-10">
			{/* Back button */}
			<div className="mb-6 flex items-center gap-2">
				<Skeleton className="h-4 w-4" />
				<Skeleton className="h-4 w-20" />
			</div>

			{/* Header */}
			<div className="mb-6 space-y-4">
				<div className="flex flex-wrap items-center gap-3">
					<Skeleton className="h-6 w-28 rounded-full" />
					<Skeleton className="h-4 w-36" />
				</div>

				{/* Title */}
				<div className="space-y-2">
					<Skeleton className="h-8 w-full max-w-3xl" />
					<Skeleton className="h-8 w-3/4" />
				</div>

				{/* Excerpt */}
				<div className="space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
					<Skeleton className="h-4 w-2/3" />
				</div>
			</div>

			{/* Thumbnail */}
			<Card className="mb-8 overflow-hidden p-0">
				<Skeleton className="aspect-video w-full" />
			</Card>

			<Separator className="my-8" />

			{/* Content */}
			<Card>
				<CardContent className="space-y-4 py-8">
					{Array.from({ length: 8 }).map((_, i) => (
						<Skeleton
							key={i}
							className={`h-4 ${
								i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-11/12" : "w-10/12"
							}`}
						/>
					))}
				</CardContent>
			</Card>
		</section>
	);
}
