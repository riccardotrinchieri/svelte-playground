export type UserType = {
	id: number;
	username: string;
	password: string;
};

export type UserCreationType = Omit<UserType, 'id'>;
