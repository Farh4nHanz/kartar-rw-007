import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@workspace/ui/components/badge";
import {
	DataTableRowActions,
	DataTableSortableHeader,
} from "@workspace/ui/components/data-table";
import { cn } from "@workspace/ui/lib/utils";
import { useCallback, useState } from "react";
import { DeletePeriodModal } from "@/features/periods/components/modals/delete-period-modal";
import { EditPeriodModal } from "@/features/periods/components/modals/edit-period-modal";
import type { Period } from "@/features/periods/services";

const columnHelper = createColumnHelper<Period>();

export const columns = [
	columnHelper.accessor("name", {
		id: "period_name",
		header: "Periode",
		enableHiding: false,
	}),
	columnHelper.accessor("start_year", {
		id: "start_year",
		enableHiding: false,
		header: ({ column }) => (
			<DataTableSortableHeader label="tahun mulai" column={column} />
		),
	}),
	columnHelper.accessor("end_year", {
		id: "end_year",
		header: ({ column }) => (
			<DataTableSortableHeader label="tahun selesai" column={column} />
		),
	}),
	columnHelper.accessor("is_active", {
		id: "is_active",
		header: "Status",
		cell: ({ getValue }) => {
			const value = getValue() === true ? "Aktif" : "Tidak Aktif";
			const color =
				getValue() === true
					? "bg-green-500 dark:bg-green-300"
					: "bg-gray-500 dark:bg-gray-300";

			return (
				<Badge className={cn("text-[calc(var(--text-xs)-1px)]", color)}>
					{value}
				</Badge>
			);
		},
	}),
	columnHelper.display({
		id: "actions",
		enableHiding: false,
		cell: (info) => {
			const period = info.row.original;

			/* ===================
			 * Selected period
			 * Stores the currently selected period
			 * to be used in the modals
			 * =================== */
			const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);

			/* ===================
			 * Modal states
			 * =================== */
			const [modalState, setModalState] = useState({
				isEditModalOpen: false,
				isDeleteModalOpen: false,
			});

			/* ===================
			 * Modal handlers
			 * =================== */

			const handleEdit = useCallback((period: Period) => {
				setSelectedPeriod(period);
				setModalState((prev) => ({ ...prev, isEditModalOpen: true }));
			}, []);

			const handleDelete = useCallback((period: Period) => {
				setSelectedPeriod(period);
				setModalState((prev) => ({ ...prev, isDeleteModalOpen: true }));
			}, []);

			return (
				<>
					<DataTableRowActions
						onEdit={() => handleEdit(period)}
						onDelete={() => handleDelete(period)}
					/>

					{/* Edit Modal */}
					<EditPeriodModal
						selectedData={selectedPeriod}
						isModalOpen={modalState.isEditModalOpen}
						setIsModalOpen={(open) =>
							setModalState((prev) => ({ ...prev, isEditModalOpen: open }))
						}
					/>

					{/* Delete Modal */}
					<DeletePeriodModal
						selectedData={selectedPeriod}
						isModalOpen={modalState.isDeleteModalOpen}
						setIsModalOpen={(open) =>
							setModalState((prev) => ({ ...prev, isDeleteModalOpen: open }))
						}
					/>
				</>
			);
		},
	}),
];
