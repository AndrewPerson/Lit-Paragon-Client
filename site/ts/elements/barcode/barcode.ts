import { Page } from "../page/page";

import { html } from "lit";
import { customElement, query } from "lit/decorators.js";

import { Site } from "../../site/site";

import "../info/info";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import fullElementCss from "default/pages/full.css";
//@ts-ignore
import pageCss from "default/pages/page.css";
//@ts-ignore
import barcodeCss from "./barcode.css";

declare const JsBarcode: (canvas: HTMLCanvasElement, data: string, options: {
    displayValue: boolean
    margin: number
}) => void;

@customElement("student-barcode")
export class StudentBarcode extends Page {
    static styles = [pageCss, fullElementCss, textCss, imgCss, barcodeCss];

    @query("#barcodeDisplay")
    private barcode: HTMLCanvasElement | null;

    @query("#point1")
    point1: HTMLElement | null;

    @query("#point2")
    point2: HTMLElement | null;

    draggedElement: HTMLElement | null = null;

    dragging: boolean = false;

    set userInfo(value: {studentId: string}) {
        this.studentId = value.studentId;
        this.requestUpdate();
    }

    studentId: string;

    constructor() {
        super();

        this.addEventListener("pointerdown", e => e.preventDefault());

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

        this.draggedElement.style.pointerEvents = "none";

        this.style.cursor = "move";
    }

    DragPoint(e: PointerEvent) {
        e.preventDefault();

        if (this.draggedElement == null) return;

        if (!this.dragging) {
            this.dragging = true;

            this.draggedElement.style.left = `${(e.clientX - this.offsetLeft) / this.clientWidth * 100}%`;
            this.draggedElement.style.top = `${(e.clientY - this.offsetTop) / this.clientHeight * 100}%`;
            
            this.SetBarcodePosition();

            this.dragging = false;
        }
    }

    EndDrag() {
        if (this.draggedElement != null) this.draggedElement.style.removeProperty("pointer-events");

        this.draggedElement = null;
        this.removeAttribute("style");

        this.RenderBarcode();
    }

    SetBarcodePosition() {
        if (this.barcode === null) return;

        let x1 = parseFloat(this.point1?.style.left.substring(0, this.point1.style.left.length - 1) || "0");
        let y1 = parseFloat(this.point1?.style.top.substring(0, this.point1.style.top.length - 1) || "0");

        let x2 = parseFloat(this.point2?.style.left.substring(0, this.point2.style.left.length - 1) || "0");
        let y2 = parseFloat(this.point2?.style.top.substring(0, this.point2.style.top.length - 1) || "0");
    
        let maxX = Math.max(x1, x2);
        let minX = Math.min(x1, x2);

        let maxY = Math.max(y1, y2);
        let minY = Math.min(y1, y2);

        this.barcode.style.left = `${minX}%`;
        this.barcode.style.top = `${minY}%`;

        this.barcode.style.width = `${maxX - minX}%`;
        this.barcode.style.height = `${maxY - minY}%`;
    }

    RenderBarcode() {
        if (this.draggedElement != null) return;
        if (this.barcode === null || this.point1 === null || this.point2 === null) return;

        localStorage.setItem("Barcode Points",
                             JSON.stringify([
                                 this.point1.style.left,
                                 this.point1.style.top,
                                 this.point2.style.left,
                                 this.point2.style.top
                             ]));

        if (typeof JsBarcode === "function") {
            JsBarcode(this.barcode, this.studentId, {
                displayValue: false,
                margin: 0
            });
        }
    }

    updated() {
        this.SetBarcodePosition();
        this.RenderBarcode();
    }

    renderPage() {
        let storedPoints = localStorage.getItem("Barcode Points");

        let points: string[] = ["20%", "20%", "80%", "40%"];

        if (storedPoints) points = JSON.parse(storedPoints);

        return html`
        <info-popup>Use this barcode to scan in instead of your Student Card. Drag the points to resize it.</info-popup>

        <div id="point1" style="left: ${points[0]}; top: ${points[1]};" @pointerdown="${this.StartDrag}"></div>
        <div id="point2" style="left: ${points[2]}; top: ${points[3]};" @pointerdown="${this.StartDrag}"></div>

        <canvas id="barcodeDisplay" class="${Site.dark ? "outline" : ""}" style="top: 20%; left: 20%; width: 60%; height: 20%;"></canvas>
        `;
    }
}