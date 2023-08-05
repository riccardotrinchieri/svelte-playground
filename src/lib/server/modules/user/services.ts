import { User } from './model';
import type { UserCreationType } from './type';
import bcrypt from 'bcrypt';

export const createUser = async (data: UserCreationType) => {
	const { password } = data;
	const hashedPassword = await bcrypt.hash(password, 10);
	const res = await User.create({ username: data.username, password: hashedPassword });
	return res.toJSON();
};
