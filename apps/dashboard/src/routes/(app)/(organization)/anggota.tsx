import { createFileRoute } from "@tanstack/react-router";
import type { GetAllMembersParams } from "@/features/members/services";

export const Route = createFileRoute("/(app)/(organization)/anggota")({
	validateSearch: (search: GetAllMembersParams): GetAllMembersParams => ({
		page: search.page || 1,
		limit: search.limit || 10,
		sort: search.sort || undefined,
		name: search.name || undefined,
		period: search.period || undefined,
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-full min-h-dvh w-full space-y-8 overflow-x-auto px-4 pt-20 pb-6">
			<h2 className="mb-2 font-bold text-2xl">Struktur Organisasi</h2>
			<p className="text-muted-foreground">
				Kelola anggota dan jabatan yang ada di dalam organisasi.
			</p>
		</div>
	);
}
