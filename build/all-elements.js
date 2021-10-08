/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol();class i{constructor(t,i){if(i!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return t&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const s=new Map,n=t=>{let n=s.get(t);return void 0===n&&s.set(t,n=new i(t,e)),n},a=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(t instanceof i)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return n(s)},o=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>n("string"==typeof t?t:t+""))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var r,l,d,h;const c={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},p=(t,e)=>e!==t&&(e==e||t==t),m={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:p};class u extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u()}static addInitializer(t){var e;null!==(e=this.v)&&void 0!==e||(this.v=[]),this.v.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this.Πp(i,e);void 0!==s&&(this.Πm.set(s,i),t.push(s))})),t}static createProperty(t,e=m){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||m}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static Πp(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this.ΠU)&&void 0!==e?e:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this.ΠU)||void 0===e||e.splice(this.ΠU.indexOf(t)>>>0,1)}Π_(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this.Πi.set(e,this[e]),delete this[e])}))}createRenderRoot(){var e;const i=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{t?e.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((t=>{const i=document.createElement("style");i.textContent=t.cssText,e.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0)}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})),this.Πo=new Promise((t=>this.Πl=t))}attributeChangedCallback(t,e,i){this.K(t,i)}Πj(t,e,i=m){var s,n;const a=this.constructor.Πp(t,i);if(void 0!==a&&!0===i.reflect){const o=(null!==(n=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==n?n:c.toAttribute)(e,i.type);this.Πh=t,null==o?this.removeAttribute(a):this.setAttribute(a,o),this.Πh=null}}K(t,e){var i,s,n;const a=this.constructor,o=a.Πm.get(t);if(void 0!==o&&this.Πh!==o){const t=a.getPropertyOptions(o),r=t.converter,l=null!==(n=null!==(s=null===(i=r)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof r?r:null)&&void 0!==n?n:c.fromAttribute;this.Πh=o,this[o]=l(e,t.type),this.Πh=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this.L.has(t)||this.L.set(t,e),!0===i.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this.Πg=this.Πq())}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo}catch(t){Promise.reject(t)}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,e)=>this[e]=t)),this.Πi=void 0);let e=!1;const i=this.L;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this.Π$()}catch(t){throw e=!1,this.Π$(),t}e&&this.E(i)}willUpdate(t){}E(t){var e;null===(e=this.ΠU)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}Π$(){this.L=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return!0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,e)=>this.Πj(e,this[e],t))),this.Πk=void 0),this.Π$()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g,v,y,f;u.finalized=!0,u.elementProperties=new Map,u.elementStyles=[],u.shadowRootOptions={mode:"open"},null===(l=(r=globalThis).reactiveElementPlatformSupport)||void 0===l||l.call(r,{ReactiveElement:u}),(null!==(d=(h=globalThis).reactiveElementVersions)&&void 0!==d?d:h.reactiveElementVersions=[]).push("1.0.0-rc.2");const b=globalThis.trustedTypes,w=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,x=`lit$${(Math.random()+"").slice(9)}$`,$="?"+x,S=`<${$}>`,k=document,E=(t="")=>k.createComment(t),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,B=t=>{var e;return N(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])},R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,z=/>/g,O=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,A=/'/g,I=/"/g,T=/^(?:script|style|textarea)$/i,U=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),j=new WeakMap,D=k.createTreeWalker(k,129,null,!1),M=(t,e)=>{const i=t.length-1,s=[];let n,a=2===e?"<svg>":"",o=R;for(let e=0;e<i;e++){const i=t[e];let r,l,d=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===R?"!--"===l[1]?o=P:void 0!==l[1]?o=z:void 0!==l[2]?(T.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=O):void 0!==l[3]&&(o=O):o===O?">"===l[0]?(o=null!=n?n:R,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,r=l[1],o=void 0===l[3]?O:'"'===l[3]?I:A):o===I||o===A?o=O:o===P||o===z?o=R:(o=O,n=void 0);const c=o===O&&t[e+1].startsWith("/>")?" ":"";a+=o===R?i+S:d>=0?(s.push(r),i.slice(0,d)+"$lit$"+i.slice(d)+x+c):i+x+(-2===d?(s.push(void 0),e):c)}const r=a+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==w?w.createHTML(r):r,s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,a=0;const o=t.length-1,r=this.parts,[l,d]=M(t,e);if(this.el=J.createElement(l,i),D.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=D.nextNode())&&r.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(x)){const i=d[a++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(x),e=/([.?@])?(.*)/.exec(i);r.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?F:"?"===e[1]?Y:"@"===e[1]?X:_})}else r.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(T.test(s.tagName)){const t=s.textContent.split(x),e=t.length-1;if(e>0){s.textContent=b?b.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],E()),D.nextNode(),r.push({type:2,index:++n});s.append(t[e],E())}}}else if(8===s.nodeType)if(s.data===$)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(x,t+1));)r.push({type:7,index:n}),t+=x.length-1}n++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function q(t,e,i=t,s){var n,a,o,r;if(e===H)return e;let l=void 0!==s?null===(n=i.Σi)||void 0===n?void 0:n[s]:i.Σo;const d=C(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(a=null==l?void 0:l.O)||void 0===a||a.call(l,!1),void 0===d?l=void 0:(l=new d(t),l.T(t,i,s)),void 0!==s?(null!==(o=(r=i).Σi)&&void 0!==o?o:r.Σi=[])[s]=l:i.Σo=l),void 0!==l&&(e=q(t,l.S(t,e.values),l,s)),e}class V{constructor(t,e){this.l=[],this.N=void 0,this.D=t,this.M=e}u(t){var e;const{el:{content:i},parts:s}=this.D,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:k).importNode(i,!0);D.currentNode=n;let a=D.nextNode(),o=0,r=0,l=s[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new W(a,a.nextSibling,this,t):1===l.type?e=new l.ctor(a,l.name,l.strings,this,t):6===l.type&&(e=new G(a,this,t)),this.l.push(e),l=s[++r]}o!==(null==l?void 0:l.index)&&(a=D.nextNode(),o++)}return n}v(t){let e=0;for(const i of this.l)void 0!==i&&(void 0!==i.strings?(i.I(t,i,e),e+=i.strings.length-2):i.I(t[e])),e++}}class W{constructor(t,e,i,s){this.type=2,this.N=void 0,this.A=t,this.B=e,this.M=i,this.options=s}setConnected(t){var e;null===(e=this.P)||void 0===e||e.call(this,t)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,e=this){t=q(this,t,e),C(t)?t===L||null==t||""===t?(this.H!==L&&this.R(),this.H=L):t!==this.H&&t!==H&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):B(t)?this.g(t):this.m(t)}k(t,e=this.B){return this.A.parentNode.insertBefore(t,e)}$(t){this.H!==t&&(this.R(),this.H=this.k(t))}m(t){const e=this.A.nextSibling;null!==e&&3===e.nodeType&&(null===this.B?null===e.nextSibling:e===this.B.previousSibling)?e.data=t:this.$(k.createTextNode(t)),this.H=t}_(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this.C(t):(void 0===s.el&&(s.el=J.createElement(s.h,this.options)),s);if((null===(e=this.H)||void 0===e?void 0:e.D)===n)this.H.v(i);else{const t=new V(n,this),e=t.u(this.options);t.v(i),this.$(e),this.H=t}}C(t){let e=j.get(t.strings);return void 0===e&&j.set(t.strings,e=new J(t)),e}g(t){N(this.H)||(this.H=[],this.R());const e=this.H;let i,s=0;for(const n of t)s===e.length?e.push(i=new W(this.k(E()),this.k(E()),this,this.options)):i=e[s],i.I(n),s++;s<e.length&&(this.R(i&&i.B.nextSibling,s),e.length=s)}R(t=this.A.nextSibling,e){var i;for(null===(i=this.P)||void 0===i||i.call(this,!1,!0,e);t&&t!==this.B;){const e=t.nextSibling;t.remove(),t=e}}}class _{constructor(t,e,i,s,n){this.type=1,this.H=L,this.N=void 0,this.V=void 0,this.element=t,this.name=e,this.M=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this.H=Array(i.length-1).fill(L),this.strings=i):this.H=L}get tagName(){return this.element.tagName}I(t,e=this,i,s){const n=this.strings;let a=!1;if(void 0===n)t=q(this,t,e,0),a=!C(t)||t!==this.H&&t!==H,a&&(this.H=t);else{const s=t;let o,r;for(t=n[0],o=0;o<n.length-1;o++)r=q(this,s[i+o],e,o),r===H&&(r=this.H[o]),a||(a=!C(r)||r!==this.H[o]),r===L?t=L:t!==L&&(t+=(null!=r?r:"")+n[o+1]),this.H[o]=r}a&&!s&&this.W(t)}W(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class F extends _{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===L?void 0:t}}class Y extends _{constructor(){super(...arguments),this.type=4}W(t){t&&t!==L?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class X extends _{constructor(){super(...arguments),this.type=5}I(t,e=this){var i;if((t=null!==(i=q(this,t,e,0))&&void 0!==i?i:L)===H)return;const s=this.H,n=t===L&&s!==L||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,a=t!==L&&(s===L||n);n&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,t),this.H=t}handleEvent(t){var e,i;"function"==typeof this.H?this.H.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this.H.handleEvent(t)}}class G{constructor(t,e,i){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=e,this.options=i}I(t){q(this,t)}}const Z={Z:"$lit$",U:x,Y:$,q:1,X:M,tt:V,it:B,st:q,et:W,ot:_,nt:Y,rt:X,lt:F,ht:G};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var K,Q,tt,et,it,st;null===(v=(g=globalThis).litHtmlPlatformSupport)||void 0===v||v.call(g,J,W),(null!==(y=(f=globalThis).litHtmlVersions)&&void 0!==y?y:f.litHtmlVersions=[]).push("2.0.0-rc.3"),(null!==(K=(st=globalThis).litElementVersions)&&void 0!==K?K:st.litElementVersions=[]).push("3.0.0-rc.2");class nt extends u{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();super.update(t),this.Φt=((t,e,i)=>{var s,n;const a=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let o=a._$litPart$;if(void 0===o){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;a._$litPart$=o=new W(e.insertBefore(E(),t),t,void 0,i)}return o.I(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1)}render(){return H}}nt.finalized=!0,nt._$litElement$=!0,null===(tt=(Q=globalThis).litElementHydrateSupport)||void 0===tt||tt.call(Q,{LitElement:nt}),null===(it=(et=globalThis).litElementPlatformSupport)||void 0===it||it.call(et,{LitElement:nt});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at=2,ot=t=>(...e)=>({_$litDirective$:t,values:e});class rt{constructor(t){}T(t,e,i){this.Σdt=t,this.M=e,this.Σct=i}S(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{et:lt}=Z,dt=()=>document.createComment(""),ht=(t,e,i)=>{var s;const n=t.A.parentNode,a=void 0===e?t.B:e.A;if(void 0===i){const e=n.insertBefore(dt(),a),s=n.insertBefore(dt(),a);i=new lt(e,s,t,t.options)}else{const e=i.B.nextSibling,o=i.M!==t;if(o&&(null===(s=i.Q)||void 0===s||s.call(i,t),i.M=t),e!==a||o){let t=i.A;for(;t!==e;){const e=t.nextSibling;n.insertBefore(t,a),t=e}}}return i},ct=(t,e,i=t)=>(t.I(e,i),t),pt={},mt=(t,e=pt)=>t.H=e,ut=t=>{var e;null===(e=t.P)||void 0===e||e.call(t,!1,!0);let i=t.A;const s=t.B.nextSibling;for(;i!==s;){const t=i.nextSibling;i.remove(),i=t}},gt=(t,e,i)=>{const s=new Map;for(let n=e;n<=i;n++)s.set(t[n],n);return s},vt=ot(class extends rt{constructor(t){if(super(t),t.type!==at)throw Error("repeat() can only be used in text expressions")}Mt(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const n=[],a=[];let o=0;for(const e of t)n[o]=s?s(e,o):o,a[o]=i(e,o),o++;return{values:a,keys:n}}render(t,e,i){return this.Mt(t,e,i).values}update(t,[e,i,s]){var n;const a=(t=>t.H)(t),{values:o,keys:r}=this.Mt(e,i,s);if(!a)return this.Pt=r,o;const l=null!==(n=this.Pt)&&void 0!==n?n:this.Pt=[],d=[];let h,c,p=0,m=a.length-1,u=0,g=o.length-1;for(;p<=m&&u<=g;)if(null===a[p])p++;else if(null===a[m])m--;else if(l[p]===r[u])d[u]=ct(a[p],o[u]),p++,u++;else if(l[m]===r[g])d[g]=ct(a[m],o[g]),m--,g--;else if(l[p]===r[g])d[g]=ct(a[p],o[g]),ht(t,d[g+1],a[p]),p++,g--;else if(l[m]===r[u])d[u]=ct(a[m],o[u]),ht(t,a[p],a[m]),m--,u++;else if(void 0===h&&(h=gt(r,u,g),c=gt(l,p,m)),h.has(l[p]))if(h.has(l[m])){const e=c.get(r[u]),i=void 0!==e?a[e]:null;if(null===i){const e=ht(t,a[p]);ct(e,o[u]),d[u]=e}else d[u]=ct(i,o[u]),ht(t,a[p],i),a[e]=null;u++}else ut(a[m]),m--;else ut(a[p]),p++;for(;u<=g;){const e=ht(t,d[g+1]);ct(e,o[u]),d[u++]=e}for(;p<=m;){const t=a[p++];null!==t&&ut(t)}return this.Pt=r,mt(t,d),H}}),yt=a`
    :host {
        display: inline-block;
        width: 12vmin;
        height: 12vmin;
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

    #handle {
        width: 1.5vmin;
        height: 12vmin;
        margin-left: 0.75vmin;
    }

    #handle:hover {
        cursor: grab;
    }

    button {
        display: flex;

        width: 12vmin;
        height: 12vmin;

        padding: 0;

        background-color: transparent;
        border: none;
    }

    :host([editing])::before {
        content: "";

        background-image: url(/images/drag.svg);
        background-repeat: no-repeat;
        background-size: contain;
        filter: hue-rotate(var(--hue-rotate)) invert(var(--img-invert));
        
        position: absolute;
        top: calc(50% - 1vmin);
        left: 1vmin;

        display: block;
        
        width: 2vmin;
        height: 2vmin;
    }

    ::slotted(img) {
        margin: 3.3vmin;
        width: 5.4vmin;
        filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
    }
