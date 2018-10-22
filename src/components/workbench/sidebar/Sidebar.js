import './Sidebar.scss'
import React from 'react'
import NotesList from './NotesList'
import { connect } from 'react-redux'
import AddNoteForm from './AddNoteForm'
import {
  addNewNote,
  toggleSidebar
} from '../../../controller/actions/workbench'
import { MdAdd as Plus } from 'react-icons/md'
import { FaBook as Hide } from 'react-icons/fa'

export class Sidebar extends React.Component {
  state = {
    showAddNoteForm: false,
    value: ''
  }

  handleAddNoteClick = e => {
    this.setState({ showAddNoteForm: !this.state.showAddNoteForm })
  }

  handleAddNoteSubmit = title => {
    this.setState({ showAddNoteForm: false })
    this.props.dispatch(addNewNote(title))
  }

  handleSidebarToggle = e => {
    this.props.dispatch(toggleSidebar())
  }

  render() {
    if (!this.props.showSidebar) {
      return (
        <header className="sidebar-header">
          <button
            className="sidebar-button"
            onClick={this.handleSidebarToggle}
            aria-label="Toggle sidebar"
            aria-expanded={this.props.showSidebar}
          >
            <Hide className="sidebar-button-image" />
          </button>
        </header>
      )
    } else {
      return (
        <aside className="sidebar">
          <header className="sidebar-header">
            <button
              className="sidebar-button"
              onClick={this.handleSidebarToggle}
              aria-label="Toggle sidebar"
              aria-expanded={this.props.showSidebar}
            >
              <Hide className="sidebar-button-image" />
            </button>
            <h2 className="sidebar-title">Notebook</h2>
            <button
              className="sidebar-button"
              onClick={this.handleAddNoteClick}
              aria-label="Add new note"
            >
              <Plus className="sidebar-button-image" />
            </button>
          </header>
          {this.state.showAddNoteForm && (
            <AddNoteForm handleSubmit={this.handleAddNoteSubmit} />
          )}
          <div className="sidebar-divider" />
          <NotesList />
        </aside>
      )
    }
  }
}

const mapStateToProps = state => ({
  showSidebar: state.workbench.showSidebar
})

export default connect(mapStateToProps)(Sidebar)
