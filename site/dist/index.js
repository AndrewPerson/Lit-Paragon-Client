import{a as _,b as o,c as s,d as H,e as O,f as k,g as d,h as n,i as a,j as u,k as f,l as x,m,n as Y,o as G,p as V,q as J,r as X,s as K,t as Q,u as h}from"./chunk-56HFKBBI.js";import{a as e}from"./chunk-5FTHTWEJ.js";var w=class extends d{constructor(){super(...arguments);this._state=0;this._unreceivedResources=0;this._uncompletedResources=0}AddResource(t,r){this._unreceivedResources++,this._uncompletedResources++;let c=!1,p=!1;_.GetResource(t,T=>{c||(this._unreceivedResources--,c=!0),T!=null&&(p||(this._uncompletedResources--,p=!0),this[r]=T),this._uncompletedResources==0?this._state=2:this._unreceivedResources==0&&(this._state=1)})}render(){return this._state==0?k:this._state==1?s`
            <loading-indicator style="width: 30.8rem; height: 100%; margin: auto;"></loading-indicator>
            <style>
                :host {
                    display: flex;
                }
            </style>
            `:this.renderPage()}renderPage(){return k}};e([u()],w.prototype,"_state",2);var tt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},et=l=>(...t)=>({_$litDirective$:l,values:t}),B=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,c){this._$Ct=t,this._$AM=r,this._$Ci=c}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var U=class extends B{constructor(t){if(super(t),this.it=k,t.type!==tt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===k||t==null)return this.vt=void 0,this.it=t;if(t===O)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this.vt;this.it=t;let r=[t];return r.raw=r,this.vt={_$litType$:this.constructor.resultType,strings:r,values:[]}}};U.directiveName="unsafeHTML",U.resultType=1;var rt=et(U);var it=o`:host {
    display: block;
}

details, summary {
    --user-select: text;
    cursor: text;
}

summary {
    position: relative;

    list-style: none;

    margin-bottom: 0.4rem;
}

summary > * {
    cursor: pointer;
}

summary::after {
    content: "";

    position: absolute;
    top: 0;
    right: 0;

    display: block;
    width: 1.5rem;
    height: 1.5rem;

    margin-left: auto;
    
    background-image: url(images/toggle.svg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: center;

    cursor: pointer;

    transform: rotate(180deg);

    transition: 0.3s;
}

details[open] > summary::after {
    transform: none;
}

.info {
    font-size: 0.7rem;
}`;var v=class extends d{render(){return s`
        <details>
            <summary>
                <h3>${this.title}</h3>
                <p class="info">By ${this.author} | For ${this.years}${this.meetingTime===void 0?"":` | At ${this.meetingTime}`}</p>
            </summary>

            ${rt(this.content)}
        </details>
        `}};v.styles=[m,it],e([a()],v.prototype,"title",2),e([a()],v.prototype,"author",2),e([a()],v.prototype,"years",2),e([a({type:Boolean})],v.prototype,"meeting",2),e([a()],v.prototype,"meetingTime",2),e([a()],v.prototype,"content",2),e([a({type:Number})],v.prototype,"weight",2),v=e([n("announcement-post")],v);var N=o`:where(input[type=search]) {
    border: none;
    border-bottom: solid 0.05rem var(--text2);
    border-radius: 0;

    background-color: var(--surface2);
    color: var(--text1);

    font-size: 1rem;
    font-family: monospace;

    height: 2rem;
}

:where(input[type=search]:focus) {
    outline: none;
}

:where(input[type=search])::-webkit-input-placeholder {
    color: var(--text3);
}

:where(input[type=search])::-moz-placeholder {
    color: var(--text3);
}

:where(input[type=search])::-webkit-search-cancel-button {
    -webkit-appearance: none;
}`;var ot=o`:where(select) {
    border: solid 0.05rem var(--text2);
    background-color: var(--surface2);
    color: var(--text2);

    padding: 0.4rem 0;
    padding-right: 2.3rem;

    border-radius: 0.4rem;

    font-size: calc(1rem / 1.2);

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}

:where(option) {
    background-color: var(--surface2);
}`;var R=o`:host, main {
    flex: 1;
    margin: 1%;

    box-sizing: border-box;
    padding: 0.4rem;
}

/*
    306px is 102% of 300px.
    We use 102% because that includes the margin,
    which is 1% either side.
*/
@media (max-width: 306px) {
    :host, main {
        margin: 1% calc(50% - 150px);
    }
}

@media (max-width: 300px) {
    :host, main {
        margin: 1% 0;
    }
}`;var y=o`:host, main {
    box-shadow: var(--shadow);
    background-color: var(--surface2);
    border-radius: 0.8rem;
}`;var st=o`:host {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    overscroll-behavior: contain;
}

.header {
    display: flex;
    justify-content: space-between;
}

.content {
    flex: 1;
    overflow: hidden auto;

    scrollbar-width: thin;
    scrollbar-color: var(--surface4) transparent;
}

.content::-webkit-scrollbar-track {
    background-color: transparent;

    width: 0.4rem;
}

.content::-webkit-scrollbar-thumb {
    background-color: var(--surface4);
    border-radius: 0.4rem;
}

.content:empty::after {
    content: "No announcements. Try changing your filter or searching for something else.";

    display: block;
    width: 100%;

    margin-top: 0.4rem;

    text-align: center;

    font-size: 1.4rem;
}

announcement-post {
    margin-bottom: 1.2rem;
}`;var E=class extends w{constructor(){super();this.yearFilter="all";this.searchFilter="";this.AddResource("announcements","announcements")}renderPage(){let t=this.yearFilter=="all"?this.announcements.notices:this.announcements.notices.filter(r=>r.years.includes(this.yearFilter));return t=this.searchFilter==""?t:t.filter(r=>r.title.toLowerCase().includes(this.searchFilter.toLowerCase())||r.content.toLowerCase().includes(this.searchFilter.toLowerCase())),s`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${r=>this.searchFilter=r.target.value}">

            <select @input="${r=>this.yearFilter=r.target.value}">
                <option value="all">All</option>
                <option value="Staff">Staff</option>
                <option value="12">Year 12</option>
                <option value="11">Year 11</option>
                <option value="10">Year 10</option>
                <option value="9">Year 9</option>
                <option value="8">Year 8</option>
                <option value="7">Year 7</option>
            </select>
        </div>

        <!--The ugliest code ever written, but the div tags for .content need to be where they are, or the :empty selector won't work-->
        <div class="content">${t.map(r=>s`
            <announcement-post title="${r.title}" content="${r.content}" author="${r.authorName}"
                               years="${r.displayYears}" ?meeting="${r.isMeeting==1}"
                               ${r.meetingTime===null?"":`meetingTime="${r.meetingTime}${r.meetingTimeParsed===void 0?"":` (${r.meetingTimeParsed})`}"`}
                               weight="${r.relativeWeight+r.isMeeting}"></announcement-post>
        `)}</div>
        `}};E.styles=[y,R,m,x,N,ot,st],e([u()],E.prototype,"announcements",2),e([u()],E.prototype,"yearFilter",2),e([u()],E.prototype,"searchFilter",2),E=e([n("school-announcements")],E);var at=o`:host {
    position: relative;
    display: block;
}

button {
    all: unset;
    width: inherit;
    height: inherit;
}

svg {
    width: inherit;
    height: inherit;
}

slot {
    position: absolute;
    display: block;
    top: var(--offset);
    
    width: max-content;
    max-width: var(--max-width);

    background-color: var(--surface2);

    border-radius: 0.8rem;
    box-shadow: var(--shadow);
    padding: 0.8rem;

    z-index: inherit;

    box-sizing: border-box;
}

.background {
    position: absolute;
    width: var(--max-width);
    height: 200%;
    top: 0;
    clip-path: polygon(0 0, 100% 100%, 0 100%);
}`;var nt=H`<svg width="210" height="210" viewBox="0 0 210 210" xmlns="http://www.w3.org/2000/svg"><path d="M5 105a100 100 0 1 1 200 0 100 100 0 0 1-200 0Z" fill="none" stroke="#323232" stroke-width="10"/><path d="M95.8 128.4v-.6q0-9.8 2-15.5 2-5.8 5.6-9.4 3.5-3.6 8.5-6.6 4.5-2.7 7.6-7.1 3-4.4 3-10.5 0-7.5-5-12-5.1-4.4-12.3-4.4-4.2 0-8 1.8-4 1.7-6.6 5.5-2.6 3.7-3 9.7H74.7q.4-8.7 4.5-14.9 4.2-6.2 11-9.4 6.7-3.3 15-3.3 9 0 15.7 3.6 6.6 3.6 10.3 9.8 3.7 6.2 3.7 14.2 0 8.5-3.8 14.5T120.5 104q-6.7 4.2-9.5 9.2-2.8 5-3 14.6v.6H95.9Zm6.5 30.3q-3.8 0-6.5-2.7t-2.7-6.5q0-3.8 2.7-6.5t6.5-2.7q3.8 0 6.5 2.7t2.7 6.5q0 3.8-2.7 6.5t-6.5 2.7Z"/></svg>`;var P=class extends d{constructor(){super();this.HidePopup=(()=>{this.info.style.display="none",this.background.style.display="none"}).bind(this);this.addEventListener("mouseleave",this.HidePopup),document.addEventListener("pointerover",this.HidePopup)}ShowPopup(t){this.info.style.removeProperty("display"),this.background.style.removeProperty("display"),t.stopPropagation()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pointerover",this.HidePopup)}render(){return s`
        <button @click="${this.ShowPopup}" @mouseover="${this.ShowPopup}">
            ${nt}
        </button>

        <slot style="display: none"></slot>

        <div class="background" style="display: none"></div>
        `}};P.styles=[x,at],e([f("slot")],P.prototype,"info",2),e([f(".background")],P.prototype,"background",2),P=e([n("info-popup")],P);var lt=o`:host {
    position: relative;

    touch-action: none;
}

#point1,
#point2 {
    --size: 1.2rem;

    position: absolute;

    width: var(--size);
    height: var(--size);

    background-color: var(--surface4);
    border-radius: calc(var(--size) / 2);

    transform: translate(-50%, -50%);

    z-index: 1;

    cursor: move;
}

#point1::after,
#point2::after {
    content: "";

    display: block;

    width: 3vmax;
    height: 3vmax;

    margin: calc(var(--size) / 2 - 1.5vmax);
}

