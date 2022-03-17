import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";

//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import loadingCss from "./loader.css";

//@ts-ignore
import ringsSvg from "images/rings.svg";

@customElement("loading-indicator")
export class LoadingIndicator extends LitElement {
    static styles = [imgCss, loadingCss];

    render() {
        return ringsSvg;
    }
}