import { useMutation } from "@tanstack/react-query";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog";
import { BadgeQuestionMark, Loader2 } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";
import { deleteMemberMutationOptions } from "@/features/members/hooks/mutation-options";
import { getAllMemberQueryOptions } from "@/features/members/hooks/query-options";
import type { Member } from "@/features/members/schemas";

type DeleteModalProps = {
	selectedMember: Member | null;
	isDeleteModalOpen: boolean;
	setDeleteModalState: (open: boolean) => void;
};

export const DeleteModal = memo(
	({
		selectedMember,
		isDeleteModalOpen,
		setDeleteModalState,
	}: DeleteModalProps) => {
		/* ===================
		 * Delete member mutation
		 * =================== */
		const { mutate, isPending: isDeleteMemberPending } = useMutation(
			deleteMemberMutationOptions(selectedMember?.id as string, {
				onSuccess: (res, _variables, _onMutateResult, context) => {
					toast.success(res.message ?? "Anggota berhasil dihapus.", {
						dismissible: true,
						closeButton: true,
						duration: 5000,
					});

					setDeleteModalState(false);
					context.client.invalidateQueries({
						queryKey: getAllMemberQueryOptions().queryKey,
					});
				},
				onError: (err) => {
					toast.error(err.message, {
						dismissible: true,
						closeButton: true,
						duration: 5000,
					});

					setDeleteModalState(false);
				},
			}),
		);

		return (
			<AlertDialog open={isDeleteModalOpen} onOpenChange={setDeleteModalState}>
				<AlertDialogContent open={isDeleteModalOpen} size="sm">
					<AlertDialogHeader>
						<AlertDialogMedia className="size-12">
							<BadgeQuestionMark className="size-8" />
						</AlertDialogMedia>

						<AlertDialogTitle>Hapus anggota?</AlertDialogTitle>
						<AlertDialogDescription>
							Apakah anda yakin ingin menghapus anggota ini dari organisasi? Ini
							akan menghapus anggota secara permanen dari database.
						</AlertDialogDescription>
					</AlertDialogHeader>

					<AlertDialogFooter>
						<AlertDialogCancel>Batal</AlertDialogCancel>
						<AlertDialogAction
							variant="destructive"
							onClick={(e) => {
								e.preventDefault();
								mutate(void selectedMember?.id);
							}}
							disabled={isDeleteMemberPending}
						>
							{isDeleteMemberPending ? (
								<Loader2 className="animate-spin" />
							) : (
								"Hapus"
							)}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	},
);
