/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol();class i{constructor(t,i){if(i!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return t&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const n=new Map,o=t=>{let o=n.get(t);return void 0===o&&n.set(t,o=new i(t,e)),o},a=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,n,o)=>e+(t=>{if(t instanceof i)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[o+1]),t[0]);return o(n)},r=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>o("string"==typeof t?t:t+""))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var s,l,d,h;const c={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},u=(t,e)=>e!==t&&(e==e||t==t),p={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:u};class g extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u()}static addInitializer(t){var e;null!==(e=this.v)&&void 0!==e||(this.v=[]),this.v.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const n=this.Πp(i,e);void 0!==n&&(this.Πm.set(n,i),t.push(n))})),t}static createProperty(t,e=p){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const o=this[t];this[e]=n,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static Πp(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this.ΠU)&&void 0!==e?e:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this.ΠU)||void 0===e||e.splice(this.ΠU.indexOf(t)>>>0,1)}Π_(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this.Πi.set(e,this[e]),delete this[e])}))}createRenderRoot(){var e;const i=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{t?e.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((t=>{const i=document.createElement("style");i.textContent=t.cssText,e.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0)}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})),this.Πo=new Promise((t=>this.Πl=t))}attributeChangedCallback(t,e,i){this.K(t,i)}Πj(t,e,i=p){var n,o;const a=this.constructor.Πp(t,i);if(void 0!==a&&!0===i.reflect){const r=(null!==(o=null===(n=i.converter)||void 0===n?void 0:n.toAttribute)&&void 0!==o?o:c.toAttribute)(e,i.type);this.Πh=t,null==r?this.removeAttribute(a):this.setAttribute(a,r),this.Πh=null}}K(t,e){var i,n,o;const a=this.constructor,r=a.Πm.get(t);if(void 0!==r&&this.Πh!==r){const t=a.getPropertyOptions(r),s=t.converter,l=null!==(o=null!==(n=null===(i=s)||void 0===i?void 0:i.fromAttribute)&&void 0!==n?n:"function"==typeof s?s:null)&&void 0!==o?o:c.fromAttribute;this.Πh=r,this[r]=l(e,t.type),this.Πh=null}}requestUpdate(t,e,i){let n=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this.L.has(t)||this.L.set(t,e),!0===i.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,i))):n=!1),!this.isUpdatePending&&n&&(this.Πg=this.Πq())}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo}catch(t){Promise.reject(t)}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,e)=>this[e]=t)),this.Πi=void 0);let e=!1;const i=this.L;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this.Π$()}catch(t){throw e=!1,this.Π$(),t}e&&this.E(i)}willUpdate(t){}E(t){var e;null===(e=this.ΠU)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}Π$(){this.L=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return!0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,e)=>this.Πj(e,this[e],t))),this.Πk=void 0),this.Π$()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var m,v,f,b;g.finalized=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null===(l=(s=globalThis).reactiveElementPlatformSupport)||void 0===l||l.call(s,{ReactiveElement:g}),(null!==(d=(h=globalThis).reactiveElementVersions)&&void 0!==d?d:h.reactiveElementVersions=[]).push("1.0.0-rc.2");const y=globalThis.trustedTypes,w=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,x=`lit$${(Math.random()+"").slice(9)}$`,S="?"+x,E=`<${S}>`,C=document,$=(t="")=>C.createComment(t),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,k=Array.isArray,D=t=>{var e;return k(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])},N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,I=/>/g,A=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,P=/'/g,_=/"/g,R=/^(?:script|style|textarea)$/i,z=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),H=new WeakMap,U=C.createTreeWalker(C,129,null,!1),j=(t,e)=>{const i=t.length-1,n=[];let o,a=2===e?"<svg>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let s,l,d=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===N?"!--"===l[1]?r=O:void 0!==l[1]?r=I:void 0!==l[2]?(R.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=A):void 0!==l[3]&&(r=A):r===A?">"===l[0]?(r=null!=o?o:N,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,s=l[1],r=void 0===l[3]?A:'"'===l[3]?_:P):r===_||r===P?r=A:r===O||r===I?r=N:(r=A,o=void 0);const c=r===A&&t[e+1].startsWith("/>")?" ":"";a+=r===N?i+E:d>=0?(n.push(s),i.slice(0,d)+"$lit$"+i.slice(d)+x+c):i+x+(-2===d?(n.push(void 0),e):c)}const s=a+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==w?w.createHTML(s):s,n]};class L{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let o=0,a=0;const r=t.length-1,s=this.parts,[l,d]=j(t,e);if(this.el=L.createElement(l,i),U.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=U.nextNode())&&s.length<r;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(x)){const i=d[a++];if(t.push(e),void 0!==i){const t=n.getAttribute(i.toLowerCase()+"$lit$").split(x),e=/([.?@])?(.*)/.exec(i);s.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?J:"?"===e[1]?V:"@"===e[1]?q:W})}else s.push({type:6,index:o})}for(const e of t)n.removeAttribute(e)}if(R.test(n.tagName)){const t=n.textContent.split(x),e=t.length-1;if(e>0){n.textContent=y?y.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],$()),U.nextNode(),s.push({type:2,index:++o});n.append(t[e],$())}}}else if(8===n.nodeType)if(n.data===S)s.push({type:2,index:o});else{let t=-1;for(;-1!==(t=n.data.indexOf(x,t+1));)s.push({type:7,index:o}),t+=x.length-1}o++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,n){var o,a,r,s;if(e===B)return e;let l=void 0!==n?null===(o=i.Σi)||void 0===o?void 0:o[n]:i.Σo;const d=T(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(a=null==l?void 0:l.O)||void 0===a||a.call(l,!1),void 0===d?l=void 0:(l=new d(t),l.T(t,i,n)),void 0!==n?(null!==(r=(s=i).Σi)&&void 0!==r?r:s.Σi=[])[n]=l:i.Σo=l),void 0!==l&&(e=Y(t,l.S(t,e.values),l,n)),e}class F{constructor(t,e){this.l=[],this.N=void 0,this.D=t,this.M=e}u(t){var e;const{el:{content:i},parts:n}=this.D,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:C).importNode(i,!0);U.currentNode=o;let a=U.nextNode(),r=0,s=0,l=n[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new X(a,a.nextSibling,this,t):1===l.type?e=new l.ctor(a,l.name,l.strings,this,t):6===l.type&&(e=new G(a,this,t)),this.l.push(e),l=n[++s]}r!==(null==l?void 0:l.index)&&(a=U.nextNode(),r++)}return o}v(t){let e=0;for(const i of this.l)void 0!==i&&(void 0!==i.strings?(i.I(t,i,e),e+=i.strings.length-2):i.I(t[e])),e++}}class X{constructor(t,e,i,n){this.type=2,this.N=void 0,this.A=t,this.B=e,this.M=i,this.options=n}setConnected(t){var e;null===(e=this.P)||void 0===e||e.call(this,t)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,e=this){t=Y(this,t,e),T(t)?t===M||null==t||""===t?(this.H!==M&&this.R(),this.H=M):t!==this.H&&t!==B&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):D(t)?this.g(t):this.m(t)}k(t,e=this.B){return this.A.parentNode.insertBefore(t,e)}$(t){this.H!==t&&(this.R(),this.H=this.k(t))}m(t){const e=this.A.nextSibling;null!==e&&3===e.nodeType&&(null===this.B?null===e.nextSibling:e===this.B.previousSibling)?e.data=t:this.$(C.createTextNode(t)),this.H=t}_(t){var e;const{values:i,_$litType$:n}=t,o="number"==typeof n?this.C(t):(void 0===n.el&&(n.el=L.createElement(n.h,this.options)),n);if((null===(e=this.H)||void 0===e?void 0:e.D)===o)this.H.v(i);else{const t=new F(o,this),e=t.u(this.options);t.v(i),this.$(e),this.H=t}}C(t){let e=H.get(t.strings);return void 0===e&&H.set(t.strings,e=new L(t)),e}g(t){k(this.H)||(this.H=[],this.R());const e=this.H;let i,n=0;for(const o of t)n===e.length?e.push(i=new X(this.k($()),this.k($()),this,this.options)):i=e[n],i.I(o),n++;n<e.length&&(this.R(i&&i.B.nextSibling,n),e.length=n)}R(t=this.A.nextSibling,e){var i;for(null===(i=this.P)||void 0===i||i.call(this,!1,!0,e);t&&t!==this.B;){const e=t.nextSibling;t.remove(),t=e}}}class W{constructor(t,e,i,n,o){this.type=1,this.H=M,this.N=void 0,this.V=void 0,this.element=t,this.name=e,this.M=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this.H=Array(i.length-1).fill(M),this.strings=i):this.H=M}get tagName(){return this.element.tagName}I(t,e=this,i,n){const o=this.strings;let a=!1;if(void 0===o)t=Y(this,t,e,0),a=!T(t)||t!==this.H&&t!==B,a&&(this.H=t);else{const n=t;let r,s;for(t=o[0],r=0;r<o.length-1;r++)s=Y(this,n[i+r],e,r),s===B&&(s=this.H[r]),a||(a=!T(s)||s!==this.H[r]),s===M?t=M:t!==M&&(t+=(null!=s?s:"")+o[r+1]),this.H[r]=s}a&&!n&&this.W(t)}W(t){t===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class J extends W{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===M?void 0:t}}class V extends W{constructor(){super(...arguments),this.type=4}W(t){t&&t!==M?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class q extends W{constructor(){super(...arguments),this.type=5}I(t,e=this){var i;if((t=null!==(i=Y(this,t,e,0))&&void 0!==i?i:M)===B)return;const n=this.H,o=t===M&&n!==M||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,a=t!==M&&(n===M||o);o&&this.element.removeEventListener(this.name,this,n),a&&this.element.addEventListener(this.name,this,t),this.H=t}handleEvent(t){var e,i;"function"==typeof this.H?this.H.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this.H.handleEvent(t)}}class G{constructor(t,e,i){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=e,this.options=i}I(t){Y(this,t)}}const Z={Z:"$lit$",U:x,Y:S,q:1,X:j,tt:F,it:D,st:Y,et:X,ot:W,nt:V,rt:q,lt:J,ht:G};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var K,Q,tt,et,it,nt;null===(v=(m=globalThis).litHtmlPlatformSupport)||void 0===v||v.call(m,L,X),(null!==(f=(b=globalThis).litHtmlVersions)&&void 0!==f?f:b.litHtmlVersions=[]).push("2.0.0-rc.3"),(null!==(K=(nt=globalThis).litElementVersions)&&void 0!==K?K:nt.litElementVersions=[]).push("3.0.0-rc.2");class ot extends g{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();super.update(t),this.Φt=((t,e,i)=>{var n,o;const a=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:e;let r=a._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;a._$litPart$=r=new X(e.insertBefore($(),t),t,void 0,i)}return r.I(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1)}render(){return B}}ot.finalized=!0,ot._$litElement$=!0,null===(tt=(Q=globalThis).litElementHydrateSupport)||void 0===tt||tt.call(Q,{LitElement:ot}),null===(it=(et=globalThis).litElementPlatformSupport)||void 0===it||it.call(et,{LitElement:ot});const at=a`
    :host {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .spinner {
        width: inherit;
        animation: 3s infinite spin;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
`,rt=a`
    :host {
        position: absolute;
        top: 1%;
        right: 1%;
        min-width: min-content;
        width: 40vmin;
        padding: 2%;
        z-index: 100;
    }

    p {
        text-align: center;
        margin: var(--font-size);
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }

    .dismiss {
        margin-left: 1vmin;
    }
`,st=a`
    :host {
        box-shadow: var(--shadow);
        background-color: var(--surface2);
        border-radius: 2vmin;
    }
`,lt=a`
    :host {
        flex: 1;
        margin: 2%;
    }

    /*
        312px is 104% of 300px.
        We use 104% because that includes the margin,
        which is 2% either side.
    */
    @media (max-width: 312px) {
        :host {
            margin: 2% calc(50% - 150px);
        }
    }

    @media (max-width: 300px) {
        :host {
            margin: 2% 0;
        }
    }
`,dt=a`
    :where(img) {
        filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
        cursor: default;

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }
`,ht=a`
    :where(h1, h2, h3, h4, h5, h6, p, li) {
        margin: 0;
    }

    :where(*) {
        font-weight: 400;
        color: var(--text1);
        cursor: default;
        font-size: var(--font-size);

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    :where(b, strong) {
        font-weight: 600;
    }

    :where(a) {
        color: var(--text2);
        text-decoration: none;
        cursor: pointer;
    }
`,ct=a`
    :where(button) {
        border: solid 0.2vmin var(--surface4);
        background-color: var(--surface2);
        color: var(--text2);
        padding: 1vmin 2vmin;
        border-radius: calc(var(--font-size) / 2.5);
        box-shadow: var(--small-shadow);
        font-size: var(--font-size);
    }

    :where(button:hover) {
        background-color: var(--surface3);
        color: var(--text2);
    }

    :where(button:active) {
        border: solid 0.2vmin transparent;
        color: var(--text4);
        text-shadow: 0.2vmin 0.2vmin var(--shadow-colour);
        background-color: var(--surface4);
    }
`,ut=a`
    :where(input[type=range]) {
        appearance: none;
        width: calc(var(--font-size) * 7);
        background-color: var(--surface1);
        height: calc(var(--font-size) / 1.5);
        box-shadow: var(--small-shadow);
        border-radius: calc(var(--font-size) / 2.5);
    }

    :where(input[type=range])::-moz-range-thumb {
        -webkit-appearance: none;
        background-color: var(--surface4);
        border-radius: 100%;
        width: calc(var(--font-size) / 1.5);
        height: calc(var(--font-size) / 1.5);
        border: none;
        box-shadow: var(--small-shadow);
    }

    :where(input[type=range])::-webkit-slider-thumb {
        -webkit-appearance: none;
        background-color: var(--surface4);
        border-radius: 100%;
        width: calc(var(--font-size) / 1.5);
        height: calc(var(--font-size) / 1.5);
        border: none;
        box-shadow: var(--small-shadow);
    }
`,pt=a`
    :where(blockquote) {
        border-left: calc(var(--font-size) / 2) solid var(--surface4);
        margin: 0;
        padding-left: calc(var(--font-size) / 4 * 3);
    }
`,gt=a`
    :where(select) {
        border: 0.2vmin solid var(--text2);
        background-color: var(--surface2);
        color: var(--text2);

        padding: 1vmin 0;
        padding-right: 6vmin;

        border-radius: 1vmin;

        font-size: calc(var(--font-size) / 1.2);

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    :where(option) {
        background-color: var(--surface2);
    }
`,mt=a`
    :where(input[type=search]) {
        border: none;
        border-bottom: 0.2vmin solid var(--text2);
        background-color: var(--surface2);
        color: var(--text1);
        font-size: var(--font-size);
        font-family: monospace;
        height: calc(var(--font-size) * 2);
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
    }
`;customElements.define("loading-element",class extends ot{static get styles(){return at}render(){return z`
            <img draggable="false" class="spinner" src="images/rings.svg" />
        `}}),customElements.define("login-notification",class extends ot{static get styles(){return[st,ht,ct,rt]}async login(){await caches.delete(window.RESOURCE_CACHE),location.pathname="login"}constructor(){super()}render(){return z`
            <p>You need to log in to view the latest information.</p>

            <div class="buttons">
                <button @click=${this.login}>
                    Login
                </button>
                <button @click=${()=>this.remove()} class="dismiss">
                    Dismiss
                </button>
            </div>
        `}});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vt=2,ft=t=>(...e)=>({_$litDirective$:t,values:e});class bt{constructor(t){}T(t,e,i){this.Σdt=t,this.M=e,this.Σct=i}S(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{et:yt}=Z,wt=()=>document.createComment(""),xt=(t,e,i)=>{var n;const o=t.A.parentNode,a=void 0===e?t.B:e.A;if(void 0===i){const e=o.insertBefore(wt(),a),n=o.insertBefore(wt(),a);i=new yt(e,n,t,t.options)}else{const e=i.B.nextSibling,r=i.M!==t;if(r&&(null===(n=i.Q)||void 0===n||n.call(i,t),i.M=t),e!==a||r){let t=i.A;for(;t!==e;){const e=t.nextSibling;o.insertBefore(t,a),t=e}}}return i},St=(t,e,i=t)=>(t.I(e,i),t),Et={},Ct=(t,e=Et)=>t.H=e,$t=t=>{var e;null===(e=t.P)||void 0===e||e.call(t,!1,!0);let i=t.A;const n=t.B.nextSibling;for(;i!==n;){const t=i.nextSibling;i.remove(),i=t}},Tt=(t,e,i)=>{const n=new Map;for(let o=e;o<=i;o++)n.set(t[o],o);return n},kt=ft(class extends bt{constructor(t){if(super(t),t.type!==vt)throw Error("repeat() can only be used in text expressions")}Mt(t,e,i){let n;void 0===i?i=e:void 0!==e&&(n=e);const o=[],a=[];let r=0;for(const e of t)o[r]=n?n(e,r):r,a[r]=i(e,r),r++;return{values:a,keys:o}}render(t,e,i){return this.Mt(t,e,i).values}update(t,[e,i,n]){var o;const a=(t=>t.H)(t),{values:r,keys:s}=this.Mt(e,i,n);if(!a)return this.Pt=s,r;const l=null!==(o=this.Pt)&&void 0!==o?o:this.Pt=[],d=[];let h,c,u=0,p=a.length-1,g=0,m=r.length-1;for(;u<=p&&g<=m;)if(null===a[u])u++;else if(null===a[p])p--;else if(l[u]===s[g])d[g]=St(a[u],r[g]),u++,g++;else if(l[p]===s[m])d[m]=St(a[p],r[m]),p--,m--;else if(l[u]===s[m])d[m]=St(a[u],r[m]),xt(t,d[m+1],a[u]),u++,m--;else if(l[p]===s[g])d[g]=St(a[p],r[g]),xt(t,a[u],a[p]),p--,g++;else if(void 0===h&&(h=Tt(s,g,m),c=Tt(l,u,p)),h.has(l[u]))if(h.has(l[p])){const e=c.get(s[g]),i=void 0!==e?a[e]:null;if(null===i){const e=xt(t,a[u]);St(e,r[g]),d[g]=e}else d[g]=St(i,r[g]),xt(t,a[u],i),a[e]=null;g++}else $t(a[p]),p--;else $t(a[u]),u++;for(;g<=m;){const e=xt(t,d[m+1]);St(e,r[g]),d[g++]=e}for(;u<=p;){const t=a[u++];null!==t&&$t(t)}return this.Pt=s,Ct(t,d),B}}),Dt=a`
    :host {
        display: inline-block;
        width: 12vmin;
        height: 12vmin;
        position: relative;
        border-radius: 2vmin;
        overflow: hidden;
    }

    :host(:hover:not(:host([editing]))) {
        background-color: var(--surface2);
        box-shadow: var(--shadow-colour) calc(var(--shadow-x) / 2) calc(var(--shadow-y) / 2) var(--shadow-spread);
    }

    #handle {
        --size: 2vmin;
        --padding: 2vmin;

        --full-size: calc(calc(var(--padding) * 2) + var(--size));

        position: absolute;
        top: calc(50% - calc(var(--full-size) / 2));
        left: calc(calc(calc(3.3vmin - var(--size)) / 2) - var(--padding));

        display: block;
        
        height: var(--full-size);

        padding: var(--padding);

        box-sizing: border-box;

        cursor: move;
    }

    :host(.selected) {
        background-color: var(--surface4) !important;
        box-shadow: var(--shadow-colour) calc(var(--shadow-x) / 2) calc(var(--shadow-y) / 2) var(--shadow-spread);
    }

    :host(.drag) {
        background-color: var(--surface4) !important;
        border-radius: 2vmin !important;
        box-shadow: none !important;
    }

    a {
        display: block;

        width: 12vmin;
        height: 12vmin;
    }

    ::slotted(img) {
        padding: 3.3vmin;
        width: 5.4vmin;
        filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
    }
`,Nt=a`
    :host {
        flex-shrink: 0;

        background-color: var(--surface3);
        box-shadow: var(--small-shadow);
        
        overflow: hidden;

        box-sizing: border-box;

        z-index: 100;
    }

    #items-container {
        display: flex;
        align-items: flex-start;
        flex-wrap: nowrap;
        
        width: 100%;
        height: 100%;
    
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
    }

    @media not all and (max-aspect-ratio: 1/1) {
        :host {
            width: 12vmin;
            height: 100%;

            padding-bottom: 12vmin;

            border-radius: 0 2vmin 2vmin 0;
        }

        #items-container {
            flex-direction: column;
            justify-content: flex-start;

            overflow-x: hidden;
            overflow-y: auto;
        }

        nav-item:last-of-type {
            position: absolute;
            left: 0;
            bottom: 0;
            border-radius: 0 0 2vmin 0;
        }
    }

    @media (max-aspect-ratio: 1/1) {
        :host {
            order: 100;

            width: 100%;
            height: 12vmin;

            border-radius: 2vmin 2vmin 0 0;
        }

        #items-container {
            flex-direction: row;
            justify-content: space-around;

            overflow-x: auto;
            overflow-y: hidden;
        }
    }

    #items-container:hover, #items-container.hover {
        scrollbar-color: var(--text3) transparent;
    }

    #items-container::-webkit-scrollbar {
        width: 1vmin;
        height: 1vmin;
        display: none;
    }

    #items-container:hover::-webkit-scrollbar,
    #items-container.hover::-webkit-scrollbar {
        display: unset;
    }

    #items-container::-webkit-scrollbar-thumb {
        background-color: var(--text3);
    }

    #items-container::-webkit-scrollbar-track {
        background-color: transparent;
    }

    #top-shadow,
    #bottom-shadow,
    #left-shadow,
    #right-shadow {
        position: absolute;
        background-image: linear-gradient(var(--angle), var(--shadow-colour), transparent);
        z-index: 98;
    }

    #top-shadow,
    #bottom-shadow {
        width: 12vmin;
        height: 2vmin;
        left: 0;
    }

    #top-shadow {
        border-radius: 0 2vmin 0 0;
        top: 0;
        --angle: 180deg;
    }

    #bottom-shadow {
        bottom: 12vmin;
        --angle: 0;
    }

    #left-shadow,
    #right-shadow {
        width: 2vmin;
        height: 12vmin;
        bottom: 0;
    }

    #left-shadow {
        left: 0;
        --angle: 90deg;
    }

    #right-shadow {
        border-radius: 0 2vmin 0 0;
        right: 0;
        --angle: -90deg;
    }
