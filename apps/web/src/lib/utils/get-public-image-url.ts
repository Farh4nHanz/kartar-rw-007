import { supabase } from "@/lib/supabase";

export function getPublicImageUrl(bucket: string, path?: string | null) {
	if (!path) return null;

	const { data } = supabase.storage.from(bucket).getPublicUrl(path);
	return data.publicUrl;
}
