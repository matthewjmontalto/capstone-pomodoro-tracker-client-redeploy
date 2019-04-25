import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

// Auth/Nav components
import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

// Home
import WelcomeInstructions from './home/components/Carousel'

// Resource components
import Tasks from './tasks/Tasks.js'
import Task from './tasks/Task.js'
import CreateTask from './tasks/CreateTask.js'
import EditTask from './tasks/EditTask.js'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  componentWillMount () {
    document.body.style.backgroundColor = '#efefef'
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          {/* Nav/Auth Routes */}
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          {/* Home */}
          <Route exact path='/' render={() => (
            <WelcomeInstructions />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          {/* Task Routes */}
          <AuthenticatedRoute user={user} exact path='/tasks' render={() => (
            <Tasks alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-task' render={() => (
            <CreateTask alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/tasks/:id' render={(props) => (
            <Task alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/tasks/:id/edit' render={(props) => (
            <EditTask alert={this.alert} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
