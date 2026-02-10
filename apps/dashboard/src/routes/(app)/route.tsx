import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { useState } from "react";
import { AppSidebar } from "@/shared/components/app-sidebar";
import { Navbar } from "@/shared/components/navbar";
import { useIsMobile } from "@/shared/hooks/use-mobile";

export const Route = createFileRoute("/(app)")({
	component: RouteComponent,
});

function RouteComponent() {
	const isMobile = useIsMobile();
	const [isOpen, setIsOpen] = useState(!isMobile);

	return (
		<SidebarProvider
			key={isMobile ? "mobile" : "desktop"}
			isMobile={isMobile}
			{...(isMobile ? { open: isOpen, onOpenChange: setIsOpen } : {})}
		>
			<AppSidebar />

			<main className="relative grid h-svh w-full grid-rows-[auto_1fr] bg-background">
				<Navbar />
				<Outlet />
			</main>
		</SidebarProvider>
	);
}
