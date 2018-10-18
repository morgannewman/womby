import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../controller/actions/auth'
import './Nav.scss'

export class Nav extends React.Component {
  handleLogout = () => {
    this.props.dispatch(logout())
  }

  render() {
    return (
      <nav className="nav" role="navigation">
        <h3 className="nav-title">Womby</h3>
        <button className="nav-button" onClick={this.handleLogout}>
          Log out
        </button>
      </nav>
    )
  }
}

export default connect()(Nav)
