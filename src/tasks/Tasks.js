import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import Timer from '../timer/Timer.js'

import './Tasks.scss'

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

  sortTasks = () => (
    this.state.tasks.sort((a, b) => new Date(b.date) - new Date(a.date))
  )

  todaysTasks = () => (
    this.state.tasks.filter(task => {
      // starting format is YYYY-MM-DD. Append 12:00 to force date to be today
      const ignoreTimezone = `${task.date} 12:00`
      // convert starting format to JS date formate
      const taskDate = new Date(ignoreTimezone)
      // get today's date
      const today = new Date(Date.now())
      // return new array with objects containing today's date
      return taskDate.toDateString() === today.toDateString()
    })
  )

  completeTask = event => {
    const userToken = this.props.user.token
    const completedTask = this.state.tasks.find(task => {
      return parseInt(task.id, 10) === parseInt(event.target.id, 10)
    })
    completedTask.completed = true
    const taskId = completedTask.id

    apiActions.editTask(completedTask, taskId, userToken)
      .then(() => apiActions.getTasks(userToken))
      .then(response => (
        this.setState({
          tasks: response.data.tasks,
          isLoaded: true
        })
      ))
      .then(() => console.log(this.state.tasks))
      .catch(() => alert(messages.getTasksFailure, 'danger'))
  }

  render () {
    if (this.state.tasks.length === 0) {
      return <NavLink to="/create-task">Add Task</NavLink>
    }

    return (
      <Fragment>
        <section className="tasks-list">
          <header className="tasks-header">
            <div>
              <h2>My Tasks</h2>
            </div>
            <div>
              <NavLink to="/create-task">
                <div className="add-task">
                  <i className="material-icons">add_circle</i>
                </div>
              </NavLink>
            </div>
          </header>
          { this.sortTasks().map(task => (
            <div key={task.id} className={ task.completed ? 'task completed' : 'task incomplete' }>
              <div className="task-complete">
                <i id={task.id} onClick={this.completeTask} className="material-icons">{task.completed ? '' : 'check_circle_outline'}</i>
              </div>
              <div className="task-title">
                <NavLink to={'/tasks/' + task.id}>{task.title}</NavLink>
              </div>
              <div>
                <Timer
                  user={this.props.user}
                  task={task}
                />
              </div>
            </div>
          )) }
        </section>
      </Fragment>
    )
  }
}

export default Tasks
