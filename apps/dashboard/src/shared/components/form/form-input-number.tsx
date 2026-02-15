import { Input } from "@workspace/ui/components/input";
import type { FormControlProps } from "@/shared/types/form";
import { FormBase } from "./form-base";
import { useFieldContext } from "./hooks";

export function FormInputNumber({
	label,
	description,
	placeholder = "Enter value",
	...props
}: FormControlProps & React.ComponentProps<typeof Input>) {
	const field = useFieldContext<number>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	const stringValue =
		field.state.value === undefined || field.state.value === null
			? ""
			: String(field.state.value);

	return (
		<FormBase label={label} description={description}>
			<Input
				id={field.name}
				name={field.name}
				type="text"
				inputMode="numeric"
				pattern="[0-9]*"
				placeholder={placeholder}
				value={stringValue}
				onChange={(e) => {
					const raw = e.target.value;
					const parsed = raw === "" ? 0 : Number(raw);
					field.handleChange(Number.isNaN(parsed) ? 0 : parsed);
				}}
				onBlur={field.handleBlur}
				aria-invalid={isInvalid}
				{...props}
			/>
		</FormBase>
	);
}
