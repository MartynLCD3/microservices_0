const { getUsers } = require('../models/get-data'); 

const incomingEmails = [];
const emailsInDataBase = [];
const control = emails => emails === true;
const list = [];

module.exports = async incomingUsersList => {
	
	const usersInDataBase = await getUsers();
	
	for(let IE = 0; IE < incomingUsersList.length; IE++) {
		incomingEmails.push(incomingUsersList[IE].email);
	};

	for(let EDB = 0; EDB < usersInDataBase.length; EDB++) {
		emailsInDataBase.push(usersInDataBase[EDB].email);
	};

	const checkIfEmailExists = incomingEmails.map(email => {
		list.push(emailsInDataBase.includes(email));
	});

	if(list.includes(true) && list.includes(false)) {
		emailsInDataBase.length = 0;
		incomingEmails.length = 0;
		list.length = 0;
		return true;
	};

	if(list.every(control)) {
		emailsInDataBase.length = 0;
		incomingEmails.length = 0;
		list.length = 0;
		return true;
	};
	
	if(!list.every(control)) {
		emailsInDataBase.length = 0;
		incomingEmails.length = 0;
		list.length = 0;
		return false;
		
	};
};
