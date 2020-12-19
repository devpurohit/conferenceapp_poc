import React, { Component } from 'react';

class TimeoutComponent extends Component {

    constructor(props) {
      super(props);
      this.state = {
        countdown: this.props.countdown
      }
      this.startCountdown();
    }

    

    componentWillReceiveProps(props) {
      this.setState({ countdown:props.countdown} , () => { this.startCountdown() } );
    }

    tick() {
      const current = this.state.countdown;
      if (current === 0) {
        clearInterval(this.timer);
      } else {
        this.setState({ countdown: current - 1 }); 
      } 
    }
  
    startCountdown() {
      if(this.props.countdown && this.props.countdown !== 0) {
        this.timer = setInterval(() => this.tick(), 1000);
      }
    }
  
    render() {
      if(this.state.countdown) {
        return   <div className="timer">{this.state.countdown}</div>;
      }
      return null;      
    }
}

export default TimeoutComponent;
  