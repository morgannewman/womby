// Libraries
import React from 'react'
import { parseDate } from '../common/parseDate'
import { Link } from 'react-router-dom'
// Redux
import { connect } from 'react-redux'
import {
  setCurrentNote,
  deleteNote
} from '../../../controller/actions/workbench'
// Resources
import { MdClose as Delete } from 'react-icons/md'

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
      <li
        className={`sidebar-notes-card ${
          this.props.isCurrentNote ? 'sidebar-notes-card-active' : ''
        }`}
      >
        <button
          data-id={id}
          onClick={this.handleClick}
          className="sidebar-notes-card-link"
        >
          <h4 className="sidebar-notes-card-title">{title}</h4>
          <time className="sidebar-notes-card-date">
            {parseDate.long(updatedAt)}
          </time>
        </button>
        <button
          onClick={this.handleDeleteClick}
          className="sidebar-notes-card-menu"
          aria-label={`Delete ${title}`}
        >
          <Delete />
        </button>
      </li>
    )
  }
}

const mapStateToProps = (state, props) => ({
  isCurrentNote: state.workbench.currentNote
    ? state.workbench.currentNote.id === props.note.id
    : false
})

export default connect(mapStateToProps)(NoteCard)
