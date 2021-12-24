import { Site } from "./site";
import LOGIN_URL from "./login-url";

if (Site.dark)
    (document.getElementById("logo-p") as HTMLImageElement).src = "images/logo-dark.svg";

var loginLink = document.getElementById("login") as HTMLAnchorElement;

loginLink.href = LOGIN_URL;