import { Link } from "@tanstack/react-router";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@workspace/ui/components/empty";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { ArrowRightIcon, Images } from "lucide-react";
import type { RecentGalleriesProps } from "@/features/dashboard/types";

export function RecentGalleries({ data }: RecentGalleriesProps) {
	return (
		<Card>
			<CardHeader className="font-semibold text-lg">Galeri Terbaru</CardHeader>
			<CardContent className="space-y-3">
				{data.map((gallery, index) => (
					<div
						key={index}
						className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
					>
						<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
							<Images size={20} className="text-primary" />
						</div>
						<div className="flex-1">
							<p className="truncate font-medium text-sm">{gallery.title}</p>
							<div className="mt-1 flex items-center gap-2">
								<small className="text-muted-foreground text-xs">
									{new Intl.DateTimeFormat("id-ID", {
										day: "numeric",
										month: "long",
										year: "numeric",
									}).format(new Date(gallery.activity_date))}
								</small>
								<Badge className="bg-secondary px-2 py-0.5 text-xs">
									{gallery.gallery_images.length} foto
								</Badge>
							</div>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}

export function RecentGalleriesSkeleton() {
	return (
		<Card>
			<CardHeader className="font-semibold text-lg">Galeri Terbaru</CardHeader>
			<CardContent className="space-y-3">
				{Array.from({ length: 5 }, () => (
					<div
						key={Math.random() * 100}
						className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
					>
						<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
							<Images size={20} className="text-primary" />
						</div>
						<div className="flex-1">
							<Skeleton className="h-5 w-48" />
							<div className="mt-1 flex items-center gap-2">
								<Skeleton className="h-4 w-16" />
								<Skeleton className="h-4 w-8" />
							</div>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}

export function RecentGalleriesEmpty() {
	return (
		<Card>
			<CardHeader className="font-semibold text-lg">Galeri Terbaru</CardHeader>
			<CardContent className="space-y-3">
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<Images />
						</EmptyMedia>
						<EmptyTitle className="text-base">Belum Ada Galeri</EmptyTitle>
						<EmptyDescription className="text-sm">
							Anda belum memiliki galeri, silahkan tambahkan galeri terlebih
							dahulu.
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button
							variant="link"
							asChild
							className="text-muted-foreground hover:text-primary"
							size="sm"
						>
							<Link to="/galeri">
								Tambahkan Galeri <ArrowRightIcon />
							</Link>
						</Button>
					</EmptyContent>
				</Empty>
			</CardContent>
		</Card>
	);
}
