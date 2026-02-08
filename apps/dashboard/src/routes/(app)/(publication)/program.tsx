import { createFileRoute } from "@tanstack/react-router";
import { ProgramTable } from "@/features/programs/components/program-table";
import type { GetAllProgramsParams } from "@/features/programs/services";

export const Route = createFileRoute("/(app)/(publication)/program")({
	validateSearch: (search: GetAllProgramsParams): GetAllProgramsParams => ({
		page: search.page || 1,
		limit: search.limit || 10,
		sort: search.sort || undefined,
		category: search.category || undefined,
		status: search.status || undefined,
		name: search.name || undefined,
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-full min-h-dvh w-full space-y-8 overflow-x-auto px-4 pt-20 pb-6">
			<h2 className="mb-2 font-bold text-2xl">Program & Kegiatan</h2>
			<p className="text-muted-foreground">
				Kelola program dan kegiatan organisasi.
			</p>

			<ProgramTable />
		</div>
	);
}
