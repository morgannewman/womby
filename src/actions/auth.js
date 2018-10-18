import jwtDecode from 'jwt-decode';
import { SubmissionError } from 'redux-form';

import { cache } from '../db/cache';
import { db } from '../db/db';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
  type: SET_AUTH_TOKEN,
  authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
  type: CLEAR_AUTH
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
  type: AUTH_SUCCESS,
  currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
  type: AUTH_ERROR,
  error
});

// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthInfo = (authToken, dispatch) => {
  cache.authToken.save(authToken);
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken));
  dispatch(authSuccess(decodedToken.user));
};

export const login = (email, password) => dispatch => {
  dispatch(authRequest());
  return (
      db.auth.login(email, password)
      .then(authToken => storeAuthInfo(authToken, dispatch))
      .catch(err => {
        const { code } = err;
        const message =
          code === 401
            ? 'Incorrect username or password'
            : 'Unable to login, please try again';
        dispatch(authError(err));
        // Could not authenticate, so return a SubmissionError for Redux
        // Form
        return Promise.reject(
          new SubmissionError({
            _error: message
          })
        );
      })
  );
};
/**
 * Refreshes auth token in both the cache and state.
 */
export const refreshAuthToken = () => (dispatch, getState) => {
  dispatch(authRequest());
  const authToken = getState().auth.authToken;
  return db.auth.refresh(authToken)
    .then(authToken => storeAuthInfo(authToken, dispatch))
    .catch(err => {
      console.log(err);
      // We couldn't get a refresh token because our current credentials
      // are invalid or expired, or something else went wrong, so clear
      // them and sign us out
      dispatch(authError(err));
      dispatch(clearAuth());
      cache.authToken.clear();
    });
};
/**
 * Clears auth token from both the cache and state.
 */
export const logout = () => dispatch => {
  dispatch(clearAuth());
  cache.authToken.clear();
}

