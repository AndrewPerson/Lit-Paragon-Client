import{i as e,h as t,t as i,a as s,c as o,T as a}from"./default-css-2140c871.js";const n=e`
    :host {
        position: relative;

        flex: 1;

        display: flex;
        justify-content: center;

        margin: 2vh 2%;
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
    }

    #description {
        position: absolute;
        top: 1vmin;
        left: 1vmin;
        width: 4vmin;
    }

    #descriptionContent {
        position: absolute;
        top: 7vmin;
        left: 1vmin;
        width: 40vmin;
        background-color: var(--surface2);
        padding: 2vmin;
        border-radius: 2vmin;
        box-shadow: var(--surface-shadow) 0 0 2vmin;
    }

    #edit {
        position: absolute;
        top: 0;
        right: 0;
        width: 8vmin;
        height: 8vmin;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border: none;
    }
`;class l extends t{static get styles(){return[i,s,o,n]}static get properties(){return{data:{type:Object}}}ShowDescription(){this.shadowRoot.getElementById("descriptionContent").style.display=""}HideDescription(){this.shadowRoot.getElementById("descriptionContent").style.display="none"}GetPercentageFromPixels(e,t){return{x:(e-this.offsetLeft)/this.clientWidth*100,y:(t-this.offsetTop)/this.clientHeight*100}}GetPixelsFromPercentage(e,t){return{x:this.clientWidth*e/100+this.offsetLeft,y:this.clientHeight*t/100+this.offsetTop}}async RequestBarcodeSize(){var e,t,i,s,o=this.shadowRoot.getElementById("point1"),a=this.shadowRoot.getElementById("point2"),n=this.shadowRoot.getElementById("info"),l=this.shadowRoot.getElementById("barcode-canv");n.style.display="",l.style.display="none",o.style.display="none",a.style.display="none";var r=new Promise((n=>{var l=0;this.addEventListener("pointerdown",(r=>{if(1==++l){var{x:d,y:c}=this.GetPercentageFromPixels(r.clientX-10,r.clientY-10);e=d,t=c,o.style.left=`${d}%`,o.style.top=`${c}%`,o.style.display=""}else if(2==l){var{x:d,y:c}=this.GetPercentageFromPixels(r.clientX-10,r.clientY-10);i=d,s=c,a.style.left=`${d}%`,a.style.top=`${c}%`,a.style.display="",this.removeEventListener("pointerdown",this),n()}}))}));await r;var d=await caches.open(window.PREFERENCE_CACHE);await d.put("Barcode Size",new Response(`${e} ${t} ${i} ${s}`)),n.style.display="none",l.style.display="",this.UpdateBarcodeSize()}UpdateBarcodeSize(){var e,t,i,s,o=this.shadowRoot.getElementById("point1"),a=this.shadowRoot.getElementById("point2"),n=this.shadowRoot.getElementById("barcode-canv"),l=parseFloat(o.style.left.replace("%","")),r=parseFloat(o.style.top.replace("%","")),d=parseFloat(a.style.left.replace("%","")),c=parseFloat(a.style.top.replace("%",""));l>d?(e=l,t=d):(e=d,t=l),r>c?(i=r,s=c):(i=c,s=r),n.style.top=`${s}%`,n.style.left=`${t}%`,n.style.width=e-t+"%",n.style.height=i-s+"%",JsBarcode(n,this.data.studentId,{displayValue:!1,margin:0})}async CreateBarcode(){var e,t,i,s,o=this.shadowRoot.getElementById("point1"),a=this.shadowRoot.getElementById("point2"),n=this.shadowRoot.getElementById("barcode-canv");n.imageSmoothingEnabled=!1;var l=await caches.open(window.PREFERENCE_CACHE),r=await l.match("Barcode Size");if(r){var[e,i,t,s]=(await r.text()).split(" ");o.style.left=`${e}%`,o.style.top=`${i}%`,a.style.left=`${t}%`,a.style.top=`${s}%`}else{var{x:d,y:c}=this.GetPixelsFromPercentage(80,10);({x:d,y:c}=this.GetPercentageFromPixels(d-10,c-10)),o.style.left=`${d}%`,o.style.top=`${c}%`,({x:d,y:c}=this.GetPixelsFromPercentage(20,30)),({x:d,y:c}=this.GetPercentageFromPixels(d-10,c-10)),a.style.left=`${d}%`,a.style.top=`${c}%`}this.UpdateBarcodeSize(),n.style.display="",o.style.display="",a.style.display=""}constructor(){super(),this.data={studentId:""},window.updateBarcode=()=>{this.CreateBarcode()}}updated(){this.CreateBarcode()}render(){return this.hasAttribute("data")?a`
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
        
            <p style="display: none;" id="descriptionContent">You can use this barcode to scan in at the school scanners instead of your student card.</p>
        `:a`<loading-element style="width: 80%"></loading-element>`}}customElements.define("student-barcode",l);export{l as StudentBarcode};
