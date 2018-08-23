const validator = require("validator");

const isEmpty = (value) => {
	return (
		value === undefined ||
		value === null ||
		(typeof value === "object" && Object.keys(value).length === 0) ||
		(typeof value === "string" && value.trim().length === 0)
	);
};

module.exports = function validateRegisterInput(data) {
	let errors = {};
	data.userName = !isEmpty(data.userName) ? data.userName : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.password2 = !isEmpty(data.password2) ? data.password2 : "";

	if (!validator.isLength(data.userName, { min: 2, max: 30 })) {
		errors.userName = "Name must be between 2 and 30 characters";
	}
	if (validator.isEmpty(data.userName)) {
		errors.userName = "User Name field is required";
	}
	if (validator.isEmpty(data.email)) {
		errors.email = "Email is invalid";
	}
	if (!validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}
	if (validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
	}
	if (!validator.isLength(data.password, { min: 6, max: 20 })) {
		errors.password = "Password should be at least 6 characters";
	}
	if (validator.isEmpty(data.password2)) {
		errors.password2 = "Confirm Password field is required";
	}
	if (!validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwords must match";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
