import type { Updater } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
	getCoreRowModel,
	type PaginationState,
	type SortingState,
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
	DataTablePagination,
	DataTableRowLimit,
	DataTableSkeleton,
} from "@workspace/ui/components/data-table";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { getAllCategoriesQueryOptions } from "@/features/categories/hooks/query-options";
import { useErrorToast } from "@/shared/hooks/use-error-toast";
import { columns } from "./category-table-column";
import { AddCategoryModal } from "./modals/add-category-modal";

export function CategoryTable() {
	const search = useSearch({
		from: "/(app)/(publication)/kategori",
	});

	const { page, limit, sort } = search;

	const navigate = useNavigate({
		from: "/kategori",
	});

	const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

	/* ===================
	 * Sorting
	 * =================== */
	const sorting = useMemo<SortingState>(() => {
		if (!sort) return [];
		const [id, dir] = sort.split(".");
		return id ? [{ id, desc: dir === "desc" }] : [];
	}, [sort]);

	const setSorting = useCallback(
		(updater: Updater<SortingState, SortingState>) => {
			const next = typeof updater === "function" ? updater(sorting) : updater;

			navigate({
				search: (prev) => ({
					...prev,
					sort: next.length
						? `${next[0].id}.${next[0].desc ? "desc" : "asc"}`
						: undefined,
					page: 1,
				}),
			});
		},
		[navigate, sorting],
	);

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
		data: categoriesData,
		isLoading: isCategoriesFetchLoading,
		error: categoriesDataFetchError,
	} = useQuery(
		getAllCategoriesQueryOptions({
			page: page || 1,
			limit: limit || 10,
			sort: sort || undefined,
		}),
	);

	/* ===================
	 * Show toast on error
	 * =================== */
	useErrorToast(categoriesDataFetchError);

	/* ===================
	 * Table
	 * =================== */
	const table = useReactTable({
		data: categoriesData?.data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),

		state: {
			sorting,
			pagination,
		},

		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		pageCount: categoriesData?.meta.totalPages || 0,
		manualSorting: true,
		manualPagination: true,
	});

	return (
		<Card className="h-fit w-full">
			<CardHeader className="grid-cols-[auto_auto] justify-between gap-10">
				{/* Page Limit */}
				<DataTableRowLimit
					current={limit || 10}
					onLimitChange={(newLimit) =>
						setPagination((p) => ({ ...p, pageSize: newLimit }))
					}
					disabled={!categoriesData?.data.length || isCategoriesFetchLoading}
				/>

				{/* Add Category Button */}
				<Button
					className="place-self-end"
					onClick={() => setIsAddCategoryModalOpen(true)}
				>
					<Plus /> Tambah Kategori
				</Button>

				{/* Add Category Modal */}
				<AddCategoryModal
					isModalOpen={isAddCategoryModalOpen}
					setIsModalOpen={setIsAddCategoryModalOpen}
				/>
			</CardHeader>

			<CardContent className="grid auto-rows-auto gap-5">
				{/* Table */}
				{isCategoriesFetchLoading ? (
					<DataTableSkeleton columnLength={2} rowLength={10} />
				) : (
					<DataTable table={table} />
				)}
			</CardContent>

			{/* Pagination */}
			<CardFooter>
				<DataTablePagination
					currentPage={pagination.pageIndex + 1}
					totalPages={categoriesData?.meta.totalPages || 1}
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
