import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import { memo } from "react";
import type { Period } from "@/features/periods/services";
import type { ModalProps } from "@/shared/types/props";
import { AddPeriodForm } from "../forms/add-period-form";

export const AddPeriodModal = memo(
	({
		isModalOpen,
		setIsModalOpen,
	}: Omit<ModalProps<Period>, "selectedData">) => (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogContent
				open={isModalOpen}
				className="max-h-[calc(100vh-2rem)] max-w-sm gap-2 overflow-y-auto md:max-w-xl"
			>
				<DialogTitle className="text-base">Tambah Periode</DialogTitle>
				<DialogDescription>
					Silahkan isi data-data di bawah ini untuk menambahkan periode baru.
				</DialogDescription>

				<AddPeriodForm onSuccess={() => setIsModalOpen(false)} />
			</DialogContent>
		</Dialog>
	),
);
