import { SubmissionError } from 'redux-form';
import { db } from '../db/db';

export const registerUser = user => dispatch => {
  return db.users.register(user)
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};
