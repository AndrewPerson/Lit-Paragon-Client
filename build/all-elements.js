import{i as t,h as e,t as i,T as a,c as s,a as n,A as o,b as r,f as l,s as d,d as h,w as m,e as c,g as p,j as g,k as y,l as u}from"./main-elements-9e473c62.js";const v=t`
    :host {
        display: flex;
        align-items: center;
        width: 60%;
        margin-top: 0.5vmin;
        margin-bottom: 0.5vmin;
    }

    :host > * {
        display: inline-block;
    }

    .start {
        flex-grow: 4;
    }

    .end {
        flex-grow: 1;
        text-align: end;
    }

    .changed {
        color: var(--text2);
    }

    p {
        margin: 0;
        color: var(--text3);

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    style {
        display: none !important;
    }
`,f=t`
    :host {
        margin-top: 1.5vmin;
        margin-bottom: 1.5vmin;
    }

    .time {
        font-size: calc(var(--font-size) / 1.8);
    }

    p {
        color: var(--text1);
    }
`,b=t`
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        padding-top: 4vmin;
        padding-bottom: 4vmin;

        margin: auto;

        width: 60vw;
        max-width: 60vh;
        min-width: 300px;
        min-height: 70vh;
    }
    
    @media (max-width: 300px) {
        :host {
            width: 100vw;
            min-width: unset;
        }
    }

    #timer {
        font-size: calc(var(--font-size) * 2.5);
        display: inline-block;
    }

    .timer-container {
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: center
    }

    .line-right, .line-left {
        display: inline-block;
        flex: 1;
        border-bottom: 1px solid gray;
    }

    .line-right {
        margin-right: 10px;
    }

    .line-left {
        margin-left: 10px;
    }
`;customElements.define("bell-item",class extends e{static get styles(){return[i,v]}static get properties(){return{name:{type:String},time:{type:String}}}constructor(){super(),this.name="",this.time="00:00"}render(){return a`
            <p class="start">${this.name}</p>
            <p class="end">${this.time}</p>
        `}}),customElements.define("payload-bell-item",class extends e{static get styles(){return[i,v,f]}static get properties(){return{time:{type:String},timeChanged:{type:Boolean},name:{type:String},room:{type:String},roomChanged:{type:Boolean},teacher:{type:String},teacherChanged:{type:Boolean}}}constructor(){super(),this.time="",this.timeChanged=!1,this.name="",this.room="",this.roomChanged=!1,this.teacher="",this.teacherChanged=!1}render(){var t=this.timeChanged?"changed":"",e=this.teacherChanged?"changed":"",i=this.roomChanged?"changed":"";return a`
            <div>
                <p class="start">${this.name}</p>
                <p class="time">at <span class="${t}">${this.time}</span> with <span class="${e}">${this.teacher}</span></p>
            </div>
            
            <p class="end ${i}">${this.room}</p>
        `}}),customElements.define("daily-timetable",class extends e{static get styles(){return[i,s,b]}static get properties(){return{data:{type:Object}}}getDate(t){var e=new Date(this.data.date),i=t.time.split(":"),a=Number.parseInt(i[0]),s=Number.parseInt(i[1]);return e.setHours(a),e.setMinutes(s),e}getNextBell(){if(null!=this.data&&null!=this.data){var t=new Date;for(var e in this.data.bells){var i=this.data.bells[e],a=this.getDate(i);if(a>=t)return{bell:i,time:Math.round((a-t)/1e3)}}}}secondsToString(t){var e=t%60,i=(t-e)/60%60,a=((t-e)/60-i)/60;a<10&&(a="0"+a),i<10&&(i="0"+i),e<10&&(e="0"+e);var s="";return"00"!==a&&(s+=a+":"),s+=i+":"+e}updateCountdown(){if(this.hasAttribute("data")){var t=this.getNextBell();if(t){if(t.bell.bell in this.data.timetable.timetable.periods&&"R"!=t.bell.bell){var e=this.data.timetable.timetable.periods[t.bell.bell];this.nextBell=this.getClassName(e)}else this.nextBell=t.bell.bellDisplay;this.timeUntilNextBell=this.secondsToString(t.time)}else this.gettingNextDay||(this.gettingNextDay=!0,this.data=null,this.update(),LoginIfNeeded().then((t=>{UpdateResourcesIfNeeded(t,!0).then((t=>{t&&location.reload()}))})))}}getClassName(t){var e=this.data.timetable.subjects[`${t.year}${t.title}`].title;return this.formatClassName(e)}formatClassName(t){return t.split(" ").filter((t=>isNaN(t)&&t.length>1)).join(" ")}static gettingNextDay=!1;constructor(){super(),this.nextBell="Nothing",this.timeUntilNextBell="00:00",setInterval((()=>{this.data&&(this.updateCountdown(),this.update())}),1e3),this.data={date:"",bells:[],timetable:{timetable:{periods:{}},subjects:{}},roomVariations:[],classVariations:[]},this.gettingNextDay=!1}firstUpdated(){this.updateCountdown(),this.update()}render(){return this.hasAttribute("data")&&null!=this.data&&null!=this.data?a`
            <p>${this.nextBell}</p>
            <p>in</p>

            <div class="timer-container">
                <span class="line-right"></span>
                <p id="timer">${this.timeUntilNextBell}</p>
                <span class="line-left"></span>
            </div>

            ${n(this.data.bells,(t=>t.time),(t=>{var e=this.data.timetable.timetable.periods[t.bell];if(e){if("R"==t.bell)return o;var i=e.room,s=!1;if(t.bell in this.data.roomVariations){var n=this.data.roomVariations[t.bell];e.year==n.year&&(s=!0,i=n.roomTo)}var r=e.fullTeacher,l=!1;if(t.bell in this.data.classVariations){n=this.data.classVariations[t.bell];e.year==n.year&&(l=!0,r=n.casualSurname)}var d=this.getClassName(e);return a`
                                <payload-bell-item name="${d}"
                                                   time="${t.time}"
                                                   ?timechanged="${""!=t.reason}"
                                                   room="${i}"
                                                   ?roomChanged="${s}"
                                                   teacher="${""==r?"No one":r}"
                                                   ?teacherChanged="${l}">
                                </payload-bell-item>`}return"Transition"==t.bell||"End of Day"==t.bell?o:a`<bell-item name="${t.bellDisplay}" time="${t.time}"></bell-item>`}))}
        `:a`
                <loading-element style="width: 80%"></loading-element>
            `}});const x=t`
    :host {
        position: relative;

        display: flex;
        justify-content: center;
    }

    canvas {
        background-color: white;
        filter: contrast(5);
        transform: translate(10px, 10px);
        box-shadow: var(--shadow);
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
        box-shadow: var(--shadow);
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
`;customElements.define("student-barcode",class extends e{static get styles(){return[i,r,l,s,x]}static get properties(){return{data:{type:Object}}}ShowDescription(){this.shadowRoot.getElementById("descriptionContent").style.display=""}HideDescription(){this.shadowRoot.getElementById("descriptionContent").style.display="none"}GetPercentageFromPixels(t,e){return{x:(t-this.offsetLeft)/this.clientWidth*100,y:(e-this.offsetTop)/this.clientHeight*100}}GetPixelsFromPercentage(t,e){return{x:this.clientWidth*t/100+this.offsetLeft,y:this.clientHeight*e/100+this.offsetTop}}async RequestBarcodeSize(){var t,e,i,a,s=this.shadowRoot.getElementById("point1"),n=this.shadowRoot.getElementById("point2"),o=this.shadowRoot.getElementById("info"),r=this.shadowRoot.getElementById("barcode-canv");o.style.display="",r.style.display="none",s.style.display="none",n.style.display="none";var l=new Promise((o=>{var r=0;this.addEventListener("pointerdown",(l=>{if(1==++r){var{x:d,y:h}=this.GetPercentageFromPixels(l.clientX-10,l.clientY-10);t=d,e=h,s.style.left=`${d}%`,s.style.top=`${h}%`,s.style.display=""}else if(2==r){var{x:d,y:h}=this.GetPercentageFromPixels(l.clientX-10,l.clientY-10);i=d,a=h,n.style.left=`${d}%`,n.style.top=`${h}%`,n.style.display="",this.removeEventListener("pointerdown",this),o()}}))}));await l,localStorage.setItem("Barcode Size",`${t} ${e} ${i} ${a}`),o.style.display="none",r.style.display="",this.UpdateBarcodeSize()}UpdateBarcodeSize(){var t,e,i,a,s=this.shadowRoot.getElementById("point1"),n=this.shadowRoot.getElementById("point2"),o=this.shadowRoot.getElementById("barcode-canv"),r=parseFloat(s.style.left.replace("%","")),l=parseFloat(s.style.top.replace("%","")),d=parseFloat(n.style.left.replace("%","")),h=parseFloat(n.style.top.replace("%",""));r>d?(t=r,e=d):(t=d,e=r),l>h?(i=l,a=h):(i=h,a=l),o.style.top=`${a}%`,o.style.left=`${e}%`,o.style.width=t-e+"%",o.style.height=i-a+"%",JsBarcode(o,this.data.studentId,{displayValue:!1,margin:0})}async CreateBarcode(){var t,e,i,a,s=this.shadowRoot.getElementById("point1"),n=this.shadowRoot.getElementById("point2"),o=this.shadowRoot.getElementById("barcode-canv");o.imageSmoothingEnabled=!1;var r=localStorage.getItem("Barcode Size");if(r){var[t,i,e,a]=r.split(" ");s.style.left=`${t}%`,s.style.top=`${i}%`,n.style.left=`${e}%`,n.style.top=`${a}%`}else{var{x:l,y:d}=this.GetPixelsFromPercentage(80,10);({x:l,y:d}=this.GetPercentageFromPixels(l-10,d-10)),s.style.left=`${l}%`,s.style.top=`${d}%`,({x:l,y:d}=this.GetPixelsFromPercentage(20,30)),({x:l,y:d}=this.GetPercentageFromPixels(l-10,d-10)),n.style.left=`${l}%`,n.style.top=`${d}%`}this.UpdateBarcodeSize(),o.style.display="",s.style.display="",n.style.display=""}constructor(){super(),this.data={studentId:""},window.updateBarcode=()=>{this.CreateBarcode()}}updated(){this.CreateBarcode()}render(){return this.hasAttribute("data")?a`
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
        `:a`<loading-element style="width: 80%"></loading-element>`}});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class w extends d{constructor(t){if(super(t),this.vt=o,t.type!==h.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===o)return this.Vt=void 0,this.vt=t;if(t===m)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.vt)return this.Vt;this.vt=t;const e=[t];return e.raw=e,this.Vt={_$litType$:this.constructor.resultType,strings:e,values:[]}}}w.directiveName="unsafeHTML",w.resultType=1;const $=c(w),S=t`
    :host {
        position: relative;
        margin-top: 2vmin;
        margin-bottom: 2vmin;
    }

    h1, h2, h3, h4, h5, h6, p {
        user-select: auto;
        -ms-user-select: auto;
        -moz-user-select: auto;
        -webkit-user-select: auto;
    }

    p {
        margin: 0;
        margin-top: 1vmin;
    }

    .title {
        cursor: pointer;
    }

    .sub {
        font-size: calc(var(--font-size) / 1.5);
    }

    .collapsed {
        display: none;
    }

    .collapsed + .toggle {
        transform: rotate(180deg);
    }

    .expanded {
        display: block;
        margin-top: 4vmin;
    }

    .toggle {
        margin-top: 2vmin;

        position: absolute;
        top: 0;
        right: 0;

        width: 4vmin;

        cursor: pointer;
    }
`,k=t`
    :host {
        box-sizing: border-box;

        display: flex;
        flex-direction: column;

        padding: 2vmin;

        min-width: 0;
        min-height: 0;
    }

    .header {
        min-width: 100%;

        margin-top: 1vmin;
        margin-bottom: 1vmin;

        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .announcements {
        margin-top: 2vmin;

        display: flex;
        flex-direction: column;

        flex: 1;

        overflow-y: auto;

        padding-right: 1vmin;

        scrollbar-width: thin;
        scrollbar-color: var(--surface4) transparent;
    }

    .announcements::-webkit-scrollbar {
        width: 1vmin;
    }

    .announcements::-webkit-scrollbar-thumb {
        background-color: var(--surface4);
        border-radius: 1vmin;
    }

    .line-right, .line-left {
        display: inline-block;
        flex: 1;
        border-bottom: 1px solid gray;
    }

    .line-right {
        margin-right: 10px;
    }

    .line-left {
        margin-left: 10px;
    }
`;customElements.define("announcement-item",class extends e{static get styles(){return[i,p,r,S]}static get properties(){return{title:{type:String},content:{type:String},displayYears:{type:String},author:{type:String},time:{type:String}}}toggle(){this.collapsed=!this.collapsed,this.update()}constructor(){super(),this.title="",this.content="",this.displayYears="",this.author="",this.time=null,this.collapsed=!0}render(){return a`
            <p class="title" @click="${this.toggle}">${this.title}</p>
            <p class="sub">For ${this.displayYears} ${this.time?"| At "+this.time+" ":""}| By ${this.author}</p>
            <blockquote id="content" class="content ${this.collapsed?"collapsed":"expanded"}">
                ${$(this.content)}
            </blockquote>
            <img @click="${this.toggle}" class="toggle" src="images/toggle.svg" />
        `}}),customElements.define("school-announcements",class extends e{static get styles(){return[i,g,l,s,k]}static get properties(){return{data:{type:Object}}}updateFilter(t){this.filter=t.target.value,this.update()}constructor(){super(),this.data={notices:[]},this.filter="all"}render(){if(!this.hasAttribute("data"))return a`<loading-element style="width: 80%; margin: auto;"></loading-element>`;if(0==this.data.notices.length)return a`
                <div class="header" style="min-width: unset; width: 80%; margin: 0 auto;">
                    <div class="line-right"></div>
                    <p>Nothing For Today</p>
                    <div class="line-left"></div>
                </div>
            `;var t=[];return t=(t="all"!=this.filter&&""!=this.filter?this.data.notices.filter((t=>t.years.includes(this.filter))):this.data.notices).sort(((t,e)=>e.relativeWeight-t.relativeWeight)),a`
            <div class="header">
                <select id="filter" @input="${this.updateFilter}">
                    <option value="all">All</option>
                    <option value="Staff">Staff</option>
                    <option value="12">12</option>
                    <option value="11">11</option>
                    <option value="10">10</option>
                    <option value="9">9</option>
                    <option value="8">8</option>
                    <option value="7">7</option>
                </select>
            </div>
            <div class="announcements">
                ${0==t.length?a`
                        <div style="align-self: center; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                            <p>Nothing For This Filter</p>
                        </div>
                    `:n(t,(t=>t.title),(t=>a`
                        <announcement-item title="${t.title}"
                                           content="${t.content}"
                                           displayYears="${t.displayYears}"
                                           author="${t.authorName}"
                                           time="${t.isMeeting?t.meetingTime:""}">
                        </announcement-item>
                    `))}
            </div>
        `}});const E=t`
    :host {
        position: absolute;
        background-image: url(images/popup.svg);
        background-size: 100%;

        filter: hue-rotate(var(--hue-rotate));

        animation: appear 0.5s;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    :host(.reversed) {
        transform: rotate(180deg);
    }

    @media (max-aspect-ratio: 3/4) {
        :host(.reversed) {
            transform: translateY(1vmax) rotate(180deg);
        }
    }

    :host(.reversed) p {
        transform: rotate(180deg);
    }

    p {
        color: var(--text4);
        margin: 0;
        width: 10vmin;
        height: 3.9vmin;
        margin-top: 2vmin;
        text-align: center;
        line-height: calc(var(--font-size) * 1.5);
    }

    @keyframes appear {
        from {
            filter: opacity(0) hue-rotate(var(--hue-rotate));
            z-index: 100;
        }

        to {
            filter: opacity(1) hue-rotate(var(--hue-rotate));
            z-index: 100;
        }
    }

    @media (max-aspect-ratio: 3/4) {
        p {
            width: 8vmax;
            height: 3vmax;
            margin-top: 1.7vmax;
        }
    }
`,N=t`
    .highlighted {
        background-color: var(--surface4);
        color: var(--text4);
        border-radius: 1vmin;

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

    div {
        display: flex;
        justify-content: center;
    }

    p {
        width: 10vmin;
        height: 3.9vmin;
        text-align: center;
        line-height: calc(var(--font-size) * 1.5);
    }

    @media (max-aspect-ratio: 3/4) {
        p {
            width: 8vmax;
            height: 3vmax;
            margin-top: 0.5vmax;
        }
    }
`,B=t`
    :host {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 12vmin;
        min-width: 0;
    }

    @media (max-aspect-ratio: 3/4) {
        :host {
            width: 9vmax;
        }
    }

    .name {
        margin-bottom: 1vmin;
        text-align: center;
        font-size: calc(var(--font-size) / 1.2);
        width: calc(var(--font-size) * 3.63);
        color: var(--text3);
        border-bottom: solid grey 1px;
    }

    .highlighted {
        color: var(--text2);
    }
`,C=t`
    :host {
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
        padding-top: 1vmin;
        margin-bottom: 1vmin;
    }

    .period-nums {
        display: inline-flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .period-nums > p {
        color: var(--text3);
        height: 3.9vmin;
        line-height: calc(var(--font-size) * 1.5);

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
    }
`,I=t`
    :host {
        margin: auto;
        padding: 4vmin;
        max-width: 92%;
    }

    timetable-row + timetable-row {
        border-top: solid grey 1px;
    }
`;class O extends e{static get styles(){return[i,N]}static get properties(){return{name:{type:String},room:{type:String}}}static highlighted="";static instances=[];static highlight(t){this.highlighted=t,this.instances.forEach((t=>t.update()))}constructor(){super(),O.instances.push(this),this.name="",this.room="",this.addEventListener("mouseover",(()=>O.highlight(this.name))),this.addEventListener("mouseleave",(()=>O.highlight("")))}render(){var t=O.highlighted==this.name&&this.name,e=this.nextElementSibling,i=e?.nextElementSibling,s=e?.getAttribute("name")==this.name||i?.getAttribute("name")==this.name;return a`
            <div>
                <p class="${t?"highlighted":""}">
                    ${this.name}
                </p>
                ${t?s?a`
                            <room-popup style="top: ${this.offsetTop-1.5*this.clientHeight-.5}px"
                                        room="${this.room}"
                                        class="reversed"
                                        @mouseover=${()=>O.highlight("")}>
                            </room-popup>
                        `:a`
                            <room-popup style="top: ${this.offsetTop+this.clientHeight+.5}px"
                                        room="${this.room}"
                                        @mouseover=${()=>O.highlight("")}>
                            </room-popup>
                        `:o}
            </div>
        `}}customElements.define("room-popup",class extends e{static get styles(){return E}static get properties(){return{room:{type:String}}}constructor(){super(),this.room=""}render(){return a`
            <p>${this.room}</p>
        `}}),customElements.define("timetable-period",O),customElements.define("timetable-day",class extends e{static get styles(){return[i,B]}static get properties(){return{name:{type:String},data:{type:Object},day:{type:String}}}constructor(){super(),this.name="",this.data={},this.day=""}render(){return a`
            <p class="name ${this.day==this.name?"highlighted":""}">${this.name}</p>
            
            <timetable-period name="${this.data[1]?.title}"
                              room="${this.data[1]?.room}">
            </timetable-period>

            <timetable-period name="${this.data[2]?.title}"
                              room="${this.data[2]?.room}">
            </timetable-period>

            <timetable-period name="${this.data[3]?.title}"
                              room="${this.data[3]?.room}">
            </timetable-period>

            <timetable-period name="${this.data[4]?.title}"
                              room="${this.data[4]?.room}">
            </timetable-period>

            <timetable-period name="${this.data[5]?.title}"
                              room="${this.data[5]?.room}">
            </timetable-period>
        `}}),customElements.define("timetable-row",class extends e{static get styles(){return[i,C]}static get properties(){return{week:{type:String},day1:{type:Object},day2:{type:Object},day3:{type:Object},day4:{type:Object},day5:{type:Object},day:{type:String}}}constructor(){super(),this.week="",this.day1={},this.day2={},this.day3={},this.day4={},this.day5={},this.day=""}render(){return a`
            <div class="period-nums">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
            </div>

            <timetable-day name="MON ${this.week}"
                           data="${JSON.stringify(this.day1.periods)}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="TUE ${this.week}"
                           data="${JSON.stringify(this.day2.periods)}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="WED ${this.week}"
                           data="${JSON.stringify(this.day3.periods)}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="THU ${this.week}"
                           data="${JSON.stringify(this.day4.periods)}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="FRI ${this.week}"
                           data="${JSON.stringify(this.day5.periods)}"
                           day="${this.day}">
            </timetable-day>
        `}}),customElements.define("full-timetable",class extends e{static get styles(){return[s,I]}static get properties(){return{data:{type:Object},day:{type:String}}}constructor(){super(),this.data={days:{}},this.day=""}render(){return this.hasAttribute("data")?(this.day=this.day.slice(0,3).toUpperCase()+" "+this.day.slice(-1),a`
            <timetable-row week="A"
                           day1="${JSON.stringify(this.data.days[1])}"
                           day2="${JSON.stringify(this.data.days[2])}"
                           day3="${JSON.stringify(this.data.days[3])}"
                           day4="${JSON.stringify(this.data.days[4])}"
                           day5="${JSON.stringify(this.data.days[5])}"
                           day="${this.day}">
            </timetable-row>

            <timetable-row week="B"
                           day1="${JSON.stringify(this.data.days[6])}"
                           day2="${JSON.stringify(this.data.days[7])}"
                           day3="${JSON.stringify(this.data.days[8])}"
                           day4="${JSON.stringify(this.data.days[9])}"
                           day5="${JSON.stringify(this.data.days[10])}"
                           day="${this.day}">
            </timetable-row>

            <timetable-row week="C"
                           day1="${JSON.stringify(this.data.days[11])}"
                           day2="${JSON.stringify(this.data.days[12])}"
                           day3="${JSON.stringify(this.data.days[13])}"
                           day4="${JSON.stringify(this.data.days[14])}"
                           day5="${JSON.stringify(this.data.days[15])}"
                           day="${this.day}">
            </timetable-row>
        `):a`<loading-element style="width: 80%; margin: auto;"></loading-element>`}});const R=t`

`;customElements.define("pages-marketplace",class extends e{static get styles(){return[l,s,R]}static get properties(){return{data:{type:Object}}}constructor(){super(),this.data={}}render(){return a`
            <div></div>
        `}});const z=t`
    :host {
        position: relative;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    :host > * {
        z-index: 1;
    }

    #background {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        filter: blur(1vmin) opacity(0.3);
        z-index: 0;
    }

    #backgroundimg {
        position: absolute;
        filter: hue-rotate(var(--hue-rotate));
        height: 70vmin;
        transform: translateX(5vmin);
    }

    loading-element {
        width: 90vmin;
    }

    button {
        margin-bottom: 2vmin;
    }

    button > p {
        margin: 0;
    }

    input[type=range] {
        margin-top: 2vmin;
    }

    .mode {
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        padding: 1vmin;
    }

    #modeImg {
        width: calc(var(--font-size) * 2);
    }

    #description {
        z-index: 1;
        position: absolute;
        top: 1vmin;
        left: 1vmin;
        width: 4vmin;
    }

    #descriptionContent {
        z-index: 1;
        position: absolute;
        top: 7vmin;
        left: 1vmin;
        width: 40vmin;
        background-color: var(--surface2);
        padding: 2vmin;
        border-radius: 2vmin;
        box-shadow: var(--shadow);
    }
`;customElements.define("user-settings",class extends e{static get styles(){return[i,r,y,u,l,s,z]}ShowDescription(){this.shadowRoot.getElementById("descriptionContent").style.display="unset"}async ToggleDark(){window.isDark()?localStorage.setItem("Dark","false"):localStorage.setItem("Dark","true"),window.UpdateScreenType(),this.requestUpdate()}async Patch(){await caches.delete("Metadata"),await caches.delete("Offline Resources"),(await navigator.serviceWorker.ready).active.postMessage({command:"metadata-fetch"}),location.reload()}SetColour(){var t=document.getElementsByTagName("html")[0].style,e=this.shadowRoot.getElementById("hue").value;t.setProperty("--main-hue",e),t.setProperty("--hue-rotate",parseFloat(e)-200+"deg")}SaveColour(){localStorage.setItem("Hue",this.shadowRoot.getElementById("hue").value)}ResetColour(){this.shadowRoot.getElementById("hue").value="200",this.SetColour(),this.SaveColour()}createRenderRoot(){const t=super.createRenderRoot();return t.addEventListener("click",(t=>{var e=this.shadowRoot;t.target!=e.getElementById("description")&&(e.getElementById("descriptionContent").style.display="none")})),t}updated(){caches.open(window.METADATA_CACHE).then((async t=>{var e=await t.match("Metadata");if(e){var i=JSON.parse(await e.text());this.shadowRoot.getElementById("version").textContent=`Paragon v${i.version}`}})),this.shadowRoot.getElementById("hue").value=window.getHue().hue}render(){var t=window.isDark(),e=t?"images/sun.svg":"images/moon.svg";return a`
            <div id="background">
                <loading-element></loading-element>
                <img draggable="false" id="backgroundimg" src="${t?"images/logo-dark.svg":"images/logo.svg"}" />
            </div>

            <img draggable="false" @mousedown="${this.ShowDescription}" id="description" src="images/info.svg" />
    
            <p style="display: none;" id="descriptionContent">Paragon is written by <a href="https://github.com/AndrewPerson">Andrew Pye</a>.<br/>The source code is on <a href="https://github.com/AndrewPerson/Lit-Paragon-Client">Github</a>.</p>

            <button @click="${this.Patch}">Fix</button>
            
            <button class="mode" @click="${this.ToggleDark}">
                <img draggable="false" id="modeImg" src="${e}" />
            </button>
            
            <p id="version">Paragon v0</p>

            <button style="margin: 2vmin 0 0 0" @click="${this.ResetColour}">Reset Colour</button>

            <input type="range" id="hue" min="0" max="359" value="200" @input="${this.SetColour}" @change="${this.SaveColour}"/>            
        `}});
