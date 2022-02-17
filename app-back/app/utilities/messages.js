module.exports = {
	wrongFieldsEntered: { code: 400, notification: { error: 'The expected object was not received. Try [] or {}' }},
	incorrectDataEntered: { code: 400, notification: { error: 'Incorrect data entered. Verify that the key/value are correctly written and complete' }},
	userDuplicate: { code: 400, notification: { error: 'User already exists. Try another email' }},
	noUsers: { code: 404, notification: { error: 'No registered users' }},
	noUser: { code: 404, notification: { error: 'User not found' }},
	cleanDatabase: { code: 200, notification: { status: 'Clean database' }},
	userRemovedFromDatabase: { code: 200, notification: { status: 'User removed from database' }},
	errorGetting: { code: 400, notification: { error: `You can't get multiple users at once. Try using ▸ /api/user/v1/get-all-users` }},
	errorDeleting: { code: 400, notification: { error: `You can't delete multiple users at once. Try using ▸ /api/user/v1/delete-all-users` }},
	noApiKey: { code: 404, notification: { error: 'API KEY not detected' }},
	wrongApiKey: { code: 404, notification: { error: 'Wrong API Key. Ask your provider for the password to access the service' }}
};
