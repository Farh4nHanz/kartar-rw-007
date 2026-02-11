import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { FieldGroup, FieldSet } from "@workspace/ui/components/field";
import { ComponentLoader } from "@workspace/ui/components/loader";
import { SelectGroup, SelectItem } from "@workspace/ui/components/select";
import { cn } from "@workspace/ui/lib/utils";
import { memo } from "react";
import { toast } from "sonner";
import type { Category } from "@/features/categories/services";
import { addGalleryMutationOptions } from "@/features/galleries/hooks/mutation-options";
import { getAllGalleriesQueryOptions } from "@/features/galleries/hooks/query-options";
import {
	type AddGalleryFormValues,
	addGallerySchema,
} from "@/features/galleries/schemas";
import { useAppForm } from "@/shared/components/form/hooks";

export const AddGalleryForm = memo(
	({
		isLoading,
		categories,
	}: {
		isLoading: boolean;
		categories: Category[];
	}) => {
		const navigate = useNavigate({
			from: "/galeri/new",
		});

		const search = useSearch({
			from: "/(app)/(publication)/galeri/new",
		});

		const { mutateAsync } = useMutation(addGalleryMutationOptions());

		const form = useAppForm({
			formId: "add-gallery-form",
			defaultValues: {
				title: "",
				description: "",
				category_id: "",
				activity_date: "",
				images: [],
			} satisfies AddGalleryFormValues as AddGalleryFormValues,
			validators: {
				onSubmit: addGallerySchema,
			},
			onSubmit: async ({ value }) => {
				const payload = {
					...value,
					activity_date: new Date(value.activity_date).toISOString(),
				};

				await mutateAsync(payload, {
					onSuccess: (res, _variables, _onMutateResult, context) => {
						toast.success(res.message, {
							duration: 5000,
							dismissible: true,
							closeButton: true,
						});
						console.log(payload);

						form.reset();

						context.client.invalidateQueries({
							queryKey: getAllGalleriesQueryOptions(search).queryKey,
						});

						navigate({ to: "/galeri", replace: true });
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

		if (isLoading) {
			return <ComponentLoader />;
		}

		return (
			<form
				encType="multipart/form-data"
				className="grid w-full gap-5 [&_input,textarea]:text-sm"
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<Card>
					<CardContent>
						<FieldSet>
							{/* Input */}
							<FieldGroup className="gap-5">
								{/* Gallery title */}
								<form.AppField name="title">
									{(field) => (
										<field.Input
											label="Nama Galeri"
											placeholder="Contoh: Kegiatan Bersih-Bersih Lingkungan"
										/>
									)}
								</form.AppField>

								{/* Gallery Activity Date */}
								<form.AppField name="activity_date">
									{(field) => <field.DatePicker label="Tanggal Kegiatan" />}
								</form.AppField>

								{/* Gallery descripiton */}
								<form.AppField name="description">
									{(field) => (
										<field.Textarea
											label="Deskripsi"
											placeholder="Berikan deskripsi terkait galeri ini..."
										/>
									)}
								</form.AppField>

								{/* Gallery category */}
								<form.AppField name="category_id">
									{(field) => (
										<field.Select
											label="Kategori"
											placeholder="Pilih kategori galeri"
										>
											<SelectGroup>
												{categories?.map((category) => (
													<SelectItem
														key={category.id}
														value={category.id}
														className={cn(
															"capitalize",
															!categories.length &&
																"text-muted-foreground italic",
														)}
														disabled={!categories.length}
													>
														{categories.length
															? category.name
															: "Tidak ada kategori."}
													</SelectItem>
												))}
											</SelectGroup>
										</field.Select>
									)}
								</form.AppField>
							</FieldGroup>
						</FieldSet>
					</CardContent>
				</Card>

				{/* Gallery images upload */}
				<Card>
					<CardContent>
						<form.AppField name="images">
							{(field) => <field.MultipleFileUpload label="Upload Foto" />}
						</form.AppField>
					</CardContent>
				</Card>

				{/* Submit and cancel buttons */}
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
					children={([canSubmit, isSubmitting]) => (
						<div className="flex items-start justify-end gap-2">
							<Button
								type="button"
								variant="destructive"
								onClick={() => navigate({ to: "/galeri", replace: true })}
							>
								Batal
							</Button>
							<Button type="submit" disabled={!canSubmit || isSubmitting}>
								{isSubmitting ? <ComponentLoader /> : "Tambah"}
							</Button>
						</div>
					)}
				/>
			</form>
		);
	},
);
