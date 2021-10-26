import { html, nothing, LitElement } from "lit";
import { barcodeCss } from "./barcode.css";
import { textCss, imgCss, fullContainerCss, containerCss } from "./default.css";

export class StudentBarcode extends LitElement {
    static get styles() {
        return [textCss, imgCss, fullContainerCss, containerCss, barcodeCss];
    }

    static get properties() {
        return {
            data: {type: Object}
        };
    }

    ShowDescription() {
        this.shadowRoot.getElementById("descriptionContent").style.display = "";
    }

    HideDescription() {
        this.shadowRoot.getElementById("descriptionContent").style.display = "none";
    }

    GetPercentageFromPixels(x, y) {
        return { x: (x - this.offsetLeft) / this.clientWidth * 100, y: (y - this.offsetTop) / this.clientHeight * 100 };
    }

    async RequestBarcodeSize() {
        var point1 = this.shadowRoot.getElementById("point1");
        var point2 = this.shadowRoot.getElementById("point2");

        var info = this.shadowRoot.getElementById("info");

        var barcode = this.shadowRoot.getElementById("barcode-canv");

        info.style.display = "";
        barcode.style.display = "none";

        point1.style.display = "none";
        point2.style.display = "none";

        var x1, y1, x2, y2;
        var userInput = new Promise(resolve => {
            var clicks = 0;
            this.addEventListener("pointerdown", event => {
                clicks++;

                if (clicks == 1) {
                    var { x, y } = this.GetPercentageFromPixels(event.clientX, event.clientY);

                    x1 = x;
                    y1 = y;

                    point1.style.left = `${x}%`;
                    point1.style.top = `${y}%`;
                    point1.style.display = "";
                }
                else if (clicks == 2) {
                    var { x, y } = this.GetPercentageFromPixels(event.clientX, event.clientY);

                    x2 = x;
                    y2 = y;

                    point2.style.left = `${x}%`;
                    point2.style.top = `${y}%`;
                    point2.style.display = "";

                    this.removeEventListener("pointerdown", this);

                    resolve();
                }
            });
        });

        await userInput;

        localStorage.setItem("Barcode Size", `${x1} ${y1} ${x2} ${y2}`);

        info.style.display = "none";

        barcode.style.display = "";
        this.UpdateBarcodeSize();
    }

    UpdateBarcodeSize() {
        var point1 = this.shadowRoot.getElementById("point1");
        var point2 = this.shadowRoot.getElementById("point2");
        
        var barcode = this.shadowRoot.getElementById("barcode-canv");

        var x1 = parseFloat(point1.style.left.replace("%", ""));
        var y1 = parseFloat(point1.style.top.replace("%", ""));

        var x2 = parseFloat(point2.style.left.replace("%", ""));
        var y2 = parseFloat(point2.style.top.replace("%", ""));

        var maxX;
        var minX;

        var maxY;
        var minY;

        if (x1 > x2) {
            maxX = x1;
            minX = x2;
        }
        else {
            maxX = x2;
            minX = x1;
        }

        if (y1 > y2) {
            maxY = y1;
            minY = y2;
        }
        else {
            maxY = y2;
            minY = y1;
        }

        barcode.style.top = `${minY}%`;
        barcode.style.left = `${minX}%`;

        barcode.style.width = `${maxX - minX}%`;
        barcode.style.height = `${maxY - minY}%`;

        JsBarcode(barcode, this.data.studentId, {
            displayValue: false,
            margin: 0
        });
    }

    CreateBarcode() {
        if (!this.shadowRoot) return;

        var x1, x2, y1, y2;

        var point1 = this.shadowRoot.getElementById("point1");
        var point2 = this.shadowRoot.getElementById("point2");
        
        var barcode = this.shadowRoot.getElementById("barcode-canv");

        if (!point1 || !point2 || !barcode) return;

        barcode.imageSmoothingEnabled = false;

        var barcodeSize = localStorage.getItem("Barcode Size");

        if (barcodeSize) {
            var [x1, y1, x2, y2] = barcodeSize.split(" ");

            point1.style.left = `${x1}%`;
            point1.style.top = `${y1}%`;

            point2.style.left = `${x2}%`;
            point2.style.top = `${y2}%`;
        }
        else {
            point1.style.left = "80%";
            point1.style.top = "10%";

            point2.style.left = "20%";
            point2.style.top = "30%";
        }

        this.UpdateBarcodeSize();

        barcode.style.display = "";
        point1.style.display = "";
        point2.style.display = "";
    }

    constructor() {
        super();

        this.data = {
            studentId: ""
        };
    }

    updated() {
        if (this.hasAttribute("data") && this.data)
            this.CreateBarcode();
    }

    render() {
        if (!this.hasAttribute("data"))
            return nothing;

        if (!this.data)
            return html`<loading-element style="width: 80%"></loading-element>`;
        
        return html`
            <button id="description"
                    @mouseover="${this.ShowDescription}"
                    @mouseout="${this.HideDescription}"
                    @focus="${this.ShowDescription}"
                    @blur="${this.HideDescription}"
                    title="Description">
                <img draggable="false" src="images/info.svg" />
            </button>
        
            <p style="display: none;" id="descriptionContent">You can use this barcode to scan in at the school scanners instead of your student card.</p>

            <p id="info" style="display: none;">Tap in two places to form a barcode.</p>
            
            <button title="Edit" id="edit" @click="${this.RequestBarcodeSize}">
                <img draggable="false" style="width: inherit; height: inherit;" src="images/edit.svg" />
            </button>

            <div>
                <canvas style="display: none;" id="barcode-canv"></canvas>
                <div style="display: none;" id="point1" draggable="false" src="images/circle.svg"></div>
                <div style="display: none;" id="point2" draggable="false" src="images/circle.svg"></div>
            </div>
        `;
    }
}

customElements.define("student-barcode", StudentBarcode);