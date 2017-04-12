import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import map from 'lodash/map';
import ExerciseInputField from '../../generic/ExerciseInputField';
require('../workout/styles.css');

class WeightInput extends React.Component{
	constructor(props){
		super(props);
		this.state={
			weight: '',
			unit: '',
		}
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.getDate = this.getDate.bind(this);
		this.getTime = this.getTime.bind(this);
	}
	onChange(e){
	 	//when a text field is modified, update the state
	 	this.setState({
	 		[e.target.name] : [e.target.value]
	 	})
	 }

	getDate(){
		var today = new Date();
		var date;
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yy = today.getFullYear();
		if(dd<10){
	    	dd ='0'+dd;
		} 
		if(mm<10){
	    	mm ='0'+mm;
		}
		date = dd + "/" + mm + "/" + yy;
		return date;
	}
	getTime(){
		var today = new Date();
		var h = today.getHours();
		var min = today.getMinutes();
		if(h<10){
	    	h ='0'+h;
		}
		if(min<10){
	    	min ='0'+min;
		} 
		var time = h + ":" + min;
		return time;

	}
	onSubmit(e){
		e.preventDefault();
		var time = this.getTime();
		var date = this.getDate();
		var newWeight = {
			weight: this.state.weight[0],
			unit: this.state.unit[0],
			date: date,
			time: time,
		}
		
		this.props.newWeightAdded(newWeight);

		this.setState({
			weight:'',
			unit:'',
		})
	}
	render(){
		var units = ["kg","lbs"];
		const options = map(units, (val, key) =>
      		<option key={key} value={val}>{val}</option>
    	);
		return(

				<div>
					<div className = "root">
						<ExerciseInputField 
						label="weight"
						onChange={this.onChange}
						value={this.state.weight}
						field="weight"
						type ="number"
						/>
					</div>
					<div className = "root">
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
			        <div className = "root">
					    <p onClick={this.onSubmit}> &emsp;&emsp; &#10003; </p>
				    </div>
				</div>
		);
	}
}


export default WeightInput;