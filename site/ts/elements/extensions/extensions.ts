import { html, LitElement } from "lit";
import { property, customElement, query } from "lit/decorators.js";

import { LoadingIndicator } from "../loader/loader";
import "../loader/loader";

//@ts-ignore
import extensionsCss from "./extensions.css";

@customElement("extension-page")
export class ExtensionPage extends LitElement {
    static styles = extensionsCss;

    @property({type: String})
    src: string = "";

    @query("iframe", true)
    frame: HTMLIFrameElement;

    @query("loading-indicator", true)
    loader: LoadingIndicator;

    StopLoading() {
        this.loader.remove();
        this.frame.removeAttribute("style");
    }

    PostMessage(message: any) {
        this.frame.contentWindow?.postMessage(message, new URL(this.src).origin);
    }
    
    render() {
        return html`
        <iframe @load="${this.StopLoading}" src="${this.src}" sandbox="allow-forms allow-modals allow-popups allow-scripts allow-same-origin" style="display: none"></iframe>
        <loading-indicator></loading-indicator>
        `;
    }
}