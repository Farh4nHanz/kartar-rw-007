import type { Updater } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
	getCoreRowModel,
	type PaginationState,
	type SortingState,
	useReactTable,
	type VisibilityState,
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
	DataTableColumnVisibillityFilter,
	DataTablePagination,
	DataTableRowLimit,
	DataTableSearchFilter,
	DataTableSkeleton,
} from "@workspace/ui/components/data-table";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getAllCategoriesQueryOptions } from "@/features/categories/hooks/query-options";
import { getAllProgramsQueryOptions } from "@/features/programs/hooks/query-options";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { useErrorToast } from "@/shared/hooks/use-error-toast";
import { AddProgramModal } from "./modals/add-program-modal";
import { getProgramTableColumns } from "./program-table-column";

export function ProgramTable() {
	const search = useSearch({
		from: "/(app)/(publication)/program",
	});

	const { page, limit, sort, category, status, name } = search;

	const navigate = useNavigate({
		from: "/program",
	});

	const [isAddProgramModalOpen, setIsAddProgramModalOpen] = useState(false);

	/* ===================
	 * Category Filter
	 * =================== */
	const { data: categories, isLoading: isCategoriesFetchLoading } = useQuery(
		getAllCategoriesQueryOptions(),
	);

	/* ===================
	 * Statuses
	 * =================== */
	const statuses = [
		{
			id: "rutin",
			label: "rutin",
		},
		{
			id: "insidental",
			label: "insidental",
		},
	];

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
		data: programsData,
		isLoading: isProgramsFetchLoading,
		error: programsDataFetchError,
	} = useQuery(getAllProgramsQueryOptions(search));

	/* ===================
	 * Show toast on error
	 * =================== */
	useErrorToast(programsDataFetchError);

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
			}),
		});
	}, [debouncedSearch, navigate]);

	/* ===================
	 * Column visibility
	 * with local storage
	 * =================== */
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		() => {
			const saved = localStorage.getItem("program-table-columns");
			return saved ? JSON.parse(saved) : { deskripsi: false };
		},
	);

	// Store the column visibility to local storage
	// whenever it changes
	useEffect(() => {
		localStorage.setItem(
			"program-table-columns",
			JSON.stringify(columnVisibility),
		);
	}, [columnVisibility]);

	/* ===================
	 * Table
	 * =================== */

	const table = useReactTable({
		data: programsData?.data || [],
		columns: getProgramTableColumns(categories?.data || []),
		getCoreRowModel: getCoreRowModel(),

		state: {
			sorting,
			pagination,
			columnVisibility,
		},

		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		onColumnVisibilityChange: setColumnVisibility,

		pageCount: programsData?.meta.totalPages || 0,
		manualSorting: true,
		manualPagination: true,
	});

	return (
		<Card className="h-fit w-full">
			<CardHeader className="grid-cols-[1fr_auto] justify-between gap-10">
				{/* Search filter */}
				<DataTableSearchFilter
					id="name_search"
					name="name_search"
					placeholder="Cari program berdasarkan nama..."
					value={nameSearch}
					onChange={(e) => setNameSearch(e.target.value)}
				/>

				{/* Add Program Button */}
				<Button
					className="place-self-end"
					onClick={() => setIsAddProgramModalOpen(true)}
				>
					<Plus /> Tambah Program
				</Button>

				{/* Add Program Modal */}
				<AddProgramModal
					categories={categories?.data || []}
					isModalOpen={isAddProgramModalOpen}
					setIsModalOpen={setIsAddProgramModalOpen}
				/>
			</CardHeader>

			<CardContent className="grid auto-rows-auto gap-5">
				<div className="flex items-center justify-between gap-3">
					<div className="flex items-center gap-3">
						{/* Page Limit */}
						<DataTableRowLimit
							current={limit || 10}
							onLimitChange={(newLimit) =>
								setPagination((p) => ({ ...p, pageSize: newLimit }))
							}
							disabled={!programsData?.data.length || isProgramsFetchLoading}
						/>

						{/* Column Visibility */}
						<DataTableColumnVisibillityFilter table={table} />
					</div>

					<div className="flex items-center gap-3">
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
							disabled={isProgramsFetchLoading}
						/>

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
							disabled={isProgramsFetchLoading || isCategoriesFetchLoading}
						/>
					</div>
				</div>

				{/* Table */}
				{isProgramsFetchLoading ? (
					<DataTableSkeleton columnLength={6} rowLength={10} />
				) : (
					<DataTable table={table} />
				)}
			</CardContent>

			{/* Pagination */}
			<CardFooter>
				<DataTablePagination
					currentPage={pagination.pageIndex + 1}
					totalPages={programsData?.meta.totalPages || 1}
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
