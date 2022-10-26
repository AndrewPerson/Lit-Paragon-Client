import { html, unsafeCSS, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

//@ts-ignore
import notificationAreaCss from "./notification-area.css";

declare const SKIN_CSS: string;

@customElement("notification-area")
export class NotificationArea extends LitElement {
    static styles = [notificationAreaCss];

    dragging: boolean = false;
    processingDrag: boolean = false;

    dragOffsetX: number = 0;
    dragOffsetY: number = 0;

    Move = ((e: PointerEvent) => {
        if (!this.dragging) return;
        if (this.processingDrag) return;

        e.preventDefault();

        this.processingDrag = true;

        let x = Math.max(this.clientWidth, Math.min(e.clientX - this.dragOffsetX, window.innerWidth));
        let y = Math.max(0, Math.min(e.clientY - this.dragOffsetY, window.innerHeight - this.clientHeight));

        this.style.right = `${100 - x / window.innerWidth * 100}%`;
        this.style.top = `${y / window.innerHeight * 100}%`;

        this.processingDrag = false;
    }).bind(this);

    StopDragging = ((e?: PointerEvent) => {
        if (e instanceof PointerEvent) e.preventDefault();

        this.dragging = false;

        localStorage.setItem("Notification Area Position", JSON.stringify([this.style.right, this.style.top]));
    }).bind(this);

    constructor() {
        super();

        this.addEventListener("pointerdown", ((e: PointerEvent) => {
            e.preventDefault();

            this.dragging = true;

            let rect = this.getBoundingClientRect();

            this.dragOffsetX = e.clientX - rect.right;
            this.dragOffsetY = e.clientY - rect.top;
        }).bind(this));

        document.addEventListener("pointermove", this.Move);
        document.addEventListener("pointerup", this.StopDragging);

        let [x, y]: (string | undefined)[] = JSON.parse(localStorage.getItem("Notification Area Position") ?? "[]");

        if (x !== undefined) this.style.right = x;
        if (y !== undefined) this.style.top = y;
    }

    disconnectedCallback() {
        document.removeEventListener("pointermove", this.Move);
        document.removeEventListener("pointerup", this.StopDragging);
    }

    render() {
        return html`
        <slot></slot>
        `;
    }
}