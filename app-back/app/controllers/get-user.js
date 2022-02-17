const userControlID = require('./user-control-id');
const returnStructureUser = require('./return-structure-user');
const { getUsers, getUser } = require('../models/get-data');
const { wrongID, noUsers, noUser } = require('../utilities/messages');

module.exports = async () => {
		const userList = await getUsers();
		const userListFormat = returnStructureUser(userList);
		return userList.length > 0 ? { code: 200, notification: userListFormat } : noUsers;
};