`,Ot=a`
    :host {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #frame {
        border: none;
        width: 100%;
        height: 100%;
    }

    #loader {
        width: 80vmin;
        height: 80vmin;
    }
`
/**!
 * Sortable 1.14.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function It(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function At(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?It(Object(i),!0).forEach((function(e){_t(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):It(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function Pt(t){return Pt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Pt(t)}function _t(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function Rt(){return Rt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},Rt.apply(this,arguments)}function zt(t,e){if(null==t)return{};var i,n,o=function(t,e){if(null==t)return{};var i,n,o={},a=Object.keys(t);for(n=0;n<a.length;n++)i=a[n],e.indexOf(i)>=0||(o[i]=t[i]);return o}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(n=0;n<a.length;n++)i=a[n],e.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(t,i)&&(o[i]=t[i])}return o}function Bt(t){if("undefined"!=typeof window&&window.navigator)return!!navigator.userAgent.match(t)}var Mt=Bt(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),Ht=Bt(/Edge/i),Ut=Bt(/firefox/i),jt=Bt(/safari/i)&&!Bt(/chrome/i)&&!Bt(/android/i),Lt=Bt(/iP(ad|od|hone)/i),Yt=Bt(/chrome/i)&&Bt(/android/i),Ft={capture:!1,passive:!1};function Xt(t,e,i){t.addEventListener(e,i,!Mt&&Ft)}function Wt(t,e,i){t.removeEventListener(e,i,!Mt&&Ft)}function Jt(t,e){if(e){if(">"===e[0]&&(e=e.substring(1)),t)try{if(t.matches)return t.matches(e);if(t.msMatchesSelector)return t.msMatchesSelector(e);if(t.webkitMatchesSelector)return t.webkitMatchesSelector(e)}catch(t){return!1}return!1}}function Vt(t){return t.host&&t!==document&&t.host.nodeType?t.host:t.parentNode}function qt(t,e,i,n){if(t){i=i||document;do{if(null!=e&&(">"===e[0]?t.parentNode===i&&Jt(t,e):Jt(t,e))||n&&t===i)return t;if(t===i)break}while(t=Vt(t))}return null}var Gt,Zt=/\s+/g;function Kt(t,e,i){if(t&&e)if(t.classList)t.classList[i?"add":"remove"](e);else{var n=(" "+t.className+" ").replace(Zt," ").replace(" "+e+" "," ");t.className=(n+(i?" "+e:"")).replace(Zt," ")}}function Qt(t,e,i){var n=t&&t.style;if(n){if(void 0===i)return document.defaultView&&document.defaultView.getComputedStyle?i=document.defaultView.getComputedStyle(t,""):t.currentStyle&&(i=t.currentStyle),void 0===e?i:i[e];e in n||-1!==e.indexOf("webkit")||(e="-webkit-"+e),n[e]=i+("string"==typeof i?"":"px")}}function te(t,e){var i="";if("string"==typeof t)i=t;else do{var n=Qt(t,"transform");n&&"none"!==n&&(i=n+" "+i)}while(!e&&(t=t.parentNode));var o=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return o&&new o(i)}function ee(t,e,i){if(t){var n=t.getElementsByTagName(e),o=0,a=n.length;if(i)for(;o<a;o++)i(n[o],o);return n}return[]}function ie(){var t=document.scrollingElement;return t||document.documentElement}function ne(t,e,i,n,o){if(t.getBoundingClientRect||t===window){var a,r,s,l,d,h,c;if(t!==window&&t.parentNode&&t!==ie()?(r=(a=t.getBoundingClientRect()).top,s=a.left,l=a.bottom,d=a.right,h=a.height,c=a.width):(r=0,s=0,l=window.innerHeight,d=window.innerWidth,h=window.innerHeight,c=window.innerWidth),(e||i)&&t!==window&&(o=o||t.parentNode,!Mt))do{if(o&&o.getBoundingClientRect&&("none"!==Qt(o,"transform")||i&&"static"!==Qt(o,"position"))){var u=o.getBoundingClientRect();r-=u.top+parseInt(Qt(o,"border-top-width")),s-=u.left+parseInt(Qt(o,"border-left-width")),l=r+a.height,d=s+a.width;break}}while(o=o.parentNode);if(n&&t!==window){var p=te(o||t),g=p&&p.a,m=p&&p.d;p&&(l=(r/=m)+(h/=m),d=(s/=g)+(c/=g))}return{top:r,left:s,bottom:l,right:d,width:c,height:h}}}function oe(t,e,i){for(var n=de(t,!0),o=ne(t)[e];n;){var a=ne(n)[i];if(!("top"===i||"left"===i?o>=a:o<=a))return n;if(n===ie())break;n=de(n,!1)}return!1}function ae(t,e,i,n){for(var o=0,a=0,r=t.children;a<r.length;){if("none"!==r[a].style.display&&r[a]!==ui.ghost&&(n||r[a]!==ui.dragged)&&qt(r[a],i.draggable,t,!1)){if(o===e)return r[a];o++}a++}return null}function re(t,e){for(var i=t.lastElementChild;i&&(i===ui.ghost||"none"===Qt(i,"display")||e&&!Jt(i,e));)i=i.previousElementSibling;return i||null}function se(t,e){var i=0;if(!t||!t.parentNode)return-1;for(;t=t.previousElementSibling;)"TEMPLATE"===t.nodeName.toUpperCase()||t===ui.clone||e&&!Jt(t,e)||i++;return i}function le(t){var e=0,i=0,n=ie();if(t)do{var o=te(t),a=o.a,r=o.d;e+=t.scrollLeft*a,i+=t.scrollTop*r}while(t!==n&&(t=t.parentNode));return[e,i]}function de(t,e){if(!t||!t.getBoundingClientRect)return ie();var i=t,n=!1;do{if(i.clientWidth<i.scrollWidth||i.clientHeight<i.scrollHeight){var o=Qt(i);if(i.clientWidth<i.scrollWidth&&("auto"==o.overflowX||"scroll"==o.overflowX)||i.clientHeight<i.scrollHeight&&("auto"==o.overflowY||"scroll"==o.overflowY)){if(!i.getBoundingClientRect||i===document.body)return ie();if(n||e)return i;n=!0}}}while(i=i.parentNode);return ie()}function he(t,e){return Math.round(t.top)===Math.round(e.top)&&Math.round(t.left)===Math.round(e.left)&&Math.round(t.height)===Math.round(e.height)&&Math.round(t.width)===Math.round(e.width)}function ce(t,e){return function(){if(!Gt){var i=arguments,n=this;1===i.length?t.call(n,i[0]):t.apply(n,i),Gt=setTimeout((function(){Gt=void 0}),e)}}}function ue(t,e,i){t.scrollLeft+=e,t.scrollTop+=i}function pe(t){var e=window.Polymer,i=window.jQuery||window.Zepto;return e&&e.dom?e.dom(t).cloneNode(!0):i?i(t).clone(!0)[0]:t.cloneNode(!0)}var ge="Sortable"+(new Date).getTime();function me(){var t,e=[];return{captureAnimationState:function(){(e=[],this.options.animation)&&[].slice.call(this.el.children).forEach((function(t){if("none"!==Qt(t,"display")&&t!==ui.ghost){e.push({target:t,rect:ne(t)});var i=At({},e[e.length-1].rect);if(t.thisAnimationDuration){var n=te(t,!0);n&&(i.top-=n.f,i.left-=n.e)}t.fromRect=i}}))},addAnimationState:function(t){e.push(t)},removeAnimationState:function(t){e.splice(function(t,e){for(var i in t)if(t.hasOwnProperty(i))for(var n in e)if(e.hasOwnProperty(n)&&e[n]===t[i][n])return Number(i);return-1}(e,{target:t}),1)},animateAll:function(i){var n=this;if(!this.options.animation)return clearTimeout(t),void("function"==typeof i&&i());var o=!1,a=0;e.forEach((function(t){var e=0,i=t.target,r=i.fromRect,s=ne(i),l=i.prevFromRect,d=i.prevToRect,h=t.rect,c=te(i,!0);c&&(s.top-=c.f,s.left-=c.e),i.toRect=s,i.thisAnimationDuration&&he(l,s)&&!he(r,s)&&(h.top-s.top)/(h.left-s.left)==(r.top-s.top)/(r.left-s.left)&&(e=function(t,e,i,n){return Math.sqrt(Math.pow(e.top-t.top,2)+Math.pow(e.left-t.left,2))/Math.sqrt(Math.pow(e.top-i.top,2)+Math.pow(e.left-i.left,2))*n.animation}(h,l,d,n.options)),he(s,r)||(i.prevFromRect=r,i.prevToRect=s,e||(e=n.options.animation),n.animate(i,h,s,e)),e&&(o=!0,a=Math.max(a,e),clearTimeout(i.animationResetTimer),i.animationResetTimer=setTimeout((function(){i.animationTime=0,i.prevFromRect=null,i.fromRect=null,i.prevToRect=null,i.thisAnimationDuration=null}),e),i.thisAnimationDuration=e)})),clearTimeout(t),o?t=setTimeout((function(){"function"==typeof i&&i()}),a):"function"==typeof i&&i(),e=[]},animate:function(t,e,i,n){if(n){Qt(t,"transition",""),Qt(t,"transform","");var o=te(this.el),a=o&&o.a,r=o&&o.d,s=(e.left-i.left)/(a||1),l=(e.top-i.top)/(r||1);t.animatingX=!!s,t.animatingY=!!l,Qt(t,"transform","translate3d("+s+"px,"+l+"px,0)"),this.forRepaintDummy=function(t){return t.offsetWidth}(t),Qt(t,"transition","transform "+n+"ms"+(this.options.easing?" "+this.options.easing:"")),Qt(t,"transform","translate3d(0,0,0)"),"number"==typeof t.animated&&clearTimeout(t.animated),t.animated=setTimeout((function(){Qt(t,"transition",""),Qt(t,"transform",""),t.animated=!1,t.animatingX=!1,t.animatingY=!1}),n)}}}}var ve=[],fe={initializeByDefault:!0},be={mount:function(t){for(var e in fe)fe.hasOwnProperty(e)&&!(e in t)&&(t[e]=fe[e]);ve.forEach((function(e){if(e.pluginName===t.pluginName)throw"Sortable: Cannot mount plugin ".concat(t.pluginName," more than once")})),ve.push(t)},pluginEvent:function(t,e,i){var n=this;this.eventCanceled=!1,i.cancel=function(){n.eventCanceled=!0};var o=t+"Global";ve.forEach((function(n){e[n.pluginName]&&(e[n.pluginName][o]&&e[n.pluginName][o](At({sortable:e},i)),e.options[n.pluginName]&&e[n.pluginName][t]&&e[n.pluginName][t](At({sortable:e},i)))}))},initializePlugins:function(t,e,i,n){for(var o in ve.forEach((function(n){var o=n.pluginName;if(t.options[o]||n.initializeByDefault){var a=new n(t,e,t.options);a.sortable=t,a.options=t.options,t[o]=a,Rt(i,a.defaults)}})),t.options)if(t.options.hasOwnProperty(o)){var a=this.modifyOption(t,o,t.options[o]);void 0!==a&&(t.options[o]=a)}},getEventProperties:function(t,e){var i={};return ve.forEach((function(n){"function"==typeof n.eventProperties&&Rt(i,n.eventProperties.call(e[n.pluginName],t))})),i},modifyOption:function(t,e,i){var n;return ve.forEach((function(o){t[o.pluginName]&&o.optionListeners&&"function"==typeof o.optionListeners[e]&&(n=o.optionListeners[e].call(t[o.pluginName],i))})),n}};var ye=["evt"],we=function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=i.evt,o=zt(i,ye);be.pluginEvent.bind(ui)(t,e,At({dragEl:Se,parentEl:Ee,ghostEl:Ce,rootEl:$e,nextEl:Te,lastDownEl:ke,cloneEl:De,cloneHidden:Ne,dragStarted:Le,putSortable:Re,activeSortable:ui.active,originalEvent:n,oldIndex:Oe,oldDraggableIndex:Ae,newIndex:Ie,newDraggableIndex:Pe,hideGhostForTarget:li,unhideGhostForTarget:di,cloneNowHidden:function(){Ne=!0},cloneNowShown:function(){Ne=!1},dispatchSortableEvent:function(t){xe({sortable:e,name:t,originalEvent:n})}},o))};function xe(t){!function(t){var e=t.sortable,i=t.rootEl,n=t.name,o=t.targetEl,a=t.cloneEl,r=t.toEl,s=t.fromEl,l=t.oldIndex,d=t.newIndex,h=t.oldDraggableIndex,c=t.newDraggableIndex,u=t.originalEvent,p=t.putSortable,g=t.extraEventProperties;if(e=e||i&&i[ge]){var m,v=e.options,f="on"+n.charAt(0).toUpperCase()+n.substr(1);!window.CustomEvent||Mt||Ht?(m=document.createEvent("Event")).initEvent(n,!0,!0):m=new CustomEvent(n,{bubbles:!0,cancelable:!0}),m.to=r||i,m.from=s||i,m.item=o||i,m.clone=a,m.oldIndex=l,m.newIndex=d,m.oldDraggableIndex=h,m.newDraggableIndex=c,m.originalEvent=u,m.pullMode=p?p.lastPutMode:void 0;var b=At(At({},g),be.getEventProperties(n,e));for(var y in b)m[y]=b[y];i&&i.dispatchEvent(m),v[f]&&v[f].call(e,m)}}(At({putSortable:Re,cloneEl:De,targetEl:Se,rootEl:$e,oldIndex:Oe,oldDraggableIndex:Ae,newIndex:Ie,newDraggableIndex:Pe},t))}var Se,Ee,Ce,$e,Te,ke,De,Ne,Oe,Ie,Ae,Pe,_e,Re,ze,Be,Me,He,Ue,je,Le,Ye,Fe,Xe,We,Je=!1,Ve=!1,qe=[],Ge=!1,Ze=!1,Ke=[],Qe=!1,ti=[],ei="undefined"!=typeof document,ii=Lt,ni=Ht||Mt?"cssFloat":"float",oi=ei&&!Yt&&!Lt&&"draggable"in document.createElement("div"),ai=function(){if(ei){if(Mt)return!1;var t=document.createElement("x");return t.style.cssText="pointer-events:auto","auto"===t.style.pointerEvents}}(),ri=function(t,e){var i=Qt(t),n=parseInt(i.width)-parseInt(i.paddingLeft)-parseInt(i.paddingRight)-parseInt(i.borderLeftWidth)-parseInt(i.borderRightWidth),o=ae(t,0,e),a=ae(t,1,e),r=o&&Qt(o),s=a&&Qt(a),l=r&&parseInt(r.marginLeft)+parseInt(r.marginRight)+ne(o).width,d=s&&parseInt(s.marginLeft)+parseInt(s.marginRight)+ne(a).width;if("flex"===i.display)return"column"===i.flexDirection||"column-reverse"===i.flexDirection?"vertical":"horizontal";if("grid"===i.display)return i.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(o&&r.float&&"none"!==r.float){var h="left"===r.float?"left":"right";return!a||"both"!==s.clear&&s.clear!==h?"horizontal":"vertical"}return o&&("block"===r.display||"flex"===r.display||"table"===r.display||"grid"===r.display||l>=n&&"none"===i[ni]||a&&"none"===i[ni]&&l+d>n)?"vertical":"horizontal"},si=function(t){function e(t,i){return function(n,o,a,r){var s=n.options.group.name&&o.options.group.name&&n.options.group.name===o.options.group.name;if(null==t&&(i||s))return!0;if(null==t||!1===t)return!1;if(i&&"clone"===t)return t;if("function"==typeof t)return e(t(n,o,a,r),i)(n,o,a,r);var l=(i?n:o).options.group.name;return!0===t||"string"==typeof t&&t===l||t.join&&t.indexOf(l)>-1}}var i={},n=t.group;n&&"object"==Pt(n)||(n={name:n}),i.name=n.name,i.checkPull=e(n.pull,!0),i.checkPut=e(n.put),i.revertClone=n.revertClone,t.group=i},li=function(){!ai&&Ce&&Qt(Ce,"display","none")},di=function(){!ai&&Ce&&Qt(Ce,"display","")};ei&&document.addEventListener("click",(function(t){if(Ve)return t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation(),Ve=!1,!1}),!0);var hi=function(t){if(Se){var e=function(t,e){var i;return qe.some((function(n){var o=n[ge].options.emptyInsertThreshold;if(o&&!re(n)){var a=ne(n),r=t>=a.left-o&&t<=a.right+o,s=e>=a.top-o&&e<=a.bottom+o;return r&&s?i=n:void 0}})),i}((t=t.touches?t.touches[0]:t).clientX,t.clientY);if(e){var i={};for(var n in t)t.hasOwnProperty(n)&&(i[n]=t[n]);i.target=i.rootEl=e,i.preventDefault=void 0,i.stopPropagation=void 0,e[ge]._onDragOver(i)}}},ci=function(t){Se&&Se.parentNode[ge]._isOutsideThisEl(t.target)};function ui(t,e){if(!t||!t.nodeType||1!==t.nodeType)throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));this.el=t,this.options=e=Rt({},e),t[ge]=this;var i={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(t.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return ri(t,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==ui.supportPointer&&"PointerEvent"in window&&!jt,emptyInsertThreshold:5};for(var n in be.initializePlugins(this,t,i),i)!(n in e)&&(e[n]=i[n]);for(var o in si(e),this)"_"===o.charAt(0)&&"function"==typeof this[o]&&(this[o]=this[o].bind(this));this.nativeDraggable=!e.forceFallback&&oi,this.nativeDraggable&&(this.options.touchStartThreshold=1),e.supportPointer?Xt(t,"pointerdown",this._onTapStart):(Xt(t,"mousedown",this._onTapStart),Xt(t,"touchstart",this._onTapStart)),this.nativeDraggable&&(Xt(t,"dragover",this),Xt(t,"dragenter",this)),qe.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[]),Rt(this,me())}function pi(t,e,i,n,o,a,r,s){var l,d,h=t[ge],c=h.options.onMove;return!window.CustomEvent||Mt||Ht?(l=document.createEvent("Event")).initEvent("move",!0,!0):l=new CustomEvent("move",{bubbles:!0,cancelable:!0}),l.to=e,l.from=t,l.dragged=i,l.draggedRect=n,l.related=o||e,l.relatedRect=a||ne(e),l.willInsertAfter=s,l.originalEvent=r,t.dispatchEvent(l),c&&(d=c.call(h,l,r)),d}function gi(t){t.draggable=!1}function mi(){Qe=!1}function vi(t){for(var e=t.tagName+t.className+t.src+t.href+t.textContent,i=e.length,n=0;i--;)n+=e.charCodeAt(i);return n.toString(36)}function fi(t){return setTimeout(t,0)}function bi(t){return clearTimeout(t)}ui.prototype={constructor:ui,_isOutsideThisEl:function(t){this.el.contains(t)||t===this.el||(Ye=null)},_getDirection:function(t,e){return"function"==typeof this.options.direction?this.options.direction.call(this,t,e,Se):this.options.direction},_onTapStart:function(t){if(t.cancelable){var e=this,i=this.el,n=this.options,o=n.preventOnFilter,a=t.type,r=t.touches&&t.touches[0]||t.pointerType&&"touch"===t.pointerType&&t,s=(r||t).target,l=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||s,d=n.filter;if(function(t){ti.length=0;var e=t.getElementsByTagName("input"),i=e.length;for(;i--;){var n=e[i];n.checked&&ti.push(n)}}(i),!Se&&!(/mousedown|pointerdown/.test(a)&&0!==t.button||n.disabled)&&!l.isContentEditable&&(this.nativeDraggable||!jt||!s||"SELECT"!==s.tagName.toUpperCase())&&!((s=qt(s,n.draggable,i,!1))&&s.animated||ke===s)){if(Oe=se(s),Ae=se(s,n.draggable),"function"==typeof d){if(d.call(this,t,s,this))return xe({sortable:e,rootEl:l,name:"filter",targetEl:s,toEl:i,fromEl:i}),we("filter",e,{evt:t}),void(o&&t.cancelable&&t.preventDefault())}else if(d&&(d=d.split(",").some((function(n){if(n=qt(l,n.trim(),i,!1))return xe({sortable:e,rootEl:n,name:"filter",targetEl:s,fromEl:i,toEl:i}),we("filter",e,{evt:t}),!0}))))return void(o&&t.cancelable&&t.preventDefault());n.handle&&!qt(l,n.handle,i,!1)||this._prepareDragStart(t,r,s)}}},_prepareDragStart:function(t,e,i){var n,o=this,a=o.el,r=o.options,s=a.ownerDocument;if(i&&!Se&&i.parentNode===a){var l=ne(i);if($e=a,Ee=(Se=i).parentNode,Te=Se.nextSibling,ke=i,_e=r.group,ui.dragged=Se,ze={target:Se,clientX:(e||t).clientX,clientY:(e||t).clientY},Ue=ze.clientX-l.left,je=ze.clientY-l.top,this._lastX=(e||t).clientX,this._lastY=(e||t).clientY,Se.style["will-change"]="all",n=function(){we("delayEnded",o,{evt:t}),ui.eventCanceled?o._onDrop():(o._disableDelayedDragEvents(),!Ut&&o.nativeDraggable&&(Se.draggable=!0),o._triggerDragStart(t,e),xe({sortable:o,name:"choose",originalEvent:t}),Kt(Se,r.chosenClass,!0))},r.ignore.split(",").forEach((function(t){ee(Se,t.trim(),gi)})),Xt(s,"dragover",hi),Xt(s,"mousemove",hi),Xt(s,"touchmove",hi),Xt(s,"mouseup",o._onDrop),Xt(s,"touchend",o._onDrop),Xt(s,"touchcancel",o._onDrop),Ut&&this.nativeDraggable&&(this.options.touchStartThreshold=4,Se.draggable=!0),we("delayStart",this,{evt:t}),!r.delay||r.delayOnTouchOnly&&!e||this.nativeDraggable&&(Ht||Mt))n();else{if(ui.eventCanceled)return void this._onDrop();Xt(s,"mouseup",o._disableDelayedDrag),Xt(s,"touchend",o._disableDelayedDrag),Xt(s,"touchcancel",o._disableDelayedDrag),Xt(s,"mousemove",o._delayedDragTouchMoveHandler),Xt(s,"touchmove",o._delayedDragTouchMoveHandler),r.supportPointer&&Xt(s,"pointermove",o._delayedDragTouchMoveHandler),o._dragStartTimer=setTimeout(n,r.delay)}}},_delayedDragTouchMoveHandler:function(t){var e=t.touches?t.touches[0]:t;Math.max(Math.abs(e.clientX-this._lastX),Math.abs(e.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){Se&&gi(Se),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var t=this.el.ownerDocument;Wt(t,"mouseup",this._disableDelayedDrag),Wt(t,"touchend",this._disableDelayedDrag),Wt(t,"touchcancel",this._disableDelayedDrag),Wt(t,"mousemove",this._delayedDragTouchMoveHandler),Wt(t,"touchmove",this._delayedDragTouchMoveHandler),Wt(t,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(t,e){e=e||"touch"==t.pointerType&&t,!this.nativeDraggable||e?this.options.supportPointer?Xt(document,"pointermove",this._onTouchMove):Xt(document,e?"touchmove":"mousemove",this._onTouchMove):(Xt(Se,"dragend",this),Xt($e,"dragstart",this._onDragStart));try{document.selection?fi((function(){document.selection.empty()})):window.getSelection().removeAllRanges()}catch(t){}},_dragStarted:function(t,e){if(Je=!1,$e&&Se){we("dragStarted",this,{evt:e}),this.nativeDraggable&&Xt(document,"dragover",ci);var i=this.options;!t&&Kt(Se,i.dragClass,!1),Kt(Se,i.ghostClass,!0),ui.active=this,t&&this._appendGhost(),xe({sortable:this,name:"start",originalEvent:e})}else this._nulling()},_emulateDragOver:function(){if(Be){this._lastX=Be.clientX,this._lastY=Be.clientY,li();for(var t=document.elementFromPoint(Be.clientX,Be.clientY),e=t;t&&t.shadowRoot&&(t=t.shadowRoot.elementFromPoint(Be.clientX,Be.clientY))!==e;)e=t;if(Se.parentNode[ge]._isOutsideThisEl(t),e)do{if(e[ge]){if(e[ge]._onDragOver({clientX:Be.clientX,clientY:Be.clientY,target:t,rootEl:e})&&!this.options.dragoverBubble)break}t=e}while(e=e.parentNode);di()}},_onTouchMove:function(t){if(ze){var e=this.options,i=e.fallbackTolerance,n=e.fallbackOffset,o=t.touches?t.touches[0]:t,a=Ce&&te(Ce,!0),r=Ce&&a&&a.a,s=Ce&&a&&a.d,l=ii&&We&&le(We),d=(o.clientX-ze.clientX+n.x)/(r||1)+(l?l[0]-Ke[0]:0)/(r||1),h=(o.clientY-ze.clientY+n.y)/(s||1)+(l?l[1]-Ke[1]:0)/(s||1);if(!ui.active&&!Je){if(i&&Math.max(Math.abs(o.clientX-this._lastX),Math.abs(o.clientY-this._lastY))<i)return;this._onDragStart(t,!0)}if(Ce){a?(a.e+=d-(Me||0),a.f+=h-(He||0)):a={a:1,b:0,c:0,d:1,e:d,f:h};var c="matrix(".concat(a.a,",").concat(a.b,",").concat(a.c,",").concat(a.d,",").concat(a.e,",").concat(a.f,")");Qt(Ce,"webkitTransform",c),Qt(Ce,"mozTransform",c),Qt(Ce,"msTransform",c),Qt(Ce,"transform",c),Me=d,He=h,Be=o}t.cancelable&&t.preventDefault()}},_appendGhost:function(){if(!Ce){var t=this.options.fallbackOnBody?document.body:$e,e=ne(Se,!0,ii,!0,t),i=this.options;if(ii){for(We=t;"static"===Qt(We,"position")&&"none"===Qt(We,"transform")&&We!==document;)We=We.parentNode;We!==document.body&&We!==document.documentElement?(We===document&&(We=ie()),e.top+=We.scrollTop,e.left+=We.scrollLeft):We=ie(),Ke=le(We)}Kt(Ce=Se.cloneNode(!0),i.ghostClass,!1),Kt(Ce,i.fallbackClass,!0),Kt(Ce,i.dragClass,!0),Qt(Ce,"transition",""),Qt(Ce,"transform",""),Qt(Ce,"box-sizing","border-box"),Qt(Ce,"margin",0),Qt(Ce,"top",e.top),Qt(Ce,"left",e.left),Qt(Ce,"width",e.width),Qt(Ce,"height",e.height),Qt(Ce,"opacity","0.8"),Qt(Ce,"position",ii?"absolute":"fixed"),Qt(Ce,"zIndex","100000"),Qt(Ce,"pointerEvents","none"),ui.ghost=Ce,t.appendChild(Ce),Qt(Ce,"transform-origin",Ue/parseInt(Ce.style.width)*100+"% "+je/parseInt(Ce.style.height)*100+"%")}},_onDragStart:function(t,e){var i=this,n=t.dataTransfer,o=i.options;we("dragStart",this,{evt:t}),ui.eventCanceled?this._onDrop():(we("setupClone",this),ui.eventCanceled||((De=pe(Se)).draggable=!1,De.style["will-change"]="",this._hideClone(),Kt(De,this.options.chosenClass,!1),ui.clone=De),i.cloneId=fi((function(){we("clone",i),ui.eventCanceled||(i.options.removeCloneOnHide||$e.insertBefore(De,Se),i._hideClone(),xe({sortable:i,name:"clone"}))})),!e&&Kt(Se,o.dragClass,!0),e?(Ve=!0,i._loopId=setInterval(i._emulateDragOver,50)):(Wt(document,"mouseup",i._onDrop),Wt(document,"touchend",i._onDrop),Wt(document,"touchcancel",i._onDrop),n&&(n.effectAllowed="move",o.setData&&o.setData.call(i,n,Se)),Xt(document,"drop",i),Qt(Se,"transform","translateZ(0)")),Je=!0,i._dragStartId=fi(i._dragStarted.bind(i,e,t)),Xt(document,"selectstart",i),Le=!0,jt&&Qt(document.body,"user-select","none"))},_onDragOver:function(t){var e,i,n,o,a=this.el,r=t.target,s=this.options,l=s.group,d=ui.active,h=_e===l,c=s.sort,u=Re||d,p=this,g=!1;if(!Qe){if(void 0!==t.preventDefault&&t.cancelable&&t.preventDefault(),r=qt(r,s.draggable,a,!0),N("dragOver"),ui.eventCanceled)return g;if(Se.contains(t.target)||r.animated&&r.animatingX&&r.animatingY||p._ignoreWhileAnimating===r)return I(!1);if(Ve=!1,d&&!s.disabled&&(h?c||(n=Ee!==$e):Re===this||(this.lastPutMode=_e.checkPull(this,d,Se,t))&&l.checkPut(this,d,Se,t))){if(o="vertical"===this._getDirection(t,r),e=ne(Se),N("dragOverValid"),ui.eventCanceled)return g;if(n)return Ee=$e,O(),this._hideClone(),N("revert"),ui.eventCanceled||(Te?$e.insertBefore(Se,Te):$e.appendChild(Se)),I(!0);var m=re(a,s.draggable);if(!m||function(t,e,i){var n=ne(re(i.el,i.options.draggable)),o=10;return e?t.clientX>n.right+o||t.clientX<=n.right&&t.clientY>n.bottom&&t.clientX>=n.left:t.clientX>n.right&&t.clientY>n.top||t.clientX<=n.right&&t.clientY>n.bottom+o}(t,o,this)&&!m.animated){if(m===Se)return I(!1);if(m&&a===t.target&&(r=m),r&&(i=ne(r)),!1!==pi($e,a,Se,e,r,i,t,!!r))return O(),a.appendChild(Se),Ee=a,A(),I(!0)}else if(m&&function(t,e,i){var n=ne(ae(i.el,0,i.options,!0)),o=10;return e?t.clientX<n.left-o||t.clientY<n.top&&t.clientX<n.right:t.clientY<n.top-o||t.clientY<n.bottom&&t.clientX<n.left}(t,o,this)){var v=ae(a,0,s,!0);if(v===Se)return I(!1);if(i=ne(r=v),!1!==pi($e,a,Se,e,r,i,t,!1))return O(),a.insertBefore(Se,v),Ee=a,A(),I(!0)}else if(r.parentNode===a){i=ne(r);var f,b,y,w=Se.parentNode!==a,x=!function(t,e,i){var n=i?t.left:t.top,o=i?t.right:t.bottom,a=i?t.width:t.height,r=i?e.left:e.top,s=i?e.right:e.bottom,l=i?e.width:e.height;return n===r||o===s||n+a/2===r+l/2}(Se.animated&&Se.toRect||e,r.animated&&r.toRect||i,o),S=o?"top":"left",E=oe(r,"top","top")||oe(Se,"top","top"),C=E?E.scrollTop:void 0;if(Ye!==r&&(b=i[S],Ge=!1,Ze=!x&&s.invertSwap||w),f=function(t,e,i,n,o,a,r,s){var l=n?t.clientY:t.clientX,d=n?i.height:i.width,h=n?i.top:i.left,c=n?i.bottom:i.right,u=!1;if(!r)if(s&&Xe<d*o){if(!Ge&&(1===Fe?l>h+d*a/2:l<c-d*a/2)&&(Ge=!0),Ge)u=!0;else if(1===Fe?l<h+Xe:l>c-Xe)return-Fe}else if(l>h+d*(1-o)/2&&l<c-d*(1-o)/2)return function(t){return se(Se)<se(t)?1:-1}(e);if((u=u||r)&&(l<h+d*a/2||l>c-d*a/2))return l>h+d/2?1:-1;return 0}(t,r,i,o,x?1:s.swapThreshold,null==s.invertedSwapThreshold?s.swapThreshold:s.invertedSwapThreshold,Ze,Ye===r),0!==f){var $=se(Se);do{$-=f,y=Ee.children[$]}while(y&&("none"===Qt(y,"display")||y===Ce))}if(0===f||y===r)return I(!1);Ye=r,Fe=f;var T=r.nextElementSibling,k=!1,D=pi($e,a,Se,e,r,i,t,k=1===f);if(!1!==D)return 1!==D&&-1!==D||(k=1===D),Qe=!0,setTimeout(mi,30),O(),k&&!T?a.appendChild(Se):r.parentNode.insertBefore(Se,k?T:r),E&&ue(E,0,C-E.scrollTop),Ee=Se.parentNode,void 0===b||Ze||(Xe=Math.abs(b-ne(r)[S])),A(),I(!0)}if(a.contains(Se))return I(!1)}return!1}function N(s,l){we(s,p,At({evt:t,isOwner:h,axis:o?"vertical":"horizontal",revert:n,dragRect:e,targetRect:i,canSort:c,fromSortable:u,target:r,completed:I,onMove:function(i,n){return pi($e,a,Se,e,i,ne(i),t,n)},changed:A},l))}function O(){N("dragOverAnimationCapture"),p.captureAnimationState(),p!==u&&u.captureAnimationState()}function I(e){return N("dragOverCompleted",{insertion:e}),e&&(h?d._hideClone():d._showClone(p),p!==u&&(Kt(Se,Re?Re.options.ghostClass:d.options.ghostClass,!1),Kt(Se,s.ghostClass,!0)),Re!==p&&p!==ui.active?Re=p:p===ui.active&&Re&&(Re=null),u===p&&(p._ignoreWhileAnimating=r),p.animateAll((function(){N("dragOverAnimationComplete"),p._ignoreWhileAnimating=null})),p!==u&&(u.animateAll(),u._ignoreWhileAnimating=null)),(r===Se&&!Se.animated||r===a&&!r.animated)&&(Ye=null),s.dragoverBubble||t.rootEl||r===document||(Se.parentNode[ge]._isOutsideThisEl(t.target),!e&&hi(t)),!s.dragoverBubble&&t.stopPropagation&&t.stopPropagation(),g=!0}function A(){Ie=se(Se),Pe=se(Se,s.draggable),xe({sortable:p,name:"change",toEl:a,newIndex:Ie,newDraggableIndex:Pe,originalEvent:t})}},_ignoreWhileAnimating:null,_offMoveEvents:function(){Wt(document,"mousemove",this._onTouchMove),Wt(document,"touchmove",this._onTouchMove),Wt(document,"pointermove",this._onTouchMove),Wt(document,"dragover",hi),Wt(document,"mousemove",hi),Wt(document,"touchmove",hi)},_offUpEvents:function(){var t=this.el.ownerDocument;Wt(t,"mouseup",this._onDrop),Wt(t,"touchend",this._onDrop),Wt(t,"pointerup",this._onDrop),Wt(t,"touchcancel",this._onDrop),Wt(document,"selectstart",this)},_onDrop:function(t){var e=this.el,i=this.options;Ie=se(Se),Pe=se(Se,i.draggable),we("drop",this,{evt:t}),Ee=Se&&Se.parentNode,Ie=se(Se),Pe=se(Se,i.draggable),ui.eventCanceled||(Je=!1,Ze=!1,Ge=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),bi(this.cloneId),bi(this._dragStartId),this.nativeDraggable&&(Wt(document,"drop",this),Wt(e,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),jt&&Qt(document.body,"user-select",""),Qt(Se,"transform",""),t&&(Le&&(t.cancelable&&t.preventDefault(),!i.dropBubble&&t.stopPropagation()),Ce&&Ce.parentNode&&Ce.parentNode.removeChild(Ce),($e===Ee||Re&&"clone"!==Re.lastPutMode)&&De&&De.parentNode&&De.parentNode.removeChild(De),Se&&(this.nativeDraggable&&Wt(Se,"dragend",this),gi(Se),Se.style["will-change"]="",Le&&!Je&&Kt(Se,Re?Re.options.ghostClass:this.options.ghostClass,!1),Kt(Se,this.options.chosenClass,!1),xe({sortable:this,name:"unchoose",toEl:Ee,newIndex:null,newDraggableIndex:null,originalEvent:t}),$e!==Ee?(Ie>=0&&(xe({rootEl:Ee,name:"add",toEl:Ee,fromEl:$e,originalEvent:t}),xe({sortable:this,name:"remove",toEl:Ee,originalEvent:t}),xe({rootEl:Ee,name:"sort",toEl:Ee,fromEl:$e,originalEvent:t}),xe({sortable:this,name:"sort",toEl:Ee,originalEvent:t})),Re&&Re.save()):Ie!==Oe&&Ie>=0&&(xe({sortable:this,name:"update",toEl:Ee,originalEvent:t}),xe({sortable:this,name:"sort",toEl:Ee,originalEvent:t})),ui.active&&(null!=Ie&&-1!==Ie||(Ie=Oe,Pe=Ae),xe({sortable:this,name:"end",toEl:Ee,originalEvent:t}),this.save())))),this._nulling()},_nulling:function(){we("nulling",this),$e=Se=Ee=Ce=Te=De=ke=Ne=ze=Be=Le=Ie=Pe=Oe=Ae=Ye=Fe=Re=_e=ui.dragged=ui.ghost=ui.clone=ui.active=null,ti.forEach((function(t){t.checked=!0})),ti.length=Me=He=0},handleEvent:function(t){switch(t.type){case"drop":case"dragend":this._onDrop(t);break;case"dragenter":case"dragover":Se&&(this._onDragOver(t),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.cancelable&&t.preventDefault()}(t));break;case"selectstart":t.preventDefault()}},toArray:function(){for(var t,e=[],i=this.el.children,n=0,o=i.length,a=this.options;n<o;n++)qt(t=i[n],a.draggable,this.el,!1)&&e.push(t.getAttribute(a.dataIdAttr)||vi(t));return e},sort:function(t,e){var i={},n=this.el;this.toArray().forEach((function(t,e){var o=n.children[e];qt(o,this.options.draggable,n,!1)&&(i[t]=o)}),this),e&&this.captureAnimationState(),t.forEach((function(t){i[t]&&(n.removeChild(i[t]),n.appendChild(i[t]))})),e&&this.animateAll()},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,e){return qt(t,e||this.options.draggable,this.el,!1)},option:function(t,e){var i=this.options;if(void 0===e)return i[t];var n=be.modifyOption(this,t,e);i[t]=void 0!==n?n:e,"group"===t&&si(i)},destroy:function(){we("destroy",this);var t=this.el;t[ge]=null,Wt(t,"mousedown",this._onTapStart),Wt(t,"touchstart",this._onTapStart),Wt(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(Wt(t,"dragover",this),Wt(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),(function(t){t.removeAttribute("draggable")})),this._onDrop(),this._disableDelayedDragEvents(),qe.splice(qe.indexOf(this.el),1),this.el=t=null},_hideClone:function(){if(!Ne){if(we("hideClone",this),ui.eventCanceled)return;Qt(De,"display","none"),this.options.removeCloneOnHide&&De.parentNode&&De.parentNode.removeChild(De),Ne=!0}},_showClone:function(t){if("clone"===t.lastPutMode){if(Ne){if(we("showClone",this),ui.eventCanceled)return;Se.parentNode!=$e||this.options.group.revertClone?Te?$e.insertBefore(De,Te):$e.appendChild(De):$e.insertBefore(De,Se),this.options.group.revertClone&&this.animate(Se,De),Qt(De,"display",""),Ne=!1}}else this._hideClone()}},ei&&Xt(document,"touchmove",(function(t){(ui.active||Je)&&t.cancelable&&t.preventDefault()})),ui.utils={on:Xt,off:Wt,css:Qt,find:ee,is:function(t,e){return!!qt(t,e,t,!1)},extend:function(t,e){if(t&&e)for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t},throttle:ce,closest:qt,toggleClass:Kt,clone:pe,index:se,nextTick:fi,cancelNextTick:bi,detectDirection:ri,getChild:ae},ui.get=function(t){return t[ge]},ui.mount=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];e[0].constructor===Array&&(e=e[0]),e.forEach((function(t){if(!t.prototype||!t.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(t));t.utils&&(ui.utils=At(At({},ui.utils),t.utils)),be.mount(t)}))},ui.create=function(t,e){return new ui(t,e)},ui.version="1.14.0";var yi,wi,xi,Si,Ei,Ci,$i=[],Ti=!1;function ki(){$i.forEach((function(t){clearInterval(t.pid)})),$i=[]}function Di(){clearInterval(Ci)}var Ni=ce((function(t,e,i,n){if(e.scroll){var o,a=(t.touches?t.touches[0]:t).clientX,r=(t.touches?t.touches[0]:t).clientY,s=e.scrollSensitivity,l=e.scrollSpeed,d=ie(),h=!1;wi!==i&&(wi=i,ki(),yi=e.scroll,o=e.scrollFn,!0===yi&&(yi=de(i,!0)));var c=0,u=yi;do{var p=u,g=ne(p),m=g.top,v=g.bottom,f=g.left,b=g.right,y=g.width,w=g.height,x=void 0,S=void 0,E=p.scrollWidth,C=p.scrollHeight,$=Qt(p),T=p.scrollLeft,k=p.scrollTop;p===d?(x=y<E&&("auto"===$.overflowX||"scroll"===$.overflowX||"visible"===$.overflowX),S=w<C&&("auto"===$.overflowY||"scroll"===$.overflowY||"visible"===$.overflowY)):(x=y<E&&("auto"===$.overflowX||"scroll"===$.overflowX),S=w<C&&("auto"===$.overflowY||"scroll"===$.overflowY));var D=x&&(Math.abs(b-a)<=s&&T+y<E)-(Math.abs(f-a)<=s&&!!T),N=S&&(Math.abs(v-r)<=s&&k+w<C)-(Math.abs(m-r)<=s&&!!k);if(!$i[c])for(var O=0;O<=c;O++)$i[O]||($i[O]={});$i[c].vx==D&&$i[c].vy==N&&$i[c].el===p||($i[c].el=p,$i[c].vx=D,$i[c].vy=N,clearInterval($i[c].pid),0==D&&0==N||(h=!0,$i[c].pid=setInterval(function(){n&&0===this.layer&&ui.active._onTouchMove(Ei);var e=$i[this.layer].vy?$i[this.layer].vy*l:0,i=$i[this.layer].vx?$i[this.layer].vx*l:0;"function"==typeof o&&"continue"!==o.call(ui.dragged.parentNode[ge],i,e,t,Ei,$i[this.layer].el)||ue($i[this.layer].el,i,e)}.bind({layer:c}),24))),c++}while(e.bubbleScroll&&u!==d&&(u=de(u,!1)));Ti=h}}),30),Oi=function(t){var e=t.originalEvent,i=t.putSortable,n=t.dragEl,o=t.activeSortable,a=t.dispatchSortableEvent,r=t.hideGhostForTarget,s=t.unhideGhostForTarget;if(e){var l=i||o;r();var d=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:e,h=document.elementFromPoint(d.clientX,d.clientY);s(),l&&!l.el.contains(h)&&(a("spill"),this.onSpill({dragEl:n,putSortable:i}))}};function Ii(){}function Ai(){}Ii.prototype={startIndex:null,dragStart:function(t){var e=t.oldDraggableIndex;this.startIndex=e},onSpill:function(t){var e=t.dragEl,i=t.putSortable;this.sortable.captureAnimationState(),i&&i.captureAnimationState();var n=ae(this.sortable.el,this.startIndex,this.options);n?this.sortable.el.insertBefore(e,n):this.sortable.el.appendChild(e),this.sortable.animateAll(),i&&i.animateAll()},drop:Oi},Rt(Ii,{pluginName:"revertOnSpill"}),Ai.prototype={onSpill:function(t){var e=t.dragEl,i=t.putSortable||this.sortable;i.captureAnimationState(),e.parentNode&&e.parentNode.removeChild(e),i.animateAll()},drop:Oi},Rt(Ai,{pluginName:"removeOnSpill"}),ui.mount((function(){function t(){for(var t in this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0},this)"_"===t.charAt(0)&&"function"==typeof this[t]&&(this[t]=this[t].bind(this))}return t.prototype={dragStarted:function(t){var e=t.originalEvent;this.sortable.nativeDraggable?Xt(document,"dragover",this._handleAutoScroll):this.options.supportPointer?Xt(document,"pointermove",this._handleFallbackAutoScroll):e.touches?Xt(document,"touchmove",this._handleFallbackAutoScroll):Xt(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(t){var e=t.originalEvent;this.options.dragOverBubble||e.rootEl||this._handleAutoScroll(e)},drop:function(){this.sortable.nativeDraggable?Wt(document,"dragover",this._handleAutoScroll):(Wt(document,"pointermove",this._handleFallbackAutoScroll),Wt(document,"touchmove",this._handleFallbackAutoScroll),Wt(document,"mousemove",this._handleFallbackAutoScroll)),Di(),ki(),clearTimeout(Gt),Gt=void 0},nulling:function(){Ei=wi=yi=Ti=Ci=xi=Si=null,$i.length=0},_handleFallbackAutoScroll:function(t){this._handleAutoScroll(t,!0)},_handleAutoScroll:function(t,e){var i=this,n=(t.touches?t.touches[0]:t).clientX,o=(t.touches?t.touches[0]:t).clientY,a=document.elementFromPoint(n,o);if(Ei=t,e||this.options.forceAutoScrollFallback||Ht||Mt||jt){Ni(t,this.options,a,e);var r=de(a,!0);!Ti||Ci&&n===xi&&o===Si||(Ci&&Di(),Ci=setInterval((function(){var a=de(document.elementFromPoint(n,o),!0);a!==r&&(r=a,ki()),Ni(t,i.options,a,e)}),10),xi=n,Si=o)}else{if(!this.options.bubbleScroll||de(a,!0)===ie())return void ki();Ni(t,this.options,de(a,!1),!1)}}},Rt(t,{pluginName:"scroll",initializeByDefault:!0})}));class Pi extends ot{static get styles(){return Nt}static get properties(){return{editing:{type:Boolean}}}updatePage(){for(var t of this.shadowRoot.querySelectorAll("nav-item"))t.requestUpdate()}GetNavItem(t){var e,i,n;return t<Pi.defaultPages.length?({page:e,title:i,icon:n}=Pi.defaultPages[t]):(e=`(page)${this.pages[t-Pi.defaultPages.length]}`,i=this.pages[t-Pi.defaultPages.length],n=this.icons[t-Pi.defaultPages.length]),z`
            <nav-item ?editing="${this.editing}" page="${e}" title="${i}">
                <img draggable="false" src="${n}" />
            </nav-item>
        `}ShowShadows(){if(this.shadowRoot){var t=this.shadowRoot.getElementById("items-container"),e=this.shadowRoot.getElementById("top-shadow"),i=this.shadowRoot.getElementById("bottom-shadow"),n=this.shadowRoot.getElementById("left-shadow"),o=this.shadowRoot.getElementById("right-shadow");window.innerWidth<=window.innerHeight?(e.style.display="none",i.style.display="none",0==t.scrollLeft?n.style.display="none":n.style.removeProperty("display"),t.scrollLeft>=t.scrollWidth-t.clientWidth-1?o.style.display="none":o.style.removeProperty("display")):(n.style.display="none",o.style.display="none",0==t.scrollTop?e.style.display="none":e.style.removeProperty("display"),t.scrollTop>=t.scrollHeight-t.clientHeight-1?i.style.display="none":i.style.removeProperty("display"))}}static defaultPages=[{page:"dailytimetable",title:"Daily Timetable",icon:"images/dailytimetable.svg"},{page:"barcode",title:"ID Barcode",icon:"images/barcode.svg"},{page:"timetable",title:"Timetable",icon:"images/timetable.svg"},{page:"announcements",title:"Announcements",icon:"images/announcements.svg"},{page:"pages",title:"Pages Marketplace",icon:"images/marketplace.svg"},{page:"settings",title:"Settings",icon:"images/settings.svg"}];constructor(){super(),this.pages=[],this.icons=[],this.order=[0,1,2,3,4,5],this.editing=!1,this.sortable=null,matchMedia("(max-aspect-ratio: 1/1)").onchange=this.ShowShadows.bind(this)}createRenderRoot(){var t=super.createRenderRoot();return t.addEventListener("pointerdown",(()=>{this.shadowRoot.getElementById("items-container").classList.add("hover")})),t.addEventListener("pointerup",(()=>{this.shadowRoot.getElementById("items-container").classList.remove("hover")})),t}firstUpdated(){var t=this.shadowRoot.getElementById("items-container");t.addEventListener("scroll",this.ShowShadows.bind(this)),this.sortable=new ui(t,{group:"nav-items",sort:!0,disabled:!this.editing,draggable:"nav-item",handle:"#handle",ghostClass:"selected",dragClass:"drag",fallbackOnBody:!0,onEnd:t=>{window.page==t.item.page&&t.item.classList.add("selected");var e=this.order.splice(t.oldIndex,1)[0];this.order.splice(t.newIndex,0,e),localStorage.setItem("Nav Order",JSON.stringify(this.order)),this.requestUpdate()}})}render(){var t=localStorage.getItem("Nav Order");t&&(this.order=JSON.parse(t));var e=window.getInstalledExtensions();this.pages=Object.keys(e),this.icons=this.pages.map((t=>{var i=new URL(e[t].url);return i.pathname=e[t].navIcon,i.search=`version=${e[t].version}`,i.toString()}));var i=window.innerWidth<=window.innerHeight,n=i?window.innerWidth/100:window.innerHeight/100,o=12*this.order.length*n>window.innerHeight;return this.sortable&&this.sortable.option("disabled",!this.editing),z`
            <div id="items-container">
                ${kt(this.order,(t=>t),this.GetNavItem.bind(this))}
            
                <div id="top-shadow" style="display: none"></div>
                <div id="bottom-shadow" style="${!i&&o?"":"display: none"}"></div>
                <div id="left-shadow" style="display: none"></div>
                <div id="right-shadow" style="${i&&o?"":"display: none"}"></div>
            </div>
        `}}window.Navbar=Pi,customElements.define("nav-item",class extends ot{static get styles(){return[Dt,dt]}static get properties(){return{page:{type:String},title:{type:String},editing:{type:Boolean}}}UpdatePage(t){return t.preventDefault(),location.hash=this.page,""!=location.pathname&&(location.pathname=""),window.UpdatePage(),window.UpdateScreenType(),document.getElementById("nav").removeAttribute("editing"),!1}constructor(){super(),this.page="",this.title="",this.editing=!1}render(){return this.draggable=this.editing,window.page==this.page?this.classList.add("selected"):this.classList.remove("selected"),z`
            <a href="#${this.page}" @click="${this.UpdatePage}" title="${this.title}">
                <slot></slot>
            </a>

            ${this.editing?z`<img id="handle" src="images/drag.svg" draggable="false"/>`:M}
        `}}),customElements.define("nav-bar",Pi),customElements.define("extension-page",class extends ot{static get styles(){return[Ot]}static get properties(){return{src:{type:String}}}constructor(){super(),this.src=""}firstUpdated(){var t=this.shadowRoot.getElementById("frame");t.addEventListener("load",(()=>{this.shadowRoot.getElementById("loader").remove(),t.removeAttribute("style")}))}render(){return z`
            <iframe sandbox="allow-scripts allow-same-origin" id="frame" src="${this.src}" style="display: none"></iframe>
            <loading-element id="loader"></loading-element>
        `}});const _i=a`
    :host {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 60%;
        margin-top: 0.5vmin;
        margin-bottom: 0.5vmin;
    }

    :host > * {
        display: inline-block;
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
`,Ri=a`
    :host {
        margin-top: 1.5vmin;
        margin-bottom: 1.5vmin;
    }

    .sub {
        font-size: calc(var(--font-size) / 1.8);
    }

    p {
        color: var(--text1);
    }
`,zi=a`
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        position: relative;

        padding-top: 4vmin;
        padding-bottom: 4vmin;

        margin: auto;

        width: 60vw;
        max-width: 60vh;
        min-width: 300px;
        min-height: 70%;
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

    #fullscreen {
        position: absolute;
        top: 2vmin;
        right: 2vmin;

        width: 4vmin;
        height: 4vmin;

        background-color: transparent;
        border: none;
        padding: 0;
    }

    #fullscreen > img {
        width: inherit;
        height: inherit;
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
        border-bottom: 0.2vmin solid gray;
    }

    .line-right {
        margin-right: 2vmin;
    }

    .line-left {
        margin-left: 2vmin;
    }
