import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ContactsList from './ContactsList';


class WorkoutPage extends React.Component{
	constructor(props){
    	super(props);
    	this.state ={
      		contacts : []
      	}
     }
     
 	render(){
		var muscleOption = this.props.muscleName;
		muscleOption = muscleOption.toLowerCase();
		var type = "workout";

		if(muscleOption === "All"){
			var fs = require('../../../../../Scripts/testAll.json');
			var abs = (fs.Muscle);
			abs = abs.sort();
			for(var i = 0; i < abs.length; i ++){
				this.state.contacts.push({
				name: abs[i],
				phone: '',
				id : i
			});
			}
		}
		else{
			var fs = require('../../../../../Scripts/test.json');
			var abs = (fs.Muscle);
			var list;
			for(var i = 0; i < abs.length; i ++){
				if(abs[i].name === muscleOption){
					list = abs[i];
					break;
				}
			}
			if(type === "workout"){
				list = list.workout;
			}
			for(var i = 0; i < list.length; i ++){
				list[i] = list[i].charAt(0).toUpperCase() + list[i].slice(1);
				this.state.contacts.push({
				name: list[i],
				phone: '',
				id : i
			});
			}
		}
 		return(
 			
			<center>
				<div >
					<ContactsList selectExercise={this.props.selectExercise} contacts={this.state.contacts} />
				</div>
			</center>
			);
 	}
 }

export default WorkoutPage;