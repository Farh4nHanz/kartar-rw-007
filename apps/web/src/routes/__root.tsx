/** biome-ignore-all lint/complexity/noBannedTypes: true */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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

export type RouterAppContext = {
	queryClient: QueryClient;
};

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
					"Karang Taruna, RW 07, Sekretariat, Pembinaan, Pemberdayaan, Pemuda, Organisasi, Sosial, Masyarakat, Sunter, Sunter Agung, Ancol",
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
	context: () => ({
		queryClient: new QueryClient({
			defaultOptions: {
				queries: {
					retry: 2,
					retryDelay: 1000,
					staleTime: 1000 * 60 * 60,
					refetchOnWindowFocus: false,
				},
			},
		}),
	}),
});

function RootComponent() {
	const { queryClient } = Route.useRouteContext();

	return (
		<>
			<HeadContent />
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				disableTransitionOnChange
				storageKey="vite-ui-theme"
			>
				<QueryClientProvider client={queryClient}>
					<div className="grid h-fit min-h-svh grid-rows-[auto_1fr_auto]">
						<Header />
						<Outlet />
						<Footer />
					</div>
					<ReactQueryDevtools position="right" />
				</QueryClientProvider>
				<Toaster richColors />
			</ThemeProvider>
			<TanStackRouterDevtools position="bottom-left" />
		</>
	);
}
