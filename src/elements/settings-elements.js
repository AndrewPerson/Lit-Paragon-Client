import { html, LitElement } from "lit";
import { settingsCss } from "./settings-css";
import { textCss, imgCss, buttonCss, sliderCss, fullContainerCss, containerCss } from "./default-css";

export class UserSettings extends LitElement {
    static get styles() {
        return [textCss, imgCss, buttonCss, sliderCss, fullContainerCss, containerCss, settingsCss];
    }

    ShowDescription() {
        this.shadowRoot.getElementById("descriptionContent").style.display = "unset";
    }

    async ToggleDark() {
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

    createRenderRoot() {
        const root = super.createRenderRoot();

        root.addEventListener("click", e => {
            var currentRoot = this.shadowRoot;

            if (e.target != currentRoot.getElementById("description"))
                currentRoot.getElementById("descriptionContent").style.display = "none";
        });

        return root;
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

    render() {
        var dark = window.isDark();

        var mode = dark ? "images/sun.svg" : "images/moon.svg";
        var background = dark ? "images/logo-dark.svg" : "images/logo.svg";

        return html`
            <div id="background">
                <loading-element></loading-element>
                <img draggable="false" id="backgroundimg" src="${background}" />
            </div>

            <img draggable="false" @mousedown="${this.ShowDescription}" id="description" src="images/info.svg" />
    
            <p style="display: none;" id="descriptionContent">Paragon is written by <a href="https://github.com/AndrewPerson">Andrew Pye</a>.<br/>The source code is on <a href="https://github.com/AndrewPerson/Lit-Paragon-Client">Github</a>.</p>

            <button @click="${this.Patch}">Fix</button>
            
            <button class="mode" @click="${this.ToggleDark}">
                <img draggable="false" id="modeImg" src="${mode}" />
            </button>
            
            <p id="version">Paragon v0</p>

            <button style="margin: 2vmin 0 0 0" @click="${this.ResetColour}">Reset Colour</button>

            <input type="range" id="hue" min="0" max="359" value="200" @input="${this.SetColour}" @mouseup="${this.SaveColour}"/>            
        `;
    }
}

customElements.define("user-settings", UserSettings);