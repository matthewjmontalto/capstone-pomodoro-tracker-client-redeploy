import React, { Component, Fragment } from 'react'

class Timer extends Component {
  constructor () {
    super()

    this.state = {
      minutes: 25,
      seconds: 0,
      isCounting: false,
      wasPaused: false,
      onBreak: false
    }

    this.secondsRemaining = 0
    this.handleInterval = null
  }

  tick = () => {
    // handles updated relationship between seconds and minutes between method calls
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
          seconds: 0,
          isCounting: false,
          onBreak: true
        })
      } else {
        this.setState({
          minutes: 25,
          seconds: 0,
          isCounting: false,
          onBreak: false
        })
      }
    }
    this.secondsRemaining--
  }

  // called when start button clicked
  startCountdown = () => {
    // pull down current state of minutes and seconds
    const min = this.state.minutes
    const sec = this.state.seconds
    // convert minutes place to seconds and add seconds place to total secondsRemaining
    this.secondsRemaining = (min * 60) + sec
    // call this.tick() every second until setInterval gets cleared
    this.handleInterval = setInterval(this.tick, 1000)
    // toggle state to represent a running timer
    this.setState({
      isCounting: true
    })
  }

  pauseCountdown = () => {
    clearInterval(this.handleInterval)
    this.setState({
      isCounting: false,
      wasPaused: true
    })
  }

  resetCountdown = () => {
    clearInterval(this.handleInterval)
    this.setState({
      minutes: 25,
      seconds: 0,
      isCounting: false,
      wasPaused: false,
      onBreak: false
    })
  }

  render () {
    return (
      <Fragment>
        <p>timer</p>
        <p>{this.state.minutes}:{this.state.seconds === 0 ? '00' : this.state.seconds}</p>
        <button onClick={this.startCountdown}>start</button>
        <button onClick={this.pauseCountdown}>pause</button>
        <button onClick={this.resetCountdown}>Reset</button>
      </Fragment>
    )
  }
}

export default Timer
