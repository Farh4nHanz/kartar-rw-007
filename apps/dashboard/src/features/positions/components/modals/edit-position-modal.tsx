import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import { memo } from "react";
import { EditPositionForm } from "@/features/positions/components/forms/edit-position-form";
import type { Position } from "@/features/positions/services";
import type { ModalProps } from "@/shared/types/props";

export const EditPositionModal = memo(
	({ selectedData, isModalOpen, setIsModalOpen }: ModalProps<Position>) => (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogContent
				open={isModalOpen}
				className="max-h-[calc(100vh-2rem)] max-w-sm gap-2 overflow-y-auto md:max-w-xl"
			>
				<DialogTitle className="text-base">Ubah Data Jabatan</DialogTitle>
				<DialogDescription>
					Mengubah data {selectedData?.name}
				</DialogDescription>

				<EditPositionForm
					selectedData={selectedData as Position}
					onSuccess={() => setIsModalOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	),
);
