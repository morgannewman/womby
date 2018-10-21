import produce from 'immer'
import {
  SET_CURRENT_NOTE_SUCCESS,
  SET_CURRENT_NOTE_ERROR,
  OPTIMISTIC_UPDATE_NOTE,
  OPTIMISTIC_DELETE_NOTE,
  NOTE_REQUEST_SEND,
  NOTE_REQUEST_SUCCESS
} from '../actions/workbench'

const initialState = {
  currentNote: null,
  notes: null,
  loadingNotes: false
}

/**
 * This state is an immutable data structure produced by immer. State should be modified "in place".
 */
export default produce((state, action) => {
  switch (action.type) {
    case SET_CURRENT_NOTE_SUCCESS:
      state.currentNote = action.payload
      return

    case NOTE_REQUEST_SEND:
      state.loadingNotes = true
      return

    case OPTIMISTIC_UPDATE_NOTE:
      const note = state.notes.find(note => note.id === action.payload.id)
      note.document = action.payload.document
      return

    case OPTIMISTIC_DELETE_NOTE:
      // Delete note from state
      const index = state.notes.findIndex(note => note.id === action.payload.id)
      state.notes.splice(index, 1)
      // handle deleting current note
      state.currentNote =
        state.currentNote.id === action.payload.id ? null : state.currentNote
      return

    case NOTE_REQUEST_SUCCESS:
      state.loadingNotes = false
      state.notes = action.notes
      return

    default:
      return
  }
}, initialState)
