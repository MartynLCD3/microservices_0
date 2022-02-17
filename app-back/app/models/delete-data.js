const { runDB, getObjectID } = require('../config/connection/connection');
const client = runDB();

module.exports = {
	deleteUsers: async () => {
		await client.connect();
		const db = client.db('userBase');
       		const usersCollection = db.collection('users');
		await usersCollection.drop();
	},
	deleteUser: async data => {
		await client.connect();
		const db = client.db('userBase');
		const userCollection = db.collection('users');
		const [ userEmail ] = data;  
		await userCollection.deleteOne({ email: userEmail.email });
	}
};
