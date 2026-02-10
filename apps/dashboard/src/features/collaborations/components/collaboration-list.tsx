import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import {
	DataTableColumnFilter,
	DataTableSearchFilter,
} from "@workspace/ui/components/data-table";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@workspace/ui/components/empty";
import { Plus, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getAllCategoriesQueryOptions } from "@/features/categories/hooks/query-options";
import { getAllCollaborationsQueryOptions } from "@/features/collaborations/hooks/query-options";
import { getAllPeriodsQueryOptions } from "@/features/periods/hooks/query-options";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { useErrorToast } from "@/shared/hooks/use-error-toast";
import {
	CollaborationCard,
	CollaborationCardSkeleton,
} from "./collaboration-card";
import { AddCollaborationModal } from "./modals/add-collaboration-modal";

export function CollaborationList() {
	const search = useSearch({
		from: "/(app)/(partnership)/kolaborasi",
	});

	const { name, category, period } = search;

	const navigate = useNavigate({
		from: "/kolaborasi",
	});

	/* ===================
	 * Categories data fetch
	 * =================== */
	const {
		data: categories,
		isLoading: isCategoriesFetchLoading,
		error: categoriesFetchError,
	} = useQuery(getAllCategoriesQueryOptions({ type: "kolaborasi" }));

	/* ===================
	 * Periods data fetch
	 * =================== */
	const {
		data: periods,
		isLoading: isPeriodsFetchLoading,
		error: periodsFetchError,
	} = useQuery(getAllPeriodsQueryOptions());

	/* ===================
	 * Collaborations data fetch
	 * =================== */
	const {
		data: collaborations,
		isLoading: isCollaborationsFetchLoading,
		error: collaborationsFetchError,
	} = useQuery(getAllCollaborationsQueryOptions(search));

	/* ===================
	 * Show an error when failed to retrieve data
	 * =================== */
	useErrorToast(
		categoriesFetchError || periodsFetchError || collaborationsFetchError,
	);

	/* ===================
	 * Selected period
	 * the return value is formatted as `${start_year}-${end_year}`
	 * example: "2020-2025"
	 * =================== */
	const selectedPeriod = useMemo(() => {
		const selected = periods?.data.find(
			(p) => `${p.start_year}-${p.end_year}` === period,
		);

		return selected ? `${selected.start_year}-${selected.end_year}` : undefined;
	}, [periods?.data, period]);

	const [isAddCollaborationModalOpen, setIsAddCollaborationModalOpen] =
		useState(false);

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

	return (
		<Card className="h-fit w-full">
			<CardHeader className="flex flex-wrap justify-between gap-10 max-md:flex-col-reverse md:items-center">
				{/* Search */}
				<DataTableSearchFilter
					id="name_search"
					name="name_search"
					placeholder="Cari mitra berdasarkan nama..."
					value={nameSearch}
					onChange={(e) => setNameSearch(e.target.value)}
				/>

				{/* Add Collaboration Button */}
				<Button
					className="max-md:self-end"
					onClick={() => setIsAddCollaborationModalOpen(true)}
				>
					<Plus /> Tambah Mitra
				</Button>

				{/* Add Collaboration Modal */}
				<AddCollaborationModal
					isModalOpen={isAddCollaborationModalOpen}
					setIsModalOpen={setIsAddCollaborationModalOpen}
					categories={categories?.data || []}
					periods={periods?.data || []}
				/>
			</CardHeader>

			<CardContent className="grid auto-rows-auto gap-5">
				{/* Filters */}
				<div className="flex items-center gap-3">
					{/* Filter by period */}
					<DataTableColumnFilter
						label="Periode"
						menuLabel="Filter berdasarkan periode"
						items={periods?.data || []}
						onItemLoading={isPeriodsFetchLoading}
						getItemLabel={(period) => `${period.start_year}-${period.end_year}`}
						getItemValue={(period) => `${period.start_year}-${period.end_year}`}
						selectedValue={selectedPeriod}
						onItemChange={(periodId, checked) => {
							const period = periods?.data.find((p) => p.id === periodId);

							navigate({
								search: (prev) => ({
									...prev,
									period: checked
										? `${period?.start_year}-${period?.end_year}`
										: undefined,
								}),
							});
						}}
						onClearFilters={() => {
							navigate({
								search: (prev) => ({
									...prev,
									period: undefined,
								}),
							});
						}}
						align="start"
						disabled={isPeriodsFetchLoading || isCollaborationsFetchLoading}
					/>

					{/* Filter by position */}
					<DataTableColumnFilter
						label="Kategori"
						menuLabel="Filter berdasarkan kategori"
						items={categories?.data || []}
						onItemLoading={isCategoriesFetchLoading}
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
						disabled={isCollaborationsFetchLoading || isCategoriesFetchLoading}
					/>
				</div>

				{isCollaborationsFetchLoading ? (
					<div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
						<CollaborationCardSkeleton />
					</div>
				) : !collaborations?.data.length ? (
					<CollaborationListEmpty />
				) : (
					<div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
						{collaborations?.data.map((collaboration) => (
							<CollaborationCard
								key={collaboration.id}
								collaboration={collaboration}
								categories={categories?.data || []}
								periods={periods?.data || []}
							/>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}

function CollaborationListEmpty() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<Users />
				</EmptyMedia>
				<EmptyTitle className="text-base">Tidak Ada Mitra</EmptyTitle>
				<EmptyDescription className="text-sm">
					Mitra tidak ditemukan atau organisasi Karang Taruna RW 07 belum
					memiliki mitra.
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
