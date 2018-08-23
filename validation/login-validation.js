const validator = require("validator");

const isEmpty = (value) => {
	return (
		value === undefined ||
		value === null ||
		(typeof value === "object" && Object.keys(value).length === 0) ||
		(typeof value === "string" && value.trim().length === 0)
	);
};

module.exports = function validateLoginInput(data) {
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	if (!validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}
	if (validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
	}
	if (!(validator.isLength(data.password), { min: 6, max: 20 })) {
		errors.password = "Password should be at least 6 characters";
	}
	if (validator.isEmpty(data.email)) {
		errors.email = "Email is required";
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
