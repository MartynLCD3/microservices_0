const Ajv = require('ajv').default;
const AjvFormats = require('ajv-formats');
const ajv = new Ajv({ useDefaults: true });
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const checkValues = content => content === true;
const valuesList = [];
const { invalidOperation } = require('../utilities/messages');

AjvFormats(ajv);
ajv.addFormat('email-format', emailRegex)

const userSchema = {
	type: 'object',
	properties: {
		username: { type: 'string', minLength: 1 },
		email: { type: 'string', format: 'email-format' },
		services: {
			type: 'object',
			properties: {
				create: { type: 'boolean' },
				update: { type: 'boolean' },
				delete: { type: 'boolean' }
			},
			required: ['create', 'update', 'delete'], 
			additionalProperties: false
		}
	},
	required: ['username', 'email', 'services'],
	additionalProperties: false
};

const userEmailSchema = {
	type: 'object',
	properties: {
		email: { type: 'string', format: 'email-format' }
	},
	required: ['email'],
	additionalProperties: false
};

const validateSchema = async (item, itemSchema) => {
        const validate = ajv.compile(itemSchema);
        const validatedSchema = validate(item);
        return validatedSchema;
}

const userListControl = async (operation, userList) => {

	if(operation === 'DELETE' || operation === 'GET') {
		for(const user of userList) {
			const result = await validateSchema(user, userEmailSchema); 
			valuesList.push(result);
		};
	
		const valuesControl = valuesList.every(checkValues);
		valuesList.length = 0;
		valuesList.length = 0;
		return valuesControl ? true : false;
	}

	for(const user of userList) {
		const result = await validateSchema(user, userSchema); 
		valuesList.push(result);
	};

	const valuesControl = valuesList.every(checkValues);
	valuesList.length = 0;
	valuesList.length = 0;
	return valuesControl ? true : false;
};

module.exports = async (typeOfOperation, data) => {
	return await userListControl(typeOfOperation, data);
};
