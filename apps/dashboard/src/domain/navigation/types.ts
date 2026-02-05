import type { IconType } from "@workspace/ui/types/icon";
import type { FileRoutesByFullPath } from "@/routeTree.gen";

export type AppRoute = keyof FileRoutesByFullPath;

export type SidebarItem = {
	id: string;
	label: string;
	icon: IconType;
	href: AppRoute;
};

export type SidebarGroup = {
	id: string;
	label: string;
	items: readonly SidebarItem[];
};
