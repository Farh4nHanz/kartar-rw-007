import { useMutation } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { DialogClose, DialogFooter } from "@workspace/ui/components/dialog";
import { FieldGroup, FieldSet } from "@workspace/ui/components/field";
import { ComponentLoader } from "@workspace/ui/components/loader";
import { SelectGroup, SelectItem } from "@workspace/ui/components/select";
import { memo } from "react";
import { toast } from "sonner";
import { addMemberMutationOptions } from "@/features/members/hooks/mutation-options";
import { getAllMembersQueryOptions } from "@/features/members/hooks/query-options";
import {
	type AddMemberFormValues,
	addMemberSchema,
} from "@/features/members/schemas";
import type { Period } from "@/features/periods/services";
import type { Position } from "@/features/positions/services";
import { useAppForm } from "@/shared/components/form/hooks";

export const AddMemberForm = memo(
	({
		positionsData,
		periodsData,
		onSuccess,
	}: {
		positionsData: Position[];
		periodsData: Period[];
		onSuccess?: () => void;
	}) => {
		const search = useSearch({
			from: "/(app)/(organization)/anggota",
		});

		const { mutateAsync } = useMutation(addMemberMutationOptions());

		const form = useAppForm({
			formId: "add-member-form",
			defaultValues: {
				name: "",
				position_id: "",
				period_id: "",
				photo: undefined as unknown as File,
			} satisfies AddMemberFormValues as AddMemberFormValues,
			validators: {
				onSubmit: addMemberSchema,
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
								queryKey: getAllMembersQueryOptions(search).queryKey,
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
						{/* Member name */}
						<form.AppField name="name">
							{(field) => (
								<field.Input
									label="Nama Lengkap Anggota"
									placeholder="Contoh: Budi Santoso"
									data-required
								/>
							)}
						</form.AppField>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{/* Member position */}
							<form.AppField name="position_id">
								{(field) => (
									<field.Select
										label="Jabatan"
										placeholder="Pilih jabatan"
										data-required
									>
										<SelectGroup>
											{positionsData.map((position) => (
												<SelectItem
													key={position.id}
													value={position.id}
													className="capitalize"
												>
													{position.name}
												</SelectItem>
											))}
										</SelectGroup>
									</field.Select>
								)}
							</form.AppField>

							{/* Member period */}
							<form.AppField name="period_id">
								{(field) => (
									<field.Select
										label="Periode Keanggotaan"
										placeholder="Pilih periode"
										data-required
									>
										<SelectGroup>
											{periodsData.map((period) => (
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

						{/* Member photo */}
						<form.AppField name="photo">
							{(field) => (
								<field.FileInput label="Foto" accept="image/*" data-required />
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
