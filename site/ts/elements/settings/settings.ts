import { html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";

import { Site } from "../../site/site";
import LOGIN_URL from "../../login-url";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import buttonCss from "default/button.css";
//@ts-ignore
import rangeCss from "default/range.css";
//@ts-ignore
import scrollbarCss from "default/scrollbar.css";
//@ts-ignore
import cardElementCss from "default/pages/card.css";
//@ts-ignore
import pageCss from "default/pages/page.css";
//@ts-ignore
import settingsCss from "./settings.css";

declare const VERSION: string;
declare const TELEMETRY_PERMISSION_STORAGE: string;

@customElement("user-settings")
export class Settings extends LitElement {
    static styles = [textCss, imgCss, buttonCss, rangeCss, scrollbarCss, cardElementCss, pageCss, settingsCss];

    @query("#hue", true)
    hueInput: HTMLInputElement;

    async Patch() {
        await Promise.all((await navigator.serviceWorker.getRegistrations()).map(reg => reg.unregister()));

        localStorage.clear();
        sessionStorage.clear();

        const keys = await caches.keys();

        await Promise.all(keys.map(key => caches.delete(key)));

        location.reload();
    }

    logOut() {
        location.href = LOGIN_URL;
    }

    resetColour() {
        this.hueInput.valueAsNumber = 200;
        Site.setHue(200);
        Site.saveHue();
    }

    toggleDark(e: InputEvent) {
        const darkCheckbox: HTMLInputElement = e.target as HTMLInputElement;

        Site.setDark(darkCheckbox.checked);

        this.requestUpdate();
    }

    toggleTelemetry(e: InputEvent) {
        const disableTelemetryCheckbox: HTMLInputElement = e.target as HTMLInputElement;

        localStorage.setItem(TELEMETRY_PERMISSION_STORAGE, (!disableTelemetryCheckbox.checked).toString());

        this.requestUpdate();
    }

    render() {
        const telemetryEnabled = localStorage.getItem(TELEMETRY_PERMISSION_STORAGE) != "false";

        return html`
        <header>
            <info-popup class="credits">
                Paragon is written by <a target="_blank" rel="noopener noreferrer" href="https://github.com/AndrewPerson">Andrew Pye</a>.
                <br>
                The source code is on <a target="_blank" rel="noopener noreferrer" href="https://github.com/AndrewPerson/Lit-Paragon-Client">Github</a>.
            </info-popup>

            <h6 id="version">Paragon v${VERSION}</h6>
        </header>

        <div class="content">
            <button @click="${this.Patch}">Fix</button>
            <button @click="${this.logOut}">Log Out</button>

            <span class="divider"></span>

            <h6>Colour</h6>

            <button @click="${this.resetColour}">Reset</button>

            <input title="Drag to change main hue for Paragon" type="range" id="hue" min="0" max="359" value="${Site.hue}"
                @input="${(e: InputEvent) => Site.setHue((e.target as HTMLInputElement).valueAsNumber)}"
                @change="${Site.saveHue.bind(Site)}">

            <span class="divider"></span>

            <h6>${Site.dark ? "Dark" : "Light"} Mode</h6>

            <input type="checkbox" ?checked="${Site.dark}" id="colour-mode" class="button" title="Turn on ${Site.dark ? "Light" : "Dark"} Mode" @input="${this.toggleDark}">

            <span class="divider"></span>

            <h6>Telemetry</h6>

            <input type="checkbox" ?checked="${!telemetryEnabled}" id="telemetry" class="button" title="${telemetryEnabled ? "Disable" : "Enable"} Error Reporting" @input="${this.toggleTelemetry.bind(this)}">
        </div>
        `;
    }
}