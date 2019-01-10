import produce from 'immer';

import {
  SET_AUTH_TOKEN,
  CLEAR_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
} from '../actions/auth';

const initialState = {
  authToken: null, // authToken !== null does not mean it has been validated
  currentUser: null,
  loading: false,
  error: null,
};

/**
 * This state is an immutable data structure produced by immer. State should be modified "in place".
 */
export default produce((state, action) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      state.authToken = action.authToken;
      return;

    case CLEAR_AUTH:
      return initialState;

    case AUTH_REQUEST:
      state.loading = true;
      state.error = null;
      return;

    case AUTH_SUCCESS:
      state.loading = false;
      state.currentUser = action.currentUser;
      return;

    case AUTH_ERROR:
      state.loading = false;
      state.error = action.error;
      return;

    default:
      return;
  }
}, initialState);
