import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import WorkoutPage from './exercisepage/WorkoutPage';

require('./styles.css');

class Exercise extends React.Component{
	constructor(){
		super();
		this.state={
			visible: false
		};
		this.onSubmit = this.onSubmit.bind(this);
	}


	onSubmit(e){
		e.preventDefault();
		this.props.showInput(this.props.exercise);
	}

	render(){
		const name = this.props.exercise;
		const style = {
			backgroundColor : 'Transparent',
			border : 'none',
			color: 'blue',
		};

		return(	<div>
					<div className = "root">
						<p>{name}:</p>
					</div>
					<div className = "root">
						<button 
						style={style}
						onClick = {this.onSubmit}
						>+</button>
					</div>
				</div>
			)
		}
	}


export default Exercise;

