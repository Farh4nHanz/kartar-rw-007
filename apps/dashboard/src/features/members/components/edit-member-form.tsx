import { useMutation } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { DialogClose, DialogFooter } from "@workspace/ui/components/dialog";
import { FieldGroup, FieldSet } from "@workspace/ui/components/field";
import { ComponentLoader } from "@workspace/ui/components/loader";
import { SelectGroup, SelectItem } from "@workspace/ui/components/select";
import { memo } from "react";
import { toast } from "sonner";
import { editMemberMutationOptions } from "@/features/members/hooks/mutation-options";
import { getAllMemberQueryOptions } from "@/features/members/hooks/query-options";
import {
	type EditMemberSchema,
	editMemberSchema,
	type Member,
} from "@/features/members/schemas";
import { useAppForm } from "@/shared/components/form/hooks";

const periods = ["2010-2015", "2015-2020", "2020-2025"];

export const EditMemberForm = memo(
	({ member, onSuccess }: { member: Member; onSuccess?: () => void }) => {
		const { mutateAsync } = useMutation(editMemberMutationOptions(member.id));

		const form = useAppForm({
			formId: "edit-member-form",
			defaultValues: {
				name: member.name,
				email: member.email,
				position: member.position,
				period_id: member.period.id,
				photo_path: undefined,
			} satisfies EditMemberSchema as EditMemberSchema,
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

						onSuccess?.();
						context.client.invalidateQueries({
							queryKey: getAllMemberQueryOptions().queryKey,
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
				encType="multipart/form-data"
				className="mt-5 w-full [&_input,textarea]:text-sm"
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<FieldSet>
					{/* Input */}
					<FieldGroup className="gap-5">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-[70fr_30fr]">
							{/* Member name */}
							<form.AppField name="name">
								{(field) => (
									<field.Input label="Nama Anggota" placeholder="Ahmad Zikri" />
								)}
							</form.AppField>

							{/* Member email */}
							<form.AppField name="email">
								{(field) => (
									<field.Input label="Email" placeholder="anggota@gmail.com" />
								)}
							</form.AppField>
						</div>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-[70fr_30fr]">
							{/* Member position */}
							<form.AppField name="position">
								{(field) => <field.Input label="Jabatan" placeholder="Ketua" />}
							</form.AppField>

							{/* Member period */}
							<form.AppField name="period_id">
								{(field) => (
									<field.Select
										label="Periode jabatan"
										placeholder="Pilih periode"
									>
										<SelectGroup>
											{periods.map((period) => (
												<SelectItem key={period} value={period}>
													{period}
												</SelectItem>
											))}
										</SelectGroup>
									</field.Select>
								)}
							</form.AppField>
						</div>

						{/* Member profile */}
						<form.AppField name="photo_path">
							{(field) => <field.FileInput label="Profil" accept="image/*" />}
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
										{isSubmitting ? <ComponentLoader /> : "Simpan Perubahan"}
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
