import z from "zod";

export const periodSchema = z.object({
	name: z.string().min(1, "Nama periode wajib diisi."),
	start_year: z.number().min(1, "Tahun mulai tidak boleh 0."),
	end_year: z.number().min(1, "Tahun selesai tidak boleh 0."),
	is_active: z.boolean(),
});

export type PeriodFormValue = z.infer<typeof periodSchema>;
