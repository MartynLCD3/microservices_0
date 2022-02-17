const { runDB, getObjectID } = require('../config/connection/connection');
const client = runDB();

module.exports = async data => {
    	await client.connect();
	const db = client.db('userBase');
	const users = db.collection('users');
	await users.insertMany(data);
};
