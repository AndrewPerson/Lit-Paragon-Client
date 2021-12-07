import { html, LitElement } from "lit";
import { property, customElement, query } from "lit/decorators.js";
import { LoadingIndicator } from "../loader/loader";

//@ts-ignore
import extensionsCss from "./extensions.css";

@customElement("extension-page")
export class ExtensionPage extends LitElement {
    static styles = extensionsCss;

    @property({type: String})
    src: string = "";

    @query("iframe", true)
    frame: HTMLIFrameElement | null = null;

    @query("loading-indicator", true)
    loader: LoadingIndicator | null = null;

    firstUpdated() {
        this.frame?.addEventListener("load", () => {
            this.loader?.remove();
            this.frame?.removeAttribute("style");
        });
    }

    render() {
        return html`
            <iframe sandbox="allow-scripts allow-same-origin" src="${this.src}" style="display: none"></iframe>
            <loading-indicator></loading-indicator>
        `;
    }
}