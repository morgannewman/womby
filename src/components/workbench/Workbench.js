import './Workbench.scss'
// modules
import React from 'react'
import { connect } from 'react-redux'
import { Value } from 'slate'
// redux
import { populateNotes } from '../../controller/actions/workbench'
// common
import requiresLogin from '../common/RequiresLogin'
// workbench
import Sidebar from './sidebar/Sidebar'
import Editor from './editor/Editor'
import Toolbar from './toolbar/Toolbar'
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
          <div className="workbench-toolbar">
            <Toolbar />
          </div>
          {/* <div className="workbench-sidebar">
            <Sidebar />
          </div> */}
          <main className="workbench-editor-container clearfix">
            <div className="workbench-editor">
              {this.props.currentNote ? (
                <Editor initialValue={this.generateEditorValueFromNote()} />
              ) : (
                <h1 className="workbench-editor-empty">No Note Selected</h1>
              )}
            </div>
          </main>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  currentNote: state.workbench.currentNote
})

export default requiresLogin()(connect(mapStateToProps)(Workbench))
