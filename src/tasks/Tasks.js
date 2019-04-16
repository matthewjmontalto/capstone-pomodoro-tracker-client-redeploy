import React, { Component, Fragment } from 'react'
import { NavLink, Link } from 'react-router-dom'

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
      return <p>Loading...</p>
    }

    return (
      <Fragment>
        <NavLink to="/create-task">Add Task</NavLink>
        <h2>Today&#39;s Tasks</h2>
        <ul>
          { this.state.tasks.map(task => (
            <li key={task.id}>
              <Link to={'/tasks/' + task.id}>{task.title}</Link>
            </li>
          )) }
        </ul>
      </Fragment>
    )
  }
}

export default Tasks
