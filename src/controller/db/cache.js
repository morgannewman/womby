/**
 * Interface for managing the authToken cache
 * @interface
 */
const authToken = {
  /**
   * Caches an auth token to persist authentication between sessions.
   * @param {string} authToken - a raw token for authentication
   */
  save(authToken) {
    try {
      localStorage.setItem('authToken', authToken);
    } catch (e) {}
  },
  /**
   * Clears an auth token from cache.
   */
  clear() {
    try {
      localStorage.removeItem('authToken');
    } catch (e) {}
  },
  /**
   * Loads an auth token from cache if it exists.
   * @returns A string or undefined depending on if a token exists in cache.
   */
  load() {
    return localStorage.getItem('authToken');
  },
};

export const cache = {
  authToken,
};
