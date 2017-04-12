import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import MuscleList from './MuscleList';
import includes from 'lodash';
import { registerWorkoutInfo } from '../../../actions/workoutActions';

require('./styles.css');
// <MuscleList muscles={this.state.muscles} />
class Workout extends React.Component{
	constructor(props){
    	super(props);
    	this.state ={
    		muscles : [],
      		visible : false,
      		hideAll : false,
      		exerciseOption: false,
      	}
      	this.turnOff = this.turnOff.bind(this);
      	this.onSubmit = this.onSubmit.bind(this);
      	this.optionOff = this.optionOff.bind(this);
      	this.optionOn = this.optionOn.bind(this);
      	this.removeMuscle = this.removeMuscle.bind(this);
      	this.back = this.back.bind(this);
	 }

	turnOff(e){
		e.preventDefault();
		this.setState({
			visible: false,
			hideAll : false,
		})
	}
	optionOn(){
		this.setState({
			exerciseOption: false,
		})
	}
	back(){
		browserHistory.push("/mainpage");
	}
	optionOff(){
		this.setState({
			exerciseOption: true,
		})

	}
	removeMuscle(index){
		var muscles = this.state.muscles;
		if (index > -1) {
    		muscles.splice(index, 1);
		}
		this.setState({
			muscles: muscles,
		})
	}
	selectExercise(exerciseName){
		var exercises = (this.state.exercises);
		if(!(exercises.indexOf(exerciseName) > -1)){
			exercises.push(exerciseName);
			this.setState({
				visible: false,
				exercises: exercises
			})
			//Add exercise to database
			
			this.props.registerWorkoutInfo(exerciseName,'exercises',this.props.muscle);
		}
		else{
			console.log("Exercise already exists");
		}
	}

	addMuscle(musclename){
		musclename = musclename.charAt(0).toUpperCase() + musclename.slice(1);
		var muscles = (this.state.muscles);
		if(!(muscles.indexOf(musclename) > -1)){
			muscles.push(musclename);
			this.setState({
				visible: false,
				hideAll: false,
				muscles: muscles
			})
			//Add muscle to database
			this.props.registerWorkoutInfo(musclename,'muscles', 'none');
		}
		
	}

	onSubmit(e){
		e.preventDefault();
		this.setState({
			visible: true,
			hideAll: true,
		})
	}
 	render(){
 		const vis = this.state.visible;
 		const muscles = this.state.muscles;
 		const hideAll = this.state.hideAll;
 		const exerciseOption = this.state.exerciseOption;
 		const optionOn = this.optionOn;
 		const optionOff = this.optionOff;
 		const removeMuscle = this.removeMuscle;

 		const hideStyle={
 			display: 'none'
 		}
 		const muscleList = (
	      	<div className = "app">
	 			<div >
	 			<a className="root" onClick={this.turnOff}>&times;</a>
	 			<center>
	 			<ul>
				    <li className="lists"><a  onClick={() => this.addMuscle("abdominals")}>Abdominals</a></li>
				    <li className="lists"><a onClick={() => this.addMuscle("chest")}>Chest</a></li>
				    <li className="lists"><a onClick={() => this.addMuscle("lats")}>Lats</a></li>
				    <li className="lists"><a onClick={() => this.addMuscle("biceps")}>Biceps</a></li>
				 </ul>
				 </center>
				 </div>
	 		</div>
    	);

    	const button = (
    		<div>
    			<div className= "root">
	 				<button onClick = {this.onSubmit} >+</button>
				</div>
				<div className= "root">
					<p>Add a muscle</p>
	 			</div>
    		</div>
    	);
    	const muscleDivs=(
    		
 				muscles.map(function(muscles,i){
 					return <MuscleList index={i} removeMuscle={removeMuscle} optionOn={optionOn} optionOff={optionOff} muscle={muscles} key={i} />;
 				})
 		);
 		const muscleDivVis=(
 			<div>
 				{muscleDivs}
 			</div>
 		);
 		const muscleDivInv=(
 			<div style={hideStyle}>
 				{muscleDivs}
 			</div>
 		);
 		const options = (
 			<div>
 				{ vis ? muscleList : button}
 			</div>
 		)
 		return(
 			<div>
 				<button onClick = {this.back} >&larr;</button>
 				{hideAll ? muscleDivInv : muscleDivVis}
 				{exerciseOption ? null : options}
 			</div>
 		)
 	}
 }	
Workout.propTypes = {
	registerWorkoutInfo: React.PropTypes.func.isRequired
}
export default connect(null, { registerWorkoutInfo })(Workout);
