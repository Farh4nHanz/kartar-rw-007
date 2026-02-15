import { Textarea } from "@workspace/ui/components/textarea";
import type React from "react";
import type { FormControlProps } from "@/shared/types/form";
import { FormBase } from "./form-base";
import { useFieldContext } from "./hooks";

export function FormTextarea({
	label,
	description,
	placeholder,
	...props
}: FormControlProps & React.ComponentProps<typeof Textarea>) {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<FormBase label={label} description={description}>
			<Textarea
				id={field.name}
				placeholder={placeholder}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
				className="min-h-24 first-letter:capitalize"
				aria-invalid={isInvalid}
				{...props}
			/>
		</FormBase>
	);
}
