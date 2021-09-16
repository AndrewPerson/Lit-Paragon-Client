import{i as t,h as e,t as i,T as a,c as s,A as n}from"./default-css-78eb0074.js";import{c as l}from"./repeat-9738f10a.js";const r=t`
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
`,o=t`
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
`,m=t`
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
`;class d extends e{static get styles(){return[i,r]}static get properties(){return{name:{type:String},time:{type:String}}}constructor(){super(),this.name="",this.time="00:00"}render(){return a`
            <p class="start">${this.name}</p>
            <p class="end">${this.time}</p>
        `}}class h extends e{static get styles(){return[i,r,o]}static get properties(){return{time:{type:String},timeChanged:{type:Boolean},name:{type:String},room:{type:String},roomChanged:{type:Boolean},teacher:{type:String},teacherChanged:{type:Boolean}}}constructor(){super(),this.time="",this.timeChanged=!1,this.name="",this.room="",this.roomChanged=!1,this.teacher="",this.teacherChanged=!1}render(){var t=this.timeChanged?"changed":"",e=this.teacherChanged?"changed":"",i=this.roomChanged?"changed":"";return a`
            <div>
                <p class="start">${this.name}</p>
                <p class="time">at <span class="${t}">${this.time}</span> with <span class="${e}">${this.teacher}</span></p>
            </div>
            
            <p class="end ${i}">${this.room}</p>
        `}}class p extends e{static get styles(){return[i,s,m]}static get properties(){return{data:{type:Object}}}getDate(t){var e=new Date(this.data.date),i=t.time.split(":"),a=Number.parseInt(i[0]),s=Number.parseInt(i[1]);return e.setHours(a),e.setMinutes(s),e}getNextBell(){if(null!=this.data&&null!=this.data){var t=new Date;for(var e in this.data.bells){var i=this.data.bells[e],a=this.getDate(i);if(a>=t)return{bell:i,time:Math.round((a-t)/1e3)}}}}secondsToString(t){var e=t%60,i=(t-e)/60%60,a=((t-e)/60-i)/60;a<10&&(a="0"+a),i<10&&(i="0"+i),e<10&&(e="0"+e);var s="";return"00"!==a&&(s+=a+":"),s+=i+":"+e}updateCountdown(){if(this.hasAttribute("data")){var t=this.getNextBell();if(t){if(t.bell.bell in this.data.timetable.timetable.periods&&"R"!=t.bell.bell){var e=this.data.timetable.timetable.periods[t.bell.bell];this.nextBell=this.getClassName(e)}else this.nextBell=t.bell.bellDisplay;this.timeUntilNextBell=this.secondsToString(t.time)}else p.gettingNextDay||(p.gettingNextDay=!0,this.data=null,this.update(),LoginIfNeeded().then((t=>{UpdateResourcesIfNeeded(t,!0).then((t=>{t&&location.reload()}))})))}}getClassName(t){var e=this.data.timetable.subjects[`${t.year}${t.title}`].title;return this.formatClassName(e)}formatClassName(t){return t.split(" ").filter((t=>isNaN(t)&&t.length>1)).join(" ")}static gettingNextDay=!1;constructor(){super(),this.nextBell="Nothing",this.timeUntilNextBell="00:00",setInterval((()=>{this.data&&(this.updateCountdown(),this.update())}),1e3),this.data={date:"",bells:[],timetable:{timetable:{periods:{}},subjects:{}},roomVariations:[],classVariations:[]}}firstUpdated(){this.updateCountdown(),this.update()}render(){return this.hasAttribute("data")&&null!=this.data&&null!=this.data?a`
            <p>${this.nextBell}</p>
            <p>in</p>

            <div class="timer-container">
                <span class="line-right"></span>
                <p id="timer">${this.timeUntilNextBell}</p>
                <span class="line-left"></span>
            </div>

            ${l(this.data.bells,(t=>t.time),(t=>{var e=this.data.timetable.timetable.periods[t.bell];if(e){if("R"==t.bell)return n;var i=e.room,s=!1;if(t.bell in this.data.roomVariations){var l=this.data.roomVariations[t.bell];e.year==l.year&&(s=!0,i=l.roomTo)}var r=e.fullTeacher,o=!1;if(t.bell in this.data.classVariations){l=this.data.classVariations[t.bell];e.year==l.year&&(o=!0,r=l.casualSurname)}var m=this.getClassName(e);return a`
                                <payload-bell-item name="${m}"
                                                   time="${t.time}"
                                                   ?timechanged="${""!=t.reason}"
                                                   room="${i}"
                                                   ?roomChanged="${s}"
                                                   teacher="${""==r?"No one":r}"
                                                   ?teacherChanged="${o}">
                                </payload-bell-item>`}return"Transition"==t.bell||"End of Day"==t.bell?n:a`<bell-item name="${t.bellDisplay}" time="${t.time}"></bell-item>`}))}
        `:a`
                <loading-element style="width: 80%"></loading-element>
            `}}customElements.define("bell-item",d),customElements.define("payload-bell-item",h),customElements.define("daily-timetable",p);export{d as BellItem,p as DailyTimetable,h as PayloadBellItem};
