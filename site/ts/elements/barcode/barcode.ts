import { Page } from "../page/page";

import { html } from "lit";
import { customElement, query, state } from "lit/decorators.js";

import { Site } from "../../site/site";

import { Missing } from "../../missing";

import { Debounce } from "../../utils";

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

//@ts-ignore
import downloadSvg from "images/download.svg"

declare const JsBarcode: (canvas: HTMLCanvasElement, data: string, options: {
    displayValue: boolean
    margin: number
}) => void;

@customElement("student-barcode")
export class StudentBarcode extends Page {
    static styles = [textCss, imgCss, pageCss, fullElementCss, barcodeCss];

    @query("#barcodeDisplay")
    barcode: HTMLCanvasElement | null;

    @query("#point1")
    point1: HTMLElement;

    @query("#point2")
    point2: HTMLElement;

    @query("#save")
    saveLink: HTMLAnchorElement;

    rect: DOMRect = this.getBoundingClientRect();

    draggedElement: HTMLElement | null = null;

    dragging: boolean = false;

    set userInfo(value: {studentId: string | Missing}) {
        let studentId = value.studentId;

        if (studentId !== undefined && studentId !== null)
            this.studentId = studentId;
    }

    @state()
    studentId: string;

    Resize = Debounce(() => {
        this.rect = this.getBoundingClientRect();
    }, 300).bind(this);

    constructor() {
        super();

        this.addEventListener("pointermove", this.DragPoint);
        this.addEventListener("pointerup", this.EndDrag);

        window.addEventListener("resize", this.Resize);

        this.AddResource("userinfo", "userInfo");

        Site.ListenForDark(dark => {
            this.barcode?.classList.toggle("outline", dark);
        });
    }

    disconnectedCallback() {
        window.removeEventListener("resize", this.Resize);
    }

    StartDrag(e: PointerEvent) {
        e.preventDefault();

        this.draggedElement = e.target as HTMLElement;

        this.draggedElement.style.pointerEvents = "none";

        this.style.cursor = "move";
    }

    DragPoint(e: PointerEvent) {
        if (this.draggedElement == null) return;

        e.preventDefault();

        if (!this.dragging) {
            this.dragging = true;

            let x = Math.max(0, Math.min(100, (e.clientX - this.rect.left) / this.rect.width * 100));
            let y = Math.max(0, Math.min(100, (e.clientY - this.rect.top) / this.rect.height * 100));

            this.draggedElement.style.left = `${x}%`;
            this.draggedElement.style.top = `${y}%`;

            this.SetBarcodePosition();

            this.dragging = false;
        }
    }

    EndDrag() {
        if (this.draggedElement != null) this.draggedElement.style.removeProperty("pointer-events");

        this.draggedElement = null;
        this.removeAttribute("style");

        this.SaveBarcodePosition();
    }

    MovePointKeys(e: KeyboardEvent) {
        let point = e.target as HTMLElement;

        let x = parseFloat(point.style.left.substring(0, point.style.left.length - 1) || "0");
        let y = parseFloat(point.style.top.substring(0, point.style.top.length - 1) || "0");

        if (e.key == "ArrowUp") {
            point.style.top = `${y - 2}%`;
            e.preventDefault();
        }
        else if (e.key == "ArrowDown") {
            point.style.top = `${y + 2}%`;
            e.preventDefault();
        }
        else if (e.key == "ArrowLeft") {
            point.style.left = `${x - 2}%`;
            e.preventDefault();
        }
        else if (e.key == "ArrowRight") {
            point.style.left = `${x + 2}%`;
            e.preventDefault();
        }

        this.SetBarcodePosition();
        this.SaveBarcodePosition();
    }

    SetBarcodePosition() {
        if (this.barcode === null) return;

        let x1 = parseFloat(this.point1.style.left.substring(0, this.point1.style.left.length - 1) || "0");
        let y1 = parseFloat(this.point1.style.top.substring(0, this.point1.style.top.length - 1) || "0");

        let x2 = parseFloat(this.point2.style.left.substring(0, this.point2.style.left.length - 1) || "0");
        let y2 = parseFloat(this.point2.style.top.substring(0, this.point2.style.top.length - 1) || "0");
    
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
        if (this.barcode === null) return;

        if (typeof JsBarcode === "function") {
            JsBarcode(this.barcode, this.studentId, {
                displayValue: false,
                margin: 0
            });
        }

        let url = this.barcode.toDataURL("image/png");
        this.saveLink.href = url;
        this.saveLink.download = `${this.studentId}.png`;
    }

    SaveBarcodePosition() {
        localStorage.setItem("Barcode Points",
                             JSON.stringify([
                                 this.point1.style.left,
                                 this.point1.style.top,
                                 this.point2.style.left,
                                 this.point2.style.top
                             ]));
    }

    updated() {
        this.SetBarcodePosition();
        this.RenderBarcode();

        this.rect = this.getBoundingClientRect();
    }

    renderPage() {
        let storedPoints = localStorage.getItem("Barcode Points");

        let points: string[] = ["10%", "10%", "90%", "50%"];

        if (storedPoints) points = JSON.parse(storedPoints);

        return html`
        <info-popup>Use this barcode to scan in instead of your Student Card. Drag the points to resize it.</info-popup>
        <a id="save" title="Save Barcode">${downloadSvg}</a>

        <div id="point1" style="left: ${points[0]}; top: ${points[1]};" tabindex="0" @keydown="${this.MovePointKeys}" @pointerdown="${this.StartDrag}"></div>
        <div id="point2" style="left: ${points[2]}; top: ${points[3]};" tabindex="0" @keydown="${this.MovePointKeys}" @pointerdown="${this.StartDrag}"></div>

        <canvas id="barcodeDisplay" class="${Site.dark ? "outline" : ""}" style="top: 20%; left: 20%; width: 60%; height: 20%;"></canvas>
        `;
    }
}