import React from 'react'
import { parseDate } from '../common/parseDate'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  setCurrentNote,
  deleteNote
} from '../../../controller/actions/workbench'

export class NoteCard extends React.Component {
  handleClick = e => {
    const { id } = this.props.note
    this.props.dispatch(setCurrentNote(id))
  }

  handleDeleteClick = e => {
    e.preventDefault()
    e.stopPropagation()
    const { id } = this.props.note
    this.props.dispatch(deleteNote(id))
  }

  render() {
    const { title, updatedAt, id } = this.props.note
    return (
      <Link
        to={{ search: `note=${id}` }}
        data-id={id}
        onClick={this.handleClick}
      >
        <li
          className={`sidebar-notes-card${
            this.props.isCurrentNote ? ' sidebar-notes-card-active' : ''
          }`}
        >
          <h4 className="sidebar-notes-card-title">{title}</h4>
          <time className="sidebar-notes-card-date">
            {parseDate.long(updatedAt)}
          </time>
          <button
            className="sidebar-notes-card-delete"
            onClick={this.handleDeleteClick}
            role="button"
          >
            Delete
          </button>
        </li>
      </Link>
    )
  }
}

const mapStateToProps = (state, props) => ({
  isCurrentNote: state.workbench.currentNote
    ? state.workbench.currentNote.id === props.note.id
    : false
})

export default connect(mapStateToProps)(NoteCard)
