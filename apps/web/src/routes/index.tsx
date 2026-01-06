import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Lightbulb, Target, Users } from "lucide-react";
import { organizationInfo, programs } from "@/components/data/mock";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	const latestActivities = programs.slice(0, 3);

	return (
		<div className="min-h-screen w-full">
			{/* Hero Section */}
			<section className="flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-gray-50 px-4 py-20 sm:px-6 lg:px-8">
				<div className="max-w-4xl text-center">
					<h1 className="mb-6 font-bold text-5xl text-blue-900 leading-tight md:text-6xl">
						Karang Taruna RW 007
					</h1>
					<p className="mb-8 font-medium text-gray-700 text-xl md:text-2xl">
						{organizationInfo.tagline}
					</p>
					<p className="mb-10 text-base text-gray-600 leading-relaxed">
						{organizationInfo.shortDescription}
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-wrap justify-center gap-4">
						{/* About Us */}
						<Link to="/">
							<Button
								size="lg"
								className="rounded-sm bg-blue-900 p-4 text-sm text-white transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:bg-blue-800"
							>
								Tentang Kami
								<ArrowRight className="ml-2 size-4" />
							</Button>
						</Link>

						{/* Join Us */}
						<Link to="/">
							<Button
								size="lg"
								variant="outline"
								className="rounded-sm border-blue-900 p-4 text-blue-900 text-sm transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:bg-blue-50"
							>
								Bergabung Sekarang
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="grid w-full grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 px-6 py-16 lg:px-8">
				<div className="rounded-lg bg-blue-50 p-6 text-center transition-transform duration-300 hover:scale-105">
					<Users className="mx-auto mb-3 size-12 text-blue-900" />
					<div className="mb-1 font-bold text-3xl text-blue-900">150+</div>
					<div className="text-gray-600">Anggota Aktif</div>
				</div>

				<div className="rounded-lg bg-blue-50 p-6 text-center transition-transform duration-300 hover:scale-105">
					<Target className="mx-auto mb-3 size-12 text-blue-900" />
					<div className="mb-1 font-bold text-3xl text-blue-900">50+</div>
					<div className="text-gray-600">Program Terlaksana</div>
				</div>

				<div className="rounded-lg bg-blue-50 p-6 text-center transition-transform duration-300 hover:scale-105">
					<Lightbulb className="mx-auto mb-3 size-12 text-blue-900" />
					<div className="mb-1 font-bold text-3xl text-blue-900">20+</div>
					<div className="text-gray-600">Kolaborasi</div>
				</div>

				<div className="rounded-lg bg-blue-50 p-6 text-center transition-transform duration-300 hover:scale-105">
					<Award className="mx-auto mb-3 size-12 text-blue-900" />
					<div className="mb-1 font-bold text-3xl text-blue-900">7</div>
					<div className="text-gray-600">Tahun Berdiri</div>
				</div>
			</section>

			{/* Latest Programs Section */}
			<section className="flex flex-col items-center justify-center bg-gray-50 px-6 py-16 lg:px-8">
				<div className="mb-12 text-center">
					<h2 className="mb-4 font-bold text-4xl text-blue-900">
						Program & Kegiatan Kami
					</h2>
					<p className="text-gray-600 text-lg">
						Berbagai program unggulan untuk pemberdayaan masyarakat
					</p>
				</div>

				{/* Activity Cards */}
				<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
					{latestActivities.map((activity) => (
						<Card
							key={activity.id}
							className="rounded-md transition-shadow duration-300 hover:shadow-lg"
						>
							<CardHeader>
								<div className="mb-2 inline-block w-fit rounded-full bg-blue-900 px-3 py-1 font-semibold text-white text-xs">
									{activity.category}
								</div>
								<CardTitle className="text-blue-900 text-xl">
									{activity.title}
								</CardTitle>
								<CardDescription>{activity.schedule}</CardDescription>
							</CardHeader>

							<CardContent>
								<p className="text-gray-600 text-sm">{activity.description}</p>
							</CardContent>
						</Card>
					))}
				</div>

				{/* All Programs CTA */}
				<Link to="/">
					<Button
						variant="outline"
						className="rounded-md border-blue-900 p-4 font-medium text-blue-900 text-sm hover:cursor-pointer hover:bg-blue-50"
					>
						Lihat semua program
						<ArrowRight className="ml-2 size-4" />
					</Button>
				</Link>
			</section>
		</div>
	);
}
