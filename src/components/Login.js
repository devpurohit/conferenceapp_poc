import React, { Component } from 'react';
import {BrowserRouter, Route, withRouter } from "react-router-dom";


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          username: null,
        };
      }

  onLogin() {
    this.props.onLogin(this.username.value, this.props.history);
  }

  render() {
    return (
    
        <div className="container-fluid">
            <div className="account">
                <div className="account__wrapper">
                    <div className="account__card">
                        <div className="account__profile">
                            <p className="account__name">Hello, join the conf!</p>
                            <p className="account__sub">Type "admin" to become the host</p>
                        </div>
                        <input name="username" ref={(input) => { this.username = input; }} className="form-control" placeholder="Username"/>
                        <button type="button" onClick={() => this.onLogin()} className="btn btn-primary account__btn">Join</button>
                        </div>
                    </div>
            </div>
        </div>

    );
  }
}

export default withRouter(Login);