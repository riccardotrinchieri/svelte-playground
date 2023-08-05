import { sequelize } from '$lib/server/sequelize';
import { DataTypes, Model } from 'sequelize';
import type { UserCreationType, UserType } from './type';

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
		password: DataTypes.STRING
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

User.sync();
