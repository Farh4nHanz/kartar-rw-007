import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import {
	ArrowLeft,
	ArrowRightToLine,
	CalendarDays,
	Pencil,
	Save,
	Trash2,
	UserPen,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { DeleteNewsModalOnDetail } from "@/features/news/components/modals/delete-news-modal";
import { PublishNewsModal } from "@/features/news/components/modals/publish-news-modal";
import { SaveToDraftModal } from "@/features/news/components/modals/save-to-draft-modal";
import { getNewsDetailBySlugQueryOptions } from "@/features/news/hooks/query-options";

export const Route = createFileRoute(
	"/(app)/(publication)/berita_/detail/$slug",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { slug } = useParams({
		from: "/(app)/(publication)/berita_/detail/$slug",
	});

	const { data: news } = useQuery(getNewsDetailBySlugQueryOptions(slug));

	const [modalState, setModalState] = useState({
		isSaveToDraftModalOpen: false,
		isPublishModalOpen: false,
		isDeleteModalOpen: false,
	});

	const getStatus = useCallback(() => {
		const status = news?.data.is_published ? "Published" : "Draft";
		const color =
			status === "Published"
				? "bg-emerald-200 dark:bg-emerald-500 text-emerald-800 dark:text-emerald-50"
				: "bg-yellow-200 dark:bg-yellow-500 text-yellow-800 dark:text-yellow-50";

		return {
			status,
			color,
		};
	}, [news?.data.is_published]);

	const getPublishedDate = useMemo(
		() =>
			news?.data.published_at !== null && news?.data.published_at !== undefined
				? new Intl.DateTimeFormat("id-ID", {
						dateStyle: "long",
					}).format(new Date(news?.data.published_at as string))
				: "Belum dipublikasi",
		[news?.data.published_at],
	);

	return (
		<div className="h-full min-h-dvh w-full space-y-8 overflow-x-auto px-4 pt-20 pb-6">
			<div className="flex flex-nowrap items-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					className="shrink-0 self-start"
					asChild
				>
					<Link to="/berita">
						<ArrowLeft />
					</Link>
				</Button>

				<div className="flex flex-1 flex-col gap-3">
					<div className="flex items-center justify-start gap-2">
						<Badge
							className={cn(
								"text-[calc(var(--text-xs)-1px)]",
								getStatus().color,
							)}
						>
							{getStatus().status}
						</Badge>
						<Badge className="bg-gray-200 text-[calc(var(--text-xs)-1px)] text-gray-800 dark:bg-gray-500 dark:text-gray-50">
							{news?.data.category.name}
						</Badge>
					</div>

					<h1 className="font-bold text-2xl">{news?.data.title}</h1>

					<div className="flex items-center gap-6 [&_span]:text-muted-foreground [&_span]:text-xs">
						<div className="flex items-center justify-center gap-2">
							<CalendarDays size={14} className="shrink-0" />
							<span>{getPublishedDate}</span>
						</div>
						<div className="flex items-center justify-center gap-2">
							<UserPen size={14} className="shrink-0" />
							<span>Admin Karang Taruna</span>
						</div>
					</div>
				</div>

				<Button className="gap-2 justify-self-end bg-yellow-400 hover:bg-yellow-500">
					<Pencil />
					Edit Berita
				</Button>
			</div>

			<Card className="max-h-96 p-0">
				<img
					src={news?.data.thumbnail_url || "https://via.placeholder.com/150"}
					alt="Thumbnail"
					className="aspect-video h-full w-full object-cover object-center italic"
				/>
			</Card>

			<div className="grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-[1fr_auto] md:items-start md:gap-10">
				<Card>
					<CardHeader>
						<CardTitle className="font-semibold">Konten</CardTitle>
					</CardHeader>
					<CardContent className="flex gap-10">
						{news?.data.content}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="font-semibold">Informasi Publikasi</CardTitle>
					</CardHeader>
					<CardContent className="grid grid-cols-1 gap-4 [&_h3]:font-semibold [&_h3]:text-sm [&_h5]:text-muted-foreground [&_h5]:text-xs [&_hgroup]:space-y-2">
						<hgroup>
							<h5>Tanggal Publikasi</h5>
							<h3>{getPublishedDate}</h3>
						</hgroup>
						<hgroup>
							<h5>Kategori</h5>
							<h3>{news?.data.category.name}</h3>
						</hgroup>
						<hgroup>
							<h5>Status</h5>
							<h3>{getStatus().status}</h3>
						</hgroup>
						<hgroup>
							<h5>Penulis</h5>
							<h3>Admin Karang Taruna</h3>
						</hgroup>
					</CardContent>
				</Card>
			</div>

			<div className="flex w-full items-center justify-start gap-3">
				<Button variant="outline" className="me-auto" asChild>
					<Link to="/berita">
						<ArrowLeft />
						Kembali
					</Link>
				</Button>
				{getStatus().status === "Published" ? (
					<Button
						className="bg-amber-500 text-primary-foreground hover:bg-amber-600 dark:bg-amber-300 dark:hover:bg-amber-400"
						onClick={() =>
							setModalState((prev) => ({
								...prev,
								isSaveToDraftModalOpen: true,
							}))
						}
					>
						<Save />
						Jadikan Draft
					</Button>
				) : (
					<Button
						className="bg-emerald-500 text-primary-foreground hover:bg-emerald-600 dark:bg-emerald-300 dark:hover:bg-emerald-400"
						onClick={() =>
							setModalState((prev) => ({
								...prev,
								isPublishModalOpen: true,
							}))
						}
					>
						Publish
						<ArrowRightToLine />
					</Button>
				)}
				<Button
					variant="destructive"
					onClick={() =>
						setModalState((prev) => ({
							...prev,
							isDeleteModalOpen: true,
						}))
					}
				>
					<Trash2 />
					Hapus
				</Button>
			</div>

			<SaveToDraftModal
				isModalOpen={modalState.isSaveToDraftModalOpen}
				setIsModalOpen={(open) =>
					setModalState((prev) => ({
						...prev,
						isSaveToDraftModalOpen: open,
					}))
				}
				selectedData={news?.data || null}
			/>

			<PublishNewsModal
				isModalOpen={modalState.isPublishModalOpen}
				setIsModalOpen={(open) =>
					setModalState((prev) => ({
						...prev,
						isPublishModalOpen: open,
					}))
				}
				selectedData={news?.data || null}
			/>

			<DeleteNewsModalOnDetail
				isModalOpen={modalState.isDeleteModalOpen}
				setIsModalOpen={(open) =>
					setModalState((prev) => ({
						...prev,
						isDeleteModalOpen: open,
					}))
				}
				selectedData={news?.data || null}
			/>
		</div>
	);
}
