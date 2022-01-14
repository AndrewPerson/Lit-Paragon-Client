var Te=Object.defineProperty;var Ne=Object.getOwnPropertyDescriptor;var y=(n,e,t,i)=>{for(var s=i>1?void 0:i?Ne(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&Te(e,t,s),s};var _=class{constructor(){this._callbacks=[]}AddListener(e){this._callbacks.push(e)}Invoke(e){for(let t of this._callbacks)t(e)}};var F=class{static ShowLoginNotification(){let e=document.createElement("p");e.innerHTML="You need to <a>login</a> to see the latest information.",m.ShowNotification(e)}static async GetToken(){let t=await(await caches.open("User Resources")).match("Token");if(!t)return location.href=`${location.origin}/login`,{valid:!1,token:null};let i=await t.json();return new Date>i.termination?(this.ShowLoginNotification(),{valid:!1,token:null}):{valid:!0,token:i}}static async SetResources(e){let t=await caches.open("User Resources"),i=e.map(s=>{let r=s.name,o=s.resource;return t.put(r,new Response(o)).then(()=>this._resourceCallbacks.get(r)?.Invoke(JSON.parse(o)))});await Promise.all(i)}static async SetResource(e,t){await(await caches.open("User Resources")).put(e,new Response(t)),this._resourceCallbacks.get(e)?.Invoke(JSON.parse(t))}static async GetResourceNow(e){let i=await(await caches.open("User Resources")).match(e);if(i)return await i.json()}static async GetResource(e,t){let i=this._resourceCallbacks.get(e)??new _;i.AddListener(t),this._resourceCallbacks.set(e,i),t(await this.GetResourceNow(e))}static async FetchResources(){let{valid:e,token:t}=await this.GetToken();if(!e)return!1;let i=new URL("https://sbhs-random-data.profsmart.repl.co/resources");i.searchParams.append("token",JSON.stringify(t));let s=await fetch(i.toString());if(!s.ok)return this.ShowLoginNotification(),!1;let r=await s.json();return await(await caches.open("User Resources")).put("Token",new Response(JSON.stringify(r.token))),await this.SetResources(Object.keys(r.result).map(c=>({name:c,resource:JSON.stringify(r.result[c])}))),!0}};F._resourceCallbacks=new Map;var B=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),ie=new Map,q=class{constructor(e,t){if(this._$cssResult$=!0,t!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=ie.get(this.cssText);return B&&e===void 0&&(ie.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}},se=n=>new q(typeof n=="string"?n:n+"",K),b=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new q(t,K)},W=(n,e)=>{B?n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{let i=document.createElement("style"),s=window.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)})},V=B?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return se(t)})(n):n;var Z,ne=window.trustedTypes,Oe=ne?ne.emptyScript:"",re=window.reactiveElementPolyfillSupport,Y={toAttribute(n,e){switch(e){case Boolean:n=n?Oe:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},oe=(n,e)=>e!==n&&(e==e||n==n),Q={attribute:!0,type:String,converter:Y,reflect:!1,hasChanged:oe},x=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();let e=[];return this.elementProperties.forEach((t,i)=>{let s=this._$Eh(i,t);s!==void 0&&(this._$Eu.set(s,i),e.push(s))}),e}static createProperty(e,t=Q){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){let i=typeof e=="symbol"?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){let r=this[e];this[t]=s,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Q}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){let t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(let s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(V(s))}else e!==void 0&&t.push(V(e));return t}static _$Eh(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;let t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return W(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=Q){var s,r;let o=this.constructor._$Eh(e,i);if(o!==void 0&&i.reflect===!0){let c=((r=(s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==null&&r!==void 0?r:Y.toAttribute)(t,i.type);this._$Ei=e,c==null?this.removeAttribute(o):this.setAttribute(o,c),this._$Ei=null}}_$AK(e,t){var i,s,r;let o=this.constructor,c=o._$Eu.get(e);if(c!==void 0&&this._$Ei!==c){let a=o.getPropertyOptions(c),l=a.converter,f=(r=(s=(i=l)===null||i===void 0?void 0:i.fromAttribute)!==null&&s!==void 0?s:typeof l=="function"?l:null)!==null&&r!==void 0?r:Y.fromAttribute;this._$Ei=c,this[c]=f(t,a.type),this._$Ei=null}}requestUpdate(e,t,i){let s=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||oe)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$E_===void 0&&(this._$E_=new Map),this._$E_.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((s,r)=>this[r]=s),this._$Et=void 0);let t=!1,i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(s=>{var r;return(r=s.hostUpdate)===null||r===void 0?void 0:r.call(s)}),this.update(i)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$E_!==void 0&&(this._$E_.forEach((t,i)=>this._$ES(i,this[i],t)),this._$E_=void 0),this._$EU()}updated(e){}firstUpdated(e){}};x.finalized=!0,x.elementProperties=new Map,x.elementStyles=[],x.shadowRootOptions={mode:"open"},re==null||re({ReactiveElement:x}),((Z=globalThis.reactiveElementVersions)!==null&&Z!==void 0?Z:globalThis.reactiveElementVersions=[]).push("1.0.2");var X,R=globalThis.trustedTypes,ae=R?R.createPolicy("lit-html",{createHTML:n=>n}):void 0,E=`lit$${(Math.random()+"").slice(9)}$`,le="?"+E,Ue=`<${le}>`,P=document,H=(n="")=>P.createComment(n),M=n=>n===null||typeof n!="object"&&typeof n!="function",ce=Array.isArray,Ie=n=>{var e;return ce(n)||typeof((e=n)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,de=/-->/g,he=/>/g,k=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,ue=/'/g,pe=/"/g,me=/^(?:script|style|textarea)$/i,ge=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),T=ge(1),Qe=ge(2),C=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),fe=new WeakMap,ve=(n,e,t)=>{var i,s;let r=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e,o=r._$litPart$;if(o===void 0){let c=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:null;r._$litPart$=o=new I(e.insertBefore(H(),c),c,void 0,t??{})}return o._$AI(n),o},N=P.createTreeWalker(P,129,null,!1),Le=(n,e)=>{let t=n.length-1,i=[],s,r=e===2?"<svg>":"",o=D;for(let a=0;a<t;a++){let l=n[a],f,d,u=-1,v=0;for(;v<l.length&&(o.lastIndex=v,d=o.exec(l),d!==null);)v=o.lastIndex,o===D?d[1]==="!--"?o=de:d[1]!==void 0?o=he:d[2]!==void 0?(me.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=k):d[3]!==void 0&&(o=k):o===k?d[0]===">"?(o=s??D,u=-1):d[1]===void 0?u=-2:(u=o.lastIndex-d[2].length,f=d[1],o=d[3]===void 0?k:d[3]==='"'?pe:ue):o===pe||o===ue?o=k:o===de||o===he?o=D:(o=k,s=void 0);let j=o===k&&n[a+1].startsWith("/>")?" ":"";r+=o===D?l+Ue:u>=0?(i.push(f),l.slice(0,u)+"$lit$"+l.slice(u)+E+j):l+E+(u===-2?(i.push(void 0),a):j)}let c=r+(n[t]||"<?>")+(e===2?"</svg>":"");return[ae!==void 0?ae.createHTML(c):c,i]},O=class{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,o=0,c=e.length-1,a=this.parts,[l,f]=Le(e,t);if(this.el=O.createElement(l,i),N.currentNode=this.el.content,t===2){let d=this.el.content,u=d.firstChild;u.remove(),d.append(...u.childNodes)}for(;(s=N.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes()){let d=[];for(let u of s.getAttributeNames())if(u.endsWith("$lit$")||u.startsWith(E)){let v=f[o++];if(d.push(u),v!==void 0){let j=s.getAttribute(v.toLowerCase()+"$lit$").split(E),G=/([.?@])?(.*)/.exec(v);a.push({type:1,index:r,name:G[2],strings:j,ctor:G[1]==="."?be:G[1]==="?"?$e:G[1]==="@"?_e:z})}else a.push({type:6,index:r})}for(let u of d)s.removeAttribute(u)}if(me.test(s.tagName)){let d=s.textContent.split(E),u=d.length-1;if(u>0){s.textContent=R?R.emptyScript:"";for(let v=0;v<u;v++)s.append(d[v],H()),N.nextNode(),a.push({type:2,index:++r});s.append(d[u],H())}}}else if(s.nodeType===8)if(s.data===le)a.push({type:2,index:r});else{let d=-1;for(;(d=s.data.indexOf(E,d+1))!==-1;)a.push({type:7,index:r}),d+=E.length-1}r++}}static createElement(e,t){let i=P.createElement("template");return i.innerHTML=e,i}};function U(n,e,t=n,i){var s,r,o,c;if(e===C)return e;let a=i!==void 0?(s=t._$Cl)===null||s===void 0?void 0:s[i]:t._$Cu,l=M(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==l&&((r=a==null?void 0:a._$AO)===null||r===void 0||r.call(a,!1),l===void 0?a=void 0:(a=new l(n),a._$AT(n,t,i)),i!==void 0?((o=(c=t)._$Cl)!==null&&o!==void 0?o:c._$Cl=[])[i]=a:t._$Cu=a),a!==void 0&&(e=U(n,a._$AS(n,e.values),a,i)),e}var ye=class{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;let{el:{content:i},parts:s}=this._$AD,r=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:P).importNode(i,!0);N.currentNode=r;let o=N.nextNode(),c=0,a=0,l=s[0];for(;l!==void 0;){if(c===l.index){let f;l.type===2?f=new I(o,o.nextSibling,this,e):l.type===1?f=new l.ctor(o,l.name,l.strings,this,e):l.type===6&&(f=new xe(o,this,e)),this.v.push(f),l=s[++a]}c!==(l==null?void 0:l.index)&&(o=N.nextNode(),c++)}return r}m(e){let t=0;for(let i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},I=class{constructor(e,t,i,s){var r;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cg=(r=s==null?void 0:s.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),M(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==C&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.S(e):Ie(e)?this.M(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==p&&M(this._$AH)?this._$AA.nextSibling.data=e:this.S(P.createTextNode(e)),this._$AH=e}T(e){var t;let{values:i,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=O.createElement(s.h,this.options)),s);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.m(i);else{let o=new ye(r,this),c=o.p(this.options);o.m(i),this.S(c),this._$AH=o}}_$AC(e){let t=fe.get(e.strings);return t===void 0&&fe.set(e.strings,t=new O(e)),t}M(e){ce(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let r of e)s===t.length?t.push(i=new I(this.A(H()),this.A(H()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){let s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},z=class{constructor(e,t,i,s,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){let r=this.strings,o=!1;if(r===void 0)e=U(this,e,t,0),o=!M(e)||e!==this._$AH&&e!==C,o&&(this._$AH=e);else{let c=e,a,l;for(e=r[0],a=0;a<r.length-1;a++)l=U(this,c[i+a],t,a),l===C&&(l=this._$AH[a]),o||(o=!M(l)||l!==this._$AH[a]),l===p?e=p:e!==p&&(e+=(l??"")+r[a+1]),this._$AH[a]=l}o&&!s&&this.k(e)}k(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},be=class extends z{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===p?void 0:e}},He=R?R.emptyScript:"",$e=class extends z{constructor(){super(...arguments),this.type=4}k(e){e&&e!==p?this.element.setAttribute(this.name,He):this.element.removeAttribute(this.name)}},_e=class extends z{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){var i;if((e=(i=U(this,e,t,0))!==null&&i!==void 0?i:p)===C)return;let s=this._$AH,r=e===p&&s!==p||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==p&&(s===p||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}},xe=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}};var Ee=window.litHtmlPolyfillSupport;Ee==null||Ee(O,I),((X=globalThis.litHtmlVersions)!==null&&X!==void 0?X:globalThis.litHtmlVersions=[]).push("2.0.2");var ee,te;var $=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;let i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=ve(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return C}};$.finalized=!0,$._$litElement$=!0,(ee=globalThis.litElementHydrateSupport)===null||ee===void 0||ee.call(globalThis,{LitElement:$});var we=globalThis.litElementPolyfillSupport;we==null||we({LitElement:$});((te=globalThis.litElementVersions)!==null&&te!==void 0?te:globalThis.litElementVersions=[]).push("3.0.2");var J=n=>e=>typeof e=="function"?((t,i)=>(window.customElements.define(t,i),i))(n,e):((t,i)=>{let{kind:s,elements:r}=i;return{kind:s,elements:r,finisher(o){window.customElements.define(t,o)}}})(n,e);var Me=(n,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,n)}};function w(n){return(e,t)=>t!==void 0?((i,s,r)=>{s.constructor.createProperty(r,i)})(n,e,t):Me(n,e)}var L=({finisher:n,descriptor:e})=>(t,i)=>{var s;if(i===void 0){let r=(s=t.originalKey)!==null&&s!==void 0?s:t.key,o=e!=null?{kind:"method",placement:"prototype",key:r,descriptor:e(t.key)}:{...t,key:r};return n!=null&&(o.finisher=function(c){n(c,r)}),o}{let r=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),n==null||n(r,i)}};function Ae(n,e){return L({descriptor:t=>{let i={get(){var s,r;return(r=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(n))!==null&&r!==void 0?r:null},enumerable:!0,configurable:!0};if(e){let s=typeof t=="symbol"?Symbol():"__"+t;i.get=function(){var r,o;return this[s]===void 0&&(this[s]=(o=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(n))!==null&&o!==void 0?o:null),this[s]}}return i}})}var Se=b`:where(img, svg) {
    filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
    cursor: default;

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}
`;var ke=b`:where(h1, h2, h3, h4, h5, h6, p) {
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
}`;var Ce=b`:host {
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
        `}};A.styles=[ke,Se,Ce],y([w({type:String})],A.prototype,"pageName",2),y([w({type:Boolean})],A.prototype,"extension",2),y([w({type:String})],A.prototype,"title",2),y([w({type:Boolean})],A.prototype,"editing",2),A=y([J("nav-item")],A);var Re=b`:host {
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
}`;var g=class extends ${constructor(){super(...arguments);this.editing=!1;this.pages=[];this.icons=[];this.order=[];this.draggedNavItemIndex=0;this.GetNavItem=((e,t)=>{let i,s,r,o=!1;return e<g.defaultPages.length?{page:i,title:s,icon:r}=g.defaultPages[e]:(i=this.pages[e-g.defaultPages.length],s=this.pages[e-g.defaultPages.length],r=this.icons[e-g.defaultPages.length],o=!0),T`
            <nav-item ?editing="${this.editing}" pageName="${i}" ?extension="${o}" title="${s}" 
                      @dragstart="${this.SetDraggedNavItemIndex}" @dragenter="${this.ReorderNavItems}" @dragover="${c=>c.preventDefault()}"
                      data-index="${t}">
                <img draggable="false" src="${r}">
            </nav-item>
        `}).bind(this)}static GetNavbarOrder(){return JSON.parse(localStorage.getItem("Nav Order")||"[0, 1, 2, 3, 4, 5]")}static SetNavbarOrder(e){localStorage.setItem("Nav Order",JSON.stringify(e)),document.querySelector("nav-bar").requestUpdate()}SetDraggedNavItemIndex(e){let t=e.target;!t.editing||t.dataset.index!==void 0&&(this.draggedNavItemIndex=parseInt(t.dataset.index),e.dataTransfer&&(e.dataTransfer.effectAllowed="copyLink"),e.dataTransfer?.setData("Text",t.id))}ReorderNavItems(e){let t=e.target;if(!t.editing||t.dataset.index===void 0)return;let i=parseInt(t.dataset.index);this.order.splice(i,0,this.order.splice(this.draggedNavItemIndex,1)[0]),this.draggedNavItemIndex=i,g.SetNavbarOrder(this.order)}createRenderRoot(){let e=super.createRenderRoot();return e.addEventListener("pointerdown",()=>{this.itemsContainer.classList.add("hover")}),e.addEventListener("pointerup",()=>{this.itemsContainer.classList.remove("hover")}),e}updated(){for(let e of this.shadowRoot?.querySelectorAll("nav-item"))e.requestUpdate()}render(){this.order=g.GetNavbarOrder(),this.order=[...this.order,...this.order];let e=S.installedExtensions;for(var t of e.keys())this.pages.push(t),this.icons.push(Pe(e.get(t)));return T`
        <div id="items-container">
            ${this.order.map(this.GetNavItem)}
        </div>
        `}};g.styles=Re,g.defaultPages=[{page:"daily-timetable",title:"Daily Timetable",icon:"images/dailytimetable.svg"},{page:"barcode",title:"ID Barcode",icon:"images/barcode.svg"},{page:"timetable",title:"Timetable",icon:"images/timetable.svg"},{page:"announcements",title:"Announcements",icon:"images/announcements.svg"},{page:"pages",title:"Pages Marketplace",icon:"images/marketplace.svg"},{page:"settings",title:"Settings",icon:"images/settings.svg"}],y([w({type:Boolean})],g.prototype,"editing",2),y([Ae("#items-container",!0)],g.prototype,"itemsContainer",2),g=y([J("nav-bar")],g);var S=class{};S.installedExtensions=new Map(Object.entries(JSON.parse(localStorage.getItem("Installed Extensions")||"{}"))),S._extensionCallbacks=new _,S._resourceListeners=new Map;function Pe(n){let e=new URL(n.navIcon,n.url);return e.searchParams.set("cache-version",n.version),e.toString()}var m=class{static NavigateTo(e){if(e.extension){let t=S.installedExtensions;if(t.has(e.page)){let i=document.getElementById(`extension-${e.page}`);if(i===null){let s=document.createElement("extension-page");s.src=t.get(e.page).url,s.id=`extension-${e.page}`,document.querySelector("main")?.appendChild(s),i=s}this.SetPage(e,i)}}else this.SetPage(e,document.getElementById(e.page))}static SetPage(e,t){if(t){this._pageElement!=null&&this._pageElement.classList.add("hidden"),t.classList.remove("hidden"),this._pageElement=t,this.page=e,location.hash=e.extension?`extension-${e.page}`:e.page;let i=document.querySelector("nav-bar");i.removeAttribute("editing"),i.requestUpdate?.()}}static ShowNotification(e,t=!1){let i=document.createElement("inline-notification");return typeof e=="string"?i.innerText=e:i.appendChild(e),i.loader=t,document.getElementById("notification-area")?.appendChild(i),i}static SetDark(e){this.dark=e,document.documentElement.classList.toggle("dark",e),localStorage.setItem("Dark",e.toString()),this._darkCallbacks.Invoke(e)}static ListenForDark(e){this._darkCallbacks.AddListener(e)}static SetHue(e){document.documentElement.style.setProperty("--main-hue",e),document.documentElement.style.setProperty("--hue-rotate",`${parseFloat(e)-200}deg`),this.hue=e}static SaveHue(){localStorage.setItem("Hue",this.hue),this._hueCallbacks.Invoke(parseFloat(this.hue))}static ListenForHue(e){this._hueCallbacks.AddListener(e)}static async GetVersion(){var e=await caches.open("Metadata");let t=await e.match("Metadata");if(t)return(await t.json()).version}};m.page={page:"",extension:!1},m.dark=localStorage.getItem("Dark")=="true",m.hue=localStorage.getItem("Hue")||"200",m._pageElement=null,m._darkCallbacks=new _,m._hueCallbacks=new _;m.dark&&(document.getElementById("logo-p").src="images/logo-dark.svg");async function De(n){let e=await fetch("https://sbhs-random-data.profsmart.repl.co/auth",{method:"POST",body:JSON.stringify({code:n})});return e.status!=200||!e?!1:((await caches.open("User Resources")).put("Token",e),!0)}var ze=new URLSearchParams(window.location.search),je=ze.get("code");De(je).then(n=>{location.href=`${location.origin}/${n?"":"login"}`});
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
