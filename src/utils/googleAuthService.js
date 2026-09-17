import { authenticateGoogleUser } from '../data/usersDatabase';

/**
 * Decodes standard JWT payload from Google Identity Services
 */
export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to parse Google JWT token:', e);
    return null;
  }
}

/**
 * Initializes Google Identity Services if a client ID is provided
 */
export function initGoogleIdentityServices({ onCredentialResponse }) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (typeof window === 'undefined') return;

  if (window.google?.accounts?.id && clientId) {
    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          if (response.credential) {
            const payload = parseJwt(response.credential);
            if (payload) {
              const googleProfile = {
                googleEmail: payload.email,
                googleName: payload.name,
                googleAvatar: payload.picture,
                googleSub: payload.sub
              };
              const authResult = authenticateGoogleUser(googleProfile);
              if (onCredentialResponse && typeof onCredentialResponse === 'function') {
                onCredentialResponse(authResult);
              }
            }
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true
      });
    } catch (err) {
      console.warn('Google Identity Services init warning:', err);
    }
  }
}

/**
 * Renders the official Google Sign-In button into a DOM element if SDK is ready
 */
export function renderGoogleButton(elementId, options = {}) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId || !window.google?.accounts?.id) return false;

  const target = document.getElementById(elementId);
  if (!target) return false;

  try {
    window.google.accounts.id.renderButton(target, {
      theme: 'filled_black',
      size: 'large',
      shape: 'pill',
      text: 'continue_with',
      locale: 'pt_BR',
      width: 320,
      ...options
    });
    return true;
  } catch (err) {
    console.error('Error rendering Google Button:', err);
    return false;
  }
}
