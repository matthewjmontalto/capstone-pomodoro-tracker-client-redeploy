import React, { Component } from 'react'

import apiActions from '../apiActions.js'

import './Timer.scss'

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
    this.numElapsedTimers = 0
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

    // when timer runs down to 00:00 clear interval and toggle between work
    // and break times.
    if (min === 0 & sec === 0) {
      clearInterval(this.handleInterval)
      if (!this.state.onBreak) {
        // increment count of elapsed timers
        this.numElapsedTimers++
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
    if (this.state.isCounting) {
      return
    }
    // pull down current state of minutes and seconds
    const min = this.state.minutes
    const sec = this.state.seconds
    // convert minutes place to seconds and add seconds place to total secondsRemaining
    this.secondsRemaining = (min * 60) + sec
    // call tick first time to compensate for delay experiences with setInterval
    this.tick()
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

  // when component unmounts...
  componentWillUnmount = () => {
    // stop interval
    clearInterval(this.handleInterval)
    // deconstruct props for api patch call
    const { user, task } = this.props
    const userToken = user.token
    const taskId = task.id

    // before api call, add num of times timer reached 00:00 to current number
    // of pomodoro sessions stored in db
    task.number_pomodoro_sessions += this.numElapsedTimers

    // patch resource with updated total number times timer elapsed
    apiActions.editTask(task, taskId, userToken)
      .then(console.log)
      .catch(console.log)
  }

  render () {
    return (
      <div className="pomodoro">
        <div className="timer">{this.state.minutes}:{this.state.seconds === 0 ? '00' : this.state.seconds}</div>
        <div className="timer-controls">
          <i onClick={this.startCountdown} className="material-icons">play_arrow</i>
          <i onClick={this.pauseCountdown} className="material-icons">pause_circle_outline</i>
          <i onClick={this.resetCountdown} className="material-icons">update</i>
        </div>
      </div>
    )
  }
}

export default Timer
