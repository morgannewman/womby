import './Toolbar.scss'
import React from 'react'
import { connect } from 'react-redux'
import { toggleSidebar } from '../../../controller/actions/workbench'
import { FaBook as NotebookIcon, FaCog as CogIcon } from 'react-icons/fa'

export class Toolbar extends React.Component {
  handleSidebarToggle = () => {
    this.props.dispatch(toggleSidebar())
  }

  handleSettingsToggle = () => {}

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
            title="Toggle settings viewer"
            aria-label="Toggle settings viewer"
            onClick={this.handleSettingsToggle}
          >
            <CogIcon />
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
