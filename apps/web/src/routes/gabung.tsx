import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { parsePhoneNumber } from "awesome-phonenumber";
import {
	Award,
	CheckCircle,
	Footprints,
	NotebookPen,
	UserPlus,
} from "lucide-react";
import { useMemo } from "react";
import { contactInfo } from "@/data";

export const Route = createFileRoute("/gabung")({
	component: RouteComponent,
});

function RouteComponent() {
	const pn = contactInfo.general.find(
		(c) => c.label.toLowerCase() === "whatsapp",
	)?.value;

	const waLink = useMemo(() => {
		const waNumber = parsePhoneNumber(pn as string, {
			regionCode: "ID",
		}).number?.e164;

		return `https://wa.me/${waNumber}`;
	}, [pn]);

	return (
		<main className="flex h-fit min-h-screen w-full justify-center bg-gray-50 py-16">
			<div className="container w-full px-6 py-2">
				{/* Header */}
				<div className="mb-16 flex flex-col items-center gap-4 text-center">
					<UserPlus className="size-16 text-blue-900" />
					<h1 className="font-bold text-5xl text-blue-900">
						Bergabung dengan Kami
					</h1>
					<p className="text-gray-600 text-lg">
						Mari menjadi bagian dari gerakan pemuda yang membawa perubahan
						positif untuk masyarakat. Bersama kita bisa berbuat lebih banyak!
					</p>
				</div>

				<div className="flex flex-col gap-10 *:rounded-lg *:px-2 *:py-5">
					{/* Requirements */}
					<Card>
						<CardHeader className="mb-3">
							<CardTitle className="flex items-center gap-3">
								<NotebookPen className="size-6 text-blue-900" />
								<h2 className="font-semibold text-blue-900 text-xl">
									Syarat Keanggotaan
								</h2>
							</CardTitle>
						</CardHeader>

						<CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{[
								"Berusia 17 - 35 tahun",
								"Berdomisili di lingkungan RW 007",
								"Memiliki KTP atau kartu identitas yang masih berlaku",
								"Bersedia aktif mengikuti kegiatan organisasi",
								"Memiliki komitmen untuk berkontribusi bagi masyarakat",
							].map((requirement) => (
								<div
									key={requirement}
									className="flex items-center gap-3 rounded-lg bg-blue-50 p-4"
								>
									<CheckCircle className="size-5 text-blue-900" />
									<span className="text-gray-700 text-sm">{requirement}</span>
								</div>
							))}
						</CardContent>
					</Card>

					{/* Benefits */}
					<Card>
						<CardHeader className="mb-3">
							<CardTitle className="flex items-center gap-3">
								<Award className="size-7 text-blue-900" />
								<h2 className="font-semibold text-blue-900 text-xl">
									Manfaat Bergabung
								</h2>
							</CardTitle>
						</CardHeader>

						<CardContent className="grid grid-cols-1 gap-5 [counter-reset:benefit] md:grid-cols-2">
							{[
								"Meningkatkan keterampilan dan pengetahuan melalui pelatihan dan kegiatan pengembangan diri",
								"Memperluas jaringan dan hubungan dengan orang-orang yang memiliki minat dan tujuan yang sama",
								"Berpartisipasi dalam kegiatan sosial dan kemasyarakatan yang bermanfaat",
								"Meningkatkan rasa percaya diri dan kepemimpinan",
								"Mendapatkan pengalaman dan referensi yang berharga untuk masa depan",
								"Berkontribusi dalam membangun masyarakat yang lebih baik",
							].map((benefit) => (
								<div
									key={benefit}
									className="flex items-center gap-3 rounded-lg py-1 [&::before]:flex [&::before]:size-8 [&::before]:shrink-0 [&::before]:items-center [&::before]:justify-center [&::before]:rounded-full [&::before]:bg-blue-900 [&::before]:font-semibold [&::before]:text-white [&::before]:leading-none [&::before]:[content:counter(benefit)] [&::before]:[counter-increment:benefit]"
								>
									<p className="text-gray-700 text-sm">{benefit}</p>
								</div>
							))}
						</CardContent>
					</Card>

					{/* Registration Process */}
					<Card>
						<CardHeader className="mb-3">
							<CardTitle className="flex items-center gap-3">
								<Footprints className="size-7 text-blue-900" />
								<h2 className="font-semibold text-blue-900 text-xl">
									Proses Pendaftaran
								</h2>
							</CardTitle>
						</CardHeader>

						<CardContent className="grid grid-cols-1 gap-6 [counter-reset:process]">
							{[
								"Datang langsung ke sekretariat RW 07",
								"Serahkan fotokopi KTP dan pas foto 3x4 (2 lembar)",
								"Ikuti sesi orientasi anggota baru",
							].map((process) => (
								<div
									key={process}
									className="flex items-center gap-3 rounded-lg py-1 [&::before]:flex [&::before]:size-10 [&::before]:shrink-0 [&::before]:items-center [&::before]:justify-center [&::before]:rounded-full [&::before]:bg-blue-900 [&::before]:font-semibold [&::before]:text-sm [&::before]:text-white [&::before]:leading-none [&::before]:[content:counter(process)] [&::before]:[counter-increment:process]"
								>
									<p className="text-gray-700 text-sm">{process}</p>
								</div>
							))}
						</CardContent>
					</Card>

					{/* CTA Section */}
					<Card className="flex w-full items-center bg-blue-900 text-white">
						<CardContent className="flex max-w-2xl flex-col items-center py-8 text-center">
							<h3 className="mb-3 font-bold text-3xl">
								Siap Menjadi Bagian dari Kami?
							</h3>
							<p className="mb-6 text-blue-100 text-sm leading-relaxed">
								Jangan ragu untuk menjadi bagian dari keluarga besar Karang
								Taruna RW 07. Hubungi kami untuk informasi lebih lanjut atau
								datang langsung ke sekretariat.
							</p>

							<div className="flex w-full flex-wrap items-center justify-center gap-4">
								<Link to="/kontak">
									<Button
										size="lg"
										className="min-w-44 rounded-md bg-white px-8 py-4 font-semibold text-blue-900 text-sm transition-colors duration-300 hover:cursor-pointer hover:bg-gray-100 max-sm:text-xs"
									>
										Hubungi Kami
									</Button>
								</Link>
								<Link to={waLink} target="_blank" rel="noopener noreferrer">
									<Button
										size="lg"
										variant="outline"
										className="min-w-44 rounded-md bg-transparent px-8 py-4 font-semibold text-sm text-white transition-colors duration-300 hover:cursor-pointer hover:bg-white hover:text-blue-900 max-sm:text-xs"
									>
										WhatsApp Kami
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
