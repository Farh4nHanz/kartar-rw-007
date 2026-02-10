import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import { memo } from "react";
import type { Category } from "@/features/categories/services";
import { AddCollaborationForm } from "@/features/collaborations/components/forms/add-collaboration-form";
import type { Collaboration } from "@/features/collaborations/services";
import type { Period } from "@/features/periods/services";
import type { ModalProps } from "@/shared/types/props";

export const AddCollaborationModal = memo(
	({
		isModalOpen,
		setIsModalOpen,
		categories,
		periods,
	}: Omit<ModalProps<Collaboration>, "selectedData"> & {
		categories: Category[];
		periods: Period[];
	}) => (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogContent
				open={isModalOpen}
				className="max-h-[calc(100vh-2rem)] max-w-sm gap-2 overflow-y-auto md:max-w-xl"
			>
				<DialogTitle className="text-base">Tambah Mitra</DialogTitle>
				<DialogDescription>
					Silahkan isi data-data di bawah ini untuk menambahkan mitra baru.
				</DialogDescription>

				<AddCollaborationForm
					categories={categories}
					periods={periods}
					onSuccess={() => setIsModalOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	),
);
