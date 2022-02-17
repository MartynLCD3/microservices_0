const { runDB, getObjectID } = require('../config/connection/connection');
const client = runDB();

module.exports = {
	getUsers: async () => {
		await client.connect();
		const db = client.db('userBase');
       		const usersCollection = db.collection('users');
	        const search = usersCollection.find({});
		const usersList = await search.toArray();
		return usersList;
	}
};
