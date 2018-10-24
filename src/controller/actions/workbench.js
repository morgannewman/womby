import { db } from '../../db/db'

export const SET_CURRENT_NOTE_SUCCESS = 'SET_CURRENT_NOTE_SUCCESS'
export const setCurrentNoteSuccess = note => ({
  type: SET_CURRENT_NOTE_SUCCESS,
  payload: note
})

export const SET_CURRENT_NOTE_ERROR = 'SET_CURRENT_NOTE_ERROR'
export const setCurrentNoteError = () => ({
  type: SET_CURRENT_NOTE_ERROR
})

export const UPDATE_NOTE_REQUEST = 'UPDATE_NOTE_REQUEST'
export const updateNoteRequest = () => ({
  type: UPDATE_NOTE_REQUEST
})

export const UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS'
export const updateNoteSuccess = () => ({
  type: UPDATE_NOTE_SUCCESS
})

export const UPDATE_NOTE_ERROR = 'UPDATE_NOTE_ERROR'
export const updateNoteError = () => ({
  type: UPDATE_NOTE_ERROR
})

export const setCurrentNote = id => (dispatch, getState) => {
  // find note object with id
  const note = getState().workbench.notes.find(note => note.id === id)
  if (note) {
    dispatch(setCurrentNoteSuccess(note))
  } else {
    dispatch(setCurrentNoteError())
  }
}

export const OPTIMISTIC_UPDATE_NOTE = 'OPTIMISTIC_UPDATE_NOTE'
export const optimisticallyUpdateNote = (id, document) => ({
  type: OPTIMISTIC_UPDATE_NOTE,
  payload: {
    id,
    document
  }
})

export const updateNote = (id, document) => (dispatch, getState) => {
  // Make change locally
  dispatch(optimisticallyUpdateNote(id, document))
  // Send update to DB
  dispatch(updateNoteRequest())
  db.notes
    .updateDocument(id, document)
    .then(() => dispatch(updateNoteSuccess(id, document)))
    // On success, update redux store
    .catch(err => dispatch(updateNoteError()))
}

export const OPTIMISTIC_UPDATE_TITLE = 'OPTIMISTIC_UPDATE_TITLE'
export const optimisticallyUpdateTitle = (id, title) => ({
  type: OPTIMISTIC_UPDATE_TITLE,
  payload: {
    id,
    title
  }
})

export const updateTitle = (id, title) => (dispatch, getState) => {
  // Make change locally
  dispatch(optimisticallyUpdateTitle(id, title))
  // Send update to DB
  dispatch(updateNoteRequest())
  db.notes
    .updateTitle(id, title)
    .then(() => {})
    // On success, update redux store
    .catch(err => {})
}

export const NOTE_REQUEST_SEND = 'NOTE_REQUEST_SEND'
const noteRequestSend = () => ({
  type: NOTE_REQUEST_SEND
})

export const NOTE_REQUEST_SUCCESS = 'NOTE_REQUEST_SUCCESS'
const noteRequestSuccess = notes => ({
  type: NOTE_REQUEST_SUCCESS,
  notes
})

/**
 * This function exists to populate the state when component mounts.
 * In the future, it might also hydrate the state from a previous session.
 */
export const populateNotes = () => dispatch => {
  // Set a loading state
  dispatch(noteRequestSend())
  // Get notes
  return (
    db.notes
      .get()
      // Handle success
      .then(notes => dispatch(noteRequestSuccess(notes)))
      // Handle failure
      .catch(err => console.log(err))
  )
}
export const OPTIMISTIC_DELETE_NOTE = 'OPTIMISTIC_DELETE_NOTE'
export const optimisticallyDeleteNote = id => ({
  type: OPTIMISTIC_DELETE_NOTE,
  payload: { id }
})

export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS'
export const deleteNoteSuccess = () => ({
  type: DELETE_NOTE_SUCCESS
})
export const DELETE_NOTE_ERROR = 'DELETE_NOTE_ERROR'
export const deleteNoteError = () => ({
  type: DELETE_NOTE_ERROR
})

export const deleteNote = id => dispatch => {
  console.log('delete action dispatched for', id)
  // delete note from local state
  dispatch(optimisticallyDeleteNote(id))
  // delete note from DB
  return db.notes
    .remove(id)
    .then(() => dispatch(deleteNoteSuccess()))
    .catch(err => dispatch(deleteNoteError()))
}

export const addNewNote = title => dispatch => {
  // TODO: Figure out an optimistic way to implement this functionality
  db.notes.add(title).then(note => {
    const id = note.id
    dispatch(populateNotes()).then(() => dispatch(setCurrentNote(id)))
  })
}

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR
})
