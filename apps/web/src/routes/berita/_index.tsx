import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { contactInfo } from "@/data";
import { getAllNewsQueryOptions } from "@/hooks/query-options";
import { useFilter } from "@/hooks/use-filter";

export const Route = createFileRoute("/berita/_index")({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(getAllNewsQueryOptions()),
});

function RouteComponent() {
	const { data: news, isLoading: isNewsFetchLoading } = useQuery(
		getAllNewsQueryOptions(),
	);

	const { filter, setFilter, categories, filteredData } = useFilter(
		news?.data || [],
	);

	return (
		<main className="flex h-fit min-h-screen w-full justify-center bg-gray-50 py-16">
			<div className="container w-full px-6 py-2">
				{/* Header */}
				<div className="mb-16 text-center">
					<h1 className="mb-4 font-bold text-5xl text-blue-900">
						Berita & Informasi
					</h1>
					<p className="text-gray-600 text-lg">
						Update terbaru tentang kegiatan, prestasi, dan pengumuman penting
						dari Karang Taruna RW 07.
					</p>
				</div>

				{/* Filter */}
				{news?.data.length ? (
					<div className="mb-8 flex flex-wrap justify-center gap-3">
						{categories.map((category) => (
							<Button
								key={category}
								className={cn(
									"rounded-full px-5 py-2 font-[550] text-sm capitalize transition-all duration-300 hover:cursor-pointer",
									filter === category.toLowerCase()
										? "scale-105 bg-blue-900 text-white shadow-md hover:bg-blue-800"
										: "border border-gray-200 bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-900",
								)}
								onClick={() => setFilter(category.toLowerCase())}
							>
								{category}
							</Button>
						))}
					</div>
				) : null}

				{/* News Grid */}
				<div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
					{isNewsFetchLoading
						? Array.from({ length: 6 }, () => (
								<Card
									key={Math.random()}
									className="overflow-hidden rounded-lg px-2 py-5"
								>
									<CardHeader className="space-y-3">
										{/* Category + Date */}
										<div className="mb-3 flex items-center justify-between">
											<Skeleton className="h-5 w-32 rounded-full" />
											<Skeleton className="h-4 w-28" />
										</div>

										{/* Title */}
										<div className="space-y-2">
											<Skeleton className="h-6 w-full" />
											<Skeleton className="h-6 w-4/5" />
										</div>
									</CardHeader>

									{/* Excerpt */}
									<CardContent className="space-y-2">
										<Skeleton className="h-4 w-full" />
										<Skeleton className="h-4 w-11/12" />
										<Skeleton className="h-4 w-10/12" />
										<Skeleton className="h-4 w-3/4" />
									</CardContent>

									{/* CTA */}
									<CardFooter>
										<Skeleton className="h-4 w-40" />
									</CardFooter>
								</Card>
							))
						: filteredData.map((news) => (
								<Card
									key={news.id}
									className="overflow-hidden rounded-lg px-2 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
								>
									<CardHeader>
										<div className="mb-3 flex items-center justify-between">
											<span className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-900 text-xs capitalize">
												<Tag className="size-3" />
												{news.category.name}
											</span>
											<span className="flex items-center gap-1 text-gray-500 text-xs">
												<Calendar className="size-3" />
												{new Intl.DateTimeFormat("id-ID", {
													dateStyle: "long",
												}).format(new Date(news.published_at as string))}
											</span>
										</div>

										<CardTitle className="font-semibold text-blue-900 text-xl capitalize leading-snug">
											{news.title}
										</CardTitle>
									</CardHeader>

									<CardContent className="line-clamp-4 h-full text-muted-foreground text-sm first-letter:capitalize">
										{news.excerpt}
									</CardContent>

									<CardFooter>
										<Link
											to="/berita/$slug/detail"
											params={{ slug: news.slug }}
										>
											<Button
												variant="link"
												className="px-0 text-blue-900 hover:cursor-pointer"
											>
												Baca Selengkapnya
												<ArrowRight className="size-4" />
											</Button>
										</Link>
									</CardFooter>
								</Card>
							))}
				</div>

				{/* Subscription CTA */}
				<Card className="mt-12 flex w-full items-center rounded-lg bg-blue-900 text-white">
					<CardContent className="flex max-w-2xl flex-col items-center py-8 text-center">
						<h3 className="mb-3 font-bold text-3xl">Dapatkan Update Terbaru</h3>
						<p className="mb-6 text-blue-100 text-sm leading-relaxed">
							Ikuti media sosial kami untuk mendapatkan informasi terbaru
							tentang kegiatan dan program Karang Taruna RW 07.
						</p>

						<div className="flex flex-wrap items-center justify-center gap-4">
							{contactInfo.socialMedia
								.filter((sm) => sm.label.toLowerCase() !== "twitter")
								.map((sm) => (
									<Button
										key={sm.label}
										variant="link"
										size="lg"
										onClick={() =>
											window.open(sm.link, "_blank", "noopener,noreferrer")
										}
										className="rounded-lg bg-white px-8 py-4 font-semibold text-blue-900 text-sm transition-colors duration-300 hover:cursor-pointer hover:bg-gray-100 hover:no-underline"
									>
										Follow {sm.label}
									</Button>
								))}
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
