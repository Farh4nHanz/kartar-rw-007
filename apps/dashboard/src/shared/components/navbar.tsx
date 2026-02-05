import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@workspace/ui/components/avatar";
import { ModeToggle } from "@workspace/ui/components/mode-toggle";
import { Separator } from "@workspace/ui/components/separator";
import { SidebarTrigger, useSidebar } from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import { useMemo } from "react";

export function Navbar() {
	const { state, isMobile } = useSidebar();

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
			<div className="flex items-center gap-2">
				<SidebarTrigger className="hover:cursor-pointer" />

				<div className="mr-1 h-6">
					<Separator orientation="vertical" />
				</div>

				<h1 className="font-heading font-semibold text-base">
					Admin Dashboard
				</h1>
			</div>

			{/* Right */}
			<div className="flex items-center gap-1.5">
				{/* Toggle Theme */}
				<ModeToggle />

				<div className="flex items-center gap-3">
					{/* User Name */}
					<h3 className="font-heading font-medium text-sm tracking-wide max-md:hidden">
						Admin
					</h3>

					{/* User Avatar */}
					<Avatar>
						<AvatarImage src="https://example.com" />
						<AvatarFallback>AD</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</header>
	);
}
