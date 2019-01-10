import { WORKBENCH_ROOT } from '../config';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewNote } from '../../../controller/actions/workbench';
import { MdAddCircle as AddIcon } from 'react-icons/md';

export class AddNote extends React.Component {
  handleClick = () => {
    this.props.dispatch(addNewNote());
  };

  render() {
    return (
      <Link
        to={`${WORKBENCH_ROOT}/new`}
        className="addNote-link"
        title="Add new note"
        aria-label="Add new note"
        onClick={this.handleClick}
      >
        <AddIcon
          className="addNote-icon"
          style={this.props.currentNote ? {} : { fill: 'white' }}
        />
      </Link>
    );
  }
}

const mapStateToProps = (state) => ({
  currentNote: state.workbench.currentNote,
});

export default connect(mapStateToProps)(AddNote);
