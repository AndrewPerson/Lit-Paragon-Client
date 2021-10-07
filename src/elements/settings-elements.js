import { html, LitElement } from "lit";
import { settingsCss } from "./settings.css";
import { textCss, imgCss, buttonCss, sliderCss, containerCss } from "./default.css";

export class UserSettings extends LitElement {
    static get styles() {
        return [textCss, imgCss, buttonCss, sliderCss, containerCss, settingsCss];
    }

    ShowDescription(e) {
        this.shadowRoot.getElementById("descriptionContent").style.display = "unset";
        e.stopPropagation();
    }

    ToggleDark() {
        if (window.isDark())
            localStorage.setItem("Dark", "false");
        else
            localStorage.setItem("Dark", "true");

        window.UpdateScreenType();
        this.requestUpdate();
    }

    async Patch() {
        await caches.delete("Metadata");
        await caches.delete("Offline Resources");

        var serviceWorker = await navigator.serviceWorker.ready;
        serviceWorker.active.postMessage({command: 'metadata-fetch'});

        location.reload();
    }

    SetColour() {
        var style = document.getElementsByTagName("html")[0].style;
        
        var hue = this.shadowRoot.getElementById("hue").value;

        style.setProperty("--main-hue", hue);
        style.setProperty("--hue-rotate", `${parseFloat(hue) - 200}deg`);
    }

    SaveColour() {
        localStorage.setItem("Hue", this.shadowRoot.getElementById("hue").value);
    }

    ResetColour() {
        this.shadowRoot.getElementById("hue").value = "200";
        this.SetColour();
        this.SaveColour();
    }

    updated() {
        caches.open(window.METADATA_CACHE).then(async metadataCache => {
            var metadataResponse = await metadataCache.match("Metadata");

            if (metadataResponse) {
                var metadata = JSON.parse(await metadataResponse.text());
            
                this.shadowRoot.getElementById("version").textContent = `Paragon v${metadata.version}`;
            }
        });

        this.shadowRoot.getElementById("hue").value = window.getHue().hue;
    }

    ToggleEditNavbar() {
        var navbar = document.getElementById("nav");

        if (navbar.hasAttribute("editing")) navbar.removeAttribute("editing");
        else navbar.setAttribute("editing", "");
    }

    disconnectedCallback() {
        document.removeEventListener("click", this.HideInfo);
    }

    constructor() {
        super();

        this.HideInfo = (() => {
            if (!this.shadowRoot) return;

            this.shadowRoot.getElementById("descriptionContent").style.display = "none";
        })
        .bind(this);

        document.addEventListener("click", this.HideInfo);
    }

    render() {
        var dark = window.isDark();

        var mode = dark ? "Dark Mode" : "Light Mode";
        var modeImg = dark ? "images/sun.svg" : "images/moon.svg";

        return html`
            <img draggable="false" @click="${this.ShowDescription}" id="description" src="images/info.svg" />
    
            <p style="display: none;" id="descriptionContent" @click="${this.ShowDescription}">Paragon is written by <a href="https://github.com/AndrewPerson">Andrew Pye</a>.<br/>The source code is on <a href="https://github.com/AndrewPerson/Lit-Paragon-Client">Github</a>.</p>

            <p id="version">Paragon v0.0.0</p>

            <button @click="${this.Patch}">Fix</button>

            <span></span>
            
            <p>Colour</p>

            <button @click="${this.ResetColour}">Reset</button>

            <input type="range" id="hue" min="0" max="359" value="200" @input="${this.SetColour}" @change="${this.SaveColour}"/>

            <span></span>

            <p>${mode}</p>

            <button class="toggle" @click="${this.ToggleDark}">
                <img draggable="false" class="toggleImg" src="${modeImg}" />
            </button>
            
            <span></span>

            <p>Sidebar</p>

            <button @click="${this.ToggleEditNavbar}">Edit</button>
        `;
    }
}

customElements.define("user-settings", UserSettings);