import { html, LitElement } from "lit";
import { pagesMarketplaceCss } from "./pages.css";
import { fullContainerCss, containerCss } from "./default.css";

export class PagesMarketplace extends LitElement {
    static get styles() {
        return [fullContainerCss, containerCss, pagesMarketplaceCss];
    }

    static get properties() {
        return {
            data: {type: Object}
        }
    }

    constructor() {
        super();

        this.data = {

        };
    }

    render() {
        return html`
            <div></div>
        `;
    }
}

customElements.define("pages-marketplace", PagesMarketplace);