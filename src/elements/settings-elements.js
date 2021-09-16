import { html, LitElement } from "lit";
import { settingsCss } from "./settings-css";
import { textCss, imgCss, buttonCss, containerCss } from "./default-css";

export class UserSettings extends LitElement {
    static get styles() {
        return [textCss, imgCss, buttonCss, containerCss, settingsCss];
    }

    ShowDescription() {
        this.shadowRoot.getElementById("descriptionContent").style.display = "unset";
    }

    async ToggleDark() {
        var hash = location.hash.replace("#", "").split("-").filter(key => key.trim());

        if (hash.includes("dark")) {
            location.hash = hash.filter(key => key != "dark").join("-");
            
            var cache = await caches.open("User Preferences");
            await cache.put("dark", new Response("false"));
        }
        else {
            hash.push("dark");
            location.hash = hash.join("-");
        }

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
        caches.open("Metadata").then(async metadataCache => {
            var metadataResponse = await metadataCache.match("Metadata");

            var metadata = JSON.parse(await metadataResponse.text());
            
            this.shadowRoot.getElementById("version").textContent = `Paragon v${metadata.version}`;
        });
    }

    render() {
        var hash = location.hash.replace("#", "").split("-");
        var dark = hash.includes("dark");

        var mode = dark ? "images/sun.svg" : "images/moon.svg";
        var background = dark ? "images/logo-dark.svg" : "images/logo.svg";

        return html`
            <div id="background">
                <loading-element></loading-element>
                <img draggable="false" id="backgroundimg" src="${background}" />
            </div>

            <img draggable="false" @mousedown="${this.ShowDescription}" id="description" src="images/info.svg" />
    
            <p style="display: none;" id="descriptionContent">Paragon is written by <a href="https://github.com/AndrewPerson">Andrew Pye</a>.<br/>The source code is on <a href="https://github.com/AndrewPerson/Lit-Paragon-Client">Github</a>.</p>

            <p id="version">Paragon v0</p>

            <button @click="${this.Patch}">Fix</button>
            
            <button class="mode" @click="${this.ToggleDark}">
                <img draggable="false" id="modeImg" src="${mode}" />
            </button>
        `;
    }
}

customElements.define("user-settings", UserSettings);