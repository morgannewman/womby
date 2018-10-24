import './Editor.scss'
import React from 'react'
import { connect } from 'react-redux'
import { Editor as Slate } from 'slate-react'
import { Value } from 'slate'
import { updateNote, updateTitle } from '../../../controller/actions/workbench'
import Textarea from 'react-textarea-autosize'

export class Editor extends React.Component {
  generateEditorValueFromCurrentNote = () => {
    const note = this.props.currentNote
    return Value.fromJSON(note.document)
  }

  componentWillMount() {
    this.setState({
      value: this.generateEditorValueFromCurrentNote(),
      title: this.props.currentNote.title
    })
  }

  componentDidUpdate(prevProps) {
    // User selects different note
    if (prevProps.currentNote.id !== this.props.currentNote.id) {
      // Populate editor with new note
      this.setState({
        value: this.generateEditorValueFromCurrentNote(),
        title: this.props.currentNote.title
      })
    }
  }

  handleTitleUpdate = () => {
    const title = this.titleInput.value
    this.props.dispatch(updateTitle(this.props.currentNote.id, title))
    this.setState({ title })
  }

  handleEditorUpdate = ({ value }) => {
    // Prevents updating DB for non-value state changes (e.g. text selection)
    if (value.document !== this.state.value.document) {
      const document = value.toJSON()
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
        <div className="editor-title-container">
          {this.state.title.length &&
            this.state.titleFocused && (
              <label className="editor-title-label" htmlFor="editor-title">
                Title
              </label>
            )}
          <Textarea
            className="editor-title"
            id="editor-title"
            placeholder="Title"
            title="title"
            value={this.state.title}
            inputRef={title => (this.titleInput = title)}
            onChange={this.handleTitleUpdate}
            onBlur={() => this.setState({ titleFocused: false })}
            onFocus={() => this.setState({ titleFocused: true })}
          />
        </div>
        <div className="editor-date-container">
          <p className="editor-date">
            Last updated: <time>A few moments ago...</time>
          </p>
        </div>
        <Slate
          className="editor"
          value={this.state.value}
          onChange={this.handleEditorUpdate}
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
