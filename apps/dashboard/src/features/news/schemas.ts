import slugify from "slugify";
import z from "zod";

export const addNewsSchema = z.object({
	title: z.string().min(1, "Judul berita wajib diisi."),
	slug: z.string().transform((val) =>
		slugify(val, {
			lower: true,
			strict: true,
			trim: true,
		}),
	),
	content: z.string().min(1, "Mohon isi konten berita."),
	excerpt: z.string().readonly(),
	category_id: z.string().min(1, "Silahkan pilih kategori."),
	is_published: z.boolean(),
	published_at: z.string().nullable(),
	thumbnail: z
		.instanceof(File, {
			error: "Silahkan upload thumbnail berita.",
		})
		.refine(
			(file) =>
				!file ||
				["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
					file.type,
				),
			"Format file hanya boleh jpg, jpeg, png, atau webp",
		)
		.refine(
			(file) => !file || file.size <= 5 * 1024 * 1024,
			"Ukuran file tidak boleh lebih dari 5MB",
		),
});

export type AddNewsFormValue = z.infer<typeof addNewsSchema>;

export const editNewsSchema = z.object({
	title: z.string().min(1, "Judul berita wajib diisi."),
	slug: z.string().transform((val) =>
		slugify(val, {
			lower: true,
			strict: true,
			trim: true,
		}),
	),
	content: z.string().min(1, "Mohon isi konten berita."),
	excerpt: z.string().readonly(),
	category_id: z.string().min(1, "Silahkan pilih kategori."),
	is_published: z.boolean(),
	published_at: z.string().nullable(),
	thumbnail: z
		.instanceof(File)
		.optional()
		.refine(
			(file) =>
				!file ||
				["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
					file.type,
				),
			"Format file hanya boleh jpg, jpeg, png, atau webp",
		)
		.refine(
			(file) => !file || file.size <= 5 * 1024 * 1024,
			"Ukuran file tidak boleh lebih dari 5MB",
		),
});

export type EditNewsFormValue = z.infer<typeof editNewsSchema>;
