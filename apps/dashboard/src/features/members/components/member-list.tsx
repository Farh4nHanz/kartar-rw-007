import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { DataTableSearchFilter } from "@workspace/ui/components/data-table";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@workspace/ui/components/empty";
import { Plus, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getAllMembersQueryOptions } from "@/features/members/hooks/query-options";
import { getAllPeriodsQueryOptions } from "@/features/periods/hooks/query-options";
import { getAllPositionsQueryOptions } from "@/features/positions/hooks/query-options";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { useErrorToast } from "@/shared/hooks/use-error-toast";
import { MemberCard, MemberCardSkeleton } from "./member-card";
import { AddMemberModal } from "./modals/add-member-modal";
import { PeriodFilter } from "./period-filter";
import { PositionFilter } from "./position-filter";

export function MemberList() {
	const search = useSearch({
		from: "/(app)/(organization)/anggota",
	});

	const { name, period, position } = search;

	const navigate = useNavigate({
		from: "/anggota",
	});

	/* ===================
	 * Periods data fetch
	 * =================== */
	const {
		data: periodsData,
		isLoading: isPeriodsFetchLoading,
		error: periodsDataFetchError,
	} = useQuery(getAllPeriodsQueryOptions());

	/* ===================
	 * Positions data fetch
	 * =================== */
	const {
		data: positionsData,
		isLoading: isPositionsFetchLoading,
		error: positionsDataFetchError,
	} = useQuery(getAllPositionsQueryOptions());

	/* ===================
	 * Members data fetch
	 * =================== */
	const {
		data: membersData,
		isLoading: isMembersFetchLoading,
		error: membersDataFetchError,
	} = useQuery(getAllMembersQueryOptions(search));

	/* ===================
	 * Show an error when failed to retrieve data
	 * =================== */
	useErrorToast(
		periodsDataFetchError || positionsDataFetchError || membersDataFetchError,
	);

	/* ===================
	 * Selected period
	 * the return value is formatted as `${start_year}-${end_year}`
	 * example: "2020-2025"
	 * =================== */
	const selectedPeriod = useMemo(() => {
		const selected = periodsData?.data.find(
			(p) => `${p.start_year}-${p.end_year}` === period,
		);

		return selected ? `${selected.start_year}-${selected.end_year}` : undefined;
	}, [periodsData?.data, period]);

	/* ===================
	 * Selected position
	 * the return value is the position name
	 * =================== */
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
					<PeriodFilter
						isLoading={isPeriodsFetchLoading}
						periodsData={periodsData?.data || []}
						selectedPeriod={selectedPeriod as string}
					/>

					{/* Filter by position */}
					<PositionFilter
						isLoading={isPositionsFetchLoading}
						positionsData={positionsData?.data || []}
						selectedPosition={selectedPosition as string}
					/>
				</div>

				{isMembersFetchLoading ? (
					<div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
						<MemberCardSkeleton />
					</div>
				) : !membersData?.data.length ? (
					<MemberListEmpty />
				) : (
					<div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
						{membersData?.data.map((member) => (
							<MemberCard
								key={member.id}
								member={member}
								positions={positionsData?.data || []}
								periods={periodsData?.data || []}
							/>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}

function MemberListEmpty() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<Users />
				</EmptyMedia>
				<EmptyTitle className="text-base">Tidak Ada Anggota</EmptyTitle>
				<EmptyDescription className="text-sm">
					Anggota tidak ditemukan atau organisasi Karang Taruna RW 07 belum
					memiliki anggota.
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
