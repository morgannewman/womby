import './NotesList.scss'
import React from 'react'
import { connect } from 'react-redux'
import NoteCard from './NoteCard'

const mapStateToProps = state => ({
  notes: state.notes.notes,
  loading: state.notes.loadingNotes
})

export class NotesList extends React.Component {
  render() {
    const { loading } = this.props
    if (loading) return <div>Loading...</div>
    else return <ul className="sidebar-notes">{this.noteCards}</ul>
  }

  get noteCards() {
    const { notes } = this.props
    if (notes && notes.length) {
      return notes.map(note => <NoteCard note={note} key={note.id} />)
    } else return <div>There doesn't seem to be anything here...</div>
  }
}

export default connect(mapStateToProps)(NotesList)
