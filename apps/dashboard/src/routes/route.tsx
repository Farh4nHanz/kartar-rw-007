import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { AppSidebar } from "@/shared/components/app-sidebar";
import { Navbar } from "@/shared/components/navbar";
import { useIsMobile } from "@/shared/hooks/use-mobile";

export const Route = createFileRoute("")({
	component: RouteComponent,
});

function RouteComponent() {
	const isMobile = useIsMobile();

	return (
		<SidebarProvider isMobile={isMobile}>
			<AppSidebar />

			<main className="grid h-svh w-full grid-rows-[auto_1fr] bg-background">
				<Navbar />
				<Outlet />
			</main>
		</SidebarProvider>
	);
}
