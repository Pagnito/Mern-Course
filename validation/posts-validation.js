const validator = require('validator');

const isEmpty = (value) => {
	return (
		value === undefined ||
		value === null ||
		(typeof value === 'object' && Object.keys(value).length === 0) ||
		(typeof value === 'string' && value.trim().length === 0)
	);
};

module.exports = function validatePostInput(data) {
	let errors = {};

	data.text = !isEmpty(data.text) ? data.text : '';

	if (validator.isEmpty(data.text)) {
		errors.text = 'Text field is required';
	}
	if (!validator.isLength(data.text, { min: 3, max: 400 })) {
		errors.text = 'Post shoild be between 10 and 400 characters';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
