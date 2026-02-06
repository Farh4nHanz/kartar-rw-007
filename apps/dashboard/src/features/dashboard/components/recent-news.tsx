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
import { ArrowRightIcon, Newspaper } from "lucide-react";
import type { RecentNewsProps } from "@/features/dashboard/types";

export function RecentNews({ data }: RecentNewsProps) {
	return (
		<Card>
			<CardHeader className="font-semibold text-lg">Berita Terbaru</CardHeader>
			<CardContent className="space-y-3">
				{data.map((news) => (
					<div
						key={news.title}
						className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
					>
						<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
							<Newspaper size={20} className="text-primary" />
						</div>
						<div className="flex-1">
							<p className="truncate font-medium text-sm">{news.title}</p>
							<div className="mt-1 flex items-center gap-2">
								<small className="text-muted-foreground text-xs">
									{new Intl.DateTimeFormat("id-ID", {
										day: "numeric",
										month: "long",
										year: "numeric",
									}).format(
										new Date((news.published_at as string) || Date.now()),
									)}
								</small>
								<Badge className="bg-secondary px-2 py-0.5 text-xs">
									{news.categories.name}
								</Badge>
							</div>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}

export function RecentNewsSkeleton() {
	return (
		<Card>
			<CardHeader className="font-semibold text-lg">Berita Terbaru</CardHeader>
			<CardContent className="space-y-3">
				{Array.from({ length: 5 }, () => (
					<div
						key={Math.random() * 100}
						className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
					>
						<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
							<Newspaper size={20} className="text-primary" />
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

export function RecentNewsEmpty() {
	return (
		<Card>
			<CardHeader className="font-semibold text-lg">Berita Terbaru</CardHeader>
			<CardContent className="space-y-3">
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<Newspaper />
						</EmptyMedia>
						<EmptyTitle className="text-base">Belum Ada Berita</EmptyTitle>
						<EmptyDescription className="text-sm">
							Anda belum memiliki berita, silahkan buat berita terlebih dahulu.
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button
							variant="link"
							asChild
							className="text-muted-foreground hover:text-primary"
							size="sm"
						>
							<Link to="/berita">
								Buat Berita <ArrowRightIcon />
							</Link>
						</Button>
					</EmptyContent>
				</Empty>
			</CardContent>
		</Card>
	);
}
