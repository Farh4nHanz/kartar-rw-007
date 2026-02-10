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
import { addCollaborationMutationOptions } from "@/features/collaborations/hooks/mutation-options";
import { getAllCollaborationsQueryOptions } from "@/features/collaborations/hooks/query-options";
import {
	type CollaborationFormValues,
	collaborationSchema,
} from "@/features/collaborations/schemas";
import type { Period } from "@/features/periods/services";
import { useAppForm } from "@/shared/components/form/hooks";

export const AddCollaborationForm = memo(
	({
		categories,
		periods,
		onSuccess,
	}: {
		categories: Category[];
		periods: Period[];
		onSuccess?: () => void;
	}) => {
		const search = useSearch({
			from: "/(app)/(partnership)/kolaborasi",
		});

		const { mutateAsync } = useMutation(addCollaborationMutationOptions());

		const form = useAppForm({
			formId: "add-collaboration-form",
			defaultValues: {
				partner_name: "",
				description: "",
				category_id: "",
				period_id: "",
				logo: undefined as unknown as File,
			} satisfies CollaborationFormValues as CollaborationFormValues,
			validators: {
				onSubmit: collaborationSchema,
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
							queryKey: getAllCollaborationsQueryOptions(search).queryKey,
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
						{/* Collaboration name */}
						<form.AppField name="partner_name">
							{(field) => (
								<field.Input
									label="Nama Mitra"
									placeholder="Contoh: PT. Mitra Indonesia"
								/>
							)}
						</form.AppField>

						{/* Collaboration descripiton */}
						<form.AppField name="description">
							{(field) => (
								<field.Textarea
									label="Deskripsi"
									placeholder="Berikan deskripsi terkait kolaborasi ini..."
								/>
							)}
						</form.AppField>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{/* Collaboration category */}
							<form.AppField name="category_id">
								{(field) => (
									<field.Select
										label="Kategori"
										placeholder="Pilih kategori kemitraan"
									>
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

							{/* Collaboration period */}
							<form.AppField name="period_id">
								{(field) => (
									<field.Select
										label="Periode Kemitraan"
										placeholder="Pilih periode"
									>
										<SelectGroup>
											{periods.map((period) => (
												<SelectItem
													key={period.id}
													value={period.id}
													className="capitalize"
												>
													{period.name}
												</SelectItem>
											))}
										</SelectGroup>
									</field.Select>
								)}
							</form.AppField>
						</div>

						{/* Collaboration logo */}
						<form.AppField name="logo">
							{(field) => (
								<field.FileInput
									label="Logo Mitra"
									accept="image/*"
									description="Logo dari mitra yang bersangkutan (jika ada)."
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
