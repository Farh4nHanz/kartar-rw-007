import { useMutation } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
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
import { ComponentLoader } from "@workspace/ui/components/loader";
import { BadgeQuestionMark } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";
import { deleteMemberByIdMutationOptions } from "@/features/members/hooks/mutation-options";
import { getAllMembersQueryOptions } from "@/features/members/hooks/query-options";
import type { Member } from "@/features/members/services";
import type { ModalProps } from "@/shared/types/props";

export const DeleteMemberModal = memo(
	({ selectedData, isModalOpen, setIsModalOpen }: ModalProps<Member>) => {
		const search = useSearch({
			from: "/(app)/(organization)/anggota",
		});
		/* ===================
		 * Delete member mutation
		 * =================== */
		const { mutate, isPending: isDeleteMemberPending } = useMutation(
			deleteMemberByIdMutationOptions(selectedData?.id as string, {
				onSuccess: (res, _variables, _onMutateResult, context) => {
					toast.success(res.message ?? "Anggota berhasil dihapus.", {
						dismissible: true,
						closeButton: true,
						duration: 5000,
					});

					setIsModalOpen(false);
					context.client.invalidateQueries({
						queryKey: getAllMembersQueryOptions(search).queryKey,
					});
				},
				onError: (err) => {
					toast.error(err.message, {
						dismissible: true,
						closeButton: true,
						duration: 5000,
					});

					setIsModalOpen(false);
				},
			}),
		);

		return (
			<AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<AlertDialogContent open={isModalOpen} size="sm">
					<AlertDialogHeader>
						<AlertDialogMedia className="size-12">
							<BadgeQuestionMark className="size-8" />
						</AlertDialogMedia>

						<AlertDialogTitle>Hapus anggota?</AlertDialogTitle>
						<AlertDialogDescription>
							Apakah anda yakin ingin menghapus anggota ini dari kepengurusan?
							Ini akan menghapus data anggota secara permanen.
						</AlertDialogDescription>
					</AlertDialogHeader>

					<AlertDialogFooter>
						<AlertDialogCancel>Batal</AlertDialogCancel>
						<AlertDialogAction
							variant="destructive"
							onClick={(e) => {
								e.preventDefault();
								mutate(void selectedData?.id);
							}}
							disabled={isDeleteMemberPending}
						>
							{isDeleteMemberPending ? <ComponentLoader /> : "Hapus"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	},
);
