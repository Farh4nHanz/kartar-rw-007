/** biome-ignore-all lint/complexity/noBannedTypes: true */
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@workspace/ui/components/sonner";
import { ThemeProvider } from "@workspace/ui/components/theme-provider";
import Header from "@/components/header";

import "@workspace/ui/index.css";
import "../index.css";
import Footer from "@/components/footer";

export type RouterAppContext = {};

export const Route = createRootRouteWithContext<RouterAppContext>()({
	component: RootComponent,
	head: () => ({
		meta: [
			{
				title: "Karang Taruna RW 07",
			},
			{
				name: "keywords",
				content:
					"Karang Taruna, RW 07, Pembinaan, Pemberdayaan, Pemuda, Organisasi, Sosial, Masyarakat",
			},
			{
				name: "author",
				content: "Karang Taruna RW 07",
			},
			{
				name: "description",
				content:
					"Karang Taruna RW 07 merupakan wadah pembinaan dan pemberdayaan pemuda tingkat RW yang berfokus pada pengembangan kreativitas, kepedulian sosial, dan partisipasi aktif dalam masyarakat.",
			},
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.ico",
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon-16x16.png",
			},
			{
				rel: "shortcut icon",
				href: "/favicon.ico",
			},
		],
	}),
});

function RootComponent() {
	return (
		<>
			<HeadContent />
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				disableTransitionOnChange
				storageKey="vite-ui-theme"
			>
				<div className="grid h-fit min-h-svh grid-rows-[auto_1fr_auto]">
					<Header />
					<Outlet />
					<Footer />
				</div>
				<Toaster richColors />
			</ThemeProvider>
			<TanStackRouterDevtools position="bottom-left" />
		</>
	);
}
