import{i as e,h as t,T as a}from"./lit-element-97c1479f.js";const r=e`
    :host {
        position: absolute;
        top: 0;
        right: 0;

        z-index: 100;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        width: calc(100% - 12vmin);

        padding: 1rem;
        box-sizing: border-box;

        background-color: var(--surface4);

        border-radius: 0 0 0.5rem 0.5rem;

        box-shadow: var(--surface-shadow-strong) 0 0 1vmin;

        animation: appear 1s;
    }

    @media (max-aspect-ratio: 1/1) {
        :host {
            width: 100%;
        }
    }

    :host(.close) {
        animation: close 1s;
    }

    p {
        margin: 0;
    }

    button {
        border: none;
        background: none;
        padding: 0;
        margin: 0;

        width: 1rem;
        height: 1rem;
    }

    img {
        width: inherit;
        height: inherit;
    }

    @keyframes appear {
        from {
            transform: translateY(-100%);
        }

        to {
            transform: translateY(0%);
        }
    }

    @keyframes close {
        from {
            transform: translateY(0%);
        }

        to {
            transform: translateY(-100%);
        }
    }
`;class s extends t{static get styles(){return r}Close(e){this.classList.add("close"),localStorage.setItem("Last Dismissed",(new Date).toISOString()),setTimeout(this.remove.bind(this),1e3)}constructor(){super(),this.appear=!0;let e=localStorage.getItem("Last Dismissed");null!==e&&new Date-new Date(e)<864e5&&(this.appear=!1)}connectedCallback(){super.connectedCallback(),this.appear||this.remove()}render(){return a`
        <p>Paragon v1 is being deprecated at the end of 2022. Move to <a href="https://paragon.pages.dev">Paragon v2</a> by then.</p>
        <button @click="${this.Close}">
            <img draggable="false" src="images/cross.svg">
        </button>
        `}}customElements.define("migrate-banner",s);export{s as MigrateBanner};
