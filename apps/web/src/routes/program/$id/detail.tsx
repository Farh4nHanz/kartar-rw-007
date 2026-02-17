import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "@workspace/ui/components/404";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowLeft, Calendar, CheckCircle, XCircle } from "lucide-react";
import { getProgramByIdQueryOptions } from "@/hooks/query-options";
import { useSEO } from "@/hooks/use-seo";

export const Route = createFileRoute("/program/$id/detail")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { data: program, isLoading: isProgramFetchLoading } = useQuery(
		getProgramByIdQueryOptions(id),
	);

	useSEO({
		title: `${program?.data.title} | Karang Taruna RW 07`,
		description: program?.data.description,
	});

	if (isProgramFetchLoading) return <ProgramDetailSkeleton />;
	if (!program?.data) return <NotFound />;

	return (
		<main className="flex h-fit min-h-screen w-full justify-center bg-gray-50">
			<section className="container mx-auto px-4 py-10">
				{/* Back button */}
				<Button
					variant="ghost"
					className="mb-6 gap-2 text-blue-900"
					onClick={() => window.history.back()}
				>
					<ArrowLeft className="size-4" />
					Kembali
				</Button>

				{/* Header */}
				<div className="mb-6 space-y-4">
					<div className="flex flex-wrap items-center gap-3">
						<Badge className="bg-blue-100 text-blue-900 capitalize hover:bg-blue-100">
							{program.data.category.name}
						</Badge>

						<span
							className={cn(
								"flex items-center gap-1 rounded-full px-3 py-1 font-medium text-xs capitalize",
								program.data.status.toLowerCase() === "rutin"
									? "bg-green-100 text-green-800"
									: "bg-yellow-100 text-yellow-800",
							)}
						>
							<Calendar className="size-3" />
							{program.data.status}
						</span>

						<span
							className={cn(
								"flex items-center gap-1 rounded-full px-3 py-1 font-medium text-xs",
								program.data.is_active
									? "bg-blue-100 text-blue-900"
									: "bg-gray-100 text-gray-600",
							)}
						>
							{program.data.is_active ? (
								<CheckCircle className="size-3" />
							) : (
								<XCircle className="size-3" />
							)}
							{program.data.is_active ? "Aktif" : "Tidak Aktif"}
						</span>
					</div>

					<h1 className="font-bold text-3xl text-blue-900 capitalize leading-tight md:text-4xl">
						{program.data.title}
					</h1>

					<p className="flex items-center gap-2 text-muted-foreground text-sm capitalize">
						<Calendar className="size-4" />
						{program.data.schedule_type}
					</p>
				</div>

				{/* Content */}
				<Card>
					<CardHeader>
						<CardTitle>Terkait Program Ini</CardTitle>
					</CardHeader>
					<CardContent className="prose prose-blue max-w-none py-4">
						<p className="whitespace-pre-line first-letter:capitalize">
							{program.data.description}
						</p>
					</CardContent>
				</Card>
			</section>
		</main>
	);
}

function ProgramDetailSkeleton() {
	return (
		<section className="container mx-auto px-4 py-10">
			{/* Back button */}
			<Button variant="ghost" className="mb-6 gap-2 text-blue-900" disabled>
				<ArrowLeft className="size-4" />
				Kembali
			</Button>

			{/* Header */}
			<div className="mb-6 space-y-4">
				{/* Badges */}
				<div className="flex flex-wrap items-center gap-3">
					<Skeleton className="h-6 w-24 rounded-full" />
					<Skeleton className="h-6 w-20 rounded-full" />
					<Skeleton className="h-6 w-24 rounded-full" />
				</div>

				{/* Title */}
				<div className="space-y-2">
					<Skeleton className="h-8 w-3/4" />
					<Skeleton className="h-8 w-1/2" />
				</div>

				{/* Schedule */}
				<div className="flex items-center gap-2">
					<Skeleton className="h-4 w-4 rounded-full" />
					<Skeleton className="h-4 w-40" />
				</div>
			</div>

			{/* Content */}
			<Card>
				<CardHeader>
					<CardTitle>
						<Skeleton className="h-5 w-56" />
					</CardTitle>
				</CardHeader>

				<CardContent className="space-y-3 py-4">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-11/12" />
					<Skeleton className="h-4 w-10/12" />
					<Skeleton className="h-4 w-9/12" />
				</CardContent>
			</Card>
		</section>
	);
}
