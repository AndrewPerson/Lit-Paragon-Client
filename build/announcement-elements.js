import{A as t,w as e,i,h as n,t as s,d as o,a as r,T as l,s as a,c}from"./default-css-2140c871.js";import{s as d,t as p,i as h,c as u}from"./repeat-11f113ac.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class m extends d{constructor(e){if(super(e),this.vt=t,e.type!==p.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(i){if(i===t)return this.Vt=void 0,this.vt=i;if(i===e)return i;if("string"!=typeof i)throw Error(this.constructor.directiveName+"() called with a non-string value");if(i===this.vt)return this.Vt;this.vt=i;const n=[i];return n.raw=n,this.Vt={_$litType$:this.constructor.resultType,strings:n,values:[]}}}m.directiveName="unsafeHTML",m.resultType=1;const g=h(m),v=i`
    :host {
        position: relative;
        margin-top: 2vmin;
        margin-bottom: 2vmin;
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
`,f=i`
    :host {
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        
        flex: 1;
        
        margin: 2vh 2%;

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
`;class y extends n{static get styles(){return[s,o,r,v]}static get properties(){return{title:{type:String},content:{type:String},displayYears:{type:String},author:{type:String},time:{type:String}}}toggle(){this.collapsed=!this.collapsed,this.update()}constructor(){super(),this.title="",this.content="",this.displayYears="",this.author="",this.time=null,this.collapsed=!0}render(){return l`
            <p class="title" @click="${this.toggle}">${this.title}</p>
            <p class="sub">For ${this.displayYears} ${this.time?"| At "+this.time+" ":""}| By ${this.author}</p>
            <blockquote id="content" class="content ${this.collapsed?"collapsed":"expanded"}">
                ${g(this.content)}
            </blockquote>
            <img @click="${this.toggle}" class="toggle" src="images/toggle.svg" />
        `}}class b extends n{static get styles(){return[s,a,c,f]}static get properties(){return{data:{type:Object}}}updateFilter(t){this.filter=t.target.value,this.update()}constructor(){super(),this.data={notices:[]},this.filter="all"}render(){if(!this.hasAttribute("data"))return l`<loading-element style="width: 80%; margin: auto;"></loading-element>`;if(0==this.data.notices.length)return l`
                <div class="header" style="min-width: unset; width: 80%; margin: 0 auto;">
                    <div class="line-right"></div>
                    <p>Nothing For Today</p>
                    <div class="line-left"></div>
                </div>
            `;var t=[];return t=(t="all"!=this.filter&&""!=this.filter?this.data.notices.filter((t=>t.years.includes(this.filter))):this.data.notices).sort(((t,e)=>e.relativeWeight-t.relativeWeight)),l`
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
                ${0==t.length?l`
                        <div style="align-self: center; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                            <p>Nothing For This Filter</p>
                        </div>
                    `:u(t,(t=>t.title),(t=>l`
                        <announcement-item title="${t.title}"
                                           content="${t.content}"
                                           displayYears="${t.displayYears}"
                                           author="${t.authorName}"
                                           time="${t.isMeeting?t.meetingTime:""}">
                        </announcement-item>
                    `))}
            </div>
        `}}customElements.define("announcement-item",y),customElements.define("school-announcements",b);export{y as AnnouncementItem,b as SchoolAnnouncements};
