export const AUTH_KEY = 'isLoggedIn';

const isBrowser = typeof window !== 'undefined';

export const login = (username: string, password: string): boolean => {
  if (username === 'admin' && password === 'admin') {
    if (isBrowser) {
      localStorage.setItem(AUTH_KEY, 'true');
    }
    return true;
  }
  return false;
};

export const logout = (): void => {
  if (isBrowser) {
    localStorage.removeItem(AUTH_KEY);
  }
};

export const isLoggedIn = (): boolean => {
  if (!isBrowser) {
    return false;
  }
  return localStorage.getItem(AUTH_KEY) === 'true';
};
