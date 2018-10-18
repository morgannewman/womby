export const SET_CURRENT_NOTE = 'SET_CURRENT_NOTE'
export const setCurrentNote = noteId => ({
  type: SET_CURRENT_NOTE,
  payload: noteId
})
