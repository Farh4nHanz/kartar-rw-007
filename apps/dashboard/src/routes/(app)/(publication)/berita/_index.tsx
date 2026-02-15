import { createFileRoute } from "@tanstack/react-router";
import { NewsTable } from "@/features/news/components/news-table";
import { getAllNewsQueryOptions } from "@/features/news/hooks/query-options";
import type { GetAllNewsParams } from "@/features/news/services";

export const Route = createFileRoute("/(app)/(publication)/berita/_index")({
	validateSearch: (search: GetAllNewsParams): GetAllNewsParams => ({
		page: search.page || 1,
		limit: search.limit || 10,
		category: search.category || undefined,
		status: search.status || undefined,
		title: search.title || undefined,
	}),
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(getAllNewsQueryOptions()),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-full min-h-dvh w-full space-y-8 overflow-x-auto px-4 pt-20 pb-6">
			<h2 className="mb-2 font-bold text-2xl">Berita & Informasi</h2>
			<p className="text-muted-foreground">
				Kelola berita dan informasi organisasi.
			</p>

			<NewsTable />
		</div>
	);
}
