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
import { updateNewsStatusByIdMutationOptions } from "@/features/news/hooks/mutation-options";
import {
	getAllNewsQueryOptions,
	getNewsDetailBySlugQueryOptions,
} from "@/features/news/hooks/query-options";
import type { News } from "@/features/news/services";
import type { ModalProps } from "@/shared/types/props";

export const SaveToDraftModal = memo(
	({ selectedData, isModalOpen, setIsModalOpen }: ModalProps<News>) => {
		const search = useSearch({
			from: "/(app)/(publication)/berita/$slug/detail",
		});

		/* ===================
		 * Save to draft news mutation
		 * =================== */
		const { mutate, isPending: isSaveToDraftNewsPending } = useMutation(
			updateNewsStatusByIdMutationOptions(selectedData?.id as string, {
				onSuccess: (res, _variables, _onMutateResult, context) => {
					toast.success(res.message ?? "Berita disimpan ke dalam draft.", {
						dismissible: true,
						closeButton: true,
						duration: 5000,
					});

					setIsModalOpen(false);
					context.client.invalidateQueries({
						queryKey: getNewsDetailBySlugQueryOptions(
							selectedData?.slug as string,
						).queryKey,
					});
					context.client.invalidateQueries({
						queryKey: getAllNewsQueryOptions(search).queryKey,
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

						<AlertDialogTitle>Simpan ke dalam draft?</AlertDialogTitle>
						<AlertDialogDescription>
							Berita ini akan disimpan ke dalam draft. Status berita yang sudah
							terpublish akan berubah menjadi draft.
						</AlertDialogDescription>
					</AlertDialogHeader>

					<AlertDialogFooter>
						<AlertDialogCancel variant="destructive">Batal</AlertDialogCancel>
						<AlertDialogAction
							className="bg-green-500 text-primary-foreground hover:bg-green-600"
							onClick={(e) => {
								e.preventDefault();
								mutate({ is_published: false, published_at: null });
							}}
							disabled={isSaveToDraftNewsPending}
						>
							{isSaveToDraftNewsPending ? <ComponentLoader /> : "Jadikan Draft"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	},
);
