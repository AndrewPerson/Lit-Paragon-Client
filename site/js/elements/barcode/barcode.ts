import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";

import { Site } from "../../site";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import elementCss from "default/elements/element.css";
//@ts-ignore
import fullElementCss from "default/elements/full.css";
//@ts-ignore
import barcodeCss from "./barcode.css";

declare const JsBarcode: (canvas: HTMLCanvasElement, data: string, options: {
    displayValue: boolean
    margin: number
}) => void;

@customElement("student-barcode")
export class StudentBarcode extends LitElement {
    static styles = [elementCss, fullElementCss, textCss, imgCss, barcodeCss];

    @query("#barcodeDisplay")
    barcode: HTMLCanvasElement | null = null;

    @query("#point1")
    point1: HTMLElement | null = null;

    @query("#point2")
    point2: HTMLElement | null = null;

    draggedElement: HTMLElement | null = null;

    dragging: boolean = false;

    @state()
    studentId: string = "";

    @state()
    loading: boolean = true;

    StartDrag(e: PointerEvent) {
        e.preventDefault();

        this.draggedElement = e.target as HTMLElement;
        this.style.cursor = "move";

        return false;
    }

    DragPoint(e: PointerEvent) {
        if (this.draggedElement == null) return true;

        e.preventDefault();

        if (!this.dragging) {
            this.dragging = true;

            this.draggedElement.style.left = `${(e.clientX - this.offsetLeft) / this.clientWidth * 100}%`;
            this.draggedElement.style.top = `${(e.clientY - this.offsetTop) / this.clientHeight * 100}%`;
            
            this.SetBarcodePosition();

            this.dragging = false;
        }
        
        return false;
    }

    EndDrag() {
        this.draggedElement = null;
        this.removeAttribute("style");

        this.RenderBarcode();
    }

    SetBarcodePosition() {
        if (this.barcode == null) return;

        var x1 = parseFloat(this.point1?.style.left.substring(0, this.point1.style.left.length - 1) || "0");
        var y1 = parseFloat(this.point1?.style.top.substring(0, this.point1.style.top.length - 1) || "0");

        var x2 = parseFloat(this.point2?.style.left.substring(0, this.point2.style.left.length - 1) || "0");
        var y2 = parseFloat(this.point2?.style.top.substring(0, this.point2.style.top.length - 1) || "0");
    
        var maxX = Math.max(x1, x2);
        var minX = Math.min(x1, x2);

        var maxY = Math.max(y1, y2);
        var minY = Math.min(y1, y2);

        this.barcode.style.left = `${minX}%`;
        this.barcode.style.top = `${minY}%`;

        this.barcode.style.width = `${maxX - minX}%`;
        this.barcode.style.height = `${maxY - minY}%`;
    }

    RenderBarcode() {
        if (this.draggedElement != null) return;
        if (this.barcode == null) return;

        try {
            JsBarcode(this.barcode, this.studentId, {
                displayValue: false,
                margin: 0
            });
        }
        catch(e) {}
    }

    constructor() {
        super();

        this.addEventListener("pointermove", this.DragPoint);
        this.addEventListener("pointerup", this.EndDrag);

        Site.GetResource("userinfo", resource => {
            this.studentId = resource.studentId;
            this.loading = false;
        });
    }

    updated() {
        this.RenderBarcode();
    }

    render() {
        if (this.loading)
            return html`<loading-indicator></loading-indicator>`

        return html`
            <info-popup>Use this barcode to scan in instead of your Student Card.</info-popup>

            <div id="point1" style="top: 20%; left: 20%;" @pointerdown="${this.StartDrag}" @pointermove="${(e: PointerEvent) => e.stopPropagation()}"></div>
            <div id="point2" style="top: 40%; left: 80%;" @pointerdown="${this.StartDrag}" @pointermove="${(e: PointerEvent) => e.stopPropagation()}"></div>

            <canvas id="barcodeDisplay" class="${Site.dark ? "outline" : ""}" style="top: 20%; left: 20%; width: 60%; height: 20%;"></canvas>
        `;
    }
}