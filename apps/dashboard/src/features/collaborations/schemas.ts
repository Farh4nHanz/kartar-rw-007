import z from "zod";

export const collaborationSchema = z.object({
	partner_name: z.string().min(1, "Nama anggota wajib diisi."),
	category_id: z.string().min(1, "Pilih kategori terlebih dahulu."),
	description: z.string().min(1, "Mohon isi deskripsi terkait kolaborasi ini."),
	period_id: z.string().min(1, "Pilih periode terlebih dahulu."),
	logo: z
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

export type CollaborationFormValues = z.infer<typeof collaborationSchema>;
