import type { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Role = "admin" | "user" | null;

export function useAuth() {
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [role, setRole] = useState<Role>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadSession = async () => {
			const { data } = await supabase.auth.getSession();

			setSession(data.session);
			setUser(data.session?.user ?? null);

			if (data.session?.user) {
				const { data: profile } = await supabase
					.from("profiles")
					.select("role")
					.eq("id", data.session.user.id)
					.single();

				setRole((profile?.role as Role) ?? null);
			}

			setLoading(false);
		};

		loadSession();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session?.user ?? null);
		});

		return () => subscription.unsubscribe();
	}, []);

	return {
		session,
		user,
		role,
		loading,
		isLoggedIn: !!user,
		isAdmin: role === "admin",
	};
}
