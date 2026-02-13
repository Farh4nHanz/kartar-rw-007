import type { Tables } from "@workspace/supabase";
import { supabase } from "@/lib/supabase";
import { ApiError } from "@/shared/lib/api-error";
import type { SuccessResponseWithData } from "@/shared/types/api";

export type DashboardStatistics = {
	totalActiveMembers: number;
	totalPrograms: number;
	totalGalleries: number;
	totalNews: number;
};

export async function getDashboardStatistics(): Promise<
	SuccessResponseWithData<DashboardStatistics>
> {
	const [membersResult, programsResult, galleriesResult, newsResult] =
		await Promise.allSettled([
			supabase
				.from("organization_members")
				.select("id", { count: "exact", head: true })
				.eq("is_active", true),
			supabase.from("programs").select("id", { count: "exact", head: true }),
			supabase.from("galleries").select("id", { count: "exact", head: true }),
			supabase.from("news").select("id", { count: "exact", head: true }),
		]);

	if (
		membersResult.status === "rejected" ||
		programsResult.status === "rejected" ||
		galleriesResult.status === "rejected" ||
		newsResult.status === "rejected"
	)
		throw new ApiError("Gagal memuat data statistik.");

	return {
		success: true,
		message: "Data diambil dengan sukses",
		data: {
			totalActiveMembers: membersResult.value.count ?? 0,
			totalPrograms: programsResult.value.count ?? 0,
			totalGalleries: galleriesResult.value.count ?? 0,
			totalNews: newsResult.value.count ?? 0,
		},
	};
}

export type RecentNews = Pick<Tables<"news">, "title" | "published_at"> & {
	categories: Pick<Tables<"categories">, "name">;
};

export async function getRecentNews(): Promise<
	SuccessResponseWithData<RecentNews[]>
> {
	const { data, error } = await supabase
		.from("news")
		.select("title, published_at, categories(name)")
		.eq("is_published", true)
		.order("published_at", { ascending: false })
		.limit(5);

	if (error) throw new ApiError(error.message, error.code);

	return {
		success: true,
		message: "Data diambil dengan sukses",
		data,
	};
}

export type RecentGalleries = Pick<
	Tables<"galleries">,
	"title" | "activity_date"
> & {
	gallery_images: Pick<Tables<"gallery_images">, "id">[];
};

export async function getRecentGalleries(): Promise<
	SuccessResponseWithData<RecentGalleries[]>
> {
	const { data, error } = await supabase
		.from("galleries")
		.select("title, activity_date, gallery_images(id)", {
			count: "planned",
		})
		.order("activity_date", { ascending: false })
		.limit(5);

	if (error) throw new ApiError(error.message, error.code);

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data,
	};
}
