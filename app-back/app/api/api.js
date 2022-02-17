require('../config/environment/environment');
const userControl = require('../controllers/user-control');
const getAllUsers = require('../controllers/get-user');
const deleteAllUsers = require('../controllers/delete-user');
const { apiRoutes, noApiKey, wrongApiKey } = require('../utilities/messages');
const { route, warning } = require('../utilities/api-routes');

module.exports = async (request, response) => {
	const { url, method } = request;
	if(!url.match(/%26apikey=/)) return noApiKey;
	if(url.match(/%26apikey=(.*)/)[1] !== `${process.env.APIKEY}`) return wrongApiKey;
	switch(method) {
		case 'GET':
                        if(url.includes(`${route}/get-all-users`)) {
				return await getAllUsers();
                        };
		
			return warning();
			break;
		case 'POST':
			if(url.includes(`${route}/new-user`)) {
				return await userControl(method , request);
			};
			
			return warning();
			break;
		case 'DELETE':
			if(url.includes(`${route}/delete-all-users`)) {
				return await deleteAllUsers();
			};

			if(url.includes(`${route}/delete-user`)) {
				return await userControl(method, request);
			};

			return warning();
			break;
		case 'PUT':
			if(url.includes(`${route}/update-user`)) {
				return await userControl(method, request);
			};
			
			return warning();
			break;
		default:
			return warning();
			break;
	};
};
