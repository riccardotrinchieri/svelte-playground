import { sequelize } from '$lib/server/sequelize';
import { DataTypes, Model, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import type { UserType } from './type';

export const User = sequelize.define<Model<any, any>>(
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
