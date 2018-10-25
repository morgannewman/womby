import './Workbench.scss'
// modules
import React from 'react'
import { connect } from 'react-redux'
import { Value } from 'slate'
// redux
import {
  populateNotes,
  handleNoteIdRoute
} from '../../controller/actions/workbench'
// common
import requiresLogin from '../common/RequiresLogin'
import { Mobile } from '../common/MediaQuery'
// workbench
import Sidebar from './sidebar/Sidebar'
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
  showSidebar: state.workbench.showSidebar,
  isFetchingNotes: state.workbench.isFetchingNotes
})

export default requiresLogin()(connect(mapStateToProps)(Workbench))
