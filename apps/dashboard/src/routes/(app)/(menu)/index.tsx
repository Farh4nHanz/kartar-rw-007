import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/(menu)/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-full min-h-vh w-full space-y-8 overflow-x-auto p-3 pt-20">
			Dashboard Admin
		</div>
	);
}
