const validator = require("validator");

const isEmpty = (value) => {
	return (
		value === undefined ||
		value === null ||
		(typeof value === "object" && Object.keys(value).length === 0) ||
		(typeof value === "string" && value.trim().length === 0)
	);
};

module.exports = function validateProfileInput(data) {
	let errors = {};

	data.handle = !isEmpty(data.handle) ? data.handle : "";
	data.status = !isEmpty(data.status) ? data.status : "";
	data.skills = !isEmpty(data.skills) ? data.skills : "";

	if (!(validator.isLength(data.handle), { min: 2, max: 40 })) {
		errors.handle = "Handle needs to be between 2 and 40 characters";
	}
	if (validator.isEmpty(data.handle)) {
		errors.handle = "Profile handle is required";
	}
	if (validator.isEmpty(data.status)) {
		errors.status = "Status Field is required";
	}
	if (validator.isEmpty(data.skills)) {
		errors.skills = "Skills field is required";
	}

	if (!isEmpty(data.website)) {
		if (!validator.isURL(data.website)) {
			errors.website = "Not a valid URL";
		}
	}
	if (!isEmpty(data.youtube)) {
		if (!validator.isURL(data.youtube)) {
			errors.youtube = "Not a valid URL";
		}
	}
	if (!isEmpty(data.twitter)) {
		if (!validator.isURL(data.twitter)) {
			errors.twitter = "Not a valid URL";
		}
	}
	if (!isEmpty(data.instagram)) {
		if (!validator.isURL(data.instagram)) {
			errors.instagram = "Not a valid URL";
		}
	}
	if (!isEmpty(data.tumblr)) {
		if (!validator.isURL(data.tumblr)) {
			errors.tumblr = "Not a valid URL";
		}
	}
	if (!isEmpty(data.linkedIn)) {
		if (!validator.isURL(data.linkedIn)) {
			errors.linkedIn = "Not a valid URL";
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
