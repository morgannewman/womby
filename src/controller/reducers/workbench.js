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

export default function(state = initialState, action) {
  let notes
  switch (action.type) {
    case SET_CURRENT_NOTE_SUCCESS:
      return {
        ...state,
        currentNote: action.payload
      }

    case NOTE_REQUEST_SEND:
      return {
        ...state,
        loadingNotes: true
      }

    case OPTIMISTIC_UPDATE_NOTE:
      notes = [...state.notes]
      const note = state.notes.find(note => note.id === action.payload.id)
      note.document = action.payload.document
      return {
        ...state,
        notes
      }

    case OPTIMISTIC_DELETE_NOTE:
      notes = [...state.notes]
      const index = state.notes.findIndex(note => note.id === action.payload.id)
      notes.splice(index, 1)
      return {
        ...state,
        notes,
        // handle deleting current note
        currentNote:
          state.currentNote.id === action.payload.id ? null : state.currentNote
      }

    case NOTE_REQUEST_SUCCESS:
      return {
        ...state,
        loadingNotes: false,
        notes: action.notes
      }

    default:
      return state
  }
}
