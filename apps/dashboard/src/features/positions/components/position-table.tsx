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
	DataTableColumnFilter,
	DataTablePagination,
	DataTableRowLimit,
	DataTableSkeleton,
} from "@workspace/ui/components/data-table";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { getAllPositionsQueryOptions } from "@/features/positions/hooks/query-options";
import { useErrorToast } from "@/shared/hooks/use-error-toast";
import { AddPositionModal } from "./modals/add-position-modal";
import { columns } from "./position-table-column";

export function PositionTable() {
	const search = useSearch({
		from: "/(app)/(organization)/jabatan",
	});

	const { page, limit, sort, status } = search;

	const navigate = useNavigate({
		from: "/jabatan",
	});

	const [isAddPositionModalOpen, setIsAddPositionModalOpen] = useState(false);

	const statuses = [
		{
			id: "active",
			label: "aktif",
		},
		{
			id: "inactive",
			label: "tidak aktif",
		},
	];

	/* ===================
	 * Status Filter
	 * =================== */
	const selectedStatus = status || null;

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
		data: positionsData,
		isLoading: isPositionsFetchLoading,
		error: positionsDataFetchError,
	} = useQuery(
		getAllPositionsQueryOptions({
			page: page || 1,
			limit: limit || 10,
			sort: sort || undefined,
			status: status || undefined,
		}),
	);

	/* ===================
	 * Show toast on error
	 * =================== */
	useErrorToast(positionsDataFetchError);

	/* ===================
	 * Table
	 * =================== */
	const table = useReactTable({
		data: positionsData?.data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),

		state: {
			sorting,
			pagination,
		},

		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		pageCount: positionsData?.meta.totalPages || 0,
		manualSorting: true,
		manualPagination: true,
	});

	return (
		<Card className="h-fit w-full">
			<CardHeader className="flex flex-row flex-wrap items-end justify-start gap-10 max-md:flex-col-reverse md:justify-between">
				<div className="flex items-center gap-3 max-md:self-start">
					{/* Page Limit */}
					<DataTableRowLimit
						current={limit || 10}
						onLimitChange={(newLimit) =>
							setPagination((p) => ({ ...p, pageSize: newLimit }))
						}
						disabled={!positionsData?.data.length || isPositionsFetchLoading}
					/>

					{/* Filter by Status */}
					<DataTableColumnFilter
						label="Status"
						menuLabel="Filter berdasarkan status"
						items={statuses}
						selectedValue={selectedStatus}
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
						align="center"
						disabled={isPositionsFetchLoading}
					/>
				</div>

				{/* Add Position Button */}
				<Button
					className="w-fit"
					onClick={() => setIsAddPositionModalOpen(true)}
				>
					<Plus /> Tambah Jabatan
				</Button>

				{/* Add Position Modal */}
				<AddPositionModal
					isModalOpen={isAddPositionModalOpen}
					setIsModalOpen={setIsAddPositionModalOpen}
				/>
			</CardHeader>

			<CardContent className="grid auto-rows-auto gap-5">
				{/* Table */}
				{isPositionsFetchLoading ? (
					<DataTableSkeleton columnLength={4} rowLength={10} />
				) : (
					<DataTable table={table} />
				)}
			</CardContent>

			{/* Pagination */}
			<CardFooter>
				<DataTablePagination
					currentPage={pagination.pageIndex + 1}
					totalPages={positionsData?.meta.totalPages || 1}
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
