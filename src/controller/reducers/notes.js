import { NOTE_REQUEST_SEND, NOTE_REQUEST_SUCCESS } from '../actions/notes'

const initialState = {
  loadingNotes: false,
  notes: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NOTE_REQUEST_SEND:
      return {
        ...state,
        loadingNotes: true
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
