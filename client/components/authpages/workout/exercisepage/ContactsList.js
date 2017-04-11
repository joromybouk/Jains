import React from 'react';
import ReactDOM from 'react-dom';
import Contact from './Contact';

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

		const style = {
    	listStyle: 'none'
  		};
  		const style2 = {
    	borderColor: "black"
  		};
  		
		return(
			<div>
			&#128269;  &nbsp;
			<input type = "text"
			style = {style2} 
			value ={this.state.search}
			onChange={this.updateSearch.bind(this)}
			/>
			
			<ul style ={style}>
			{filteredContacts.map((contact)=> {
				return <Contact selectExercise={this.props.selectExercise} contact={contact} key={contact.id}/>
			})}
			</ul>
			
			</div>
			)
		}
	}


export default ContactsList;

