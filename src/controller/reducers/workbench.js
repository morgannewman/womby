import {
  SET_CURRENT_NOTE_SUCCESS,
  SET_CURRENT_NOTE_ERROR,
  OPTIMISTIC_UPDATE_CURRENT_NOTE,
  NOTE_REQUEST_SEND,
  NOTE_REQUEST_SUCCESS
} from '../actions/workbench'

const initialState = {
  currentNote: null,
  notes: null,
  loadingNotes: false
}

export default function(state = initialState, action) {
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

    case OPTIMISTIC_UPDATE_CURRENT_NOTE:
      const notes = [...state.notes]
      const note = state.notes.find(note => note.id === action.payload.id)
      note.document = action.payload.document
      return {
        ...state,
        notes
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
