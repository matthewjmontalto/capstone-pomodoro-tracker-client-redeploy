import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { Link, withRouter } from 'react-router-dom'
import CanvasTimer from '../timer/CanvasTimer.js'

import messages from '../auth/messages'

// import functions that handle api calls
import apiActions from '../apiActions.js'

class Task extends Component {
  constructor () {
    super()

    this.state = {
      task: null,
      isLoaded: false,
      shouldRedirect: false
    }
  }

  // run get request when component mounts
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

  handleDelete = event => {
    const { alert } = this.props

    const userToken = this.props.user.token
    const taskId = this.props.match.params.id

    // 'DELETE' /task/:id
    apiActions.deleteTask(taskId, userToken)
      .then(response => this.setState({ shouldRedirect: true }))
      .catch(() => alert(messages.deleteTasksFailure, 'danger'))
  }

  render () {
    if (!this.state.task) {
      return <p>Loading...</p>
    }

    if (this.state.shouldRedirect) {
      return <Redirect to={{
        pathname: '/tasks'
      }} />
    }

    const { id, title, description, date, difficulty, completed } = this.state.task
    return (
      <Fragment>
        <h2>{title}</h2>
        <CanvasTimer />
        <p>Description: {description}</p>
        <p>Date: {date}</p>
        <p>difficulty: {difficulty}</p>
        <p>completed: {completed ? 'Done' : 'Incomplete'}</p>
        <button key={id} onClick={this.handleDelete}>Delete Task</button>
        <Link to={this.props.match.url + '/edit'}><button>Edit Task Details</button></Link>
      </Fragment>
    )
  }
}

// Will pass props to router upon export
export default withRouter(Task)
