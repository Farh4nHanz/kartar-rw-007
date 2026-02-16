import { useMutation } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { DialogClose, DialogFooter } from "@workspace/ui/components/dialog";
import { FieldGroup, FieldSet } from "@workspace/ui/components/field";
import { ComponentLoader } from "@workspace/ui/components/loader";
import { SelectGroup, SelectItem } from "@workspace/ui/components/select";
import { memo } from "react";
import { toast } from "sonner";
import { updatePeriodByIdMutationOptions } from "@/features/periods/hooks/mutation-options";
import { getAllPeriodsQueryOptions } from "@/features/periods/hooks/query-options";
import { type PeriodFormValue, periodSchema } from "@/features/periods/schemas";
import type { Period } from "@/features/periods/services";
import { useAppForm } from "@/shared/components/form/hooks";

export const EditPeriodForm = memo(
	({
		selectedData,
		onSuccess,
	}: {
		selectedData: Period;
		onSuccess?: () => void;
	}) => {
		const search = useSearch({
			from: "/(app)/(organization)/periode",
		});

		const { mutateAsync } = useMutation(
			updatePeriodByIdMutationOptions(selectedData.id),
		);

		const form = useAppForm({
			formId: "edit-period-form",
			defaultValues: {
				name: selectedData.name,
				start_year: selectedData.start_year,
				end_year: selectedData.end_year,
				is_active: selectedData.is_active,
			} satisfies PeriodFormValue as PeriodFormValue,
			validators: {
				onSubmit: periodSchema,
			},
			onSubmit: async ({ value }) => {
				await mutateAsync(
					{ ...value, name: value.name.toLowerCase() },
					{
						onSuccess: (res, _variables, _onMutateResult, context) => {
							toast.success(res.message, {
								duration: 5000,
								dismissible: true,
								closeButton: true,
							});

							form.reset();
							onSuccess?.();
							context.client.invalidateQueries({
								queryKey: getAllPeriodsQueryOptions(search).queryKey,
							});
						},
						onError: (res) => {
							toast.error(res.message, {
								duration: 5000,
								dismissible: true,
								closeButton: true,
							});
						},
					},
				);
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
						{/* Period name */}
						<form.AppField name="name">
							{(field) => (
								<field.Input
									label="Nama Periode"
									placeholder="Contoh: Periode 2020-2025"
									data-required
								/>
							)}
						</form.AppField>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{/* Period starts */}
							<form.AppField name="start_year">
								{(field) => (
									<field.InputNumber label="Tahun Mulai" data-required />
								)}
							</form.AppField>

							{/* Period ends */}
							<form.AppField name="end_year">
								{(field) => (
									<field.InputNumber label="Tahun Selesai" data-required />
								)}
							</form.AppField>
						</div>

						{/* Period status */}
						<form.AppField name="is_active">
							{(field) => (
								<field.Select
									label="Status Periode"
									placeholder="Pilih status periode"
									stringifyValue={(v) => String(v)}
									parseValue={(s) => s === "true"}
									data-required
								>
									<SelectGroup>
										{[
											{ id: true, label: "aktif" },
											{ id: false, label: "tidak aktif" },
										].map((period) => (
											<SelectItem
												key={period.label}
												value={String(period.id)}
												className="capitalize"
											>
												{period.label}
											</SelectItem>
										))}
									</SelectGroup>
								</field.Select>
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
										{isSubmitting ? <ComponentLoader /> : "Simpan"}
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
