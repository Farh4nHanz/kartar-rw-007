import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import { memo } from "react";
import { EditCategoryForm } from "@/features/categories/components/forms/edit-category-form";
import type { Category } from "@/features/categories/services";
import type { ModalProps } from "@/shared/types/props";

export const EditCategoryModal = memo(
	({ selectedData, isModalOpen, setIsModalOpen }: ModalProps<Category>) => (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogContent
				open={isModalOpen}
				className="max-h-[calc(100vh-2rem)] max-w-sm gap-2 overflow-y-auto md:max-w-xl"
			>
				<DialogTitle className="text-base">Ubah Data Kategori</DialogTitle>
				<DialogDescription>
					Mengubah kategori {selectedData?.name}
				</DialogDescription>

				<EditCategoryForm
					selectedData={selectedData as Category}
					onSuccess={() => setIsModalOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	),
);
