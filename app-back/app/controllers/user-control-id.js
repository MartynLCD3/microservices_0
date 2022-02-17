module.exports = id => {
	return id.length === 24 && !id.match(/[g-z]/g)? true : false;
};
