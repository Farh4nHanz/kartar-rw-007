import z from "zod";

export const categorySchema = z.object({
	name: z.string().min(1, "Nama kategori wajib diisi."),
	type: z.string().min(1, "Pilih tipe kategori terlebih dahulu."),
});

export type CategoryFormValue = z.infer<typeof categorySchema>;
