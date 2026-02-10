import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { FieldGroup, FieldSet } from "@workspace/ui/components/field";
import { ComponentLoader } from "@workspace/ui/components/loader";
import { SelectGroup, SelectItem } from "@workspace/ui/components/select";
import { cn } from "@workspace/ui/lib/utils";
import { Save, Trash2 } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";
import type { Category } from "@/features/categories/services";
import { updateGalleryByIdMutationOptions } from "@/features/galleries/hooks/mutation-options";
import { getAllGalleriesQueryOptions } from "@/features/galleries/hooks/query-options";
import {
	type EditGalleryFormValues,
	editGallerySchema,
} from "@/features/galleries/schemas";
import type { Gallery } from "@/features/galleries/services";
import { useAppForm } from "@/shared/components/form/hooks";

export const EditGalleryForm = memo(
	({
		isLoading,
		selectedData,
		categories,
	}: {
		isLoading: boolean;
		selectedData: Gallery;
		categories: Category[];
	}) => {
		const navigate = useNavigate({
			from: "/galeri/$id/edit",
		});

		const { mutateAsync } = useMutation(
			updateGalleryByIdMutationOptions(selectedData?.id),
		);

		const form = useAppForm({
			formId: "edit-gallery-form",
			defaultValues: {
				title: selectedData?.title,
				description: selectedData?.description,
				category_id: selectedData?.category.id,
				activity_date: selectedData?.activity_date,
				added_images: [],
				deleted_image_ids: [],
			} satisfies EditGalleryFormValues as EditGalleryFormValues,
			validators: {
				onSubmit: editGallerySchema,
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

						form.reset();
						context.client.invalidateQueries({
							queryKey: getAllGalleriesQueryOptions().queryKey,
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
							</FieldGroup>
						</FieldSet>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Semua Foto</CardTitle>
					</CardHeader>

					<CardContent className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 max-md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
						{selectedData.images.map((image) => (
							<form.Subscribe
								key={image.id}
								selector={(state) => state.values.deleted_image_ids}
							>
								{(deleteIds) => {
									if (deleteIds?.includes(image.id)) return null;

									return (
										<div
											key={image.id}
											className="group relative aspect-square overflow-hidden rounded-lg border"
										>
											<img
												src={image.image_url || "https://placehold.co/300x300"}
												alt={image.id}
												className={cn(
													"h-full w-full cursor-pointer object-cover transition-transform hover:scale-105",
												)}
												onClick={() =>
													image.image_url &&
													window.open(image.image_url, "_blank")
												}
											/>

											{/* Delete button */}
											<Button
												type="button"
												size="icon"
												variant="destructive"
												className="absolute top-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
												onClick={() =>
													form.setFieldValue("deleted_image_ids", [
														// biome-ignore lint/style/noNonNullAssertion: true
														...deleteIds!,
														image.id,
													])
												}
											>
												<Trash2 size={16} />
											</Button>

											{/* URL overlay */}
											<div className="absolute right-0 bottom-0 left-0 bg-black/70 px-2 py-1 text-white opacity-0 transition-opacity group-hover:opacity-100">
												<p className="truncate text-xs">{image.image_url}</p>
											</div>
										</div>
									);
								}}
							</form.Subscribe>
						))}
					</CardContent>
				</Card>

				{/* Gallery images upload */}
				<Card>
					<CardContent>
						<form.AppField name="added_images">
							{(field) => <field.MultipleFileUpload label="Tambahkan Foto" />}
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
							<Button
								type="submit"
								disabled={!canSubmit || isSubmitting}
								className="bg-amber-500 text-primary-foreground hover:bg-amber-600 dark:bg-amber-300 dark:hover:bg-amber-400"
							>
								<Save />
								{isSubmitting ? <ComponentLoader /> : "Simpan"}
							</Button>
						</div>
					)}
				/>
			</form>
		);
	},
);
