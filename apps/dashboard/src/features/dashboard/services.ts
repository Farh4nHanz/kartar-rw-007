import type { Tables } from "@workspace/supabase";
import { supabase } from "@workspace/supabase";
import { ApiError } from "@/shared/lib/api-error";

export type DashboardStatistics = {
	totalActiveMembers: number;
	totalPrograms: number;
	totalGalleries: number;
	totalNews: number;
};

export async function getDashboardStatistics(): Promise<DashboardStatistics> {
	const [membersResult, programsResult, galleriesResult, newsResult] =
		await Promise.all([
			supabase
				.from("organization_members")
				.select("id", { count: "exact", head: true })
				.eq("is_active", true),
			supabase.from("programs").select("id", { count: "exact", head: true }),
			supabase.from("galleries").select("id", { count: "exact", head: true }),
			supabase.from("news").select("id", { count: "exact", head: true }),
		]);

	const error =
		membersResult.error ||
		programsResult.error ||
		galleriesResult.error ||
		newsResult.error;

	if (error) throw new ApiError(error.message, error.code);

	return {
		totalActiveMembers: membersResult.count ?? 0,
		totalPrograms: programsResult.count ?? 0,
		totalGalleries: galleriesResult.count ?? 0,
		totalNews: newsResult.count ?? 0,
	};
	// await new Promise((r) => setTimeout(r, 1000));
	// return [];
}

export type RecentNews = Pick<Tables<"news">, "title" | "published_at"> & {
	categories: Pick<Tables<"categories">, "name">;
};

export async function getRecentNews(): Promise<RecentNews[]> {
	const res = await supabase
		.from("news")
		.select("title, published_at, categories(name)")
		.eq("is_published", true)
		.order("published_at", { ascending: false })
		.limit(5);

	if (res.error) throw new ApiError(res.error.message, res.error.code);

	return res.data ?? [];
	// await new Promise((r) => setTimeout(r, 1000));
	// return [];
}

export type RecentGalleries = Pick<
	Tables<"galleries">,
	"title" | "activity_date"
> & {
	gallery_images: Pick<Tables<"gallery_images">, "id">[];
};

export async function getRecentGalleries(): Promise<RecentGalleries[]> {
	const res = await supabase
		.from("galleries")
		.select("title, activity_date, gallery_images(id)", {
			count: "planned",
		})
		.order("activity_date", { ascending: false })
		.limit(5);

	if (res.error) throw new ApiError(res.error.message, res.error.code);

	return res.data ?? [];
	// await new Promise((r) => setTimeout(r, 1000));
	// return [];
}
