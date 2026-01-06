import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
									className=" bg-blue-900 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-800 rounded-sm hover:cursor-pointer"
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
									className="border-blue-900 text-blue-900 transition-all duration-300 hover:scale-105 hover:bg-blue-50 rounded-sm hover:cursor-pointer"
								>
									Bergabung Sekarang
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
