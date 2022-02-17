module.exports = information => {
	return new Promise(resolve => {
		let body = '';
  	        information.on('data', chunk => {
        	        body += chunk.toString();
 	        });
                information.on('end', async () => {
			resolve(JSON.parse(body));
		});
	});
};