#barcodeDisplay {
    position: absolute;

    box-sizing: border-box;

    filter: contrast(5);
}

#barcodeDisplay.outline {
    border: solid 0.4rem var(--text1);
}

info-popup {
    --max-width: 30vmax;
    --offset: 2.6rem;
    
    width: 1.9rem;
    height: 1.9rem;
    z-index: 2;
}`;var C=class extends w{constructor(){super();this.draggedElement=null;this.dragging=!1;this.addEventListener("pointerdown",t=>t.preventDefault()),this.addEventListener("pointermove",this.DragPoint),this.addEventListener("pointerup",this.EndDrag),this.AddResource("userinfo","userInfo"),h.ListenForDark(t=>{this.barcode?.classList.toggle("outline",t)})}set userInfo(t){this.studentId=t.studentId,this.requestUpdate()}StartDrag(t){t.preventDefault(),this.draggedElement=t.target,this.draggedElement.style.pointerEvents="none",this.style.cursor="move"}DragPoint(t){t.preventDefault(),this.draggedElement!=null&&(this.dragging||(this.dragging=!0,this.draggedElement.style.left=`${(t.clientX-this.offsetLeft)/this.clientWidth*100}%`,this.draggedElement.style.top=`${(t.clientY-this.offsetTop)/this.clientHeight*100}%`,this.SetBarcodePosition(),this.dragging=!1))}EndDrag(){this.draggedElement!=null&&this.draggedElement.style.removeProperty("pointer-events"),this.draggedElement=null,this.removeAttribute("style"),this.RenderBarcode()}SetBarcodePosition(){if(this.barcode===null)return;let t=parseFloat(this.point1?.style.left.substring(0,this.point1.style.left.length-1)||"0"),r=parseFloat(this.point1?.style.top.substring(0,this.point1.style.top.length-1)||"0"),c=parseFloat(this.point2?.style.left.substring(0,this.point2.style.left.length-1)||"0"),p=parseFloat(this.point2?.style.top.substring(0,this.point2.style.top.length-1)||"0"),T=Math.max(t,c),q=Math.min(t,c),Et=Math.max(r,p),W=Math.min(r,p);this.barcode.style.left=`${q}%`,this.barcode.style.top=`${W}%`,this.barcode.style.width=`${T-q}%`,this.barcode.style.height=`${Et-W}%`}RenderBarcode(){this.draggedElement==null&&(this.barcode===null||this.point1===null||this.point2===null||(localStorage.setItem("Barcode Points",JSON.stringify([this.point1.style.left,this.point1.style.top,this.point2.style.left,this.point2.style.top])),typeof JsBarcode=="function"&&JsBarcode(this.barcode,this.studentId,{displayValue:!1,margin:0})))}updated(){this.SetBarcodePosition(),this.RenderBarcode()}renderPage(){let t=localStorage.getItem("Barcode Points"),r=["20%","20%","80%","40%"];return t&&(r=JSON.parse(t)),s`
        <info-popup>Use this barcode to scan in instead of your Student Card. Drag the points to resize it.</info-popup>

        <div id="point1" style="left: ${r[0]}; top: ${r[1]};" @pointerdown="${this.StartDrag}"></div>
        <div id="point2" style="left: ${r[2]}; top: ${r[3]};" @pointerdown="${this.StartDrag}"></div>

        <canvas id="barcodeDisplay" class="${h.dark?"outline":""}" style="top: 20%; left: 20%; width: 60%; height: 20%;"></canvas>
        `}};C.styles=[y,R,m,x,lt],e([f("#barcodeDisplay")],C.prototype,"barcode",2),e([f("#point1")],C.prototype,"point1",2),e([f("#point2")],C.prototype,"point2",2),C=e([n("student-barcode")],C);var Z=o`:host, main {
    padding: 0.8rem;

    margin: auto;

    width: 60vw;
    max-width: 60vh;
    min-width: 300px;
    height: 80%;
}

