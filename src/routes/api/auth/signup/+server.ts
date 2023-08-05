import { checkDbConnection } from '$lib/server/sequelize';
import type { RequestEvent } from '@sveltejs/kit';

export const POST = async (requestEvent: RequestEvent) => {
	try {
		await checkDbConnection();

		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error(error);
	}
};
