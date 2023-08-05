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
	default: async (requestEvent: RequestEvent) => {
		const { request } = requestEvent;
		const data = await request.formData();
		const json = formDataToJSON(data);
		const [signUpData, error] = zodParse(SignUpSchema, json);
		if (error) {
			const formErrors = zodErrorsToJsonErrors(error);
			return fail(400, { status: 'failed', errors: formErrors });
		}

		if (signUpData.password !== signUpData.confirmPassword) {
			return fail(400, { status: 'failed', errors: { confirmPassword: 'Passwords do not match' } });
		}

		const response = await requestEvent.fetch('/api/auth/signup', {
			method: 'POST',
			body: JSON.stringify(signUpData)
		});
		const responseData = await response.json();
		if (!response.ok) {
			return fail(500, { status: 'failed', apiError: true, message: responseData });
		}
		return { status: 'success', data: responseData };
	}
};
