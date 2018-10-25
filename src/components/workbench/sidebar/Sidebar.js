import './Sidebar.scss'
import React from 'react'
import NotesList from './NotesList'
import { connect } from 'react-redux'
import {
  addNewNote,
  toggleSidebar
} from '../../../controller/actions/workbench'

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
    return (
      <section aria-labelledby="sidebar-title" className={`sidebar ${`sidebar-hidden-${this.props.showSidebar}`}`}>
        <header className="sidebar-header">
          <h2 id="sidebar-title" className="sidebar-title">
            Notebook
          </h2>
        </header>
        <div className="sidebar-divider" />
        <NotesList />
      </section>
    )
  }
}

const mapStateToProps = state => ({
  showSidebar: state.workbench.showSidebar
})

export default connect(mapStateToProps)(Sidebar)
