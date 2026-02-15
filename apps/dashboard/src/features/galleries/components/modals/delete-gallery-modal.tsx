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
import { deleteGalleryBySlugMutationOptions } from "@/features/galleries/hooks/mutation-options";
import { getAllGalleriesQueryOptions } from "@/features/galleries/hooks/query-options";
import type { Gallery } from "@/features/galleries/services";
import type { ModalProps } from "@/shared/types/props";

export const DeleteGalleryModal = memo(
	({ selectedData, isModalOpen, setIsModalOpen }: ModalProps<Gallery>) => {
		const search = useSearch({
			from: "/(app)/(publication)/galeri/_index",
		});
		/* ===================
		 * Delete gallery mutation
		 * =================== */
		const { mutate, isPending: isDeleteGalleryPending } = useMutation(
			deleteGalleryBySlugMutationOptions(selectedData?.slug as string, {
				onSuccess: (res, _variables, _onMutateResult, context) => {
					toast.success(res.message ?? "Galeri berhasil dihapus.", {
						dismissible: true,
						closeButton: true,
						duration: 5000,
					});

					setIsModalOpen(false);
					context.client.invalidateQueries({
						queryKey: getAllGalleriesQueryOptions(search).queryKey,
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

						<AlertDialogTitle>Hapus galeri?</AlertDialogTitle>
						<AlertDialogDescription>
							Apakah anda yakin ingin menghapus galeri ini? Semua dokumentasi
							yang ada di dalam galeri ini akan terhapus secara permanen.
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
							disabled={isDeleteGalleryPending}
						>
							{isDeleteGalleryPending ? <ComponentLoader /> : "Hapus"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	},
);
