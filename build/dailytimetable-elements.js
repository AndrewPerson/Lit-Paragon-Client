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
`,n=e`
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
`;class r extends t{static get styles(){return s}static get properties(){return{name:{type:String},time:{type:String}}}constructor(){super(),this.name="",this.time="00:00"}render(){return i`
            <p class="start">${this.name}</p>
            <p class="end">${this.time}</p>
        `}}class o extends t{static get styles(){return[s,n]}static get properties(){return{time:{type:String},timeChanged:{type:Boolean},name:{type:String},room:{type:String},roomChanged:{type:Boolean},teacher:{type:String},teacherChanged:{type:Boolean}}}constructor(){super(),this.time="",this.timeChanged=!1,this.name="",this.room="",this.roomChanged=!1,this.teacher="",this.teacherChanged=!1}render(){var e=this.timeChanged?"changed":"",t=this.teacherChanged?"changed":"",a=this.roomChanged?"changed":"";return i`
            <div>
                <p class="start">${this.name}</p>
                <p class="time">at <span class="${e}">${this.time}</span> with <span class="${t}">${this.teacher}</span></p>
            </div>
            
            <p class="end ${a}">${this.room}</p>
        `}}class m extends t{static get styles(){return l}static get properties(){return{data:{type:Object}}}getDate(e){var t=new Date(this.data.date),i=e.time.split(":"),a=Number.parseInt(i[0]),s=Number.parseInt(i[1]);return t.setHours(a),t.setMinutes(s),t}getNextBell(){var e=new Date;for(var t in this.data.bells){var i=this.data.bells[t],a=this.getDate(i);if(a>=e)return{bell:i,time:Math.round((a-e)/1e3)}}}secondsToString(e){var t=e%60,i=(e-t)/60%60,a=((e-t)/60-i)/60;a<10&&(a="0"+a),i<10&&(i="0"+i),t<10&&(t="0"+t);var s="";return"00"!==a&&(s+=a+":"),s+=i+":"+t}updateCountdown(){var e=this.getNextBell();e?(e.bell.bell in this.data.timetable.timetable.periods&&"R"!=e.bell.bell?this.nextBell=this.data.timetable.timetable.periods[e.bell.bell].title:this.nextBell=e.bell.bellDisplay,this.timeUntilNextBell=this.secondsToString(e.time)):m.gettingNextDay||(m.gettingNextDay=!0,this.data=null,this.update(),LoginIfNeeded().then((e=>{UpdateResourcesIfNeeded(e,!0).then((e=>{e&&location.reload()}))})))}static gettingNextDay=!1;constructor(){super(),this.nextBell="Nothing",this.timeUntilNextBell="00:00",setInterval((()=>{this.data&&(this.updateCountdown(),this.update())}),1e3),this.data={date:"",bells:[],timetable:{timetable:{periods:{}},subjects:{}},roomVariations:[],classVariations:[]}}render(){return this.data?(this.updateCountdown(),i`
            <p>${this.nextBell}</p>
            <p>in</p>

            <div class="timer-container">
                <span class="line-right"></span>
                <p id="timer">${this.timeUntilNextBell}</p>
                <span class="line-left"></span>
            </div>

            ${this.data.bells.map((e=>{var t=this.data.timetable.timetable.periods[e.bell];if(t){if("R"==e.bell)return a;var s=t.room,n=!1;if(e.bell in this.data.roomVariations){var l=this.data.roomVariations[e.bell];t.year==l.year&&(n=!0,s=l.roomTo)}var r=t.fullTeacher,o=!1;if(e.bell in this.data.classVariations){l=this.data.classVariations[e.bell];t.year==l.year&&(o=!0,r=l.casualSurname)}var m=this.data.timetable.subjects[`${t.year}${t.title}`].title;return m=m.split(" ").filter((e=>isNaN(e))).join(" "),i`
                                <payload-bell-item name="${m}"
                                                   time="${e.time}"
                                                   ?timechanged="${""!=e.reason}"
                                                   room="${s}"
                                                   ?roomChanged="${n}"
                                                   teacher="${""==r?"No one":r}"
                                                   ?teacherChanged="${o}">
                                </payload-bell-item>`}return"Transition"==e.bell||"End of Day"==e.bell?a:i`<bell-item name="${e.bellDisplay}" time="${e.time}"></bell-item>`}))}
        `):i`
                <loading-element style="width: 80%"></loading-element>
            `}}customElements.define("bell-item",r),customElements.define("payload-bell-item",o),customElements.define("daily-timetable",m);export{r as BellItem,m as DailyTimetable,o as PayloadBellItem};
