import './Workbench.scss'
// modules
import React from 'react'
import { connect } from 'react-redux'
import { Value } from 'slate'
// redux
import {
  populateNotes,
  handleNoteIdRoute,
  setFirstCurrentNote
} from '../../controller/actions/workbench'
// common
import requiresLogin from '../common/RequiresLogin'
import { Mobile } from '../common/MediaQuery'
// workbench
import Sidebar from './menus/sidebar/Sidebar'
import Editor from './editor/Editor'
import AddNote from './addNote/AddNote'
import Toolbar from './menus/Toolbar'
import MobileMenu from './menus/MobileMenu'

export class Workbench extends React.Component {
  componentDidMount() {
    this.props.dispatch(populateNotes())
  }

  generateEditorValueFromNote = () => {
    const note = this.props.currentNote
    return Value.fromJSON(note.document)
  }

  componentDidUpdate(prevProps) {
    // If there is a note route...
    if (this.props.match.params.id) {
      // handle route on first render
      if (
        prevProps.isFetchingNotes === true &&
        this.props.isFetchingNotes === false
      ) {
        return this.props.dispatch(
          handleNoteIdRoute(this.props.match.params.id)
        )
      }
      // Handle subsequent route changes
      if (this.props.isFetchingNotes === false) {
        const prevRouteId = prevProps.match.params.id
        const currentRouteId = this.props.match.params.id
        if (prevRouteId !== currentRouteId) {
          this.props.dispatch(handleNoteIdRoute(currentRouteId))
        }
      }
    }
    // TODO: Fix this hacky way to put new users directly into a note
    else {
      if (
        prevProps.isFetchingNotes === true &&
        this.props.isFetchingNotes === false
      ) {
        if (this.props.currentNote === null && this.props.notes.length === 1) {
          this.props.dispatch(setFirstCurrentNote())
        }
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="workbench">
          <Mobile>
            {matches =>
              matches ? (
                <div className="workbench-menu-mobile">
                  <MobileMenu />
                </div>
              ) : (
                <div className="workbench-menu-toolbar">
                  <Toolbar />
                  {this.props.showSidebar && (
                    <div className="workbench-sidebar">
                      <Sidebar />
                    </div>
                  )}
                </div>
              )
            }
          </Mobile>
          <div className="workbench-addNote">
            <AddNote />
          </div>
          <main
            className="workbench-editor-container"
            style={this.props.currentNote ? { background: 'white' } : {}}
          >
            <div className="workbench-editor">
              {this.props.currentNote ? (
                <Editor initialValue={this.generateEditorValueFromNote()} />
              ) : (
                <h1 className="workbench-editor_empty">No Note Selected</h1>
              )}
            </div>
          </main>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  currentNote: state.workbench.currentNote,
  notes: state.workbench.notes,
  showSidebar: state.workbench.showSidebar,
  isFetchingNotes: state.workbench.isFetchingNotes
})

export default requiresLogin()(connect(mapStateToProps)(Workbench))
