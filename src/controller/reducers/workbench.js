import { SET_CURRENT_NOTE } from '../actions/workbench'

const initialState = {
  currentNote: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state

    case SET_CURRENT_NOTE:
      console.log(action.payload)
      return {
        ...state,
        currentNote: action.payload
      }
  }
}