`,Bi=a`
    :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 3vmin;

        width: 100%;
        height: 100%;

        position: absolute;
        top: 0px;
        left: 0px;

        z-index: 101;

        background-color: var(--surface1);
    }

    #logo {
        width: auto;
        height: 70vmax;
        filter: blur(1vmin) opacity(0.2) hue-rotate(var(--hue-rotate));
        position: absolute;
        transform: translateX(5vmin);
        z-index: -1;
    }

    #rings {
        width: 90vmax;
        height: 90vmax;
        filter: blur(1vmin) opacity(0.2);
        position: absolute;
        z-index: -1;
    }

    #close {
        position: absolute;
        top: 2vmin;
        right: 2vmin;

        width: 4vmin;
        height: 4vmin;

        background: transparent;
        border: none;
        padding: 0;
    }

    #close > img {
        width: inherit;
        height: inherit;
    }

    #time {
        font-size: calc(var(--font-size) * 2);
    }

    #bell {
        font-size: calc(var(--font-size) * 6);
    }

    #details,
    #details span {
        font-size: calc(var(--font-size) * 1.5);
    }

    .changed {
        color: var(--text2);
    }
`;customElements.define("bell-item",class extends ot{static get styles(){return[ht,_i]}static get properties(){return{name:{type:String},time:{type:String}}}constructor(){super(),this.name="",this.time="00:00"}render(){return z`
            <p>${this.name}</p>
            <p>${this.time}</p>
        `}}),customElements.define("payload-bell-item",class extends ot{static get styles(){return[ht,_i,Ri]}static get properties(){return{time:{type:String},timeChanged:{type:Boolean},name:{type:String},room:{type:String},roomChanged:{type:Boolean},teacher:{type:String},teacherChanged:{type:Boolean}}}constructor(){super(),this.time="",this.timeChanged=!1,this.name="",this.room="",this.roomChanged=!1,this.teacher="",this.teacherChanged=!1}render(){var t=this.timeChanged?"changed":"",e=this.teacherChanged?"changed":"",i=this.roomChanged?"changed":"";return z`
            <div>
                <p>${this.name}</p>
                <p class="sub">at <span class="sub ${t}">${this.time}</span> with <span class="sub ${e}">${this.teacher}</span></p>
            </div>
            
            <p class="${i}">${this.room}</p>
        `}}),customElements.define("daily-timetable",class extends ot{static get styles(){return[ht,dt,st,zi]}static get properties(){return{data:{type:Object}}}getDate(t){var e=new Date(this.data.date),i=t.time.split(":"),n=Number.parseInt(i[0]),o=Number.parseInt(i[1]);return e.setHours(n),e.setMinutes(o),e}getNextBell(){if(null!=this.data&&null!=this.data){var t=new Date;for(var e in this.data.bells){var i=this.data.bells[e],n=this.getDate(i);if(n>=t)return{bell:i,time:Math.round((n-t)/1e3)}}}}secondsToString(t){var e=t%60,i=(t-e)/60%60,n=((t-e)/60-i)/60;n<10&&(n="0"+n),i<10&&(i="0"+i),e<10&&(e="0"+e);var o="";return"00"!=n&&(o=n+":"),o+=i+":"+e}updateCountdown(){if(this.hasAttribute("data")&&this.data){var t=this.getNextBell();if(t){var e=this.data.timetable.timetable.periods,i=t.bell.bell;if(i in e&&"R"!=i){var n=e[i];this.nextBell=this.getClassName(n);var o=this.data.classVariations;i in o?(this.nextTeacherChanged=!0,this.nextTeacher="nocover"==o[i].type?"No one":o[i].casualSurname):(this.nextTeacherChanged=!1,this.nextTeacher=n.fullTeacher);var a=this.data.roomVariations;i in a?(this.nextRoomChanged=!0,this.nextRoom=a[i].roomTo):(this.nextRoomChanged=!1,this.nextRoom=n.room)}else this.nextBell=t.bell.bellDisplay,this.nextTeacher=null,this.nextRoom=null;this.timeUntilNextBell=this.secondsToString(t.time)}else this.gettingNextDay||(this.gettingNextDay=!0,caches.open(window.RESOURCE_CACHE).then((async t=>{var e=await t.match("next-dailytimetable");if(e){var i=e.clone();await t.put("dailytimetable",i);var n=await e.text();await t.delete("next-dailytimetable"),this.setAttribute("data",n)}else{this.setAttribute("data","null"),this.data=null,this.requestUpdate();var o=await GetToken();if(await UpdateResourcesIfNeeded(o,!0)){i=(await t.match("dailytimetable")).clone();this.setAttribute("data",await i.text())}}})))}}getClassName(t){var e=this.data.timetable.subjects[`${t.year}${t.title}`].title;return this.formatClassName(e)}formatClassName(t){return t.split(" ").filter((t=>isNaN(t)&&t.length>1)).join(" ")}ToggleFullScreen(){this.fullscreen=!this.fullscreen,this.fullscreen?this.fullscreenElement.style.removeProperty("display"):this.fullscreenElement.style.display="none"}static gettingNextDay=!1;constructor(){super(),this.nextBell="Nothing",this.timeUntilNextBell="00:00",this.nextTeacher="",this.nextTeacherChanged=!1,this.nextRoom="",this.nextRoomChanged=!1,this.fullscreen=!1,this.fullscreenElement=document.querySelector("fullscreen-dailytimetable"),this.countdownId=setInterval((()=>{this.updateCountdown(),this.requestUpdate()}),1e3),this.data={date:"",bells:[],timetable:{timetable:{periods:{}},subjects:{}},roomVariations:[],classVariations:[]},this.gettingNextDay=!1,this.firstRender=!0}render(){return this.hasAttribute("data")?this.data?"OK"!=this.data.status?(clearInterval(this.countdownId),z`
                <p>There was an error with the school servers.</p>
            `):(this.firstRender&&(this.firstRender=!1,this.updateCountdown()),this.fullscreenElement.setAttribute("bell",this.nextBell),this.fullscreenElement.setAttribute("time",this.timeUntilNextBell),this.fullscreenElement.setAttribute("teacher",this.nextTeacher),this.nextTeacherChanged?this.fullscreenElement.setAttribute("teacherChanged",""):this.fullscreenElement.removeAttribute("teacherChanged"),this.fullscreenElement.setAttribute("room",this.nextRoom),this.nextRoomChanged?this.fullscreenElement.setAttribute("roomChanged",""):this.fullscreenElement.removeAttribute("roomChanged"),z`
            <button id="fullscreen" title="Full Screen" @click="${this.ToggleFullScreen}">
                <img src="images/fullscreen.svg" />
            </button>

            <p>${this.nextBell}</p>
            <p>in</p>

            <div class="timer-container">
                <span class="line-right"></span>
                <p id="timer">${this.timeUntilNextBell}</p>
                <span class="line-left"></span>
            </div>

            ${kt(this.data.bells,(t=>t.time),(t=>{var e=this.data.timetable.timetable.periods[t.bell];if(e){if("R"==t.bell)return M;var i=e.room,n=!1;if(t.bell in this.data.roomVariations){var o=this.data.roomVariations[t.bell];e.year==o.year&&(n=!0,i=o.roomTo)}var a=e.fullTeacher,r=!1;if(t.bell in this.data.classVariations){o=this.data.classVariations[t.bell];e.year==o.year&&(r=!0,a=o.casualSurname)}var s=this.getClassName(e);return z`
                                <payload-bell-item name="${s}"
                                                   time="${t.time}"
                                                   ?timechanged="${""!=t.reason}"
                                                   room="${i}"
                                                   ?roomChanged="${n}"
                                                   teacher="${""==a?"No one":a}"
                                                   ?teacherChanged="${r}">
                                </payload-bell-item>`}return"Transition"==t.bell||"End of Day"==t.bell?M:z`<bell-item name="${t.bellDisplay}" time="${t.time}"></bell-item>`}))}
        `):z`<loading-element style="width: 80%"></loading-element>`:M}}),customElements.define("fullscreen-dailytimetable",class extends ot{static get styles(){return[ht,dt,Bi]}static get properties(){return{bell:{type:String},time:{type:String},teacher:{type:String},teacherChanged:{type:Boolean},room:{type:String},roomChanged:{type:Boolean}}}Close(){this.style.display="none"}constructor(){super(),this.bell="Nothing",this.time="00:00",this.teacher="",this.teacherChanged=!1,this.room="",this.roomChanged=!1}render(){return"null"==this.teacher&&(this.teacher=null),"null"==this.room&&(this.room=null),z`
            <img id="logo" src="images/logo${window.isDark()?"-dark":""}.svg"/>
            <img id="rings" src="images/rings.svg"/>

            <button id="close" @click="${this.Close}">
                <img src="images/cross.svg" />
            </button>

            <p id="time">${this.time} until</p>
            <p id="bell">${this.bell}</p>
            <p id="details" style="${this.teacher&&this.room?"":"display: none"}">
                with
                <span class="${this.teacherChanged?"changed":""}">
                    ${this.teacher}
                </span>
                at
                <span class="${this.roomChanged?"changed":""}">
                    ${this.room}
                </span>
            </p>
        `}});const Mi=a`
    :host {
        position: relative;

        display: flex;
        justify-content: center;
    }

    canvas {
        background-color: white;
        filter: contrast(5);
    }

    #point1, #point2 {
        width: var(--font-size);
        height: var(--font-size);
        background-color: var(--surface4);
        border-radius: 100%;
        transform: translate(calc(var(--font-size) / -2), calc(var(--font-size) / -2));
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
        height: 4vmin;

        background: transparent;
        border: none;
        padding: 0;
    }

    #description > img {
        width: inherit;
        height: inherit;
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
        z-index: 98;
    }

    #edit {
        position: absolute;
        top: 1vmin;
        right: 1vmin;

        width: 4vmin;
        height: 4vmin;
        
        background-color: transparent;
        border: none;
        padding: 0;
    }
