var Ne=Object.defineProperty;var Oe=Object.getOwnPropertyDescriptor;var y=(n,e,t,s)=>{for(var i=s>1?void 0:s?Oe(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&Ne(e,t,i),i};var x=class{constructor(){this._callbacks=[]}AddListener(e){this._callbacks.push(e)}Invoke(e){for(let t of this._callbacks)t(e)}};var F=class{static ShowLoginNotification(){let e=document.createElement("p");e.innerHTML="You need to <a>login</a> to see the latest information.",m.ShowNotification(e)}static async GetToken(){let t=await(await caches.open("User Resources")).match("Token");if(!t)return location.href=`${location.origin}/login`,{valid:!1,token:null};let s=await t.json();return new Date>s.termination?(this.ShowLoginNotification(),{valid:!1,token:null}):{valid:!0,token:s}}static async SetResources(e){let t=await caches.open("User Resources"),s=e.map(i=>{let r=i.name,o=i.resource;return t.put(r,new Response(o)).then(()=>this._resourceCallbacks.get(r)?.Invoke(JSON.parse(o)))});await Promise.all(s)}static async SetResource(e,t){await(await caches.open("User Resources")).put(e,new Response(t)),this._resourceCallbacks.get(e)?.Invoke(JSON.parse(t))}static async GetResourceNow(e){let s=await(await caches.open("User Resources")).match(e);if(s)return await s.json()}static async GetResource(e,t){let s=this._resourceCallbacks.get(e)??new x;s.AddListener(t),this._resourceCallbacks.set(e,s),t(await this.GetResourceNow(e))}static async FetchResources(){let{valid:e,token:t}=await this.GetToken();if(!e)return!1;let s=new URL("https://sbhs-random-data.profsmart.repl.co/resources");s.searchParams.append("token",JSON.stringify(t));let i=await fetch(s.toString());if(!i.ok)return this.ShowLoginNotification(),!1;let r=await i.json();return await(await caches.open("User Resources")).put("Token",new Response(JSON.stringify(r.token))),await this.SetResources(Object.keys(r.result).map(c=>({name:c,resource:JSON.stringify(r.result[c])}))),!0}};F._resourceCallbacks=new Map;var G=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),ie=new Map,q=class{constructor(e,t){if(this._$cssResult$=!0,t!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=ie.get(this.cssText);return G&&e===void 0&&(ie.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}},ne=n=>new q(typeof n=="string"?n:n+"",K),b=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new q(t,K)},W=(n,e)=>{G?n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{let s=document.createElement("style"),i=window.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,n.appendChild(s)})},V=G?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return ne(t)})(n):n;var Z,re=window.trustedTypes,Ue=re?re.emptyScript:"",oe=window.reactiveElementPolyfillSupport,Y={toAttribute(n,e){switch(e){case Boolean:n=n?Ue:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},ae=(n,e)=>e!==n&&(e==e||n==n),Q={attribute:!0,type:String,converter:Y,reflect:!1,hasChanged:ae},_=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();let e=[];return this.elementProperties.forEach((t,s)=>{let i=this._$Eh(s,t);i!==void 0&&(this._$Eu.set(i,s),e.push(i))}),e}static createProperty(e,t=Q){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){let s=typeof e=="symbol"?Symbol():"__"+e,i=this.getPropertyDescriptor(e,s,t);i!==void 0&&Object.defineProperty(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(i){let r=this[e];this[t]=i,this.requestUpdate(e,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Q}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){let t=this.properties,s=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(let i of s)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let i of s)t.unshift(V(i))}else e!==void 0&&t.push(V(e));return t}static _$Eh(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,s;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((s=e.hostConnected)===null||s===void 0||s.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;let t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return W(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostConnected)===null||s===void 0?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostDisconnected)===null||s===void 0?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ES(e,t,s=Q){var i,r;let o=this.constructor._$Eh(e,s);if(o!==void 0&&s.reflect===!0){let c=((r=(i=s.converter)===null||i===void 0?void 0:i.toAttribute)!==null&&r!==void 0?r:Y.toAttribute)(t,s.type);this._$Ei=e,c==null?this.removeAttribute(o):this.setAttribute(o,c),this._$Ei=null}}_$AK(e,t){var s,i,r;let o=this.constructor,c=o._$Eu.get(e);if(c!==void 0&&this._$Ei!==c){let a=o.getPropertyOptions(c),l=a.converter,f=(r=(i=(s=l)===null||s===void 0?void 0:s.fromAttribute)!==null&&i!==void 0?i:typeof l=="function"?l:null)!==null&&r!==void 0?r:Y.fromAttribute;this._$Ei=c,this[c]=f(t,a.type),this._$Ei=null}}requestUpdate(e,t,s){let i=!0;e!==void 0&&(((s=s||this.constructor.getPropertyOptions(e)).hasChanged||ae)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),s.reflect===!0&&this._$Ei!==e&&(this._$E_===void 0&&(this._$E_=new Map),this._$E_.set(e,s))):i=!1),!this.isUpdatePending&&i&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((i,r)=>this[r]=i),this._$Et=void 0);let t=!1,s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),(e=this._$Eg)===null||e===void 0||e.forEach(i=>{var r;return(r=i.hostUpdate)===null||r===void 0?void 0:r.call(i)}),this.update(s)):this._$EU()}catch(i){throw t=!1,this._$EU(),i}t&&this._$AE(s)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(s=>{var i;return(i=s.hostUpdated)===null||i===void 0?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$E_!==void 0&&(this._$E_.forEach((t,s)=>this._$ES(s,this[s],t)),this._$E_=void 0),this._$EU()}updated(e){}firstUpdated(e){}};_.finalized=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},oe==null||oe({ReactiveElement:_}),((Z=globalThis.reactiveElementVersions)!==null&&Z!==void 0?Z:globalThis.reactiveElementVersions=[]).push("1.0.2");var X,R=globalThis.trustedTypes,le=R?R.createPolicy("lit-html",{createHTML:n=>n}):void 0,w=`lit$${(Math.random()+"").slice(9)}$`,ce="?"+w,Ie=`<${ce}>`,P=document,H=(n="")=>P.createComment(n),M=n=>n===null||typeof n!="object"&&typeof n!="function",de=Array.isArray,Le=n=>{var e;return de(n)||typeof((e=n)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,he=/-->/g,ue=/>/g,k=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,pe=/'/g,me=/"/g,ge=/^(?:script|style|textarea)$/i,fe=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),T=fe(1),Ze=fe(2),C=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ve=new WeakMap,ye=(n,e,t)=>{var s,i;let r=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:e,o=r._$litPart$;if(o===void 0){let c=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:null;r._$litPart$=o=new I(e.insertBefore(H(),c),c,void 0,t??{})}return o._$AI(n),o},N=P.createTreeWalker(P,129,null,!1),He=(n,e)=>{let t=n.length-1,s=[],i,r=e===2?"<svg>":"",o=z;for(let a=0;a<t;a++){let l=n[a],f,d,u=-1,v=0;for(;v<l.length&&(o.lastIndex=v,d=o.exec(l),d!==null);)v=o.lastIndex,o===z?d[1]==="!--"?o=he:d[1]!==void 0?o=ue:d[2]!==void 0?(ge.test(d[2])&&(i=RegExp("</"+d[2],"g")),o=k):d[3]!==void 0&&(o=k):o===k?d[0]===">"?(o=i??z,u=-1):d[1]===void 0?u=-2:(u=o.lastIndex-d[2].length,f=d[1],o=d[3]===void 0?k:d[3]==='"'?me:pe):o===me||o===pe?o=k:o===he||o===ue?o=z:(o=k,i=void 0);let j=o===k&&n[a+1].startsWith("/>")?" ":"";r+=o===z?l+Ie:u>=0?(s.push(f),l.slice(0,u)+"$lit$"+l.slice(u)+w+j):l+w+(u===-2?(s.push(void 0),a):j)}let c=r+(n[t]||"<?>")+(e===2?"</svg>":"");return[le!==void 0?le.createHTML(c):c,s]},O=class{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let r=0,o=0,c=e.length-1,a=this.parts,[l,f]=He(e,t);if(this.el=O.createElement(l,s),N.currentNode=this.el.content,t===2){let d=this.el.content,u=d.firstChild;u.remove(),d.append(...u.childNodes)}for(;(i=N.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes()){let d=[];for(let u of i.getAttributeNames())if(u.endsWith("$lit$")||u.startsWith(w)){let v=f[o++];if(d.push(u),v!==void 0){let j=i.getAttribute(v.toLowerCase()+"$lit$").split(w),B=/([.?@])?(.*)/.exec(v);a.push({type:1,index:r,name:B[2],strings:j,ctor:B[1]==="."?$e:B[1]==="?"?xe:B[1]==="@"?_e:D})}else a.push({type:6,index:r})}for(let u of d)i.removeAttribute(u)}if(ge.test(i.tagName)){let d=i.textContent.split(w),u=d.length-1;if(u>0){i.textContent=R?R.emptyScript:"";for(let v=0;v<u;v++)i.append(d[v],H()),N.nextNode(),a.push({type:2,index:++r});i.append(d[u],H())}}}else if(i.nodeType===8)if(i.data===ce)a.push({type:2,index:r});else{let d=-1;for(;(d=i.data.indexOf(w,d+1))!==-1;)a.push({type:7,index:r}),d+=w.length-1}r++}}static createElement(e,t){let s=P.createElement("template");return s.innerHTML=e,s}};function U(n,e,t=n,s){var i,r,o,c;if(e===C)return e;let a=s!==void 0?(i=t._$Cl)===null||i===void 0?void 0:i[s]:t._$Cu,l=M(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==l&&((r=a==null?void 0:a._$AO)===null||r===void 0||r.call(a,!1),l===void 0?a=void 0:(a=new l(n),a._$AT(n,t,s)),s!==void 0?((o=(c=t)._$Cl)!==null&&o!==void 0?o:c._$Cl=[])[s]=a:t._$Cu=a),a!==void 0&&(e=U(n,a._$AS(n,e.values),a,s)),e}var be=class{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;let{el:{content:s},parts:i}=this._$AD,r=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:P).importNode(s,!0);N.currentNode=r;let o=N.nextNode(),c=0,a=0,l=i[0];for(;l!==void 0;){if(c===l.index){let f;l.type===2?f=new I(o,o.nextSibling,this,e):l.type===1?f=new l.ctor(o,l.name,l.strings,this,e):l.type===6&&(f=new we(o,this,e)),this.v.push(f),l=i[++a]}c!==(l==null?void 0:l.index)&&(o=N.nextNode(),c++)}return r}m(e){let t=0;for(let s of this.v)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},I=class{constructor(e,t,s,i){var r;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cg=(r=i==null?void 0:i.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),M(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==C&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.S(e):Le(e)?this.M(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==p&&M(this._$AH)?this._$AA.nextSibling.data=e:this.S(P.createTextNode(e)),this._$AH=e}T(e){var t;let{values:s,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=O.createElement(i.h,this.options)),i);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.m(s);else{let o=new be(r,this),c=o.p(this.options);o.m(s),this.S(c),this._$AH=o}}_$AC(e){let t=ve.get(e.strings);return t===void 0&&ve.set(e.strings,t=new O(e)),t}M(e){de(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,i=0;for(let r of e)i===t.length?t.push(s=new I(this.A(H()),this.A(H()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,t);e&&e!==this._$AB;){let i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},D=class{constructor(e,t,s,i,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,s,i){let r=this.strings,o=!1;if(r===void 0)e=U(this,e,t,0),o=!M(e)||e!==this._$AH&&e!==C,o&&(this._$AH=e);else{let c=e,a,l;for(e=r[0],a=0;a<r.length-1;a++)l=U(this,c[s+a],t,a),l===C&&(l=this._$AH[a]),o||(o=!M(l)||l!==this._$AH[a]),l===p?e=p:e!==p&&(e+=(l??"")+r[a+1]),this._$AH[a]=l}o&&!i&&this.k(e)}k(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},$e=class extends D{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===p?void 0:e}},Me=R?R.emptyScript:"",xe=class extends D{constructor(){super(...arguments),this.type=4}k(e){e&&e!==p?this.element.setAttribute(this.name,Me):this.element.removeAttribute(this.name)}},_e=class extends D{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){var s;if((e=(s=U(this,e,t,0))!==null&&s!==void 0?s:p)===C)return;let i=this._$AH,r=e===p&&i!==p||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==p&&(i===p||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,s;typeof this._$AH=="function"?this._$AH.call((s=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&s!==void 0?s:this.element,e):this._$AH.handleEvent(e)}},we=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}};var Ee=window.litHtmlPolyfillSupport;Ee==null||Ee(O,I),((X=globalThis.litHtmlVersions)!==null&&X!==void 0?X:globalThis.litHtmlVersions=[]).push("2.0.2");var ee,te;var $=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;let s=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=s.firstChild),s}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=ye(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return C}};$.finalized=!0,$._$litElement$=!0,(ee=globalThis.litElementHydrateSupport)===null||ee===void 0||ee.call(globalThis,{LitElement:$});var Ae=globalThis.litElementPolyfillSupport;Ae==null||Ae({LitElement:$});((te=globalThis.litElementVersions)!==null&&te!==void 0?te:globalThis.litElementVersions=[]).push("3.0.2");var J=n=>e=>typeof e=="function"?((t,s)=>(window.customElements.define(t,s),s))(n,e):((t,s)=>{let{kind:i,elements:r}=s;return{kind:i,elements:r,finisher(o){window.customElements.define(t,o)}}})(n,e);var ze=(n,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,n)}};function E(n){return(e,t)=>t!==void 0?((s,i,r)=>{i.constructor.createProperty(r,s)})(n,e,t):ze(n,e)}var L=({finisher:n,descriptor:e})=>(t,s)=>{var i;if(s===void 0){let r=(i=t.originalKey)!==null&&i!==void 0?i:t.key,o=e!=null?{kind:"method",placement:"prototype",key:r,descriptor:e(t.key)}:{...t,key:r};return n!=null&&(o.finisher=function(c){n(c,r)}),o}{let r=t.constructor;e!==void 0&&Object.defineProperty(t,s,e(s)),n==null||n(r,s)}};function Se(n,e){return L({descriptor:t=>{let s={get(){var i,r;return(r=(i=this.renderRoot)===null||i===void 0?void 0:i.querySelector(n))!==null&&r!==void 0?r:null},enumerable:!0,configurable:!0};if(e){let i=typeof t=="symbol"?Symbol():"__"+t;s.get=function(){var r,o;return this[i]===void 0&&(this[i]=(o=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(n))!==null&&o!==void 0?o:null),this[i]}}return s}})}var ke=b`:where(img, svg) {
    filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
    cursor: default;

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}
`;var Ce=b`:where(h1, h2, h3, h4, h5, h6, p) {
    margin: 0;
}

:where(*) {
    font-weight: 400;
    color: var(--text1);
    cursor: default;
    font-size: var(--font-size);

    user-select: var(--user-select, none);
    -ms-user-select: var(--user-select, none);
    -moz-user-select: var(--user-select, none);
    -webkit-user-select: var(--user-select, none);
}

:where(h1) {
    font-size: 2rem;
}

:where(h2) {
    font-size: 1.5rem;
}

:where(h3) {
    font-size: 1.4rem;
}

:where(h4) {
    font-size: 1.3rem;
}

:where(h5) {
    font-size: 1.2rem;
}

:where(h6) {
    font-size: 1.1rem;
}

:where(b, strong) {
    font-weight: 600;
}

:where(a) {
    color: var(--text2);
    text-decoration: none;
    cursor: pointer;
}

:where(a:hover) {
    text-decoration: underline;
}

:where(blockquote) {
    border-left: calc(var(--font-size) / 2) solid var(--surface4);
    margin: 0;
    padding-left: calc(var(--font-size) / 4 * 3);
}`;var Re=b`:host {
    display: inline-block;
    width: 12vmin;
    height: 12vmin;
    position: relative;
    border-radius: 0.8rem;
    overflow: hidden;
    flex-shrink: 0;
}

:host(:hover:not(:host([editing]))) {
    background-color: var(--surface2);
    box-shadow: var(--shadow-colour) calc(var(--shadow-x) / 2) calc(var(--shadow-y) / 2) var(--shadow-spread);
}

#handle {
    --size: 0.8rem;
    --padding: 0.8rem;

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

a {
    display: flex;
    flex-direction: column;

    width: 12vmin;
    height: 12vmin;
}

::slotted(img) {
    width: 5.4vmin;
    margin: auto;
    filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
    cursor: pointer;
}`;var A=class extends ${constructor(){super(...arguments);this.pageName="";this.extension=!1;this.title="";this.editing=!1}get page(){return{page:this.pageName,extension:this.extension}}UpdatePage(e){e.preventDefault(),m.NavigateTo(this.page)}render(){return this.draggable=this.editing,m.page.page==this.page.page&&m.page.extension==this.page.extension?this.classList.add("selected"):this.classList.remove("selected"),T`
        <a href="#${this.extension?"extension-":""}${this.pageName}" @click="${this.UpdatePage}" title="${this.title}">
            <slot></slot>
        </a>

        ${this.editing?T`<img id="handle" src="images/drag.svg" draggable="false">`:p}
        `}};A.styles=[Ce,ke,Re],y([E({type:String})],A.prototype,"pageName",2),y([E({type:Boolean})],A.prototype,"extension",2),y([E({type:String})],A.prototype,"title",2),y([E({type:Boolean})],A.prototype,"editing",2),A=y([J("nav-item")],A);var Pe=b`:host {
    flex-shrink: 0;

    background-color: var(--surface3);
    box-shadow: var(--small-shadow);
    
    overflow: hidden;

    box-sizing: border-box;

    z-index: 100;

    border-radius: 0.8rem 0.8rem 0 0;
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

        border-radius: 0 0.8rem 0.8rem 0;
    }

    #items-container {
        flex-direction: column;
        justify-content: flex-start;

        overflow-x: hidden;
        overflow-y: auto;

        background:
            /* Shadow covers */
            linear-gradient(to bottom, var(--surface3) 33%, transparent) no-repeat local,
            linear-gradient(to top, var(--surface3) 33%, transparent) 0 100% no-repeat local,
            
            /* Shadows */
            radial-gradient(farthest-side at 50% 0, rgba(0,0,0,.3), transparent) no-repeat scroll,
            radial-gradient(farthest-side at 50% 100%, rgba(0,0,0,.3), transparent) 0 100% no-repeat scroll;

        background-size: 100% 42px, 100% 42px, 100% 14px, 100% 14px;
    }

    nav-item:last-of-type {
        position: absolute;
        left: 0;
        bottom: 0;
        border-radius: 0 0 0.8rem 0;
    }
}

