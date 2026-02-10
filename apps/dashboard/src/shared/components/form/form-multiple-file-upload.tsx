import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Image as ImageIcon, Trash2 } from "lucide-react";
import { memo, useRef } from "react";
import type { FormControlProps } from "@/shared/types/form";
import { FormBase } from "./form-base";
import { useFieldContext } from "./hooks";

export const FormMultipleFileUpload = memo(
	({
		label,
		description,
		maxSizeMB = 5,
	}: FormControlProps & { maxSizeMB?: number }) => {
		const field = useFieldContext<File[]>();
		const fileInputRef = useRef<HTMLInputElement>(null);

		const files = field.state.value ?? [];

		const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

		/* =====================
		 * Handle file selection
		 * ===================== */
		const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const fileList = e.currentTarget.files;
			if (!fileList) return;

			const incoming = Array.from(fileList);

			const validFiles = incoming.filter(
				(file) => file.size <= maxSizeMB * 1024 * 1024,
			);

			// Prevent duplicate files (by name + size)
			const merged = [
				...files,
				...validFiles.filter(
					(f) =>
						!files.some(
							(existing) =>
								existing.name === f.name && existing.size === f.size,
						),
				),
			];

			field.handleChange(merged);
			field.handleBlur();

			// reset input so same file can be re-selected
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		};

		/* =====================
		 * Remove file
		 * ===================== */
		const removeFile = (index: number) => {
			const next = files.filter((_, i) => i !== index);
			field.handleChange(next);
		};

		return (
			<FormBase label={label} description={description}>
				<div className="mt-3 space-y-4">
					{/* Upload trigger */}
					<Card
						className="cursor-pointer border-2 border-dashed p-6 text-center transition-colors hover:border-primary"
						onClick={() => fileInputRef.current?.click()}
						aria-invalid={isInvalid}
					>
						<div className="flex flex-col items-center gap-2">
							<div className="flex size-12 items-center justify-center rounded-full bg-muted">
								<ImageIcon className="text-muted-foreground" />
							</div>
							<p className="font-medium text-sm">Klik untuk upload foto</p>
							<p className="text-muted-foreground text-xs">
								PNG, JPG, JPEG (maks {maxSizeMB}MB / file)
							</p>
						</div>
					</Card>

					<Input
						ref={fileInputRef}
						type="file"
						multiple
						accept="image/*"
						className="hidden"
						onChange={handleFilesChange}
					/>

					{/* Preview list */}
					{files.length > 0 && (
						<div className="space-y-2">
							<p className="font-medium text-sm">
								Foto diupload ({files.length})
							</p>

							<div className="grid max-h-96 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 overflow-y-auto">
								{files.map((file, index) => {
									const previewUrl = URL.createObjectURL(file);

									return (
										<div
											key={`${file.name}-${file.size}`}
											className="group relative overflow-hidden rounded-lg border"
										>
											<img
												src={previewUrl}
												alt={file.name}
												className="h-40 w-full object-cover"
												onLoad={() => URL.revokeObjectURL(previewUrl)}
											/>

											<div className="absolute inset-0 hidden bg-black/30 transition-all duration-300 group-hover:block" />

											<Button
												type="button"
												size="icon"
												variant="destructive"
												className="absolute top-2 right-2 opacity-0 transition-opacity duration-300 hover:cursor-pointer group-hover:opacity-100"
												onClick={() => removeFile(index)}
											>
												<Trash2 size={16} />
											</Button>

											<div className="absolute inset-x-0 bottom-0 bg-black/70 px-2 py-1">
												<p className="truncate text-white text-xs">
													{file.name}
												</p>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>
			</FormBase>
		);
	},
);
