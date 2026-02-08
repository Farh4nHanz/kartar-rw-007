import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@workspace/ui/components/badge";
import {
	DataTableRowActions,
	DataTableSortableHeader,
} from "@workspace/ui/components/data-table";
import { cn } from "@workspace/ui/lib/utils";
import { useCallback, useState } from "react";
import { DeleteCategoryModal } from "@/features/categories/components/modals/delete-category-modal";
import { EditCategoryModal } from "@/features/categories/components/modals/edit-category-modal";
import type { Category } from "@/features/categories/services";

const columnHelper = createColumnHelper<Category>();

export const columns = [
	columnHelper.accessor("name", {
		id: "name",
		header: ({ column }) => (
			<DataTableSortableHeader label="Nama Kategori" column={column} />
		),
		enableHiding: false,
	}),
	columnHelper.accessor("type", {
		id: "category_type",
		header: "Tipe",
		cell: ({ renderValue }) => {
			const getColorType = (type: string) => {
				switch (type.toLowerCase()) {
					case "galeri":
						return "bg-emerald-200 dark:bg-emerald-500 text-emerald-800 dark:text-emerald-50";
					case "program":
						return "bg-blue-200 dark:bg-blue-500 text-blue-800 dark:text-blue-50";
					case "berita":
						return "bg-violet-200 dark:bg-violet-500 text-violet-800 dark:text-violet-50";
					case "kolaborasi":
						return "bg-amber-200 dark:bg-amber-500 text-amber-800 dark:text-amber-50";
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
		enableHiding: false,
	}),
	columnHelper.display({
		id: "actions",
		enableHiding: false,
		cell: (info) => {
			const category = info.row.original;

			/* ===================
			 * Selected category
			 * Stores the currently selected category
			 * to be used in the modals
			 * =================== */
			const [selectedCategory, setSelectedCategory] = useState<Category | null>(
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

			const handleEdit = useCallback((category: Category) => {
				setSelectedCategory(category);
				setModalState((prev) => ({ ...prev, isEditModalOpen: true }));
			}, []);

			const handleDelete = useCallback((category: Category) => {
				setSelectedCategory(category);
				setModalState((prev) => ({ ...prev, isDeleteModalOpen: true }));
			}, []);

			return (
				<>
					<DataTableRowActions
						onEdit={() => handleEdit(category)}
						onDelete={() => handleDelete(category)}
					/>

					{/* Edit Modal */}
					<EditCategoryModal
						selectedData={selectedCategory}
						isModalOpen={modalState.isEditModalOpen}
						setIsModalOpen={(open) =>
							setModalState((prev) => ({ ...prev, isEditModalOpen: open }))
						}
					/>

					{/* Delete Modal */}
					<DeleteCategoryModal
						selectedData={selectedCategory}
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
