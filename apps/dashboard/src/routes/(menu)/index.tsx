import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(menu)/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-full min-h-vh w-full space-y-8 overflow-x-auto p-3 pt-16">
			Dashboard Admin
		</div>
	);
}
