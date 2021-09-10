import{i as e,h as t,T as i}from"./lit-element-6ea6c272.js";const o=e`
    :host {
        margin: auto;
        flex: 0.96;
        position: relative;
        display: flex;
        justify-content: center;
        width: 96% !important;
        height: 96vh !important;
        background-color: var(--surface2);
        border-radius: 2vmin;
        box-shadow: var(--surface-shadow) 0 0 1vmin;
    }

    canvas {
        background-color: white;
        filter: contrast(5);
        transform: translate(10px, 10px);
    }

    #point1, #point2 {
        filter: none;
        width: 20px;
    }

    canvas, #point1, #point2 {
        position: absolute;
    }

    #info {
        position: absolute;
        top: 1vmin;
        color: var(--text1);
    }

    #description {
        position: absolute;
        top: 1vmin;
        left: 1vmin;
        width: 4vmin;
        filter: invert(var(--img-invert));
    }

    #descriptionContent {
        position: absolute;
        top: 5vmin;
        left: 1vmin;
        width: 40vmin;
        background-color: var(--surface2);
        padding: 2vmin;
        border-radius: 2vmin;
        box-shadow: var(--surface-shadow) 0 0 2vmin;
        color: var(--text1);
    }

    #edit {
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0);
        border-radius: 0;
        width: 8vmin;
        height: 8vmin;
        display: flex;
        align-items: center;
        justify-content: center; 
        box-shadow: none;
        filter: invert(var(--img-invert));
    }

    .edit:hover {
        background-color: rgba(0, 0, 0, 0);
    }

    .edit:active {
        background-color: rgba(0, 0, 0, 0);
    }

    button {
        border: none;
    }
`;class s extends t{static get styles(){return o}static get properties(){return{data:{type:Object}}}ShowDescription(){this.shadowRoot.getElementById("descriptionContent").style.display=""}HideDescription(){this.shadowRoot.getElementById("descriptionContent").style.display="none"}GetPercentageFromPixels(e,t){return{x:(e-this.offsetLeft)/this.clientWidth*100,y:(t-this.offsetTop)/this.clientHeight*100}}GetPixelsFromPercentage(e,t){return{x:this.clientWidth*e/100+this.offsetLeft,y:this.clientHeight*t/100+this.offsetTop}}async RequestBarcodeSize(){var e=this.shadowRoot.getElementById("point1"),t=this.shadowRoot.getElementById("point2"),i=this.shadowRoot.getElementById("info"),o=this.shadowRoot.getElementById("barcode-canv");i.style.display="",o.style.display="none",e.style.display="none",t.style.display="none";var s=new Promise((i=>{var o=0;this.addEventListener("pointerdown",(s=>{if(1==++o){var{x:a,y:n}=this.GetPercentageFromPixels(s.clientX-10,s.clientY-10);e.style.left=`${a}%`,e.style.top=`${n}%`,e.style.display=""}else if(2==o){var{x:a,y:n}=this.GetPercentageFromPixels(s.clientX-10,s.clientY-10);t.style.left=`${a}%`,t.style.top=`${n}%`,t.style.display="",this.removeEventListener("pointerdown",this),i()}}))}));await s,i.style.display="none",o.style.display="",this.UpdateBarcodeSize()}UpdateBarcodeSize(){var e,t,i,o,s=this.shadowRoot.getElementById("point1"),a=this.shadowRoot.getElementById("point2"),n=this.shadowRoot.getElementById("barcode-canv"),r=parseFloat(s.style.left.replace("%","")),l=parseFloat(s.style.top.replace("%","")),d=parseFloat(a.style.left.replace("%","")),c=parseFloat(a.style.top.replace("%",""));r>d?(e=r,t=d):(e=d,t=r),l>c?(i=l,o=c):(i=c,o=l),n.style.top=`${o}%`,n.style.left=`${t}%`,n.style.width=e-t+"%",n.style.height=i-o+"%",JsBarcode(n,this.data.studentId,{displayValue:!1,margin:0})}async CreateBarcode(){var e=this.shadowRoot.getElementById("point1"),t=this.shadowRoot.getElementById("point2"),i=this.shadowRoot.getElementById("barcode-canv");i.imageSmoothingEnabled=!1;var{x:o,y:s}=this.GetPixelsFromPercentage(80,10);({x:o,y:s}=this.GetPercentageFromPixels(o-10,s-10)),e.style.top=`${s}%`,e.style.left=`${o}%`,({x:o,y:s}=this.GetPixelsFromPercentage(20,30)),({x:o,y:s}=this.GetPercentageFromPixels(o-10,s-10)),t.style.top=`${s}%`,t.style.left=`${o}%`,this.UpdateBarcodeSize(),i.style.display="",e.style.display="",t.style.display=""}constructor(){super(),this.data={studentId:""},window.updateBarcode=()=>{this.CreateBarcode()}}updated(){this.CreateBarcode()}render(){return this.hasAttribute("data")?i`
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
        `:i`
                <loading-element style="width: 80%"></loading-element>
            `}}customElements.define("student-barcode",s);export{s as StudentBarcode};
