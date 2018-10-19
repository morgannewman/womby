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

export const UPDATE_CURRENT_NOTE_REQUEST = 'UPDATE_CURRENT_NOTE_REQUEST'
export const updateCurrentNoteRequest = () => ({
  type: UPDATE_CURRENT_NOTE_REQUEST
})

export const UPDATE_CURRENT_NOTE_SUCCESS = 'UPDATE_CURRENT_NOTE_SUCCESS'
export const updateCurrentNoteSuccess = () => ({
  type: UPDATE_CURRENT_NOTE_SUCCESS
})

export const UPDATE_CURRENT_NOTE_ERROR = 'UPDATE_CURRENT_NOTE_ERROR'
export const updateCurrentNoteError = () => ({
  type: UPDATE_CURRENT_NOTE_ERROR
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

export const OPTIMISTIC_UPDATE_CURRENT_NOTE = 'OPTIMISTIC_UPDATE_CURRENT_NOTE'
export const optimisticallyUpdateCurrentNote = (id, document) => ({
  type: OPTIMISTIC_UPDATE_CURRENT_NOTE,
  payload: {
    id,
    document
  }
})

export const updateCurrentNote = (id, document) => (dispatch, getState) => {
  // Make change locally
  dispatch(optimisticallyUpdateCurrentNote(id, document))
  // Send update to DB
  dispatch(updateCurrentNoteRequest())
  db.notes
    .updateDocument(id, document)
    .then(() => dispatch(updateCurrentNoteSuccess(id, document)))
    // On success, update redux store
    .catch(err => dispatch(updateCurrentNoteError()))
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
