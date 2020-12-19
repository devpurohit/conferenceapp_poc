import React, { Component } from 'react';
import UserCard from './UserCard';
import TimeoutComponent from './Timeout';


class Participant extends Component {

  render() {
    return (
      <div className="participant-grid">
        <div className="participant-list">
          {this.props.data.currentUsers.filter((user) => user.username !== "admin").map((user, index) => (
            <UserCard username={user.username} key={index}/>
          ))}
        </div>
        <div className="participant-view">
          <TimeoutComponent countdown={this.props.data.countdown}> </TimeoutComponent>
          <span className="username">Host</span>
        </div>
        <div className="controls">
          <div className="call-cut">
            <i className="fas fa-phone-slash fa-2x"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Participant;