`;customElements.define("student-barcode",class extends ot{static get styles(){return[ht,dt,lt,st,Mi]}static get properties(){return{data:{type:Object}}}ShowDescription(){this.shadowRoot.getElementById("descriptionContent").style.display=""}HideDescription(){this.shadowRoot.getElementById("descriptionContent").style.display="none"}GetPercentageFromPixels(t,e){return{x:(t-this.offsetLeft)/this.clientWidth*100,y:(e-this.offsetTop)/this.clientHeight*100}}async RequestBarcodeSize(){var t,e,i,n,o=this.shadowRoot.getElementById("point1"),a=this.shadowRoot.getElementById("point2"),r=this.shadowRoot.getElementById("info"),s=this.shadowRoot.getElementById("barcode-canv");r.style.display="",s.style.display="none",o.style.display="none",a.style.display="none";var l=new Promise((r=>{var s=0;this.addEventListener("pointerdown",(l=>{if(1==++s){var{x:d,y:h}=this.GetPercentageFromPixels(l.clientX,l.clientY);t=d,e=h,o.style.left=`${d}%`,o.style.top=`${h}%`,o.style.display=""}else if(2==s){var{x:d,y:h}=this.GetPercentageFromPixels(l.clientX,l.clientY);i=d,n=h,a.style.left=`${d}%`,a.style.top=`${h}%`,a.style.display="",this.removeEventListener("pointerdown",this),r()}}))}));await l,localStorage.setItem("Barcode Size",`${t} ${e} ${i} ${n}`),r.style.display="none",s.style.display="",this.UpdateBarcodeSize()}UpdateBarcodeSize(){var t,e,i,n,o=this.shadowRoot.getElementById("point1"),a=this.shadowRoot.getElementById("point2"),r=this.shadowRoot.getElementById("barcode-canv"),s=parseFloat(o.style.left.replace("%","")),l=parseFloat(o.style.top.replace("%","")),d=parseFloat(a.style.left.replace("%","")),h=parseFloat(a.style.top.replace("%",""));s>d?(t=s,e=d):(t=d,e=s),l>h?(i=l,n=h):(i=h,n=l),r.style.top=`${n}%`,r.style.left=`${e}%`,r.style.width=t-e+"%",r.style.height=i-n+"%",JsBarcode(r,this.data.studentId,{displayValue:!1,margin:0})}CreateBarcode(){if(this.shadowRoot){var t,e,i,n,o=this.shadowRoot.getElementById("point1"),a=this.shadowRoot.getElementById("point2"),r=this.shadowRoot.getElementById("barcode-canv");if(o&&a&&r){r.imageSmoothingEnabled=!1;var s=localStorage.getItem("Barcode Size");if(s){var[t,i,e,n]=s.split(" ");o.style.left=`${t}%`,o.style.top=`${i}%`,a.style.left=`${e}%`,a.style.top=`${n}%`}else o.style.left="80%",o.style.top="10%",a.style.left="20%",a.style.top="30%";this.UpdateBarcodeSize(),r.style.display="",o.style.display="",a.style.display=""}}}constructor(){super(),this.data={studentId:""}}updated(){this.hasAttribute("data")&&this.data&&this.CreateBarcode()}render(){return this.hasAttribute("data")?this.data?z`
            <button id="description"
                    @mouseover="${this.ShowDescription}"
                    @mouseout="${this.HideDescription}"
                    @focus="${this.ShowDescription}"
                    @blur="${this.HideDescription}"
                    title="Description">
                <img draggable="false" src="images/info.svg" />
            </button>
        
            <p style="display: none;" id="descriptionContent">You can use this barcode to scan in at the school scanners instead of your student card.</p>

            <p id="info" style="display: none;">Tap in two places to form a barcode.</p>
            
            <button title="Edit" id="edit" @click="${this.RequestBarcodeSize}">
                <img draggable="false" style="width: inherit; height: inherit;" src="images/edit.svg" />
            </button>

            <div>
                <canvas style="display: none;" id="barcode-canv"></canvas>
                <div style="display: none;" id="point1" draggable="false" src="images/circle.svg"></div>
                <div style="display: none;" id="point2" draggable="false" src="images/circle.svg"></div>
            </div>
        `:z`<loading-element style="width: 80%"></loading-element>`:M}});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Hi extends bt{constructor(t){if(super(t),this.vt=M,t.type!==vt)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===M)return this.Vt=void 0,this.vt=t;if(t===B)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.vt)return this.Vt;this.vt=t;const e=[t];return e.raw=e,this.Vt={_$litType$:this.constructor.resultType,strings:e,values:[]}}}Hi.directiveName="unsafeHTML",Hi.resultType=1;const Ui=ft(Hi),ji=a`
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

    button {
        border: none;
        background: transparent;
        padding: 0;
    }

    #title {
        cursor: pointer;
        user-select: text;
    }

    #sub {
        font-size: calc(var(--font-size) / 1.5);
        user-select: text;
        cursor: auto;
    }

    #toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;

        width: 100%;

        cursor: pointer;
    }

    #toggle > img {
        margin-top: 2vmin;

        width: 4vmin;
    }

    #toggle > img.flipped {
        transform: rotate(180deg);
    }

    .collapsed {
        display: none;
    }

    .expanded {
        margin-top: 4vmin;
    }

    #content {
        user-select: text;
        cursor: auto;
    }
