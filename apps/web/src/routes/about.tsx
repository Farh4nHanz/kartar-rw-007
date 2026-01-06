/** biome-ignore-all lint/suspicious/noArrayIndexKey: true */

import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Briefcase, Heart, Target } from "lucide-react";
import { useId } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { organizationInfo } from "@/data/mock";

export const Route = createFileRoute("/about")({
	component: RouteComponent,
});

function RouteComponent() {
	const missionKey = useId();
	const goalKey = useId();

	return (
		<div className="h-fit min-h-screen w-full bg-gray-50 py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

				{/* Profile Section */}
				<Card className="mb-12 rounded-lg">
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
				<Card className="mb-12 rounded-lg">
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
				<Card className="mb-12 rounded-lg">
					<CardHeader>
						<CardTitle className="flex items-center font-semibold text-blue-900 text-xl">
							<Heart className="mr-3 size-6" />
							Misi
						</CardTitle>
					</CardHeader>

					<CardContent>
						<ul className="space-y-4">
							{organizationInfo.mission.map((mission, i) => (
								<li key={`${missionKey}-${i}`} className="flex items-center">
									<span className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900 font-semibold text-white">
										{i + 1}
									</span>
									<span className="pt-1 text-gray-700 text-sm">{mission}</span>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>

				{/* Goals */}
				<Card className="mb-12 rounded-lg">
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
									key={`${goalKey}-${i}`}
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
				<Card>
					<CardHeader>
						<CardTitle className="font-semibold text-blue-900 text-xl">
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
	);
}
