import { Checkbox } from "@workspace/ui/components/checkbox";
import type { FormControlProps } from "@/shared/types/form";
import { FormBase } from "./form-base";
import { useFieldContext } from "./hooks";

export function FormCheckbox({
	label,
	description,
	...props
}: FormControlProps & React.ComponentProps<typeof Checkbox>) {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<FormBase
			label={label}
			description={description}
			orientation="horizontal"
			controlFirst
		>
			<Checkbox
				id={field.name}
				name={field.name}
				value={field.state.value}
				checked={Boolean(field.state.value)}
				onCheckedChange={(v) => field.handleChange(v as string)}
				aria-invalid={isInvalid}
				{...props}
			/>
		</FormBase>
	);
}
