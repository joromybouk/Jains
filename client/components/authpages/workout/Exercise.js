import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import WorkoutPage from './exercisepage/WorkoutPage';
import ExerciseInput from './ExerciseInput';
import Set from './Set';
import { deleteSet, deleteExercise } from '../../../actions/workoutActions';
import { connect } from 'react-redux';

require('../../css/styles.css');
require('../../css/buttons.css');
require('../../css/titles.css');

class Exercise extends React.Component{
	constructor(){
		super();
		this.state= {
			sets : [],
			newInput: false,
			showBin: false,
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.hideInput = this.hideInput.bind(this);
		this.removeSet = this.removeSet.bind(this);
		this.textClicked = this.textClicked.bind(this);
		this.deleteEntry = this.deleteEntry.bind(this);
	}


	onSubmit(e){
		e.preventDefault();

		var input = this.state.newInput;

		this.setState({
			newInput: !input,
		})
	}
	hideInput(set){
		var stateSets = this.state.sets;
		stateSets.push(set);
		this.setState({
			newInput: false,
			sets: stateSets,
		})
	}
	removeSet(index){
		var sets = this.state.sets;
		if (index > -1) {
    		sets.splice(index, 1);
		}
		this.setState({
			sets: sets,
		})
		
		this.props.deleteSet(sets,this.props.muscle,this.props.exercise);
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
		this.props.removeExercise(this.props.index);
		this.props.deleteExercise(this.props.exercise,this.props.muscle);

	}
	render(){
		const name = this.props.exercise;
		const newInput = this.state.newInput;
		const grandPar = this.props.muscle;
		const sets = this.state.sets;
		const removeSet = this.removeSet;

		
		const showBin = this.state.showBin;
		const bin = (<p onClick={this.deleteEntry}> &nbsp;&nbsp;&nbsp;&#128465;</p>);

		const exerciseTitle = (
		<div>
			<div className = "exercisetitle">
				<h1 onClick={this.textClicked}>{name}:</h1>
				<h2 onClick = {this.onSubmit}>+Set</h2>
				<h2> {showBin ? bin : null} </h2>
			</div>
		</div>
		);

		const exercise_input = (
			<div>
				<ExerciseInput parent={name} grand={grandPar} hideInput={this.hideInput}/>
			</div>
		);

		const exercise_sets = (
			sets.map(function(set,i){
 					return <Set set={set} removeSet={removeSet} index={i}  key={i} />;
 				})
		);

		return(	<div>
					{exerciseTitle}
					{exercise_sets}
					{ newInput ? exercise_input : null}
				</div>
			)
		}
	}

Exercise.propTypes = {
	deleteSet: React.PropTypes.func.isRequired,
	deleteExercise: React.PropTypes.func.isRequired,
}
export default connect(null, { deleteSet , deleteExercise })(Exercise);


