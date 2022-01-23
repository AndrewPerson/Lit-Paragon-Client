import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";

import { Site } from "../../site/site";
import LOGIN_URL from "../../login-url";

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
import cardElementCss from "default/pages/card.css";
//@ts-ignore
import pageCss from "default/pages/page.css";
//@ts-ignore
import settingsCss from "./settings.css";

@customElement("user-settings")
export class Settings extends LitElement {
    static styles = [textCss, imgCss, buttonCss, rangeCss, cardElementCss, pageCss, settingsCss];

    @query("#hue", true)
    hueInput: HTMLInputElement;

    @state()
    version: string | undefined = "?.?.?";

    constructor() {
        super();

        Site.GetMetadata(metadata => this.version = metadata?.version ?? "?.?.?");
    }

    async Patch() {
        await Promise.all((await navigator.serviceWorker.getRegistrations()).map(reg => reg.unregister()));

        localStorage.clear();
        sessionStorage.clear();
        
        let keys = await caches.keys();

        await Promise.all(keys.map(key => caches.delete(key)));

        location.reload();
    }

    LogOut() {
        location.href = LOGIN_URL;
    }

    ResetColour() {
        this.hueInput.value = "200";
        Site.SetHue("200");
        Site.SaveHue();
    }

    ToggleDark(e: InputEvent) {
        let darkCheckbox: HTMLInputElement = e.target as HTMLInputElement;

        Site.SetDark(darkCheckbox.checked);

        this.requestUpdate();
    }

    render() {
        return html`
        <info-popup>
            Paragon is written by <a target="_blank" rel="noopener noreferrer" href="https://github.com/AndrewPerson">Andrew Pye</a>.
            <br>
            The source code is on <a target="_blank" rel="noopener noreferrer" href="https://github.com/AndrewPerson/Lit-Paragon-Client">Github</a>.
        </info-popup>

        <p id="version">Paragon v${this.version}</p>

        <button @click="${this.Patch}">Fix</button>
        <button @click="${this.LogOut}">Log Out</button>

        <span></span>
        
        <p>Colour</p>

        <button @click="${this.ResetColour}">Reset</button>

        <input type="range" id="hue" min="0" max="359" value="${Site.hue}"
               @input="${(e: InputEvent) => Site.SetHue((e.target as HTMLInputElement).value)}"
               @change="${Site.SaveHue.bind(Site)}">

        <span></span>

        <p>${Site.dark ? "Dark" : "Light"} Mode</p>

        <input type="checkbox" ?checked="${Site.dark}" id="toggle" class="button" title="Turn on ${Site.dark ? "Light" : "Dark"} Mode" @input="${this.ToggleDark}">
        
        <span></span>

        <p>Sidebar</p>

        <button @click="${() => Navbar.instance?.toggleAttribute("editing")}">Edit</button>
        `;
    }
}