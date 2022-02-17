const mongodb = require('mongodb');
const { MongoClient } = require('mongodb');
const uri = 'mongodb://database0/userBase';

module.exports = {
	runDB: () => new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }),
	getObjectID: id => mongodb.ObjectID(id)
};
