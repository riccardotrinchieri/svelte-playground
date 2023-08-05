import { redirect, type RequestEvent } from '@sveltejs/kit';

export async function load({ cookies }: RequestEvent) {
	const access_token = cookies.get('access_token');
	const refresh_token = cookies.get('refresh_token');
	if (access_token || refresh_token) {
		throw redirect(303, '/private');
	}
}
