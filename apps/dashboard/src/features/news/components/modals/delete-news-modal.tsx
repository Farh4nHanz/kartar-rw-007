import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
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
import { deleteNewsByIdMutationOptions } from "@/features/news/hooks/mutation-options";
import { getAllNewsQueryOptions } from "@/features/news/hooks/query-options";
import type { News } from "@/features/news/services";
import type { ModalProps } from "@/shared/types/props";

export const DeleteNewsModal = memo(
	({ selectedData, isModalOpen, setIsModalOpen }: ModalProps<News>) => {
		const search = useSearch({
			from: "/(app)/(publication)/berita/_index",
		});

		/* ===================
		 * Delete news mutation
		 * =================== */
		const { mutate, isPending: isDeleteNewsPending } = useMutation(
			deleteNewsByIdMutationOptions(selectedData?.id as string, {
				onSuccess: (res, _variables, _onMutateResult, context) => {
					toast.success(res.message ?? "Berita berhasil dihapus.", {
						dismissible: true,
						closeButton: true,
						duration: 5000,
					});

					setIsModalOpen(false);
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

						<AlertDialogTitle>Hapus berita?</AlertDialogTitle>
						<AlertDialogDescription>
							Apakah anda yakin ingin menghapus berita ini? Ini akan menghapus
							data secara permanen.
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
							disabled={isDeleteNewsPending}
						>
							{isDeleteNewsPending ? <ComponentLoader /> : "Hapus"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	},
);

export const DeleteNewsModalOnDetail = memo(
	({ selectedData, isModalOpen, setIsModalOpen }: ModalProps<News>) => {
		const search = useSearch({
			from: "/(app)/(publication)/berita/$slug/detail",
		});

		const navigate = useNavigate({
			from: "/berita/$slug/detail",
		});

		/* ===================
		 * Delete news mutation
		 * =================== */
		const { mutate, isPending: isDeleteNewsPending } = useMutation(
			deleteNewsByIdMutationOptions(selectedData?.id as string, {
				onSuccess: (res, _variables, _onMutateResult, context) => {
					toast.success(res.message ?? "Berita berhasil dihapus.", {
						dismissible: true,
						closeButton: true,
						duration: 5000,
					});

					setIsModalOpen(false);

					context.client.invalidateQueries({
						queryKey: getAllNewsQueryOptions(search).queryKey,
					});

					navigate({ to: "/berita" });
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

						<AlertDialogTitle>Hapus berita?</AlertDialogTitle>
						<AlertDialogDescription>
							Apakah anda yakin ingin menghapus berita ini? Ini akan menghapus
							data secara permanen.
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
							disabled={isDeleteNewsPending}
						>
							{isDeleteNewsPending ? <ComponentLoader /> : "Hapus"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	},
);
