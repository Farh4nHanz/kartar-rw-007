import z from "zod";

export const positionSchema = z.object({
	name: z.string().min(1, "Nama jabatan wajib diisi."),
	description: z.string().min(1, "Deskripsi jabatan wajib diisi."),
	sort_order: z.number().min(1, "Urutan jabatan tidak boleh 0."),
	is_active: z.boolean(),
});

export type PositionFormValue = z.infer<typeof positionSchema>;
