import './NotesList.scss'
import React from 'react'
import { connect } from 'react-redux'
import NoteCard from './NoteCard'

export class NotesList extends React.Component {
  renderNoteCards() {
    const { notes } = this.props
    if (notes && notes.length) {
      return notes.map(note => <NoteCard note={note} key={note.id} />)
    } else return <div>There doesn't seem to be anything here...</div>
  }

  render() {
    if (this.props.loading) return <div>Loading...</div>
    else return <ul className="sidebar-notes">{this.renderNoteCards()}</ul>
  }
}

const mapStateToProps = state => ({
  notes: state.workbench.notes,
  loading: state.workbench.loadingNotes
})

export default connect(mapStateToProps)(NotesList)
