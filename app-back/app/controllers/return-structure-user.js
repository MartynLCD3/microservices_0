module.exports = data => {
	let structure = [];
	for(let i = 0; i < data.length; i++) {
		structure.push({
			username: data[i].username,
			email: data[i].email,
			permissions: data[i].permissions, 
			key: data[i].key
		});
	};	
	return structure;
};
