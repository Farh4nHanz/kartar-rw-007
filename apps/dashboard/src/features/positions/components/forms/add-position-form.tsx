import { useMutation } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { DialogClose, DialogFooter } from "@workspace/ui/components/dialog";
import { FieldGroup, FieldSet } from "@workspace/ui/components/field";
import { ComponentLoader } from "@workspace/ui/components/loader";
import { SelectGroup, SelectItem } from "@workspace/ui/components/select";
import { memo } from "react";
import { toast } from "sonner";
import { addPositionMutationOpions } from "@/features/positions/hooks/mutation-options";
import { getAllPositionsQueryOptions } from "@/features/positions/hooks/query-options";
import {
	type PositionFormValue,
	positionSchema,
} from "@/features/positions/schemas";
import { useAppForm } from "@/shared/components/form/hooks";

export const AddPositionForm = memo(
	({ onSuccess }: { onSuccess?: () => void }) => {
		const search = useSearch({
			from: "/(app)/(organization)/jabatan",
		});

		const { mutateAsync } = useMutation(addPositionMutationOpions());

		const form = useAppForm({
			formId: "add-position-form",
			defaultValues: {
				name: "",
				description: "",
				sort_order: 1,
				is_active: true,
			} satisfies PositionFormValue as PositionFormValue,
			validators: {
				onSubmit: positionSchema,
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
							queryKey: getAllPositionsQueryOptions(search).queryKey,
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
						{/* Position name */}
						<form.AppField name="name">
							{(field) => (
								<field.Input label="Nama Jabatan" placeholder="Ketua" />
							)}
						</form.AppField>

						{/* Position description */}
						<form.AppField name="description">
							{(field) => (
								<field.Textarea
									label="Deskripsi Jabatan"
									placeholder="Ketua organisasi"
								/>
							)}
						</form.AppField>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{/* Position order */}
							<form.AppField name="sort_order">
								{(field) => (
									<field.InputNumber
										label="Tingkat Jabatan"
										placeholder="1"
										description="Menentukan tingkatan jabatan menurut hierarki organisasi. Misalnya, Ketua = 1, Wakil Ketua = 2."
									/>
								)}
							</form.AppField>

							{/* Position status */}
							<form.AppField name="is_active">
								{(field) => (
									<field.Select
										label="Status Jabatan"
										placeholder="Pilih status jabatan"
										stringifyValue={(v) => String(v)}
										parseValue={(s) => s === "true"}
									>
										<SelectGroup>
											{[
												{ id: true, label: "aktif" },
												{ id: false, label: "tidak aktif" },
											].map((position) => (
												<SelectItem
													key={position.label}
													value={String(position.id)}
													className="capitalize"
												>
													{position.label}
												</SelectItem>
											))}
										</SelectGroup>
									</field.Select>
								)}
							</form.AppField>
						</div>
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
