import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

//@ts-ignore
import loadingCss from "./loader.css";

@customElement("loading-indicator")
export class LoadingIndicator extends LitElement {
    static styles = loadingCss;

    render() {
        return html`
            <img draggable="false" class="spinner" src="images/rings.svg" />
        `;
    }
}