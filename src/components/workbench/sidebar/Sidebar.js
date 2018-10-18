import './Sidebar.scss'
import React from 'react'
import { connect } from 'react-redux'
import NotesList from './NotesList'

export class Sidebar extends React.Component {
  render() {
    return (
      <aside className="sidebar">
        <NotesList />
      </aside>
    )
  }
}

export default connect()(Sidebar)
