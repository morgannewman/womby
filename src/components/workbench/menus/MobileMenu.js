import './MobileMenu.scss'
import React from 'react'
import Sidebar from '../menus/sidebar/Sidebar'
import { connect } from 'react-redux'
import { logout } from '../../../controller/actions/auth'
import { MdMenu as HamburgerIcon, MdClose as CloseIcon } from 'react-icons/md'

const baseStyle = {
  fontSize: '3em'
}

const lightStyle = {
  ...baseStyle,
  color: 'white'
}

const darkStyle = {
  ...baseStyle,
  color: '#5a70e7'
}

export class MobileMenu extends React.Component {
  state = {
    isOpen: false
  }

  handleLogout = () => this.props.dispatch(logout())

  openDrawer = () => this.setState({ isOpen: true })
  closeDrawer = () => this.setState({ isOpen: false })

  render() {
    if (this.state.isOpen)
      return (
        <div className="mobile-menu-flyout" onClick={this.closeDrawer}>
          {/* Nav */}
          <section className="mobile-menu-flyout-nav">
            <Sidebar />
            <div className="mobile-menu-flyout-toolbar">
              <button onClick={this.handleLogout}>Logout</button>
            </div>
          </section>
          {/* Overlay */}
          <div
            className="mobile-menu-flyout-overlay"
            onClick={this.closeDrawer}
          >
            <button
              className="mobile-menu-close"
              title="Close navigation drawer"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )
    else
      return (
        <nav>
          <button
            className="mobile-menu-hamburger"
            title="Navigation drawer"
            onClick={this.openDrawer}
          >
            <HamburgerIcon
              style={this.props.hasCurrentNote ? darkStyle : lightStyle}
            />
          </button>
        </nav>
      )
  }
}

const mapStateToProps = state => ({
  hasCurrentNote: state.workbench.currentNote
})

export default connect(mapStateToProps)(MobileMenu)
