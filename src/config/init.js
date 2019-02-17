module.exports = {
	database: process.env.MRKP_BACK_DB || 'marketplace',
	username: process.env.MRKP_BACK_DB_USER || 'user1',
	password: process.env.MRKP_BACK_DB_PWD || 'WuT2Tf26zl',
	baseApi: '/marketplace/api/v1/',
	params: {
		host: process.env.MRKP_BACK_DB_HOST || 'localhost',
		port: process.env.MRKP_BACK_DB_HOST ? 3306 : 14001,
		dialect: "mysql",
		reconnect: true,
		operatorsAliases: false,
		logging: !!(process.env.MRKP_BACK_PORT) ? console.log : false
	}
};