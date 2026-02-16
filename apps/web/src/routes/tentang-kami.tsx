import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { BookOpen, Briefcase, Heart, Info, Target } from "lucide-react";

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
						Mengenal lebih dekat Karang Taruna RW 07, organisasi kepemudaan yang
						berkomitmen untuk pemberdayaan dan pengembangan generasi muda.
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
								Karang Taruna RW 07 merupakan wadah pembinaan dan pemberdayaan
								pemuda tingkat RW yang berfokus pada pengembangan kreativitas,
								kepedulian sosial, dan partisipasi aktif dalam masyarakat.
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
								Mewujdukan pemuda yang aktif, kreatif, mandiri, dan
								berkontribusi positif bagi lingkungan masyarakat RW 07.
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
							<ul className="space-y-4 [counter-reset:mission] *:[&::before]:mr-4 *:[&::before]:flex *:[&::before]:size-8 *:[&::before]:shrink-0 *:[&::before]:items-center *:[&::before]:justify-center *:[&::before]:rounded-full *:[&::before]:bg-blue-900 *:[&::before]:font-semibold *:[&::before]:text-white *:[&::before]:[content:counter(mission)] *:[&::before]:[counter-increment:mission]">
								{[
									"Mengembangkan potensi dan kreativitas pemuda melalui berbagai program pemberdayaan",
									"Menumbuhkan jiwa kepemimpinan dan kewirausahaan di kalangan generasi muda",
									"Membangun solidaritas dan kerjasama antar pemuda dalam lingkungan RW 07",
									"Melaksanakan kegiatan sosial kemasyarakatan yang bermanfaat bagi lingkungan",
									"Menjadi mitra strategis dalam pembangunan masyarakat yang lebih baik",
								].map((mission) => (
									<li
										key={mission}
										className="flex items-start text-gray-700 text-sm"
									>
										{mission}
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
							<div className="grid grid-cols-1 gap-6 [counter-reset:goal] md:grid-cols-2">
								{[
									"Memberdayakan pemuda secara keberlanjutan",
									"Menjadi mitra masyarakat dan pemerintah setempat",
									"Menciptakan lingkungan nyaman dan harmonis",
								].map((goal) => (
									<div
										key={goal}
										className="rounded-lg bg-blue-50 p-4 *:[&::before]:mr-4 *:[&::before]:flex *:[&::before]:size-8 *:[&::before]:shrink-0 *:[&::before]:items-center *:[&::before]:justify-center *:[&::before]:rounded-sm *:[&::before]:bg-blue-900 *:[&::before]:font-semibold *:[&::before]:text-white *:[&::before]:[content:counter(goal)] *:[&::before]:[counter-increment:goal]"
									>
										<p className="flex items-start text-gray-700 text-sm">
											{goal}
										</p>
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
								Karang Taruna RW 07 dibentuk sebagai respon atas kebutuhan wadah
								kepemudaan yang mampu menggerakan pemuda untuk berperan aktif
								dalam kegiatan sosial dan pembangunan lingkungan.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
