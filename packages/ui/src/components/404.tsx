import { Link } from "@tanstack/react-router";

export function NotFound() {
	return (
		<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="flex flex-col items-center justify-center text-center">
				<p className="font-semibold text-base text-blue-900">404</p>
				<h1 className="mt-4 text-balance font-semibold text-3xl text-gray-900 tracking-tight sm:text-5xl">
					Halaman Tidak Ditemukan
				</h1>
				<p className="mt-6 text-pretty font-medium text-gray-500 text-sm sm:text-base/8">
					Maaf, halaman yang Anda cari tidak ditemukan.
				</p>
				<Link
					to="/"
					className="mt-6 rounded-md bg-blue-900 px-3.5 py-2.5 font-semibold text-white text-xs shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-blue-900 focus-visible:outline-offset-2 sm:text-sm"
				>
					Pergi ke beranda
				</Link>
			</div>
		</main>
	);
}
