/** biome-ignore-all lint/suspicious/noExplicitAny: true */
import {
	type Column,
	flexRender,
	type Table as TTable,
} from "@tanstack/react-table";
import { Button } from "@workspace/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@workspace/ui/components/input-group";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@workspace/ui/components/pagination";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@workspace/ui/components/table";
import {
	Check,
	ChevronDown,
	ChevronsUpDown,
	ChevronUp,
	Copy,
	Edit,
	Eye,
	Filter,
	MoreHorizontal,
	Search,
	Trash2,
} from "lucide-react";
import { Activity } from "react";
import { ComponentLoader } from "./loader";

function DataTable<TData>({ table }: { table: TTable<TData> }) {
	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow className="bg-muted/50" key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableHead
								className="font-body font-semibold capitalize"
								key={header.id}
							>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>

			<TableBody>
				{!table.getRowModel().rows.length ? (
					<TableRow>
						<TableCell
							className="p-5 text-center text-muted-foreground text-xs italic"
							colSpan={table.getAllColumns().length}
						>
							Tidak ada data.
						</TableCell>
					</TableRow>
				) : (
					table.getRowModel().rows.map((row) => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id} className="capitalize">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}

function DataTableSkeleton({
	columnLength,
	rowLength,
}: {
	columnLength: number;
	rowLength: number;
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{Array.from({ length: columnLength }, () => (
						<TableHead key={Math.random() * 100}>
							<Skeleton className="h-6 w-20" />
						</TableHead>
					))}
				</TableRow>
			</TableHeader>

			<TableBody>
				{Array.from({ length: rowLength }, () => (
					<TableRow key={Math.random() * 100}>
						{Array.from({ length: columnLength + 1 }, () => (
							<TableCell key={Math.random() * 100}>
								<Skeleton className="h-6 w-32" />
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

function DataTablePagination({
	currentPage,
	totalPages,
	onPageChange,
}: {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}) {
	const getVisiblePages = () => {
		if (totalPages <= 3)
			return Array.from({ length: totalPages }, (_, i) => i + 1);

		let start = Math.max(1, currentPage - 1);
		let end = Math.min(totalPages, currentPage + 1);

		if (start === 1) end = 3;
		if (end === totalPages) start = totalPages - 2;

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	};

	return (
		<Pagination className="justify-end">
			<PaginationContent>
				{/* Previous button */}
				<PaginationItem>
					<PaginationPrevious
						className="cursor-pointer hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground"
						onClick={() => {
							if (currentPage > 1) onPageChange(currentPage - 1);
						}}
						aria-disabled={currentPage === 1}
					/>
				</PaginationItem>

				{/* Visible pages */}
				{getVisiblePages().map((page) => (
					<PaginationItem key={page}>
						<PaginationLink
							className="cursor-pointer border-none hover:bg-primary hover:text-primary-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground dark:data-[active=true]:bg-primary dark:hover:bg-primary dark:hover:text-primary-foreground"
							isActive={page === currentPage}
							onClick={() => onPageChange(page)}
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}

				{/* Page ellipsis */}
				{/** biome-ignore lint/style/noNonNullAssertion: true */}
				{getVisiblePages().at(-1)! < totalPages - 1 ? (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				) : null}

				{/* Last pages */}
				{!getVisiblePages().includes(totalPages) ? (
					<PaginationItem>
						<PaginationLink
							className="cursor-pointer hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground"
							onClick={() => onPageChange(totalPages)}
						>
							{totalPages}
						</PaginationLink>
					</PaginationItem>
				) : null}

				{/* Next button */}
				<PaginationItem>
					<PaginationNext
						className="cursor-pointer hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground"
						onClick={() => {
							if (currentPage < totalPages) onPageChange(currentPage + 1);
						}}
						aria-disabled={currentPage === totalPages}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}

function DataTableSortableHeader<TColumn>({
	label,
	column,
}: {
	label: string;
	column: Column<TColumn>;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="font-semibold capitalize">
					{label}
					{!column.getIsSorted() ? (
						<ChevronsUpDown />
					) : column.getIsSorted() === "asc" ? (
						<ChevronUp />
					) : (
						<ChevronDown />
					)}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				<DropdownMenuItem
					disabled={column.getIsSorted() === "asc"}
					onClick={() => column.toggleSorting(false)}
				>
					Sort asc
				</DropdownMenuItem>
				<DropdownMenuItem
					disabled={column.getIsSorted() === "desc"}
					onClick={() => column.toggleSorting(true)}
				>
					Sort desc
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					variant="destructive"
					disabled={!column.getIsSorted()}
					onClick={() => column.clearSorting()}
				>
					Clear sort
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function DataTableRowActions({
	onView,
	onEdit,
	onDelete,
	onCopy,
}: {
	onView?: () => void;
	onEdit?: () => void;
	onDelete?: () => void;
	onCopy?: () => void;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="size-8 p-0 hover:cursor-pointer hover:bg-muted/90"
				>
					<span className="sr-only">Buka Menu</span>
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Aksi</DropdownMenuLabel>
				<Activity mode={onCopy ? "visible" : "hidden"}>
					<DropdownMenuItem onClick={onCopy}>
						<Copy />
						Copy ID
					</DropdownMenuItem>
					<DropdownMenuSeparator />
				</Activity>
				{/* Copy action */}

				{/* View detail action */}
				<Activity mode={onView ? "visible" : "hidden"}>
					<DropdownMenuItem onClick={onView}>
						<Eye />
						Lihat detail
					</DropdownMenuItem>
					<DropdownMenuSeparator />
				</Activity>

				{/* Edit action */}
				<Activity mode={onEdit ? "visible" : "hidden"}>
					<DropdownMenuItem onClick={onEdit}>
						<Edit />
						Ubah
					</DropdownMenuItem>
				</Activity>

				{/* Delete action */}
				<Activity mode={onDelete ? "visible" : "hidden"}>
					<DropdownMenuItem onClick={onDelete} variant="destructive">
						<Trash2 />
						Hapus
					</DropdownMenuItem>
				</Activity>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function DataTableRowLimit({
	current,
	onLimitChange,
	disabled = false,
}: {
	current: number;
	onLimitChange: (limit: number) => void;
	disabled?: boolean;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="mr-auto text-xs">
					Limit {current} <ChevronDown />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="start">
				<DropdownMenuLabel>Jumlah baris per halaman</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{[10, 20, 30, 40, 50].map((limit) => (
					<DropdownMenuItem
						key={`${limit}-row`}
						onClick={() => onLimitChange(limit)}
						disabled={disabled}
					>
						{limit}

						{limit === current ? (
							<Check className="size-4 text-foregorund" />
						) : null}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function DataTableColumnVisibillityFilter<TData>({
	table,
}: {
	table: TTable<TData>;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="text-xs">
					Kolom <ChevronDown />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-full">
				{table
					.getAllColumns()
					.filter((column) => column.getCanHide())
					.map((column) => (
						<DropdownMenuCheckboxItem
							key={column.id}
							className="capitalize"
							checked={column.getIsVisible()}
							onCheckedChange={(value) => column.toggleVisibility(!!value)}
						>
							{column.id}
						</DropdownMenuCheckboxItem>
					))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function DataTableSearchFilter({ ...props }: React.ComponentProps<"input">) {
	return (
		<InputGroup className="max-w-sm">
			<InputGroupInput type="search" {...props} className="text-sm" />
			<InputGroupAddon>
				<Search />
			</InputGroupAddon>
		</InputGroup>
	);
}

function DataTableColumnFilter<T extends { id: string }>({
	label,
	menuLabel,
	items,
	selectedValue,
	onItemChange,
	onClearFilters,
	getItemLabel,
	getItemValue,
	multiple = false,
	align = "end",
	onItemLoading,
	disabled = false,
}: {
	label: string;
	menuLabel: string;
	items: T[];
	selectedValue: string | string[] | null | undefined;
	onItemChange: (id: string, checked: boolean) => void;
	onClearFilters: () => void;
	getItemLabel?: (item: T) => string;
	getItemValue?: (item: T) => string;
	multiple?: boolean;
	align?: "start" | "center" | "end";
	onItemLoading?: boolean;
	disabled?: boolean;
}) {
	const defaultGetItemLabel = (item: T) =>
		(item as any).label || (item as any).name || String((item as any).id);

	const defaultGetItemValue = (item: T) => (item as any).id;

	const itemLabel = getItemLabel || defaultGetItemLabel;
	const itemValue = getItemValue || defaultGetItemValue;

	const isSelected = (item: T) => {
		const value = itemValue(item);
		if (multiple) {
			return Array.isArray(selectedValue) && selectedValue.includes(value);
		}
		return selectedValue === value;
	};

	const hasSelection = multiple
		? Array.isArray(selectedValue) && selectedValue.length > 0
		: Boolean(selectedValue);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="justify-self-end text-xs">
					{label} <Filter />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-fit" align={align}>
				<DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{onItemLoading ? (
					<DropdownMenuItem disabled>
						<ComponentLoader />
					</DropdownMenuItem>
				) : !items.length ? (
					<DropdownMenuItem disabled className="text-muted-foreground text-xs">
						Tidak ada data
					</DropdownMenuItem>
				) : (
					items.map((item) => (
						<DropdownMenuCheckboxItem
							key={item.id}
							checked={isSelected(item)}
							onCheckedChange={(checked) => onItemChange(item.id, checked)}
							disabled={(!multiple && isSelected(item)) || disabled}
							className="capitalize"
						>
							{itemLabel(item)}
						</DropdownMenuCheckboxItem>
					))
				)}

				<DropdownMenuSeparator />

				<DropdownMenuItem
					variant="destructive"
					disabled={!hasSelection}
					onClick={onClearFilters}
				>
					Hapus filter
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export {
	DataTable,
	DataTablePagination,
	DataTableSortableHeader,
	DataTableRowActions,
	DataTableRowLimit,
	DataTableColumnVisibillityFilter,
	DataTableColumnFilter,
	DataTableSearchFilter,
	DataTableSkeleton,
};
