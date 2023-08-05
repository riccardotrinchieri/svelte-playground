import { logout } from '$lib/server/modules/auth/services';
import type { RequestEvent } from '@sveltejs/kit';

export const POST = async ({ cookies }: RequestEvent) => {
	logout(cookies);
	return new Response(String());
};
