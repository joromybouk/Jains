import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import WorkoutPage from './exercisepage/WorkoutPage';

import Exercise from './Exercise';
import { registerWorkoutInfo, deleteMusle } from '../../../actions/workoutActions';
import { connect } from 'react-redux';
require('../../css/styles.css');
require('../../css/buttons.css');
require('../../css/titles.css');

class MuscleList extends React.Component{
	constructor(){
		super();
		this.state= {
			name: '',
			exercises: [],
			visible: false,
			hideAll : false,
			current:'',
			showBin: false,
			
		};
		this.turnOff = this.turnOff.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.selectExercise = this.selectExercise.bind(this);	
		this.removeExercise = this.removeExercise.bind(this);	
		this.textClicked = this.textClicked.bind(this);	
		this.deleteEntry = this.deleteEntry.bind(this);	
	}
	turnOff(e){
		e.preventDefault();
		this.setState({
			visible: false,
			hideAll: false,
		})
		this.props.optionOn();
	}
	
	onSubmit(e){
		e.preventDefault();
		this.setState({
			visible: true,
			hideAll : true,
		})
		this.props.optionOff();
	}
	selectExercise(exerciseName){
		var exercises = (this.state.exercises);
		if(!(exercises.indexOf(exerciseName) > -1)){

			exercises = exercises.concat([exerciseName]);
			this.setState({
				visible: false,
				hideAll: false,
				exercises: exercises
			})
			//Add exercise to database
			this.props.optionOn();
			this.props.registerWorkoutInfo(exerciseName,'exercises',this.props.muscle);
		}
		else{
			console.log("Exercise already exists");
		}
	}
	textClicked(e){
		e.preventDefault();
		var binState = this.state.showBin;
		binState = !binState;
		this.setState({
			showBin : binState,	
		})
	}
	deleteEntry(e){
		e.preventDefault();
		this.props.removeMuscle(this.props.index);
		this.props.deleteMusle(this.props.muscle);
	}

	removeExercise(index){

		var exercises = this.state.exercises;
		if (index > -1) {
    		exercises.splice(index, 1);
		}
		this.setState({
			exercises: exercises,
		})
	}

	render(){

		const name = this.props.muscle;
		const vis = this.state.visible;
		const visInput = this.state.visible;
		const exercises = this.state.exercises;
		const showInputFunc = this.showInput; 
		const hideBool = this.state.hideAll;
		const removeExercise = this.removeExercise;
		var styleToChoose = "empty";

		const showBin = this.state.showBin;
		const bin = (<h1 onClick={this.deleteEntry}> &nbsp;&nbsp;&nbsp;&#128465;</h1>);

		if(hideBool){
			styleToChoose = "hidden";
		}
		const exerciseDisp = (
 				exercises.map(function(exercises,i){
 					return <Exercise exercise={exercises} removeExercise={removeExercise} index={i} muscle={name} key={i} />;
 				})
		);
		const exercliseList = (
	      	<div>
				<div className = "close">
					<p onClick={this.turnOff}>&times;</p>
	      		</div>
		      	<div className = "exlist">	
		 			<WorkoutPage selectExercise={this.selectExercise} muscleName = {name}/>
		 		</div>
	 		</div>
    	);
		const addEx = (
			<div>
	 			<button className = "addexercise" onClick = {this.onSubmit} >+ Exercise</button>
			</div>
		);
		return(
			<div className="muscleborder">
				<div className={styleToChoose}>
					<div className="muscletitle">
						<h1 onClick={this.textClicked}>{name}</h1>
					</div>
					<div className="root">
						{showBin ? bin : null}
					</div>
					{ exerciseDisp }
				</div>
				<div>
					{ vis ? exercliseList : addEx}
				</div>
			</div>
			)
		}
	}

MuscleList.propTypes = {
	registerWorkoutInfo: React.PropTypes.func.isRequired,
	deleteMusle: React.PropTypes.func.isRequired,
}
export default connect(null, { registerWorkoutInfo, deleteMusle})(MuscleList);


