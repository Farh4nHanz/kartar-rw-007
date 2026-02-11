import { useRouter } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft, RotateCcw } from "lucide-react";

type ErrorComponentProps = {
	error: unknown;
	reset?: () => void;
};

export function RouteError({ error, reset }: ErrorComponentProps) {
	const router = useRouter();

	const handleBack = () => {
		window.history.back();
	};

	const handleRetry = () => {
		if (reset) {
			reset();
		} else {
			router.invalidate();
		}
	};

	const errorMessage =
		error instanceof Error
			? error.message
			: "Terjadi kesalahan saat memuat data.";

	return (
		<main className="grid h-full min-h-dvh place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="flex flex-col items-center justify-center text-center">
				<p className="font-semibold text-base text-red-700">Error</p>

				<h1 className="mt-4 text-balance font-semibold text-3xl text-gray-900 tracking-tight sm:text-5xl">
					Gagal Memuat Data
				</h1>

				<p className="mt-6 max-w-md text-pretty font-medium text-gray-500 text-sm sm:text-base/8">
					{errorMessage}
				</p>

				<div className="mt-8 flex gap-3">
					<Button
						variant="outline"
						onClick={handleBack}
						className="rounded-md px-3.5 py-2.5 font-semibold"
					>
						<ArrowLeft className="mr-2" />
						Kembali
					</Button>

					<Button
						onClick={handleRetry}
						className="rounded-md bg-primary px-3.5 py-2.5 font-semibold text-white shadow-xs hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
					>
						<RotateCcw className="mr-2" />
						Coba Lagi
					</Button>
				</div>
			</div>
		</main>
	);
}
