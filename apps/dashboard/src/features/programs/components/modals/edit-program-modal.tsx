import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import { memo } from "react";
import { EditProgramForm } from "@/features/programs/components/forms/edit-program-form";
import type { Program } from "@/features/programs/services";
import type { ModalProps } from "@/shared/types/props";

export const EditProgramModal = memo(
	({ selectedData, isModalOpen, setIsModalOpen }: ModalProps<Program>) => (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogContent
				open={isModalOpen}
				className="max-h-[calc(100vh-2rem)] max-w-sm gap-2 overflow-y-auto md:max-w-xl"
			>
				<DialogTitle className="text-base">
					Ubah Data Program atau Kegiatan
				</DialogTitle>
				<DialogDescription>
					Mengubah data {selectedData?.title}
				</DialogDescription>

				<EditProgramForm
					selectedData={selectedData as Program}
					onSuccess={() => setIsModalOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	),
);
