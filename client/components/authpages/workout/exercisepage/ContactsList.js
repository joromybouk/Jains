import React from 'react';
import ReactDOM from 'react-dom';
import Contact from './Contact';

require('../../../css/styles.css');
require('../../../css/exercise.css');


class ContactsList extends React.Component{
	constructor(){
		super();
		this.state= {
			search: '',
		};
	}

	updateSearch(event){
		this.setState({search:event.target.value});
	}

	render(){
		let filteredContacts = this.props.contacts.filter(
				(contact) =>{
					return contact.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
				}
			);

		return(
			<div className = "searchicon">
			<div>
			
				<ul className = "noList">
					<h1>
					&#128269;  
					</h1>
				<input type = "text"
				value ={this.state.search}
				onChange={this.updateSearch.bind(this)}
				className = "searchbar"
				/>
				</ul>
			
			</div>
			
			<ul className ="noList">
			{filteredContacts.map((contact)=> {
				return <Contact selectExercise={this.props.selectExercise} contact={contact} key={contact.id}/>
			})}
			</ul>
			
			</div>
			)
		}
	}


export default ContactsList;

