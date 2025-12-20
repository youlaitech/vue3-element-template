const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const REMEMBER_ME_KEY = "remember_me";

function getRememberMe(): boolean {
  return localStorage.getItem(REMEMBER_ME_KEY) === "true";
}

function getAccessToken(): string {
  const rememberMe = getRememberMe();
  return rememberMe
    ? localStorage.getItem(ACCESS_TOKEN_KEY) || ""
    : sessionStorage.getItem(ACCESS_TOKEN_KEY) || localStorage.getItem(ACCESS_TOKEN_KEY) || "";
}

function getRefreshToken(): string {
  const rememberMe = getRememberMe();
  return rememberMe
    ? localStorage.getItem(REFRESH_TOKEN_KEY) || ""
    : sessionStorage.getItem(REFRESH_TOKEN_KEY) || localStorage.getItem(REFRESH_TOKEN_KEY) || "";
}

function setTokens(accessToken: string, refreshToken: string, rememberMe: boolean) {
  localStorage.setItem(REMEMBER_ME_KEY, rememberMe ? "true" : "false");
  if (rememberMe) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  } else {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}

function clearAuth() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

export { getAccessToken, getRefreshToken, getRememberMe, setTokens, clearAuth };
