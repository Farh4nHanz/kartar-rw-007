import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FileRoutesByFullPath } from "@/routeTree.gen";

const links: {
	to: keyof FileRoutesByFullPath;
	label: string;
}[] = [
	{ to: "/", label: "Beranda" },
	{ to: "/tentang-kami", label: "Tentang Kami" },
	{ to: "/struktur", label: "Struktur Organisasi" },
	{ to: "/program", label: "Program & Kegiatan" },
	{ to: "/", label: "Berita" },
	{ to: "/galeri", label: "Galeri" },
	{ to: "/kolaborasi", label: "Kolaborasi" },
	{ to: "/", label: "Bergabung" },
	{ to: "/kontak", label: "Kontak" },
] as const;

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();

	const isActive = (path: string) => location.pathname === path;

	return (
		<header className="sticky top-0 z-50 bg-white px-6 shadow-md lg:px-8">
			<div className="flex h-20 items-center justify-between">
				{/* Logo */}
				<Link to="/" className="group flex items-center space-x-3">
					<div className="flex size-12 items-center justify-center rounded-lg bg-blue-900 font-bold text-white text-xl transition-transform duration-300 group-hover:scale-110">
						KT
					</div>

					<div className="flex flex-col">
						<span className="font-bold text-blue-900 text-lg leading-tight">
							Karang Taruna
						</span>
						<span className="font-medium text-gray-600 text-sm">RW 007</span>
					</div>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden items-center space-x-3 lg:flex">
					{links
						.filter((item) => {
							const desktopLink = [
								"Beranda",
								"Tentang Kami",
								"Struktur Organisasi",
								"Galeri",
								"Kolaborasi",
								"Kontak",
							];
							return desktopLink.includes(item.label);
						})
						.map((item) => (
							<Link
								key={item.label}
								to={item.to}
								className={cn(
									"rounded-md px-3 py-2 font-medium text-sm transition-colors duration-200",
									isActive(item.to)
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
			{isOpen ? (
				<nav className="border-gray-200 border-t py-4 lg:hidden">
					{links.map((item) => (
						<Link
							key={item.label}
							to={item.to}
							className={cn(
								"block px-4 py-3 font-medium text-base transition-colors duration-200",
								isActive(item.to)
									? "bg-blue-900 text-white"
									: "text-gray-700 hover:bg-blue-50 hover:text-blue-900",
							)}
							onClick={() => setIsOpen(false)}
						>
							{item.label}
						</Link>
					))}
				</nav>
			) : null}
		</header>
	);
}
