import{i as t,h as e,a as i,T as n,c as s,t as a,b as o}from"./default-css-e65204ef.js";const r=t`
    :host {
        display: inline-block;
    }

    :host(:hover) {
        background-color: var(--surface2);
        box-shadow: var(--surface-shadow-strong) 0 0 2vmin;
        border-radius: 2vmin;
    }

    :host(.nav-selected) {
        background-color: var(--surface4) !important;
        box-shadow: var(--surface-shadow-strong) 0 0 2vmin;
        border-radius: 2vmin;
    }

    button {
        display: flex;

        width: 12vmin;
        height: 12vmin;

        padding: 0px;

        background-color: transparent;
        border: none;
    }

    img {
        margin: 3.3vmin;
        width: 5.4vmin;
    }
`,c=t`
    nav-item:last-of-type {
        position: absolute;
        left: 0;
        bottom: 0;
    }

    :host {
        flex-shrink: 0;
        justify-content: center;
        background-color: var(--surface3);
        position: sticky;
        overflow: hidden;
        z-index: 100;
        box-shadow: var(--surface-shadow-strong) 0 0 2vmin;
    }
`,l=t`
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
`,d=t`
    :host {
        position: absolute;
        top: 1vh;
        right: 1vw;
        min-width: min-content;
        width: 40vmin;
        padding: 2vh 2vw;
        z-index: 100;
    }

    p {
        text-align: center;
        margin: var(--font-size);
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }

    .dismiss {
        margin-left: 1vmin;
    }
`;class m extends e{static get styles(){return[i,r]}static get properties(){return{page:{type:String},title:{type:String},icon:{type:String}}}UpdatePage(){window.getHash().includes("dark")?location.hash=`${this.page}-dark`:location.hash=this.page,""!=location.pathname&&(location.pathname=""),window.UpdatePage(),window.UpdateScreenType()}constructor(){super(),this.page="",this.title="Home",this.icon="",g.NavItems.push(this)}render(){return this.icon||(this.icon=this.title.toLowerCase()),window.page==this.page?this.classList.add("nav-selected"):this.classList.remove("nav-selected"),n`
            <button @click="${this.UpdatePage}" title="${this.title}">
                <img draggable="false" src="images/${this.icon}.svg" />
            </button>
        `}}class g extends e{static get styles(){return c}updatePage(){for(var t of g.NavItems)t.requestUpdate()}static NavItems=[];render(){return n`
            <nav-item page="dailytimetable" title="Daily Timetable" icon="dailytimetable"></nav-item>
            <nav-item page="barcode" title="ID Barcode" icon="barcode"></nav-item>
            <nav-item page="timetable" title="Timetable"></nav-item>
            <nav-item page="announcements" title="Announcements"></nav-item>
            <nav-item page="extensions" title="Extensions"></nav-item>

            <nav-item page="settings" title="Settings"></nav-item>
        `}}class h extends e{static get styles(){return l}static get properties(){return{width:{type:String},height:{type:String}}}constructor(){super(),this.width="0",this.height="0"}render(){return n`
            <img draggable="false" class="spinner" src="images/rings.svg" />
        `}}class p extends e{static get styles(){return[s,a,o,d]}async login(){await caches.delete("User Resources"),location.pathname="login"}constructor(){super()}render(){return n`
            <p>You need to log in to view the latest information.</p>

            <div class="buttons">
                <button @click=${this.login}>
                    Login
                </button>
                <button @click=${()=>this.remove()} class="dismiss">
                    Dismiss
                </button>
            </div>
        `}}customElements.define("nav-item",m),customElements.define("nav-bar",g),customElements.define("loading-element",h),customElements.define("login-notification",p);export{h as LoadingElement,p as LoginNotification,m as NavItem,g as Navbar};
