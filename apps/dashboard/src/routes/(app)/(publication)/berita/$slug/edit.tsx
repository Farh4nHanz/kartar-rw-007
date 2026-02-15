import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { getAllCategoriesQueryOptions } from "@/features/categories/hooks/query-options";
import { EditNewsForm } from "@/features/news/components/forms/edit-news-form";
import { getNewsDetailBySlugQueryOptions } from "@/features/news/hooks/query-options";

export const Route = createFileRoute("/(app)/(publication)/berita/$slug/edit")({
	component: RouteComponent,
	loader: ({ context: { queryClient }, params: { slug } }) => {
		queryClient.ensureQueryData(
			getAllCategoriesQueryOptions({ type: "berita" }),
		);
		queryClient.ensureQueryData(getNewsDetailBySlugQueryOptions(slug));
	},
});

function RouteComponent() {
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

				<hgroup className="space-y-1">
					<h1 className="font-bold text-2xl">Edit Berita</h1>
					<h3 className="text-muted-foreground text-sm">
						Ubah, simpan ke dalam draft atau publikasikan berita atau informasi.
					</h3>
				</hgroup>
			</div>

			<EditNewsForm />
		</div>
	);
}
