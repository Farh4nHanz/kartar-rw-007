import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@workspace/ui/components/badge";
import {
	DataTableRowActions,
	DataTableSortableHeader,
} from "@workspace/ui/components/data-table";
import { cn } from "@workspace/ui/lib/utils";
import { useCallback, useState } from "react";
import { DeletePositionModal } from "@/features/positions/components/modals/delete-position-modal";
import type { Position } from "@/features/positions/services";

// import { EditPositionModal } from "./modals/edit-position-modal";

const columnHelper = createColumnHelper<Position>();

export const columns = [
	columnHelper.accessor("name", {
		id: "position_name",
		header: "Jabatan",
		cell: ({ renderValue }) => (
			<span className="font-semibold">{renderValue()}</span>
		),
		enableHiding: false,
	}),
	columnHelper.accessor("description", {
		id: "description",
		enableHiding: false,
		header: "Deskripsi",
	}),
	columnHelper.accessor("sort_order", {
		id: "order",
		header: ({ column }) => (
			<DataTableSortableHeader label="Urutan" column={column} />
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
			const position = info.row.original;

			/* ===================
			 * Selected position
			 * Stores the currently selected position
			 * to be used in the modals
			 * =================== */
			const [selectedPosition, setSelectedPosition] = useState<Position | null>(
				null,
			);

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

			const handleEdit = useCallback((position: Position) => {
				setSelectedPosition(position);
				setModalState((prev) => ({ ...prev, isEditModalOpen: true }));
			}, []);

			const handleDelete = useCallback((position: Position) => {
				setSelectedPosition(position);
				setModalState((prev) => ({ ...prev, isDeleteModalOpen: true }));
			}, []);

			return (
				<>
					<DataTableRowActions
						onEdit={() => handleEdit(position)}
						onDelete={() => handleDelete(position)}
					/>

					{/* Edit Modal
					<EditPositionModal
						selectedData={selectedPosition}
						isModalOpen={modalState.isEditModalOpen}
						setIsModalOpen={(open) =>
							setModalState((prev) => ({ ...prev, isEditModalOpen: open }))
						}
					/> */}

					{/* Delete Modal */}
					<DeletePositionModal
						selectedData={selectedPosition}
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
