import { Button } from "@workspace/ui/components/button";
import { Calendar } from "@workspace/ui/components/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@workspace/ui/components/popover";
import { format, isValid, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import type { FormControlProps } from "@/shared/types/form";
import { FormBase } from "./form-base";
import { useFieldContext } from "./hooks";

export function FormDatePicker({ label, description }: FormControlProps) {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	const date =
		field.state.value && isValid(parseISO(field.state.value))
			? parseISO(field.state.value)
			: undefined;

	return (
		<FormBase label={label} description={description}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className="justify-start text-left font-normal"
						aria-invalid={isInvalid}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date ? format(date, "PPPP", { locale: id }) : "Pilih tanggal"}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={date}
						onSelect={(value) => {
							if (!value) return;
							field.handleChange(format(value, "yyyy-MM-dd"));
						}}
					/>
				</PopoverContent>
			</Popover>
		</FormBase>
	);
}
