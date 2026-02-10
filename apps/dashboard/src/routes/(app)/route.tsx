import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { RouteComponentLoader } from "@workspace/ui/components/loader";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { AppSidebar } from "@/shared/components/app-sidebar";
import { Navbar } from "@/shared/components/navbar";
import { useIsMobile } from "@/shared/hooks/use-mobile";

export const Route = createFileRoute("/(app)")({
	component: RouteComponent,
});

function RouteComponent() {
	const isMobile = useIsMobile();
	const { loading, isLoggedIn } = useAuth();

	if (loading) return <RouteComponentLoader />;
	if (!isLoggedIn) return <Navigate to="/login" replace />;

	return (
		<SidebarProvider
			key={isMobile ? "mobile" : "desktop"}
			isMobile={isMobile}
			defaultOpen
		>
			<AppSidebar />

			<main className="relative grid h-svh w-full grid-rows-[auto_1fr] bg-background">
				<Navbar />
				<Outlet />
			</main>
		</SidebarProvider>
	);
}
