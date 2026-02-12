import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Handshake, PhoneCall } from "lucide-react";
import { useCallback, useMemo } from "react";
import { getAllCollaborationsQueryOptions } from "@/hooks/query-options";

export const Route = createFileRoute("/kolaborasi")({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(getAllCollaborationsQueryOptions()),
});

function RouteComponent() {
	const { data: collaborations, isLoading: isCollaborationsFetchLoading } =
		useQuery(getAllCollaborationsQueryOptions());

	const getPeriodYear = useMemo(() => {
		if (collaborations?.data.length && !isCollaborationsFetchLoading) {
			const startYear = collaborations?.data.at(0)?.period.start_year;
			const endYear = collaborations?.data.at(0)?.period.end_year;

			return `${startYear}-${endYear}`;
		}

		return "";
	}, [collaborations?.data, isCollaborationsFetchLoading]);

	const openWhatsApp = useCallback(() => {
		const message = encodeURIComponent(`
Halo Bapak/Ibu,

Perkenalkan, kami dari [Nama Perusahaan / Nama Pribadi].

Melalui pesan ini, kami ingin menyampaikan ketertarikan untuk menjalin kerja sama dengan Karang Taruna RW 07 dalam kegiatan atau program yang sedang maupun akan dijalankan.

Kami berharap kolaborasi ini dapat memberikan manfaat positif bagi masyarakat dan kedua belah pihak.

Apabila berkenan, kami siap untuk berdiskusi lebih lanjut mengenai bentuk kerja samanya.

Terima kasih atas waktu dan perhatiannya.
		`);

		const phoneNumber = "628892157620";
		const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

		window.open(whatsappUrl, "_blank");
	}, []);

	return (
		<main className="flex h-fit min-h-screen w-full justify-center bg-gray-50 py-16">
			<div className="container w-full px-6 py-2 *:not-last:mb-12">
				{/* Header */}
				<div className="text-center">
					<h1 className="mb-4 font-bold text-5xl text-blue-900">
						Kolaborasi & Kemitraan
					</h1>
					<p className="mx-auto max-w-3xl text-gray-600 text-lg">
						Karang Taruna RW 07 menjalin kerjasama strategis dengan berbagai
						pihak untuk meningkatkan kualitas program dan dampak positif bagi
						masyarakat.
					</p>
				</div>

				{/* Collaboration Cards */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{isCollaborationsFetchLoading
						? Array.from({ length: 6 }, () => (
								<Card key={Math.random()} className="rounded-lg px-2 py-5">
									<CardHeader className="space-y-2">
										<div className="flex items-start justify-between">
											{/* Icon block */}
											<Skeleton className="size-14 rounded-lg" />

											{/* Category badge */}
											<Skeleton className="h-5 w-24 rounded-full" />
										</div>

										{/* Partner name */}
										<Skeleton className="h-4 w-4/5" />
									</CardHeader>

									<CardContent>
										{/* Description */}
										<div className="mb-3 space-y-2">
											<Skeleton className="h-4 w-full" />
											<Skeleton className="h-4 w-11/12" />
											<Skeleton className="h-4 w-3/4" />
										</div>

										{/* Period */}
										<Skeleton className="h-3 w-1/2" />
									</CardContent>
								</Card>
							))
						: collaborations?.data.map((collab) => (
								<Card
									key={collab.id}
									className="rounded-lg px-2 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
								>
									<CardHeader className="space-y-2">
										<div className="flex items-start justify-between">
											<div className="mb-4 flex size-14 items-center justify-center rounded-lg bg-blue-900 text-white">
												<Handshake className="size-6" />
											</div>

											<CardDescription className="w-fit rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-900 text-xs capitalize">
												{collab.category.name}
											</CardDescription>
										</div>

										<CardTitle className="font-semibold text-base text-blue-900 capitalize">
											{collab.partner_name}
										</CardTitle>
									</CardHeader>

									<CardContent>
										<p className="mb-3 text-gray-700 text-sm leading-relaxed first-letter:capitalize">
											{collab.description}
										</p>
										<p className="font-medium text-gray-500 text-xs">
											Periode: {getPeriodYear}
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
										key={item}
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
										key={item}
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

						<Button
							size="lg"
							className="rounded-lg bg-white px-8 py-4 font-semibold text-blue-900 transition-colors duration-300 hover:cursor-pointer hover:bg-gray-100"
							onClick={openWhatsApp}
						>
							<PhoneCall className="mr-2" />
							Hubungi Kami
						</Button>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
