import type { Tables } from "@workspace/supabase/database.types";
import { supabase } from "@workspace/supabase/supabase";
import { getPublicImageUrl } from "@/lib/utils/get-public-image-url";
import type { SuccessResponseWithData } from "@/types/api";

export type News = Omit<
	Tables<"news">,
	"category_id" | "image_path" | "created_at" | "updated_at"
> & {
	category: Pick<Tables<"categories">, "id" | "name" | "type">;
	thumbnail_url: string | null;
};

const BUCKET_NAME = "news";

export async function getAllNews(): Promise<SuccessResponseWithData<News[]>> {
	const { data, error } = await supabase
		.from("news")
		.select(
			`
				id,
				title,
				slug,
				content,
				excerpt,
				is_published,
				published_at,
				image_path,
				category:categories(
					id,
					name,
					type
				)
			`,
		)
		.order("created_at", { ascending: true });

	if (error) throw new Error("Gagal mengambil data berita.");

	const newsData: News[] = data.map((news) => ({
		id: news.id,
		title: news.title,
		slug: news.slug,
		category: news.category,
		excerpt: news.excerpt,
		content: news.content,
		is_published: news.is_published,
		published_at: news.published_at,
		thumbnail_url: getPublicImageUrl(BUCKET_NAME, news.image_path),
	}));

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data: newsData,
	};
}

export async function getLatestNews(): Promise<
	SuccessResponseWithData<News[]>
> {
	const { data, error } = await supabase
		.from("news")
		.select(
			`
				id,
				title,
				slug,
				content,
				excerpt,
				is_published,
				published_at,
				image_path,
				category:categories(
					id,
					name,
					type
				)
			`,
		)
		.limit(3);

	if (error) throw new Error("Gagal mengambil data berita.");

	const newsData: News[] = data.map((news) => ({
		id: news.id,
		title: news.title,
		slug: news.slug,
		category: news.category,
		excerpt: news.excerpt,
		content: news.content,
		is_published: news.is_published,
		published_at: news.published_at,
		thumbnail_url: getPublicImageUrl(BUCKET_NAME, news.image_path),
	}));

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data: newsData,
	};
}

export async function getNewsDetailBySlug(
	slug: string,
): Promise<SuccessResponseWithData<News>> {
	const { data, error } = await supabase
		.from("news")
		.select(
			`
				id,
				title,
				slug,
				content,
				excerpt,
				is_published,
				published_at,
				image_path,
				category:categories(
					id,
					name,
					type
				)
			`,
		)
		.eq("slug", slug)
		.single();

	if (error) throw new Error("Gagal mengambil data berita.");

	const newsData: News = {
		id: data.id,
		title: data.title,
		slug: data.slug,
		category: data.category,
		excerpt: data.excerpt,
		content: data.content,
		is_published: data.is_published,
		published_at: data.published_at,
		thumbnail_url: data.image_path
			? getPublicImageUrl(BUCKET_NAME, data.image_path)
			: null,
	};

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data: newsData,
	};
}
