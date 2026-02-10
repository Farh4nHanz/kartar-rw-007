import { useMutation } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { DialogClose, DialogFooter } from "@workspace/ui/components/dialog";
import { FieldGroup, FieldSet } from "@workspace/ui/components/field";
import { ComponentLoader } from "@workspace/ui/components/loader";
import { SelectGroup, SelectItem } from "@workspace/ui/components/select";
import { memo } from "react";
import { toast } from "sonner";
import { updateMemberByIdMutationOptions } from "@/features/members/hooks/mutation-options";
import { getAllMembersQueryOptions } from "@/features/members/hooks/query-options";
import {
	type EditMemberFormValues,
	editMemberSchema,
} from "@/features/members/schemas";
import type { Member } from "@/features/members/services";
import type { Period } from "@/features/periods/services";
import type { Position } from "@/features/positions/services";
import { useAppForm } from "@/shared/components/form/hooks";

export const EditMemberForm = memo(
	({
		selectedData,
		positionsData,
		periodsData,
		onSuccess,
	}: {
		selectedData: Member;
		positionsData: Position[];
		periodsData: Period[];
		onSuccess?: () => void;
	}) => {
		const search = useSearch({
			from: "/(app)/(organization)/anggota",
		});

		const { mutateAsync } = useMutation(
			updateMemberByIdMutationOptions(selectedData.id),
		);

		const form = useAppForm({
			formId: "edit-member-form",
			defaultValues: {
				name: selectedData.name,
				position_id: selectedData.positions.id,
				period_id: selectedData.periods.id,
				photo: undefined,
			} satisfies EditMemberFormValues as EditMemberFormValues,
			validators: {
				onSubmit: editMemberSchema,
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
						{/* Member name */}
						<form.AppField name="name">
							{(field) => (
								<field.Input
									label="Nama Anggota"
									placeholder="Nama lengkap anggota"
								/>
							)}
						</form.AppField>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{/* Member position */}
							<form.AppField name="position_id">
								{(field) => (
									<field.Select label="Jabatan" placeholder="Pilih jabatan">
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
										label="Periode Anggota"
										placeholder="Pilih periode"
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
							{(field) => <field.FileInput label="Foto" accept="image/*" />}
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
