import { useMutation } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { DialogClose, DialogFooter } from "@workspace/ui/components/dialog";
import { FieldGroup, FieldSet } from "@workspace/ui/components/field";
import { ComponentLoader } from "@workspace/ui/components/loader";
import { SelectGroup, SelectItem } from "@workspace/ui/components/select";
import { memo } from "react";
import { toast } from "sonner";
import type { Category } from "@/features/categories/services";
import { addNewProgramMutationOptions } from "@/features/programs/hooks/mutation-options";
import { getAllProgramsQueryOptions } from "@/features/programs/hooks/query-options";
import {
	type ProgramFormValue,
	programSchema,
} from "@/features/programs/schemas";
import { useAppForm } from "@/shared/components/form/hooks";

export const AddProgramForm = memo(
	({
		categories,
		onSuccess,
	}: {
		categories: Category[];
		onSuccess?: () => void;
	}) => {
		const search = useSearch({
			from: "/(app)/(publication)/program",
		});

		const { mutateAsync } = useMutation(addNewProgramMutationOptions());

		const schedule_types = [
			"harian",
			"mingguan",
			"bulanan",
			"tahunan",
		] as const;

		const statuses = ["rutin", "insidental"] as const;

		const form = useAppForm({
			formId: "add-program-form",
			defaultValues: {
				title: "",
				description: "",
				category_id: "",
				schedule_type: "",
				status: "",
				is_active: false,
			} satisfies ProgramFormValue as ProgramFormValue,
			validators: {
				onSubmit: programSchema,
			},
			onSubmit: async ({ value }) => {
				await mutateAsync(value, {
					onSuccess: (res, _variables, _onMutateResult, context) => {
						toast.success(res.message, {
							duration: 5000,
							dismissible: true,
							closeButton: true,
						});

						form.reset();
						onSuccess?.();
						context.client.invalidateQueries({
							queryKey: getAllProgramsQueryOptions(search).queryKey,
						});
					},
					onError: (res) => {
						toast.error(res.message, {
							duration: 5000,
							dismissible: true,
							closeButton: true,
						});
					},
				});
			},
		});

		return (
			<form
				className="mt-5 w-full [&_input,textarea]:text-sm"
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<FieldSet>
					{/* Input */}
					<FieldGroup className="gap-5">
						{/* Program name */}
						<form.AppField name="title">
							{(field) => <field.Input label="Nama" placeholder="Keja Bakti" />}
						</form.AppField>

						{/* Program description */}
						<form.AppField name="description">
							{(field) => (
								<field.Textarea
									label="Deskripsi"
									placeholder="Berikan deskripsi singkat mengenai program atau kegiatan ini."
								/>
							)}
						</form.AppField>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{/* Program category */}
							<form.AppField name="category_id">
								{(field) => (
									<field.Select label="Kategori" placeholder="Kategori">
										<SelectGroup>
											{categories.map((category) => (
												<SelectItem
													key={category.id}
													value={category.id}
													className="capitalize"
												>
													{category.name}
												</SelectItem>
											))}
										</SelectGroup>
									</field.Select>
								)}
							</form.AppField>

							{/* Program schedule */}
							<form.AppField name="schedule_type">
								{(field) => (
									<field.Select label="Jadwal" placeholder="Jadwal">
										<SelectGroup>
											{schedule_types.map((schedule) => (
												<SelectItem
													key={schedule}
													value={schedule}
													className="capitalize"
												>
													{schedule}
												</SelectItem>
											))}
										</SelectGroup>
									</field.Select>
								)}
							</form.AppField>
						</div>

						{/* Program status */}
						<form.AppField name="status">
							{(field) => (
								<field.Select
									label="Status Pelaksanaan"
									placeholder="Status"
									description="Tentukan seberapa sering program atau kegiatan ini dilaksanakan."
								>
									<SelectGroup>
										{statuses.map((status) => (
											<SelectItem
												key={status}
												value={status}
												className="capitalize"
											>
												{status}
											</SelectItem>
										))}
									</SelectGroup>
								</field.Select>
							)}
						</form.AppField>

						{/* Program active status */}
						<form.AppField name="is_active">
							{(field) => (
								<field.Checkbox
									label="Jadikan aktif"
									description="Dengan mencentang kotak ini, status keaktifan program atau kegiatan akan ditetapkan sebagai aktif."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					{/* Submit and cancel buttons */}
					<DialogFooter>
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<>
									<DialogClose asChild>
										<Button type="button" variant="destructive">
											Batal
										</Button>
									</DialogClose>
									<Button type="submit" disabled={!canSubmit || isSubmitting}>
										{isSubmitting ? <ComponentLoader /> : "Tambah"}
									</Button>
								</>
							)}
						/>
					</DialogFooter>
				</FieldSet>
			</form>
		);
	},
);
