import { API_BASE_URL } from '../common/config';
import { normalizeResponseErrors } from '../common/utils';

/**
 * Register a new user with the database backend.
 * @param {Object} user - A user object with all required fields
 * @returns {Object} user - First name, last name, and email
 * @throws 400 if the email already exists
 * @throws 422 if a required field is missing
 */
export const register = user => {
  return fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json());
};
