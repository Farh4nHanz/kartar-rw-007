import { env } from "@workspace/env";
import { createSupabaseInstance } from "@workspace/supabase/supabase";

export const supabase = createSupabaseInstance(env);
