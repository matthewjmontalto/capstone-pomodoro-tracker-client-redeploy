import React, { Component, Fragment } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Timer from '../timer/Timer.js'

import messages from '../auth/messages'

// import functions that handle api calls
import apiActions from '../apiActions.js'

class Tasks extends Component {
  constructor () {
    super()
    // mount component with empty tasks array to be replaced with API response data
    this.state = {
      tasks: [],
      isLoaded: false
    }
  }
  // run get request when component mounts
  componentDidMount () {
    const { alert } = this.props
    // "GET" /tasks
    const userToken = this.props.user.token
    apiActions.getTasks(userToken)
      .then(response => (
        this.setState({
          tasks: response.data.tasks,
          isLoaded: true
        })
      ))
      .catch(() => alert(messages.getTasksFailure, 'danger'))
  }

  render () {
    if (this.state.tasks.length === 0) {
      return <NavLink to="/create-task">Add Task</NavLink>
    }

    // at render, sort tasks object by date
    const sortedTasks = this.state.tasks.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })

    const todaysTasks = sortedTasks.filter(task => {
      // starting format is YYYY-MM-DD. Append 12:00 to force date to be today
      const ignoreTimezone = `${task.date} 12:00`
      // convert starting format to JS date formate
      const taskDate = new Date(ignoreTimezone)
      // get today's date
      const today = new Date(Date.now())
      // return new array with objects containing today's date
      return taskDate.toDateString() === today.toDateString()
    })

    return (
      <Fragment>
        <NavLink to="/create-task">Add Task</NavLink>
        <h2>Today&#39;s Tasks</h2>
        <ul>
          { todaysTasks.map(task => (
            <li key={task.id}>
              <Link to={'/tasks/' + task.id}>{task.title}</Link>
              <p>pomodoro rounds: {task.number_pomodoro_sessions}</p>
              <p>date: {task.date}</p>
              <Timer
                user={this.props.user}
                task={task}
              />
            </li>
          )) }
        </ul>
      </Fragment>
    )
  }
}

export default Tasks
