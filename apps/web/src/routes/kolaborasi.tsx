import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Building2,
	GraduationCap,
	Handshake,
	Heart,
	PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { collaborations } from "@/data/mock";

export const Route = createFileRoute("/kolaborasi")({
	component: RouteComponent,
});

function RouteComponent() {
	const getIcon = (type: string) => {
		switch (type) {
			case "Akademik":
				return <GraduationCap className="size-6" />;
			case "Ekonomi":
				return <Building2 className="size-6" />;
			case "Kesehatan":
				return <Heart className="size-6" />;
			default:
				return <Handshake className="size-6" />;
		}
	};

	return (
		<main className="flex h-fit min-h-screen w-full justify-center bg-gray-50 py-16">
			<div className="container w-full px-6 py-2 *:not-last:mb-12">
				{/* Header */}
				<div className="text-center">
					<h1 className="mb-4 font-bold text-5xl text-blue-900">
						Kolaborasi & Kemitraan
					</h1>
					<p className="mx-auto max-w-3xl text-gray-600 text-lg">
						Karang Taruna RW 007 menjalin kerjasama strategis dengan berbagai
						pihak untuk meningkatkan kualitas program dan dampak positif bagi
						masyarakat.
					</p>
				</div>

				{/* Collaboration Cards */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{collaborations.map((collab) => (
						<Card
							key={collab.id}
							className="rounded-lg px-2 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
						>
							<CardHeader className="space-y-2">
								<div className="flex items-start justify-between">
									<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-900 text-white">
										{getIcon(collab.type)}
									</div>

									<CardDescription className="w-fit rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-900 text-xs">
										{collab.type}
									</CardDescription>
								</div>

								<CardTitle className="font-semibold text-base text-blue-900">
									{collab.partner}
								</CardTitle>
							</CardHeader>

							<CardContent>
								<p className="mb-3 text-gray-700 text-sm leading-relaxed">
									{collab.description}
								</p>
								<p className="font-medium text-gray-500 text-xs">
									Periode: {collab.year}
								</p>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Benefits Section */}
				<Card className="rounded-lg px-2 py-6">
					<CardHeader className="mb-4 text-center">
						<CardTitle className="font-semibold text-2xl text-blue-900">
							Manfaat Kolaborasi
						</CardTitle>
					</CardHeader>

					<CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
						{/* Organizational Benefits */}
						<div className="rounded-lg bg-blue-50 p-6">
							<h4 className="mb-3 font-semibold text-blue-900 text-lg">
								Bagi Organisasi
							</h4>
							<ul className="space-y-2 text-gray-700 text-sm [counter-reset:dot] *:[&::before]:[content:counter(dot,disc)] *:[&::before]:[counter-increment:dot]">
								{[
									"Meningkatkan kapasitas dan kompetensi anggota",
									"Memperluas jaringan dan akses sumber daya",
									"Meningkatkan kredibilitas organisasi",
									"Transfer pengetahuan dan best practices",
								].map((item) => (
									<li
										className="flex items-start gap-2 text-blue-900"
										key={item.split(" ")[0]}
									>
										{item}
									</li>
								))}
							</ul>
						</div>

						{/* Public Benefits */}
						<div className="rounded-lg bg-blue-50 p-6">
							<h4 className="mb-3 font-semibold text-blue-900 text-lg">
								Bagi Masyarakat
							</h4>
							<ul className="space-y-2 text-gray-700 text-sm [counter-reset:dot] *:[&::before]:[content:counter(dot,disc)] *:[&::before]:[counter-increment:dot]">
								{[
									"Program yang lebih berkualitas dan berdampak",
									"Akses ke berbagai layanan dan fasilitas",
									"Peningkatan kesejahteraan masyarakat",
									"Solusi terintegrasi untuk masalah sosial",
								].map((item) => (
									<li
										className="flex items-start gap-2 text-blue-900"
										key={item.split(" ")[0]}
									>
										{item}
									</li>
								))}
							</ul>
						</div>
					</CardContent>
				</Card>

				{/* CTA Section */}
				<Card className="flex w-full items-center rounded-lg bg-blue-900 text-white">
					<CardContent className="flex max-w-2xl flex-col items-center py-8 text-center">
						<Handshake className="mb-4 size-16" />
						<h3 className="mb-3 font-bold text-3xl">Tertarik Berkolaborasi?</h3>
						<p className="mb-6 text-blue-100 text-sm leading-relaxed">
							Kami terbuka untuk menjalin kerjasama dengan berbagai pihak yang
							memiliki visi yang sama dalam pemberdayaan masyarakat. Mari
							bersama-sama menciptakan dampak positif yang lebih besar.
						</p>

						<Link to="/kontak">
							<Button
								size="lg"
								className="rounded-lg bg-white px-8 py-4 font-semibold text-blue-900 transition-colors duration-300 hover:cursor-pointer hover:bg-gray-100"
							>
								<PhoneCall className="mr-2" />
								Hubungi Kami
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
