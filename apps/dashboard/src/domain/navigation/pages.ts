import {
	CalendarRange,
	FileText,
	FolderOpen,
	Handshake,
	Images,
	LayoutDashboard,
	Newspaper,
	Users,
} from "lucide-react";
import type { SidebarItem } from "./types";

export const pages = {
	dashboard: {
		id: "dashboard",
		label: "Dashboard",
		href: "/",
		icon: LayoutDashboard,
	},
	periods: {
		id: "periods",
		label: "Periode Kepengurusan",
		href: "/periode",
		icon: CalendarRange,
	},
	categories: {
		id: "categories",
		label: "Kategori Konten",
		href: "/kategori",
		icon: FolderOpen,
	},
	positions: {
		id: "positions",
		label: "Jabatan Organisasi",
		href: "/jabatan",
		icon: Users,
	},
	members: {
		id: "members",
		label: "Struktur Organisasi",
		href: "/anggota",
		icon: Users,
	},
	galleries: {
		id: "galleries",
		label: "Galeri Kegiatan",
		href: "/galeri",
		icon: Images,
	},
	programs: {
		id: "programs",
		label: "Program & Kegiatan",
		href: "/program",
		icon: FileText,
	},
	news: {
		id: "news",
		label: "Berita & Informasi",
		href: "/berita",
		icon: Newspaper,
	},
	collaborations: {
		id: "collaborations",
		label: "Kolaborasi",
		href: "/kolaborasi",
		icon: Handshake,
	},
} as const satisfies Record<string, SidebarItem>;
