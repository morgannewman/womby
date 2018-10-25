import React from 'react'
import { WORKBENCH_ROOT } from '../workbench/config'
import { connect } from 'react-redux'
import { Route, withRouter, Redirect } from 'react-router-dom'
import Nav from './Nav'
import LandingPage from './LandingPage'
import LoginPage from './LoginPage'
import RegistrationPage from './RegistrationPage'

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
})

export class Landing extends React.Component {
  render() {
    // If we are logged in redirect straight to the user's home
    if (this.props.loggedIn) {
      return <Redirect to={WORKBENCH_ROOT} />
    }

    return (
      <React.Fragment>
        <Nav />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegistrationPage} />
      </React.Fragment>
    )
  }
}

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(Landing))