@media (max-aspect-ratio: 1/1) {
    :host {
        order: 100;

        width: 100%;
        height: 12vmin;

        border-radius: 0.8rem0.8rem 0 0;
    }

    #items-container {
        flex-direction: row;
        justify-content: space-around;

        overflow-x: auto;
        overflow-y: hidden;

        background:
            linear-gradient(to right, var(--surface3) 33%, transparent) no-repeat local,
            linear-gradient(to left, var(--surface3) 33%, transparent) 100% 0 no-repeat local,

            radial-gradient(farthest-side at 0 50%, rgba(0,0,0,.3), transparent) no-repeat scroll,
            radial-gradient(farthest-side at 100% 50%, rgba(0,0,0,.3), transparent) 100% 0 no-repeat scroll;

        background-size: 42px 100%, 42px 100%, 14px 100%, 14px 100%;
    }
}

#items-container:hover, #items-container.hover {
    scrollbar-color: var(--text3) transparent;
}

#items-container::-webkit-scrollbar {
    width: 0.4rem;
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
}`;var g=class extends ${constructor(){super(...arguments);this.editing=!1;this.pages=[];this.icons=[];this.order=[];this.draggedNavItemIndex=0;this.GetNavItem=((e,t)=>{let s,i,r,o=!1;return e<g.defaultPages.length?{page:s,title:i,icon:r}=g.defaultPages[e]:(s=this.pages[e-g.defaultPages.length],i=this.pages[e-g.defaultPages.length],r=this.icons[e-g.defaultPages.length],o=!0),T`
            <nav-item ?editing="${this.editing}" pageName="${s}" ?extension="${o}" title="${i}" 
                      @dragstart="${this.SetDraggedNavItemIndex}" @dragenter="${this.ReorderNavItems}" @dragover="${c=>c.preventDefault()}"
                      data-index="${t}">
                <img draggable="false" src="${r}">
            </nav-item>
        `}).bind(this)}static GetNavbarOrder(){return JSON.parse(localStorage.getItem("Nav Order")||"[0, 1, 2, 3, 4, 5]")}static SetNavbarOrder(e){localStorage.setItem("Nav Order",JSON.stringify(e)),document.querySelector("nav-bar").requestUpdate()}SetDraggedNavItemIndex(e){let t=e.target;!t.editing||t.dataset.index!==void 0&&(this.draggedNavItemIndex=parseInt(t.dataset.index),e.dataTransfer&&(e.dataTransfer.effectAllowed="copyLink"),e.dataTransfer?.setData("Text",t.id))}ReorderNavItems(e){let t=e.target;if(!t.editing||t.dataset.index===void 0)return;let s=parseInt(t.dataset.index);this.order.splice(s,0,this.order.splice(this.draggedNavItemIndex,1)[0]),this.draggedNavItemIndex=s,g.SetNavbarOrder(this.order)}createRenderRoot(){let e=super.createRenderRoot();return e.addEventListener("pointerdown",()=>{this.itemsContainer.classList.add("hover")}),e.addEventListener("pointerup",()=>{this.itemsContainer.classList.remove("hover")}),e}updated(){for(let e of this.shadowRoot?.querySelectorAll("nav-item"))e.requestUpdate()}render(){this.order=g.GetNavbarOrder(),this.order=[...this.order,...this.order];let e=S.installedExtensions;for(var t of e.keys())this.pages.push(t),this.icons.push(Te(e.get(t)));return T`
        <div id="items-container">
            ${this.order.map(this.GetNavItem)}
        </div>
        `}};g.styles=Pe,g.defaultPages=[{page:"daily-timetable",title:"Daily Timetable",icon:"images/dailytimetable.svg"},{page:"barcode",title:"ID Barcode",icon:"images/barcode.svg"},{page:"timetable",title:"Timetable",icon:"images/timetable.svg"},{page:"announcements",title:"Announcements",icon:"images/announcements.svg"},{page:"pages",title:"Pages Marketplace",icon:"images/marketplace.svg"},{page:"settings",title:"Settings",icon:"images/settings.svg"}],y([E({type:Boolean})],g.prototype,"editing",2),y([Se("#items-container",!0)],g.prototype,"itemsContainer",2),g=y([J("nav-bar")],g);var S=class{};S.installedExtensions=new Map(Object.entries(JSON.parse(localStorage.getItem("Installed Extensions")||"{}"))),S._extensionCallbacks=new x,S._resourceListeners=new Map;function Te(n){let e=new URL(n.navIcon,n.url);return e.searchParams.set("cache-version",n.version),e.toString()}var m=class{static NavigateTo(e){if(e.extension){let t=S.installedExtensions;if(t.has(e.page)){let s=document.getElementById(`extension-${e.page}`);if(s===null){let i=document.createElement("extension-page");i.src=t.get(e.page).url,i.id=`extension-${e.page}`,document.querySelector("main")?.appendChild(i),s=i}this.SetPage(e,s)}}else this.SetPage(e,document.getElementById(e.page))}static SetPage(e,t){if(t){this._pageElement!=null&&this._pageElement.classList.add("hidden"),t.classList.remove("hidden"),this._pageElement=t,this.page=e,location.hash=e.extension?`extension-${e.page}`:e.page;let s=document.querySelector("nav-bar");s.removeAttribute("editing"),s.requestUpdate?.()}}static ShowNotification(e,t=!1){let s=document.createElement("inline-notification");return typeof e=="string"?s.innerText=e:s.appendChild(e),s.loader=t,document.getElementById("notification-area")?.appendChild(s),s}static SetDark(e){this.dark=e,document.documentElement.classList.toggle("dark",e),localStorage.setItem("Dark",e.toString()),this._darkCallbacks.Invoke(e)}static ListenForDark(e){this._darkCallbacks.AddListener(e)}static SetHue(e){document.documentElement.style.setProperty("--main-hue",e),document.documentElement.style.setProperty("--hue-rotate",`${parseFloat(e)-200}deg`),this.hue=e}static SaveHue(){localStorage.setItem("Hue",this.hue),this._hueCallbacks.Invoke(parseFloat(this.hue))}static ListenForHue(e){this._hueCallbacks.AddListener(e)}static async GetVersion(){var e=await caches.open("Metadata");let t=await e.match("Metadata");if(t)return(await t.json()).version}};m.page={page:"",extension:!1},m.dark=localStorage.getItem("Dark")=="true",m.hue=localStorage.getItem("Hue")||"200",m._pageElement=null,m._darkCallbacks=new x,m._hueCallbacks=new x;m.dark&&(document.getElementById("logo-p").src="images/logo-dark.svg");var se=new URLSearchParams(window.location.search).get("feature");if(se){let n=document.getElementById("message");n.innerHTML=`You need <a href="https://caniuse.com/?search=${se}">${se}</a> to run <b>Paragon</b>`}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
