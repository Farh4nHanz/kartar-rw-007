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
import { SidebarTrigger, useSidebar } from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import { Eclipse, LogOut, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMemo } from "react";

export function Navbar() {
	const { state, isMobile } = useSidebar();
	const { setTheme } = useTheme();

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
						admin@gmail.com
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
						<DropdownMenuItem variant="destructive">
							<LogOut />
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
