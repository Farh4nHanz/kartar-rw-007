import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import { Calendar, Info } from "lucide-react";
import { getAllProgramsQueryOptions } from "@/hooks/query-options";
import { useFilter } from "@/hooks/use-filter";

export const Route = createFileRoute("/program/_index")({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(getAllProgramsQueryOptions()),
});

function RouteComponent() {
	const { data: programs, isLoading: isProgramsFetchLoading } = useQuery(
		getAllProgramsQueryOptions(),
	);

	const { filter, setFilter, categories, filteredData } = useFilter(
		programs?.data || [],
	);

	return (
		<main className="flex h-fit min-h-screen w-full justify-center bg-gray-50 py-16">
			<div className="container w-full px-6 py-2">
				{/* Header */}
				<div className="mb-16 text-center">
					<h1 className="mb-4 font-bold text-5xl text-blue-900">
						Program & Kegiatan
					</h1>
					<p className="text-gray-600 text-lg">
						Berbagai program unggulan yang dirancang untuk pemberdayaan
						masyarakat dan pengembangan potensi pemuda di lingkungan RW 07.
					</p>
				</div>

				{/* Filter */}
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

				{/* Programs Grid */}
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{isProgramsFetchLoading
						? Array.from({ length: 6 }, () => (
								<Card
									key={Math.random()}
									className="overflow-hidden rounded-lg px-2 py-5"
								>
									<CardHeader className="space-y-3">
										{/* Category + Status badges */}
										<div className="mb-3 flex items-center justify-between">
											<Skeleton className="h-5 w-24 rounded-full" />
											<Skeleton className="h-5 w-20 rounded-full" />
										</div>

										{/* Title */}
										<Skeleton className="h-5 w-4/5" />

										{/* Schedule row */}
										<div className="flex items-center gap-2">
											<Skeleton className="size-4 rounded-full" />
											<Skeleton className="h-3 w-1/2" />
										</div>
									</CardHeader>

									<CardContent className="flex flex-col gap-3">
										{/* Description */}
										<div className="space-y-2">
											<Skeleton className="h-4 w-full" />
											<Skeleton className="h-4 w-11/12" />
											<Skeleton className="h-4 w-10/12" />
											<Skeleton className="h-4 w-3/4" />
										</div>
									</CardContent>
								</Card>
							))
						: filteredData.map((program) => (
								<Link
									key={program.id}
									to="/program/$id/detail"
									params={{ id: program.id }}
								>
									<Card className="overflow-hidden rounded-lg px-2 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
										<CardHeader>
											<div className="mb-3 flex items-center justify-between">
												<span className="w-fit rounded-full bg-blue-900 px-3 py-1 font-semibold text-white text-xs capitalize">
													{program.category.name}
												</span>
												<span
													className={cn(
														"rounded-full px-3 py-1 font-medium text-xs capitalize",
														program.status.toLowerCase() === "rutin"
															? "bg-violet-200 text-violet-800 dark:bg-violet-500 dark:text-violet-50"
															: "bg-fuchsia-200 text-fuchsia-800 dark:bg-fuchsia-500 dark:text-fuchsia-50",
													)}
												>
													{program.status}
												</span>
											</div>

											<CardTitle className="font-bold text-blue-900 text-lg capitalize">
												{program.title}
											</CardTitle>
											<CardDescription className="flex items-center">
												<Calendar className="mr-2 size-4 shrink-0" />
												<span className="text-muted-foreground text-xs">
													{program.schedule_type}
												</span>
											</CardDescription>
										</CardHeader>

										<CardContent className="flex flex-col gap-3">
											<p className="line-clamp-5 text-gray-700 text-smleading-relaxed first-letter:capitalize">
												{program.description}
											</p>
										</CardContent>
									</Card>
								</Link>
							))}
				</div>

				{/* Info Section */}
				<Card className="mt-12 rounded-lg px-2 py-5">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 font-semibold text-blue-900 text-xl">
							<Info className="size-6" />
							Tentang Program Kami
						</CardTitle>
					</CardHeader>

					<CardContent className="space-y-4 text-gray-700">
						<p className="text-sm leading-relaxed">
							Program dan kegiatan Karang Taruna RW 007 dirancang berdasarkan
							kebutuhan masyarakat dan potensi yang ada di lingkungan kami.
							Setiap program memiliki tujuan yang jelas dalam pemberdayaan
							masyarakat dan pengembangan pemuda.
						</p>
						<p className="text-sm leading-relaxed">
							Kami membagi program menjadi dua kategori: <strong>Rutin</strong>{" "}
							yang dilaksanakan secara terjadwal dan <strong>Insidental</strong>{" "}
							yang disesuaikan dengan momen atau kebutuhan khusus.
						</p>

						<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
							<div className="flex flex-col items-start gap-2 rounded-lg bg-blue-50 p-4">
								<h4 className="font-semibold text-base text-blue-900">
									Program Rutin
								</h4>
								<p className="text-gray-600 text-sm">
									Kegiatan terjadwal yang dilaksanakan secara konsisten untuk
									membangun kebiasaan positif dan dampak jangka panjang.
								</p>
							</div>

							<div className="flex flex-col items-start gap-2 rounded-lg bg-blue-50 p-4">
								<h4 className="font-semibold text-base text-blue-900">
									Program Insidental
								</h4>
								<p className="text-gray-600 text-sm">
									Kegiatan khusus yang disesuaikan dengan momen tertentu atau
									kebutuhan mendesak masyarakat.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
