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
import { deleteCategoryByIdMutationOptions } from "@/features/categories/hooks/mutation-options";
import { getAllCategoriesQueryOptions } from "@/features/categories/hooks/query-options";
import type { Category } from "@/features/categories/services";
import type { ModalProps } from "@/shared/types/props";

export const DeleteCategoryModal = memo(
	({ selectedData, isModalOpen, setIsModalOpen }: ModalProps<Category>) => {
		const search = useSearch({
			from: "/(app)/(publication)/kategori",
		});

		/* ===================
		 * Delete member mutation
		 * =================== */
		const { mutate, isPending: isDeleteCategoryPending } = useMutation(
			deleteCategoryByIdMutationOptions(selectedData?.id as string, {
				onSuccess: (res, _variables, _onMutateResult, context) => {
					toast.success(res.message ?? "Jabatan berhasil dihapus.", {
						dismissible: true,
						closeButton: true,
						duration: 5000,
					});

					setIsModalOpen(false);
					context.client.invalidateQueries({
						queryKey: getAllCategoriesQueryOptions(search).queryKey,
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

						<AlertDialogTitle>Hapus kategori?</AlertDialogTitle>
						<AlertDialogDescription>
							Apakah anda yakin ingin menghapus kategori ini? Ini akan menghapus
							data kategori secara permanen.
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
							disabled={isDeleteCategoryPending}
						>
							{isDeleteCategoryPending ? <ComponentLoader /> : "Hapus"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	},
);