`,Li=a`
    :host {
        box-sizing: border-box;

        display: flex;
        flex-direction: column;

        padding: 2vmin;

        min-width: 0;
        min-height: 0;
    }

    #header {
        min-width: 100%;

        margin-top: 1vmin;
        margin-bottom: 1vmin;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    #announcements {
        margin-top: 2vmin;

        display: flex;
        flex-direction: column;

        flex: 1;

        overflow-y: auto;

        padding-right: 1vmin;

        scrollbar-width: thin;
        scrollbar-color: var(--surface4) transparent;
    }

    #announcements::-webkit-scrollbar {
        width: 1vmin;
    }

    #announcements::-webkit-scrollbar-thumb {
        background-color: var(--surface4);
        border-radius: 1vmin;
    }

    #nothing {
        margin: auto;
    }

    .line-right, .line-left {
        display: inline-block;
        flex: 1;
        border-bottom: 0.2vmin solid gray;
    }

    .line-right {
        margin-right: 2vmin;
    }

    .line-left {
        margin-left: 2vmin;
    }
`;customElements.define("announcement-item",class extends ot{static get styles(){return[ht,pt,dt,ji]}static get properties(){return{title:{type:String},content:{type:String},displayYears:{type:String},author:{type:String},time:{type:String}}}toggle(){this.collapsed=!this.collapsed,this.requestUpdate()}constructor(){super(),this.title="",this.content="",this.displayYears="",this.author="",this.time=null,this.collapsed=!0}render(){return z`
            <button @click="${this.toggle}" id="toggle">
                <p id="title">${this.title}</p>
                <img class="${this.collapsed?"":"flipped"}" src="images/toggle.svg" />
            </button>

            <p id="sub">For ${this.displayYears} ${this.time?"| At "+this.time+" ":""}| By ${this.author}</p>
            <blockquote id="content" class="${this.collapsed?"collapsed":"expanded"}">
                ${Ui(this.content)}
            </blockquote>
        `}}),customElements.define("school-announcements",class extends ot{static get styles(){return[ht,gt,mt,lt,st,Li]}static get properties(){return{data:{type:Object}}}updateFilter(t){this.filter=t.target.value,this.requestUpdate()}constructor(){super(),this.data={notices:[]},this.filter="all"}render(){if(!this.hasAttribute("data"))return M;if(!this.data)return z`<loading-element style="width: 80%; margin: auto;"></loading-element>`;if(0==this.data.notices.length)return z`
                <div class="header" style="min-width: unset; width: 80%; margin: 0 auto;">
                    <div class="line-right"></div>
                    <p>Nothing For Today</p>
                    <div class="line-left"></div>
                </div>
            `;var t=[];return t=(t="all"!=this.filter&&""!=this.filter?this.data.notices.filter((t=>t.years.includes(this.filter))):this.data.notices).sort(((t,e)=>e.relativeWeight-t.relativeWeight+e.meeting-t.meeting)),z`
            <div id="header">
                <input type="search" id="search" placeholder="Search..." autocomplete="off" @change="${this.Search}"/>

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
            <div id="announcements">
                <p id="nothing" style="${0==t.length?"":"display: none"}">Nothing For This Filter</p>
                
                ${kt(t,(t=>t.title),(t=>z`
                        <announcement-item title="${t.title}"
                                           content="${t.content}"
                                           displayYears="${t.displayYears}"
                                           author="${t.authorName}"
                                           time="${t.isMeeting?t.meetingTime:""}">
                        </announcement-item>
                    `))}
            </div>
        `}});const Yi=a`
    :host {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .highlighted {
        border-radius: 1vmin;

        background-color: var(--surface4);
        color: var(--text4);

        box-shadow: var(--shadow);
        text-shadow: 0.2vmin 0.2vmin var(--shadow-colour);

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

    #popup {
        position: absolute;
        top: calc(var(--font-size) * 2);

        color: var(--text4);

        border-radius: 1vmin;
        background-color: var(--surface4);

        box-shadow: var(--shadow);
        text-shadow: 0.2vmin 0.2vmin var(--shadow-colour);

        z-index: 99;

        animation: popupAppear 0.3s ease-out;

        pointer-events: none;
    }

    #popup::before {
        --size: calc(var(--font-size) / 2);

        content: "";

        position: absolute;
        left: calc(50% - calc(var(--size) / 1.5));
        top: calc(-1 * var(--size));

        border-right: calc(var(--size) / 1.5) solid transparent;
        border-bottom: var(--size) solid var(--surface4);
        border-left: calc(var(--size) / 1.5) solid transparent;
    }

    #popup[reversed] {
        top: calc(var(--font-size) * -2);
    }

    #popup[reversed]::before {
        top: unset;
        bottom: calc(-1 * var(--size));

        transform: rotate(180deg);
    }

    @keyframes popupAppear {
        from {
            filter: opacity(0);
            z-index: 99;
        }

        to {
            filter: opacity(1);
            z-index: 99;
        }
    }
