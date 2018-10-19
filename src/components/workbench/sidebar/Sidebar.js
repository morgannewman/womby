import './Sidebar.scss'
import React from 'react'
import NotesList from './NotesList'

export default class Sidebar extends React.Component {
  render() {
    return (
      <aside className="sidebar">
        <NotesList />
      </aside>
    )
  }
}
