require('./config/environment/environment');
const http = require('http');
const router = require('./api/api');

const server = http.createServer( async (request, response) => {
	const { code, notification } = await router(request, response);
	if(code && notification) {
		response.writeHead(code, {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Request-Method': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
			'Access-Control-Allow-Headers': '*'
		});
		return response.end(JSON.stringify(notification));
	};
});

const PORT = process.env.PORT;
server.listen(PORT);
