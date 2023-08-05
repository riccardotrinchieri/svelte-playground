import { sequelize } from '$lib/server/sequelize';
import { DataTypes, Model } from 'sequelize';
import type { SessionCreationType, SessionType } from './type';
import { User } from '../user/model';

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
		}
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
