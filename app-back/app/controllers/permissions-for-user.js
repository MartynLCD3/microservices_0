module.exports = data => {
	for(let i = 0; i < data.length; i++) {
		if(!data[i].hasOwnProperty('permissions')) data[i].permissions = [];
		if(data[i].services.create === true) data[i].permissions.push("create");
		if(data[i].services.update === true) data[i].permissions.push("update");
		if(data[i].services.delete === true) data[i].permissions.push("delete");
	};
	return data;
};
