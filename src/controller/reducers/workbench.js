import produce from 'immer'
import {
  SET_CURRENT_NOTE_SUCCESS,
  // SET_CURRENT_NOTE_ERROR,
  OPTIMISTIC_UPDATE_NOTE,
  OPTIMISTIC_UPDATE_TITLE,
  OPTIMISTIC_DELETE_NOTE,
  NOTE_REQUEST_SEND,
  NOTE_REQUEST_SUCCESS,
  TOGGLE_SIDEBAR
} from '../actions/workbench'

const initialState = {
  currentNote: null,
  notes: null,
  isFetchingNotes: false,
  showSidebar: true
}

/**
 * This state is an immutable data structure produced by immer. State should be modified "in place".
 */
export default produce((state, action) => {
  switch (action.type) {
    case SET_CURRENT_NOTE_SUCCESS:
      state.currentNote = action.payload
      return

    case OPTIMISTIC_UPDATE_NOTE:
      state.notes[action.payload.index].document = action.payload.document
      return

    case OPTIMISTIC_UPDATE_TITLE:
      state.notes[action.payload.index].title = action.payload.title
      return

    case OPTIMISTIC_DELETE_NOTE:
      // handle deleting current note
      if (state.currentNote) {
        state.currentNote =
          state.currentNote.id === state.notes[action.payload.index].id
            ? null
            : state.currentNote
      }
      state.notes.splice(action.payload.index, 1)
      return

    // Handles populateNotes() action
    case NOTE_REQUEST_SEND:
      state.isFetchingNotes = true
      return

    case NOTE_REQUEST_SUCCESS:
      state.isFetchingNotes = false
      state.notes = action.payload.notes
      return

    case 'NOTE_REQUEST_ERROR':
      state.isFetchingNotes = false
      return

    case TOGGLE_SIDEBAR:
      state.showSidebar = !state.showSidebar
      return

    default:
      return
  }
}, initialState)
