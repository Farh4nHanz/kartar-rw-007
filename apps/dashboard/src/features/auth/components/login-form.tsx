import { useNavigate } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { ComponentLoader } from "@workspace/ui/components/loader";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { login } from "@/features/auth/services";

export default function LoginForm() {
	const navigate = useNavigate();

	const [isLoginLoading, setIsLoginLoading] = useState(false);
	const [formValue, setFormValue] = useState({
		email: "",
		password: "",
	});

	const handleValueChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
			setFormValue({
				...formValue,
				[e.target.name]: e.target.value,
			}),
		[formValue],
	);

	const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setIsLoginLoading(true);

			await login({
				email: e.target.email.value,
				password: e.target.password.value,
			});

			navigate({ to: "/" });
		} catch (error) {
			console.log(error);
			if (error instanceof Error)
				toast.error(error.message, {
					duration: 5000,
					closeButton: true,
					dismissible: true,
				});
		} finally {
			setIsLoginLoading(false);

			setFormValue({
				email: "",
				password: "",
			});
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Selamat Datang</CardTitle>
				<CardDescription>Silahkan masuk untuk melanjutkan</CardDescription>
			</CardHeader>

			<CardContent>
				<form
					className="grid w-full gap-5 [&_input]:text-sm"
					onSubmit={handleLogin}
				>
					<FieldGroup className="mt-3 gap-5">
						{/* Email */}
						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<Input
								id="email"
								name="email"
								placeholder="Masukkan email"
								value={formValue.email}
								onChange={handleValueChange}
								required
							/>
						</Field>

						{/* Password */}
						<Field>
							<FieldLabel htmlFor="password">Password</FieldLabel>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="********"
								value={formValue.password}
								onChange={handleValueChange}
								minLength={8}
								required
							/>
						</Field>

						<Button className="w-full" type="submit" disabled={isLoginLoading}>
							{isLoginLoading ? <ComponentLoader /> : "Masuk"}
						</Button>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
