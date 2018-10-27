import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter, Switch } from 'react-router-dom'
import Landing from './landing'
import Workbench from './workbench/Workbench'
import { WORKBENCH_ROOT } from './workbench/config'
import { refreshAuthToken } from '../controller/actions/auth'

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
})

export class App extends React.Component {
  render() {
    // If logged in:
    // Workbench
    // else
    // Landing
    return (
      <div className="app">
        <Switch>
          <Route exact path={`${WORKBENCH_ROOT}/:id`} component={Workbench} />
          <Route exact path={`${WORKBENCH_ROOT}/new`} component={Workbench} />
          <Route path={WORKBENCH_ROOT} component={Workbench} />
          <Route path="/" component={Landing} />
        </Switch>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    // Runs on first render after login
    if (!prevProps.loggedIn && this.props.loggedIn) this.startPeriodicRefresh()
    // Runs on first render after out
    else if (prevProps.loggedIn && !this.props.loggedIn)
      this.stopPeriodicRefresh()
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh()
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // 1 hour
    )
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return
    }
    clearInterval(this.refreshInterval)
  }
}

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App))
