import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import { memo } from "react";
import { EditMemberForm } from "@/features/members/components/forms/edit-member-form";
import type { Member } from "@/features/members/services";
import type { Period } from "@/features/periods/services";
import type { Position } from "@/features/positions/services";
import type { ModalProps } from "@/shared/types/props";

export const EditMemberModal = memo(
	({
		isModalOpen,
		setIsModalOpen,
		selectedData,
		positionsData,
		periodsData,
	}: ModalProps<Member> & {
		positionsData: Position[];
		periodsData: Period[];
	}) => (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogContent
				open={isModalOpen}
				className="max-h-[calc(100vh-2rem)] max-w-sm gap-2 overflow-y-auto md:max-w-xl"
			>
				<DialogTitle className="text-base">Ubah Data Anggota</DialogTitle>
				<DialogDescription>
					Mengubah data {selectedData?.name}
				</DialogDescription>

				<EditMemberForm
					selectedData={selectedData as Member}
					positionsData={positionsData}
					periodsData={periodsData}
					onSuccess={() => setIsModalOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	),
);
