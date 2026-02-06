import { z } from "zod";

export const memberSchema = z.object({
	id: z.uuidv4(),
	name: z.string(),
	email: z.email().optional(),
	position: z.string(),
	period: z.object({
		id: z.string(),
		start_year: z.number(),
		end_year: z.number(),
	}),
	photo_path: z.url(),
});

export type Member = z.infer<typeof memberSchema>;

export const editMemberSchema = z.object({
	name: z.string().min(1, "Nama wajib diisi."),
	email: z.email({ error: "Email tidak valid." }).optional(),
	position: z.string().min(1, "Jabatan wajib diisi."),
	period_id: z.string().min(1, "Periode wajib diisi."),
	photo_path: z
		.instanceof(File)
		.optional()
		.refine(
			(file) =>
				!file ||
				["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
					file.type,
				),
			"Gambar harus berformat jpg, jpeg, png, atau webp.",
		)
		.refine(
			(file) => !file || file.size <= 5 * 1024 * 1024,
			"Gambar tidak boleh lebih besar dari 5MB.",
		),
});

export type EditMemberSchema = z.infer<typeof editMemberSchema>;
