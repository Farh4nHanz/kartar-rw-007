import { createFileRoute, Navigate } from "@tanstack/react-router";
import { RouteComponentLoader } from "@workspace/ui/components/loader";
import LoginForm from "@/features/auth/components/login-form";
import { useAuth } from "@/features/auth/hooks/use-auth";

export const Route = createFileRoute("/(auth)/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const { loading, isLoggedIn } = useAuth();

	if (loading) return <RouteComponentLoader />;
	if (isLoggedIn) return <Navigate to="/" replace />;

	return (
		<div className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary/5 via-background to-accent/5 p-4">
			<div className="w-full max-w-md">
				{/* Logo & Title */}
				<div className="mb-8 text-center">
					<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg">
						<svg
							className="h-12 w-12 text-primary-foreground"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
					</div>
					<h1 className="mb-2 font-bold text-3xl text-foreground">
						Karang Taruna RW 07
					</h1>
					<p className="text-muted-foreground">Dashboard Admin</p>
				</div>

				{/* Login Form */}
				<LoginForm />
			</div>
		</div>
	);
}
