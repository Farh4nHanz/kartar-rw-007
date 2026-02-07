import z from "zod";

export const periodSchema = z.object({
	name: z.string().min(1, "Nama periode wajib diisi."),
	start_year: z.number().min(1, "Tahun mulai wajib diisi."),
	end_year: z.number().min(1, "Tahun selesai wajib diisi."),
	is_active: z.boolean(),
});

export type PeriodFormValue = z.infer<typeof periodSchema>;
