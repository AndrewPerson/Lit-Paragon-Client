import { Page } from "../page/page";

import { html } from "lit";
import { customElement, query } from "lit/decorators.js";

import { Site } from "../../site";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import fullElementCss from "default/elements/full.css";
//@ts-ignore
import elementCss from "default/elements/element.css";
//@ts-ignore
import barcodeCss from "./barcode.css";

declare const JsBarcode: (canvas: HTMLCanvasElement, data: string, options: {
    displayValue: boolean
    margin: number
}) => void;

@customElement("student-barcode")
export class StudentBarcode extends Page {
    static styles = [elementCss, fullElementCss, textCss, imgCss, barcodeCss];

    @query("#barcodeDisplay")
    private barcode: HTMLCanvasElement | null;

    @query("#point1")
    point1: HTMLElement | null;

    @query("#point2")
    point2: HTMLElement | null;

    draggedElement: HTMLElement | null = null;

    dragging: boolean = false;

    userInfo: {
        studentId: number
    };

    constructor() {
        super();

        this.addEventListener("pointermove", this.DragPoint);
        this.addEventListener("pointerup", this.EndDrag);

        this.AddResource("userinfo", "userInfo");

        Site.ListenForDark(dark => {
            this.barcode?.classList.toggle("outline", dark);
        });
    }

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

        localStorage.setItem("Barcode Points",
                             JSON.stringify([
                                 this.point1?.style.left,
                                 this.point1?.style.top,
                                 this.point2?.style.left,
                                 this.point2?.style.top
                             ]));

        try {
            JsBarcode(this.barcode, this.userInfo.studentId.toString(), {
                displayValue: false,
                margin: 0
            });
        }
        catch(e) {}
    }

    updated() {
        this.SetBarcodePosition();
        this.RenderBarcode();
    }

    renderPage() {
        var storedPoints = localStorage.getItem("Barcode Points");

        var points: string[] = ["20%", "20%", "80%", "40%"];

        if (storedPoints) points = JSON.parse(storedPoints);

        return html`
        <info-popup>Use this barcode to scan in instead of your Student Card.</info-popup>

        <div id="point1" style="left: ${points[0]}; top: ${points[1]};" @pointerdown="${this.StartDrag}" @pointermove="${(e: PointerEvent) => e.stopPropagation()}"></div>
        <div id="point2" style="left: ${points[2]}; top: ${points[3]};" @pointerdown="${this.StartDrag}" @pointermove="${(e: PointerEvent) => e.stopPropagation()}"></div>

        <canvas id="barcodeDisplay" class="${Site.dark ? "outline" : ""}" style="top: 20%; left: 20%; width: 60%; height: 20%;"></canvas>
        `;
    }
}