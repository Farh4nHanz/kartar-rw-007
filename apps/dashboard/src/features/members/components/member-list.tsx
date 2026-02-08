import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import {
	DataTableColumnFilter,
	DataTableSearchFilter,
} from "@workspace/ui/components/data-table";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getAllPeriodsQueryOptions } from "@/features/periods/hooks/query-options";
import { getAllPositionsQueryOptions } from "@/features/positions/hooks/query-options";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { AddMemberModal } from "./modals/add-member-modal";

export function MemberList() {
	const { name, period, position } = useSearch({
		from: "/(app)/(organization)/anggota",
	});

	const navigate = useNavigate({
		from: "/anggota",
	});

	const { data: periodsData, isLoading: isPeriodsDataFetchLoading } = useQuery(
		getAllPeriodsQueryOptions(),
	);

	const { data: positionsData, isLoading: isPositionsDataFetchLoading } =
		useQuery(getAllPositionsQueryOptions());

	const selectedPeriod = useMemo(() => {
		const selected = periodsData?.data.find(
			(p) => `${p.start_year}-${p.end_year}` === period,
		);

		return `${selected?.start_year}-${selected?.end_year}`;
	}, [periodsData?.data, period]);

	const selectedPosition = useMemo(
		() =>
			positionsData?.data
				.find((p) => p.name.toLowerCase() === position)
				?.name.toLowerCase(),
		[positionsData?.data, position],
	);

	const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

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
			<CardHeader className="grid-cols-[auto_auto] gap-10">
				{/* Search */}
				<DataTableSearchFilter
					id="name_search"
					name="name_search"
					placeholder="Cari anggota berdasarkan nama..."
					value={nameSearch}
					onChange={(e) => setNameSearch(e.target.value)}
				/>

				{/* Add Member Button */}
				<Button
					className="place-self-end"
					onClick={() => setIsAddMemberModalOpen(true)}
				>
					<Plus /> Tambah Anggota
				</Button>

				{/* Add Member Modal */}
				<AddMemberModal
					isModalOpen={isAddMemberModalOpen}
					setIsModalOpen={setIsAddMemberModalOpen}
					positionsData={positionsData?.data || []}
					periodsData={periodsData?.data || []}
				/>
			</CardHeader>

			<CardContent className="grid auto-rows-auto gap-5">
				{/* Filters */}
				<div className="flex items-center gap-3">
					{/* Filter by period */}
					<DataTableColumnFilter
						items={periodsData?.data || []}
						onItemLoading={isPeriodsDataFetchLoading}
						label="Periode"
						menuLabel="Filter berdasarkan periode"
						getItemLabel={(period) => `${period.start_year}-${period.end_year}`}
						getItemValue={(period) => `${period.start_year}-${period.end_year}`}
						selectedValue={selectedPeriod}
						onItemChange={(periodId, checked) => {
							const period = periodsData?.data.find((p) => p.id === periodId);

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
					/>

					{/* Filter by position */}
					<DataTableColumnFilter
						items={positionsData?.data || []}
						onItemLoading={isPositionsDataFetchLoading}
						label="Jabatan"
						menuLabel="Filter berdasarkan jabatan"
						getItemLabel={(position) => position.name.toLowerCase()}
						getItemValue={(position) => position.name.toLowerCase()}
						selectedValue={selectedPosition}
						onItemChange={(positionId, checked) => {
							const positionName = positionsData?.data
								.find((p) => p.id === positionId)
								?.name.toLowerCase();

							navigate({
								search: (prev) => ({
									...prev,
									position: checked ? positionName : undefined,
								}),
							});
						}}
						onClearFilters={() => {
							navigate({
								search: (prev) => ({
									...prev,
									position: undefined,
								}),
							});
						}}
						align="start"
					/>
				</div>
			</CardContent>
		</Card>
	);
}
