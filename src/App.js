import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Host from './components/Host';
import Participant from './components/Participant';

const client = new W3CWebSocket('ws://127.0.0.1:8000');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsers: [],
      userActivity: [],
      username: null,
      text: '',
      countdown: 0
    };
  }

  logInUser = (username, history) => {
    if (username.trim()) {
      this.setState({
        ...this.state,
        username
      }, () => {
        client.send(JSON.stringify({
          username,
          type: "userjoin"
        }));
        if(this.state.username === "admin") {
          history.push("/host");
        } else {
          history.push("/participant");
        }
      });
    }
  }

 onCountDownStart = (count) => {
      this.setState({
        ...this.state,
        countdown: count
      },
      client.send(JSON.stringify({
        type: "startcount",
        content: count
      })));
  };

 componentWillMount() {
   client.onopen = () => {
     console.log('WebSocket Client Connected');
   };
   client.onmessage = (message) => {
     const dataFromServer = JSON.parse(message.data);
     const stateToChange = {};
     if (dataFromServer.type === "userjoin") {
       stateToChange.currentUsers = Object.values(dataFromServer.data.users);
     } else if (dataFromServer.type === "startcount") {
       stateToChange.countdown = dataFromServer.data.countValue;
     }
     stateToChange.userActivity = dataFromServer.data.userActivity;
     this.setState({
       ...stateToChange
     });
   };
 }


  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact><Login onLogin={this.logInUser} /></Route>
        <Route path="/host"><Host data={this.state} startTimer={this.onCountDownStart} /></Route> 
        <Route path="/participant"><Participant data={this.state} /></Route>
      </BrowserRouter>
         
      );
  }
}

export default App;
