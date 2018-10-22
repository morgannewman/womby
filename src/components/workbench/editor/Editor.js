import './Editor.scss'
import React from 'react'
import { connect } from 'react-redux'
import { Editor as Slate } from 'slate-react'
import { Value } from 'slate'
import { updateNote } from '../../../controller/actions/workbench'

// If the currentNote === null
// Don't render editor
// Render editor based on current note
// On currentNote change, dismount the editor?

export class Editor extends React.Component {
  generateEditorValueFromCurrentNote = () => {
    const note = this.props.currentNote
    return Value.fromJSON(note.document)
  }

  componentWillMount() {
    // get the current note from database
    this.setState({ value: this.generateEditorValueFromCurrentNote() })
    // Start the update timer
    // this.autosave = setInterval(
    //   () => this.props.dispatch(),
    //   10000
    // )
  }

  componentDidUpdate(prevProps) {
    // User selects different note
    if (prevProps.currentNote.id !== this.props.currentNote.id) {
      // Populate editor with new note
      this.setState({ value: this.generateEditorValueFromCurrentNote() })
      // update db
      // this.props.dispatch
      // clearInterval(this.autosave)
      // Reset the dispatch timer
    }
  }

  onChange = ({ value }) => {
    if (value.document !== this.state.value.document) {
      const document = value.toJSON()
      // console.log(JSON.stringify(document))
      this.props.dispatch(updateNote(this.props.currentNote.id, document))
    }

    this.setState({ value })
  }

  componentWillUnmount() {
    console.log('unmounted!')
    // Save note to DB
  }

  render() {
    return (
      <div className="editor-container">
        <Slate
          className="editor"
          value={this.state.value}
          onChange={this.onChange}
          key={this.props.currentNote.id}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentNote: state.workbench.currentNote
})

export default connect(mapStateToProps)(Editor)
