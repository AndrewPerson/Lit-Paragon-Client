import { html, LitElement } from "lit";
import { barcodeCss } from "./barcode-css";
import { textCss, imgCss, containerCss } from "./default-css";

export class StudentBarcode extends LitElement {
    static get styles() {
        return [textCss, imgCss, containerCss, barcodeCss];
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

    GetPixelsFromPercentage(x, y) {
        return { x: this.clientWidth * x / 100 + this.offsetLeft, y: this.clientHeight * y / 100 + this.offsetTop };
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
                    var { x, y } = this.GetPercentageFromPixels(event.clientX - 10, event.clientY - 10);

                    x1 = x;
                    y1 = y;

                    point1.style.left = `${x}%`;
                    point1.style.top = `${y}%`;
                    point1.style.display = "";
                }
                else if (clicks == 2) {
                    var { x, y } = this.GetPercentageFromPixels(event.clientX - 10, event.clientY - 10);

                    x2 = x;
                    y2 = x;

                    point2.style.left = `${x}%`;
                    point2.style.top = `${y}%`;
                    point2.style.display = "";

                    this.removeEventListener("pointerdown", this);

                    resolve();
                }
            });
        });

        await userInput;

        var preferenceCache = await caches.open("User Preferences");

        await preferenceCache.put("Barcode Size", new Response(`${x1} ${y1} ${x2} ${y2}`));

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

    async CreateBarcode() {
        var x1, x2, y1, y2;

        var point1 = this.shadowRoot.getElementById("point1");
        var point2 = this.shadowRoot.getElementById("point2");
        
        var barcode = this.shadowRoot.getElementById("barcode-canv");

        barcode.imageSmoothingEnabled = false;

        var preferenceCache = await caches.open("User Preferences");

        var preferenceResponse = await preferenceCache.match("Barcode Size");

        if (preferenceResponse) {
            var [x1, y1, x2, y2] = (await preferenceResponse.text()).split(" ");

            point1.style.left = `${x1}%`;
            point1.style.top = `${y1}%`;

            point2.style.left = `${x2}%`;
            point2.style.top = `${y2}%`;
        }
        else {
            var { x, y } = this.GetPixelsFromPercentage(80, 10);
            ({ x, y } = this.GetPercentageFromPixels(x - 10, y - 10));

            point1.style.left = `${x}%`;
            point1.style.top = `${y}%`;

            ({ x, y } = this.GetPixelsFromPercentage(20, 30));
            ({ x, y } = this.GetPercentageFromPixels(x - 10, y - 10));

            point2.style.left = `${x}%`;
            point2.style.top = `${y}%`;
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

        window.updateBarcode = () => {
            this.CreateBarcode();
        };
    }

    updated() {
        this.CreateBarcode();
    }

    render() {
        if (!this.hasAttribute("data")) {
            return html`<loading-element style="width: 80%"></loading-element>`;
        }
                
        return html`
            <p id="info" style="display: none;">Tap in two places to form the barcode</p>
            
            <div>
                <canvas style="display: none;" id="barcode-canv"></canvas>
                <img style="display: none;" id="point1" draggable="false" src="images/circle.svg" />
                <img style="display: none;" id="point2" draggable="false" src="images/circle.svg" />
            </div>

            <button title="Edit" id="edit" @click="${this.RequestBarcodeSize}">
                <img draggable="false" style="width: inherit; height: inherit;" src="images/edit.svg" />
            </button>

            <img draggable="false" @mouseover="${this.ShowDescription}" @mouseout="${this.HideDescription}" id="description" src="images/info.svg" />
        
            <p style="display: none;" id="descriptionContent">You can use this barcode to scan in at the school scanners instead of your student card</p>
        `;
    }
}

customElements.define("student-barcode", StudentBarcode);