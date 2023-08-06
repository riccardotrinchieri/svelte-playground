import { generateNewTokens, login, setTokenCookies } from '$lib/server/modules/auth/services';
import { formDataToJSON } from '$lib/shared/formdata';
import { validationErrorMessage, zodErrorsToJsonErrors, zodParse } from '$lib/shared/zod';
import { fail, type RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { Session, type SessionCreationType } from '$lib/server/modules/session/model';
import { SALT } from '$lib/server/modules/auth/constants';

export const prerender = false;

const LoginSchema = z.object({
	username: z.string().nonempty(validationErrorMessage.required),
	password: z.string().nonempty(validationErrorMessage.required)
});

export const actions = {
	default: async (requestEvent: RequestEvent) => {
		let json;
		try {
			const { request, cookies } = requestEvent;
			const data = await request.formData();
			json = formDataToJSON(data);

			const [parsedData, error] = zodParse(LoginSchema, json);
			if (error) {
				const formErrors = zodErrorsToJsonErrors(error);
				console.log(formErrors);
				return fail(400, { status: 'failed', errors: formErrors, values: json });
			}

			const result = await login(parsedData);

			const { access_token, refresh_token } = generateNewTokens();

			const session = {
				access_token: await bcrypt.hash(access_token, SALT),
				refresh_token: await bcrypt.hash(refresh_token, SALT),
				user_id: result.id
			} satisfies SessionCreationType;

			await Session.upsert(session);

			setTokenCookies(cookies, { access_token, refresh_token, user_id: result.id });

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