`,ft=a`
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        flex-shrink: 0;

        background-color: var(--surface3);
        box-shadow: var(--shadow-colour) calc(var(--shadow-x) / 2) calc(var(--shadow-y) / 2) calc(var(--shadow-spread) / 2);

        width: 12vmin;
        height: 100%;

        overflow: hidden;

        border-radius: 0 2vmin 2vmin 0;

        box-sizing: border-box;
        padding-bottom: 12vmin;
    }

    #items-container {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: flex-start;
        flex-wrap: nowrap;
        
        width: 100%;
        height: 100%;

        overflow-x: hidden;
        overflow-y: auto;
    
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
    }

    .end {
        position: absolute;
        left: 0;
        bottom: 0;
    }

    .end > nav-item {
        border-radius: 0 0 2vmin 0;
    }

    @media (max-aspect-ratio: 1/1) {
        :host {
            order: 100;

            width: 100%;
            height: 12vmin;

            border-radius: 2vmin 2vmin 0 0;

            padding-bottom: 0;
            padding-left: 12%;
        }

        #items-container {
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;

            overflow-x: auto;
            overflow-y: hidden;
        }

        .end > nav-item {
            border-radius: 2vmin 0 0 0;
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
        left: 12vmin;
        --angle: 90deg;
    }

    #right-shadow {
        border-radius: 0 2vmin 0 0;
        right: 0;
        --angle: -90deg;
    }
