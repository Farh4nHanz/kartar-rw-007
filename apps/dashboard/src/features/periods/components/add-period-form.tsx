import { useMutation } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { DialogClose, DialogFooter } from "@workspace/ui/components/dialog";
import { FieldGroup, FieldSet } from "@workspace/ui/components/field";
import { ComponentLoader } from "@workspace/ui/components/loader";
import { SelectGroup, SelectItem } from "@workspace/ui/components/select";
import { memo } from "react";
import { toast } from "sonner";
import { PERIODS_QUERY_KEYS } from "@/features/periods/constants";
import { addPeriodMutationOpions } from "@/features/periods/hooks/mutation-options";
import {
	type AddPeriodFormValue,
	addPeriodSchema,
} from "@/features/periods/schemas";
import { useAppForm } from "@/shared/components/form/hooks";

export const AddPeriodForm = memo(
	({ onSuccess }: { onSuccess?: () => void }) => {
		const { mutateAsync } = useMutation(addPeriodMutationOpions());

		const form = useAppForm({
			formId: "add-period-form",
			defaultValues: {
				name: "",
				start_year: 0,
				end_year: 0,
				is_active: false,
			} satisfies AddPeriodFormValue as AddPeriodFormValue,
			validators: {
				onSubmit: addPeriodSchema,
			},
			onSubmit: async ({ value }) => {
				const payload = {
					...value,
				};

				await mutateAsync(payload, {
					onSuccess: (res, _variables, _onMutateResult, context) => {
						toast.success(res.message, {
							duration: 5000,
							dismissible: true,
							closeButton: true,
						});

						onSuccess?.();
						context.client.invalidateQueries({
							queryKey: PERIODS_QUERY_KEYS.all,
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
						{/* Period name */}
						<form.AppField name="name">
							{(field) => (
								<field.Input
									label="Nama Periode"
									placeholder="Periode 2020-2025"
								/>
							)}
						</form.AppField>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{/* Period starts */}
							<form.AppField name="start_year">
								{(field) => (
									<field.InputNumber label="Tahun Mulai" placeholder="2020" />
								)}
							</form.AppField>

							{/* Period ends */}
							<form.AppField name="end_year">
								{(field) => (
									<field.InputNumber label="Tahun Selesai" placeholder="2025" />
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
