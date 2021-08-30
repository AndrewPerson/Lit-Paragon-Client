import{i as t,h as e,T as i,A as a}from"./lit-element-97c1479f.js";const s=t`
    :host {
        position: absolute;
        background-image: url(images/popup.svg);
        background-size: 100%;

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
        line-height: calc(var(--font-size) * 1.5);
    }

    @keyframes appear {
        from {
            filter: opacity(0);
            z-index: 100;
        }

        to {
            filter: opacity(1);
            z-index: 100;
        }
    }

    p {
        color: var(--text4);
        margin: 0;
        width: 10vmin;
        height: 3.9vmin;
        margin-top: 2vmin;
        text-align: center;
        cursor: default;

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    @media (max-aspect-ratio: 3/4) {
        p {
            width: 8vmax;
            height: 3vmax;
            margin-top: 1.7vmax;
        }
    }
`,r=t`
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
        color: var(--text1);
        margin: 0;
        width: 10vmin;
        height: 3.9vmin;
        text-align: center;
        line-height: calc(var(--font-size) * 1.5);
        cursor: default;

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    @media (max-aspect-ratio: 3/4) {
        p {
            width: 8vmax;
            height: 3vmax;
            margin-top: 0.5vmax;
        }
    }
`,n=t`
    :host {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 12vmin;
    }

    @media (max-aspect-ratio: 3/4) {
        :host {
            width: 9vmax;
        }
    }

    .name {
        margin: 0;
        margin-bottom: 1vmin;
        text-align: center;
        font-size: calc(var(--font-size) / 1.2);
        width: calc(var(--font-size) * 3.63);
        color: var(--text3);
        border-bottom: solid grey 1px;

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    .highlighted {
        color: var(--text2);
    }
`,o=t`
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
        margin: 0;
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
`,d=t`
    :host {
        padding: 4vmin;
        background-color: var(--surface2);
        border-radius: 2vmin;
        box-shadow: var(--surface-shadow) 0 0 1vmin;
    }

    timetable-row + timetable-row {
        border-top: solid grey 1px;
    }
`;class m extends e{static get styles(){return s}static get properties(){return{room:{type:String}}}constructor(){super(),this.room=""}render(){return i`
            <p>${this.room}</p>
        `}}class h extends e{static get styles(){return r}static get properties(){return{name:{type:String},room:{type:String}}}static highlighted="";static instances=[];static highlight(t){this.highlighted=t,this.instances.forEach((t=>t.update()))}constructor(){super(),h.instances.push(this),this.name="",this.room="",this.addEventListener("mouseover",(()=>h.highlight(this.name))),this.addEventListener("mouseleave",(()=>h.highlight("")))}render(){var t=h.highlighted==this.name&&this.name,e=this.nextElementSibling,s=e?.nextElementSibling,r=e?.getAttribute("name")==this.name||s?.getAttribute("name")==this.name;return i`
            <div>
                <p class="${t?"highlighted":""}">
                    ${this.name}
                </p>
                ${t?r?i`
                            <room-popup style="top: ${this.offsetTop-1.5*this.clientHeight-.5}px"
                                        room="${this.room}"
                                        class="reversed"
                                        @mouseover=${()=>h.highlight("")}>
                            </room-popup>
                        `:i`
                            <room-popup style="top: ${this.offsetTop+this.clientHeight+.5}px"
                                        room="${this.room}"
                                        @mouseover=${()=>h.highlight("")}>
                            </room-popup>
                        `:a}
            </div>
        `}}class l extends e{static get styles(){return n}static get properties(){return{name:{type:String},data:{type:Object},day:{type:String}}}constructor(){super(),this.name="",this.data={},this.day=""}render(){return i`
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
        `}}class y extends e{static get styles(){return o}static get properties(){return{week:{type:String},day1:{type:Object},day2:{type:Object},day3:{type:Object},day4:{type:Object},day5:{type:Object},day:{type:String}}}constructor(){super(),this.week="",this.day1={},this.day2={},this.day3={},this.day4={},this.day5={},this.day=""}render(){return i`
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
        `}}class p extends e{static get styles(){return d}static get properties(){return{data:{type:Object},day:{type:String}}}constructor(){super(),this.data={days:{}},this.day=""}render(){return this.data?(this.day=this.day.slice(0,3).toUpperCase()+" "+this.day.slice(-1),i`
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
        `):i`<loading-element style="width: 80%"></loading-element>`}}customElements.define("room-popup",m),customElements.define("timetable-period",h),customElements.define("timetable-day",l),customElements.define("timetable-row",y),customElements.define("full-timetable",p);export{p as FullTimetable,m as RoomPopup,l as TimetableDay,h as TimetablePeriod,y as TimetableRow};
