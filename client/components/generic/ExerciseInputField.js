import React from 'react';
import classnames from 'classnames';

const ExerciseInputField = ({type,field,value,label,onChange}) => {
require('../css/weightinput.css');

	return (
		<div>
			<label>{label}</label>
			<input
				className = "weight"
				value ={value}
				onChange= {onChange}
				name= {field}
				type= {type}
			/>
		</div>

	);
}
ExerciseInputField.propTypes = {
	field: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired,
}
ExerciseInputField.defaultProps = {
	type: 'text'
}

export default ExerciseInputField;