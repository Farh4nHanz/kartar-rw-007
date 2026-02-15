import { Input } from "@workspace/ui/components/input";
import type { FormControlProps } from "@/shared/types/form";
import { FormBase } from "./form-base";
import { useFieldContext } from "./hooks";

export function FormInput({
	label,
	description,
	placeholder = "Enter value",
}: FormControlProps) {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<FormBase label={label} description={description}>
			<Input
				id={field.name}
				name={field.name}
				type="text"
				placeholder={placeholder}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
				aria-invalid={isInvalid}
				autoComplete="off"
			/>
		</FormBase>
	);
}
