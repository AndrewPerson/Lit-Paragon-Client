import{A as t,w as e,i,h as n,T as r}from"./lit-element-6ea6c272.js";import{s as o,t as s,i as a,c as l}from"./repeat-3881cae5.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class c extends o{constructor(e){if(super(e),this.vt=t,e.type!==s.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(i){if(i===t)return this.Vt=void 0,this.vt=i;if(i===e)return i;if("string"!=typeof i)throw Error(this.constructor.directiveName+"() called with a non-string value");if(i===this.vt)return this.Vt;this.vt=i;const n=[i];return n.raw=n,this.Vt={_$litType$:this.constructor.resultType,strings:n,values:[]}}}c.directiveName="unsafeHTML",c.resultType=1;const d=a(c),p=i`
    :host {
        position: relative;
        margin-top: 2vmin;
        margin-bottom: 2vmin;
    }

    p {
        margin: 0;
        margin-top: 1vmin;
        color: var(--text1);
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
        filter: invert(var(--img-invert));
    }
`,u=i`
    :host {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        margin: auto;
        flex: 0.96;
        width: 96%;
        height: 96vh;
        padding: 2vmin;
        background-color: var(--surface2);
        border-radius: 2vmin;
        box-shadow: var(--surface-shadow) 0 0 1vmin;
    }

    p {
        color: var(--text1);
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
        overflow-y: scroll;
        padding-right: 1vmin;
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

    select {
        border: solid rgb(82, 143, 255) 1px;
        background-color: var(--surface2);
        color: var(--text2);
        padding: 1vmin 0;
        padding-right: 6vmin;
        border-radius: 1vmin;
        max-width: max-content;
        font-size: calc(var(--font-size) / 1.2);
    }

    option {
        background-color: var(--surface2);
    }
`;class h extends n{static get styles(){return p}static get properties(){return{title:{type:String},content:{type:String},displayYears:{type:String},author:{type:String},time:{type:String}}}toggle(){this.collapsed=!this.collapsed,this.update()}constructor(){super(),this.title="",this.content="",this.displayYears="",this.author="",this.time=null,this.collapsed=!0}render(){return r`
            <p class="title" @click="${this.toggle}">${this.title}</p>
            <p class="sub">For ${this.displayYears} ${this.time?"| At "+this.time+" ":""}| By ${this.author}</p>
            <div id="content" class="content ${this.collapsed?"collapsed":"expanded"}">
                ${d(this.content)}
            </div>
            <img @click="${this.toggle}" class="toggle" src="images/toggle.svg" />
        `}}class m extends n{static get styles(){return u}static get properties(){return{data:{type:Object}}}updateFilter(t){this.filter=t.target.value,this.update()}constructor(){super(),this.data={notices:[]},this.filter="all"}render(){if(!this.data)return r`<loading-element style="width: 80%"></loading-element>`;if(0==this.data.notices.length)return r`
                <div class="header" style="min-width: unset; width: 80%; margin: 0 auto;">
                    <div class="line-right"></div>
                    <p>Nothing For Today</p>
                    <div class="line-left"></div>
                </div>
            `;var t=[];return t=(t="all"!=this.filter&&""!=this.filter?this.data.notices.filter((t=>t.years.includes(this.filter))):this.data.notices).sort(((t,e)=>e.relativeWeight-t.relativeWeight)),r`
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
                ${0==t.length?r`
                        <div style="align-self: center; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                            <p>Nothing For This Filter</p>
                        </div>
                    `:l(t,(t=>t.title),(t=>r`
                        <announcement-item title="${t.title}"
                                           content="${t.content}"
                                           displayYears="${t.displayYears}"
                                           author="${t.authorName}"
                                           time="${t.isMeeting?t.meetingTime:""}">
                        </announcement-item>
                    `))}
            </div>
        `}}customElements.define("announcement-item",h),customElements.define("announcement-container",m);export{m as AnnouncementContainer,h as AnnouncementItem};
