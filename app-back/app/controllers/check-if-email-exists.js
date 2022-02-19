const { getUsers } = require('../models/get-data'); 

const control = emails => emails === true;
const list = [];

module.exports = async incomingUsersList => {
	
	const usersInDataBase = await getUsers();
	const incomingEmails = incomingUsersList.map(user => user.email);
	const emailsInDataBase = usersInDataBase.map(user => user.email);

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
