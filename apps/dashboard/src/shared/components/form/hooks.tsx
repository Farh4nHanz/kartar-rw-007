import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { FormFileInput } from "./form-file-input";
import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";
import { FormTextarea } from "./form-textarea";

export const { formContext, fieldContext, useFormContext, useFieldContext } =
	createFormHookContexts();

export const { useAppForm } = createFormHook({
	formContext,
	fieldContext,
	formComponents: {},
	fieldComponents: {
		Input: FormInput,
		FileInput: FormFileInput,
		Textarea: FormTextarea,
		Select: FormSelect,
	},
});
