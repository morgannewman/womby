import React from 'react';
import { connect } from 'react-redux';
import NoteCard from './NoteCard';

export class NotesList extends React.Component {
  renderNoteCards() {
    const { notes } = this.props;
    if (notes && notes.length) {
      return notes.map((note) => <NoteCard note={note} key={note.id} />);
      // TODO: ADD A LOADING STATE
    } else return <div />;
  }

  render() {
    // TODO ADD A LOADING STATE
    if (this.props.loading) return <div />;
    else return <ul className="sidebar-notes">{this.renderNoteCards()}</ul>;
  }
}

const mapStateToProps = (state) => ({
  notes: state.workbench.notes,
  loading: state.workbench.loadingNotes,
});

export default connect(mapStateToProps)(NotesList);