`,Fi=a`
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
        border-bottom: solid grey 0.2vmin;
    }

    .highlighted {
        color: var(--text2);
    }
`,Xi=a`
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
`,Wi=a`
    :host {
        margin: auto;
        padding: 4vmin;
        max-width: 92%;
        width: calc(var(--font-size) * 23);
        height: calc(calc(var(--font-size) * 25.5) + 9vmin);
    }

    @media (max-aspect-ratio: 3/4) {
        :host {
            height: calc(calc(calc(var(--font-size) * 25.5) + 9vmin) + 7.5vmax);
        }
    }

    timetable-row + timetable-row {
        border-top: solid grey 0.2vmin;
    }
`;class Ji extends ot{static get styles(){return[ht,Yi]}static get properties(){return{name:{type:String},room:{type:String}}}static highlighted="";static instances=[];static highlight(t){for(var e of(this.highlighted=t,this.instances))e.requestUpdate()}constructor(){super(),Ji.instances.push(this),this.name="",this.room=""}firstUpdated(){this.name&&(this.tabIndex=0,this.addEventListener("pointerover",(()=>Ji.highlight(this.name))),this.addEventListener("pointerleave",(()=>Ji.highlight(""))),this.addEventListener("focus",(()=>Ji.highlight(this.name))),this.addEventListener("blur",(()=>Ji.highlight(""))))}render(){if(Ji.highlighted==this.name&&this.name){var t=this.nextElementSibling,e=t?.nextElementSibling,i=t?.getAttribute("name")==this.name||e?.getAttribute("name")==this.name;return z`
                <p class="highlighted">${this.name}</p>
                <p id="popup"
                   ?reversed="${i}">
                    ${this.room}
                </p>
            `}return z`<p>${this.name}</p>`}}customElements.define("timetable-period",Ji),customElements.define("timetable-day",class extends ot{static get styles(){return[ht,Fi]}static get properties(){return{name:{type:String},data:{type:Object},day:{type:String}}}constructor(){super(),this.name="",this.data={},this.day=""}render(){return z`
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
        `}}),customElements.define("timetable-row",class extends ot{static get styles(){return[ht,Xi]}static get properties(){return{week:{type:String},day1:{type:Object},day2:{type:Object},day3:{type:Object},day4:{type:Object},day5:{type:Object},day:{type:String}}}constructor(){super(),this.week="",this.day1={},this.day2={},this.day3={},this.day4={},this.day5={},this.day=""}render(){return z`
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
        `}}),customElements.define("full-timetable",class extends ot{static get styles(){return[st,Wi]}static get properties(){return{data:{type:Object},day:{type:String}}}clearHighlight(){Ji.highlight("")}constructor(){super(),this.data={days:{}},this.day="",this.addEventListener("pointerover",(t=>t.stopPropagation())),document.addEventListener("pointerover",this.clearHighlight)}disconnectedCallback(){document.removeEventListener("pointerover",this.clearHighlight)}render(){return this.hasAttribute("data")?this.data?(this.day=this.day.slice(0,3).toUpperCase()+" "+this.day.slice(-1),z`
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
        `):z`<loading-element style="width: 80%; height: 100%; margin: auto;"></loading-element>`:M}});const Vi=a`
    :host {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        flex: 1;
        min-width: calc(var(--font-size) * 11.5);
        padding: 1.5vmin;
    }

    #header {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        column-gap: 1.5vmin;
        width: 100%;
    }
    
    #icon {
        width: 10vmin;
        min-width: 10vmin;
        height: 10vmin;
        min-height: 10vmin;
        padding: 1vmin;
        box-sizing: border-box;
        border-radius: 100%;
        box-shadow: var(--small-shadow);
    }

    #icon > img {
        width: 100%;
        height: 100%;
    }

    #description {
        padding: 1.5vmin;
        padding-right: 0;
        word-break: break-word;
    }
