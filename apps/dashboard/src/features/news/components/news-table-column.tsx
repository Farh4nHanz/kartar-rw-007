import { useNavigate } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@workspace/ui/components/badge";
import { DataTableRowActions } from "@workspace/ui/components/data-table";
import { cn } from "@workspace/ui/lib/utils";
import { useCallback, useState } from "react";
import { DeleteNewsModal } from "@/features/news/components/modals/delete-news-modal";
import type { News } from "@/features/news/services";

const columnHelper = createColumnHelper<News>();

export const columns = [
	columnHelper.accessor("title", {
		id: "nama",
		header: "Judul",
		enableHiding: false,
	}),
	columnHelper.accessor("category.name", {
		id: "kategori",
		header: "Kategori",
		cell: ({ renderValue }) => {
			return (
				<Badge className="bg-gray-200 text-[calc(var(--text-xs)-1px)] text-gray-800 dark:bg-gray-500 dark:text-gray-50">
					{renderValue()}
				</Badge>
			);
		},
		enableHiding: false,
	}),
	columnHelper.accessor("published_at", {
		id: "tanggal publikasi",
		header: "Tanggal Publikasi",
		cell: ({ renderValue }) => {
			return (
				<span>
					{renderValue() !== null && renderValue() !== undefined
						? new Intl.DateTimeFormat("id-ID", {
								dateStyle: "long",
							}).format(new Date(renderValue() as string))
						: "-"}
				</span>
			);
		},
	}),
	columnHelper.accessor("is_published", {
		id: "status",
		header: "Status",
		cell: ({ getValue }) => {
			const value = getValue() === true ? "Published" : "Draft";
			const color =
				value === "Published"
					? "bg-emerald-200 dark:bg-emerald-500 text-emerald-800 dark:text-emerald-50"
					: "bg-yellow-200 dark:bg-yellow-500 text-yellow-800 dark:text-yellow-50";

			return (
				<Badge className={cn("text-[calc(var(--text-xs)-1px)]", color)}>
					{value}
				</Badge>
			);
		},
	}),
	columnHelper.display({
		id: "actions",
		enableHiding: false,
		cell: (info) => {
			const news = info.row.original;

			const navigate = useNavigate({
				from: "/berita",
			});

			/* ===================
			 * Selected news
			 * Stores the currently selected news
			 * to be used in the modals
			 * =================== */
			const [selectedNews, setSelectedNews] = useState<News | null>(null);

			/* ===================
			 * Modal states
			 * =================== */
			const [modalState, setModalState] = useState({
				isDeleteModalOpen: false,
			});

			/* ===================
			 * Modal handlers
			 * =================== */
			const handleDelete = useCallback((news: News) => {
				setSelectedNews(news);
				setModalState((prev) => ({ ...prev, isDeleteModalOpen: true }));
			}, []);

			return (
				<>
					<DataTableRowActions
						onView={() =>
							navigate({
								to: "$slug/detail",
								params: { slug: news.slug },
							})
						}
						onEdit={() =>
							navigate({
								to: "$slug/edit",
								params: { slug: news.slug },
							})
						}
						onDelete={() => handleDelete(news)}
					/>

					{/* Delete Modal */}
					<DeleteNewsModal
						selectedData={selectedNews}
						isModalOpen={modalState.isDeleteModalOpen}
						setIsModalOpen={(open) =>
							setModalState((prev) => ({
								...prev,
								isDeleteModalOpen: open,
							}))
						}
					/>
				</>
			);
		},
	}),
];
