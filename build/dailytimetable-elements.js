import{i as e,h as t,T as i,A as a}from"./lit-element-97c1479f.js";const s=e`
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
`,r=e`
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
`,l=e`
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        padding-top: 4vmin;
        padding-bottom: 4vmin;

        width: 60vw;
        max-width: 60vh;
        min-width: 300px;
        min-height: 70vh;

        background-color: var(--surface2);
        border-radius: 2vmin;
        box-shadow: var(--surface-shadow) 0 0 1vmin
    }
    
    @media (max-width: 300px) {
        :host {
            width: 100vw;
            min-width: unset;
        }
    }

    p {
        margin: 0;
        color: var(--text1);

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    #timer {
        margin: 0;
        font-size: calc(var(--font-size) * 2.5);
        display: inline-block;
        color: var(--text1);
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
`;class n extends t{static get styles(){return s}static get properties(){return{name:{type:String},time:{type:String}}}constructor(){super(),this.name="",this.time="00:00"}render(){return i`
            <p class="start">${this.name}</p>
            <p class="end">${this.time}</p>
        `}}class o extends t{static get styles(){return[s,r]}static get properties(){return{time:{type:String},name:{type:String},room:{type:String},roomChanged:{type:Boolean},teacher:{type:String},teacherChanged:{type:Boolean}}}constructor(){super(),this.time="",this.name="",this.room="",this.roomChanged=!1,this.teacher="",this.teacherChanged=!1}render(){var e=this.teacherChanged?"changed":"",t=this.roomChanged?"changed":"";return i`
            <div>
                <p class="start">${this.name}</p>
                <p class="time">at ${this.time} with <span class="${e}">${this.teacher}</span></p>
            </div>
            
            <p class="end ${t}">${this.room}</p>
        `}}class d extends t{static get styles(){return l}static get properties(){return{data:{type:Object,converter:e=>{var t=JSON.parse(e);if(!t?.timetable?.timetable?.periods?.[0])for(var i=0;i<t?.bells?.length;i++)if("0"==t.bells[i].period){t.bells.splice(i,1);break}return t}}}}getDate(e){var t=new Date(this.data.date),i=e.time.split(":"),a=Number.parseInt(i[0]),s=Number.parseInt(i[1]);return t.setHours(a),t.setMinutes(s),t}getNextBell(){var e=new Date;for(var t in this.data.bells){var i=this.data.bells[t],a=this.getDate(i);if(a>=e)return{bell:i,time:Math.round((a-e)/1e3)}}}secondsToString(e){var t=e%60,i=(e-t)/60%60,a=((e-t)/60-i)/60;a<10&&(a="0"+a),i<10&&(i="0"+i),t<10&&(t="0"+t);var s="";return"00"!=a&&(s+=a+":"),s+=i+":"+t}updateCountdown(){var e=this.getNextBell();e?(e.bell.bell in this.data.timetable.timetable.periods&&"RC"!=e.bell.bell?this.nextBell=this.data.timetable.timetable.periods[e.bell.bell].title:this.nextBell=e.bell.bellDisplay,this.timeUntilNextBell=this.secondsToString(e.time)):d.gettingNextDay||(d.gettingNextDay=!0,caches.open("User Resources").then((async e=>{this.setAttribute("data","null"),this.data=null,this.requestUpdate();var t=await LoginIfNeeded();if(await UpdateResourcesIfNeeded(t,!0)){var i=(await e.match("dailytimetable")).clone();this.setAttribute("data",await i.text())}})))}static gettingNextDay=!1;constructor(){super(),this.nextBell="Nothing",this.timeUntilNextBell="00:00",this.countdownId=setInterval((()=>{this.data&&(this.updateCountdown(),this.update())}),1e3),this.data={status:"",date:"",bells:[],timetable:{timetable:{periods:{}},subjects:{}},roomVariations:[],classVariations:[]}}firstUpdated(){this.data&&(this.updateCountdown(),this.update())}render(){return this.data?"OK"==this.data.status&&this.data.timetable&&this.data.timetable.timetable?i`
            <p>${this.nextBell}</p>
            <p>in</p>

            <div class="timer-container">
                <span class="line-right"></span>
                <p id="timer">${this.timeUntilNextBell}</p>
                <span class="line-left"></span>
            </div>

            ${this.data.bells.map((e=>{if("RC"==e.bell||"EoD"==e.bell)return a;var t=this.data.timetable.timetable.periods[e.bell];if(t){var s=t.room,r=!1;if(e.bell in this.data.roomVariations){var l=this.data.roomVariations[e.bell];t.year==l.year&&(r=!0,s=l.roomTo)}var n=t.fullTeacher,o=!1;if(e.bell in this.data.classVariations){l=this.data.classVariations[e.bell];t.year==l.year&&(o=!0,n=l.casualSurname||`${l.casual[3]} ${l.casual[0]}${l.casual.substring(1,3).toLowerCase()}`)}var d=this.data.timetable.subjects[`${t.year}${t.title}`].title;return d=d.split(" ").filter((e=>isNaN(e)&&e.length>1)).join(" "),i`
                            <payload-bell-item name="${d}"
                                                time="${e.time}"
                                                room="${s}"
                                                ?roomChanged="${r}"
                                                teacher="${""==n?"No one":n}"
                                                ?teacherChanged="${o}">
                            </payload-bell-item>`}return i`<bell-item name="${e.bellDisplay}" time="${e.time}"></bell-item>`}))}
        `:(clearInterval(this.countdownId),i`
                <p>
                    There is an error with the school servers.
                </p>
            `):i`
                <loading-element style="width: 80%"></loading-element>
            `}}customElements.define("bell-item",n),customElements.define("payload-bell-item",o),customElements.define("daily-timetable",d);export{n as BellItem,d as DailyTimetable,o as PayloadBellItem};
