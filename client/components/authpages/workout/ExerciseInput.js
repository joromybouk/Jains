import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import ExerciseInputField from '../../generic/ExerciseInputField';
import { registerSet } from '../../../actions/workoutActions';
import { connect } from 'react-redux';
import map from 'lodash/map';
require('./styles.css');

class ExerciseInput extends React.Component{
	constructor(){
		super();
		this.state = {
			reps: '',
			weight: '',
			unit: '',
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(e){
	 	//when a text field is modified, update the state
	 	this.setState({
	 		[e.target.name] : [e.target.value]
	 	})
	 }
	 onSubmit(e){
	 	e.preventDefault();
	 	this.props.hideInput(this.state);
	 	this.props.registerSet(this.state,this.props.grand,this.props.parent);
	 }

	render(){
		var units = ["kg","lbs"];
		const options = map(units, (val, key) =>
      		<option key={key} value={val}>{val}</option>
    	);
		return(	<div>

					<ExerciseInputField 
					label="reps"
					onChange={this.onChange}
					value={this.state.reps}
					field="reps"
					type ="number"
					/>
					<ExerciseInputField 
					label="weight"
					onChange={this.onChange}
					value={this.state.weight}
					field="weight"
					type ="number"
					/>
					<div>
			          <label>unit</label>
			          <select
			            name="unit"
			            onChange={this.onChange}
			            value={this.state.unit}
			          >
			            <option value="" disabled></option>
			            {options}
			          </select>
			        </div>


			    <p onClick={this.onSubmit}> &#10003; </p>
				</div>
			)
		}
	}
ExerciseInput.propTypes = {
	registerSet: React.PropTypes.func.isRequired
}
export default connect(null, { registerSet })(ExerciseInput);

