import { Site } from "./site/site";
import LOGIN_URL from "./login-url";

if (Site.dark)
    (document.getElementById("logo-p") as HTMLImageElement).src = "images/logo-dark.svg";

let loginLink = document.getElementById("login") as HTMLAnchorElement;

//TODO Implement PKCE
loginLink.href = LOGIN_URL;