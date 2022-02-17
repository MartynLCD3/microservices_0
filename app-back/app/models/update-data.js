const { runDB } = require('../config/connection/connection');
const client = runDB();

module.exports = async newInformation => {
	await client.connect();
	const updateData = async (nameCollection, dataToUpdate) => {
		const email = dataToUpdate.email;
		await nameCollection.updateOne({ email: email }, {
			$set: {
				username: dataToUpdate.username,
				services: {
					create: dataToUpdate.services.create,
					update: dataToUpdate.services.update,
					delete: dataToUpdate.services.delete
				},
				permissions: dataToUpdate.permissions
			}
		});
	};
	
	newInformation.map(user => {
		const db = client.db('userBase');
		const collection = db.collection('users');
		updateData(collection, user);
	});
};
