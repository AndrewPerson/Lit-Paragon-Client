import LOGIN_URL from "./login-url";

let loginLink = document.getElementById("login") as HTMLAnchorElement;

//TODO Implement PKCE
loginLink.href = LOGIN_URL;