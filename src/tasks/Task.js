import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../apiConfig'

class Task extends Component {
  constructor () {
    super()

    this.state = {
      task: null,
      isLoaded: false
    }
  }

  componentDidMount = () => {
    console.log('Task component mounted')
    const userToken = this.props.user.token
    const taskId = this.props.match.params.id
    axios({
      url: `${apiUrl}/tasks/${taskId}`,
      method: 'get',
      headers: {
        Authorization: `Token token=${userToken}`
      }
    })
      .then(response => (
        this.setState({ task: response.data.task })
      ))
      .catch(console.log)
  }

  handleDelete = event => (
    event.preventDefault()
  )

  render () {
    if (!this.state.task) {
      return <p>Loading...</p>
    }

    const { id, title, description, date, difficulty, completed } = this.state.task
    return (
      <Fragment>
        <h2>{title}</h2>
        <p>Description: {description}</p>
        <p>Date: {date}</p>
        <p>difficulty: {difficulty}</p>
        <p>completed: {completed}</p>
        <button key={id} onClick={this.handleDelete}>Delete Task</button>
        <Link to={this.props.match.url + '/edit'}><button>Edit Task Details</button></Link>
      </Fragment>
    )
  }
}

// Will pass props to router upon export
export default withRouter(Task)
