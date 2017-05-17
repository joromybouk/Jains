import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import MuscleInd from './MuscleInd';
import { connect } from 'react-redux';
require('../../css/styles.css');

class Muscle extends React.Component{
	constructor(props){
		super(props);
		this.state= {
			show: false,
			showBin: false,
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.arrowClick = this.arrowClick.bind(this);
		this.continue = this.continue.bind(this);
		this.deleteEntry = this.deleteEntry.bind(this);
	}
	onSubmit(e){
		e.preventDefault();
		var current = this.state.showBin;
		current = !current;
		this.setState({
			showBin : current,
		})
	}
	deleteEntry(e){
		e.preventDefault();
		this.props.removeRecord(this.props.index);
	}
	workoutTitle(muscleGroup){
		var muscleTitle = '';
		muscleGroup.map(function(muscle,i){
			if(muscle.name){
 				muscleTitle = muscleTitle + muscle.name + "/"
 			}
 		})
		muscleTitle = muscleTitle.substring(0, muscleTitle.length-1);
		if(this.props.index == 0){
			muscleTitle = muscleTitle + " (Click to Continue)";
		}
		return muscleTitle;
	}
	arrowClick(e){
		e.preventDefault();
		var state = this.state.show;
		state = !state;
		this.setState({
			show : state,
			showBin: false,
		})
	}
	continue(e){
		if(this.props.index == 0){
			e.preventDefault();
			browserHistory.push("/workoutprev");
		}
	}
	render(){

		const muscleGroup = this.props.muscleData.muscles;
		const show = this.state.show;
		const title = this.workoutTitle(muscleGroup);
		const date = this.props.date;
		const showBin = this.state.showBin;
		const bin = (<h1 className="alignright" onClick={this.deleteEntry}> &#128465;</h1>);

		const arrowDown = (
			<p className = "alignright" onClick={this.arrowClick}> &#x25BE; </p>
			
		);
		const arrowUp = (
			<p className = "alignright" onClick={this.arrowClick}> &#x25B4; </p>
		);

		const titleDisp = (
			<div className="titleborder">

					<p onClick={this.continue} className = "musclerecord">{title}</p>


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
				<div onClick={this.onSubmit}>
				{ show ? muscleDispDiv : null  }
				</div>
				{showBin ? bin : null}
			</div>
			)
		}
	}

export default Muscle;


