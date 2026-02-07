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
import { ComponentLoader } from "@workspace/ui/components/loader";
import { BadgeQuestionMark } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";
import { PERIODS_QUERY_KEYS } from "@/features/periods/constants";
import { deletePeriodByIdMutationOptions } from "@/features/periods/hooks/mutation-options";
import type { Period } from "@/features/periods/services";
import type { ModalProps } from "@/shared/types/props";

export const DeletePeriodModal = memo(
	({ selectedData, isModalOpen, setModalState }: ModalProps<Period>) => {
		/* ===================
		 * Delete member mutation
		 * =================== */
		const { mutate, isPending: isDeletePeriodPending } = useMutation(
			deletePeriodByIdMutationOptions(selectedData?.id as string, {
				onSuccess: (res, _variables, _onMutateResult, context) => {
					toast.success(res.message ?? "Periode berhasil dihapus.", {
						dismissible: true,
						closeButton: true,
						duration: 5000,
					});

					setModalState(false);
					context.client.invalidateQueries({
						queryKey: PERIODS_QUERY_KEYS.all,
					});
				},
				onError: (err) => {
					toast.error(err.message, {
						dismissible: true,
						closeButton: true,
						duration: 5000,
					});

					setModalState(false);
				},
			}),
		);

		return (
			<AlertDialog open={isModalOpen} onOpenChange={setModalState}>
				<AlertDialogContent open={isModalOpen} size="sm">
					<AlertDialogHeader>
						<AlertDialogMedia className="size-12">
							<BadgeQuestionMark className="size-8" />
						</AlertDialogMedia>

						<AlertDialogTitle>Hapus periode?</AlertDialogTitle>
						<AlertDialogDescription>
							Apakah anda yakin ingin menghapus periode ini? Ini akan menghapus
							data periode secara permanen.
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
							disabled={isDeletePeriodPending}
						>
							{isDeletePeriodPending ? <ComponentLoader /> : "Hapus"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	},
);
