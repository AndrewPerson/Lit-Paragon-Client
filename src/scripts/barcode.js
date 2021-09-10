var id;
var loadingElement;

var point1 = document.getElementById("point1");
var point2 = document.getElementById("point2");

var info = document.getElementById("info");

var barcode = document.getElementById("barcode-canv");

var main = document.getElementById("barcode");

function ShowDescription() {
    document.getElementById("descriptionContent").style.display = "";
}

function HideDescription() {
    document.getElementById("descriptionContent").style.display = "none";
}

function GetPercentageFromPixels(x, y) {
    return { x: (x - main.offsetLeft) / main.clientWidth * 100, y: (y - main.offsetTop) / main.clientHeight * 100 };
}

function GetPixelsFromPercentage(x, y) {
    return { x: main.clientWidth * x / 100 + main.offsetLeft, y: main.clientHeight * y / 100 + main.offsetTop };
}

async function RequestBarcodeSize() {
    info.style.display = "";
    barcode.style.display = "none";

    point1.style.display = "none";
    point2.style.display = "none";

    var userInput = new Promise(resolve => {
        var clicks = 0;
        main.addEventListener("pointerdown", event => {
            clicks++;

            if (clicks == 1) {
                var { x, y } = GetPercentageFromPixels(event.clientX - 10, event.clientY - 10);

                point1.style.left = `${x}%`;
                point1.style.top = `${y}%`;
                point1.style.display = "";
            }
            else if (clicks == 2) {
                var { x, y } = GetPercentageFromPixels(event.clientX - 10, event.clientY - 10);

                point2.style.left = `${x}%`;
                point2.style.top = `${y}%`;
                point2.style.display = "";

                document.removeEventListener("pointerdown", this);

                resolve();
            }
        });
    });

    await userInput;

    info.style.display = "none";

    barcode.style.display = "";
    UpdateBarcodeSize();
}

function UpdateBarcodeSize() {
    if (id) {
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

        JsBarcode(barcode, id, {
            displayValue: false,
            margin: 0
        });
    }
}

async function CreateBarcode(id) {
    if (!id) {
        loadingElement = document.createElement("loading-element");

        loadingElement.style = "width: 80%";

        main.appendChild(loadingElement);

        return;
    }

    this.id = id;

    if (loadingElement)
        loadingElement.remove();

    barcode.imageSmoothingEnabled = false;

    var { x, y } = GetPixelsFromPercentage(80, 10);
    ({ x, y } = GetPercentageFromPixels(x - 10, y - 10));

    point1.style.top = `${y}%`;
    point1.style.left = `${x}%`;

    ({ x, y } = GetPixelsFromPercentage(20, 30));
    ({ x, y } = GetPercentageFromPixels(x - 10, y - 10));

    point2.style.top = `${y}%`;
    point2.style.left = `${x}%`;

    UpdateBarcodeSize();

    barcode.style.display = "";
    point1.style.display = "";
    point2.style.display = "";
}