@media (max-width: 300px) {
    :host, main {
        width: 100vw;
        min-width: unset;
    }
}`;var dt=o`:host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.next-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.timer-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
}

.timer {
    font-size: 2.5rem;
}

.line {
    flex: 1;
    height: 0;
    border-top: solid 0.05rem var(--text3);
}`;var I=class extends w{constructor(){super();this.AddResource("dailytimetable","dailyTimetable")}renderPage(){return s`
            <div class="next-display">
                <p>Nothing</p>
                <p>in</p>
                <div class="timer-container">
                    <span class="line left"></span>
                    <h1 class="timer">Never</h1>
                    <span class="line right"></span>
                </div>
            </div>
        `}};I.styles=[y,Z,m,dt],e([u()],I.prototype,"dailyTimetable",2),I=e([n("daily-timetable")],I);var mt=o`:host {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

svg {
    width: inherit;
    height: inherit;
    animation: 3s infinite spin;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}`;var pt=H`<svg width="529" height="528" viewBox="0 0 529 528" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="i"><use xlink:href="#a"/></clipPath><clipPath id="j"><use xlink:href="#b"/></clipPath><clipPath id="k"><use xlink:href="#c"/></clipPath><clipPath id="l"><use xlink:href="#d"/></clipPath><clipPath id="m"><use xlink:href="#e"/></clipPath><clipPath id="n"><use xlink:href="#f"/></clipPath><clipPath id="o"><use xlink:href="#g"/></clipPath><clipPath id="p"><use xlink:href="#h"/></clipPath><path d="M0 256a256 256 0 1 1 512 0 256 256 0 0 1-512 0Z" id="a"/><path d="M256 512a256 256 0 1 1 0-512 256 256 0 0 1 0 512Z" id="b"/><path d="M0 241.5a241.5 241.5 0 1 1 483 0 241.5 241.5 0 0 1-483 0Z" id="c"/><path d="M380 439.5a241.5 241.5 0 1 0-277-396 241.5 241.5 0 0 0 277 396c-.1 0 0 0 0 0Z" id="d"/><path d="M0 227a227 227 0 1 1 454 0 227 227 0 0 1-454 0Z" id="e"/><path d="M262.5 2.8a227 227 0 1 0 188.7 259.9A227 227 0 0 0 262.5 2.8Z" id="f"/><path d="M0 209.3a209.3 209.3 0 1 1 418.6 0 209.3 209.3 0 0 1-418.6 0Z" id="g"/><path d="M209.3 0a209.3 209.3 0 1 1 0 418.6 209.3 209.3 0 0 1 0-418.6Z" id="h"/></defs><path d="M8 264a256 256 0 1 1 512 0 256 256 0 0 1-512 0Z" fill="none"/><g clip-path="url(#i)" transform="translate(8 8)"><path d="M0 256a256 256 0 1 1 512 0 256 256 0 0 1-512 0Z" fill="none" stroke="#78AFA0" stroke-width="8" stroke-dasharray="76 4 70 76 4 70"/></g><path d="M264 520a256 256 0 1 1 0-512 256 256 0 0 1 0 512Z" fill="none"/><g clip-path="url(#j)" transform="translate(8 8)"><path d="M256 512a256 256 0 1 1 0-512 256 256 0 0 1 0 512Z" fill="none" stroke="#78AFA0" stroke-opacity=".3" stroke-width="8" stroke-dasharray="46 2 12 46 2 12"/></g><path d="M22.5 264a241.5 241.5 0 1 1 483 0 241.5 241.5 0 0 1-483 0Z" fill="none"/><g clip-path="url(#k)" transform="translate(22.5 22.5)"><path d="M0 241.5a241.5 241.5 0 1 1 483 0 241.5 241.5 0 0 1-483 0Z" fill="none" stroke="#DDA131" stroke-width="16" stroke-dasharray="76 2 40 180"/></g><path d="M402.5 461.8a241.5 241.5 0 1 0-277-396 241.5 241.5 0 0 0 277 396c-.1 0 0 0 0 0Z" fill="none"/><g clip-path="url(#l)" transform="translate(22.5 22.3)"><path d="M380 439.5a241.5 241.5 0 1 0-277-396 241.5 241.5 0 0 0 277 396c-.1 0 0 0 0 0Z" fill="none" stroke="#DDA131" stroke-opacity=".7" stroke-width="16" stroke-dasharray="56 2 4 56 2 4"/></g><path d="M37 264a227 227 0 1 1 454 0 227 227 0 0 1-454 0Z" fill="none"/><g clip-path="url(#m)" transform="translate(37 37)"><path d="M0 227a227 227 0 1 1 454 0 227 227 0 0 1-454 0Z" fill="none" stroke="#D36F2B" stroke-width="8" stroke-dasharray="51 4 10 80"/></g><path d="M299.5 39.7a227 227 0 1 0 188.7 259.8A227 227 0 0 0 299.5 39.7Z" fill="none"/><g clip-path="url(#n)" transform="translate(37 36.8)"><path d="M262.5 2.8a227 227 0 1 0 188.7 259.9A227 227 0 0 0 262.5 2.8Z" fill="none" stroke="#D36F2B" stroke-opacity=".4" stroke-width="8" stroke-dasharray="140 4 10 80"/></g><path d="M54.7 264a209.3 209.3 0 1 1 418.6 0 209.3 209.3 0 0 1-418.6 0Z" fill="none"/><g clip-path="url(#o)" transform="translate(54.7 54.7)"><path d="M0 209.3a209.3 209.3 0 1 1 418.6 0 209.3 209.3 0 0 1-418.6 0Z" fill="none" stroke="#C24127" stroke-width="4" stroke-dasharray="35 7 10 80"/></g><path d="M264 54.7a209.3 209.3 0 1 1 0 418.6 209.3 209.3 0 0 1 0-418.6Z" fill="none"/><g clip-path="url(#p)" transform="translate(54.7 54.7)"><path d="M209.3 0a209.3 209.3 0 1 1 0 418.6 209.3 209.3 0 0 1 0-418.6Z" fill="none" stroke="#C24127" stroke-opacity=".3" stroke-width="4" stroke-dasharray="35 7 10 80"/></g></svg>`;var F=class extends d{render(){return pt}};F.styles=mt,F=e([n("loading-indicator")],F);var ht=o`:host {
    width: 100%;
    height: 100%;
}

loading-indicator {
    width: 30.8rem;
    height: 100%;
    margin: auto;
}

iframe {
    width: inherit;
    height: inherit;
    border: none;
}`;var L=class extends d{constructor(){super(...arguments);this.src=""}StopLoading(){this.loader.remove(),this.frame.removeAttribute("style")}render(){return s`
        <iframe @load="${this.StopLoading}" src="${this.src}" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" style="display: none"></iframe>
        <loading-indicator></loading-indicator>
        `}};L.styles=ht,e([a({type:String})],L.prototype,"src",2),e([f("iframe",!0)],L.prototype,"frame",2),e([f("loading-indicator",!0)],L.prototype,"loader",2),L=e([n("extension-page")],L);var j=o`a.button {
    text-decoration: none;
    cursor: default;
}

:where(button, .button) {
    border: solid 0.05rem var(--surface4);
    background-color: var(--surface2);
    color: var(--text2);
    padding: 0.4rem 0.8rem;
    border-radius: 0.4rem;
    box-shadow: var(--small-shadow);
    font-size: 1rem;
}

:where(button:hover, .button:hover) {
    background-color: var(--surface3);
    color: var(--text2);
}

:where(button:active, .button:active) {
    border: solid 0.05rem transparent;
    color: var(--text4);
    text-shadow: 0.1rem 0.1rem var(--shadow-colour);
    background-color: var(--surface4);
}`;var ct=o`:host {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1.2rem;
}

img {
    width: 4rem;
    height: 4rem;

    border-radius: 100%;

    box-shadow: var(--small-shadow);
}

.content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.4rem;

    flex: 1;
}`;var $=class extends d{async Install(){await G(this.title),document.getElementById("pages").requestUpdate()}async Uninstall(){await V(this.title),document.getElementById("pages").requestUpdate()}render(){return s`
        <img src="${this.img}">
        
        <div class="content">
            <h4>${this.title}</h4>
            <p>${this.description}</p>

            <button @click="${this.installed?this.Uninstall:this.Install}">${this.installed?"Uninstall":"Install"}</button>
        </div>
        `}};$.styles=[m,j,ct],e([a()],$.prototype,"title",2),e([a()],$.prototype,"img",2),e([a()],$.prototype,"description",2),e([a({type:Boolean})],$.prototype,"installed",2),$=e([n("extension-display")],$);var ut=o`:host {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    overscroll-behavior: contain;
}

