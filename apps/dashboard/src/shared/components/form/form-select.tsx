import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "@workspace/ui/components/select";
import type { FormControlProps } from "@/shared/types/form";
import { FormBase } from "./form-base";
import { useFieldContext } from "./hooks";

type TransformFns = {
	stringifyValue?: (v: unknown) => string;
	parseValue?: (s: string) => unknown;
};

export function FormSelect({
	label,
	description,
	placeholder,
	children,
	stringifyValue,
	parseValue,
	...props
}: FormControlProps &
	TransformFns &
	React.ComponentProps<typeof SelectTrigger>) {
	const field = useFieldContext<unknown>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	const stringify =
		stringifyValue ??
		((v: unknown) => (v === undefined || v === null ? "" : String(v)));
	const parse = parseValue ?? ((s: string) => s);

	return (
		<FormBase label={label} description={description}>
			<Select
				name={field.name}
				value={stringify(field.state.value)}
				onValueChange={(v) => field.handleChange(parse(v))}
			>
				<SelectTrigger
					id={field.name}
					className="w-full capitalize"
					aria-invalid={isInvalid}
					{...props}
				>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>

				<SelectContent>{children}</SelectContent>
			</Select>
		</FormBase>
	);
}
