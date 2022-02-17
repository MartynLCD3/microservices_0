const crypto = require('crypto');
const randomKey = String(Math.floor(Math.random() * 1.0e+9));

const generateHash = () => {
	return new Promise(resolve => {
        	crypto.randomBytes(64, (err, buf) => {
            		const salt = buf.toString('base64');
            		crypto.pbkdf2(randomKey, salt, 100000, 64, 'sha512', (err, key) => {
                		resolve(key.toString('hex'));
            		});
        	});
    	});
};

module.exports = async data => {
	for(let i = 0; i < data.length; i++) {
		data[i].key = await generateHash(); 
	};
	return data;
};
