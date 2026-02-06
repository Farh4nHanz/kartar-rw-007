import { type Updater, useQuery } from "@tanstack/react-query";
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
	DataTableColumnVisibillityFilter,
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
import { columns } from "@/features/members/components/table-column";
import { getAllMemberQueryOptions } from "@/features/members/hooks/query-options";
import { useDebounce } from "@/shared/hooks/use-debounce";

export function ProductTable() {
	const search = useSearch({
		from: "/(app)/(menu)/anggota",
	});

	// const { page, limit, sort, category, name } = search;

	const navigate = useNavigate({
		from: "/anggota",
	});

	/* ===================
	 * Products
	 * =================== */
	const { data: members, isLoading: isMemberFetchLoading } = useQuery(
		getAllMemberQueryOptions(search),
	);

	/* ===================
	 * Product categories
	 * =================== */
	const { data: categories } = useQuery(getProductCategoriesQueryOptions());

	/* ===================
	 * Selected categories
	 * =================== */
	const selectedCategories = useMemo(
		() => category?.toLowerCase().split(",") ?? [],
		[],
	);

	/* ===================
	 * Sorting
	 * =================== */
	const sorting = useMemo<SortingState>(() => {
		if (!sort) return [];
		const [id, dir] = sort.split(".");
		return id ? [{ id, desc: dir === "desc" }] : [];
	}, []);

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
	 * Column visibility
	 * with local storage
	 * =================== */
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		() => {
			const saved = localStorage.getItem("product-table-columns");
			return saved ? JSON.parse(saved) : { description: false };
		},
	);

	// Store the column visibility to local storage
	// whenever it changes
	useEffect(() => {
		localStorage.setItem(
			"product-table-columns",
			JSON.stringify(columnVisibility),
		);
	}, [columnVisibility]);

	/* ===================
	 * Pagination (server-side)
	 * =================== */
	const pagination = useMemo<PaginationState>(
		() => ({
			pageIndex: page - 1,
			pageSize: limit,
		}),
		[],
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
	 * Table
	 * =================== */
	const table = useReactTable({
		data: products?.data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),

		state: {
			sorting,
			pagination,
			columnVisibility,
		},

		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		onColumnVisibilityChange: setColumnVisibility,

		pageCount: products?.meta.totalPages,
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
					placeholder="Search product by name..."
					value={nameSearch}
					onChange={(e) => setNameSearch(e.target.value)}
				/>

				{/* Add Product Button */}
				<Button className="place-self-end">
					<Plus /> Add Product
				</Button>
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

					{/* Filter by Category */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="justify-self-end">
								Category <Filter />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent className="w-fit">
							<DropdownMenuLabel>Filter by category</DropdownMenuLabel>
							<DropdownMenuSeparator />

							{categories?.data.map((category) => (
								<DropdownMenuCheckboxItem
									key={category.id}
									checked={selectedCategories.includes(
										category.name.toLowerCase(),
									)}
									onCheckedChange={(value) => {
										const next = value
											? [...selectedCategories, category.name.toLowerCase()]
											: selectedCategories.filter((s) => s !== category.name);

										navigate({
											search: (prev) => ({
												...prev,
												category: next.length
													? next.map((c) => c).join(",")
													: undefined,
												page: 1,
											}),
										});
									}}
									className="capitalize"
								>
									{category.name}
								</DropdownMenuCheckboxItem>
							))}

							<DropdownMenuSeparator />

							<DropdownMenuItem
								variant="destructive"
								className="justify-center"
								disabled={!selectedCategories.length}
								onClick={() =>
									navigate({
										search: (prev) => ({
											...prev,
											category: undefined,
											page: 1,
										}),
									})
								}
							>
								Clear filters
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Column Visibility */}
					<DataTableColumnVisibillityFilter table={table} />
				</div>

				{/* Table */}
				{isProductsLoading ? (
					<DataTableSkeleton />
				) : (
					<DataTable table={table} />
				)}
			</CardContent>

			{/* Pagination */}
			<CardFooter>
				<DataTablePagination
					currentPage={pagination.pageIndex + 1}
					totalPages={products?.meta.totalPages || 1}
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
