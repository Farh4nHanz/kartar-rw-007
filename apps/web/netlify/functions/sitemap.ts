import type { Handler } from "@netlify/functions";
import { supabase } from "../../src/lib/supabase";

export const handler: Handler = async () => {
	const baseUrl = "https://karang-taruna-rw07.com";
	const now = new Date().toISOString();

	const [news, program, gallery] = await Promise.all([
		supabase.from("news").select("slug, updated_at"),
		supabase.from("programs").select("id, updated_at"),
		supabase.from("galleries").select("slug, updated_at"),
	]);

	const staticUrls = [
		{ path: "/", priority: "1.0" },
		{ path: "/tentang-kami", priority: "0.9" },
		{ path: "/struktur", priority: "0.9" },
		{ path: "/program", priority: "0.8" },
		{ path: "/berita", priority: "0.8" },
		{ path: "/galeri", priority: "0.8" },
		{ path: "/kolaborasi", priority: "0.7" },
		{ path: "/gabung", priority: "0.7" },
		{ path: "/kontak", priority: "0.7" },
	];

	const urls = [
		...staticUrls.map((item) => ({
			loc: `${baseUrl}${item.path}`,
			lastmod: now,
			priority: item.priority,
		})),
		...(news.data ?? []).map((item) => ({
			loc: `${baseUrl}/berita/${item.slug}/detail`,
			lastmod: new Date(item.updated_at).toISOString(),
			priority: "0.6",
		})),
		...(program.data ?? []).map((item) => ({
			loc: `${baseUrl}/program/${item.id}/detail`,
			lastmod: new Date(item.updated_at).toISOString(),
			priority: "0.6",
		})),
		...(gallery.data ?? []).map((item) => ({
			loc: `${baseUrl}/galeri/${item.slug}/detail`,
			lastmod: new Date(item.updated_at).toISOString(),
			priority: "0.6",
		})),
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <priority>${url.priority}</priority>
  </url>`,
	)
	.join("")}
</urlset>`;

	return {
		statusCode: 200,
		headers: {
			"Content-Type": "application/xml",
		},
		body: xml,
	};
};
