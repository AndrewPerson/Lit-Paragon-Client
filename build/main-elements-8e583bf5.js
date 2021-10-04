/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol();class s{constructor(t,s){if(s!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return t&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const i=new Map,r=t=>{let r=i.get(t);return void 0===r&&i.set(t,r=new s(t,e)),r},n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,r)=>e+(t=>{if(t instanceof s)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1]),t[0]);return r(i)},o=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>r("string"==typeof t?t:t+""))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var a,l,h,c;const d={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},u=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:u};class p extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u()}static addInitializer(t){var e;null!==(e=this.v)&&void 0!==e||(this.v=[]),this.v.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this.Πp(s,e);void 0!==i&&(this.Πm.set(i,s),t.push(i))})),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const r=this[t];this[e]=i,this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static Πp(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this.ΠU)&&void 0!==e?e:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this.ΠU)||void 0===e||e.splice(this.ΠU.indexOf(t)>>>0,1)}Π_(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this.Πi.set(e,this[e]),delete this[e])}))}createRenderRoot(){var e;const s=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{t?e.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((t=>{const s=document.createElement("style");s.textContent=t.cssText,e.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0)}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})),this.Πo=new Promise((t=>this.Πl=t))}attributeChangedCallback(t,e,s){this.K(t,s)}Πj(t,e,s=v){var i,r;const n=this.constructor.Πp(t,s);if(void 0!==n&&!0===s.reflect){const o=(null!==(r=null===(i=s.converter)||void 0===i?void 0:i.toAttribute)&&void 0!==r?r:d.toAttribute)(e,s.type);this.Πh=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this.Πh=null}}K(t,e){var s,i,r;const n=this.constructor,o=n.Πm.get(t);if(void 0!==o&&this.Πh!==o){const t=n.getPropertyOptions(o),a=t.converter,l=null!==(r=null!==(i=null===(s=a)||void 0===s?void 0:s.fromAttribute)&&void 0!==i?i:"function"==typeof a?a:null)&&void 0!==r?r:d.fromAttribute;this.Πh=o,this[o]=l(e,t.type),this.Πh=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this.L.has(t)||this.L.set(t,e),!0===s.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this.Πg=this.Πq())}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo}catch(t){Promise.reject(t)}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,e)=>this[e]=t)),this.Πi=void 0);let e=!1;const s=this.L;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this.Π$()}catch(t){throw e=!1,this.Π$(),t}e&&this.E(s)}willUpdate(t){}E(t){var e;null===(e=this.ΠU)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}Π$(){this.L=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return!0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,e)=>this.Πj(e,this[e],t))),this.Πk=void 0),this.Π$()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g,f,m,b;p.finalized=!0,p.elementProperties=new Map,p.elementStyles=[],p.shadowRootOptions={mode:"open"},null===(l=(a=globalThis).reactiveElementPlatformSupport)||void 0===l||l.call(a,{ReactiveElement:p}),(null!==(h=(c=globalThis).reactiveElementVersions)&&void 0!==h?h:c.reactiveElementVersions=[]).push("1.0.0-rc.2");const y=globalThis.trustedTypes,w=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,x=`lit$${(Math.random()+"").slice(9)}$`,S="?"+x,k=`<${S}>`,E=document,P=(t="")=>E.createComment(t),$=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,A=t=>{var e;return U(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])},C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,H=/>/g,z=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,N=/'/g,R=/"/g,O=/^(?:script|style|textarea)$/i,L=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),M=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),I=new WeakMap,_=E.createTreeWalker(E,129,null,!1),j=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":"",o=C;for(let e=0;e<s;e++){const s=t[e];let a,l,h=-1,c=0;for(;c<s.length&&(o.lastIndex=c,l=o.exec(s),null!==l);)c=o.lastIndex,o===C?"!--"===l[1]?o=T:void 0!==l[1]?o=H:void 0!==l[2]?(O.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=z):void 0!==l[3]&&(o=z):o===z?">"===l[0]?(o=null!=r?r:C,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?z:'"'===l[3]?R:N):o===R||o===N?o=z:o===T||o===H?o=C:(o=z,r=void 0);const d=o===z&&t[e+1].startsWith("/>")?" ":"";n+=o===C?s+k:h>=0?(i.push(a),s.slice(0,h)+"$lit$"+s.slice(h)+x+d):s+x+(-2===h?(i.push(void 0),e):d)}const a=n+(t[s]||"<?>")+(2===e?"</svg>":"");return[void 0!==w?w.createHTML(a):a,i]};class D{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[l,h]=j(t,e);if(this.el=D.createElement(l,s),_.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=_.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(x)){const s=h[n++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+"$lit$").split(x),e=/([.?@])?(.*)/.exec(s);a.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?J:"@"===e[1]?K:Y})}else a.push({type:6,index:r})}for(const e of t)i.removeAttribute(e)}if(O.test(i.tagName)){const t=i.textContent.split(x),e=t.length-1;if(e>0){i.textContent=y?y.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],P()),_.nextNode(),a.push({type:2,index:++r});i.append(t[e],P())}}}else if(8===i.nodeType)if(i.data===S)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(x,t+1));)a.push({type:7,index:r}),t+=x.length-1}r++}}static createElement(t,e){const s=E.createElement("template");return s.innerHTML=t,s}}function V(t,e,s=t,i){var r,n,o,a;if(e===M)return e;let l=void 0!==i?null===(r=s.Σi)||void 0===r?void 0:r[i]:s.Σo;const h=$(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null===(n=null==l?void 0:l.O)||void 0===n||n.call(l,!1),void 0===h?l=void 0:(l=new h(t),l.T(t,s,i)),void 0!==i?(null!==(o=(a=s).Σi)&&void 0!==o?o:a.Σi=[])[i]=l:s.Σo=l),void 0!==l&&(e=V(t,l.S(t,e.values),l,i)),e}class W{constructor(t,e){this.l=[],this.N=void 0,this.D=t,this.M=e}u(t){var e;const{el:{content:s},parts:i}=this.D,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:E).importNode(s,!0);_.currentNode=r;let n=_.nextNode(),o=0,a=0,l=i[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new q(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new Q(n,this,t)),this.l.push(e),l=i[++a]}o!==(null==l?void 0:l.index)&&(n=_.nextNode(),o++)}return r}v(t){let e=0;for(const s of this.l)void 0!==s&&(void 0!==s.strings?(s.I(t,s,e),e+=s.strings.length-2):s.I(t[e])),e++}}class q{constructor(t,e,s,i){this.type=2,this.N=void 0,this.A=t,this.B=e,this.M=s,this.options=i}setConnected(t){var e;null===(e=this.P)||void 0===e||e.call(this,t)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,e=this){t=V(this,t,e),$(t)?t===B||null==t||""===t?(this.H!==B&&this.R(),this.H=B):t!==this.H&&t!==M&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):A(t)?this.g(t):this.m(t)}k(t,e=this.B){return this.A.parentNode.insertBefore(t,e)}$(t){this.H!==t&&(this.R(),this.H=this.k(t))}m(t){const e=this.A.nextSibling;null!==e&&3===e.nodeType&&(null===this.B?null===e.nextSibling:e===this.B.previousSibling)?e.data=t:this.$(E.createTextNode(t)),this.H=t}_(t){var e;const{values:s,_$litType$:i}=t,r="number"==typeof i?this.C(t):(void 0===i.el&&(i.el=D.createElement(i.h,this.options)),i);if((null===(e=this.H)||void 0===e?void 0:e.D)===r)this.H.v(s);else{const t=new W(r,this),e=t.u(this.options);t.v(s),this.$(e),this.H=t}}C(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new D(t)),e}g(t){U(this.H)||(this.H=[],this.R());const e=this.H;let s,i=0;for(const r of t)i===e.length?e.push(s=new q(this.k(P()),this.k(P()),this,this.options)):s=e[i],s.I(r),i++;i<e.length&&(this.R(s&&s.B.nextSibling,i),e.length=i)}R(t=this.A.nextSibling,e){var s;for(null===(s=this.P)||void 0===s||s.call(this,!1,!0,e);t&&t!==this.B;){const e=t.nextSibling;t.remove(),t=e}}}class Y{constructor(t,e,s,i,r){this.type=1,this.H=B,this.N=void 0,this.V=void 0,this.element=t,this.name=e,this.M=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this.H=Array(s.length-1).fill(B),this.strings=s):this.H=B}get tagName(){return this.element.tagName}I(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=V(this,t,e,0),n=!$(t)||t!==this.H&&t!==M,n&&(this.H=t);else{const i=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=V(this,i[s+o],e,o),a===M&&(a=this.H[o]),n||(n=!$(a)||a!==this.H[o]),a===B?t=B:t!==B&&(t+=(null!=a?a:"")+r[o+1]),this.H[o]=a}n&&!i&&this.W(t)}W(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends Y{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===B?void 0:t}}class J extends Y{constructor(){super(...arguments),this.type=4}W(t){t&&t!==B?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class K extends Y{constructor(){super(...arguments),this.type=5}I(t,e=this){var s;if((t=null!==(s=V(this,t,e,0))&&void 0!==s?s:B)===M)return;const i=this.H,r=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==B&&(i===B||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this.H=t}handleEvent(t){var e,s;"function"==typeof this.H?this.H.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this.H.handleEvent(t)}}class Q{constructor(t,e,s){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=e,this.options=s}I(t){V(this,t)}}const X={Z:"$lit$",U:x,Y:S,q:1,X:j,tt:W,it:A,st:V,et:q,ot:Y,nt:J,rt:K,lt:Z,ht:Q};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var F,G,tt,et,st,it;null===(f=(g=globalThis).litHtmlPlatformSupport)||void 0===f||f.call(g,D,q),(null!==(m=(b=globalThis).litHtmlVersions)&&void 0!==m?m:b.litHtmlVersions=[]).push("2.0.0-rc.3"),(null!==(F=(it=globalThis).litElementVersions)&&void 0!==F?F:it.litElementVersions=[]).push("3.0.0-rc.2");class rt extends p{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();super.update(t),this.Φt=((t,e,s)=>{var i,r;const n=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let o=n._$litPart$;if(void 0===o){const t=null!==(r=null==s?void 0:s.renderBefore)&&void 0!==r?r:null;n._$litPart$=o=new q(e.insertBefore(P(),t),t,void 0,s)}return o.I(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1)}render(){return M}}rt.finalized=!0,rt._$litElement$=!0,null===(tt=(G=globalThis).litElementHydrateSupport)||void 0===tt||tt.call(G,{LitElement:rt}),null===(st=(et=globalThis).litElementPlatformSupport)||void 0===st||st.call(et,{LitElement:rt});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ot=t=>(...e)=>({_$litDirective$:t,values:e});class at{constructor(t){}T(t,e,s){this.Σdt=t,this.M=e,this.Σct=s}S(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{et:lt}=X,ht=()=>document.createComment(""),ct=(t,e,s)=>{var i;const r=t.A.parentNode,n=void 0===e?t.B:e.A;if(void 0===s){const e=r.insertBefore(ht(),n),i=r.insertBefore(ht(),n);s=new lt(e,i,t,t.options)}else{const e=s.B.nextSibling,o=s.M!==t;if(o&&(null===(i=s.Q)||void 0===i||i.call(s,t),s.M=t),e!==n||o){let t=s.A;for(;t!==e;){const e=t.nextSibling;r.insertBefore(t,n),t=e}}}return s},dt=(t,e,s=t)=>(t.I(e,s),t),ut={},vt=(t,e=ut)=>t.H=e,pt=t=>{var e;null===(e=t.P)||void 0===e||e.call(t,!1,!0);let s=t.A;const i=t.B.nextSibling;for(;s!==i;){const t=s.nextSibling;s.remove(),s=t}},gt=(t,e,s)=>{const i=new Map;for(let r=e;r<=s;r++)i.set(t[r],r);return i},ft=ot(class extends at{constructor(t){if(super(t),t.type!==nt.CHILD)throw Error("repeat() can only be used in text expressions")}Mt(t,e,s){let i;void 0===s?s=e:void 0!==e&&(i=e);const r=[],n=[];let o=0;for(const e of t)r[o]=i?i(e,o):o,n[o]=s(e,o),o++;return{values:n,keys:r}}render(t,e,s){return this.Mt(t,e,s).values}update(t,[e,s,i]){var r;const n=(t=>t.H)(t),{values:o,keys:a}=this.Mt(e,s,i);if(!n)return this.Pt=a,o;const l=null!==(r=this.Pt)&&void 0!==r?r:this.Pt=[],h=[];let c,d,u=0,v=n.length-1,p=0,g=o.length-1;for(;u<=v&&p<=g;)if(null===n[u])u++;else if(null===n[v])v--;else if(l[u]===a[p])h[p]=dt(n[u],o[p]),u++,p++;else if(l[v]===a[g])h[g]=dt(n[v],o[g]),v--,g--;else if(l[u]===a[g])h[g]=dt(n[u],o[g]),ct(t,h[g+1],n[u]),u++,g--;else if(l[v]===a[p])h[p]=dt(n[v],o[p]),ct(t,n[u],n[v]),v--,p++;else if(void 0===c&&(c=gt(a,p,g),d=gt(l,u,v)),c.has(l[u]))if(c.has(l[v])){const e=d.get(a[p]),s=void 0!==e?n[e]:null;if(null===s){const e=ct(t,n[u]);dt(e,o[p]),h[p]=e}else h[p]=dt(s,o[p]),ct(t,n[u],s),n[e]=null;p++}else pt(n[v]),v--;else pt(n[u]),u++;for(;p<=g;){const e=ct(t,h[g+1]);dt(e,o[p]),h[p++]=e}for(;u<=v;){const t=n[u++];null!==t&&pt(t)}return this.Pt=a,vt(t,h),M}}),mt=n`
    :host {
        display: inline-block;
        width: fit-content;
        height: fit-content;
        position: relative;
    }

    :host(:hover) {
        background-color: var(--surface2) !important;
        box-shadow: var(--shadow-colour) calc(var(--shadow-x) / 2) calc(var(--shadow-y) / 2) var(--shadow-spread);
        border-radius: 2vmin;
    }

    :host(.nav-selected) {
        background-color: var(--surface4) !important;
        box-shadow: var(--shadow-colour) calc(var(--shadow-x) / 2) calc(var(--shadow-y) / 2) var(--shadow-spread);
        border-radius: 2vmin;
    }

    :host-context([editing])::after {
        position: absolute;
        top: calc(50% - 1vmin);
        left: 10%;

        background-image: url(./images/drag.svg);
        background-size: contain;
        background-repeat: no-repeat;

        content: "";

        height: 2vmin;
        width: 2vmin;
    }

    @media (max-aspect-ratio: 1/1) {
        :host-context([editing])::after {
            transform: rotate(90deg);
            top: 10%;
            left: calc(50% - 1vmin);
        }
    }

    button {
        display: flex;

        width: 12vmin;
        height: 12vmin;

        padding: 0;

        background-color: transparent;
        border: none;
    }

    ::slotted(img) {
        margin: 3.3vmin;
        width: 5.4vmin;
        filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
    }
