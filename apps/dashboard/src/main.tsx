import { createRouter, RouterProvider } from "@tanstack/react-router";
import { NotFound } from "@workspace/ui/components/404";
import { RouteComponentLoader } from "@workspace/ui/components/loader";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	defaultPendingComponent: () => <RouteComponentLoader />,
	defaultNotFoundComponent: () => <NotFound />,
	context: undefined!,
	scrollRestoration: true,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app");

if (!rootElement) {
	throw new Error("Root element not found");
}

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(<RouterProvider router={router} />);
}
