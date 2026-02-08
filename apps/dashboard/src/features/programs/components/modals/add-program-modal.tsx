import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import { memo } from "react";
import type { Category } from "@/features/categories/services";
import type { Period } from "@/features/periods/services";
import type { ModalProps } from "@/shared/types/props";
import { AddProgramForm } from "../forms/add-program-form";

export const AddProgramModal = memo(
	({
		isModalOpen,
		setIsModalOpen,
		categories,
	}: Omit<ModalProps<Period>, "selectedData"> & {
		categories: Category[];
	}) => (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogContent
				open={isModalOpen}
				className="max-h-[calc(100vh-2rem)] max-w-sm gap-2 overflow-y-auto md:max-w-xl"
			>
				<DialogTitle className="text-base">
					Tambah Program atau Kegiatan
				</DialogTitle>
				<DialogDescription>
					Silahkan isi data-data di bawah ini untuk menambahkan program atau
					kegiatan baru.
				</DialogDescription>

				<AddProgramForm
					categories={categories}
					onSuccess={() => setIsModalOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	),
);
