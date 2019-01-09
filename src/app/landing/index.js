import React from 'react';
import { WORKBENCH_ROOT } from '../workbench/config';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Nav from './common/Nav/Nav';
import Home from './Home/Home';
import Login from './Login/Login';
import Registration from './Registration/Registration';

const mapStateToProps = (state) => ({
  loggedIn: state.auth.currentUser !== null,
});

export class Landing extends React.Component {
  render() {
    // If we are logged in redirect straight to the user's home
    if (this.props.loggedIn) {
      return <Redirect to={WORKBENCH_ROOT} />;
    }

    return (
      <React.Fragment>
        <div className="landing">
          <Nav />
          <div className="landing-wrapper">
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Registration} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(Landing));
