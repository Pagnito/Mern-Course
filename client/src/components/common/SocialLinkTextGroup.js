import React from 'react';

import propTypes from 'prop-types';

const SocialLinkTextGroup = ({
	name,
	placeholder,
	value,
	label,
	error,
	info,
	type,
	onChange,
	disabled,
	socialImg
}) => {
	return (
		<div className="socialLinkInput">
			{socialImg}
			<input
				autoComplete="off"
				type={type}
				onChange={onChange}
				placeholder={placeholder}
				name={name}
				value={value}
				disabled={disabled}
				className="form-input createProInputs"
			/>
		</div>
	);
};
SocialLinkTextGroup.propTypes = {
	name: propTypes.string.isRequired,
	placeholder: propTypes.string,
	error: propTypes.string,
	onChange: propTypes.func.isRequired,
	name: propTypes.string.isRequired,
	value: propTypes.string.isRequired,
	type: propTypes.string.isRequired
};
SocialLinkTextGroup.defaultProps = {
	type: 'text'
};
export default SocialLinkTextGroup;
