import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";

//@ts-ignore
import loadingCss from "./loader.css";

//@ts-ignore
import ringsSvg from "images/rings.svg";

@customElement("loading-indicator")
export class LoadingIndicator extends LitElement {
    static styles = loadingCss;

    render() {
        return ringsSvg;
    }
}