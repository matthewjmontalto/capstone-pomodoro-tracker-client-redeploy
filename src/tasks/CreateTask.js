import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../apiConfig'

class CreateTask extends Component {
  constructor () {
    super()

    this.state = {
      task: {
        title: '',
        description: '',
        date: '',
        completed: false,
        difficulty: 0,
        number_pomodoro_sessions: 0
      },
      created: false
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    const { task } = this.state

    axios({
      url: `${apiUrl}/tasks`,
      method: 'post',
      headers: {
        Authorization: `Token token=${this.props.user.token}`
      },
      data: { task }
    })
      .then(response => (
        this.setState({
          task: response.data.task,
          created: true
        })
      ))
      // reset state data to clear form fields
      .catch(() => (
        this.setState({
          task: {
            ...task,
            title: '',
            description: '',
            difficulty: 0,
            date: ''
          }
        })
      ))
  }

  handleChange = event => {
    // hold form input name
    const inputName = event.target.name
    // hold form input value
    const updateInputValue = event.target.value
    // create new object to overwrite initial state.task with form data as provided
    const createTask = { ...this.state.task, [inputName]: updateInputValue }
    // overwrite initial state.task with create-form data
    this.setState({ task: createTask })
  }

  render () {
    const { title, description, date, difficulty } = this.state.task

    if (this.state.created) {
      return <Redirect to='/tasks' />
    }

    return (
      <Fragment>
        <h2>Add New Task</h2>
        <form className="auth-form" onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={title}
            name="title"
            onChange={this.handleChange}
            required
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={description}
            name="description"
            onChange={this.handleChange}
            required
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
          <input type="submit" />
        </form>
        <Link to='/tasks'>Back</Link>
      </Fragment>
    )
  }
}

export default CreateTask
