import './Workbench.scss'
// modules
import React from 'react'
import { connect } from 'react-redux'
import { Value } from 'slate'
// redux
import { populateNotes } from '../../controller/actions/workbench'
// common
import requiresLogin from '../common/RequiresLogin'
import { Mobile } from '../common/MediaQuery'
// workbench
import Sidebar from './sidebar/Sidebar'
import Editor from './editor/Editor'
import Toolbar from './menu/Toolbar'
import MobileMenu from './menu/MobileMenu'
import Header from './common/Header'

export class Workbench extends React.Component {
  componentDidMount() {
    this.props.dispatch(populateNotes())
  }

  generateEditorValueFromNote = () => {
    const note = this.props.currentNote
    return Value.fromJSON(note.document)
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
  showSidebar: state.workbench.showSidebar
})

export default requiresLogin()(connect(mapStateToProps)(Workbench))
