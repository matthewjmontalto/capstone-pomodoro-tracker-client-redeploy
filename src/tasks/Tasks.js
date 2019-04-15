import React, { Component, Fragment } from 'react'
// import { NavLink, Link } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../apiConfig'

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
    console.log('Tasks component mounted')
    // "GET" /Tasks
    axios({
      url: `${apiUrl}/tasks`,
      method: 'get',
      headers: {
        Authorization: `Token token=${this.props.user.token}`
      }
    })
      .then(response => (
        this.setState({
          isLoaded: true,
          tasks: response.data.tasks
        })
      ))
      .catch(console.log)
  }

  render () {
    if (this.state.tasks.length === 0) {
      return <p>Loading...</p>
    }

    console.log('Tasks component renders')
    return (
      <Fragment>
        <h2>Today&#39;s Tasks</h2>
        <ul>
          { this.state.tasks.map(task => (
            <li key={task.id}>{task.title}</li>
          )) }
        </ul>
      </Fragment>
    )
  }
}

export default Tasks
