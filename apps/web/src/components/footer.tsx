import { Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { contactInfo } from "@/data";
import type { FileRoutesByFullPath } from "@/routeTree.gen";

const quickLinks: {
	to: keyof FileRoutesByFullPath;
	label: string;
}[] = [
	{ to: "/tentang-kami", label: "Tentang Kami" },
	{ to: "/struktur", label: "Struktur Organisasi" },
	{ to: "/program", label: "Program & Kegiatan" },
	{ to: "/berita", label: "Berita & Informasi" },
	{ to: "/gabung", label: "Bergabung dengan Kami" },
] as const;

export default function Footer() {
	return (
		<footer className="h-fit w-full bg-blue-900 px-6 py-16 text-white lg:px-8">
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
				{/* About */}
				<div className="flex flex-col">
					<div className="mb-4 flex items-center space-x-3">
						<img
							className="size-10 rounded-full object-cover object-center italic"
							src="/android-chrome-512x512.png"
							alt="Logo Karang Taruna"
						/>

						<span className="font-bold text-base leading-tight">
							Karang Taruna RW 07
						</span>
					</div>

					<div className="mb-4 flex items-center space-x-3">
						<img
							className="size-10 rounded-full object-cover object-center italic"
							src="/logo_uta.png"
							alt="Logo UTA'45 Jakarta"
						/>

						<span className="font-bold text-base leading-tight">
							Universitas 17 Agustus 1945 Jakarta
						</span>
					</div>

					<p className="text-blue-100 text-sm leading-relaxed">
						Organisasi kepemudaan yang berkomitmen membangun generasi muda yang
						kreatif, inovatif, dan berprestasi.
					</p>
				</div>

				{/* Quick Links */}
				<nav className="flex flex-col" aria-label="Link cepat">
					<h3 className="mb-4 font-bold text-lg">Navigasi Cepat</h3>
					<ul className="space-y-2">
						{quickLinks.map((item) => (
							<li key={item.label}>
								<Link
									to={item.to}
									className="text-blue-100 text-sm transition-colors duration-200 hover:text-white"
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{/* Contact Info */}
				<div className="flex flex-col">
					<h3 className="mb-4 font-bold text-lg">Kontak Kami</h3>
					<ul className="space-y-3">
						{contactInfo.general
							.filter((item) => {
								const contact = ["Email", "Telepon", "Alamat"].map((c) =>
									c.toLowerCase(),
								);
								return contact.includes(item.label.toLowerCase());
							})
							.map((item) => (
								<li key={item.label} className="flex items-start space-x-2">
									<item.icon className="mt-0.5 size-5 shrink-0" />
									<span className="text-sm">{item.value}</span>
								</li>
							))}
					</ul>
				</div>

				{/* Social Media */}
				<nav className="flex flex-col" aria-label="Social media">
					<h3 className="mb-4 font-bold text-lg">Media Sosial</h3>
					<ul className="flex space-x-3">
						{contactInfo.socialMedia.map((item) => (
							<Button
								variant="link"
								key={item.label}
								onClick={() => {
									window.open(item.link, "_blank", "noopener,noreferrer");
								}}
								className="flex size-10 items-center justify-center rounded-lg bg-blue-800 text-white transition-all duration-300 hover:cursor-pointer hover:bg-white hover:text-blue-900"
							>
								<item.icon />
							</Button>
						))}
					</ul>

					{/* Operational Hours */}
					<p className="mt-4 flex flex-col text-blue-100 text-sm">
						<strong>Jam Operasional:</strong>
						{contactInfo.general.at(-1)?.value}
					</p>
				</nav>
			</div>

			{/* Copyright */}
			<div className="mt-8 border-blue-800 border-t pt-8 text-center">
				<p className="text-blue-100 text-sm">
					&copy; {new Date().getFullYear()} Karang Taruna RW 07 bersama dengan
					Universitas 17 Agustus 1945 Jakarta. Semua hak cipta dilindungi.
				</p>
			</div>
		</footer>
	);
}
