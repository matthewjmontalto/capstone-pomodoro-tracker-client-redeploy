import React, { Component, Fragment } from 'react'

class Timer extends Component {
  constructor () {
    super()

    this.state = {
      minutes: 25,
      seconds: '00',
      isCounting: false,
      onBreak: false
    }

    this.secondsRemaining = 0
    this.handleInterval = null
  }

  tick = () => {
    // handles updated relationship between seconds and minutes
    const min = Math.floor(this.secondsRemaining / 60)
    const sec = this.secondsRemaining - (min * 60)
    // update state with new timer values
    this.setState({
      minutes: min,
      seconds: sec
    })

    // concats single digit second to double digit display
    if (sec < 10) {
      this.setState({
        seconds: '0' + this.state.seconds
      })
    }

    // concats single digit minute to double digit display
    if (min < 10) {
      this.setState({
        minutes: '0' + this.state.minutes
      })
    }

    // when timer runs down to 00:00 clear interval and toggle between
    // and break timets.
    if (min === 0 & sec === 0) {
      clearInterval(this.handleInterval)
      if (!this.state.onBreak) {
        this.setState({
          minutes: 5,
          seconds: '00',
          isCounting: false,
          onBreak: true
        })
      } else {
        this.setState({
          minutes: 25,
          seconds: '00',
          isCounting: false,
          onBreak: false
        })
      }
    }

    this.secondsRemaining--
  }

  // called when start button clicked
  startCountdown = () => {
    // call this.tick() every second until setInterval gets cleared
    this.handleInterval = setInterval(this.tick, 1000)
    // update instance variable secondsRemaining with state.minutes * 60 for seconds
    const time = this.state.minutes
    this.secondsRemaining = time * 60
    // toggle state to represent a running timer
    this.setState({
      isCounting: true
    })
  }

  render () {
    return (
      <Fragment>
        <p>timer</p>
        <p>{this.state.minutes}:{this.state.seconds}</p>
        <button onClick={this.startCountdown}>start</button>
        <button onClick={this.pauseCountdown}>pause</button>
      </Fragment>
    )
  }
}

export default Timer