`,bt=a`
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
`,wt=a`
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
`,xt=a`
    :host {
        box-shadow: var(--shadow);
        background-color: var(--surface2);
        border-radius: 2vmin;
    }
`,$t=a`
    :host {
        flex: 1;
        margin: 2vh 2%;
    }

    @media (max-aspect-ratio: 1/1) {
        :host {
            max-height: calc(96vh - 12vw);
        }
    }

    /*
        104% of 300px.
        We use 104% because that includes the margin,
        which is 2% either side.
    */
    @media (max-width: 312px) {
        :host {
            margin: 2vh calc(50% - 150px);
        }
    }

    @media (max-width: 300px) {
        :host {
            margin: 2vh 0;
        }
    }
`,St=a`
    :where(img) {
        filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
        cursor: default;

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }
`,kt=a`
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
`,Et=a`
    :where(button) {
        border: solid 0.2vmin var(--surface4);
        background-color: var(--surface2);
        color: var(--text2);
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

    :where(button:active) {
        border: solid 0.2vmin transparent;
        color: var(--text4);
        text-shadow: 0.2vmin 0.2vmin var(--shadow-colour);
        background-color: var(--surface4);
    }
`,Ct=a`
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
`,Nt=a`
    :where(blockquote) {
        border-left: calc(var(--font-size) / 2) solid var(--surface4);
        margin: 0;
        padding-left: calc(var(--font-size) / 4 * 3);
    }
`,Bt=a`
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
 */class Rt extends nt{static get styles(){return yt}static get properties(){return{page:{type:String},title:{type:String},editing:{type:Boolean},order:{type:Number}}}UpdatePage(){location.hash=this.page,""!=location.pathname&&(location.pathname=""),window.UpdatePage(),window.UpdateScreenType(),document.getElementById("nav").removeAttribute("editing")}static draggingOrder=0;static draggingX=0;static draggingY=0;constructor(){super(),this.page="",this.title="",this.editing=!1,this.order=0,this.dragging=!1,this.addEventListener("dragstart",(()=>{this.style.opacity="0.5",this.style.boxShadow="none",this.dragging=!0,window.page!=this.page&&this.classList.add("nav-selected"),Rt.draggingOrder=this.order,Rt.draggingX=this.offsetLeft,Rt.draggingY=this.offsetTop})),this.addEventListener("drag",(t=>{Rt.draggingX=t.clientX,Rt.draggingY=t.clientY})),this.addEventListener("dragover",(t=>{if(t.preventDefault(),this.dragging)return!1;var e=document.getElementById("nav"),i=e.getAttribute("order");(i=i?JSON.parse(i):[0,1,2,3,4,5]).splice(i.indexOf(Rt.draggingOrder),1);var s=i.indexOf(this.order)||0;return matchMedia("(max-aspect-ratio: 1/1)").matches?Rt.draggingX>this.offsetLeft+this.clientWidth/2?i.splice(s+1,0,Rt.draggingOrder):i.splice(s,0,Rt.draggingOrder):Rt.draggingY<this.offsetTop+this.clientHeight/2?i.splice(s+1,0,Rt.draggingOrder):i.splice(s,0,Rt.draggingOrder),e.setAttribute("order",JSON.stringify(i)),!1})),this.addEventListener("dragend",(()=>{this.style.removeProperty("opacity"),this.style.removeProperty("box-shadow"),this.dragging=!1,window.page!=this.page&&this.classList.remove("nav-selected")}))}render(){return window.page==this.page?this.classList.add("nav-selected"):this.classList.remove("nav-selected"),this.draggable=this.editing,U`
            <button @click="${this.UpdatePage}" title="${this.title}">
                <slot></slot>
            </button>

            ${L}
        `}}customElements.define("nav-item",Rt),customElements.define("nav-bar",class extends nt{static get styles(){return ft}static get properties(){return{pages:{type:Array},titles:{type:Array},icons:{type:Array},order:{type:Array},editing:{type:Boolean}}}updatePage(){for(var t of this.shadowRoot.querySelectorAll("nav-item"))t.requestUpdate()}GetNavItem(t){var e,i,s;return 0==t?(e="dailytimetable",i="Daily Timetable",s="images/dailytimetable.svg"):1==t?(e="barcode",i="ID Barcode",s="images/barcode.svg"):2==t?(e="timetable",i="Timetable",s="images/timetable.svg"):3==t?(e="announcements",i="Announcements",s="images/announcements.svg"):4==t?(e="pages",i="Pages Marketplace",s="images/marketplace.svg"):5==t?(e="settings",i="Settings",s="images/settings.svg"):(e=`(page)${this.pages[t-6]}`,i=this.titles[t-6],s=this.icons[t-6]),U`
            <nav-item order="${t}" ?editing="${this.editing}" page="${e}" title="${i}">
                <img draggable="false" src="${s}" />
            </nav-item>
        `}ShowShadows(){var t=this.shadowRoot.getElementById("items-container"),e=this.shadowRoot.getElementById("top-shadow"),i=this.shadowRoot.getElementById("bottom-shadow"),s=this.shadowRoot.getElementById("left-shadow"),n=this.shadowRoot.getElementById("right-shadow");matchMedia("(max-aspect-ratio: 1/1)").matches?(e.style.display="none",i.style.display="none",0==t.scrollLeft?s.style.display="none":s.style.removeProperty("display"),t.scrollLeft>=t.scrollWidth-t.clientWidth-1?n.style.display="none":n.style.removeProperty("display")):(s.style.display="none",n.style.display="none",0==t.scrollTop?e.style.display="none":e.style.removeProperty("display"),t.scrollTop>=t.scrollHeight-t.clientHeight-1?i.style.display="none":i.style.removeProperty("display"))}constructor(){super(),this.pages=[],this.titles=[],this.icons=[],this.order=[0,1,2,3,4,5],this.editing=!1,matchMedia("(max-aspect-ratio: 1/1)").onchange=(()=>{this.ShowShadows()}).bind(this)}createRenderRoot(){var t=super.createRenderRoot();return t.addEventListener("pointerdown",(()=>{this.shadowRoot.getElementById("items-container").classList.add("hover")})),t.addEventListener("pointerup",(()=>{this.shadowRoot.getElementById("items-container").classList.remove("hover")})),t}updated(){this.shadowRoot.getElementById("items-container").addEventListener("scroll",this.ShowShadows.bind(this)),this.ShowShadows()}render(){var t=this.order.pop();return U`
            <div id="items-container">
                <div id="top-shadow" style="display: none"></div>
                <div id="bottom-shadow" style="display: none"></div>
                <div id="left-shadow" style="display: none"></div>
                <div id="right-shadow" style="display: none"></div>

                ${vt(this.order,(t=>t),(t=>this.GetNavItem(t)))}
            </div>
            <div class="end">
                ${this.GetNavItem(t)}
            </div>
        `}}),customElements.define("loading-element",class extends nt{static get styles(){return bt}render(){return U`
            <img draggable="false" class="spinner" src="images/rings.svg" />
        `}}),customElements.define("login-notification",class extends nt{static get styles(){return[xt,kt,Et,wt]}async login(){await caches.delete("User Resources"),location.pathname="login"}constructor(){super()}render(){return U`
            <p>You need to log in to view the latest information.</p>

            <div class="buttons">
                <button @click=${this.login}>
                    Login
                </button>
                <button @click=${()=>this.remove()} class="dismiss">
                    Dismiss
                </button>
            </div>
        `}});const Pt=a`
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
`,zt=a`
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
`,Ot=a`
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
        border-bottom: 0.2vmin solid gray;
    }

    .line-right {
        margin-right: 2vmin;
    }

    .line-left {
        margin-left: 2vmin;
    }
`;customElements.define("bell-item",class extends nt{static get styles(){return[kt,Pt]}static get properties(){return{name:{type:String},time:{type:String}}}constructor(){super(),this.name="",this.time="00:00"}render(){return U`
            <p class="start">${this.name}</p>
            <p class="end">${this.time}</p>
        `}}),customElements.define("payload-bell-item",class extends nt{static get styles(){return[kt,Pt,zt]}static get properties(){return{time:{type:String},timeChanged:{type:Boolean},name:{type:String},room:{type:String},roomChanged:{type:Boolean},teacher:{type:String},teacherChanged:{type:Boolean}}}constructor(){super(),this.time="",this.timeChanged=!1,this.name="",this.room="",this.roomChanged=!1,this.teacher="",this.teacherChanged=!1}render(){var t=this.timeChanged?"changed":"",e=this.teacherChanged?"changed":"",i=this.roomChanged?"changed":"";return U`
            <div>
                <p class="start">${this.name}</p>
                <p class="sub">at <span class="sub ${t}">${this.time}</span> with <span class="sub ${e}">${this.teacher}</span></p>
            </div>
            
            <p class="end ${i}">${this.room}</p>
        `}}),customElements.define("daily-timetable",class extends nt{static get styles(){return[kt,xt,Ot]}static get properties(){return{data:{type:Object}}}getDate(t){var e=new Date(this.data.date),i=t.time.split(":"),s=Number.parseInt(i[0]),n=Number.parseInt(i[1]);return e.setHours(s),e.setMinutes(n),e}getNextBell(){if(null!=this.data&&null!=this.data){var t=new Date;for(var e in this.data.bells){var i=this.data.bells[e],s=this.getDate(i);if(s>=t)return{bell:i,time:Math.round((s-t)/1e3)}}}}secondsToString(t){var e=t%60,i=(t-e)/60%60,s=((t-e)/60-i)/60;s<10&&(s="0"+s),i<10&&(i="0"+i),e<10&&(e="0"+e);var n="";return"00"!==s&&(n+=s+":"),n+=i+":"+e}updateCountdown(){if(this.hasAttribute("data")){var t=this.getNextBell();if(!t&&this.hasAttribute("data")&&this.data)this.gettingNextDay||(this.gettingNextDay=!0,caches.open(window.RESOURCE_CACHE).then((async t=>{var e=await t.match("next-dailytimetable");if(e){await t.put("dailytimetable",e);var i=await e.text();await t.delete("next-dailytimetable"),this.setAttribute("data",i)}else{this.removeAttribute("data"),this.data=null,this.requestUpdate();var s=await LoginIfNeeded();await UpdateResourcesIfNeeded(s,!0)&&location.reload()}})));else{if(t.bell.bell in this.data.timetable.timetable.periods&&"R"!=t.bell.bell){var e=this.data.timetable.timetable.periods[t.bell.bell];this.nextBell=this.getClassName(e)}else this.nextBell=t.bell.bellDisplay;this.timeUntilNextBell=this.secondsToString(t.time)}}}getClassName(t){var e=this.data.timetable.subjects[`${t.year}${t.title}`].title;return this.formatClassName(e)}formatClassName(t){return t.split(" ").filter((t=>isNaN(t)&&t.length>1)).join(" ")}static gettingNextDay=!1;constructor(){super(),this.nextBell="Nothing",this.timeUntilNextBell="00:00",setInterval((()=>{this.updateCountdown(),this.requestUpdate()}),1e3),this.data={date:"",bells:[],timetable:{timetable:{periods:{}},subjects:{}},roomVariations:[],classVariations:[]},this.gettingNextDay=!1,this.firstRender=!0}render(){return this.hasAttribute("data")&&null!=this.data&&null!=this.data?(this.firstRender&&(this.firstRender=!1,this.updateCountdown()),U`
            <p>${this.nextBell}</p>
            <p>in</p>

            <div class="timer-container">
                <span class="line-right"></span>
                <p id="timer">${this.timeUntilNextBell}</p>
                <span class="line-left"></span>
            </div>

            ${vt(this.data.bells,(t=>t.time),(t=>{var e=this.data.timetable.timetable.periods[t.bell];if(e){if("R"==t.bell)return L;var i=e.room,s=!1;if(t.bell in this.data.roomVariations){var n=this.data.roomVariations[t.bell];e.year==n.year&&(s=!0,i=n.roomTo)}var a=e.fullTeacher,o=!1;if(t.bell in this.data.classVariations){n=this.data.classVariations[t.bell];e.year==n.year&&(o=!0,a=n.casualSurname)}var r=this.getClassName(e);return U`
                                <payload-bell-item name="${r}"
                                                   time="${t.time}"
                                                   ?timechanged="${""!=t.reason}"
                                                   room="${i}"
                                                   ?roomChanged="${s}"
                                                   teacher="${""==a?"No one":a}"
                                                   ?teacherChanged="${o}">
                                </payload-bell-item>`}return"Transition"==t.bell||"End of Day"==t.bell?L:U`<bell-item name="${t.bellDisplay}" time="${t.time}"></bell-item>`}))}
        `):U`
                <loading-element style="width: 80%"></loading-element>
            `}});const At=a`
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
        filter: hue-rotate(var(--hue-rotate));
        width: var(--font-size);
        height: var(--font-size);
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
        top: 1vmin;
        right: 1vmin;
        width: 4vmin;
        height: 4vmin;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border: none;
    }
`;customElements.define("student-barcode",class extends nt{static get styles(){return[kt,St,$t,xt,At]}static get properties(){return{data:{type:Object}}}ShowDescription(){this.shadowRoot.getElementById("descriptionContent").style.display=""}HideDescription(){this.shadowRoot.getElementById("descriptionContent").style.display="none"}GetPercentageFromPixels(t,e){return{x:(t-this.offsetLeft)/this.clientWidth*100,y:(e-this.offsetTop)/this.clientHeight*100}}async RequestBarcodeSize(){var t,e,i,s,n=this.shadowRoot.getElementById("point1"),a=this.shadowRoot.getElementById("point2"),o=this.shadowRoot.getElementById("info"),r=this.shadowRoot.getElementById("barcode-canv");o.style.display="",r.style.display="none",n.style.display="none",a.style.display="none";var l=new Promise((o=>{var r=0;this.addEventListener("pointerdown",(l=>{if(1==++r){var{x:d,y:h}=this.GetPercentageFromPixels(l.clientX,l.clientY);t=d,e=h,n.style.left=`${d}%`,n.style.top=`${h}%`,n.style.display=""}else if(2==r){var{x:d,y:h}=this.GetPercentageFromPixels(l.clientX,l.clientY);i=d,s=h,a.style.left=`${d}%`,a.style.top=`${h}%`,a.style.display="",this.removeEventListener("pointerdown",this),o()}}))}));await l,localStorage.setItem("Barcode Size",`${t} ${e} ${i} ${s}`),o.style.display="none",r.style.display="",this.UpdateBarcodeSize()}UpdateBarcodeSize(){var t,e,i,s,n=this.shadowRoot.getElementById("point1"),a=this.shadowRoot.getElementById("point2"),o=this.shadowRoot.getElementById("barcode-canv"),r=parseFloat(n.style.left.replace("%","")),l=parseFloat(n.style.top.replace("%","")),d=parseFloat(a.style.left.replace("%","")),h=parseFloat(a.style.top.replace("%",""));r>d?(t=r,e=d):(t=d,e=r),l>h?(i=l,s=h):(i=h,s=l),o.style.top=`${s}%`,o.style.left=`${e}%`,o.style.width=t-e+"%",o.style.height=i-s+"%",JsBarcode(o,this.data.studentId,{displayValue:!1,margin:0})}CreateBarcode(){if(this.shadowRoot){var t,e,i,s,n=this.shadowRoot.getElementById("point1"),a=this.shadowRoot.getElementById("point2"),o=this.shadowRoot.getElementById("barcode-canv");if(n&&a&&o){o.imageSmoothingEnabled=!1;var r=localStorage.getItem("Barcode Size");if(r){var[t,i,e,s]=r.split(" ");n.style.left=`${t}%`,n.style.top=`${i}%`,a.style.left=`${e}%`,a.style.top=`${s}%`}else n.style.left="80%",n.style.top="10%",a.style.left="20%",a.style.top="30%";this.UpdateBarcodeSize(),o.style.display="",n.style.display="",a.style.display=""}}}constructor(){super(),this.data={studentId:""}}updated(){this.CreateBarcode()}render(){return this.hasAttribute("data")?U`
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
        `:U`<loading-element style="width: 80%"></loading-element>`}});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class It extends rt{constructor(t){if(super(t),this.vt=L,t.type!==at)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===L)return this.Vt=void 0,this.vt=t;if(t===H)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.vt)return this.Vt;this.vt=t;const e=[t];return e.raw=e,this.Vt={_$litType$:this.constructor.resultType,strings:e,values:[]}}}It.directiveName="unsafeHTML",It.resultType=1;const Tt=ot(It),Ut=a`
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
`,Ht=a`
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
        border-bottom: 0.2vmin solid gray;
    }

    .line-right {
        margin-right: 2vmin;
    }

    .line-left {
        margin-left: 2vmin;
    }
`;customElements.define("announcement-item",class extends nt{static get styles(){return[kt,Nt,St,Ut]}static get properties(){return{title:{type:String},content:{type:String},displayYears:{type:String},author:{type:String},time:{type:String}}}toggle(){this.collapsed=!this.collapsed,this.requestUpdate()}constructor(){super(),this.title="",this.content="",this.displayYears="",this.author="",this.time=null,this.collapsed=!0}render(){return U`
            <p class="title" @click="${this.toggle}">${this.title}</p>
            <p class="sub">For ${this.displayYears} ${this.time?"| At "+this.time+" ":""}| By ${this.author}</p>
            <blockquote id="content" class="content ${this.collapsed?"collapsed":"expanded"}">
                ${Tt(this.content)}
            </blockquote>
            <img @click="${this.toggle}" class="toggle" src="images/toggle.svg" />
        `}}),customElements.define("school-announcements",class extends nt{static get styles(){return[kt,Bt,$t,xt,Ht]}static get properties(){return{data:{type:Object}}}updateFilter(t){this.filter=t.target.value,this.requestUpdate()}constructor(){super(),this.data={notices:[]},this.filter="all"}render(){if(!this.hasAttribute("data"))return U`<loading-element style="width: 80%; margin: auto;"></loading-element>`;if(0==this.data.notices.length)return U`
                <div class="header" style="min-width: unset; width: 80%; margin: 0 auto;">
                    <div class="line-right"></div>
                    <p>Nothing For Today</p>
                    <div class="line-left"></div>
                </div>
            `;var t=[];return t=(t="all"!=this.filter&&""!=this.filter?this.data.notices.filter((t=>t.years.includes(this.filter))):this.data.notices).sort(((t,e)=>e.relativeWeight-t.relativeWeight)),U`
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
                ${0==t.length?U`
                        <div style="align-self: center; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                            <p>Nothing For This Filter</p>
                        </div>
                    `:vt(t,(t=>t.title),(t=>U`
                        <announcement-item title="${t.title}"
                                           content="${t.content}"
                                           displayYears="${t.displayYears}"
                                           author="${t.authorName}"
                                           time="${t.isMeeting?t.meetingTime:""}">
                        </announcement-item>
                    `))}
            </div>
        `}});const Lt=a`
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
            z-index: 99;
        }

        to {
            filter: opacity(1) hue-rotate(var(--hue-rotate));
            z-index: 99;
        }
    }

    @media (max-aspect-ratio: 3/4) {
        p {
            width: 8vmax;
            height: 3vmax;
            margin-top: 1.7vmax;
        }
    }
`,jt=a`
    .highlighted {
        background-color: var(--surface4);
        color: var(--text4);
        text-shadow: 0.2vmin 0.2vmin var(--shadow-colour);
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
`,Dt=a`
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
        border-bottom: solid grey 0.2vmin;
    }

    .highlighted {
        color: var(--text2);
    }
`,Mt=a`
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
`,Jt=a`
    :host {
        margin: auto;
        padding: 4vmin;
        max-width: 92%;
    }

    timetable-row + timetable-row {
        border-top: solid grey 0.2vmin;
    }
`;class qt extends nt{static get styles(){return[kt,jt]}static get properties(){return{name:{type:String},room:{type:String}}}static highlighted="";static instances=[];static highlight(t){this.highlighted=t,this.instances.forEach((t=>t.requestUpdate()))}constructor(){super(),qt.instances.push(this),this.name="",this.room="",this.addEventListener("mouseover",(()=>qt.highlight(this.name))),this.addEventListener("mouseleave",(()=>qt.highlight("")))}render(){var t=qt.highlighted==this.name&&this.name,e=this.nextElementSibling,i=e?.nextElementSibling,s=e?.getAttribute("name")==this.name||i?.getAttribute("name")==this.name;return U`
            <div>
                <p class="${t?"highlighted":""}">
                    ${this.name}
                </p>
                ${t?s?U`
                            <room-popup style="top: ${this.offsetTop-1.5*this.clientHeight-.5}px"
                                        room="${this.room}"
                                        class="reversed"
                                        @mouseover=${()=>qt.highlight("")}>
                            </room-popup>
                        `:U`
                            <room-popup style="top: ${this.offsetTop+this.clientHeight+.5}px"
                                        room="${this.room}"
                                        @mouseover=${()=>qt.highlight("")}>
                            </room-popup>
                        `:L}
            </div>
        `}}customElements.define("room-popup",class extends nt{static get styles(){return Lt}static get properties(){return{room:{type:String}}}constructor(){super(),this.room=""}render(){return U`
            <p>${this.room}</p>
        `}}),customElements.define("timetable-period",qt),customElements.define("timetable-day",class extends nt{static get styles(){return[kt,Dt]}static get properties(){return{name:{type:String},data:{type:Object},day:{type:String}}}constructor(){super(),this.name="",this.data={},this.day=""}render(){return U`
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
        `}}),customElements.define("timetable-row",class extends nt{static get styles(){return[kt,Mt]}static get properties(){return{week:{type:String},day1:{type:Object},day2:{type:Object},day3:{type:Object},day4:{type:Object},day5:{type:Object},day:{type:String}}}constructor(){super(),this.week="",this.day1={},this.day2={},this.day3={},this.day4={},this.day5={},this.day=""}render(){return U`
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
        `}}),customElements.define("full-timetable",class extends nt{static get styles(){return[xt,Jt]}static get properties(){return{data:{type:Object},day:{type:String}}}constructor(){super(),this.data={days:{}},this.day=""}render(){return this.hasAttribute("data")?(this.day=this.day.slice(0,3).toUpperCase()+" "+this.day.slice(-1),U`
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
        `):U`<loading-element style="width: 80%; margin: auto;"></loading-element>`}});const Vt=a`

`;customElements.define("pages-marketplace",class extends nt{static get styles(){return[$t,xt,Vt]}static get properties(){return{data:{type:Object}}}constructor(){super(),this.data={}}render(){return U`
            <div></div>
        `}});const Wt=a`
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
        min-height: 70vh;
    }

    @media (max-width: 300px) {
        :host {
            width: 100vw !important;
            min-width: unset !important;
            max-width: unset !important;
        }
    }

    span {
        border-bottom: 0.2vmin solid gray;
        width: 60%;
    }

    .toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        padding: 1vmin;
    }

    .toggleImg {
        width: calc(var(--font-size) * 2);
    }

    .editImg {
        width: calc(var(--font-size) * 1.8);
        padding: calc(var(--font-size) * 0.1);
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

    .exit {
        position: absolute;
        top: 1vmin;
        right: 1vmin;

        width: 3vmin;
        height: 3vmin;

        padding: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: transparent;
        border: none;
        box-shadow: none;
    }

    .exit > img {
        width: inherit;
        height: inherit;
    }
`;customElements.define("user-settings",class extends nt{static get styles(){return[kt,St,Et,Ct,xt,Wt]}ShowDescription(t){this.shadowRoot.getElementById("descriptionContent").style.display="unset",t.stopPropagation()}ToggleDark(){window.isDark()?localStorage.setItem("Dark","false"):localStorage.setItem("Dark","true"),window.UpdateScreenType(),this.requestUpdate()}async Patch(){await caches.delete("Metadata"),await caches.delete("Offline Resources"),(await navigator.serviceWorker.ready).active.postMessage({command:"metadata-fetch"}),location.reload()}SetColour(){var t=document.getElementsByTagName("html")[0].style,e=this.shadowRoot.getElementById("hue").value;t.setProperty("--main-hue",e),t.setProperty("--hue-rotate",parseFloat(e)-200+"deg")}SaveColour(){localStorage.setItem("Hue",this.shadowRoot.getElementById("hue").value)}ResetColour(){this.shadowRoot.getElementById("hue").value="200",this.SetColour(),this.SaveColour()}updated(){caches.open(window.METADATA_CACHE).then((async t=>{var e=await t.match("Metadata");if(e){var i=JSON.parse(await e.text());this.shadowRoot.getElementById("version").textContent=`Paragon v${i.version}`}})),this.shadowRoot.getElementById("hue").value=window.getHue().hue}ToggleEditNavbar(){var t=document.getElementById("nav");t.hasAttribute("editing")?t.removeAttribute("editing"):t.setAttribute("editing","")}disconnectedCallback(){document.removeEventListener("click",this.HideInfo)}constructor(){super(),this.HideInfo=(()=>{this.shadowRoot&&(this.shadowRoot.getElementById("descriptionContent").style.display="none")}).bind(this),document.addEventListener("click",this.HideInfo)}render(){var t=window.isDark(),e=t?"Dark Mode":"Light Mode",i=t?"images/sun.svg":"images/moon.svg";return U`
            <img draggable="false" @click="${this.ShowDescription}" id="description" src="images/info.svg" />
    
            <p style="display: none;" id="descriptionContent" @click="${this.ShowDescription}">Paragon is written by <a href="https://github.com/AndrewPerson">Andrew Pye</a>.<br/>The source code is on <a href="https://github.com/AndrewPerson/Lit-Paragon-Client">Github</a>.</p>

            <p id="version">Paragon v0.0.0</p>

            <button @click="${this.Patch}">Fix</button>

            <span></span>
            
            <p>Colour</p>

            <button @click="${this.ResetColour}">Reset</button>

            <input type="range" id="hue" min="0" max="359" value="200" @input="${this.SetColour}" @change="${this.SaveColour}"/>

            <span></span>

            <p>${e}</p>

            <button class="toggle" @click="${this.ToggleDark}">
                <img draggable="false" class="toggleImg" src="${i}" />
            </button>
            
            <span></span>

            <p>Sidebar</p>

            <button @click="${this.ToggleEditNavbar}">Edit</button>
        `}});
