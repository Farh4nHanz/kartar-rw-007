import type { Field } from "@workspace/ui/components/field";

export type FormControlProps = {
	label: string;
	description?: string;
	placeholder: string;
};

export type FormBaseProps = Omit<FormControlProps, "placeholder"> &
	React.ComponentProps<typeof Field>;
