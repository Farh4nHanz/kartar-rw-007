import { pages } from "./pages";
import type { SidebarGroup } from "./types";

export const sidebarGroups = {
	menu: {
		id: "menu",
		label: "Menu",
		items: [pages.dashboard, pages.members, pages.collaborations],
	},
	management: {
		id: "management",
		label: "Pengelolaan",
		items: [pages.categories, pages.periods],
	},
	activities: {
		id: "activities",
		label: "Program & Aktivitas",
		items: [pages.programs, pages.news, pages.galleries],
	},
} as const satisfies Record<string, SidebarGroup>;

export const footerItems = [pages.settings, pages.logout];