`,bt=n`
    :host {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: flex-start;
        flex-wrap: nowrap;
        
        flex-shrink: 0;
        
        background-color: var(--surface3);

        width: 12vmin;
        height: 88vmin;

        position: sticky;
        top: 0;
        left: 0;

        overflow-x: hidden;
        overflow-y: auto;

        box-shadow: var(--shadow-colour) calc(var(--shadow-x) / 2) calc(var(--shadow-y) / 2) var(--shadow-spread);
    
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
    }

    @media (max-aspect-ratio: 1/1) {
        :host {
            flex-direction: row;

            text-align: center;

            order: 100;

            width: 88%;
            height: 12vmin;

            margin-left: 12%;

            bottom: 0;
            left: 0;

            overflow-x: auto;
            overflow-y: hidden;
        }
    }

    :host(:hover), :host(.hover) {
        scrollbar-color: var(--text3) transparent;
    }

    :host::-webkit-scrollbar {
        width: 1vmin;
        height: 1vmin;
        display: none;
    }

    :host(:hover)::-webkit-scrollbar,
    :host(.hover)::-webkit-scrollbar {
        display: unset;
    }

    :host::-webkit-scrollbar-thumb {
        background-color: var(--text3);
    }

    :host::-webkit-scrollbar-track {
        background-color: transparent;
    }

    .end {
        position: fixed;
        left: 0;
        bottom: 0;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        height: fit-content;

        box-shadow: var(--shadow);

        background-color: var(--surface3);

        z-index: -1;
    }
