import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import Exercises from './Exercises';
import { connect } from 'react-redux';

require('../../css/titles.css');

class MuscleInd extends React.Component{
	constructor(){
		super();
		this.state= {
			exercises: [],
			current:'',
		};
	}
	render(){
		const name = this.props.muscle.name;
		const exercises = this.props.muscle.exercises;

		const exerciseDisp = (
				exercises.map(function(exercises,i){
 				return <Exercises exercises={exercises} key={i} />;
 			})
		)

	
		return(
			<div>
				<div className ="muscletitle">
					<h1> { name } </h1>
				</div>
				{exerciseDisp}
			</div>
			)
		}
	}

export default MuscleInd;