.header {
    display: flex;
    justify-content: space-between;
}

.content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-template-rows: max-content;
    gap: 0.8rem;

    flex: 1;

    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--surface4) transparent;
}

.content::-webkit-scrollbar-track {
    background-color: transparent;

    width: 0.4rem;
}

.content::-webkit-scrollbar-thumb {
    background-color: var(--surface4);
    border-radius: 0.4rem;
}

.content:empty::after {
    content: "No extensions. Try searching for something else.";

    display: block;
    width: 100%;

    margin-top: 0.4rem;

    text-align: center;

    font-size: 1.4rem;
}`;var S=class extends d{constructor(){super();this.fetchingExtensions=!0;this.extensions=new Map;J(t=>{this.fetchingExtensions=!1,this.extensions=t})}render(){let t=Y.installedExtensions,r=[];for(var c of t.keys())r.push(c);return s`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${p=>this.searchFilter=p.target.value}">
            <input type="checkbox">
        </div>

        ${this.fetchingExtensions?k:s`
        <!--The ugliest code ever written, but the div tags for .content need to be where they are, or the :empty selector won't work-->
        <div class="content">${[...this.extensions.keys()].map(p=>s`
            <extension-display title="${p}" img="${K(this.extensions.get(p))}"
                            description="${this.extensions.get(p).description}"
                            ?installed="${r.includes(p)}"></extension-display>
        `)}</div>
        `}
        `}};S.styles=[y,R,m,N,ut],e([u()],S.prototype,"extensions",2),S=e([n("extensions-marketplace")],S);var gt=o`:host {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;

    background-color: var(--surface2);
    padding: 0.6rem;
    border-radius: 0.6rem;
    box-shadow: var(--small-shadow);
}

