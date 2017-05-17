import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Muscle from './records/Muscle';
import { Link } from 'react-router';
import { registerNewWorkout, retrieveRecords, removeWorkout } from '../../actions/workoutActions';
require('../css/records.css')
require('../css/buttons.css')
require('../css/titles.css')


class MainPage extends React.Component{
	constructor(props){
    	super(props);
    	this.state ={
      		data : [],
      		dates: [],
      		text: '',
      	}
      	this.onSubmit = this.onSubmit.bind(this);
      	this.removeRecord = this.removeRecord.bind(this);
      	this.getPreviousRecords();
	 }

	onSubmit(e){
		e.preventDefault();
		browserHistory.push("/workout");
		this.props.registerNewWorkout();
	}	

	removeRecord(index){

		var data = this.state.data;
		var dates = this.state.dates;

		if (index > -1) {
    		data.splice(index, 1);
    		dates.splice(index, 1);
		}
		var text = '';
		if(data.length == 0){
			text = 'Start tracking your workouts';
		}
		this.setState({
			data: data,
			dates:dates,
			text: text,
		})
		this.props.removeWorkout(index);

	}

	getPreviousRecords(){
		this.props.retrieveRecords(15).then(
			(response)=>{
				this.setState({text:'Start tracking your workouts', data:response.data.info, dates: response.data.dates })
			},
			(response)=>{this.setState({text: ''})}
		);
		return "test";
	}
 	render(){
 	
 		const data = this.state.text;
 		const muscleData = this.state.data;
 		const dates = this.state.dates;
 		const removeRecord = this.removeRecord;
 		var disp = false;

 		const noRecords = (
 			<div className = "records">
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
	 				return <Muscle muscleData={muscleDatae} removeRecord={removeRecord} index={i} date={dates[i]} key={i} />;
	 			})
	 		);
	 	}
 		const records = (
 			<div>
	 			{muscleDisp}
 			</div>
 		);

 		return(
 		<div>
 			<div className = "titles">
	 			<h1>Workout Records</h1>
 			</div>
 			
			<button className = "addbutton" onClick = {this.onSubmit} >+ Workout</button>
 			
 			{disp ? records : noRecords}
		</div>
 		)
 	}
 }

MainPage.propTypes = {
	registerNewWorkout: React.PropTypes.func.isRequired,
	retrieveRecords: React.PropTypes.func.isRequired,
	removeWorkout: React.PropTypes.func.isRequired,
}

export default connect(null, { registerNewWorkout, retrieveRecords, removeWorkout })(MainPage);
