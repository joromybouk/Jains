import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
require('../../css/styles.css');

class WeightInd extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showBin : false,
		}
		this.onSubmit=this.onSubmit.bind(this);
		this.deleteEntry=this.deleteEntry.bind(this);
	} 
	deleteEntry(e){
		e.preventDefault();
		this.props.removeWeight(this.props.index);
	}
	onSubmit(e){
		e.preventDefault();
		var current = this.state.showBin;
		current = !current;
		this.setState({
			showBin : current,
		})
	}
	render(){
		const weight = this.props.weight.weight;
		const unit = this.props.weight.unit;
		const time = this.props.weight.time;
		const date = this.props.weight.date;
		const showBin = this.state.showBin;
		const bin = (<p onClick={this.deleteEntry}> &nbsp;&nbsp;&nbsp;&#128465;</p>);

		return(
			<div className= "weighttitleborder" onClick={this.onSubmit}>
				<div className = "root">
					<p>
						{weight}{unit}
					</p>
				</div>
				<div className = " root">
					<p>&emsp;&emsp;&emsp;&emsp;&emsp;{time}&emsp;&emsp;&emsp;&emsp;&emsp;{date}</p>
				</div>
				<div className = "root">
					{showBin ? bin : null}
				</div>
			</div>
		);
	}
}


export default WeightInd;