import { useNavigate } from "@tanstack/react-router";
import { DataTableColumnFilter } from "@workspace/ui/components/data-table";
import type { Period } from "@/features/periods/services";

export function PeriodFilter({
	periodsData,
	selectedPeriod,
	isLoading,
}: {
	periodsData: Period[];
	selectedPeriod: string;
	isLoading: boolean;
}) {
	const navigate = useNavigate({
		from: "/anggota",
	});

	return (
		<DataTableColumnFilter
			items={periodsData}
			onItemLoading={isLoading}
			label="Periode"
			menuLabel="Filter berdasarkan periode"
			getItemLabel={(period) => `${period.start_year}-${period.end_year}`}
			getItemValue={(period) => `${period.start_year}-${period.end_year}`}
			selectedValue={selectedPeriod}
			onItemChange={(periodId, checked) => {
				const period = periodsData.find((p) => p.id === periodId);

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
	);
}
