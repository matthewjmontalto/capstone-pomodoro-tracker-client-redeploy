import React, { Component, Fragment } from 'react'
import messages from '../auth/messages'
import apiActions from '../apiActions.js'

import './CanvasTimer.scss'

class CanvasTimer extends Component {
  constructor (props) {
    super(props)

    // creates a reference to the canvas node element in the DOM
    // Gets passed as attribute to JSX canvas element
    this.state = {
      minutes: 25,
      seconds: 0,
      isCounting: false,
      wasPaused: false,
      onBreak: false,
      percentComplete: 1
    }

    this.canvasRef = React.createRef()
    this.startingMinutes = 25
    this.secondsRemaining = 0
    this.handleInterval = null
    this.numElapsedTimers = 0
  }

  // Redraw arc every time state gets updated by tick()
  timerProgress = (color, percent) => {
    const canvasTimer = this.canvasRef.current
    const ctx = canvasTimer.getContext('2d')

    ctx.clearRect(0, 0, 300, 300)
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = '35'
    ctx.arc(150, 150, 100, 0, ((percent * 2) * Math.PI), false)
    ctx.stroke()
  }

  // Draw initial arc on mount
  componentDidMount = () => {
    const canvasTimer = this.canvasRef.current
    const ctx = canvasTimer.getContext('2d')

    ctx.beginPath()
    ctx.strokeStyle = 'grey'
    ctx.lineWidth = '35'
    ctx.arc(150, 150, 100, 0, 2 * Math.PI, true)
    ctx.stroke()
  }

  // Update arc style depending timer remaining duration
  componentWillUpdate = () => {
    if (this.state.percentComplete > 0.25) {
      this.timerProgress('#caebf2', this.state.percentComplete)
    } else if (this.state.percentComplete === 0) {
      this.timerProgress('grey', 1)
    } else {
      this.timerProgress('#ff383f', this.state.percentComplete)
    }
  }

  // Calculate a percent-like value that acts as radian for canvas arc -
  // does not return actual percentage.
  calcPercentComplete = () => {
    const startingSeconds = (this.startingMinutes * 60)
    const percent = this.secondsRemaining / startingSeconds
    this.setState({
      percentComplete: percent
    })
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

    // when timer runs down to 00:00 clear interval, update db, and toggle
    // between work and break times.
    if (min === 0 & sec === 0) {
      clearInterval(this.handleInterval)
      if (!this.state.onBreak) {
        // increment count of elapsed timers
        this.numElapsedTimers++
        // deconstruct props for api patch call
        const { user, task } = this.props
        const userToken = user.token
        const taskId = task.id
        // before api call, add num of times timer reached 00:00 to current number
        // of pomodoro sessions returned from db
        task.number_pomodoro_sessions += this.numElapsedTimers

        // patch resource with updated total number times timer elapsed
        apiActions.editTask(task, taskId, userToken)
          .then(() => {
            if (this.numElapsedTimers % 4 === 0) {
              this.setState({
                minutes: 15,
                seconds: 0,
                isCounting: false,
                onBreak: true,
                percentComplete: 1
              })
              this.startingMinutes = 15
            } else {
              this.setState({
                minutes: 5,
                seconds: 0,
                isCounting: false,
                onBreak: true,
                percentComplete: 1
              })
              this.startingMinutes = 5
            }
          })
          .catch(() => alert(messages.editTasksFailure, 'danger'))
      } else {
        this.setState({
          minutes: 25,
          seconds: 0,
          isCounting: false,
          onBreak: false,
          percentComplete: 1
        })
        this.startingMinutes = 25
      }
    } else {
      this.secondsRemaining--
      this.calcPercentComplete()
    }
    // console.log(this.percentComplete)
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
    if (!this.wasPaused) {
      this.secondsRemaining = (min * 60) + sec
    }
    // call tick first time to compensate for delay experiences with setInterval
    this.tick()
    // call this.tick() every second until setInterval gets cleared
    this.handleInterval = setInterval(this.tick, 1000)
    // toggle state to represent a running timer
    this.setState({
      isCounting: true,
      wasPaused: false
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
      onBreak: false,
      percentComplete: 1
    })
    this.startingMinutes = 25
    this.timerProgress('grey', 1)
  }

  componentWillUnmount = () => {
    if (this.state.isCounting) {
      clearInterval(this.handleInterval)
    }
  }

  render () {
    return (
      <Fragment>
        <div className="analaog-pomodoro">
          <div className="timer-wrapper">
            <canvas
              ref={this.canvasRef}
              width={300}
              height={300}
            />
          </div>
          <div className="timer-controls">
            <i onClick={this.startCountdown} className="material-icons">play_arrow</i>
            <i onClick={this.pauseCountdown} className="material-icons">pause_circle_outline</i>
            <i onClick={this.resetCountdown} className="material-icons">update</i>
          </div>
          <div className="digital-timer">{this.state.minutes < 10 ? '0' + this.state.minutes : this.state.minutes}:{this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds}</div>
        </div>
      </Fragment>
    )
  }
}

export default CanvasTimer
