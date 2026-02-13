import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

interface SupabaseEnv {
	VITE_SUPABASE_URL: string;
	VITE_SUPABASE_PUBLISHABLE_KEY: string;
}

export const createSupabaseInstance = (env: SupabaseEnv) =>
	createClient<Database>(
		env.VITE_SUPABASE_URL,
		env.VITE_SUPABASE_PUBLISHABLE_KEY,
	);
