import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import { memo } from "react";
import type { Member } from "@/features/members/schemas";
import { EditMemberForm } from "./edit-member-form";

type EditModalProps = {
	selectedMember: Member | null;
	isEditModalOpen: boolean;
	setEditModalState: (open: boolean) => void;
};

export const EditModal = memo(
	({ selectedMember, isEditModalOpen, setEditModalState }: EditModalProps) => (
		<Dialog open={isEditModalOpen} onOpenChange={setEditModalState}>
			<DialogContent
				open={isEditModalOpen}
				className="max-h-[calc(100vh-2rem)] max-w-sm gap-2 overflow-y-auto md:max-w-xl"
			>
				<DialogTitle className="text-base">Edit Anggota</DialogTitle>
				<DialogDescription>Mengedit {selectedMember?.name}</DialogDescription>

				{selectedMember ? (
					<EditMemberForm
						key={selectedMember.id}
						member={selectedMember}
						onSuccess={() => setEditModalState(false)}
					/>
				) : null}
			</DialogContent>
		</Dialog>
	),
);
