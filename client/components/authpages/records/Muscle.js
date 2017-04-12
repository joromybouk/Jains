import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import MuscleInd from './MuscleInd';
import { connect } from 'react-redux';
require('../workout/styles.css');

class Muscle extends React.Component{
	constructor(){
		super();
		this.state= {
			show: false,
		};
		this.arrowClick = this.arrowClick.bind(this);
		this.continue = this.continue.bind(this);
	}

	workoutTitle(muscleGroup){
		var muscleTitle = '';
		muscleGroup.map(function(muscle,i){
			if(muscle.name){
 				muscleTitle = muscleTitle + muscle.name + "/"
 			}
 		})
		muscleTitle = muscleTitle.substring(0, muscleTitle.length-1);
		return muscleTitle;
	}
	arrowClick(e){
		e.preventDefault();
		var state = this.state.show;
		state = !state;
		this.setState({
			show : state
		})
	}
	continue(e){
		if(this.props.index == 0){
			e.preventDefault();
			browserHistory.push("/workoutprev");
		}
	}
	render(){
		const hideStyle = {
			display: 'none',
		}

		const muscleGroup = this.props.muscleData.muscles;
		const show = this.state.show;
		const title = this.workoutTitle(muscleGroup);
		const date = this.props.date;

		const arrowDown = (
			<p className = "alignright" onClick={this.arrowClick}> &#x25BE; </p>
			
		);
		const arrowUp = (
			<p className = "alignright" onClick={this.arrowClick}> &#x25B4; </p>
		);

		const titleDisp = (
			<div className="titleborder">
					<p onClick={this.continue} className = "alignleft">{title}</p>
					{show ? arrowUp : arrowDown }
					<p className = "alignright" onClick={this.arrowClick}> {date} </p>
			</div>
		);

		const musclesDisp = (
			muscleGroup.map(function(muscle,i){
				if(muscle.name){
 					return <MuscleInd muscle={muscle} key={i} />;
 				}
 			})
		);
		const muscleDispDiv=(
			<div className="root">
				{musclesDisp}
			</div>
		);
		return(
			<div className = "container">
				{titleDisp}
				<div className>
				{ show ? muscleDispDiv : null  }
				</div>
			</div>
			)
		}
	}

export default Muscle;


