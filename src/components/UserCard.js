import React, { Component } from 'react';

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