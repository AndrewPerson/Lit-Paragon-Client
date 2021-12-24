import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import { Site } from "../../site";

import { Navbar } from "../navbar/navbar";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import buttonCss from "default/button.css";
//@ts-ignore
import rangeCss from "default/range.css";
//@ts-ignore
import cardElementCss from "default/elements/card.css";
//@ts-ignore
import elementCss from "default/elements/element.css";
//@ts-ignore
import settingsCss from "./settings.css";

//@ts-ignore
import sunSvg from "sun.svg";
//@ts-ignore
import moonSvg from "moon.svg";

@customElement("user-settings")
export class Settings extends LitElement {
    static styles = [textCss, imgCss, buttonCss, rangeCss, cardElementCss, elementCss, settingsCss];

    @query("#hue", true)
    hueInput: HTMLInputElement | null;

    @query("#version", true)
    versionDisplay: HTMLParagraphElement | null;

    Patch() {
        //TODO
    }

    ResetColour() {
        if (this.hueInput) this.hueInput.value = "200";
        Site.SetColour("200");
        localStorage.setItem("Hue", "200");
    }

    SetColour(e: InputEvent) {
        if (!e.target) return;

        Site.SetColour((e.target as HTMLInputElement).value);
    }

    SaveColour(e: InputEvent) {
        localStorage.setItem("Hue", (e.target as HTMLInputElement).value);
    }

    ToggleDark() {
        localStorage.setItem("Dark", (!Site.dark).toString());
        Site.SetDark(!Site.dark);

        this.requestUpdate();
    }

    ToggleEditNavbar() {
        var navbar: Navbar = document.querySelector("nav-bar") as Navbar;

        if (navbar) {
            navbar.toggleAttribute("editing");
        }
    }

    updated() {
        caches.open("Metadata").then(async cache => {
            if (this.versionDisplay) {
                var metadataResponse = await cache.match("Metadata");
                if (metadataResponse) {
                    var metadata = await metadataResponse.json();

                    this.versionDisplay.textContent = `Paragon v${metadata.version}`;
                }
            }
        });
    }

    render() {
        return html`
        <info-popup>
            Paragon is written by <a href="https://github.com/AndrewPerson">Andrew Pye</a>.
            <br>
            The source code is on <a href="https://github.com/AndrewPerson/Lit-Paragon-Client">Github</a>.
        </info-popup>

        <p id="version">Paragon v0.0.0</p>

        <button @click="${this.Patch}">Fix</button>

        <span></span>
        
        <p>Colour</p>

        <button @click="${this.ResetColour}">Reset</button>

        <input type="range" id="hue" min="0" max="359" value="${Site.hue}" @input="${this.SetColour}" @change="${this.SaveColour}">

        <span></span>

        <p>${Site.dark ? "Dark" : "Light"} Mode</p>

        <button title="Turn on ${Site.dark ? "Light" : "Dark"} Mode" id="toggle" @click="${this.ToggleDark}">
            ${unsafeSVG(Site.dark ? sunSvg : moonSvg)}
        </button>
        
        <span></span>

        <p>Sidebar</p>

        <button @click="${this.ToggleEditNavbar}">Edit</button>
        `;
    }
}