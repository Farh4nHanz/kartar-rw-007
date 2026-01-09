import { createFileRoute } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { gallery } from "@/data/mock";
import { useFilter } from "@/hooks/use-filter";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/galeri")({
	component: RouteComponent,
});

function RouteComponent() {
	const { filter, setFilter, categories, filteredData } = useFilter(gallery);

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
						dilaksanakan oleh Karang Taruna RW 007.
					</p>
				</div>

				{/* Filter */}
				<div className="mb-8 flex flex-wrap justify-center gap-3">
					{categories.map((category) => (
						<Button
							key={category}
							className={cn(
								"rounded-full px-5 py-2 font-[550] text-sm transition-all duration-300",
								filter === category
									? "scale-105 bg-blue-900 text-white shadow-md"
									: "border border-gray-200 bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-900",
							)}
							onClick={() => setFilter(category)}
						>
							{category}
						</Button>
					))}
				</div>

				{/* Gallery Grid */}
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{filteredData.map((gallery) => (
						<Card
							key={gallery.id}
							className="overflow-hidden rounded-lg p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
						>
							{gallery.image ? (
								<img
									src={gallery.image}
									alt={gallery.title}
									className="aspect-video h-full w-full rounded-lg object-cover object-center"
								/>
							) : (
								<div className="flex aspect-video items-center justify-center bg-linear-to-br from-blue-100 to-gray-100">
									<ImageIcon className="size-16 text-blue-600" />
								</div>
							)}

							<CardContent className="flex flex-col gap-3 p-5">
								<span className="w-fit rounded-full bg-blue-900 px-3 py-1 font-semibold text-white text-xs">
									{gallery.category}
								</span>

								<div className="space-y-3">
									<h3 className="font-bold text-blue-900 text-lg">
										{gallery.title}
									</h3>
									<p className="text-gray-600 text-sm">{gallery.description}</p>
									<p className="text-gray-500 text-xs">
										{new Intl.DateTimeFormat("id-ID", {
											dateStyle: "long",
										}).format(new Date(gallery.date))}
									</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</main>
	);
}
