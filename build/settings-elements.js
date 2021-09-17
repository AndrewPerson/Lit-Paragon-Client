import{i as e,h as t,t as n,a as i,b as a,e as o,c as s,T as r}from"./default-css-22d073f2.js";const d=e`
    :host {
        position: relative;

        flex: 1;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin: 2vh 2%;

        min-width: calc(300px - 4vmin);
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
        filter: hue-rotate(var(--hue-rotate));
        height: 70vmin;
        transform: translateX(5vmin);
    }

    loading-element {
        width: 90vmin;
    }

    button {
        margin-bottom: 2vmin;
    }

    button > p {
        margin: 0;
    }

    input[type=range] {
        margin-top: 2vmin;
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
        top: 7vmin;
        left: 1vmin;
        width: 40vmin;
        background-color: var(--surface2);
        padding: 2vmin;
        border-radius: 2vmin;
        box-shadow: var(--surface-shadow) 0 0 2vmin;
    }
`;class c extends t{static get styles(){return[n,i,a,o,s,d]}ShowDescription(){this.shadowRoot.getElementById("descriptionContent").style.display="unset"}async ToggleDark(){var e=window.getHash();if(e.includes("dark")){e.pop(e.indexOf("dark")),location.hash=e.join("-");var t=await this.preferenceCache;await t.put("Dark",new Response("false"))}else e.push("dark"),location.hash=e.join("-");window.UpdateScreenType(),this.requestUpdate()}async Patch(){await caches.delete("Metadata"),await caches.delete("Offline Resources"),(await navigator.serviceWorker.ready).active.postMessage({command:"metadata-fetch"}),location.reload()}async SetColour(){var e=document.getElementsByTagName("html")[0].style,t=this.shadowRoot.getElementById("hue").value;e.setProperty("--main-hue",t),e.setProperty("--hue-rotate",parseFloat(t)-200+"deg"),await(await this.preferenceCache).put("Hue",new Response(t))}ResetColour(){this.shadowRoot.getElementById("hue").value="200",this.SetColour()}createRenderRoot(){const e=super.createRenderRoot();return e.addEventListener("click",(e=>{var t=this.shadowRoot;e.target!=t.getElementById("description")&&(t.getElementById("descriptionContent").style.display="none")})),e}updated(){caches.open(window.METADATA_CACHE).then((async e=>{var t=await e.match("Metadata"),n=JSON.parse(await t.text());this.shadowRoot.getElementById("version").textContent=`Paragon v${n.version}`})),window.getHue().then((e=>{this.shadowRoot.getElementById("hue").value=e.hue}))}constructor(){super(),this.preferenceCache=caches.open(window.PREFERENCE_CACHE)}render(){var e=window.getHash().includes("dark"),t=e?"images/sun.svg":"images/moon.svg";return r`
            <div id="background">
                <loading-element></loading-element>
                <img draggable="false" id="backgroundimg" src="${e?"images/logo-dark.svg":"images/logo.svg"}" />
            </div>

            <img draggable="false" @mousedown="${this.ShowDescription}" id="description" src="images/info.svg" />
    
            <p style="display: none;" id="descriptionContent">Paragon is written by <a href="https://github.com/AndrewPerson">Andrew Pye</a>.<br/>The source code is on <a href="https://github.com/AndrewPerson/Lit-Paragon-Client">Github</a>.</p>

            <button @click="${this.Patch}">Fix</button>
            
            <button class="mode" @click="${this.ToggleDark}">
                <img draggable="false" id="modeImg" src="${t}" />
            </button>
            
            <p id="version">Paragon v0</p>

            <button style="margin: 2vmin 0 0 0" @click="${this.ResetColour}">Reset Colour</button>

            <input type="range" id="hue" min="0" max="359" value="200" @input="${this.SetColour}"/>            
        `}}customElements.define("user-settings",c);export{c as UserSettings};