button.indicator {
    --scale: 0.95;
}

loading-indicator {
    --scale: 1.1;
}

.indicator {
    all: unset;

    display: flex;

    width: calc(1rem * var(--scale));
    height: calc(1rem * var(--scale));
}

svg {
    width: inherit;
    height: inherit;
}`;var ft=H`<svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#323232" stroke-width="10" stroke-linecap="round"><path d="m5 5 210 210M215 5 5 215"/></g></svg>`;var A=class extends d{render(){return s`
        <slot></slot>
        ${this.loader?s`
        <loading-indicator class="indicator"></loading-indicator>`:s`
        <button class="indicator"  @click="${this.remove}" title="Close">
            ${ft}
        </button>`}
        `}};A.styles=[x,gt],e([a({type:Boolean})],A.prototype,"loader",2),A=e([n("inline-notification")],A);var yt=o`:where(input[type=range]) {
    appearance: none;
    width: 7rem;
    background-color: var(--surface1);
    height: calc(1rem / 1.5);
    box-shadow: var(--small-shadow);
    border-radius: calc(1rem / 2.5);
}

:where(input[type=range])::-moz-range-thumb {
    -webkit-appearance: none;
    background-color: var(--surface4);
    border-radius: 100%;
    width: calc(1rem / 1.5);
    height: calc(1rem / 1.5);
    border: none;
    box-shadow: var(--small-shadow);
}

