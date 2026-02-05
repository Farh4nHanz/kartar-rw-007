import {
	CalendarRange,
	ChartBarStacked,
	Handshake,
	Images,
	LayoutDashboard,
	LogOut,
	Newspaper,
	Presentation,
	Settings,
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
	members: {
		id: "members",
		label: "Anggota Organisasi",
		href: "/anggota",
		icon: Users,
	},
	programs: {
		id: "programs",
		label: "Program",
		href: "/program",
		icon: Presentation,
	},
	galleries: {
		id: "galleries",
		label: "Galeri",
		href: "/galeri",
		icon: Images,
	},
	news: {
		id: "news",
		label: "Berita",
		href: "/berita",
		icon: Newspaper,
	},
	collaborations: {
		id: "collaborations",
		label: "Mitra Kerjasama",
		href: "/mitra",
		icon: Handshake,
	},
	periods: {
		id: "periods",
		label: "Periode",
		href: "/periode",
		icon: CalendarRange,
	},
	categories: {
		id: "categories",
		label: "Kategori",
		href: "/kategori",
		icon: ChartBarStacked,
	},
	settings: {
		id: "settings",
		label: "Settings",
		href: "/pengaturan",
		icon: Settings,
	},
	logout: {
		id: "logout",
		label: "Logout",
		href: "/logout",
		icon: LogOut,
	},
} as const satisfies Record<string, SidebarItem>;
