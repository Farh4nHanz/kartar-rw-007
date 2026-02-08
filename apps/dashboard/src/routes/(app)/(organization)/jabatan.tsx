import { createFileRoute } from "@tanstack/react-router";
import { PositionTable } from "@/features/positions/components/position-table";
import type { GetAllPositionsParams } from "@/features/positions/services";

export const Route = createFileRoute("/(app)/(organization)/jabatan")({
	validateSearch: (search: GetAllPositionsParams): GetAllPositionsParams => ({
		page: search.page || undefined,
		limit: search.limit || undefined,
		sort: search.sort || undefined,
		status: search.status || undefined,
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-full min-h-dvh w-full space-y-8 overflow-x-auto px-4 pt-20 pb-6">
			<h2 className="mb-2 font-bold text-2xl">Jabatan Organisasi</h2>
			<p className="text-muted-foreground">
				Kelola struktur jabatan setiap periode
			</p>

			<PositionTable />
		</div>
	);
}
