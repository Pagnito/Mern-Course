import React from 'react';

import propTypes from 'prop-types';

const TextFieldGroup = ({
	name,
	placeholder,
	value,
	label,
	error,
	info,
	type,
	onChange,
	disabled
}) => {
	return (
		<input
			type={type}
			onChange={onChange}
			placeholder={placeholder}
			name={name}
			value={value}
			disabled={disabled}
			className="form-input createProInputs"
		/>
	);
};
TextFieldGroup.propTypes = {
	name: propTypes.string.isRequired,
	placeholder: propTypes.string,
	error: propTypes.string,
	onChange: propTypes.func.isRequired,
	name: propTypes.string.isRequired,
	value: propTypes.string.isRequired,
	type: propTypes.string.isRequired
};
TextFieldGroup.defaultProps = {
	type: 'text'
};
export default TextFieldGroup;
