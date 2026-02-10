import z from "zod";

export const addMemberSchema = z.object({
	name: z.string().min(1, "Nama anggota wajib diisi."),
	position_id: z.string().min(1, "Pilih jabatan terlebih dahulu."),
	period_id: z.string().min(1, "Pilih periode terlebih dahulu."),
	photo: z
		.instanceof(File, { error: "Mohon upload foto anggota." })
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

export type AddMemberFormValues = z.infer<typeof addMemberSchema>;

export const editMemberSchema = z.object({
	name: z.string().min(1, "Nama anggota wajib diisi."),
	position_id: z.string().min(1, "Pilih jabatan terlebih dahulu."),
	period_id: z.string().min(1, "Pilih periode terlebih dahulu."),
	photo: z
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

export type EditMemberFormValues = z.infer<typeof editMemberSchema>;
