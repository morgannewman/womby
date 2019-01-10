import React from 'react';
import { connect } from 'react-redux';
import { Editor as Slate } from 'slate-react';
import { Value } from 'slate';
import {
  updateDocument,
  updateTitle,
} from '../../../controller/actions/workbench';
import Textarea from 'react-textarea-autosize';
import Autosaver from './Autosaver';

export class Editor extends React.Component {
  /**
   * Creates a valid title for the editor to use. This should only be used
   * for the component's state.
   * @param {string} title
   * @returns {string} returns either the given title or `Untitled note`
   */
  generateTitleForEditor = (title) => (title === 'Untitled note' ? '' : title);

  /**
   * Creates a valid editor value from the currentNote (an object) in state.
   * This should only be used for the component's state.
   * @returns {Value} a data structure that the editor consumes to display data.
   */
  generateEditorValueFromState = () => {
    const note = this.props.currentNote;
    return Value.fromJSON(note.document);
  };

  /**
   * TODO: Refactor a way to implement this functionality without using this
   * deprecated lifecycle method
   * Before mounting, the editor should:
   * 1. Start the autosave service
   * 2. Populate local state with augmented values for render() to use
   */
  componentWillMount() {
    // These convenience methods are used by autosave
    const saveTitle = (id, title) =>
      this.props.dispatch(updateTitle(id, title));
    const saveDocument = (id, document) =>
      this.props.dispatch(updateDocument(id, document));
    // Bind autosave functionality
    this.autosaveTitle = new Autosaver(saveTitle);
    this.autosaveDocument = new Autosaver(saveDocument);
    // Populate local state for editor to use
    this.setState({
      value: this.generateEditorValueFromState(),
      title: this.generateTitleForEditor(this.props.currentNote.title),
    });
  }

  /**
   * After mounting, the editor should:
   * 1. Focus on the title region if it's an untitled note
   */
  componentDidMount() {
    if (this.props.currentNote.title === 'Untitled note') {
      this.titleInput.focus();
    }
  }

  /**
   * Before unmounting, the editor should:
   * 1. Force the autosave service to save any changes
   */
  componentWillUnmount() {
    console.log('unmounted!');
    this.autosaveDocument.force();
    this.autosaveTitle.force();
  }

  /**
   * On each update, the component should check to see if the current note
   * has changed. If so:
   * 1. Force autosave to save changes
   * 2. Populate the editor with a new note
   * 3. Focus on the title region of an untitled note
   */
  componentDidUpdate(prevProps) {
    // User selects different note
    if (prevProps.currentNote.id !== this.props.currentNote.id) {
      // Save prev note to database
      this.autosaveDocument.force();
      this.autosaveTitle.force();
      // Populate editor with new note
      this.setState(
        {
          value: this.generateEditorValueFromState(),
          title: this.generateTitleForEditor(this.props.currentNote.title),
        },
        () => {
          // When rendering an untitled note, put focus on title region
          if (this.props.currentNote.title === 'Untitled note') {
            this.titleInput.focus();
          }
        }
      );
    }
  }

  /**
   * On each change to the title input:
   * 1. Regex to prevent carriage returns and double spaces
   * 2. If the user deletes all input, set title back to "Untitled note"
   * 3. Set the local title state in editor
   * 4. autosave the title
   */
  handleTitleUpdate = (e) => {
    // Is this the most efficient way to remove whitespace AND newlines?
    let title = this.titleInput.value
      .replace(/[\n\r]+/g, '')
      .replace(/[ ]{2,}/g, ' ');
    // Resets title to "Untitled note" when given an empty note
    if (title === '') title = 'Untitled note';
    this.setState({ title: this.generateTitleForEditor(title) });
    this.autosaveTitle.push(this.props.currentNote.id, title);
  };

  /**
   * On each change to the editor:
   * 1. Update the local state
   * 2. If the actual value has changed, autosave
   */
  handleEditorUpdate = ({ value }) => {
    // Prevents updating DB for non-value state changes (e.g. text selection)
    if (value.document !== this.state.value.document) {
      const document = value.toJSON();
      this.autosaveDocument.push(this.props.currentNote.id, document);
    }
    this.setState({ value });
  };

  render() {
    return (
      <div className="editor-container">
        <h1 className="screen-reader-only">{this.props.currentNote.title}</h1>
        <form className="editor-title-container">
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
            inputRef={(title) => (this.titleInput = title)}
            onChange={this.handleTitleUpdate}
            onBlur={() => this.setState({ titleFocused: false })}
            onFocus={() => this.setState({ titleFocused: true })}
          />
        </form>
        <div className="editor-date-container">
          {/* <p className="editor-date">
            Last updated: <time>A few moments ago...</time>
          </p> */}
        </div>
        <Slate
          className="editor"
          value={this.state.value}
          onChange={this.handleEditorUpdate}
          key={this.props.currentNote.id}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentNote: state.workbench.currentNote,
});

export default connect(mapStateToProps)(Editor);
