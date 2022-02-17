const checkDataType = require('./check-data-type');
const checkIsArray = require('./check-is-array');
const convertToString = require('./convert-incoming-data-to-string');
const userSchema = require('./user-schema');
const addKeyForUser = require('./add-key-for-user');
const addPermissions = require('./permissions-for-user');
const checkIfEmailExists = require('./check-if-email-exists');
const returnStructureUser = require('./return-structure-user');
const saveUser = require('../models/save-data');
const updateUser = require('../models/update-data');
const { deleteUser } = require('../models/delete-data');
const { wrongFieldsEntered, incorrectDataEntered,
	userDuplicate, noUser, errorGetting, errorDeleting,
	userRemovedFromDatabase } = require('../utilities/messages');

module.exports = async (typeOfOperation, data) => {
	const user = await convertToString(data);
	if(!checkDataType(user)) return wrongFieldsEntered;
	const userArray = checkIsArray(user);
	const controlSchema = await userSchema(typeOfOperation, userArray);
	if(!controlSchema) return incorrectDataEntered;

	if(typeOfOperation === 'GET' && controlSchema) {
		if(!await checkIfEmailExists(userArray)) return noUser;
		if(userArray.length > 1) return errorGetting;
		const userFormat = returnStructureUser(userArray);
		return { code: 200, notification: userFormat };
	};

	if(typeOfOperation === 'DELETE' && controlSchema) {
		if(!await checkIfEmailExists(userArray)) return noUser;
		if(userArray.length > 1) return errorDeleting;
		deleteUser(userArray);
		return userRemovedFromDatabase;	
	};

	if(typeOfOperation === 'PUT' && controlSchema) {
		if(!await checkIfEmailExists(userArray)) return noUser;
		const updatedUsers = addPermissions(userArray);
	        await updateUser(updatedUsers);
        	const userFormat = returnStructureUser(updatedUsers);
		return { code: 200, notification: userFormat };
	};
	
	if(typeOfOperation === 'POST' && controlSchema) {
		if(await checkIfEmailExists(userArray)) return userDuplicate;
		const userWithPermissionKey = addPermissions(userArray);
		const userWithUniqueKey = await addKeyForUser(userWithPermissionKey);
		saveUser(userWithUniqueKey);
		const userFormat = returnStructureUser(userWithUniqueKey);
		return { code: 200, notification: userFormat };
	};
};
