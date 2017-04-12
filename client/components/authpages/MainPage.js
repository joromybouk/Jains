import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Muscle from './records/Muscle';
import { Link } from 'react-router';
import { registerNewWorkout, retrieveRecords } from '../../actions/workoutActions';

class MainPage extends React.Component{
	constructor(props){
    	super(props);
    	this.state ={
      		data : [],
      		dates: [],
      		text: '',
      	}
      	this.onSubmit = this.onSubmit.bind(this);
      	this.getPreviousRecords();
	 }

	onSubmit(e){
		e.preventDefault();
		browserHistory.push("/workout");
		this.props.registerNewWorkout();
	}	

	getPreviousRecords(){
		this.props.retrieveRecords(15).then(
			(response)=>{
				this.setState({text:'No records to show', data:response.data.info, dates: response.data.dates })
			},
			(response)=>{this.setState({text: ''})}
		);
		return "test";
	}
 	render(){
 		
 		const findRecordStyle = {
 			marginTop: '150px'
 		}

 		const data = this.state.text;
 		const muscleData = this.state.data;
 		const dates = this.state.dates;
 		var disp = false;

 		const noRecords = (
 			<div style= {findRecordStyle}>
	 			<center>
	 				{this.state.text}
	 			</center>
 			</div>
 		);

 		if(muscleData !== undefined){
 			if(muscleData.length > 0){
 				disp = true;
 			}
 		}
 		var muscleDisp = null;
 		if(disp){
	 		muscleDisp = (
	 			muscleData.map(function(muscleDatae,i){
	 				return <Muscle muscleData={muscleDatae} index={i} date={dates[i]} key={i} />;
	 			})
	 		);
	 	}
 		const records = (
 			<div>
	 			{muscleDisp}
 			</div>
 		);
2
 		return(
 		<div>
			<div style={{display: 'inline-block'}}>
 				<button onClick = {this.onSubmit} >+</button>
			</div>

			<div style={{display: 'inline-block'}}>
				<p> Add a workout </p>
 			</div>
 			{disp ? records : noRecords}
		</div>
 		)
 	}
 }

MainPage.propTypes = {
	registerNewWorkout: React.PropTypes.func.isRequired,
	retrieveRecords: React.PropTypes.func.isRequired,
}

export default connect(null, { registerNewWorkout, retrieveRecords })(MainPage);
