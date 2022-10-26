import { html, unsafeCSS, LitElement } from "lit";
import { property, customElement, query } from "lit/decorators.js";

import { Extensions } from "../../site/extensions";

import { InlineNotification } from "../notification/notification";

import { LoadingIndicator } from "../loader/loader";
import "../loader/loader";

//@ts-ignore
import extensionsCss from "./extensions.css";

declare const SKIN_CSS: string;

@customElement("extension-page")
export class ExtensionPage extends LitElement {
    static styles = [extensionsCss, unsafeCSS(SKIN_CSS ?? "")];

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

    disconnectedCallback() {
        super.disconnectedCallback();

        this.frame.removeEventListener("load", this.StopLoading);

        let ids = Extensions.extensionNotificationIds.get(new URL(this.src).origin);

        if (ids === undefined) return;

        for (let id of ids) {
            let element = document.getElementById(id);

            if (element instanceof InlineNotification) element.remove();
        }

        Extensions.extensionNotificationIds.delete(new URL(this.src).origin);
    }

    render() {
        return html`
        <iframe @load="${this.StopLoading}" src="${this.src}" sandbox="allow-downloads allow-forms allow-modals allow-popups allow-scripts allow-same-origin allow-storage-access-by-user-activation allow-top-navigation" style="display: none"></iframe>
        <loading-indicator></loading-indicator>
        `;
    }
}