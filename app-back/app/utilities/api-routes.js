module.exports = {
	route: '/api/user/v1',
	warning: () => {
		return { code: 200, notification : { options: {
                	1: 'GET ▸ /api/user/v1/get-user',
	                2: 'GET ▸ /api/user/v1/get-all-users',
                	3: 'POST ▸ /api/user/v1/new-user',
	                4: 'PUT ▸ /api/user/v1/update-user',
                	5: 'DELETE ▸ /api/user/v1/delete-user',
	                6: 'DELETE ▸ /api/user/v1/delete-all-users'
		}}};
	}
};
