import { unsafeCSS, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import loadingCss from "./loader.css";

@customElement("loading-indicator")
export class LoadingIndicator extends LitElement {
    static styles = [imgCss, loadingCss];

    render() {
        return html`<img src="/images/rings.svg">`;
    }
}