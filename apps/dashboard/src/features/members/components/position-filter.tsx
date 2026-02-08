import { useNavigate } from "@tanstack/react-router";
import { DataTableColumnFilter } from "@workspace/ui/components/data-table";
import type { Position } from "@/features/positions/services";

export function PositionFilter({
	positionsData,
	selectedPosition,
	isLoading,
}: {
	positionsData: Position[];
	selectedPosition: string;
	isLoading: boolean;
}) {
	const navigate = useNavigate({
		from: "/anggota",
	});

	return (
		<DataTableColumnFilter
			items={positionsData}
			onItemLoading={isLoading}
			label="Jabatan"
			menuLabel="Filter berdasarkan jabatan"
			getItemLabel={(position) => position.name.toLowerCase()}
			getItemValue={(position) => position.name.toLowerCase()}
			selectedValue={selectedPosition}
			onItemChange={(positionId, checked) => {
				const positionName = positionsData
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
	);
}
