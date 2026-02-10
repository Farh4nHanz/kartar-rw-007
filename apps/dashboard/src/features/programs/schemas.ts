import z from "zod";

export const programSchema = z.object({
	title: z.string().min(1, "Judul program wajib diisi."),
	description: z.string().min(1, "Mohon isi deskripsi program."),
	category_id: z.string().min(1, "Pilih kategori terlebih dahulu."),
	schedule_type: z.string().min(1, "Mohon pilih tipe dari program ini."),
	status: z.string().min(1, "Mohon pilih status dari program ini."),
	is_active: z.boolean(),
});

export type ProgramFormValue = z.infer<typeof programSchema>;
