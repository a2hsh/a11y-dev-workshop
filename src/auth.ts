export function login(username: string, password: string) {
  if (username === "admin" && password === "admin") {
    localStorage.setItem("loggedIn", "true");
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem("loggedIn");
}

export function isLoggedIn() {
  return localStorage.getItem("loggedIn") === "true";
}
