import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

export class HeaderBar extends React.Component {
  handleLogout = () => {
    this.props.dispatch(logout());
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <button onClick={this.handleLogout}>Log out</button>
      );
    }
    return (
      <div className="header-bar">
        <h1>Womby</h1>
        {logOutButton}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
