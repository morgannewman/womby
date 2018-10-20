import './Sidebar.scss'
import React from 'react'
import NotesList from './NotesList'
import { connect } from 'react-redux'
import AddNoteForm from './AddNoteForm'
import { addNewNote } from '../../../controller/actions/workbench'

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

  render() {
    return (
      <aside className="sidebar">
        <h2>Notebook</h2>
        <button onClick={this.handleAddNoteClick}>Add Note +</button>
        {this.state.showAddNoteForm && (
          <AddNoteForm handleSubmit={this.handleAddNoteSubmit} />
        )}
        <NotesList />
      </aside>
    )
  }
}

export default connect()(Sidebar)
