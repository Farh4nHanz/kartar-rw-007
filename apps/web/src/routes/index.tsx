import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Lightbulb, Target, Users } from "lucide-react";
import { organizationInfo } from "@/components/data/mock";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="bg-linear-to-br from-blue-50 via-white to-gray-50 py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-4xl text-center">
						<h1 className="mb-6 font-bold text-5xl text-blue-900 leading-tight md:text-6xl">
							Karang Taruna RW 007
						</h1>
						<p className="mb-8 font-medium text-2xl text-gray-700 md:text-3xl">
							{organizationInfo.tagline}
						</p>
						<p className="mb-10 text-gray-600 text-lg leading-relaxed">
							{organizationInfo.shortDescription}
						</p>

						{/* CTA Buttons */}
						<div className="flex flex-wrap justify-center gap-4">
							{/* About Us */}
							<Link to="/">
								<Button
									size="lg"
									className="rounded-sm bg-blue-900 text-white transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:bg-blue-800"
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
									className="rounded-sm border-blue-900 text-blue-900 transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:bg-blue-50"
								>
									Bergabung Sekarang
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="bg-white py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 gap-6 md:grid-cols-4">
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
					</div>
				</div>
			</section>
		</div>
	);
}
