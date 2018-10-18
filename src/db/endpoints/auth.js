import {normalizeResponseErrors} from '../common/utils';
import { API_BASE_URL } from '../common/config';

/**
 * Fetches a new auth token from the backend.
 * @param {String} authToken - An ENCODED auth token that will be refreshed.
 * @returns {String} authToken - A new ENCODED auth token.
 * @throws when current credentials are invalid or expired.
 */
export const refresh = (authToken) => {
  // Provide our existing token as credentials to get a new one
  return fetch(`${API_BASE_URL}/refresh`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    // Extracts token from JSON. Token key MUST be authToken for this to work.
    .then(({authToken}) => authToken);
};

/**
 * Login using the localStrategy.
 * @param {*} email 
 * @param {*} password 
 * @returns {String} authToken
 * @throws when the username or password is incorrect.
 */
export const login = (email, password) => {
  return fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    // Reject any requests which don't return a 200 status, creating
    // errors which follow a consistent format
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ authToken }) => authToken);
}