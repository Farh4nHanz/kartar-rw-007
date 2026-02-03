import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { BookOpen, Briefcase, Heart, Info, Target } from "lucide-react";
import { organizationInfo } from "@/data/mock";

export const Route = createFileRoute("/tentang-kami")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="flex h-fit min-h-screen w-full justify-center bg-gray-50 py-16">
			<div className="container w-full px-6 py-2">
				{/* Header */}
				<div className="mb-16 text-center">
					<h1 className="mb-4 font-bold text-5xl text-blue-900">
						Tentang Kami
					</h1>
					<p className="mx-auto max-w-3xl text-gray-600 text-lg">
						Mengenal lebih dekat Karang Taruna RW 007, organisasi kepemudaan
						yang berkomitmen untuk pemberdayaan dan pengembangan generasi muda.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-5 *:rounded-lg *:px-2 *:py-5 lg:auto-rows-min lg:grid-cols-2">
					{/* Profile Section */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center font-semibold text-blue-900 text-xl">
								<BookOpen className="mr-3 size-6" />
								Profil Organisasi
							</CardTitle>
						</CardHeader>

						<CardContent>
							<p className="text-gray-700 text-sm leading-relaxed">
								{organizationInfo.shortDescription}
							</p>
						</CardContent>
					</Card>

					{/* Vision */}
					<Card className="lg:row-start-2">
						<CardHeader>
							<CardTitle className="flex items-center font-semibold text-blue-900 text-xl">
								<Target className="mr-3 size-6" />
								Visi
							</CardTitle>
						</CardHeader>

						<CardContent>
							<p className="text-gray-700 text-sm leading-relaxed">
								{organizationInfo.vision}
							</p>
						</CardContent>
					</Card>

					{/* Mission */}
					<Card className="lg:row-span-2 lg:row-start-1">
						<CardHeader>
							<CardTitle className="flex items-center font-semibold text-blue-900 text-xl">
								<Heart className="mr-3 size-6" />
								Misi
							</CardTitle>
						</CardHeader>

						<CardContent>
							<ul className="space-y-4">
								{organizationInfo.mission.map((mission, i) => (
									<li
										key={Math.floor(Math.random() * 100)}
										className="flex items-center"
									>
										<span className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900 font-semibold text-white">
											{i + 1}
										</span>
										<span className="pt-1 text-gray-700 text-sm">
											{mission}
										</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>

					{/* Goals */}
					<Card className="lg:col-span-2">
						<CardHeader>
							<CardTitle className="flex items-center font-semibold text-blue-900 text-xl">
								<Briefcase className="mr-3 size-6" />
								Tujuan Organisasi
							</CardTitle>
						</CardHeader>

						<CardContent>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								{organizationInfo.goals.map((goal, i) => (
									<div
										key={Math.floor(Math.random() * 100)}
										className="flex items-start space-x-3 rounded-lg bg-blue-50 p-4"
									>
										<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-blue-900 font-semibold text-sm text-white">
											{i + 1}
										</span>
										<p className="text-gray-700 text-sm">{goal}</p>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* History */}
					<Card className="lg:col-span-2">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 font-semibold text-blue-900 text-xl">
								<Info className="size-6" />
								Sejarah Singkat
							</CardTitle>
						</CardHeader>

						<CardContent>
							<p className="text-gray-700 text-sm leading-relaxed">
								{organizationInfo.history}
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
