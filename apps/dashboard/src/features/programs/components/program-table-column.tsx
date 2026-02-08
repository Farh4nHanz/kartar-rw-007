import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@workspace/ui/components/badge";
import {
	DataTableRowActions,
	DataTableSortableHeader,
} from "@workspace/ui/components/data-table";
import { cn } from "@workspace/ui/lib/utils";
import { useCallback, useState } from "react";
import { DeleteProgramModal } from "@/features/programs/components/modals/delete-program-modal";
import { EditProgramModal } from "@/features/programs/components/modals/edit-program-modal";
import type { Program } from "@/features/programs/services";

const columnHelper = createColumnHelper<Program>();

export const columns = [
	columnHelper.accessor("title", {
		id: "nama",
		header: ({ column }) => (
			<DataTableSortableHeader label="Nama Program" column={column} />
		),
		enableHiding: false,
	}),
	columnHelper.accessor("description", {
		id: "deskripsi",
		header: "Deskripsi",
	}),
	columnHelper.accessor("category.name", {
		id: "kategori",
		header: "Kategori",
		cell: ({ renderValue }) => {
			return (
				<Badge className="bg-gray-200 text-[calc(var(--text-xs)-1px)] text-gray-800 dark:bg-gray-500 dark:text-gray-50">
					{renderValue()}
				</Badge>
			);
		},
		enableHiding: false,
	}),
	columnHelper.accessor("schedule_type", {
		id: "jadwal",
		header: "Jadwal",
	}),
	columnHelper.accessor("status", {
		id: "status",
		header: "Status",
		cell: ({ renderValue }) => {
			const getColorType = (type: string) => {
				switch (type.toLowerCase()) {
					case "rutin":
						return "bg-violet-200 dark:bg-violet-500 text-violet-800 dark:text-violet-50";
					case "insidental":
						return "bg-fuchsia-200 dark:bg-fuchsia-500 text-fuchsia-800 dark:text-fuchsia-50";
					default:
						return "bg-gray-200 dark:bg-gray-500 text-gray-700 dark:text-gray-50";
				}
			};

			return (
				<Badge
					className={cn(
						"text-[calc(var(--text-xs)-1px)]",
						getColorType((renderValue() as string).toLowerCase()),
					)}
				>
					{renderValue()}
				</Badge>
			);
		},
	}),
	columnHelper.accessor("is_active", {
		id: "aktif",
		header: "Aktif",
		cell: ({ getValue }) => {
			const value = getValue() === true ? "Aktif" : "Tidak Aktif";
			const color =
				getValue() === true
					? "bg-green-200 dark:bg-green-500 text-green-700 dark:text-green-50"
					: "bg-gray-200 dark:bg-gray-500 text-gray-700 dark:text-gray-50";

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
			const program = info.row.original;

			/* ===================
			 * Selected program
			 * Stores the currently selected program
			 * to be used in the modals
			 * =================== */
			const [selectedProgram, setSelectedProgram] = useState<Program | null>(
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

			const handleEdit = useCallback((program: Program) => {
				setSelectedProgram(program);
				setModalState((prev) => ({ ...prev, isEditModalOpen: true }));
			}, []);

			const handleDelete = useCallback((program: Program) => {
				setSelectedProgram(program);
				setModalState((prev) => ({ ...prev, isDeleteModalOpen: true }));
			}, []);

			return (
				<>
					<DataTableRowActions
						onEdit={() => handleEdit(program)}
						onDelete={() => handleDelete(program)}
					/>

					{/* Edit Modal */}
					<EditProgramModal
						selectedData={selectedProgram}
						isModalOpen={modalState.isEditModalOpen}
						setIsModalOpen={(open) =>
							setModalState((prev) => ({ ...prev, isEditModalOpen: open }))
						}
					/>

					{/* Delete Modal */}
					<DeleteProgramModal
						selectedData={selectedProgram}
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
