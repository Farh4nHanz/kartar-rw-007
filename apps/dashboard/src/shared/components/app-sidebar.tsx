import { Link, useMatchRoute } from "@tanstack/react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarSeparator,
	useSidebar,
} from "@workspace/ui/components/sidebar";
import { sidebarGroups } from "@/domain/navigation/groups";

export function AppSidebar() {
	return (
		<Sidebar collapsible="icon" bgClassName="bg-background">
			<Header />
			<Content />
		</Sidebar>
	);
}

function Header() {
	return (
		<SidebarHeader className="group-data-[collapsible=icon]:hidden">
			<div className="flex items-center justify-center gap-2">
				<img
					className="size-8 rounded-full object-cover object-center italic"
					src="/android-chrome-512x512.png"
					alt="Logo Karang Taruna"
				/>
				<h1 className="text-start font-bold font-heading text-base text-primary">
					Karang Taruna RW 07
				</h1>
			</div>
			<SidebarSeparator />
		</SidebarHeader>
	);
}

function Content() {
	const matchRoute = useMatchRoute();
	const { state } = useSidebar();
	const groups = Array.from(Object.values(sidebarGroups));

	return (
		<SidebarContent>
			{groups.map((group) => (
				<SidebarGroup key={group.id}>
					<SidebarGroupLabel>{group.label}</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{group.items.map((item) => (
								<SidebarMenuButton
									key={item.id}
									tooltip={state === "collapsed" ? item.label : undefined}
									className="text-[calc(var(--text-sm)-1px)] transition-colors duration-150 ease-out hover:cursor-pointer data-[active=false]:bg-inherit data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=false]:hover:bg-primary data-[active=false]:hover:text-primary-foreground"
									data-label={item.label}
									asChild
									isActive={!!matchRoute({ to: item.href, fuzzy: true })}
								>
									<Link to={item.href}>
										{item.icon ? <item.icon size="16" /> : null}
										<span className="group-data-[collapsible=icon]:hidden">
											{item.label}
										</span>
									</Link>
								</SidebarMenuButton>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			))}
		</SidebarContent>
	);
}
