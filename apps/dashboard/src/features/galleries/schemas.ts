import slugify from "slugify";
import { z } from "zod";

export const addGallerySchema = z.object({
	title: z.string().min(1, "Mohon isi nama galeri."),
	slug: z.string().transform((val) =>
		slugify(val, {
			lower: true,
			strict: true,
			trim: true,
		}),
	),
	description: z.string().min(1, "Mohon isi deskripsi tentang galeri ini."),
	category_id: z.string().min(1, "Pilih kategori terlebih dahulu."),
	activity_date: z.string().min(1, "Mohon isi tanggal kegiatan."),
	images: z
		.array(
			z
				.instanceof(File, {
					error: "Mohon upload foto untuk galeri.",
				})
				.refine(
					(file) =>
						["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
							file.type,
						),
					"Format file hanya boleh jpg, jpeg, png, atau webp",
				)
				.refine(
					(file) => file.size <= 5 * 1024 * 1024,
					"Ukuran file tidak boleh lebih dari 5MB",
				),
		)
		.min(1, "Minimal upload 1 foto untuk galeri."),
});

export type AddGalleryFormValues = z.infer<typeof addGallerySchema>;

export const editGallerySchema = z.object({
	title: z.string().min(1, "Mohon isi nama galeri."),
	slug: z.string().transform((val) =>
		slugify(val, {
			lower: true,
			strict: true,
			trim: true,
		}),
	),
	description: z.string().min(1, "Mohon isi deskripsi tentang galeri ini."),
	category_id: z.string().min(1, "Pilih kategori terlebih dahulu."),
	activity_date: z.string().min(1, "Mohon isi tanggal kegiatan."),
});

const editGalleryImagesSchema = z.object({
	added_images: z
		.array(
			z
				.instanceof(File)
				.refine((file) =>
					["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
						file.type,
					),
				)
				.refine((file) => file.size <= 5 * 1024 * 1024),
		)
		.optional(),
	deleted_image_ids: z.array(z.string().uuid()).optional(),
});

export type EditGalleryFormValues = z.infer<typeof editGallerySchema> &
	z.infer<typeof editGalleryImagesSchema>;
