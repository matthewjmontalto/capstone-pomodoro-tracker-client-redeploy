import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { Link, withRouter } from 'react-router-dom'
import CanvasTimer from '../timer/CanvasTimer.js'

import messages from '../auth/messages'

// import functions that handle api calls
import apiActions from '../apiActions.js'

// styles
import './Task.scss'

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
        <CanvasTimer
          user={this.props.user}
          task={this.state.task}
        />
        <div className="task-display">
          <h2>{title}</h2>
          <p>Description: {description}</p>
          <p>Date: {date}</p>
          <p>Points: {difficulty}</p>
          <p>Completed: {completed ? 'Done' : 'Incomplete'}</p>
          <i key={id} onClick={this.handleDelete} className="material-icons">delete_forever</i>
          <Link to={this.props.match.url + '/edit'}><i className="material-icons">edit</i></Link>
        </div>
      </Fragment>
    )
  }
}

// Will pass props to router upon export
export default withRouter(Task)
