import { env } from "@workspace/env";
import { createSupabaseInstance } from "@workspace/supabase";

export const supabase = createSupabaseInstance(env);
