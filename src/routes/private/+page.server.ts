import { logout, verifyTokens } from '$lib/server/modules/auth/services';
import { redirect, type RequestEvent } from '@sveltejs/kit';

export async function load({ cookies }: RequestEvent) {
	const access_token = cookies.get('access_token');
	const refresh_token = cookies.get('refresh_token');
	const user_id = cookies.get('user_id');

	if (!user_id || !refresh_token) {
		throw redirect(303, '/auth/login');
	}

	try {
		await verifyTokens(cookies, {
			access_token,
			refresh_token,
			user_id: Number(user_id)
		});
	} catch (error) {
		console.error(error);
		logout(cookies);
		throw redirect(303, '/auth/login');
	}
}
