import './Toolbar.scss'
import React from 'react'
import { connect } from 'react-redux'
import { toggleSidebar } from '../../../controller/actions/workbench'
import { logout } from '../../../controller/actions/auth'
import { FaBook as NotebookIcon } from 'react-icons/fa'
import { MdPowerSettingsNew as PowerIcon } from 'react-icons/md'

export class Toolbar extends React.Component {
  handleSidebarToggle = () => {
    this.props.dispatch(toggleSidebar())
  }

  handleLogoutPress = () => this.props.dispatch(logout())

  render() {
    return (
      <nav className="toolbar">
        <div className="toolbar-container-top">
          <button
            className="toolbar-item"
            title="Toggle notebook viewer"
            aria-label="Toggle notebook viewer"
            aria-haspopup="true"
            aria-expanded={this.props.showSidebar}
            onClick={this.handleSidebarToggle}
          >
            <NotebookIcon />
          </button>
        </div>
        <div className="toolbar-container-bottom">
          <button
            className="toolbar-item"
            title="Logout"
            aria-label="Logout"
            onClick={this.handleLogoutPress}
          >
            <PowerIcon />
          </button>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  showSidebar: state.workbench.showSidebar
})

export default connect(mapStateToProps)(Toolbar)
