import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { Link, withRouter } from 'react-router-dom'

import messages from '../auth/messages'

// import functions that handle api calls
import apiActions from '../apiActions.js'

import './TaskForms.scss'

class EditTask extends Component {
  constructor () {
    super()

    this.state = {
      task: null,
      updated: false
    }
  }

  componentDidMount = () => {
    const { alert } = this.props

    const userToken = this.props.user.token
    const taskId = this.props.match.params.id
    // 'GET' /task/:id
    apiActions.getTask(taskId, userToken)
      .then(response => (
        this.setState({ task: response.data.task })
      ))
      .catch(() => alert(messages.getTaskFailure, 'danger'))
  }

  handleSubmit = event => {
    event.preventDefault()
    const userToken = this.props.user.token
    const taskId = this.props.match.params.id
    const { task } = this.state
    const { alert } = this.props

    // 'PATCH' '/tasks/:id'
    apiActions.editTask(task, taskId, userToken)
      .then(response => (
        this.setState({
          task: response.data.task,
          updated: true
        })
      ))
      .catch(() => {
        alert(messages.editTaskFailure, 'danger')
        this.setState({
          task: {
            ...task,
            title: '',
            description: '',
            difficulty: 0,
            date: ''
          }
        })
      })
  }

  handleChange = event => {
    // hold form input name
    const inputName = event.target.name
    // fix checkbox to be true or false instead of 'on' or ''
    const updatedInputValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    // create new object to overwrite initial state.task with form data as provided
    const updatedTaskObject = { ...this.state.task, [inputName]: updatedInputValue }
    // overwrite initial state.task with create-form data
    this.setState({ task: updatedTaskObject })
  }

  render () {
    if (!this.state.task) {
      return <p>Loading...</p>
    }

    if (this.state.updated) {
      return <Redirect to={{
        pathname: `/tasks/${this.props.match.params.id}`
      }} />
    }

    const { title, description, date, difficulty, completed } = this.state.task
    // cannot compile with deconstructed snake-case var
    const numberPomodoroSessions = this.state.task.number_pomodoro_sessions

    return (
      <Fragment>
        <Link to={'/tasks/' + this.props.match.params.id}>Back</Link>
        <form className="task-form" onSubmit={this.handleSubmit}>
          <h2>Edit Task Details</h2>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={title}
            name="title"
            onChange={this.handleChange}
            minLength={3}
            maxLength={18}
            required
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={description}
            name="description"
            onChange={this.handleChange}
            minLength={3}
            maxLength={128}
            required
          />
          <label htmlFor="completed">Task Completed</label>
          <input
            type="checkbox"
            checked={completed}
            name="completed"
            onChange={this.handleChange}
          />
          <label htmlFor="difficulty">Difficulty</label>
          <input
            type="number"
            value={difficulty}
            name="difficulty"
            onChange={this.handleChange}
          />
          <label htmlFor="date">Date</label>
          <input
            type="date"
            value={date}
            name="date"
            onChange={this.handleChange}
          />
          <label htmlFor="number_pomodoro_sessions">Number of pomodoro rounds</label>
          <input
            type="number"
            min="0"
            value={numberPomodoroSessions}
            name="number_pomodoro_sessions"
            onChange={this.handleChange}
          />
          <button type="submit">Update Task</button>
        </form>
      </Fragment>
    )
  }
}

export default withRouter(EditTask)
