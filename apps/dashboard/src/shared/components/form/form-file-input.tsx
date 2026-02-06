import { ButtonGroup } from "@workspace/ui/components/button-group";
import {
	Dialog,
	DialogContent,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@workspace/ui/components/input-group";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Eye, XCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FormControlProps } from "@/shared/types/form";
import { FormBase } from "./form-base";
import { useFieldContext } from "./hooks";

export type FormFileInputProps = {
	accept?: string;
} & Omit<FormControlProps, "placeholder">;

export function FormFileInput({
	label,
	description,
	accept = "image/*",
}: FormFileInputProps) {
	const field = useFieldContext<File | undefined>();
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	// Cleanup blob URLs on unmount
	useEffect(() => {
		return () => {
			if (imagePreview?.startsWith("blob:")) {
				URL.revokeObjectURL(imagePreview);
			}
		};
	}, [imagePreview]);

	const clearFile = useCallback(() => {
		setImageFile(null);
		setImagePreview(null);
		field.handleChange(undefined);

		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	}, [field]);

	const handleFileChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files;

			if (!files || files.length === 0) {
				clearFile();
				return;
			}

			const file = files[0];
			setImageFile(file);
			setImagePreview(URL.createObjectURL(file));
			field.handleChange(file);
		},
		[field, clearFile],
	);

	return (
		<FormBase label={label} description={description}>
			<InputGroup>
				<InputGroupInput
					ref={fileInputRef}
					id={field.name}
					type="file"
					accept={accept}
					onChange={handleFileChange}
					aria-invalid={isInvalid}
				/>

				{imageFile ? (
					<InputGroupAddon align="inline-end">
						<ButtonGroup>
							{/* Clear file button */}
							<Tooltip>
								<TooltipTrigger asChild>
									<InputGroupButton
										type="button"
										variant="ghost"
										onClick={clearFile}
									>
										<XCircle size={16} className="text-destructive" />
									</InputGroupButton>
								</TooltipTrigger>
								<TooltipContent>Remove File</TooltipContent>
							</Tooltip>

							{/* Preview file button */}
							<Tooltip>
								<TooltipTrigger asChild>
									<InputGroupButton
										type="button"
										variant="ghost"
										onClick={() => setIsPreviewOpen(true)}
									>
										<Eye size={16} className="text-foreground" />
									</InputGroupButton>
								</TooltipTrigger>
								<TooltipContent>Preview File</TooltipContent>
							</Tooltip>
						</ButtonGroup>
					</InputGroupAddon>
				) : null}
			</InputGroup>

			{/* File preview modal */}
			<Dialog
				open={isPreviewOpen}
				onOpenChange={setIsPreviewOpen}
				modal={false}
			>
				<DialogContent open={isPreviewOpen} aria-describedby={undefined}>
					<DialogTitle>Preview Image</DialogTitle>

					{imagePreview && (
						<img
							src={imagePreview}
							alt="Preview of selected file"
							className="aspect-square h-full w-full rounded-md object-contain object-center"
						/>
					)}
				</DialogContent>
			</Dialog>
		</FormBase>
	);
}
