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
import { ArrowRight, Award, Lightbulb, Target, Users } from "lucide-react";
import {
	getLatestNewsQueryOptions,
	getLatestProgramsQueryOptions,
} from "@/hooks/query-options";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	const { data: programs, isLoading: isProgramsFetchLoading } = useQuery(
		getLatestProgramsQueryOptions(),
	);

	const { data: news, isLoading: isNewsFetchLoading } = useQuery(
		getLatestNewsQueryOptions(),
	);

	return (
		<main className="flex h-fit min-h-screen w-full flex-col items-center *:px-6 *:not-first:py-16">
			{/* Hero Section */}
			<section className="flex w-full justify-center bg-linear-to-br from-blue-100 via-white to-gray-50 py-20">
				<div className="w-full max-w-4xl text-center">
					<h1 className="mb-6 font-bold text-5xl text-blue-900 leading-tight md:text-6xl">
						Karang Taruna RW 07
					</h1>
					<p className="mb-8 font-medium text-gray-700 text-xl md:text-2xl">
						Muda, Kreatif, Peduli, Berbagi, Maju
					</p>
					<p className="mb-10 text-base text-gray-600 leading-relaxed">
						Karang Taruna RW 07 adalah organisasi kepemudaan yang berperan aktif
						dalam pengembangan potensi generasi muda serta mendukung kegiatan
						sosial, kemasyarakatan, dan pembangunan lingkungan di wilayah RW 07.
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-wrap justify-center gap-4">
						{/* About Us */}
						<Link to="/tentang-kami">
							<Button
								size="lg"
								className="min-w-40 rounded-sm bg-blue-900 p-4 font-[550] text-white capitalize transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:bg-blue-800"
							>
								Tentang Kami
								<ArrowRight className="ml-2 size-4" />
							</Button>
						</Link>

						{/* Join Us */}
						<Link to="/gabung">
							<Button
								size="lg"
								variant="outline"
								className="min-w-40 rounded-sm border-blue-900 p-4 font-[550] text-blue-900 capitalize transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:bg-blue-50 hover:text-blue-900"
							>
								Gabung Sekarang
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="flex w-full justify-center bg-white">
				<div className="container grid w-full grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
					<div className="rounded-lg bg-blue-50 p-6 text-center transition-transform duration-300 hover:scale-105">
						<Users className="mx-auto mb-3 size-12 text-blue-900" />
						<div className="mb-1 font-bold text-3xl text-blue-900">30+</div>
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
						<div className="mb-1 font-bold text-3xl text-blue-900">
							{new Date().getFullYear() - new Date("2010-01-01").getFullYear()}
						</div>
						<div className="text-gray-600">Tahun Berdiri</div>
					</div>
				</div>
			</section>

			{/* Latest Programs Section */}
			<section className="flex w-full justify-center bg-gray-50">
				<div className="container flex w-full flex-col items-center">
					<div className="mb-12 text-center">
						<h2 className="mb-4 font-bold text-4xl text-blue-900">
							Program & Kegiatan Kami
						</h2>
						<p className="text-gray-600 text-lg">
							Berbagai program unggulan untuk pemberdayaan masyarakat
						</p>
					</div>

					{/* Program Cards */}
					<div className="mb-8 grid w-full grid-cols-[repeat(auto-fit,minmax(350px,1fr))] items-center justify-center gap-6">
						{isProgramsFetchLoading
							? Array.from({ length: 3 }, () => (
									<Card className="w-full rounded-md">
										<CardHeader className="space-y-3">
											{/* Category badge */}
											<Skeleton className="h-5 w-24 rounded-full" />

											{/* Title */}
											<Skeleton className="h-5 w-4/5" />

											{/* Schedule type */}
											<Skeleton className="h-4 w-1/3" />
										</CardHeader>

										<CardContent>
											{/* Description */}
											<div className="space-y-2">
												<Skeleton className="h-4 w-full" />
												<Skeleton className="h-4 w-11/12" />
												<Skeleton className="h-4 w-3/4" />
											</div>
										</CardContent>
									</Card>
								))
							: programs?.data.map((program) => (
									<Card
										key={program.id}
										className="w-full rounded-md transition-shadow duration-300 hover:shadow-lg"
									>
										<CardHeader>
											<div className="mb-2 inline-block w-fit rounded-full bg-blue-900 px-3 py-1 font-semibold text-white text-xs capitalize">
												{program.category.name}
											</div>
											<CardTitle className="font-semibold text-blue-900 text-lg capitalize">
												{program.title}
											</CardTitle>
											<CardDescription>{program.schedule_type}</CardDescription>
										</CardHeader>

										<CardContent>
											<p className="text-gray-600 text-sm">
												{program.description}
											</p>
										</CardContent>
									</Card>
								))}
					</div>

					{/* All Programs CTA */}
					{!isProgramsFetchLoading && programs?.data.length ? (
						<Link to="/program">
							<Button
								variant="outline"
								className="rounded-md border-blue-900 p-4 font-[550] text-blue-900 text-sm capitalize hover:cursor-pointer hover:bg-blue-50 hover:text-blue-900"
							>
								Lihat semua program
								<ArrowRight className="ml-2 size-4" />
							</Button>
						</Link>
					) : null}
				</div>
			</section>

			{/* News Section */}
			<section className="flex w-full justify-center bg-white">
				<div className="container flex w-full flex-col items-center">
					<div className="mb-12 text-center">
						<h2 className="mb-4 font-bold text-4xl text-blue-900">
							Berita Terbaru
						</h2>
						<p className="text-gray-600 text-lg">
							Update kegiatan dan informasi terkini
						</p>
					</div>

					{/* News Cards */}
					<div className="mb-8 grid w-full grid-cols-[repeat(auto-fill,minmax(350px,1fr))] items-center justify-center gap-6">
						{isNewsFetchLoading
							? Array.from({ length: 3 }, () => (
									<Card key={Math.random()} className="w-full rounded-md">
										<CardHeader>
											{/* Category + Date */}
											<div className="mb-2 flex items-center justify-between gap-4">
												<Skeleton className="h-5 w-20 rounded-full" />
												<Skeleton className="h-4 w-28" />
											</div>

											{/* Title */}
											<div className="space-y-2">
												<Skeleton className="h-5 w-full" />
												<Skeleton className="h-5 w-4/5" />
											</div>
										</CardHeader>

										<CardContent>
											{/* Excerpt */}
											<div className="space-y-2">
												<Skeleton className="h-4 w-full" />
												<Skeleton className="h-4 w-11/12" />
												<Skeleton className="h-4 w-3/4" />
											</div>
										</CardContent>
									</Card>
								))
							: news?.data.map((item) => (
									<Card
										key={item.id}
										className="w-full rounded-md transition-shadow duration-300 hover:shadow-lg"
									>
										<CardHeader>
											<div className="mb-2 flex items-center justify-between gap-4">
												<span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-900 text-xs capitalize">
													{item.category.name}
												</span>
												<span className="text-gray-500 text-xs">
													{new Intl.DateTimeFormat("id-ID", {
														dateStyle: "long",
													}).format(new Date(item.published_at as string))}
												</span>
											</div>

											<CardTitle className="font-semibold text-blue-900 text-lg capitalize leading-snug">
												{item.title}
											</CardTitle>
										</CardHeader>

										<CardContent>
											<p className="text-gray-600 text-sm first-letter:capitalize">
												{item.excerpt}
											</p>
										</CardContent>
									</Card>
								))}
					</div>

					{/* All News CTA */}
					{!isNewsFetchLoading && news?.data.length ? (
						<Link to="/berita">
							<Button
								variant="outline"
								className="rounded-md border-blue-900 p-4 font-[550] text-blue-900 text-sm capitalize hover:cursor-pointer hover:bg-blue-50 hover:text-blue-900"
							>
								Lihat Semua Berita
								<ArrowRight className="ml-2 size-4" />
							</Button>
						</Link>
					) : null}
				</div>
			</section>

			{/* CTA Section */}
			<section className="flex w-full justify-center bg-blue-900">
				<div className="flex w-full max-w-3xl flex-col items-center text-center text-white">
					<h2 className="mb-6 font-bold text-3xl capitalize md:text-4xl">
						Bergabunglah Bersama Kami
					</h2>

					<p className="mb-8 text-base text-blue-100 leading-relaxed">
						Jadilah bagian dari gerakan pemuda yang membawa perubahan positif
						untuk masyarakat. Bersama kita bisa berkontribusi lebih banyak!
					</p>

					<Link to="/gabung">
						<Button
							variant="outline"
							className="rounded-md bg-white p-5 font-[550] text-blue-900 text-sm capitalize transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:bg-gray-100 hover:text-blue-900"
						>
							Daftar Sekarang
							<ArrowRight className="ml-2 size-4" />
						</Button>
					</Link>
				</div>
			</section>
		</main>
	);
}
