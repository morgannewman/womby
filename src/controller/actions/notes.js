import { db } from '../../db/db'

export const NOTE_REQUEST_SEND = 'NOTE_REQUEST_SEND'
const noteRequestSend = () => ({
  type: NOTE_REQUEST_SEND
})

export const NOTE_REQUEST_SUCCESS = 'NOTE_REQUEST_SUCCESS'
const noteRequestSuccess = notes => ({
  type: NOTE_REQUEST_SUCCESS,
  notes
})

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
