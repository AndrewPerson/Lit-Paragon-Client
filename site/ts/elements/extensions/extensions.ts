import { html, LitElement } from "lit";
import { property, customElement, query } from "lit/decorators.js";

import { Site } from "../../site";

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
    
    render() {
        let srcUrl = new URL(this.src);

        srcUrl.searchParams.set("dark", Site.dark.toString());

        return html`
        <iframe @load="${this.StopLoading}" src="${srcUrl.toString()}" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" style="display: none"></iframe>
        <loading-indicator></loading-indicator>
        `;
    }
}