import { normalizeResponseErrors } from '../common/utils'
import { API_BASE_URL } from '../common/config'
import { cache } from '../cache'
const BASE_URL = `${API_BASE_URL}/notes`

/**
 * Gets all notes.
 * @returns {Array} notes - an array of notes
 */
export const get = () => {
  const authToken = cache.authToken.load()
  return fetch(BASE_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
}
