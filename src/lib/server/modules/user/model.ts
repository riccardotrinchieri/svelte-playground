import { sequelize } from '$lib/server/sequelize';
import type { OmitForCreationType, SequelizeDefaultAttributes } from '$lib/server/sequelize/types';
import { DataTypes, Model, type InferAttributes } from 'sequelize';

export type UserType = {
	id: number;
	username: string;
	password: string;
} & SequelizeDefaultAttributes;

export type UserCreationType = OmitForCreationType<UserType, 'id'>;

export const User = sequelize.define<Model<UserType, UserCreationType>>(
	'User',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		username: {
			type: DataTypes.STRING,
			unique: true
		},
		password: DataTypes.STRING,

		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['username']
			}
		]
	}
);

export type User = InferAttributes<Model<UserType, UserCreationType>>;

User.sync();
