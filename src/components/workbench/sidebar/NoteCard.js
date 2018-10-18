import React from 'react'
import { parseDate } from '../common/parseDate'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCurrentNote } from '../../../controller/actions/workbench'

export class NoteCard extends React.Component {
  handleClick = e => {
    const noteId = e.currentTarget.dataset.id
    this.props.dispatch(setCurrentNote(noteId))
  }

  render() {
    const { title, updatedAt, id } = this.props.note
    console.log(this.props.isActiveNote)
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
        </li>
      </Link>
    )
  }
}

const mapStateToProps = (state, props) => ({
  isCurrentNote: state.workbench.currentNote === props.note.id
})

export default connect(mapStateToProps)(NoteCard)
