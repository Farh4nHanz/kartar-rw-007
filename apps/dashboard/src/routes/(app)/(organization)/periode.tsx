import { createFileRoute } from "@tanstack/react-router";
import PeriodTable from "@/features/periods/components/period-table";

type PeriodQueryParams = {
	page: number;
	limit: number;
	sort?: string;
	status?: string;
	name?: string;
};

export const Route = createFileRoute("/(app)/(organization)/periode")({
	validateSearch: (search: PeriodQueryParams): PeriodQueryParams => ({
		page: search.page || 1,
		limit: search.limit || 10,
		sort: search.sort || undefined,
		status: search.status || undefined,
		name: search.name || undefined,
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-full min-h-dvh w-full space-y-8 overflow-x-auto px-4 pt-20 pb-6">
			<h2 className="mb-2 font-bold text-2xl">Periode Kepengurusan</h2>
			<p className="text-muted-foreground">
				Kelola periode kepengurusan dalam organisasi Karang Taruna RW 07.
			</p>

			<PeriodTable />
		</div>
	);
}
