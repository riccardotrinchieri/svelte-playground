import { fail, type RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { validationErrorMessage } from '$lib/shared/zod/errorMessages';
import { zodErrorsToJsonErrors, zodParse } from '$lib/shared/zod';
import { formDataToJSON } from '$lib/shared/formdata';

export const prerender = false;

const SignUpSchema = z.object({
	username: z.string().nonempty(validationErrorMessage.required),
	password: z.string().nonempty(validationErrorMessage.required),
	confirmPassword: z.string().nonempty(validationErrorMessage.required)
});

export type SignUp = z.infer<typeof SignUpSchema>;

export const actions = {
	default: async ({ request }: RequestEvent) => {
		const data = await request.formData();
		const json = formDataToJSON(data);
		const [signUpData, error] = zodParse(SignUpSchema, json);
		if (error) {
			const formErrors = zodErrorsToJsonErrors(error);
			return fail(400, formErrors);
		}

		if (signUpData.password !== signUpData.confirmPassword) {
			return fail(400, { confirmPassword: 'Passwords do not match' });
		}
	}
};
