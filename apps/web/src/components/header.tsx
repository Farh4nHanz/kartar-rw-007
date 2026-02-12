import { Link, useMatchRoute } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Menu, X } from "lucide-react";
import { Activity, useState } from "react";
import type { FileRoutesByFullPath } from "@/routeTree.gen";

const links: {
	to: keyof FileRoutesByFullPath;
	label: string;
}[] = [
	{ to: "/", label: "Beranda" },
	{ to: "/tentang-kami", label: "Tentang Kami" },
	{ to: "/struktur", label: "Struktur Organisasi" },
	{ to: "/program", label: "Program & Kegiatan" },
	{ to: "/berita", label: "Berita" },
	{ to: "/galeri", label: "Galeri" },
	{ to: "/kolaborasi", label: "Kolaborasi" },
	{ to: "/gabung", label: "Bergabung" },
	{ to: "/kontak", label: "Kontak" },
] as const;

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const matchRoute = useMatchRoute();

	return (
		<header className="sticky top-0 z-50 bg-white py-4 shadow-md *:not-last:px-6 lg:px-8">
			<div className="flex h-fit min-h-20 items-center justify-between gap-16">
				{/* Logo */}
				<Link to="/" className="group flex shrink-0 items-center space-x-3">
					<img
						className="size-10 rounded-full object-cover object-center italic"
						src="/android-chrome-512x512.png"
						alt="Logo Karang Taruna"
					/>

					<div className="flex flex-col">
						<span className="font-bold text-blue-900 text-lg leading-tight">
							Karang Taruna
						</span>
						<span className="font-semibold text-gray-600 text-xs">RW 07</span>
					</div>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden basis-8/12 flex-wrap items-end justify-end gap-3 lg:flex">
					{links.map((item) => (
						<Link
							key={item.label}
							to={item.to}
							className={cn(
								"rounded-md px-3 py-2 font-medium text-sm transition-colors duration-200",
								matchRoute({ to: item.to, fuzzy: true })
									? "bg-blue-900 text-white"
									: "text-gray-700 hover:bg-blue-50 hover:text-blue-900",
							)}
						>
							{item.label}
						</Link>
					))}
				</nav>

				{/* Mobile Menu Button */}
				<Button
					variant="ghost"
					size="icon"
					className="rounded-md hover:cursor-pointer lg:hidden"
					onClick={() => setIsOpen((o) => !o)}
					aria-label="Open menu"
				>
					{isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
				</Button>
			</div>

			{/* Mobile Navigation */}
			<Activity mode={isOpen ? "visible" : "hidden"}>
				<nav className="mb-5 border-gray-200 border-t lg:hidden">
					{links.map((item) => (
						<Link
							key={item.label}
							to={item.to}
							className={cn(
								"block px-4 py-3 font-medium text-sm transition-colors duration-200",
								matchRoute({ to: item.to, fuzzy: true })
									? "bg-blue-900 text-white"
									: "text-gray-700 hover:bg-blue-50 hover:text-blue-900",
							)}
							onClick={() => setIsOpen(false)}
						>
							{item.label}
						</Link>
					))}
				</nav>
			</Activity>
		</header>
	);
}
