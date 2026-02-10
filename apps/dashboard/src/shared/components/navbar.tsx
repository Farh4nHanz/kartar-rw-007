import { useNavigate } from "@tanstack/react-router";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog";
import { Button } from "@workspace/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { ComponentLoader } from "@workspace/ui/components/loader";
import { SidebarTrigger, useSidebar } from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import {
	BadgeQuestionMark,
	Eclipse,
	LogOut,
	Menu,
	Moon,
	Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { logout } from "@/features/auth/services";

export function Navbar() {
	const navigate = useNavigate();

	const { user } = useAuth();

	const { state, isMobile } = useSidebar();
	const { setTheme } = useTheme();

	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
	const [isLogoutLoading, setIsLogoutLoading] = useState(false);

	const handleLogout = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();

		try {
			setIsLogoutLoading(true);
			await logout();
			navigate({ to: "/login" });
		} catch (error) {
			if (error instanceof Error)
				toast.error(error.message, {
					duration: 5000,
					closeButton: true,
					dismissible: true,
				});
		} finally {
			setIsLogoutLoading(false);
			setIsLogoutModalOpen(false);
		}
	};

	// Handle the sidebar width
	// If it's on mobile, the sidebar is full width
	// If it's collapsed, the sidebar width calculated width the sidebar in icon mode width
	const width = useMemo(() => {
		return isMobile
			? "w-full"
			: state === "collapsed"
				? "w-[calc(100%-var(--sidebar-width-icon))]"
				: "w-[calc(100%-var(--sidebar-width))]";
	}, [state, isMobile]);

	return (
		<header
			className={cn(
				width,
				"fixed z-50 flex flex-row items-center justify-between border-b bg-background px-4 py-2",
			)}
		>
			{/* Left */}
			<SidebarTrigger className="hover:cursor-pointer" />

			{/* Right */}
			<div className="flex items-center gap-3">
				{/* User Info */}
				<div className="space-y-1 text-end">
					<h3 className="font-semibold text-xs">Admin Karang Taruna</h3>
					<p className="text-[calc(var(--text-xs)-1px)] text-muted-foreground">
						{user?.email}
					</p>
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="rounded-sm hover:cursor-pointer"
						>
							<Menu />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end">
						<DropdownMenuGroup>
							<DropdownMenuLabel>Tema</DropdownMenuLabel>
						</DropdownMenuGroup>

						{/* Toggle Theme */}
						<DropdownMenuItem onClick={() => setTheme("light")}>
							<Sun className="size-[.9rem]" color="var(--primary)" />
							Light
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("dark")}>
							<Moon className="size-[.9rem]" color="var(--primary)" />
							Dark
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("system")}>
							<Eclipse className="size-[.9rem]" color="var(--primary)" />
							System
						</DropdownMenuItem>

						<DropdownMenuSeparator />

						{/* Logout Button */}
						<DropdownMenuItem
							variant="destructive"
							onClick={() => setIsLogoutModalOpen(true)}
						>
							<LogOut />
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<AlertDialog
					open={isLogoutModalOpen}
					onOpenChange={(open) => setIsLogoutModalOpen(open)}
				>
					<AlertDialogContent open={isLogoutModalOpen} size="sm">
						<AlertDialogHeader>
							<AlertDialogMedia className="size-12">
								<BadgeQuestionMark className="size-8" />
							</AlertDialogMedia>

							<AlertDialogTitle>Keluar dari aplikasi?</AlertDialogTitle>
							<AlertDialogDescription>
								Klik tombol keluar untuk keluar dari aplikasi.
							</AlertDialogDescription>
						</AlertDialogHeader>

						<AlertDialogFooter>
							<AlertDialogCancel>Batal</AlertDialogCancel>
							<AlertDialogAction
								variant="destructive"
								onClick={handleLogout}
								disabled={isLogoutLoading}
							>
								{isLogoutLoading ? <ComponentLoader /> : "Keluar"}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</header>
	);
}
