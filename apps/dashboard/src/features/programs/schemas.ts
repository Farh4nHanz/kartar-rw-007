import z from "zod";

export const programSchema = z.object({
	title: z.string().min(1, "Judul program wajib diisi."),
	description: z.string().min(1, "Mohon isi deskripsi program."),
	category_id: z.string().min(1, "Silahkan pilih kategori."),
	schedule_type: z.string().min(1, "Silahkan pilih tipe program."),
	status: z.string().min(1, "Silahkan pilih status program."),
	is_active: z.boolean(),
});

export type ProgramFormValue = z.infer<typeof programSchema>;