`,qi=a`
    :host {
        padding: 2vmin;
    }

    #header {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        margin-bottom: 3vmin;
    }

    #pages {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(calc(var(--font-size) * 15), 1fr));
        gap: 3vmin;
    }
`;customElements.define("page-card",class extends ot{static get styles(){return[ht,ct,Vi]}static get properties(){return{title:{type:String},image:{type:String},description:{type:String},url:{type:String}}}async Install(){var t=await caches.open(window.METADATA_CACHE),e=await t.match("Metadata");if(e){var i=await e.json(),n=window.getInstalledExtensions();n[this.title]=i.pages[this.title],localStorage.setItem("Installed Pages",JSON.stringify(n));var o=JSON.parse(localStorage.getItem("Nav Order")||"[0, 1, 2, 3, 4, 5]");o.push(o.length),localStorage.setItem("Nav Order",JSON.stringify(o)),location.reload()}}Uninstall(){var t=window.getInstalledExtensions(),e=Object.keys(t).indexOf(this.title)+Navbar.defaultPages.length;delete t[this.title];var i=JSON.parse(localStorage.getItem("Nav Order")||"[0, 1, 2, 3, 4, 5]");for(var n of(i.splice(i.indexOf(e),1),i))n>e&&(n-=1);localStorage.setItem("Installed Pages",JSON.stringify(t)),localStorage.setItem("Nav Order",JSON.stringify(i));var o=document.getElementById(`(page)${this.title}`);o&&o.remove(),location.reload()}constructor(){super(),this.title="",this.image="",this.description="",this.url=""}render(){var t=new URL(this.url);t.pathname=this.image;var e=Object.keys(window.getInstalledExtensions()).includes(this.title);return z`
            <div id="header">
                <div id="icon">
                    <img draggable="false" src="${t.toString()}"/>
                </div>
                <p id="title">${this.title}</p>
            </div>
            <p id="description">${this.description}</p>
            <button id="install" @click="${e?this.Uninstall:this.Install}">${e?"Uninstall":"Install"}</button>
        `}}),customElements.define("pages-marketplace",class extends ot{static get styles(){return[mt,lt,st,qi]}static get properties(){return{data:{type:Object}}}Search(){}constructor(){super(),this.data={}}render(){return z`
            <div id="header">
                <input type="search" id="search" placeholder="Search..." autocomplete="off" @change="${this.Search}"/>
            </div>
            <div id="pages">
                ${kt(Object.keys(this.data),(t=>t),(t=>z`
                    <page-card title="${t}"
                               image="${this.data[t].icon}"
                               description="${this.data[t].description}"
                               url="${this.data[t].url}">
                    </page-card>
                `))}
            </div>
        `}});const Gi=a`
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        position: relative;

        padding-top: 4vmin;
        padding-bottom: 4vmin;

        margin: auto;

        width: 60vw;
        max-width: 60vh;
        min-width: 300px;
        min-height: 70%;
    }

    @media (max-width: 300px) {
        :host {
            width: 100vw;
            min-width: unset;
        }
    }

    span {
        border-bottom: 0.2vmin solid gray;
        width: 60%;
    }

    #toggle {
        width: calc(calc(var(--font-size) * 2) + 2vmin);
        height: calc(calc(var(--font-size) * 2) + 2vmin);

        padding: 1vmin;
    }

    #toggle > img {
        width: 100%;
        height: 100%;
    }

    #description {
        z-index: 1;

        position: absolute;
        top: 1vmin;
        left: 1vmin;

        width: 4vmin;
        height: 4vmin;

        padding: 0;

        border: none;

        box-shadow: none;
    }

    #description:hover {
        background-color: transparent;
    }

    #description:active {
        background-color: transparent;
    }
    
    #description > img {
        width: inherit;
        height: inherit;
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

    #hue::-moz-range-thumb {
        box-shadow: var(--shadow-colour)
                    /*
                        This bit basically changes the direction of
                        the shadow based on the position of the slider.
                        Since hue is relative to the position of the
                        slider, we use that as the position. We then
                        scale it to be between -1 and 1 and use that
                        to determine the direction of the shadow.
                    */
                    calc(calc(calc(var(--main-hue) - 180) / -180) * var(--shadow-x))
                    calc(var(--shadow-y) / 2)
                    calc(var(--shadow-spread) / 2);
    }

    #hue::-webkit-slider-thumb {
        box-shadow: var(--shadow-colour)
                    /*
                        This bit basically changes the direction of
                        the shadow based on the position of the slider.
                        Since hue is relative to the position of the
                        slider, we use that as the position. We then
                        scale it to be between -1 and 1 and use that
                        to determine the direction of the shadow.
                    */
                    calc(calc(calc(var(--main-hue) - 180) / -180) * var(--shadow-x))
                    calc(var(--shadow-y) / 2)
                    calc(var(--shadow-spread) / 2);
    }
