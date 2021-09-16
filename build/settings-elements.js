import{i as e,h as t,t as i,a,b as n,c as o,T as s}from"./default-css-78eb0074.js";const r=e`
    :host {
        position: relative;

        flex: 1;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin: 2vh 2%;
    }

    * {
        z-index: 1;
    }

    #background {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        filter: blur(1vmin) opacity(0.3);
        z-index: 0;
    }

    #backgroundimg {
        position: absolute;
        filter: none;
        height: 70vmin;
        transform: translate(5vmin, 0);
    }

    loading-element {
        width: 96vmin;
    }

    button {
        margin-top: 2vmin;
    }

    button > p {
        margin: 0;
    }

    .mode {
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        padding: 1vmin;
    }

    #modeImg {
        width: calc(var(--font-size) * 2);
    }

    #description {
        z-index: 1;
        position: absolute;
        top: 1vmin;
        left: 1vmin;
        width: 4vmin;
    }

    #descriptionContent {
        z-index: 1;
        position: absolute;
        top: 5vmin;
        left: 1vmin;
        width: 40vmin;
        background-color: var(--surface2);
        padding: 2vmin;
        border-radius: 2vmin;
        box-shadow: var(--surface-shadow) 0 0 2vmin;
    }
`;class d extends t{static get styles(){return[i,a,n,o,r]}ShowDescription(){this.shadowRoot.getElementById("descriptionContent").style.display="unset"}async ToggleDark(){var e=location.hash.replace("#","").split("-").filter((e=>e.trim()));if(e.includes("dark")){location.hash=e.filter((e=>"dark"!=e)).join("-");var t=await caches.open("User Preferences");await t.put("dark",new Response("false"))}else e.push("dark"),location.hash=e.join("-");window.UpdateScreenType(),this.requestUpdate()}async Patch(){await caches.delete("Metadata"),await caches.delete("Offline Resources"),(await navigator.serviceWorker.ready).active.postMessage({command:"metadata-fetch"}),location.reload()}createRenderRoot(){const e=super.createRenderRoot();return e.addEventListener("click",(e=>{var t=this.shadowRoot;e.target!=t.getElementById("description")&&(t.getElementById("descriptionContent").style.display="none")})),e}updated(){caches.open("Metadata").then((async e=>{var t=await e.match("Metadata"),i=JSON.parse(await t.text());this.shadowRoot.getElementById("version").textContent=`Paragon v${i.version}`}))}render(){var e=location.hash.replace("#","").split("-").includes("dark"),t=e?"images/sun.svg":"images/moon.svg";return s`
            <div id="background">
                <loading-element></loading-element>
                <img draggable="false" id="backgroundimg" src="${e?"images/logo-dark.svg":"images/logo.svg"}" />
            </div>

            <img draggable="false" @mousedown="${this.ShowDescription}" id="description" src="images/info.svg" />
    
            <p style="display: none;" id="descriptionContent">Paragon is written by <a href="https://github.com/AndrewPerson">Andrew Pye</a>.<br/>The source code is on <a href="https://github.com/AndrewPerson/Lit-Paragon-Client">Github</a>.</p>

            <p id="version">Paragon v0</p>

            <button @click="${this.Patch}">Fix</button>
            
            <button class="mode" @click="${this.ToggleDark}">
                <img draggable="false" id="modeImg" src="${t}" />
            </button>
        `}}customElements.define("user-settings",d);export{d as UserSettings};