:where(input[type=range])::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: var(--surface4);
    border-radius: 100%;
    width: calc(1rem / 1.5);
    height: calc(1rem / 1.5);
    border: none;
    box-shadow: var(--small-shadow);
}`;var vt=o`:host {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.2rem;
}

span {
    width: 80%;
    border-bottom: solid 0.05rem var(--text3);
}

#toggle {
    display: grid;

    padding: 0.4rem;
    width: 3.1rem;
    height: 3.1rem;

    appearance: none;
    -webkit-appearance: none;
}

#toggle::after {
    content: "";
    width: 100%;
    height: 100%;

    background-image: url(/images/moon.svg);
    background-size: contain;

    filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));

    pointer-events: none;
}

#toggle:checked::after {
    background-image: url(/images/sun.svg);
}

info-popup {
    position: absolute;
    top: 1.2rem;
    left: 1.2rem;
    width: 1.9rem;
    height: 1.9rem;
    --max-width: 30vmax;
    --offset: 2.6rem;
    z-index: 2;
}`;var D=class extends d{constructor(){super();this.version="0.0.0";h.GetVersion().then(t=>this.version=t)}Patch(){}ResetColour(){this.hueInput.value="200",h.SetHue("200"),h.SaveHue()}ToggleDark(t){let r=t.target;h.SetDark(r.checked),this.requestUpdate()}ToggleEditNavbar(){let t=document.querySelector("nav-bar");t&&t.toggleAttribute("editing")}render(){return s`
        <info-popup>
            Paragon is written by <a href="https://github.com/AndrewPerson">Andrew Pye</a>.
            <br>
            The source code is on <a href="https://github.com/AndrewPerson/Lit-Paragon-Client">Github</a>.
        </info-popup>

        <p id="version">Paragon v${this.version}</p>

        <button @click="${this.Patch}">Fix</button>

        <span></span>
        
        <p>Colour</p>

        <button @click="${this.ResetColour}">Reset</button>

        <input type="range" id="hue" min="0" max="359" value="${h.hue}"
               @input="${t=>h.SetHue(t.target.value)}"
               @change="${h.SaveHue.bind(h)}">

        <span></span>

        <p>${h.dark?"Dark":"Light"} Mode</p>

        <input type="checkbox" ?checked="${h.dark}" id="toggle" class="button" title="Turn on ${h.dark?"Light":"Dark"} Mode" @input="${this.ToggleDark}">
        
        <span></span>

        <p>Sidebar</p>

        <button @click="${this.ToggleEditNavbar}">Edit</button>
        `}};D.styles=[m,x,j,yt,Z,y,vt],e([f("#hue",!0)],D.prototype,"hueInput",2),e([u()],D.prototype,"version",2),D=e([n("user-settings")],D);var bt=o`:host {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.highlighted {
    border-radius: 0.4rem;

    background-color: var(--surface4);
    color: var(--text4);

    box-shadow: var(--shadow);
    text-shadow: 0.05rem 0.05rem var(--shadow-colour);

    animation: appear 0.3s ease-out;
}

@keyframes appear {
    from {
        filter: opacity(0);
    }

    to {
        filter: opacity(1);
    }
}

p {
    width: 4rem;
    height: 1.5rem;
    text-align: center;
    line-height: 1.5rem;
}

@media (max-aspect-ratio: 3/4) {
    p {
        margin-top: 0.5vmax;
    }
}

#popup {
    position: absolute;
    top: 2rem;

    color: var(--text4);

    border-radius: 0.4rem;
    background-color: var(--surface4);

    box-shadow: var(--shadow);
    text-shadow: 0.05rem 0.05rem var(--shadow-colour);

    z-index: 97;

    animation: popupAppear 0.3s ease-out;

    pointer-events: none;
}

