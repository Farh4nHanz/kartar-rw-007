import { createFileRoute } from "@tanstack/react-router";
import { CategoryTable } from "@/features/categories/components/category-table";
import type { GetAllCategoriesParams } from "@/features/categories/services";

export const Route = createFileRoute("/(app)/(publication)/kategori")({
	validateSearch: (search: GetAllCategoriesParams): GetAllCategoriesParams => ({
		page: search.page || 1,
		limit: search.limit || 10,
		sort: search.sort || undefined,
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-full min-h-dvh w-full space-y-8 overflow-x-auto px-4 pt-20 pb-6">
			<h2 className="mb-2 font-bold text-2xl">Kategori Konten</h2>
			<p className="text-muted-foreground">
				Kelola kategori untuk berbagai tipe konten.
			</p>

			<CategoryTable />
		</div>
	);
}
