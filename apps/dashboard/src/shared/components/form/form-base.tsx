import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@workspace/ui/components/field";
import type { FormBaseProps } from "@/shared/types/form";
import { useFieldContext } from "./hooks";

export function FormBase({
	orientation = "vertical",
	label,
	description,
	controlFirst = false,
	children,
}: FormBaseProps) {
	const field = useFieldContext();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field data-invalid={isInvalid} orientation={orientation}>
			{controlFirst ? (
				<Field orientation={orientation}>
					{children}
					<FieldContent>
						<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
						{description ? (
							<FieldDescription className="text-xs">
								{description}
							</FieldDescription>
						) : null}
						{isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
					</FieldContent>
				</Field>
			) : (
				<FieldContent>
					<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
					{children}
					{description ? (
						<FieldDescription className="text-xs">
							{description}
						</FieldDescription>
					) : null}
					{isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
				</FieldContent>
			)}
		</Field>
	);
}