:host(.highlighted) > #popup {
    z-index: 98;
    box-shadow: 0 0 0 0.2rem var(--text1);
}

#popup::before {
    --size: 0.5rem;

    content: "";

    position: absolute;
    left: calc(50% - calc(var(--size) / 1.5));
    top: calc(-1 * var(--size));

    border-right: calc(var(--size) / 1.5) solid transparent;
    border-bottom: var(--size) solid var(--surface4);
    border-left: calc(var(--size) / 1.5) solid transparent;
}

#popup[reversed] {
    top: -2rem;
}

#popup[reversed]::before {
    top: unset;
    bottom: calc(-1 * var(--size));

    transform: rotate(180deg);
}

@keyframes popupAppear {
    from {
        filter: opacity(0);
    }

    to {
        filter: opacity(1);
    }
}`;var g=class extends d{static highlight(t){this.highlighted=t;for(let r of this.instances)r.requestUpdate()}constructor(){super();g.instances.push(this)}Highlight(){g.highlight(this.name),this.classList.add("highlighted")}Unhighlight(){g.highlight(""),this.classList.remove("highlighted")}firstUpdated(){this.name&&(this.tabIndex=0,this.addEventListener("mouseover",this.Highlight),this.addEventListener("mouseleave",this.Unhighlight),this.addEventListener("click",this.Highlight),this.addEventListener("focus",this.Highlight),this.addEventListener("blur",this.Unhighlight))}render(){if(g.highlighted==this.name&&this.name){let r=this.nextElementSibling,c=r?.nextElementSibling,p=r?.getAttribute("name")==this.name||c?.getAttribute("name")==this.name;return s`
            <p class="highlighted">${this.name}</p>
            <p id="popup"
                ?reversed="${p}">
                ${this.room}
            </p>
            `}else return s`<p>${this.name}</p>`}};g.styles=[m,bt],g.instances=[],e([a()],g.prototype,"name",2),e([a()],g.prototype,"room",2),g=e([n("timetable-period")],g);var xt=o`:host {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 4.5rem;
    min-width: 0;
}

.name {
    margin-bottom: 0.4rem;
    text-align: center;
    font-size: calc(1rem / 1.2);
    width: 3.63rem;
    color: var(--text3);
    border-bottom: solid grey 0.05rem;
}

.highlighted {
    color: var(--text2);
}`;var M=class extends d{render(){return s`
            <p class="name ${this.day==this.name?"highlighted":""}">${this.name}</p>
            
            <timetable-period name="${this.periods["1"]?.title}"
                              room="${this.periods["1"]?.room}">
            </timetable-period>
            <timetable-period name="${this.periods["2"]?.title}"
                              room="${this.periods["2"]?.room}">
            </timetable-period>
            <timetable-period name="${this.periods["3"]?.title}"
                              room="${this.periods["3"]?.room}">
            </timetable-period>
            <timetable-period name="${this.periods["4"]?.title}"
                              room="${this.periods["4"]?.room}">
            </timetable-period>
            <timetable-period name="${this.periods["5"]?.title}"
                              room="${this.periods["5"]?.room}">
            </timetable-period>
        `}};M.styles=[m,xt],e([a()],M.prototype,"name",2),e([a({type:Array})],M.prototype,"periods",2),e([a()],M.prototype,"day",2),M=e([n("timetable-day")],M);var wt=o`:host {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    padding-top: 0.4rem;
    margin-bottom: 0.4rem;
}

.period-nums {
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-start;
}

.period-nums > p {
    color: var(--text3);
    height: 1.5rem;
    line-height: 1.5rem;

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}

