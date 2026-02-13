import { supabase } from "@/lib/supabase";
import { ApiError } from "@/shared/lib/api-error";

type LoginPayload = {
	email: string;
	password: string;
};

export async function login(payload: LoginPayload) {
	const { error, data } = await supabase.auth.signInWithPassword(payload);

	if (error) {
		if (error.message === "Invalid login credentials") {
			throw new ApiError("Email atau password salah.");
		}

		throw new ApiError(error.message, error.name);
	}

	return {
		success: true,
		message: "Login berhasil.",
		data,
	};
}

export async function logout(): Promise<void> {
	const { error } = await supabase.auth.signOut();
	if (error) throw new ApiError(error.message, error.code);
}
