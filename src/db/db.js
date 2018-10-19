import { refresh, login } from './endpoints/auth'
import { register } from './endpoints/users'
import { get, updateDocument } from './endpoints/notes'

/**
 * Interface for interacting with the backend/database.
 */
export const db = {
  /**
   * Interface for the auth endpoint. Used to retrieve JWT tokens.
   */
  auth: {
    refresh,
    login
  },
  /**
   * Interface for the users endpoint. Can be used to create a user. Should be expanded to edit user information, etc.
   */
  users: {
    register
  },
  /**
   * Interface for the notes endpoint.
   */
  notes: {
    get,
    updateDocument
  }
}
