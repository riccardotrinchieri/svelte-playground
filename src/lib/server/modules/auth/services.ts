import { User } from '../user/model';
import bcrypt from 'bcrypt';
import { getUserByUsername } from '../user/services';
import { SALT, SESSION_DURATION } from './constants';
import { Session } from '../session/model';
import type { Cookies } from '@sveltejs/kit';
import { isSessionValid } from '../session/services';

type LoginPayload = { username: string; password: string };

export const login = async ({ username, password }: LoginPayload) => {
	const user = await getUserByUsername(username);
	if (!user) {
		throw new Error('User not found');
	}

	await bcrypt.compare(password, user.password);

	return user;
};

type SignUpPayload = { username: string; password: string };

export const signUp = async ({ username, password }: SignUpPayload) => {
	const user = await getUserByUsername(username);

	if (user) {
		throw new Error('User already exists');
	}

	const hashedPassword = await bcrypt.hash(password, SALT);
	const res = await User.create({ username, password: hashedPassword });
	return res.toJSON();
};

export const logout = (cookies: Cookies) => {
	cookies.delete('access_token', { path: '/' });
	cookies.delete('refresh_token', { path: '/' });
	cookies.delete('user_id', { path: '/' });
};

export const generateNewTokens = () => {
	return { access_token: crypto.randomUUID(), refresh_token: crypto.randomUUID() };
};

export const refreshTokens = async (refresh_token: string, hashed_refresh_token: string) => {
	await bcrypt.compare(refresh_token, hashed_refresh_token);
	return generateNewTokens();
};

type VerifyTokensArg = {
	access_token?: string;
	refresh_token: string;
	user_id: number;
};

export const verifyTokens = async (
	cookies: Cookies,
	{ access_token, refresh_token, user_id }: VerifyTokensArg
) => {
	const session = await Session.findOne({ where: { user_id } }).then((session) =>
		session?.toJSON()
	);

	if (!session) {
		throw new Error('Unauthorized');
	}

	if (access_token && isSessionValid(session)) {
		try {
			await bcrypt.compare(access_token, session.access_token);
			return { type: 'access' };
		} catch {
			const newTokens = await refreshTokens(refresh_token, session.refresh_token);
			setTokenCookies(cookies, { user_id, ...newTokens });
			return { type: 'refresh' };
		}
	}

	const newTokens = await refreshTokens(refresh_token, session.refresh_token);
	setTokenCookies(cookies, { user_id, ...newTokens });
	return { type: 'refresh' };
};

export const setTokenCookies = (
	cookies: Cookies,
	tokens: { access_token: string; refresh_token: string; user_id: number }
) => {
	cookies.set('access_token', tokens.access_token, {
		httpOnly: true,
		sameSite: 'strict',
		secure: false,
		path: '/',
		maxAge: SESSION_DURATION
	});

	cookies.set('refresh_token', tokens.refresh_token, {
		httpOnly: true,
		sameSite: 'strict',
		secure: false,
		path: '/'
	});

	cookies.set('user_id', tokens.user_id.toString(), {
		httpOnly: true,
		sameSite: 'strict',
		secure: false,
		path: '/'
	});
};
