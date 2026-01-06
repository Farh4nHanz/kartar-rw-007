import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { organizationalStructure } from "@/data/mock";

export const Route = createFileRoute("/struktur")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-fit min-h-screen w-full bg-gray-50 py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-16 text-center">
					<h1 className="mb-4 font-bold text-5xl text-blue-900">
						Struktur Organisasi
					</h1>
					<p className="text-gray-600 text-lg">
						Kepengurusan Karang Taruna RW 007 Periode{" "}
						{organizationalStructure.period}
					</p>
				</div>

				{/* Organizational Member */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{organizationalStructure.structure.map((member) => (
						<Card
							key={member.name}
							className="rounded-lg transition-shadow duration-300 hover:shadow-lg"
						>
							<CardHeader className="pb-4 text-center">
								<div className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-blue-100">
									{member.photo ? (
										<img
											src={member.photo}
											alt={member.name}
											className="aspect-square h-full w-full rounded-full object-cover object-center"
										/>
									) : (
										<Users className="size-12 text-blue-900" />
									)}
								</div>
								<CardTitle className="font-semibold text-base text-blue-900">
									{member.name}
								</CardTitle>
							</CardHeader>
						</Card>
					))}
				</div>

				{/* Additional Info */}
				<Card className="mt-12 rounded-lg px-4">
					<CardHeader>
						<CardTitle className="font-semibold text-blue-900 text-xl">
							Informasi Kepengurusan
						</CardTitle>
					</CardHeader>

					<CardContent className="space-y-4 text-gray-700">
						<p className="text-base leading-relaxed">
							Struktur kepengurusan Karang Taruna RW 007 periode{" "}
							{organizationalStructure.period} dipilih melalui musyawarah
							anggota dan dirancang untuk mengoptimalkan pelaksanaan
							program-program organisasi.
						</p>
						<p className="text-base leading-relaxed">
							Setiap pengurus memiliki tugas dan tanggung jawab yang jelas dalam
							menjalankan fungsi organisasi, mulai dari perencanaan program,
							pelaksanaan kegiatan, hingga evaluasi dan pelaporan.
						</p>
						<p className="text-base leading-relaxed">
							Dengan struktur organisasi yang solid dan koordinasi yang baik,
							kami berkomitmen untuk memberikan kontribusi terbaik bagi
							pemberdayaan pemuda dan masyarakat di lingkungan RW 007.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
