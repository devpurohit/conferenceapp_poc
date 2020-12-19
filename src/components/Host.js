import React, { Component } from 'react';
import UserCard from './UserCard';

class Host extends Component {
  constructor(props) {
    super(props);
  }

  onStartTimer(time) {
    this.props.startTimer(time);
  }


  render() {
    return (
      <div className="grid-container">
       {this.props.data.currentUsers.filter((user) => user.username !== "admin").map((user, index) => (
          <UserCard username={user.username} key={index}/>
        ))}
        <div className="controls">
          <div className="call-cut">
            <i className="fas fa-phone-slash fa-2x"></i>
          </div>
          <span className="cdtext">Countdown Timers:  </span>
          <div className="numberCircle" onClick={e => this.onStartTimer(5)}>
            5
          </div>
          <div className="numberCircle" onClick={e => this.onStartTimer(10)}>
            10
          </div>
          <div className="numberCircle" onClick={e => this.onStartTimer(15)}>
            15
          </div>

        </div>
        
        
      </div> 
    );
  }
}

export default Host;