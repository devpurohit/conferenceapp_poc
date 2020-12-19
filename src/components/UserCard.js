import React, { Component } from 'react';
import cardBackground from './../assets/card.png'

class UserCard extends Component {
  render() {
    return (
      <div className="user-card">
        <span className="username">{this.props.username}</span>
      </div>
    );
  }
}

export default UserCard;