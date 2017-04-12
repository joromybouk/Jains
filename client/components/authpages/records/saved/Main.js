import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { registerNewWorkout, retrieveRecords } from '../../../../actions/workoutActions';
import Muscle from './Muscle';

class Main extends React.Component{
	constructor(props){
    	super(props);
    	this.state ={
      		data : [],
      	}
      	this.getPreviousRecords();
	}

	getPreviousRecords(){
		this.props.retrieveRecords(15).then(
			(response)=>{
				this.setState({data:response.data.info })
			},
			(response)=>{}
		);
	}

	render(){
		const muscleData = this.state.data[0];
		var show = false;

		if(this.state.data.length >= 1){
			show = true;
		}

		const muscleDisp = (
			<div> 
				<Muscle muscleData={muscleData} />
			</div>
		);

		return(
			<div>
				{show ? muscleDisp : null}
			</div>
		)
	}
}


Main.propTypes = {
	registerNewWorkout: React.PropTypes.func.isRequired,
	retrieveRecords: React.PropTypes.func.isRequired,
}

export default connect(null, { registerNewWorkout, retrieveRecords })(Main);
