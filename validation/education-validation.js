const validator = require('validator');

const isEmpty = (value) => {
	return (
		value === undefined ||
		value === null ||
		(typeof value === 'object' && Object.keys(value).length === 0) ||
		(typeof value === 'string' && value.trim().length === 0)
	);
};

module.exports = function validateEducationInput(data) {
	let errors = {};

	data.school = !isEmpty(data.school) ? data.school : '';
	data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
	data.degree = !isEmpty(data.degree) ? data.degree : '';
	data.from = !isEmpty(data.from) ? data.from : '';

	if (validator.isEmpty(data.school)) {
		errors.school = 'School field is required';
	}
	if (validator.isEmpty(data.fieldOfStudy)) {
		errors.fieldOfStudy = 'Field of Study field is required';
	}
	if (validator.isEmpty(data.from)) {
		errors.from = 'From date is required';
	}
	if (validator.isEmpty(data.degree)) {
		errors.degree = 'Degree info is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
