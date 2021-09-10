import{i as t,h as e,T as i}from"./lit-element-6ea6c272.js";const n=t`
    :host {
        display: inline-block;
    }

    :host(:hover) {
        background-color: var(--surface2);
        box-shadow: var(--surface-shadow) 0 0 2vmin;
        border-radius: 2vmin;
    }

    :host(.nav-selected) {
        background-color: var(--surface4) !important;
        box-shadow: var(--surface-shadow-strong) 0 0 2vmin !important;
        border-radius: 2vmin;
    }

    button {
        display: flex;
        width: 12vmin;
        height: 12vmin;
        cursor: default;
        background: rgba(0, 0, 0, 0);
        border: none;
        padding: 0px;
    }

    img {
        margin: 3.3vmin;
        width: 5.4vmin;
        filter: invert(var(--img-invert));

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }
`,s=t`
    :host :last-child {
        position: absolute;
        left: 0;
        bottom: 0;
    }

    :host {
        flex-shrink: 0;
        justify-content: center;
        background-color: var(--surface3);
        position: sticky;
        box-shadow: var(--surface-shadow-strong) 0 0 2vmin;
        overflow: hidden;
        z-index: 100;
    }
`,a=t`
    :host {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .spinner {
        width: inherit;
        animation: 3s infinite spin;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
`,o=t`
    :host {
        position: absolute;
        top: 1vh;
        right: 1vw;
        min-width: min-content;
        width: 40vmin;
        background-color: var(--surface2);
        padding: 2vh 2vw;
        border-radius: 2vmin;
        z-index: 100;
        box-shadow: var(--surface-shadow) 0 0 2vmin;
    }

    p {
        text-align: center;
        color: var(--text1);
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }

    .dismiss {
        margin-left: 1vmin;
    }

    button {
        border: none;
        background-color: var(--surface4);
        color: var(--text4);
        padding: 1vmin 2vmin;
        border-radius: 1vmin;
        max-width: max-content;
        box-shadow: var(--surface-shadow) 0 0 1vmin;
        font-size: calc(var(--font-size) / 1.2);
    }

    button:hover {
        background-color: var(--surface3);
        color: var(--text1);
    }

    button:active {
        color: var(--text3);
    }
`;class r extends e{static get styles(){return n}static get properties(){return{page:{type:String},title:{type:String},icon:{type:String}}}UpdatePage(){location.hash.includes("dark")?location.hash=`${this.page}-dark`:location.hash=this.page,UpdatePage()}constructor(){super(),this.page="",this.title="Home",this.icon=""}render(){return this.icon||(this.icon=this.title.toLowerCase()),window.page==this.page?this.classList.add("nav-selected"):this.classList.remove("nav-selected"),i`
            <button @click="${this.UpdatePage}" title="${this.title}">
                <img draggable="false" src="images/${this.icon}.svg" />
            </button>
        `}}class c extends e{static get styles(){return s}updatePage(){for(var t=this.shadowRoot.children,e=0;e<t.length;)t[e].update(),e++}render(){return i`
            <nav-item page="dailytimetable" title="Daily Timetable" icon="dailytimetable"></nav-item>
            <nav-item page="barcode" title="ID Barcode" icon="barcode"></nav-item>
            <nav-item page="timetable" title="Timetable"></nav-item>
            <nav-item page="announcements" title="Announcements"></nav-item>
            <nav-item page="extensions" title="Extensions"></nav-item>

            <nav-item page="settings" title="Settings"></nav-item>
        `}}class l extends e{static get styles(){return a}static get properties(){return{width:{type:String},height:{type:String}}}constructor(){super(),this.width="0",this.height="0"}render(){return i`
            <img draggable="false" class="spinner" src="images/rings.svg" />
        `}}class d extends e{static get styles(){return o}async login(){await caches.delete("User Resources"),location.pathname="login"}constructor(){super()}render(){return i`
            <p>You need to log in to view the latest information.</p>

            <div class="buttons">
                <button @click=${this.login}>
                    Login
                </button>
                <button @click=${()=>this.remove()} class="dismiss">
                    Dismiss
                </button>
            </div>
        `}}customElements.define("nav-item",r),customElements.define("nav-bar",c),customElements.define("loading-element",l),customElements.define("login-notification",d);export{l as LoadingElement,d as LoginNotification,r as NavItem,c as Navbar};
