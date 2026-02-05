import { Link, useRouterState } from "@tanstack/react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarSeparator,
	useSidebar,
} from "@workspace/ui/components/sidebar";
import { footerItems, sidebarGroups } from "@/domain/navigation/groups";

export function AppSidebar() {
	return (
		<Sidebar collapsible="icon" bgClassName="bg-background">
			<Header />
			<Content />
			<Footer />
		</Sidebar>
	);
}

function Header() {
	return (
		<SidebarHeader className="group-data-[collapsible=icon]:hidden">
			<h1 className="text-center font-bold font-heading text-primary text-xl">
				Karang Taruna RW 07
			</h1>
			<SidebarSeparator />
		</SidebarHeader>
	);
}

function Content() {
	const pathname = useRouterState().location.pathname;
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
									className="transition-colors duration-150 ease-out hover:cursor-pointer data-[active=false]:bg-inherit data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=false]:hover:bg-primary data-[active=false]:hover:text-primary-foreground"
									data-label={item.label}
									asChild
									isActive={pathname === item.href}
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

function Footer() {
	const pathname = useRouterState().location.pathname;
	const { state } = useSidebar();

	return (
		<SidebarFooter className="pb-4">
			<SidebarMenu>
				{footerItems.map((item) => (
					<SidebarMenuButton
						key={item.id}
						tooltip={state === "collapsed" ? item.label : undefined}
						className="transition-colors duration-150 ease-out hover:cursor-pointer data-[active=false]:bg-inherit data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[label='Logout']:text-destructive data-[active=false]:hover:bg-primary data-[label='Logout']:hover:bg-destructive data-[active=false]:hover:text-primary-foreground data-[label='Logout']:focus-within:ring-destructive"
						data-label={item.label}
						asChild
						isActive={pathname === item.href}
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
		</SidebarFooter>
	);
}
