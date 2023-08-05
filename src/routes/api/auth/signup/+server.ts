import { checkDbConnection } from '$lib/server/sequelize';
import { error, type RequestEvent } from '@sveltejs/kit';
import { POSTValidationSchema } from './validator';
import { zodErrorsToJsonErrors, zodParse } from '$lib/shared/zod';
import { createUser } from '$lib/server/modules/user/services';

export const POST = async (requestEvent: RequestEvent) => {
	try {
		await checkDbConnection();
	} catch (e) {
		console.error(e);
		throw error(500, { message: 'Unable to connect to db' });
	}

	const body = await requestEvent.request.json();
	const [data, validationError] = zodParse(POSTValidationSchema, body);

	if (validationError) {
		throw error(400, zodErrorsToJsonErrors(validationError));
	}

	if (data.password !== data.confirmPassword) {
		throw error(400, { message: 'Password mismatch' });
	}
	try {
		const result = await createUser(data);
		return new Response(JSON.stringify(result));
	} catch (e) {
		console.error(e);
		throw error(500, { message: JSON.stringify(e) });
	}
};
