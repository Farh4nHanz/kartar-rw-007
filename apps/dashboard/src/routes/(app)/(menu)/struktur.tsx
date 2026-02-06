import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/(menu)/struktur")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-full min-h-vh w-full space-y-8 overflow-x-auto p-5 pt-20">
			<hgroup className="space-y-1">
				<h1 className="font-bold font-heading text-2xl">Anggota Organisasi</h1>
				<h3 className="font-heading font-normal text-muted-foreground text-sm">
					Kelola anggota kepengurusan Karang Taruna RW 07 untuk periode
					tertentu.
				</h3>
			</hgroup>
		</div>
	);
}
