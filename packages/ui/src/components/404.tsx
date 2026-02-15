import { ArrowLeft } from "lucide-react";
import { Button } from "./button";

export function NotFound({ navigateTo }: { navigateTo?: string }) {
	const handleBack = () => {
		if (navigateTo) {
			window.location.href = navigateTo;
		} else {
			window.history.back();
		}
	};

	return (
		<main className="grid h-full min-h-dvh place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
			<div className="flex flex-col items-center justify-center text-center">
				<p className="font-semibold text-base text-primary">404</p>
				<h1 className="mt-4 text-balance font-semibold text-3xl text-foreground tracking-tight sm:text-5xl">
					Halaman Tidak Ditemukan
				</h1>
				<p className="mt-6 text-pretty font-medium text-muted-foreground text-sm sm:text-base/8">
					Maaf, halaman yang Anda cari tidak ditemukan.
				</p>
				<Button
					onClick={handleBack}
					className="mt-6 rounded-md bg-primary px-3.5 py-2.5 font-semibold text-white shadow-xs hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
				>
					<ArrowLeft />
					Kembali
				</Button>
			</div>
		</main>
	);
}
