import { db } from '../db/db';

/**
 * This function exists to populate the state when component mounts.
 * In the future, it might also hydrate the state from a previous session.
 */
export const populateNotes = () => (dispatch) => {
  // Set a loading state
  dispatch(populateNotesRequest());
  // Get notes
  return (
    db.notes
      .get()
      // Handle success
      .then((notes) => dispatch(populateNotesSuccess(notes)))
      // Handle failure
      .catch((err) => console.log(err))
  );
};

export const setCurrentNote = (id) => (dispatch, getState) => {
  // find note object with id
  const note = getState().workbench.notes.find((note) => note.id === id);
  if (note) {
    dispatch(setCurrentNoteSuccess(note));
  } else {
    dispatch(setCurrentNoteError());
  }
};

export const SET_FIRST_CURRENT_NOTE = 'SET_FIRST_CURRENT_NOTE';
export const setFirstCurrentNote = () => ({
  type: SET_FIRST_CURRENT_NOTE,
});

export const addNewNote = (title = 'Untitled note') => (dispatch) => {
  // TODO: Figure out an optimistic way to implement this functionality
  db.notes.add(title).then((note) => {
    const id = note.id;
    dispatch(populateNotes()).then(() => dispatch(setCurrentNote(id)));
  });
};

export const updateDocument = (id, document) => (dispatch, getState) => {
  // Find note index by id
  const index = getState().workbench.notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    console.log('updating document!');
    // Make change locally
    dispatch(optimisticallyUpdateDocument(index, document));
    // Send update to DB
    dispatch(updateNoteRequest());
    db.notes
      .updateDocument(id, document)
      .then((note) => dispatch(updateNoteSuccess()))
      .catch((err) => dispatch(updateNoteError()));
  }
};

export const updateTitle = (id, title) => (dispatch, getState) => {
  // Find note index by id
  const index = getState().workbench.notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    // Update note locally
    dispatch(optimisticallyUpdateTitle(index, title));
    // Update note in DB
    dispatch(updateNoteRequest());
    console.log('updating title!');
    db.notes
      .updateTitle(id, title)
      .then((note) => dispatch(updateNoteSuccess()))
      .catch((err) => dispatch(updateNoteError()));
  }
};

export const deleteNote = (id) => (dispatch, getState) => {
  const index = getState().workbench.notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    console.log('delete action dispatched for', id);
    // delete note from local state
    dispatch(optimisticallyDeleteNote(index));
    // delete note from DB
    return db.notes
      .remove(id)
      .then(() => dispatch(deleteNoteSuccess()))
      .catch((err) => dispatch(deleteNoteError()));
  }
};

export const handleNoteIdRoute = (id) => (dispatch, getState) => {
  // Check if note exists in DB
  const note = getState().workbench.notes.find((note) => note.id === id);
  // If so, set it as the current note
  if (note) {
    dispatch(setCurrentNoteSuccess(note));
  }
  // TODO: If not, redirect user to the root
};

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

// Populating notes
export const POPULATE_NOTES_REQUEST = 'POPULATE_NOTES_REQUEST';
const populateNotesRequest = () => ({
  type: POPULATE_NOTES_REQUEST,
});

export const POPULATE_NOTES_SUCCESS = 'POPULATE_NOTES_SUCCESS';
const populateNotesSuccess = (notes) => ({
  type: POPULATE_NOTES_SUCCESS,
  payload: { notes },
});

// CURRENT NOTE STATE
export const SET_CURRENT_NOTE_SUCCESS = 'SET_CURRENT_NOTE_SUCCESS';
export const setCurrentNoteSuccess = (note) => ({
  type: SET_CURRENT_NOTE_SUCCESS,
  payload: note,
});

export const SET_CURRENT_NOTE_ERROR = 'SET_CURRENT_NOTE_ERROR';
export const setCurrentNoteError = () => ({
  type: SET_CURRENT_NOTE_ERROR,
});

// MODIFYING NOTES OPTIMISTICALLY
export const OPTIMISTIC_DELETE_NOTE = 'OPTIMISTIC_DELETE_NOTE';
export const optimisticallyDeleteNote = (index) => ({
  type: OPTIMISTIC_DELETE_NOTE,
  payload: { index },
});

export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS';
export const deleteNoteSuccess = () => ({
  type: DELETE_NOTE_SUCCESS,
});
export const DELETE_NOTE_ERROR = 'DELETE_NOTE_ERROR';
export const deleteNoteError = () => ({
  type: DELETE_NOTE_ERROR,
});

// UPDATING NOTE (e.g. document or title update)
export const OPTIMISTIC_UPDATE_DOCUMENT = 'OPTIMISTIC_UPDATE_DOCUMENT';
export const optimisticallyUpdateDocument = (index, document) => ({
  type: OPTIMISTIC_UPDATE_DOCUMENT,
  payload: {
    index,
    document,
  },
});

export const OPTIMISTIC_UPDATE_TITLE = 'OPTIMISTIC_UPDATE_TITLE';
export const optimisticallyUpdateTitle = (index, title) => ({
  type: OPTIMISTIC_UPDATE_TITLE,
  payload: {
    index,
    title,
  },
});

export const UPDATE_NOTE_REQUEST = 'UPDATE_NOTE_REQUEST';
export const updateNoteRequest = () => ({
  type: UPDATE_NOTE_REQUEST,
});

export const UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS';
export const updateNoteSuccess = () => ({
  type: UPDATE_NOTE_SUCCESS,
});

export const UPDATE_NOTE_ERROR = 'UPDATE_NOTE_ERROR';
export const updateNoteError = () => ({
  type: UPDATE_NOTE_ERROR,
});
