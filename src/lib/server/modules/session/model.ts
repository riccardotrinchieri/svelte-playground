import { sequelize } from '$lib/server/sequelize';
import { DataTypes, Model } from 'sequelize';
import { User } from '../user/model';
import type { OmitForCreationType, SequelizeDefaultAttributes } from '$lib/server/sequelize/types';

export type SessionType = {
	user_id: number;
	access_token: string;
	refresh_token: string;
} & SequelizeDefaultAttributes;

export type SessionCreationType = OmitForCreationType<SessionType, ''>;

export const Session = sequelize.define<Model<SessionType, SessionCreationType>>(
	'Session',
	{
		user_id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			references: {
				model: 'Users',
				key: 'id'
			}
		},
		access_token: {
			type: DataTypes.STRING,
			unique: true
		},
		refresh_token: {
			type: DataTypes.STRING,
			unique: true
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['access_token']
			},
			{
				unique: true,
				fields: ['refresh_token']
			}
		]
	}
);

User.hasOne(Session);

Session.sync();
