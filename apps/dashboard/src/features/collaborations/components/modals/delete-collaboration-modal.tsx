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
import { deleteCollaborationByIdMutationOptions } from "@/features/collaborations/hooks/mutation-options";
import { getAllCollaborationsQueryOptions } from "@/features/collaborations/hooks/query-options";
import type { Collaboration } from "@/features/collaborations/services";
import type { ModalProps } from "@/shared/types/props";

export const DeleteCollaborationModal = memo(
	({
		selectedData,
		isModalOpen,
		setIsModalOpen,
	}: ModalProps<Collaboration>) => {
		const search = useSearch({
			from: "/(app)/(partnership)/kolaborasi",
		});
		/* ===================
		 * Delete collaboration mutation
		 * =================== */
		const { mutate, isPending: isDeleteCollaborationPending } = useMutation(
			deleteCollaborationByIdMutationOptions(selectedData?.id as string, {
				onSuccess: (res, _variables, _onMutateResult, context) => {
					toast.success(res.message ?? "Anggota berhasil dihapus.", {
						dismissible: true,
						closeButton: true,
						duration: 5000,
					});

					setIsModalOpen(false);
					context.client.invalidateQueries({
						queryKey: getAllCollaborationsQueryOptions(search).queryKey,
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

						<AlertDialogTitle>Hapus mitra?</AlertDialogTitle>
						<AlertDialogDescription>
							Apakah anda yakin ingin menghapus mitra ini? Ini akan menghapus
							data kerja sama dengan mitra secara permanen.
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
							disabled={isDeleteCollaborationPending}
						>
							{isDeleteCollaborationPending ? <ComponentLoader /> : "Hapus"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	},
);
