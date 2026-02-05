import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "@workspace/ui/components/select";
import type { FormControlProps } from "@/shared/types/form";
import { FormBase } from "./form-base";
import { useFieldContext } from "./hooks";

export function FormSelect({
	label,
	description,
	placeholder,
	children,
}: FormControlProps & React.PropsWithChildren) {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<FormBase label={label} description={description}>
			<Select value={field.state.value} onValueChange={field.handleChange}>
				<SelectTrigger
					id={field.name}
					className="w-full"
					aria-invalid={isInvalid}
				>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>

				<SelectContent>{children}</SelectContent>
			</Select>
		</FormBase>
	);
}
