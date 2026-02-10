import { pages } from "./pages";
import type { SidebarGroup } from "./types";

export const sidebarGroups = {
	menu: {
		id: "menu",
		label: "Menu",
		items: [pages.dashboard],
	},
	organization: {
		id: "organization",
		label: "Organisasi",
		items: [pages.periods, pages.positions, pages.members],
	},
	publication: {
		id: "publication",
		label: "Konten & Publikasi",
		items: [pages.categories, pages.programs, pages.news, pages.galleries],
	},
	collaboration: {
		id: "collaboration",
		label: "Kemitraan",
		items: [pages.collaborations],
	},
} as const satisfies Record<string, SidebarGroup>;
