import React from 'react';
import classnames from 'classnames';

const ExerciseInputField = ({type,field,value,label,onChange}) => {


	return (
		<div>
			<label className = "control-label">{label}</label>
			<input
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
	type: 'number'
}

export default ExerciseInputField;