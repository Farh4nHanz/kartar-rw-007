import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
	FieldGroup,
	FieldLegend,
	FieldSet,
} from "@workspace/ui/components/field";
import { ComponentLoader } from "@workspace/ui/components/loader";
import { SelectGroup, SelectItem } from "@workspace/ui/components/select";
import { ArrowRightToLine, Save } from "lucide-react";
import { memo } from "react";
import slugify from "slugify";
import { toast } from "sonner";
import type { Category } from "@/features/categories/services";
import { updateNewsBySlugMutationOptions } from "@/features/news/hooks/mutation-options";
import {
	getAllNewsQueryOptions,
	getNewsDetailBySlugQueryOptions,
} from "@/features/news/hooks/query-options";
import {
	type EditNewsFormValue,
	editNewsSchema,
} from "@/features/news/schemas";
import type { News } from "@/features/news/services";
import { useAppForm } from "@/shared/components/form/hooks";

export const EditNewsForm = memo(
	({
		isLoading,
		selectedData,
		categories,
	}: {
		isLoading: boolean;
		selectedData: News;
		categories: Category[];
	}) => {
		const navigate = useNavigate({
			from: "/berita/$slug/edit",
		});

		const search = useSearch({
			from: "/(app)/(publication)/berita/$slug/edit",
		});

		const statuses = [true, false] as const;

		const { mutateAsync } = useMutation(
			updateNewsBySlugMutationOptions(selectedData?.slug),
		);

		const form = useAppForm({
			formId: "edit-news-form",
			defaultValues: {
				title: selectedData?.title,
				slug: selectedData?.slug,
				category_id: selectedData?.category.id,
				content: selectedData?.content,
				excerpt: selectedData?.excerpt,
				is_published: selectedData?.is_published,
				published_at: selectedData?.published_at,
				thumbnail: undefined,
			} satisfies EditNewsFormValue as EditNewsFormValue,
			validators: {
				onSubmit: editNewsSchema,
			},
			onSubmit: async ({ value }) => {
				const slug = slugify(value.title, {
					lower: true,
					trim: true,
					strict: true,
				});

				const excerpt = value.content.trim().substring(0, 150);

				const publishedAt = value.is_published
					? new Date().toISOString()
					: null;

				await mutateAsync(
					{
						...value,
						slug: `${slug}-${crypto.randomUUID()}`,
						excerpt,
						published_at: publishedAt,
					},
					{
						onSuccess: (res, _variables, _onMutateResult, context) => {
							toast.success(res.message, {
								duration: 5000,
								dismissible: true,
								closeButton: true,
							});

							form.reset();

							context.client.invalidateQueries({
								queryKey: getNewsDetailBySlugQueryOptions(selectedData?.id)
									.queryKey,
							});

							context.client.invalidateQueries({
								queryKey: getAllNewsQueryOptions(search).queryKey,
							});

							navigate({ to: "/berita", replace: true });
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
							<FieldLegend>Informasi Dasar</FieldLegend>

							{/* Input */}
							<FieldGroup className="mt-3 gap-5">
								{/* News name */}
								<form.AppField name="title">
									{(field) => (
										<field.Input
											label="Judul"
											placeholder="Contoh: Kegiatan Bersih-Bersih Lingkungan"
										/>
									)}
								</form.AppField>

								{/* News category */}
								<form.AppField name="category_id">
									{(field) => (
										<field.Select label="Kategori" placeholder="Kategori">
											<SelectGroup>
												{categories?.map((category) => (
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

								{/* News status */}
								<form.AppField name="is_published">
									{(field) => (
										<field.Select
											label="Status"
											placeholder="Status"
											stringifyValue={(v) => String(v)}
											parseValue={(s) => s === "true"}
										>
											<SelectGroup>
												{statuses.map((status) => (
													<SelectItem
														key={String(status)}
														value={String(status)}
														className="capitalize"
													>
														{status ? "Publish" : "Draft"}
													</SelectItem>
												))}
											</SelectGroup>
										</field.Select>
									)}
								</form.AppField>

								{/* News thumbnail */}
								<form.AppField name="thumbnail">
									{(field) => (
										<field.FileInput label="Thumbnail" accept="image/*" />
									)}
								</form.AppField>
							</FieldGroup>
						</FieldSet>
					</CardContent>
				</Card>

				<Card>
					<CardContent>
						<FieldSet>
							<FieldLegend>Konten Berita</FieldLegend>

							<form.AppField name="content">
								{(field) => (
									<field.Textarea
										label=""
										placeholder="Tulis konten berita di sini..."
									/>
								)}
							</form.AppField>
						</FieldSet>
					</CardContent>
				</Card>

				{/* Submit and cancel buttons */}
				<form.Subscribe
					selector={(state) => [
						state.canSubmit,
						state.isSubmitting,
						state.values,
					]}
					children={([canSubmit, isSubmitting, values]) => (
						<div className="flex items-start justify-end gap-2">
							<Button
								type="button"
								variant="destructive"
								onClick={() => navigate({ to: "/berita", replace: true })}
							>
								Batal
							</Button>
							{(values as EditNewsFormValue).is_published ? (
								<Button
									type="submit"
									disabled={Boolean(!canSubmit) || Boolean(isSubmitting)}
									className="bg-green-500 text-primary-foreground hover:bg-green-600 disabled:bg-green/50"
								>
									{isSubmitting ? <ComponentLoader /> : "Publish"}
									<ArrowRightToLine />
								</Button>
							) : (
								<Button
									type="submit"
									disabled={Boolean(!canSubmit) || Boolean(isSubmitting)}
									className="bg-amber-500 text-primary-foreground hover:bg-amber-600 dark:bg-amber-300 dark:hover:bg-amber-400"
								>
									<Save />
									{isSubmitting ? <ComponentLoader /> : "Simpan sebagai Draft"}
								</Button>
							)}
						</div>
					)}
				/>
			</form>
		);
	},
);