`,yt=n`
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
`,wt=n`
    :host {
        position: absolute;
        top: 1vh;
        right: 1vw;
        min-width: min-content;
        width: 40vmin;
        padding: 2vh 2vw;
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
`,xt=n`
    :host {
        box-shadow: var(--shadow);
        background-color: var(--surface2);
        border-radius: 2vmin;
    }
`,St=n`
    :host {
        flex: 1;
        margin: 2vh 2%;
    }

    @media (max-aspect-ratio: 1/1) {
        :host {
            max-height: calc(96vh - 12vw);
        }
    }
`,kt=n`
    :where(img) {
        filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
        cursor: default;

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }
`,Et=n`
    :where(h1, h2, h3, h4, h5, h6, p, li) {
        margin: 0;
    }

    :where(*) {
        font-weight: 200;
        color: var(--text1);
        cursor: default;

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
    }
`,Pt=n`
    :where(button) {
        border: none;
        background-color: var(--surface4);
        color: var(--text4);
        padding: 1vmin 2vmin;
        border-radius: calc(var(--font-size) / 2.5);
        max-width: max-content;
        box-shadow: var(--shadow);
        font-size: var(--font-size);
    }

    :where(button:hover) {
        background-color: var(--surface3);
        color: var(--text2);
    }

    :where(button:hover img) {
        filter: initial hue-rotate(200);
    }

    :where(button:active) {
        color: var(--text1);
    }
`,$t=n`
    :where(input[type=range]) {
        appearance: none;
        width: calc(var(--font-size) * 7);
        background-color: var(--surface1);
        height: calc(var(--font-size) / 1.5);
        box-shadow: var(--shadow);
        border-radius: calc(var(--font-size) / 2.5);
    }

    :where(input[type=range])::-moz-range-thumb {
        background-color: var(--surface4);
        border-radius: 100%;
        width: calc(var(--font-size) / 1.5);
        height: calc(var(--font-size) / 1.5);
        border: none;
    }

    :where(input[type=range])::-webkit-slider-thumb {
        -webkit-appearance: none;
        background-color: var(--surface4);
        border-radius: 100%;
        width: calc(var(--font-size) / 1.5);
        height: calc(var(--font-size) / 1.5);
        border: none;
    }
`,Ut=n`
    :where(blockquote) {
        border-left: calc(var(--font-size) / 2) solid var(--surface4);
        margin: 0;
        padding-left: calc(var(--font-size) / 4 * 3);
    }
`,At=n`
    :where(select) {
        border: 0.2vmin solid var(--text2);
        background-color: var(--surface2);
        color: var(--text2);

        padding: 1vmin 0;
        padding-right: 6vmin;

        border-radius: 1vmin;

        max-width: max-content;

        font-size: calc(var(--font-size) / 1.2);

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    :where(option) {
        background-color: var(--surface2);
    }
`;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Ct extends rt{static get styles(){return mt}static get properties(){return{page:{type:String},title:{type:String}}}UpdatePage(){location.hash=this.page,""!=location.pathname&&(location.pathname=""),window.UpdatePage(),window.UpdateScreenType()}constructor(){super(),this.page="",this.title="",Tt.NavItems.push(this)}render(){return window.page==this.page?this.classList.add("nav-selected"):this.classList.remove("nav-selected"),L`
            <button @click="${this.UpdatePage}" title="${this.title}">
                <slot></slot>
            </button>
        `}}class Tt extends rt{static get styles(){return bt}static get properties(){return{pages:{type:Array},titles:{type:Array},icons:{type:Array},order:{type:Array}}}updatePage(){for(var t of Tt.NavItems)t.requestUpdate()}static NavItems=[];constructor(){super(),this.pages=[],this.titles=[],this.icons=[],this.order=[0,1,2,3,4,6,7,8,9,10,5]}createRenderRoot(){var t=super.createRenderRoot();return t.addEventListener("pointerdown",(()=>{this.classList.add("hover")})),t.addEventListener("pointerup",(()=>{this.classList.remove("hover")})),t}render(){return ft(this.order,(t=>t),((t,e)=>{var s,i,r;0==t?(s="dailytimetable",i="Daily Timetable",r="images/dailytimetable.svg"):1==t?(s="barcode",i="ID Barcode",r="images/barcode.svg"):2==t?(s="timetable",i="Timetable",r="images/timetable.svg"):3==t?(s="announcements",i="Announcements",r="images/announcements.svg"):4==t?(s="pages",i="Pages Marketplace",r="images/marketplace.svg"):5==t?(s="settings",i="Settings",r="images/settings.svg"):(s=`(page)${this.pages[t-6]}`,i=this.titles[t-6],r=this.icons[t-6]);var n=L`
                <nav-item page="${s}" title="${i}">
                    <img src="${r}" />
                </nav-item>
            `;return e==this.order.length-1&&(n=L`<div class="end">${n}</div>`),n}))}}class Ht extends rt{static get styles(){return yt}static get properties(){return{width:{type:String},height:{type:String}}}constructor(){super(),this.width="0",this.height="0"}render(){return L`
            <img draggable="false" class="spinner" src="images/rings.svg" />
        `}}class zt extends rt{static get styles(){return[xt,Et,Pt,wt]}async login(){await caches.delete("User Resources"),location.pathname="login"}constructor(){super()}render(){return L`
            <p>You need to log in to view the latest information.</p>

            <div class="buttons">
                <button @click=${this.login}>
                    Login
                </button>
                <button @click=${()=>this.remove()} class="dismiss">
                    Dismiss
                </button>
            </div>
        `}}customElements.define("nav-item",Ct),customElements.define("nav-bar",Tt),customElements.define("loading-element",Ht),customElements.define("login-notification",zt);export{B as A,Ht as L,Ct as N,L as T,ft as a,kt as b,xt as c,nt as d,ot as e,St as f,Ut as g,rt as h,n as i,At as j,Pt as k,$t as l,Tt as m,zt as n,at as s,Et as t,M as w};
