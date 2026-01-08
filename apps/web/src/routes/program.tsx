import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { programs } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/program")({
	component: RouteComponent,
});

function RouteComponent() {
	const [filter, setFilter] = useState("Semua");
	const categories = ["Semua", ...new Set(programs.map((p) => p.category))];

	const filteredPrograms =
		filter === "Semua"
			? programs
			: programs.filter((p) => p.category === filter);

	return (
		<div className="flex h-fit min-h-screen w-full justify-center bg-gray-50 py-16">
			<div className="container w-full px-6 py-2">
				{/* Header */}
				<div className="mb-16 text-center">
					<h1 className="mb-4 font-bold text-5xl text-blue-900">
						Program & Kegiatan
					</h1>
					<p className="text-gray-600 text-lg">
						Berbagai program unggulan yang dirancang untuk pemberdayaan
						masyarakat dan pengembangan potensi pemuda di lingkungan RW 007.
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

				{/* Programs Grid */}
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{filteredPrograms.map((program) => (
						<Card
							key={program.id}
							className="overflow-hidden rounded-lg px-2 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
						>
							<CardHeader>
								<div className="mb-3 flex items-center justify-between">
									<span className="w-fit rounded-full bg-blue-900 px-3 py-1 font-semibold text-white text-xs">
										{program.category}
									</span>
									<span
										className={cn(
											"rounded-full px-3 py-1 font-medium text-xs",
											program.status === "Rutin"
												? "bg-green-100 text-green-800"
												: "bg-yellow-100 text-yellow-800",
										)}
									>
										{program.status}
									</span>
								</div>

								<CardTitle className="font-bold text-blue-900 text-lg">
									{program.title}
								</CardTitle>
								<CardDescription className="flex items-center">
									<Calendar className="mr-2 size-4 shrink-0" />
									<span className="text-muted-foreground text-xs">
										{program.schedule}
									</span>
								</CardDescription>
							</CardHeader>

							<CardContent className="flex flex-col gap-3">
								<p className="line-clamp-5 text-gray-700 text-smleading-relaxed">
									{program.description}
								</p>
							</CardContent>
						</Card>
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
		</div>
	);
}
