import React from "react";
//import _ from "underscore";

export default class Auth extends React.Component {
	constructor() {
		super();
		this.changePassword = this.changePassword.bind(this);
		this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
		this.changeEmail = this.changeEmail.bind(this);
		this.state = {
			name: "",
			email: "",
			password: "",
			confirmPassword: ""
		};

	}

	changePassword(event) {
		const password = event.target.value;
    this.setState({password: password});
  }

  changeConfirmPassword(event) {
  	const confirmPassword = event.target.value;
    this.setState({confirmPassword});
  }

  changeEmail(event){
  	const email = event.target.value;
  	console.log(this.state);
  	this.setState({email: email});
  }

  validateEmail(event) {
    var match = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return match.test(event);
  }

  // isEmpty(value) {
  //   return !_.isEmpty(value);
  // }

	render() {
		return (
      <div className="create_account_screen">
        <div className="create_account_form">
          <h1>Create account</h1>
          <form onSubmit={this.saveAndContinue}>
            Email
            <input 
              text="Email Address" 
              ref="email"
              type="text"
              defaultValue={this.state.email} 
              validate={this.validateEmail}
              value={this.state.email}
              onChange={this.changeEmail} 
              errorMessage="Email is invalid"
              emptyMessage="Email can't be empty"
              errorVisible={this.state.showEmailError}
            />
            Password
            <input 
              text="Password" 
              type="password"
              ref="password"
              validator="true"
              minCharacters="8"
              requireCapitals="1"
              requireNumbers="1"
              value={this.state.passsword}
              emptyMessage="Password is invalid"
              onChange={this.changePassword} 
            /> 
            Confirm Password
            <input 
              text="Confirm password" 
              ref="passwordConfirm"
              type="password"
              validate={this.isConfirmedPassword}
              value={this.state.confirmPassword}
              onChange={this.changeConfirmPassword} 
              emptyMessage="Please confirm your password"
              errorMessage="Passwords don't match"
            />

            <button 
              type="submit" 
              className="button button_wide">
              CREATE account
            </button>

          </form>
        </div>

      </div>
		);
	}
}

