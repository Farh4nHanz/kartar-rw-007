import { useMutation } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { DialogClose, DialogFooter } from "@workspace/ui/components/dialog";
import { FieldGroup, FieldSet } from "@workspace/ui/components/field";
import { ComponentLoader } from "@workspace/ui/components/loader";
import { SelectGroup, SelectItem } from "@workspace/ui/components/select";
import { memo } from "react";
import { toast } from "sonner";
import { addNewProgramMutationOptions } from "@/features/programs/hooks/mutation-options";
import { getAllProgramsQueryOptions } from "@/features/programs/hooks/query-options";
import {
	type ProgramFormValue,
	programSchema,
} from "@/features/programs/schemas";
import { useAppForm } from "@/shared/components/form/hooks";

export const AddProgramForm = memo(
	({ onSuccess }: { onSuccess?: () => void }) => {
		const search = useSearch({
			from: "/(app)/(publication)/program",
		});

		const { mutateAsync } = useMutation(addNewProgramMutationOptions());

		const types = ["galeri", "program", "berita", "kolaborasi"] as const;

		const form = useAppForm({
			formId: "add-program-form",
			defaultValues: {
				name: "",
				type: "",
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
						<form.AppField name="name">
							{(field) => (
								<field.Input label="Nama Kategori" placeholder="Sosial" />
							)}
						</form.AppField>

						{/* Program type */}
						<form.AppField name="type">
							{(field) => (
								<field.Select label="Tipe Kategori" placeholder="Pilih tipe">
									<SelectGroup>
										{types.map((type) => (
											<SelectItem
												key={type}
												value={type}
												className="capitalize"
											>
												{type}
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