@media (max-aspect-ratio: 3/4) {
    .period-nums > p {
        height: 3vmax;
        margin-top: 0.5vmax;
    }
}`;var b=class extends d{render(){return s`
            <div class="period-nums">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
            </div>

            <timetable-day name="MON ${this.week}"
                           .periods="${this.day1.periods}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="TUE ${this.week}"
                           .periods="${this.day2.periods}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="WED ${this.week}"
                           .periods="${this.day3.periods}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="THU ${this.week}"
                           .periods="${this.day4.periods}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="FRI ${this.week}"
                           .periods="${this.day5.periods}"
                           day="${this.day}">
            </timetable-day>
        `}};b.styles=[m,wt],e([a()],b.prototype,"week",2),e([a({type:Object})],b.prototype,"day1",2),e([a({type:Object})],b.prototype,"day2",2),e([a({type:Object})],b.prototype,"day3",2),e([a({type:Object})],b.prototype,"day4",2),e([a({type:Object})],b.prototype,"day5",2),e([a()],b.prototype,"day",2),b=e([n("timetable-row")],b);var kt=o`:host {
    margin: auto;
    padding: 1.6rem;
    max-width: 92%;
    width: 23rem;
    height: 29rem;
}

@media (max-aspect-ratio: 3/4) {
    :host {
        height: calc(29rem + 7.5vmax);
    }
}

/* We use 26.2rem because that is the full width of the timetable including padding.
@media (max-width: 26.2rem) {
    :host {
        padding: calc((100vw - 23rem) / 2);
    }
}
*/

timetable-row + timetable-row {
    border-top: solid grey 0.05rem;
}`;var z=class extends w{set dailyTimetable(t){this._day=t.timetable.timetable.dayname}ClearHighlight(){g.highlight("")}constructor(){super();this.AddResource("timetable","timetable"),this.AddResource("dailytimetable","dailyTimetable"),this.addEventListener("pointerover",t=>t.stopPropagation()),document.addEventListener("pointerover",this.ClearHighlight)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pointerover",this.ClearHighlight)}renderPage(){return this._day=this._day.slice(0,3).toUpperCase()+" "+this._day.slice(-1),s`
            <timetable-row week="A"
                           .day1="${this.timetable.days["1"]}"
                           .day2="${this.timetable.days["2"]}"
                           .day3="${this.timetable.days["3"]}"
                           .day4="${this.timetable.days["4"]}"
                           .day5="${this.timetable.days["5"]}"
                           day="${this._day}">
            </timetable-row>
            <timetable-row week="B"
                           .day1="${this.timetable.days["6"]}"
                           .day2="${this.timetable.days["7"]}"
                           .day3="${this.timetable.days["8"]}"
                           .day4="${this.timetable.days["9"]}"
                           .day5="${this.timetable.days["10"]}"
                           day="${this._day}">
            </timetable-row>
            <timetable-row week="C"
                           .day1="${this.timetable.days["11"]}"
                           .day2="${this.timetable.days["12"]}"
                           .day3="${this.timetable.days["13"]}"
                           .day4="${this.timetable.days["14"]}"
                           .day5="${this.timetable.days["15"]}"
                           day="${this._day}">
            </timetable-row>
        `}};z.styles=[y,kt],e([u()],z.prototype,"timetable",2),e([u()],z.prototype,"_day",2),z=e([n("full-timetable")],z);Ct();async function Ct(){location.hash?$t(location.hash):h.NavigateTo({page:document.querySelector("main").children[0].id,extension:!1}),Q(),window.addEventListener("hashchange",()=>{location.hash&&$t(location.hash)});var r=await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");r?await r.update():await navigator.serviceWorker.register("dist/service-worker/service-worker.js",{scope:"/"});let l=sessionStorage.getItem("Last Reloaded"),t=Lt();if(l){let p=new Date(l);new Date().getTime()-p.getTime()>"3600"&&(_.FetchResources().then(t.remove.bind(t)),sessionStorage.setItem("Last Refreshed",new Date().toISOString()))}else _.FetchResources().then(t.remove.bind(t));var r=await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");r?await r.update():await navigator.serviceWorker.register("dist/service-worker/service-worker.js",{scope:"/"}),navigator.serviceWorker.addEventListener("message",p=>{p.data.command=="metadata-fetched"&&X()});let c=await navigator.serviceWorker.ready;if(c.periodicSync){if(!(await c.periodicSync.getTags()).includes("metadata-fetch"))try{await c.periodicSync.register("metadata-fetch",{minInterval:"2592000000"})}catch{console.log("Couldn't register background fetch. Updates will be only occur when app is open.")}}else console.log("Couldn't register background fetch. Updates will be only occur when app is open.");navigator.serviceWorker.controller?.postMessage({command:"metadata-fetch"})}function $t(l){let t=l.indexOf("extension-")==1,r="";t?r=decodeURIComponent(l.substring(11)):r=decodeURIComponent(l.substring(1)),h.NavigateTo({page:r,extension:t})}function Lt(){return h.ShowNotification("Updating resources...",!0)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
