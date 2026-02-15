import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import { memo } from "react";
import type { Category } from "@/features/categories/services";
import { EditCollaborationForm } from "@/features/collaborations/components/forms/edit-collaboration-form";
import type { Collaboration } from "@/features/collaborations/services";
import type { Period } from "@/features/periods/services";
import type { ModalProps } from "@/shared/types/props";

export const EditCollaborationModal = memo(
	({
		isModalOpen,
		setIsModalOpen,
		selectedData,
		categories,
		periods,
	}: ModalProps<Collaboration> & {
		categories: Category[];
		periods: Period[];
	}) => (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogContent
				open={isModalOpen}
				className="max-h-[calc(100vh-2rem)] max-w-sm gap-2 overflow-y-auto md:max-w-xl"
			>
				<DialogTitle className="text-base">Ubah Data Kemitraan</DialogTitle>
				<DialogDescription className="capitalize">
					Mengubah data {selectedData?.partner_name}
				</DialogDescription>

				<EditCollaborationForm
					selectedData={selectedData as Collaboration}
					categories={categories}
					periods={periods}
					onSuccess={() => setIsModalOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	),
);
