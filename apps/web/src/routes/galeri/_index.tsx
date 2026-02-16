import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import { ImageIcon } from "lucide-react";
import { getAllGalleriesQueryOptions } from "@/hooks/query-options";
import { useFilter } from "@/hooks/use-filter";

export const Route = createFileRoute("/galeri/_index")({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(getAllGalleriesQueryOptions()),
});

function RouteComponent() {
	const { data: galleries, isLoading: isGalleriesFetchLoading } = useQuery(
		getAllGalleriesQueryOptions(),
	);

	const { filter, setFilter, categories, filteredData } = useFilter(
		galleries?.data || [],
	);

	return (
		<main className="flex h-fit min-h-screen w-full justify-center bg-gray-50 py-16">
			<div className="container w-full px-6 py-2">
				{/* Header */}
				<div className="mb-16 text-center">
					<h1 className="mb-4 font-bold text-5xl text-blue-900">
						Galeri Karang Taruna
					</h1>
					<p className="text-gray-600 text-lg">
						Dokumentasi visual dari berbagai kegiatan dan program yang telah
						dilaksanakan oleh Karang Taruna RW 07.
					</p>
				</div>

				{/* Filter */}
				{galleries?.data.length ? (
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

				{/* Gallery Grid */}
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{isGalleriesFetchLoading
						? Array.from({ length: 6 }, () => (
								<Card
									key={Math.random()}
									className="overflow-hidden rounded-lg p-0"
								>
									{/* Image preview */}
									<Skeleton className="aspect-video w-full rounded-none" />

									<CardContent className="flex flex-col gap-3 p-5">
										{/* Category badge */}
										<Skeleton className="h-5 w-24 rounded-full" />

										<div className="space-y-3">
											{/* Title */}
											<Skeleton className="h-5 w-4/5" />

											{/* Description */}
											<div className="space-y-2">
												<Skeleton className="h-4 w-full" />
												<Skeleton className="h-4 w-11/12" />
											</div>

											{/* Date */}
											<Skeleton className="h-3 w-1/3" />
										</div>
									</CardContent>
								</Card>
							))
						: filteredData?.map((gallery) => (
								<Link
									key={gallery.id}
									to="/galeri/$id/detail"
									params={{ id: gallery.id }}
								>
									<Card className="gap-0 overflow-hidden rounded-lg p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
										<CardHeader className="p-0">
											{gallery.images.length ? (
												<img
													src={gallery.images.at(0)?.image_url || ""}
													alt={gallery.title}
													className="aspect-video h-full w-full rounded-t-lg object-cover object-center"
												/>
											) : (
												<div className="flex aspect-video items-center justify-center bg-linear-to-br from-blue-100 to-gray-100">
													<ImageIcon className="size-16 text-blue-600" />
												</div>
											)}
										</CardHeader>

										<CardContent className="flex flex-col gap-3 p-5">
											<span className="w-fit rounded-full bg-blue-900 px-3 py-1 font-semibold text-white text-xs capitalize">
												{gallery.category.name}
											</span>

											<div className="space-y-3">
												<h3 className="font-bold text-blue-900 text-lg capitalize">
													{gallery.title}
												</h3>
												<p className="line-clamp-3 text-gray-600 text-sm first-letter:capitalize">
													{gallery.description}
												</p>
												<p className="text-gray-500 text-xs">
													{new Intl.DateTimeFormat("id-ID", {
														dateStyle: "long",
													}).format(new Date(gallery.activity_date))}
												</p>
											</div>
										</CardContent>
									</Card>
								</Link>
							))}
				</div>
			</div>
		</main>
	);
}
