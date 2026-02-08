import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import { memo } from "react";
import { AddMemberForm } from "@/features/members/components/forms/add-member-form";
import type { Member } from "@/features/members/services";
import type { Period } from "@/features/periods/services";
import type { Position } from "@/features/positions/services";
import type { ModalProps } from "@/shared/types/props";

export const AddMemberModal = memo(
	({
		isModalOpen,
		setIsModalOpen,
		positionsData,
		periodsData,
	}: Omit<ModalProps<Member>, "selectedData"> & {
		positionsData: Position[];
		periodsData: Period[];
	}) => (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogContent
				open={isModalOpen}
				className="max-h-[calc(100vh-2rem)] max-w-sm gap-2 overflow-y-auto md:max-w-xl"
			>
				<DialogTitle className="text-base">Tambah Anggota</DialogTitle>
				<DialogDescription>
					Silahkan isi data-data di bawah ini untuk menambahkan anggota baru.
				</DialogDescription>

				<AddMemberForm
					positionsData={positionsData}
					periodsData={periodsData}
					onSuccess={() => setIsModalOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	),
);