`;customElements.define("user-settings",class extends ot{static get styles(){return[ht,dt,ct,ut,st,Gi]}ShowDescription(t){this.shadowRoot.getElementById("descriptionContent").style.display="unset",t.stopPropagation()}HideDescriptionBlur(t){var e=t.composedPath(),i=this.shadowRoot.getElementById("descriptionContent").children,n=i[i.length-1];e.includes(n)&&this.HideDescription()}ToggleDark(){window.isDark()?localStorage.setItem("Dark","false"):localStorage.setItem("Dark","true"),window.UpdateScreenType(),this.requestUpdate()}async Patch(){await caches.delete(window.METADATA_CACHE),await caches.delete("Offline Resources"),(await navigator.serviceWorker.ready).active.postMessage({command:"metadata-fetch"}),location.reload()}SetColour(){var t=document.getElementsByTagName("html")[0].style,e=this.shadowRoot.getElementById("hue").value;t.setProperty("--main-hue",e),t.setProperty("--hue-rotate",parseFloat(e)-200+"deg")}SaveColour(){localStorage.setItem("Hue",this.shadowRoot.getElementById("hue").value)}ResetColour(){this.shadowRoot.getElementById("hue").value="200",this.SetColour(),this.SaveColour()}ToggleEditNavbar(){var t=document.getElementById("nav");t.hasAttribute("editing")?t.removeAttribute("editing"):t.setAttribute("editing","")}updated(){caches.open(window.METADATA_CACHE).then((async t=>{var e=await t.match("Metadata");if(e){var i=await e.json();this.shadowRoot.getElementById("version").textContent=`Paragon v${i.version}`}})),this.shadowRoot.getElementById("hue").value=window.getHue().hue}disconnectedCallback(){document.removeEventListener("click",this.HideDescription)}constructor(){super(),this.HideDescription=(()=>{this.shadowRoot&&(this.shadowRoot.getElementById("descriptionContent").style.display="none")}).bind(this),document.addEventListener("click",this.HideDescription)}render(){var t=window.isDark(),e=t?"Dark Mode":"Light Mode",i=t?"images/sun.svg":"images/moon.svg";return z`
            <button title="Description" id="description" @click="${this.ShowDescription}" @focus="${this.ShowDescription}">
                <img draggable="false" src="images/info.svg" />
            </button>
    
            <p style="display: none;" id="descriptionContent" @focusout="${this.HideDescriptionBlur}">
                Paragon is written by <a href="https://github.com/AndrewPerson">Andrew Pye</a>.
                <br/>
                The source code is on <a href="https://github.com/AndrewPerson/Lit-Paragon-Client">Github</a>.
            </p>

            <p id="version">Paragon v0.0.0</p>

            <button @click="${this.Patch}">Fix</button>

            <span></span>
            
            <p>Colour</p>

            <button @click="${this.ResetColour}">Reset</button>

            <input type="range" id="hue" min="0" max="359" value="200" @input="${this.SetColour}" @change="${this.SaveColour}"/>

            <span></span>

            <p>${e}</p>

            <button title="Turn on ${t?"Light":"Dark"} Mode" id="toggle" @click="${this.ToggleDark}">
                <img draggable="false" src="${i}" />
            </button>
            
            <span></span>

            <p>Sidebar</p>

            <button @click="${this.ToggleEditNavbar}">Edit</button>
        `}});
