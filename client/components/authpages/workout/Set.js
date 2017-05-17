import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
require('../../css/styles.css');

class Set extends React.Component{
	constructor(){
		super();
		this.state= {
			showBin:false,
		};
		this.textClicked = this.textClicked.bind(this);
		this.deleteEntry = this.deleteEntry.bind(this);
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
		this.props.removeSet(this.props.index);
	}


	render(){
		const rep = this.props.set.reps;
		const weight = this.props.set.weight;
		const unit = this.props.set.unit;
		const showBin = this.state.showBin;
		const setnum = this.props.index + 1;

		const bin = (<p onClick={this.deleteEntry}>&nbsp;&nbsp;&nbsp;&#128465;</p>);

		return(	<div className="container">
					<p onClick={this.textClicked} className="alignleft">Set {setnum}:&nbsp;&nbsp;{weight}{unit} x {rep} </p>
					{showBin ? bin : null}
				</div>
			)
		}
	}


export default Set;

