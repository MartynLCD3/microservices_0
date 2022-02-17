const { getUsers } = require('../models/get-data');
const { deleteUsers } = require('../models/delete-data');
const { noUsers, cleanDatabase } = require('../utilities/messages');

module.exports = async () => {
	const userList = await getUsers();
	if(userList.length === 0) return noUsers;
	await deleteUsers();
	return cleanDatabase;
};
