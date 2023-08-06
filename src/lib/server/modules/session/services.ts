import { SESSION_DURATION } from '../auth/constants';
import type { SessionType } from './model';

export const isSessionValid = (session: SessionType) => {
	const now = new Date();
	const sessionTimeStamp = new Date(session.updatedAt);
	const secondsDiff = (now.getTime() - sessionTimeStamp.getTime()) / 1000;
	return secondsDiff < SESSION_DURATION;
};
