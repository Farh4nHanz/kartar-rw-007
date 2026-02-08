import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import { memo } from "react";
import type { Period } from "@/features/periods/services";
import type { ModalProps } from "@/shared/types/props";
import { AddCategoryForm } from "../forms/add-category-form";

export const AddCategoryModal = memo(
	({
		isModalOpen,
		setIsModalOpen,
	}: Omit<ModalProps<Period>, "selectedData">) => (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogContent
				open={isModalOpen}
				className="max-h-[calc(100vh-2rem)] max-w-sm gap-2 overflow-y-auto md:max-w-xl"
			>
				<DialogTitle className="text-base">Tambah Kategori</DialogTitle>
				<DialogDescription>
					Silahkan isi data-data di bawah ini untuk menambahkan kategori baru.
				</DialogDescription>

				<AddCategoryForm onSuccess={() => setIsModalOpen(false)} />
			</DialogContent>
		</Dialog>
	),
);
