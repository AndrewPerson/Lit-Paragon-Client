import{i as t,h as e,T as a,t as i,A as s,c as r}from"./default-css-22d073f2.js";const o=t`
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
        width: calc(var(--font-size) * 4);
        height: calc(var(--font-size) * 1.5);
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
            margin-top: 1.7vmax;
        }
    }
`,d=t`
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
        width: calc(var(--font-size) * 4);
        height: calc(var(--font-size) * 1.5);
        text-align: center;
        line-height: calc(var(--font-size) * 1.5);
    }

    @media (max-aspect-ratio: 3/4) {
        p {
            margin-top: 0.5vmax;
        }
    }
`,n=t`
    :host {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: calc(var(--font-size) * 4.5);
        min-width: 0;
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
`,h=t`
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
        height: calc(var(--font-size) * 1.5);
        line-height: calc(var(--font-size) * 1.5);

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    @media (max-aspect-ratio: 3/4) {
        .period-nums > p {
            margin-top: 0.5vmax;
        }
    }
`,m=t`
    :host {
        margin: auto;
        padding: 4vmin;
        max-width: 92%;
        min-width: 0;

        height: calc(calc(calc(calc(var(--font-size) / 1.2) + calc(var(--font-size) * 7.5)) + 4vmin) * 3);
    }

    @media (max-aspect-ratio: 3/4) {
        :host {
            height: calc(calc(calc(calc(calc(var(--font-size) / 1.2) + calc(var(--font-size) * 7.5)) + 4vmin) + 2.5vmax) * 3);
        }
    }

    timetable-row + timetable-row {
        border-top: solid grey 1px;
    }
`;class l extends e{static get styles(){return o}static get properties(){return{room:{type:String}}}constructor(){super(),this.room=""}render(){return a`
            <p>${this.room}</p>
        `}}class y extends e{static get styles(){return[i,d]}static get properties(){return{name:{type:String},room:{type:String}}}static highlighted="";static instances=[];static highlight(t){this.highlighted=t,this.instances.forEach((t=>t.update()))}constructor(){super(),y.instances.push(this),this.name="",this.room="",this.addEventListener("mouseover",(()=>y.highlight(this.name))),this.addEventListener("mouseleave",(()=>y.highlight("")))}render(){var t=y.highlighted==this.name&&this.name,e=this.nextElementSibling,i=e?.nextElementSibling,r=e?.getAttribute("name")==this.name||i?.getAttribute("name")==this.name;return a`
            <div>
                <p class="${t?"highlighted":""}">
                    ${this.name}
                </p>
                ${t?r?a`
                            <room-popup style="top: ${this.offsetTop-1.5*this.clientHeight-.5}px"
                                        room="${this.room}"
                                        class="reversed"
                                        @mouseover=${()=>y.highlight("")}>
                            </room-popup>
                        `:a`
                            <room-popup style="top: ${this.offsetTop+this.clientHeight+.5}px"
                                        room="${this.room}"
                                        @mouseover=${()=>y.highlight("")}>
                            </room-popup>
                        `:s}
            </div>
        `}}class c extends e{static get styles(){return[i,n]}static get properties(){return{name:{type:String},data:{type:Object},day:{type:String}}}constructor(){super(),this.name="",this.data={},this.day=""}render(){return a`
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
        `}}class p extends e{static get styles(){return[i,h]}static get properties(){return{week:{type:String},day1:{type:Object},day2:{type:Object},day3:{type:Object},day4:{type:Object},day5:{type:Object},day:{type:String}}}constructor(){super(),this.week="",this.day1={},this.day2={},this.day3={},this.day4={},this.day5={},this.day=""}render(){return a`
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
        `}}class g extends e{static get styles(){return[r,m]}static get properties(){return{data:{type:Object},day:{type:String}}}constructor(){super(),this.data={days:{}},this.day=""}render(){return this.hasAttribute("data")?(this.day=this.day.slice(0,3).toUpperCase()+" "+this.day.slice(-1),a`
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
        `):a`<loading-element style="width: 80%; margin: auto;"></loading-element>`}}customElements.define("room-popup",l),customElements.define("timetable-period",y),customElements.define("timetable-day",c),customElements.define("timetable-row",p),customElements.define("full-timetable",g);export{g as FullTimetable,l as RoomPopup,c as TimetableDay,y as TimetablePeriod,p as TimetableRow};
