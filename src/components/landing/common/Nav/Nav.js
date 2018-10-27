import './Nav.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

export class HeaderBar extends React.Component {
  render() {
    return (
      <header className="nav-container">
        <div className="nav-inner-container">
          <Link to="/" className="nav-title">
            Womby
          </Link>
          <nav className="nav">
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link className="nav-link" to="/register">
              Get Started
            </Link>
          </nav>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
})

export default connect(mapStateToProps)(HeaderBar)
