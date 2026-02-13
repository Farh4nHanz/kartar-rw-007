import { Link } from "@tanstack/react-router";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Gallery } from "@/features/galleries/services";
import { DeleteGalleryModal } from "./modals/delete-gallery-modal";

function GalleryCard({ gallery }: { gallery: Gallery }) {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	return (
		<Card className="pt-0">
			{/* Image */}
			<CardHeader className="p-0">
				<img
					src={gallery.images[0]?.image_url || "https://placehold.co/300x300"}
					alt={gallery.title}
					className="aspect-square max-h-52 w-full rounded-t-xl object-cover object-center italic max-md:max-h-64"
				/>
			</CardHeader>

			{/* Content */}
			<CardContent className="space-y-2">
				{/* Title */}
				<h3 className="font-semibold text-base capitalize">{gallery.title}</h3>

				{/* Date & photo count */}
				<div className="flex justify-between gap-4">
					<p className="text-muted-foreground text-xs">
						{new Intl.DateTimeFormat("id-ID", {
							dateStyle: "long",
						}).format(new Date(gallery.activity_date))}
					</p>
					<p className="text-muted-foreground text-xs">
						{gallery.images.length} Foto
					</p>
				</div>

				{/* Category badge */}
				<Badge className="bg-gray-200 text-gray-700 capitalize dark:bg-gray-500 dark:text-gray-50">
					{gallery.category.name}
				</Badge>
			</CardContent>

			{/* Footer */}
			<CardFooter className="gap-3">
				{/* View button */}
				<Button asChild className="flex-1" variant="outline">
					<Link to="/galeri/$id/detail" params={{ id: gallery.id }}>
						<Eye />
						Lihat
					</Link>
				</Button>

				{/* Action buttons */}
				<div className="flex items-center justify-center gap-3">
					{/* Edit Action */}
					<Button
						variant="ghost"
						className="bg-amber-500/20 text-amber-800 hover:bg-amber-500/30 hover:text-amber-800 dark:bg-amber-500 dark:text-amber-50 dark:hover:bg-amber-500/80"
						size="icon"
						asChild
					>
						<Link to="/galeri/$id/edit" params={{ id: gallery.id }}>
							<Edit />
						</Link>
					</Button>

					{/* Delete Action */}
					<Button
						variant="destructive"
						size="icon"
						onClick={() => setIsDeleteModalOpen((prev) => !prev)}
					>
						<Trash2 />
					</Button>

					{/* Delete Modal */}
					<DeleteGalleryModal
						selectedData={gallery}
						isModalOpen={isDeleteModalOpen}
						setIsModalOpen={() => setIsDeleteModalOpen((prev) => !prev)}
					/>
				</div>
			</CardFooter>
		</Card>
	);
}

function GalleryCardSkeleton() {
	return (
		<Card className="pt-0">
			{/* Image */}
			<CardHeader className="p-0">
				<Skeleton className="aspect-square max-h-52 w-full rounded-t-xl max-md:max-h-64" />
			</CardHeader>

			{/* Content */}
			<CardContent className="space-y-2">
				{/* Title */}
				<Skeleton className="h-4 w-3/4" />

				{/* Date & photo count */}
				<div className="flex justify-between gap-4">
					<Skeleton className="h-3 w-24" />
					<Skeleton className="h-3 w-16" />
				</div>

				{/* Category badge */}
				<Skeleton className="h-5 w-24 rounded-full" />
			</CardContent>

			{/* Footer */}
			<CardFooter className="gap-3">
				{/* View button */}
				<Button asChild variant="outline" className="flex-1" disabled>
					<span className="flex items-center gap-2">
						<Skeleton className="h-4 w-4 rounded-full" />
						<Skeleton className="h-3 w-12" />
					</span>
				</Button>

				{/* Action buttons */}
				<div className="flex items-center justify-center gap-3">
					<Skeleton className="h-9 w-9 rounded-md" />
					<Skeleton className="h-9 w-9 rounded-md" />
				</div>
			</CardFooter>
		</Card>
	);
}

export { GalleryCard, GalleryCardSkeleton };
