// modules
import React from 'react'
import { connect } from 'react-redux'
import { Value } from 'slate'
// redux
import { populateNotes } from '../../controller/actions/workbench'
// common
import requiresLogin from '../common/RequiresLogin'
import Layout from './common/Layout'
// workbench
import Sidebar from './sidebar/Sidebar'
import Editor from './editor/Editor'
import Toolbar from './toolbar/Toolbar'
import Nav from './common/Nav'

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
      <Layout
        left={<Sidebar />}
        right={
          this.props.currentNote ? (
            <Editor initialValue={this.generateEditorValueFromNote()} />
          ) : (
            <div>no editor</div>
          )
        }
        rightTop={<Toolbar />}
        top={<Nav />}
      />
    )
  }
}

const mapStateToProps = state => ({
  currentNote: state.workbench.currentNote
})

export default requiresLogin()(connect(mapStateToProps)(Workbench))
