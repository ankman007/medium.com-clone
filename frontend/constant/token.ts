const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Get the access and refresh tokens
export function getTokens() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

  return { accessToken, refreshToken };
}

// Set the access and refresh tokens
export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

// Get just the access token
export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

// Get just the refresh token
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

// Set the access token
export function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

// Clear both tokens from localStorage
export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// Log out by clearing both tokens
export function logout() {
  clearTokens();
}
