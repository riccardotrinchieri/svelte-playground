import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('svelte', 'svelteuser', 'svelteuser', {
	host: 'postgres',
	dialect: 'postgres'
});

export const checkDbConnection = async () => {
	return sequelize.authenticate();
};
