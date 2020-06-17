const authKey = 'auth_key';

export function getToken() {
  return localStorage.getItem(authKey);
}

export function setToken(token: string) {
  localStorage.setItem(authKey, token);
}
export function removToken() {
  localStorage.removeItem(authKey);
}
