import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { AlertTriangle, RefreshCcw } from "lucide-react";

function GalleryGrid({ children, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-center justify-center gap-5"
			{...props}
		>
			{children}
		</div>
	);
}

type GalleryGridErrorProps = {
	title?: string;
	message?: string;
	onRetry?: () => void;
};

function GalleryGridError({
	title = "Gagal memuat galeri",
	message = "Terjadi kesalahan saat mengambil data. Silakan coba lagi.",
	onRetry,
}: GalleryGridErrorProps) {
	return (
		<div className="grid min-h-75 place-items-center">
			<Card className="w-full max-w-md p-6 text-center">
				<div className="flex flex-col items-center gap-4">
					<div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
						<AlertTriangle className="h-7 w-7" />
					</div>

					<div className="space-y-1">
						<h3 className="font-semibold text-lg">{title}</h3>
						<p className="text-muted-foreground text-sm">{message}</p>
					</div>

					{onRetry && (
						<Button onClick={onRetry} className="mt-2 gap-2">
							<RefreshCcw className="h-4 w-4" />
							Coba lagi
						</Button>
					)}
				</div>
			</Card>
		</div>
	);
}

export { GalleryGrid, GalleryGridError };
