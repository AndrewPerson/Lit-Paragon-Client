import { Page } from "../page/page";

import { html } from "lit";
import { property, customElement, query } from "lit/decorators.js";

import { Site } from "../../site/site";
import { Extensions } from "../../site/extensions";

import { InlineNotification } from "../notification/notification";

import { LoadingIndicator } from "../loader/loader";
import "../loader/loader";

//@ts-ignore
import extensionsCss from "./extensions.css";

@customElement("extension-page")
export class ExtensionPage extends Page {
    static styles = [extensionsCss];

    //TODO Set this property
    @property()
    name: string = "";

    @property()
    src: string = "";

    @query("iframe", true)
    frame: HTMLIFrameElement;

    @query("loading-indicator", true)
    loader: LoadingIndicator;

    stopLoading() {
        this.loader.remove();
        this.frame.removeAttribute("style");
    }

    postMessage(message: any) {
        this.frame.contentWindow?.postMessage(message, new URL(this.src).origin);
    }

    constructor() {
        super();

        Extensions.onInstalledExtensionsChanged(extensions => {
            if (!extensions.has(this.name)) {
                this.remove();
            }
        });

        Site.onDarkChange(dark => {
            this.postMessage({
                command: "Set Dark",
                data: {
                    dark: dark
                }
            });
        });

        Site.onHueChange(hue => {
            this.postMessage({
                command: "Set Hue",
                data: {
                    hue: hue
                }
            });
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.frame.removeEventListener("load", this.stopLoading);

        const ids = Extensions.extensionNotificationIds.get(new URL(this.src).origin);

        if (ids === undefined) return;

        for (const id of ids) {
            const element = document.getElementById(id);

            if (element instanceof InlineNotification) element.remove();
        }

        Extensions.extensionNotificationIds.delete(new URL(this.src).origin);
    }

    render() {
        return html`
        <iframe @load="${this.stopLoading}" src="${this.src}" sandbox="allow-downloads allow-forms allow-modals allow-popups allow-scripts allow-same-origin allow-storage-access-by-user-activation allow-top-navigation" style="display: none"></iframe>
        <loading-indicator></loading-indicator>
        `;
    }
}