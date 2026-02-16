import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Info, Users } from "lucide-react";
import { useMemo } from "react";
import { getAllMembersQueryOptions } from "@/hooks/query-options";

export const Route = createFileRoute("/struktur")({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(getAllMembersQueryOptions()),
});

function RouteComponent() {
	const { data: members, isLoading: isMembersFetchLoading } = useQuery(
		getAllMembersQueryOptions(),
	);

	const getCurrentPeriod = useMemo(() => {
		if (members?.data.length && !isMembersFetchLoading) {
			const startYear = members?.data.at(0)?.period.start_year;
			const endYear = members?.data.at(0)?.period.end_year;

			return `${startYear}-${endYear}`;
		}

		return "";
	}, [members?.data, isMembersFetchLoading]);

	return (
		<main className="flex h-fit min-h-screen w-full justify-center bg-gray-50 py-16">
			<div className="container w-full px-6 py-2">
				{/* Header */}
				<div className="mb-16 text-center">
					<h1 className="mb-4 font-bold text-5xl text-blue-900">
						Struktur Organisasi
					</h1>
					<p className="text-gray-600 text-lg">
						Kepengurusan Karang Taruna RW 07 Periode {getCurrentPeriod}
					</p>
				</div>

				{/* Organizational Member */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{isMembersFetchLoading
						? Array.from({ length: 8 }, () => (
								<Card key={Math.random()} className="rounded-lg px-2 py-5">
									<CardHeader className="pb-4 text-center">
										{/* Avatar */}
										<div className="mx-auto mb-4 flex size-24 items-center justify-center">
											<Skeleton className="size-24 rounded-full" />
										</div>

										{/* Name */}
										<Skeleton className="mx-auto h-4 w-3/4" />

										{/* Position */}
										<Skeleton className="mx-auto mt-2 h-3 w-1/2" />
									</CardHeader>
								</Card>
							))
						: members?.data.map((member) => (
								<Card
									key={member.name}
									className="rounded-lg px-2 py-5 transition-shadow duration-300 hover:shadow-lg"
								>
									<CardHeader className="pb-4 text-center">
										<div className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-blue-100">
											{member.photo_url ? (
												<img
													src={member.photo_url}
													alt={member.name}
													className="aspect-square h-full w-full rounded-full object-cover object-center"
												/>
											) : (
												<Users className="size-12 text-blue-900" />
											)}
										</div>

										<CardTitle className="font-semibold text-base text-blue-900 capitalize">
											{member.name}
										</CardTitle>

										<CardDescription className="font-medium text-muted-foreground text-xs capitalize">
											{member.position.name}
										</CardDescription>
									</CardHeader>
								</Card>
							))}
				</div>

				{/* Additional Info */}
				<Card className="mt-12 rounded-lg px-2 py-5">
					<CardHeader>
						<CardTitle className="flex flex-no-wrap items-center gap-3 font-semibold text-blue-900 text-xl">
							<Info className="size-6 shrink-0" />
							Informasi Kepengurusan
						</CardTitle>
					</CardHeader>

					<CardContent className="space-y-4 text-gray-700">
						<p className="text-sm leading-relaxed">
							Struktur kepengurusan Karang Taruna RW 07 periode{" "}
							{getCurrentPeriod} dipilih melalui musyawarah anggota dan
							dirancang untuk mengoptimalkan pelaksanaan program-program
							organisasi. Setiap pengurus memiliki tugas dan tanggung jawab yang
							jelas dalam menjalankan fungsi organisasi, mulai dari perencanaan
							program, pelaksanaan kegiatan, hingga evaluasi dan pelaporan.
						</p>
						<p className="text-sm leading-relaxed">
							Dengan struktur organisasi yang solid dan koordinasi yang baik,
							kami berkomitmen untuk memberikan kontribusi terbaik bagi
							pemberdayaan pemuda dan masyarakat di lingkungan RW 07.
						</p>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
