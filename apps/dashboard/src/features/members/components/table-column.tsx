import { createColumnHelper } from "@tanstack/react-table";
import {
	DataTableRowActions,
	DataTableSortableHeader,
} from "@workspace/ui/components/data-table";
import { useCallback, useState } from "react";
import { DeleteModal } from "@/features/members/components/delete-member-modal";
// import { DetailModal } from "@/features/members/components/detail-modal";
import { EditModal } from "@/features/members/components/edit-member-modal";
import type { Member } from "@/features/members/schemas";

const columnHelper = createColumnHelper<Member>();

export const columns = [
	columnHelper.accessor("photo_path", {
		id: "profil",
		header: "Profil",
		cell: ({ row, getValue }) => (
			<img
				src={getValue()}
				alt={row.getValue("name")}
				className="aspect-square size-8 rounded-sm object-cover"
			/>
		),
		enableHiding: false,
	}),
	columnHelper.accessor("name", {
		id: "name",
		enableHiding: false,
		header: ({ header, column }) => (
			<DataTableSortableHeader label={header.id} column={column} />
		),
	}),
	columnHelper.accessor("email", {
		id: "email",
		header: "Email",
	}),
	columnHelper.accessor("position", {
		id: "jabatan",
		header: "Jabatan",
		filterFn: (row, columnId, filterValue) => {
			if (!Array.isArray(filterValue) && filterValue.length === 0) return true;
			const rowValue = String(row.getValue(columnId)).toLowerCase();
			return filterValue.includes(rowValue);
		},
	}),
	columnHelper.accessor("period", {
		id: "periode",
		header: "Periode",
		cell: ({ renderValue }) => {
			const startYear = new Date(
				renderValue()?.start_year as number,
			).getFullYear();
			const endYear = new Date(renderValue()?.end_year as number).getFullYear();
			const period = `${startYear} - ${endYear}`;

			return <span>{period}</span>;
		},
	}),
	columnHelper.display({
		id: "actions",
		enableHiding: false,
		cell: (info) => {
			const member = info.row.original;

			/* ===================
			 * Selected member
			 * Stores the currently selected member
			 * to be used in the modals
			 * =================== */
			const [selectedMember, setSelectedMember] = useState<Member | null>(null);

			/* ===================
			 * Modal states
			 * =================== */
			const [modalState, setModalState] = useState({
				isDetailModalOpen: false,
				isEditModalOpen: false,
				isDeleteModalOpen: false,
			});

			/* ===================
			 * Modal handlers
			 * =================== */
			const handleViewDetails = useCallback((member: Member) => {
				setSelectedMember(member);
				setModalState((prev) => ({ ...prev, isDetailModalOpen: true }));
			}, []);

			const handleEdit = useCallback((member: Member) => {
				setSelectedMember(member);
				setModalState((prev) => ({ ...prev, isEditModalOpen: true }));
			}, []);

			const handleDelete = useCallback((member: Member) => {
				setSelectedMember(member);
				setModalState((prev) => ({ ...prev, isDeleteModalOpen: true }));
			}, []);

			return (
				<>
					<DataTableRowActions
						onView={() => handleViewDetails(member)}
						onEdit={() => handleEdit(member)}
						onDelete={() => handleDelete(member)}
					/>

					{/* Detail Modal */}
					{/* <DetailModal
						selectedMember={selectedMember}
						isDetailModalOpen={modalState.isDetailModalOpen}
						setDetailModalState={(open) =>
							setModalState((prev) => ({ ...prev, isDetailModalOpen: open }))
						}
					/> */}

					{/* Edit Modal */}
					<EditModal
						selectedMember={selectedMember}
						isEditModalOpen={modalState.isEditModalOpen}
						setEditModalState={(open) =>
							setModalState((prev) => ({ ...prev, isEditModalOpen: open }))
						}
					/>

					{/* Delete Modal */}
					<DeleteModal
						selectedMember={selectedMember}
						isDeleteModalOpen={modalState.isDeleteModalOpen}
						setDeleteModalState={(open) =>
							setModalState((prev) => ({
								...prev,
								isDeleteModalOpen: open,
							}))
						}
					/>
				</>
			);
		},
	}),
];
