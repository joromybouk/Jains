import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authAction';
import { browserHistory } from 'react-router';
require('./maincomponents.css')


class NavigationBar extends React.Component {
  logout(e){
    e.preventDefault();
    this.props.logout();
  }

  onSubmit(name){
    browserHistory.push("/"+ name);
  } 

  render(){
    const { isAuthenticated } = this.props.auth;
    const floater={
      float: 'right',
    }
    const userLinks = (
      <div className="navbar">
        <ul>
          <li><a onClick={()=>this.onSubmit("mainpage")}>Workouts</a></li>
          <li><a onClick={()=>this.onSubmit("weight")}>Weights</a></li>
          <li><a onClick={()=>this.onSubmit("settings")}>Settings</a></li>
          <li><a style={floater} onClick={this.logout.bind(this)}>Logout</a></li>
        </ul>
      </div>
    );
    const guestLinks = (
      <ul>
        <li><a onClick={()=>this.onSubmit("")}>Sign In</a></li>
         <li><a onClick={()=>this.onSubmit("register")}>Register</a></li>
         <li></li>
      </ul>
    );

    return (
          <div className = "navbar">
            <div>
              <center>
                <div>
                  { isAuthenticated ? userLinks : guestLinks}
                </div>
              </center>

            </div>
          </div>

    );
  }  
}

NavigationBar.propTypes={
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired

}

function mapStateToProps(state){
  return{
    auth: state.auth
  };
}

export default connect(mapStateToProps,{logout})(NavigationBar);
