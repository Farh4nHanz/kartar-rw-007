import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { contactInfo, news } from "@/data/mock";
import { useFilter } from "@/hooks/use-filter";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/berita")({
	component: RouteComponent,
});

function RouteComponent() {
	const { filter, setFilter, categories, filteredData } = useFilter(news);

	return (
		<div className="flex h-fit min-h-screen w-full justify-center bg-gray-50 py-16">
			<div className="container w-full px-6 py-2">
				{/* Header */}
				<div className="mb-16 text-center">
					<h1 className="mb-4 font-bold text-5xl text-blue-900">
						Berita & Informasi
					</h1>
					<p className="text-gray-600 text-lg">
						Update terbaru tentang kegiatan, prestasi, dan pengumuman penting
						dari Karang Taruna RW 007.
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

				{/* News Grid */}
				<div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-6">
					{filteredData.map((news) => (
						<Card
							key={news.id}
							className="overflow-hidden rounded-lg px-2 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
						>
							<CardHeader>
								<div className="mb-3 flex items-center justify-between">
									<span className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-900 text-xs">
										<Tag className="size-3" />
										{news.category}
									</span>
									<span className="flex items-center gap-1 text-gray-500 text-xs">
										<Calendar className="size-3" />
										{new Intl.DateTimeFormat("id-ID", {
											dateStyle: "long",
										}).format(new Date(news.date))}
									</span>
								</div>

								<CardTitle className="font-semibold text-blue-900 text-xl leading-snug">
									{news.title}
								</CardTitle>
							</CardHeader>

							<CardContent className="line-clamp-4 h-full text-muted-foreground text-sm">
								{news.excerpt}
							</CardContent>

							<CardFooter>
								<Link to=".">
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
							tentang kegiatan dan program Karang Taruna RW 007.
						</p>

						<div className="flex items-center gap-4">
							{contactInfo.socialMedia
								.filter((sm) => sm.label.toLowerCase() !== "twitter")
								.map((sm) => (
									<Link to={sm.link} key={sm.label}>
										<Button
											size="lg"
											className="rounded-lg bg-white px-8 py-4 font-semibold text-blue-900 text-sm transition-colors duration-300 hover:cursor-pointer hover:bg-gray-100"
										>
											Follow {sm.label}
										</Button>
									</Link>
								))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
