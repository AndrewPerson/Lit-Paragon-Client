import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

//@ts-ignore
import notificationAreaCss from "./notification-area.css";

@customElement("notification-area")
export class NotificationArea extends LitElement {
    static styles = [notificationAreaCss];

    dragging: boolean = false;
    processingDrag: boolean = false;

    dragOffsetX: number = 0;
    dragOffsetY: number = 0;

    move = ((e: PointerEvent) => {
        if (!this.dragging) return;
        if (this.processingDrag) return;

        e.preventDefault();

        this.processingDrag = true;

        const x = Math.max(this.clientWidth, Math.min(e.clientX - this.dragOffsetX, window.innerWidth));
        const y = Math.max(0, Math.min(e.clientY - this.dragOffsetY, window.innerHeight - this.clientHeight));

        this.style.right = `${100 - x / window.innerWidth * 100}%`;
        this.style.top = `${y / window.innerHeight * 100}%`;

        this.processingDrag = false;
    }).bind(this);

    stopDragging = ((e?: PointerEvent) => {
        if (e instanceof PointerEvent) e.preventDefault();

        this.dragging = false;

        localStorage.setItem("Notification Area Position", JSON.stringify([this.style.right, this.style.top]));
    }).bind(this);

    constructor() {
        super();

        this.addEventListener("pointerdown", ((e: PointerEvent) => {
            e.preventDefault();

            this.dragging = true;

            const rect = this.getBoundingClientRect();

            this.dragOffsetX = e.clientX - rect.right;
            this.dragOffsetY = e.clientY - rect.top;
        }).bind(this));

        document.addEventListener("pointermove", this.move);
        document.addEventListener("pointerup", this.stopDragging);

        const [x, y]: (string | undefined)[] = JSON.parse(localStorage.getItem("Notification Area Position") ?? "[]");

        if (x !== undefined) this.style.right = x;
        if (y !== undefined) this.style.top = y;
    }

    disconnectedCallback() {
        document.removeEventListener("pointermove", this.move);
        document.removeEventListener("pointerup", this.stopDragging);
    }

    render() {
        return html`
        <slot></slot>
        `;
    }
}