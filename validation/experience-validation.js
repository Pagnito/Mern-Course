const validator = require("validator");

const isEmpty = (value) => {
	return (
		value === undefined ||
		value === null ||
		(typeof value === "object" && Object.keys(value).length === 0) ||
		(typeof value === "string" && value.trim().length === 0)
	);
};

module.exports = function validateExperienceInput(data) {
	let errors = {};

	data.title = !isEmpty(data.title) ? data.title : "";
	data.company = !isEmpty(data.company) ? data.company : "";
	data.location = !isEmpty(data.location) ? data.location : "";
	data.from = !isEmpty(data.from) ? data.from : "";

	data.description = !isEmpty(data.description) ? data.description : "";

	if (validator.isEmpty(data.title)) {
		errors.title = "Title is required";
	}
	if (validator.isEmpty(data.company)) {
		errors.company = "Company field is required";
	}
	if (validator.isEmpty(data.from)) {
		errors.from = "From date is required";
	}
	if (validator.isEmpty(data.description)) {
		errors.description = "Description is required";
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
