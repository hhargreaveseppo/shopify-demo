
  /**
 * Parse cookies from a cookie string.
 * This works on both the server and client-side.
 * @param {string} cookieString - The raw cookie string from the request headers (server) or `document.cookie` (client)
 * @returns {Object} A parsed object of cookie key-value pairs
 */
function parseCookies(cookieString = '') {
    return cookieString
      .split(';')
      .map(cookie => cookie.trim())
      .reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = decodeURIComponent(value);
        return acc;
      }, {});
  }
  
  /**
   * Get cookies from the request (server-side) or from the browser (client-side).
   * This function will automatically detect the environment.
   * @param {Request} [request] - Optional request object (for server-side use)
   * @returns {Object} The parsed cookies
   */
  function getCookies(request = null) {
    // Server-side (when the `request` object is provided)
    if (request && request.headers) {
      return parseCookies(request.headers.get('Cookie'));
    }
    
    // Client-side (browser)
    if (typeof document !== 'undefined') {
      return parseCookies(document.cookie);
    }
  
    // Return an empty object if no cookies are found
    return {};
  }
  
  /**
   * Get user ID from cookies or session data.
   * @param {Request} [request] - Optional request object (for server-side use)
   * @returns {string|null} The user ID or `null` if not found
   */
  function getUserId(request = null) {
    const cookies = getCookies(request);
    return cookies.user_id || Math.random().toString();  // Fill in with userid look up in cookie logic later
  }
  
  /**
   * Parse URL parameters from the request (server-side) or window.location (client-side).
   * @param {Request} [request] - Optional request object (for server-side use)
   * @returns {Object} The parsed URL parameters
   */
  function getUrlParams(request = null) {
    let queryString = '';
  
    // Server-side (request object provides URL)
    if (request && request.url) {
      queryString = new URL(request.url).search;
    }
  
    // Client-side (browser)
    if (typeof window !== 'undefined') {
      queryString = window.location.search;
    }
  
    // Parse query string into an object
    return Object.fromEntries(new URLSearchParams(queryString));
  }
  
  /**
   * Get the full user context including cookies, user ID, and URL parameters.
   * This function can be used on both server and client-side.
   * @param {Request} [request] - Optional request object (for server-side use)
   * @returns {Object} User context object containing cookies, user ID, and URL parameters
   */
  function getUserContext(request = null) {
    const cookies = getCookies(request);
    const userId = getUserId(request);
    const urlParams = getUrlParams(request);
    
    return {
      userId,
      cookies,
      urlParams,  // Adding URL parameters to the context
      // Add any other user-specific context here
    };
  }
  
  export { getCookies, getUserId, getUrlParams, getUserContext };
  