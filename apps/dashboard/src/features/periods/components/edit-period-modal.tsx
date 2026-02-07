import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import { memo } from "react";
import type { Period } from "@/features/periods/services";
import type { ModalProps } from "@/shared/types/props";
import { EditPeriodForm } from "./edit-period-form";

export const EditPeriodModal = memo(
	({ selectedData, isModalOpen, setIsModalOpen }: ModalProps<Period>) => (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogContent
				open={isModalOpen}
				className="max-h-[calc(100vh-2rem)] max-w-sm gap-2 overflow-y-auto md:max-w-xl"
			>
				<DialogTitle className="text-base">Ubah Data Periode</DialogTitle>
				<DialogDescription>
					Mengubah data {selectedData?.name}
				</DialogDescription>

				<EditPeriodForm
					selectedData={selectedData as Period}
					onSuccess={() => setIsModalOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	),
);
