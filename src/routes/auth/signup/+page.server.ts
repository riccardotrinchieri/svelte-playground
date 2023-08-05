import { fail, type RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { validationErrorMessage } from '$lib/shared/zod/errorMessages';
import { zodErrorsToJsonErrors, zodParse } from '$lib/shared/zod';
import { formDataToJSON } from '$lib/shared/formdata';
import { signUp } from '$lib/server/modules/auth/services';
import { getUserByUsername } from '$lib/server/modules/user/services';

export const prerender = false;

const SignUpSchema = z.object({
	username: z.string().nonempty(validationErrorMessage.required),
	password: z.string().nonempty(validationErrorMessage.required),
	confirmPassword: z.string().nonempty(validationErrorMessage.required)
});

export const actions = {
	default: async (requestEvent: RequestEvent) => {
		let json;
		try {
			const { request } = requestEvent;
			const data = await request.formData();
			json = formDataToJSON(data);

			const [parsedData, error] = zodParse(SignUpSchema, json);
			if (error) {
				const formErrors = zodErrorsToJsonErrors(error);
				return fail(400, { status: 'failed', errors: formErrors, values: json });
			}

			if (parsedData.password !== parsedData.confirmPassword) {
				return fail(400, {
					status: 'failed',
					errors: { confirmPassword: 'Passwords do not match' },
					values: json
				});
			}

			const existingUser = await getUserByUsername(parsedData.username);
			if (existingUser) {
				return fail(400, {
					status: 'failed',
					errors: { username: 'Username not available' },
					values: json
				});
			}

			const result = await signUp(parsedData);

			return { status: 'success', data: result };
		} catch (error) {
			console.error(error);
			return fail(500, {
				status: 'failed',
				apiError: true,
				message: JSON.stringify(error),
				values: json
			});
		}
	}
};
