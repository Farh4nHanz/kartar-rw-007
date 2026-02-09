import type { Updater } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
	getCoreRowModel,
	type PaginationState,
	useReactTable,
} from "@tanstack/react-table";
import { Button } from "@workspace/ui/components/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@workspace/ui/components/card";
import {
	DataTable,
	DataTableColumnFilter,
	DataTablePagination,
	DataTableRowLimit,
	DataTableSearchFilter,
	DataTableSkeleton,
} from "@workspace/ui/components/data-table";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getAllCategoriesQueryOptions } from "@/features/categories/hooks/query-options";
import { getAllNewsQueryOptions } from "@/features/news/hooks/query-options";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { useErrorToast } from "@/shared/hooks/use-error-toast";
import { columns } from "./news-table-column";

export function NewsTable() {
	const search = useSearch({
		from: "/(app)/(publication)/berita/_index",
	});

	const { page, limit, category, status, title } = search;

	const navigate = useNavigate({
		from: "/berita",
	});

	/* ===================
	 * Category Filter
	 * =================== */
	const { data: categories, isLoading: isCategoriesFetchLoading } = useQuery(
		getAllCategoriesQueryOptions({ type: "berita" }),
	);

	/* ===================
	 * Statuses
	 * =================== */
	const statuses = [
		{
			id: "published",
			label: "published",
		},
		{
			id: "draft",
			label: "draft",
		},
	];

	/* ===================
	 * Global search (debounced)
	 * =================== */
	const globalFilter = title ?? "";
	const [titleSearch, setTitleSearch] = useState(globalFilter);

	useEffect(() => setTitleSearch(globalFilter), [globalFilter]);

	const debouncedSearch = useDebounce(titleSearch, 1000);

	// Update the url only when the debounced search changes
	useEffect(() => {
		navigate({
			search: (prev) => ({
				...prev,
				title: debouncedSearch || undefined,
				page: 1,
			}),
		});
	}, [debouncedSearch, navigate]);

	/* ===================
	 * Pagination (server-side)
	 * =================== */
	const pagination = useMemo<PaginationState>(
		() => ({
			pageIndex: (page || 1) - 1,
			pageSize: limit || 10,
		}),
		[page, limit],
	);

	const setPagination = useCallback(
		(updater: Updater<PaginationState, PaginationState>) => {
			const next =
				typeof updater === "function" ? updater(pagination) : updater;

			navigate({
				search: (prev) => ({
					...prev,
					page: 1,
					limit: next.pageSize,
				}),
			});
		},
		[pagination, navigate],
	);

	/* ===================
	 * Fetch Data with React Query
	 * =================== */
	const {
		data: newsData,
		isLoading: isNewsFetchLoading,
		error: newsDataFetchError,
	} = useQuery(getAllNewsQueryOptions(search));

	/* ===================
	 * Show toast on error
	 * =================== */
	useErrorToast(newsDataFetchError);

	/* ===================
	 * Table
	 * =================== */
	const table = useReactTable({
		data: newsData?.data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),

		state: {
			pagination,
		},

		onPaginationChange: setPagination,
		pageCount: newsData?.meta.totalPages || 0,
		manualPagination: true,
	});

	return (
		<Card className="h-fit w-full">
			<CardHeader className="flex flex-wrap justify-between gap-10 max-md:flex-col-reverse md:items-center">
				{/* Search */}
				<DataTableSearchFilter
					id="title_search"
					name="title_search"
					placeholder="Cari berita berdasarkan judul berita..."
					value={titleSearch}
					onChange={(e) => setTitleSearch(e.target.value)}
				/>

				{/* Add News Button */}
				<Button className="max-md:self-end" asChild>
					<Link to="/berita/new">
						<Plus /> Tambah Berita
					</Link>
				</Button>
			</CardHeader>

			<CardContent className="grid auto-rows-auto gap-5">
				<div className="flex items-start justify-between gap-3">
					{/* Page Limit */}
					<DataTableRowLimit
						current={limit || 10}
						onLimitChange={(newLimit) =>
							setPagination((p) => ({ ...p, pageSize: newLimit }))
						}
						disabled={!newsData?.data.length || isNewsFetchLoading}
					/>

					<div className="flex flex-wrap items-end justify-end gap-3">
						{/* Filter by Status */}
						<DataTableColumnFilter
							label="Status"
							menuLabel="Filter berdasarkan status"
							items={statuses}
							selectedValue={status || null}
							onItemChange={(statusId, checked) => {
								navigate({
									search: (prev) => ({
										...prev,
										status: checked ? statusId : undefined,
										page: 1,
									}),
								});
							}}
							onClearFilters={() => {
								navigate({
									search: (prev) => ({
										...prev,
										status: undefined,
										page: 1,
									}),
								});
							}}
							align="end"
							disabled={isNewsFetchLoading}
						/>

						{/* Category Filter */}
						<DataTableColumnFilter
							label="Kategori"
							menuLabel="Filter berdasarkan kategori"
							items={categories?.data || []}
							selectedValue={category || null}
							getItemValue={(category) => category.name.toLowerCase()}
							onItemChange={(categoryId, checked) => {
								const categoryName = categories?.data
									.find((c) => c.id === categoryId)
									?.name.toLowerCase();

								navigate({
									search: (prev) => ({
										...prev,
										category: checked ? categoryName : undefined,
										page: 1,
									}),
								});
							}}
							onClearFilters={() => {
								navigate({
									search: (prev) => ({
										...prev,
										category: undefined,
										page: 1,
									}),
								});
							}}
							align="end"
							onItemLoading={isCategoriesFetchLoading}
							disabled={isNewsFetchLoading || isCategoriesFetchLoading}
						/>
					</div>
				</div>

				{/* Table */}
				{isNewsFetchLoading ? (
					<DataTableSkeleton columnLength={4} rowLength={10} />
				) : (
					<DataTable table={table} />
				)}
			</CardContent>

			{/* Pagination */}
			<CardFooter>
				<DataTablePagination
					currentPage={pagination.pageIndex + 1}
					totalPages={newsData?.meta.totalPages || 1}
					onPageChange={(page) =>
						navigate({
							search: (prev) => ({ ...prev, page }),
						})
					}
				/>
			</CardFooter>
		</Card>
	);
}
