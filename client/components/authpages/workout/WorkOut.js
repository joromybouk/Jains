import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import MuscleList from './MuscleList';
import includes from 'lodash';
import { registerWorkoutInfo } from '../../../actions/workoutActions';

require('../../css/buttons.css');
require('../../css/musclelist.css');

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
	createListElement(muscleName,muscles){


		var capitalName = muscleName.charAt(0).toUpperCase() + muscleName.slice(1);


		if( muscles.indexOf(capitalName) > -1){
			return;
		}

		return (<li className="lists"><a  onClick={() => this.addMuscle(muscleName)}>{capitalName}</a></li>);
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

 		
 		const muscleList = (
	      	<div className = "app">
	 			<div >
	 			<div className = "closex">
					<p onClick={this.turnOff}>&times;</p>
	      		</div>

	      		<div className = "musclelist">
		 			<center>
		 			
		 			<ul>
		 				{this.createListElement("abdominals",muscles)}
						{this.createListElement("abductors",muscles)}
						{this.createListElement("adductors",muscles)}
						{this.createListElement("biceps",muscles)}
						{this.createListElement("calves",muscles)}
						{this.createListElement("chest",muscles)}
						{this.createListElement("forearms",muscles)}
						{this.createListElement("glutes",muscles)}
						{this.createListElement("hamstrings",muscles)}
						{this.createListElement("lats",muscles)}
						{this.createListElement("lower back",muscles)}
						{this.createListElement("middle back",muscles)}
						{this.createListElement("quadriceps",muscles)}
						{this.createListElement("shoulders",muscles)}
						{this.createListElement("traps",muscles)}
						{this.createListElement("triceps",muscles)}
						{this.createListElement("neck",muscles)}
					 </ul>
				 </center>
				  </div>
				 </div>
	 		</div>
    	);

    	const button = (
    		<div>
	 			<button onClick = {this.onSubmit} className = "addmuscle" >+ Muscle</button>
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
 			<div className="hidden">
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
 				<div>
	 				<button className ="back" onClick = {this.back} >&larr; Record</button>
 				</div>
 				<div className = "titleborder"></div>
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
