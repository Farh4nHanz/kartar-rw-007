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
	DataTableSearchFilter,
	DataTableSkeleton,
} from "@workspace/ui/components/data-table";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Filter, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getAllPeriodsQueryOptions } from "@/features/periods/hooks/query-options";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { AddPeriodModal } from "./modals/add-period-modal";
import { columns } from "./period-table-column";

export default function PeriodTable() {
	const search = useSearch({
		from: "/(app)/(organization)/periode",
	});

	const { page, limit, sort, status, name } = search;

	const navigate = useNavigate({
		from: "/periode",
	});

	const [isAddPeriodModalOpen, setIsAddPeriodModalOpen] = useState(false);

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
	 * Global search (debounced)
	 * =================== */
	const globalFilter = name ?? "";
	const [nameSearch, setNameSearch] = useState(globalFilter);

	useEffect(() => setNameSearch(globalFilter), [globalFilter]);

	const debouncedSearch = useDebounce(nameSearch, 1000);

	// Update the url only when the debounced search changes
	useEffect(() => {
		navigate({
			search: (prev) => ({
				...prev,
				name: debouncedSearch || undefined,
				page: 1,
			}),
		});
	}, [debouncedSearch, navigate]);

	/* ===================
	 * Pagination (server-side)
	 * =================== */
	const pagination = useMemo<PaginationState>(
		() => ({
			pageIndex: page - 1,
			pageSize: limit,
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
		data: periodsResponse,
		isLoading: isPeriodsFetchLoading,
		isError: isPeriodsFetchError,
		error: periodsResponseError,
	} = useQuery(
		getAllPeriodsQueryOptions({
			page: page || 1,
			limit: limit || 10,
			sort: sort || undefined,
			name: debouncedSearch || undefined,
			status: status || undefined,
		}),
	);

	/* ===================
	 * Show toast on error
	 * =================== */
	useEffect(() => {
		if (isPeriodsFetchError) {
			toast.error(periodsResponseError.message, {
				duration: 5000,
				closeButton: true,
				dismissible: true,
			});
		}
	}, [isPeriodsFetchError, periodsResponseError]);

	/* ===================
	 * Table
	 * =================== */
	const table = useReactTable({
		data: periodsResponse?.data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),

		state: {
			sorting,
			pagination,
		},

		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		pageCount: periodsResponse?.meta.totalPages || 0,
		manualSorting: true,
		manualPagination: true,
	});

	return (
		<Card className="h-fit w-full">
			<CardHeader className="grid-cols-[auto_auto] gap-10">
				{/* Search */}
				<DataTableSearchFilter
					id="name_search"
					name="name_search"
					placeholder="Cari periode berdasarkan nama..."
					value={nameSearch}
					onChange={(e) => setNameSearch(e.target.value)}
				/>

				{/* Add Period Button */}
				<Button
					className="place-self-end"
					onClick={() => setIsAddPeriodModalOpen(true)}
				>
					<Plus /> Tambah periode
				</Button>

				{/* Add Period Modal */}
				<AddPeriodModal
					isModalOpen={isAddPeriodModalOpen}
					setIsModalOpen={setIsAddPeriodModalOpen}
				/>
			</CardHeader>

			<CardContent className="grid auto-rows-auto gap-5">
				<div className="flex items-center gap-3">
					{/* Page Limit */}
					<DataTableRowLimit
						current={limit}
						onLimitChange={(newLimit) =>
							setPagination((p) => ({ ...p, pageSize: newLimit }))
						}
					/>

					{/* Filter by Status */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="justify-self-end text-xs">
								Status <Filter />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent className="w-fit" align="end">
							<DropdownMenuLabel>Filter berdasarkan status</DropdownMenuLabel>
							<DropdownMenuSeparator />

							{statuses.map((statusItem) => (
								<DropdownMenuCheckboxItem
									key={statusItem.id}
									checked={selectedStatus === statusItem.id}
									onCheckedChange={(value) => {
										navigate({
											search: (prev) => ({
												...prev,
												status: value ? statusItem.id : undefined,
												page: 1,
											}),
										});
									}}
									className="capitalize"
								>
									{statusItem.label}
								</DropdownMenuCheckboxItem>
							))}

							<DropdownMenuSeparator />

							<DropdownMenuItem
								variant="destructive"
								disabled={!selectedStatus}
								onClick={() =>
									navigate({
										search: (prev) => ({
											...prev,
											status: undefined,
											page: 1,
										}),
									})
								}
							>
								Hapus filter
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Table */}
				{isPeriodsFetchLoading ? (
					<DataTableSkeleton columnLength={4} rowLength={10} />
				) : (
					<DataTable table={table} />
				)}
			</CardContent>

			{/* Pagination */}
			<CardFooter>
				<DataTablePagination
					currentPage={pagination.pageIndex + 1}
					totalPages={periodsResponse?.meta.totalPages || 1}
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
