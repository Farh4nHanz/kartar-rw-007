import { createFileRoute } from "@tanstack/react-router";
import { getAllCategoriesQueryOptions } from "@/features/categories/hooks/query-options";
import { CollaborationList } from "@/features/collaborations/components/collaboration-list";
import { getAllCollaborationsQueryOptions } from "@/features/collaborations/hooks/query-options";
import type { GetAllCollaborationsParams } from "@/features/collaborations/services";
import { getAllPeriodsQueryOptions } from "@/features/periods/hooks/query-options";

export const Route = createFileRoute("/(app)/(partnership)/kolaborasi")({
	validateSearch: (
		search: GetAllCollaborationsParams,
	): GetAllCollaborationsParams => ({
		name: search.name || undefined,
		category: search.category || undefined,
		period: search.period || undefined,
	}),
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(getAllCategoriesQueryOptions());
		queryClient.ensureQueryData(getAllPeriodsQueryOptions());
		queryClient.ensureQueryData(getAllCollaborationsQueryOptions());
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-full min-h-dvh w-full space-y-8 overflow-x-auto px-4 pt-20 pb-6">
			<h2 className="mb-2 font-bold text-2xl">Kolaborasi</h2>
			<p className="text-muted-foreground">
				Kelola mitra dan kolaborasi organisasi
			</p>

			<CollaborationList />
		</div>
	);
}
