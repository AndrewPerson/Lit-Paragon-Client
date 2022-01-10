var Ot=Object.defineProperty;var Dt=Object.getOwnPropertyDescriptor;var a=(s,e,t,i)=>{for(var r=i>1?void 0:i?Dt(e,t):e,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(e,t,r):n(r))||r);return i&&r&&Ot(e,t,r),r};var I=class{constructor(){this._callbacks=[]}AddListener(e){this._callbacks.push(e)}Invoke(e){for(let t of this._callbacks)t(e)}};var S=class{static ShowLoginNotification(){let e=document.createElement("p");e.innerHTML="You need to <a>login</a> to see the latest information.",g.ShowNotification(e)}static async GetToken(){let t=await(await caches.open("User Resources")).match("Token");if(!t)return location.href=`${location.origin}/login`,{valid:!1,token:null};let i=await t.json();return new Date>i.termination?(this.ShowLoginNotification(),{valid:!1,token:null}):{valid:!0,token:i}}static async SetResources(e){let t=await caches.open("User Resources"),i=e.map(r=>{let o=r.name,n=r.resource;return t.put(o,new Response(n)).then(()=>this._resourceCallbacks.get(o)?.Invoke(JSON.parse(n)))});await Promise.all(i)}static async SetResource(e,t){await(await caches.open("User Resources")).put(e,new Response(t)),this._resourceCallbacks.get(e)?.Invoke(JSON.parse(t))}static async GetResourceNow(e){let i=await(await caches.open("User Resources")).match(e);if(i)return await i.json()}static async GetResource(e,t){let i=this._resourceCallbacks.get(e)??new I;i.AddListener(t),this._resourceCallbacks.set(e,i),t(await this.GetResourceNow(e))}static async FetchResources(){let{valid:e,token:t}=await this.GetToken();if(!e)return!1;let i=new URL("https://sbhs-random-data.profsmart.repl.co/resources");i.searchParams.append("token",JSON.stringify(t));let r=await fetch(i.toString());if(!r.ok)return this.ShowLoginNotification(),!1;let o=await r.json();return await(await caches.open("User Resources")).put("Token",new Response(JSON.stringify(o.token))),await this.SetResources(Object.keys(o.result).map(u=>({name:u,resource:JSON.stringify(o.result[u])}))),!0}};S._resourceCallbacks=new Map;var ge=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ke=Symbol(),He=new Map,fe=class{constructor(e,t){if(this._$cssResult$=!0,t!==ke)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=He.get(this.cssText);return ge&&e===void 0&&(He.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}},Ne=s=>new fe(typeof s=="string"?s:s+"",ke),d=(s,...e)=>{let t=s.length===1?s[0]:e.reduce((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[o+1],s[0]);return new fe(t,ke)},Ce=(s,e)=>{ge?s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{let i=document.createElement("style"),r=window.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,s.appendChild(i)})},ve=ge?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Ne(t)})(s):s;var _e,Ie=window.trustedTypes,zt=Ie?Ie.emptyScript:"",Ue=window.reactiveElementPolyfillSupport,Se={toAttribute(s,e){switch(e){case Boolean:s=s?zt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},Oe=(s,e)=>e!==s&&(e==e||s==s),Ae={attribute:!0,type:String,converter:Se,reflect:!1,hasChanged:Oe},U=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();let e=[];return this.elementProperties.forEach((t,i)=>{let r=this._$Eh(i,t);r!==void 0&&(this._$Eu.set(r,i),e.push(r))}),e}static createProperty(e,t=Ae){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){let i=typeof e=="symbol"?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);r!==void 0&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){let o=this[e];this[t]=r,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Ae}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){let t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(let r of i)this.createProperty(r,t[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let r of i)t.unshift(ve(r))}else e!==void 0&&t.push(ve(e));return t}static _$Eh(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;let t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Ce(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=Ae){var r,o;let n=this.constructor._$Eh(e,i);if(n!==void 0&&i.reflect===!0){let u=((o=(r=i.converter)===null||r===void 0?void 0:r.toAttribute)!==null&&o!==void 0?o:Se.toAttribute)(t,i.type);this._$Ei=e,u==null?this.removeAttribute(n):this.setAttribute(n,u),this._$Ei=null}}_$AK(e,t){var i,r,o;let n=this.constructor,u=n._$Eu.get(e);if(u!==void 0&&this._$Ei!==u){let p=n.getPropertyOptions(u),m=p.converter,R=(o=(r=(i=m)===null||i===void 0?void 0:i.fromAttribute)!==null&&r!==void 0?r:typeof m=="function"?m:null)!==null&&o!==void 0?o:Se.fromAttribute;this._$Ei=u,this[u]=R(t,p.type),this._$Ei=null}}requestUpdate(e,t,i){let r=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Oe)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$E_===void 0&&(this._$E_=new Map),this._$E_.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((r,o)=>this[o]=r),this._$Et=void 0);let t=!1,i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(r=>{var o;return(o=r.hostUpdate)===null||o===void 0?void 0:o.call(r)}),this.update(i)):this._$EU()}catch(r){throw t=!1,this._$EU(),r}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var r;return(r=i.hostUpdated)===null||r===void 0?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$E_!==void 0&&(this._$E_.forEach((t,i)=>this._$ES(i,this[i],t)),this._$E_=void 0),this._$EU()}updated(e){}firstUpdated(e){}};U.finalized=!0,U.elementProperties=new Map,U.elementStyles=[],U.shadowRootOptions={mode:"open"},Ue==null||Ue({ReactiveElement:U}),((_e=globalThis.reactiveElementVersions)!==null&&_e!==void 0?_e:globalThis.reactiveElementVersions=[]).push("1.0.2");var Te,Z=globalThis.trustedTypes,De=Z?Z.createPolicy("lit-html",{createHTML:s=>s}):void 0,O=`lit$${(Math.random()+"").slice(9)}$`,ze="?"+O,jt=`<${ze}>`,W=document,ne=(s="")=>W.createComment(s),ae=s=>s===null||typeof s!="object"&&typeof s!="function",je=Array.isArray,qt=s=>{var e;return je(s)||typeof((e=s)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},le=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,qe=/-->/g,Be=/>/g,q=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Fe=/'/g,Ge=/"/g,Ve=/^(?:script|style|textarea)$/i,Ze=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),c=Ze(1),J=Ze(2),N=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),We=new WeakMap,Je=(s,e,t)=>{var i,r;let o=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e,n=o._$litPart$;if(n===void 0){let u=(r=t==null?void 0:t.renderBefore)!==null&&r!==void 0?r:null;o._$litPart$=n=new Q(e.insertBefore(ne(),u),u,void 0,t??{})}return n._$AI(s),n},Y=W.createTreeWalker(W,129,null,!1),Bt=(s,e)=>{let t=s.length-1,i=[],r,o=e===2?"<svg>":"",n=le;for(let p=0;p<t;p++){let m=s[p],R,y,E=-1,L=0;for(;L<m.length&&(n.lastIndex=L,y=n.exec(m),y!==null);)L=n.lastIndex,n===le?y[1]==="!--"?n=qe:y[1]!==void 0?n=Be:y[2]!==void 0?(Ve.test(y[2])&&(r=RegExp("</"+y[2],"g")),n=q):y[3]!==void 0&&(n=q):n===q?y[0]===">"?(n=r??le,E=-1):y[1]===void 0?E=-2:(E=n.lastIndex-y[2].length,R=y[1],n=y[3]===void 0?q:y[3]==='"'?Ge:Fe):n===Ge||n===Fe?n=q:n===qe||n===Be?n=le:(n=q,r=void 0);let me=n===q&&s[p+1].startsWith("/>")?" ":"";o+=n===le?m+jt:E>=0?(i.push(R),m.slice(0,E)+"$lit$"+m.slice(E)+O+me):m+O+(E===-2?(i.push(void 0),p):me)}let u=o+(s[t]||"<?>")+(e===2?"</svg>":"");return[De!==void 0?De.createHTML(u):u,i]},K=class{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,n=0,u=e.length-1,p=this.parts,[m,R]=Bt(e,t);if(this.el=K.createElement(m,i),Y.currentNode=this.el.content,t===2){let y=this.el.content,E=y.firstChild;E.remove(),y.append(...E.childNodes)}for(;(r=Y.nextNode())!==null&&p.length<u;){if(r.nodeType===1){if(r.hasAttributes()){let y=[];for(let E of r.getAttributeNames())if(E.endsWith("$lit$")||E.startsWith(O)){let L=R[n++];if(y.push(E),L!==void 0){let me=r.getAttribute(L.toLowerCase()+"$lit$").split(O),ue=/([.?@])?(.*)/.exec(L);p.push({type:1,index:o,name:ue[2],strings:me,ctor:ue[1]==="."?Ke:ue[1]==="?"?Xe:ue[1]==="@"?Qe:de})}else p.push({type:6,index:o})}for(let E of y)r.removeAttribute(E)}if(Ve.test(r.tagName)){let y=r.textContent.split(O),E=y.length-1;if(E>0){r.textContent=Z?Z.emptyScript:"";for(let L=0;L<E;L++)r.append(y[L],ne()),Y.nextNode(),p.push({type:2,index:++o});r.append(y[E],ne())}}}else if(r.nodeType===8)if(r.data===ze)p.push({type:2,index:o});else{let y=-1;for(;(y=r.data.indexOf(O,y+1))!==-1;)p.push({type:7,index:o}),y+=O.length-1}o++}}static createElement(e,t){let i=W.createElement("template");return i.innerHTML=e,i}};function X(s,e,t=s,i){var r,o,n,u;if(e===N)return e;let p=i!==void 0?(r=t._$Cl)===null||r===void 0?void 0:r[i]:t._$Cu,m=ae(e)?void 0:e._$litDirective$;return(p==null?void 0:p.constructor)!==m&&((o=p==null?void 0:p._$AO)===null||o===void 0||o.call(p,!1),m===void 0?p=void 0:(p=new m(s),p._$AT(s,t,i)),i!==void 0?((n=(u=t)._$Cl)!==null&&n!==void 0?n:u._$Cl=[])[i]=p:t._$Cu=p),p!==void 0&&(e=X(s,p._$AS(s,e.values),p,i)),e}var Ye=class{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;let{el:{content:i},parts:r}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:W).importNode(i,!0);Y.currentNode=o;let n=Y.nextNode(),u=0,p=0,m=r[0];for(;m!==void 0;){if(u===m.index){let R;m.type===2?R=new Q(n,n.nextSibling,this,e):m.type===1?R=new m.ctor(n,m.name,m.strings,this,e):m.type===6&&(R=new et(n,this,e)),this.v.push(R),m=r[++p]}u!==(m==null?void 0:m.index)&&(n=Y.nextNode(),u++)}return o}m(e){let t=0;for(let i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},Q=class{constructor(e,t,i,r){var o;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cg=(o=r==null?void 0:r.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),ae(e)?e===b||e==null||e===""?(this._$AH!==b&&this._$AR(),this._$AH=b):e!==this._$AH&&e!==N&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.S(e):qt(e)?this.M(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==b&&ae(this._$AH)?this._$AA.nextSibling.data=e:this.S(W.createTextNode(e)),this._$AH=e}T(e){var t;let{values:i,_$litType$:r}=e,o=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=K.createElement(r.h,this.options)),r);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.m(i);else{let n=new Ye(o,this),u=n.p(this.options);n.m(i),this.S(u),this._$AH=n}}_$AC(e){let t=We.get(e.strings);return t===void 0&&We.set(e.strings,t=new K(e)),t}M(e){je(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,r=0;for(let o of e)r===t.length?t.push(i=new Q(this.A(ne()),this.A(ne()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){let r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},de=class{constructor(e,t,i,r,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=b}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){let o=this.strings,n=!1;if(o===void 0)e=X(this,e,t,0),n=!ae(e)||e!==this._$AH&&e!==N,n&&(this._$AH=e);else{let u=e,p,m;for(e=o[0],p=0;p<o.length-1;p++)m=X(this,u[i+p],t,p),m===N&&(m=this._$AH[p]),n||(n=!ae(m)||m!==this._$AH[p]),m===b?e=b:e!==b&&(e+=(m??"")+o[p+1]),this._$AH[p]=m}n&&!r&&this.k(e)}k(e){e===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ke=class extends de{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===b?void 0:e}},Ft=Z?Z.emptyScript:"",Xe=class extends de{constructor(){super(...arguments),this.type=4}k(e){e&&e!==b?this.element.setAttribute(this.name,Ft):this.element.removeAttribute(this.name)}},Qe=class extends de{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){var i;if((e=(i=X(this,e,t,0))!==null&&i!==void 0?i:b)===N)return;let r=this._$AH,o=e===b&&r!==b||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,n=e!==b&&(r===b||o);o&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}},et=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}};var tt=window.litHtmlPolyfillSupport;tt==null||tt(K,Q),((Te=globalThis.litHtmlVersions)!==null&&Te!==void 0?Te:globalThis.litHtmlVersions=[]).push("2.0.2");var Re,Le;var v=class extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;let i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=Je(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return N}};v.finalized=!0,v._$litElement$=!0,(Re=globalThis.litElementHydrateSupport)===null||Re===void 0||Re.call(globalThis,{LitElement:v});var it=globalThis.litElementPolyfillSupport;it==null||it({LitElement:v});((Le=globalThis.litElementVersions)!==null&&Le!==void 0?Le:globalThis.litElementVersions=[]).push("3.0.2");var f=s=>e=>typeof e=="function"?((t,i)=>(window.customElements.define(t,i),i))(s,e):((t,i)=>{let{kind:r,elements:o}=i;return{kind:r,elements:o,finisher(n){window.customElements.define(t,n)}}})(s,e);var Gt=(s,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,s)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,s)}};function h(s){return(e,t)=>t!==void 0?((i,r,o)=>{r.constructor.createProperty(o,i)})(s,e,t):Gt(s,e)}function C(s){return h({...s,state:!0})}var ee=({finisher:s,descriptor:e})=>(t,i)=>{var r;if(i===void 0){let o=(r=t.originalKey)!==null&&r!==void 0?r:t.key,n=e!=null?{kind:"method",placement:"prototype",key:o,descriptor:e(t.key)}:{...t,key:o};return s!=null&&(n.finisher=function(u){s(u,o)}),n}{let o=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),s==null||s(o,i)}};function k(s,e){return ee({descriptor:t=>{let i={get(){var r,o;return(o=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(s))!==null&&o!==void 0?o:null},enumerable:!0,configurable:!0};if(e){let r=typeof t=="symbol"?Symbol():"__"+t;i.get=function(){var o,n;return this[r]===void 0&&(this[r]=(n=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(s))!==null&&n!==void 0?n:null),this[r]}}return i}})}var A=d`:where(img, svg) {
    filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
    cursor: default;

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}
`;var x=d`:where(h1, h2, h3, h4, h5, h6, p) {
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
}`;var rt=d`:host {
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
}`;var D=class extends v{constructor(){super(...arguments);this.pageName="";this.extension=!1;this.title="";this.editing=!1}get page(){return{page:this.pageName,extension:this.extension}}UpdatePage(e){e.preventDefault(),g.NavigateTo(this.page)}render(){return this.draggable=this.editing,g.page.page==this.page.page&&g.page.extension==this.page.extension?this.classList.add("selected"):this.classList.remove("selected"),c`
        <a href="#${this.extension?"extension-":""}${this.pageName}" @click="${this.UpdatePage}" title="${this.title}">
            <slot></slot>
        </a>

        ${this.editing?c`<img id="handle" src="images/drag.svg" draggable="false">`:b}
        `}};D.styles=[x,A,rt],a([h({type:String})],D.prototype,"pageName",2),a([h({type:Boolean})],D.prototype,"extension",2),a([h({type:String})],D.prototype,"title",2),a([h({type:Boolean})],D.prototype,"editing",2),D=a([f("nav-item")],D);var st=d`:host {
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
    }
}

#items-container:hover, #items-container.hover {
    scrollbar-color: var(--text3) transparent;
}

#items-container::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
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
    height: 0.8rem;
    left: 0;
}

#top-shadow {
    border-radius: 0.05rem 0 0;
    top: 0;
    --angle: 180deg;
}

#bottom-shadow {
    bottom: 12vmin;
    --angle: 0;
}

#left-shadow,
#right-shadow {
    width: 0.8rem;
    height: 12vmin;
    bottom: 0;
}

#left-shadow {
    left: 0;
    --angle: 90deg;
}

#right-shadow {
    border-radius: 0.05rem 0 0;
    right: 0;
    --angle: -90deg;
}`;var w=class extends v{constructor(){super();this.editing=!1;this.pages=[];this.icons=[];this.order=[];this.draggedNavItemIndex=0;this.GetNavItem=((e,t)=>{let i,r,o,n=!1;return e<w.defaultPages.length?{page:i,title:r,icon:o}=w.defaultPages[e]:(i=this.pages[e-w.defaultPages.length],r=this.pages[e-w.defaultPages.length],o=this.icons[e-w.defaultPages.length],n=!0),c`
            <nav-item ?editing="${this.editing}" pageName="${i}" ?extension="${n}" title="${r}" 
                      @dragstart="${this.SetDraggedNavItemIndex}" @dragenter="${this.ReorderNavItems}" @dragover="${u=>u.preventDefault()}"
                      data-index="${t}">
                <img draggable="false" src="${o}">
            </nav-item>
        `}).bind(this);matchMedia("(max-aspect-ratio: 1/1)").onchange=this.ShowShadows.bind(this)}static GetNavbarOrder(){return JSON.parse(localStorage.getItem("Nav Order")||"[0, 1, 2, 3, 4, 5]")}static SetNavbarOrder(e){localStorage.setItem("Nav Order",JSON.stringify(e)),document.querySelector("nav-bar").requestUpdate()}SetDraggedNavItemIndex(e){let t=e.target;!t.editing||t.dataset.index!==void 0&&(this.draggedNavItemIndex=parseInt(t.dataset.index),e.dataTransfer&&(e.dataTransfer.effectAllowed="copyLink"),e.dataTransfer?.setData("Text",t.id))}ReorderNavItems(e){let t=e.target;if(!t.editing||t.dataset.index===void 0)return;let i=parseInt(t.dataset.index);this.order.splice(i,0,this.order.splice(this.draggedNavItemIndex,1)[0]),this.draggedNavItemIndex=i,w.SetNavbarOrder(this.order)}ShowShadows(){!this.shadowRoot||(window.innerWidth<=window.innerHeight?(this.topShadow.style.display="none",this.bottomShadow.style.display="none",this.itemsContainer.scrollLeft==0?this.leftShadow.style.display="none":this.leftShadow.style.removeProperty("display"),this.itemsContainer.scrollLeft>=this.itemsContainer.scrollWidth-this.itemsContainer.clientWidth-1?this.rightShadow.style.display="none":this.rightShadow.style.removeProperty("display")):(this.leftShadow.style.display="none",this.rightShadow.style.display="none",this.itemsContainer.scrollTop==0?this.topShadow.style.display="none":this.topShadow.style.removeProperty("display"),this.itemsContainer.scrollTop>=this.itemsContainer.scrollHeight-this.itemsContainer.clientHeight-1?this.bottomShadow.style.display="none":this.bottomShadow.style.removeProperty("display")))}createRenderRoot(){let e=super.createRenderRoot();return e.addEventListener("pointerdown",()=>{this.itemsContainer.classList.add("hover")}),e.addEventListener("pointerup",()=>{this.itemsContainer.classList.remove("hover")}),e}firstUpdated(){this.itemsContainer.addEventListener("scroll",this.ShowShadows.bind(this))}updated(){for(let e of this.shadowRoot?.querySelectorAll("nav-item"))e.requestUpdate()}render(){this.order=w.GetNavbarOrder();let e=$.installedExtensions;for(var t of e.keys())this.pages.push(t),this.icons.push(ot(e.get(t)));let i=window.innerWidth<=window.innerHeight,r=i?window.innerWidth/100:window.innerHeight/100,o=this.order.length*12*r>window.innerHeight;return c`
        <div id="items-container">
            ${this.order.map(this.GetNavItem)}
        
            <div id="top-shadow" style="display: none"></div>
            <div id="bottom-shadow" style="${!i&&o?"":"display: none"}"></div>
            <div id="left-shadow" style="display: none"></div>
            <div id="right-shadow" style="${i&&o?"":"display: none"}"></div>
        </div>
        `}};w.styles=st,w.defaultPages=[{page:"daily-timetable",title:"Daily Timetable",icon:"images/dailytimetable.svg"},{page:"barcode",title:"ID Barcode",icon:"images/barcode.svg"},{page:"timetable",title:"Timetable",icon:"images/timetable.svg"},{page:"announcements",title:"Announcements",icon:"images/announcements.svg"},{page:"pages",title:"Pages Marketplace",icon:"images/marketplace.svg"},{page:"settings",title:"Settings",icon:"images/settings.svg"}],a([h({type:Boolean})],w.prototype,"editing",2),a([k("#items-container",!0)],w.prototype,"itemsContainer",2),a([k("#top-shadow",!0)],w.prototype,"topShadow",2),a([k("#bottom-shadow",!0)],w.prototype,"bottomShadow",2),a([k("#left-shadow",!0)],w.prototype,"leftShadow",2),a([k("#right-shadow",!0)],w.prototype,"rightShadow",2),w=a([f("nav-bar")],w);var $=class{};$.installedExtensions=new Map(Object.entries(JSON.parse(localStorage.getItem("Installed Extensions")||"{}"))),$._extensionCallbacks=new I,$._resourceListeners=new Map;function Vt(){let s=[];for(let e of $.installedExtensions.values())s.push(new URL(e.url).origin);return s}async function nt(s){let e=(await Pe()).get(s);if(e){$.installedExtensions.set(s,e),localStorage.setItem("Installed Extensions",JSON.stringify(Object.fromEntries($.installedExtensions)));let t=w.GetNavbarOrder();t.splice(t.length-1,0,t.length),w.SetNavbarOrder(t)}}async function at(s){let e=$.installedExtensions,t=w.GetNavbarOrder(),i=t.indexOf(Object.keys(e).indexOf(s))+w.defaultPages.length,r=t.splice(i,1)[0];for(let n=0;n<t.length;n++)t[n]>r&&t[n]--;w.SetNavbarOrder(t);var o=document.getElementById(`extension-${s}`);o!==null&&o.remove(),$.installedExtensions.delete(s),localStorage.setItem("Installed Extensions",JSON.stringify(Object.fromEntries($.installedExtensions)))}async function Pe(){let e=await(await caches.open("Metadata")).match("Metadata");return e?new Map(Object.entries((await e.json()).pages||{})):new Map}async function lt(s){$._extensionCallbacks.AddListener(s),s(await Pe())}async function dt(){let s=await Pe();$._extensionCallbacks.Invoke(s)}function ct(s){let e=new URL(s.icon,s.url);return e.search=`cache-version=${s.version}`,e.toString()}function ot(s){let e=new URL(s.navIcon,s.url);return e.searchParams.set("cache-version",s.version),e.toString()}function ht(){g.ListenForDark(e=>{for(let t=0;t<window.frames.length;t++)window.frames[t].postMessage({command:"Set Dark",data:{dark:e}},"*")}),g.ListenForHue(e=>{for(let t=0;t<window.frames.length;t++)window.frames[t].postMessage({command:"Set Hue",data:{hue:e}},"*")}),window.addEventListener("message",async e=>{let t=e.origin;!Vt().includes(t)||e.source?.postMessage(await s(e),{targetOrigin:t})});async function s(e){let t=e.data.command,i=e.data.data;if(t=="Initialise")return{command:"Initialise",data:{dark:g.dark,hue:g.hue,version:await g.GetVersion()}};if(t=="Get Resource"){let r=$._resourceListeners.get(i.name),o=!1;r===void 0&&(o=!0,r=[]),r.push(e),$._resourceListeners.set(i.name,r),o&&S.GetResource(i.name,u=>{let p=$._resourceListeners.get(i.name)??[];for(let m of p)m.source?.postMessage({command:"Resource",data:{name:i.name,resource:u}},{targetOrigin:m.origin})});let n=await S.GetResourceNow(i.name);return{command:"Resource",data:{name:i.name,resource:n}}}if(t=="Get Token"){let r=await S.GetToken();return{command:"Token",data:{token:r.token===null?null:r.token.access_token,valid:r.valid}}}if(t=="Refresh Token"){if(!await S.FetchResources())return{command:"Refreshed Token",data:{token:null,valid:!1}};let o=await S.GetToken();return{command:"Refreshed Token",data:{token:o.token===null?null:o.token.access_token,valid:o.valid}}}return t=="Ping"?{command:"Pong"}:{command:"Unknown Command",data:{command:t}}}}var g=class{static NavigateTo(e){if(e.extension){let t=$.installedExtensions;if(t.has(e.page)){let i=document.getElementById(`extension-${e.page}`);if(i===null){let r=document.createElement("extension-page");r.src=t.get(e.page).url,r.id=`extension-${e.page}`,document.querySelector("main")?.appendChild(r),i=r}this.SetPage(e,i)}}else this.SetPage(e,document.getElementById(e.page))}static SetPage(e,t){if(t){this._pageElement!=null&&this._pageElement.classList.add("hidden"),t.classList.remove("hidden"),this._pageElement=t,this.page=e,location.hash=e.extension?`extension-${e.page}`:e.page;let i=document.querySelector("nav-bar");i.removeAttribute("editing"),i.requestUpdate?.()}}static ShowNotification(e,t=!1){let i=document.createElement("inline-notification");return typeof e=="string"?i.innerText=e:i.appendChild(e),i.loader=t,document.getElementById("notification-area")?.appendChild(i),i}static SetDark(e){this.dark=e,document.documentElement.classList.toggle("dark",e),localStorage.setItem("Dark",e.toString()),this._darkCallbacks.Invoke(e)}static ListenForDark(e){this._darkCallbacks.AddListener(e)}static SetHue(e){document.documentElement.style.setProperty("--main-hue",e),document.documentElement.style.setProperty("--hue-rotate",`${parseFloat(e)-200}deg`),this.hue=e}static SaveHue(){localStorage.setItem("Hue",this.hue),this._hueCallbacks.Invoke(parseFloat(this.hue))}static ListenForHue(e){this._hueCallbacks.AddListener(e)}static async GetVersion(){var e=await caches.open("Metadata");let t=await e.match("Metadata");if(t)return(await t.json()).version}};g.page={page:"",extension:!1},g.dark=localStorage.getItem("Dark")=="true",g.hue=localStorage.getItem("Hue")||"200",g._pageElement=null,g._darkCallbacks=new I,g._hueCallbacks=new I;var H=class extends v{constructor(){super(...arguments);this._state=0;this._unreceivedResources=0;this._uncompletedResources=0}AddResource(e,t){this._unreceivedResources++,this._uncompletedResources++;let i=!1,r=!1;S.GetResource(e,o=>{i||(this._unreceivedResources--,i=!0),o!=null&&(r||(this._uncompletedResources--,r=!0),this[t]=o),this._uncompletedResources==0?this._state=2:this._unreceivedResources==0&&(this._state=1)})}render(){return this._state==0?b:this._state==1?c`
            <loading-indicator style="width: 30.8rem; height: 100%; margin: auto;"></loading-indicator>
            <style>
                :host {
                    display: flex;
                }
            </style>
            `:this.renderPage()}renderPage(){return b}};a([C()],H.prototype,"_state",2);var pt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},mt=s=>(...e)=>({_$litDirective$:s,values:e}),Me=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var ye=class extends Me{constructor(e){if(super(e),this.it=b,e.type!==pt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===b||e==null)return this.vt=void 0,this.it=e;if(e===N)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this.vt;this.it=e;let t=[e];return t.raw=t,this.vt={_$litType$:this.constructor.resultType,strings:t,values:[]}}};ye.directiveName="unsafeHTML",ye.resultType=1;var ut=mt(ye);var gt=d`:host {
    display: block;
}

details, summary {
    --user-select: text;
    cursor: text;
}

summary {
    position: relative;

    list-style: none;

    margin-bottom: 0.4rem;
}

summary > * {
    cursor: pointer;
}

summary > h3 {
    padding-right: 2rem;
}

summary::after {
    content: "";

    position: absolute;
    top: 0;
    right: 0;

    display: block;
    width: 1.5rem;
    height: 1.5rem;

    margin-left: auto;
    
    background-image: url(images/toggle.svg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: center;

    cursor: pointer;

    transform: rotate(180deg);

    transition: 0.3s;
}

details[open] > summary::after {
    transform: none;
}

.info {
    font-size: 0.7rem;
}`;var P=class extends v{render(){return c`
        <details>
            <summary>
                <h3>${this.title}</h3>
                <p class="info">By ${this.author} | For ${this.years}${this.meetingTime===void 0?"":` | At ${this.meetingTime}`}</p>
            </summary>

            ${ut(this.content)}
        </details>
        `}};P.styles=[x,gt],a([h()],P.prototype,"title",2),a([h()],P.prototype,"author",2),a([h()],P.prototype,"years",2),a([h({type:Boolean})],P.prototype,"meeting",2),a([h()],P.prototype,"meetingTime",2),a([h()],P.prototype,"content",2),a([h({type:Number})],P.prototype,"weight",2),P=a([f("announcement-post")],P);var be=d`:where(input[type=search]) {
    border: none;
    border-bottom: solid 0.05rem var(--text2);
    border-radius: 0;

    background-color: var(--surface2);
    color: var(--text1);

    font-size: 1rem;
    font-family: monospace;

    height: 2rem;
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
}`;var ft=d`:where(select) {
    border: solid 0.05rem var(--text2);
    background-color: var(--surface2);
    color: var(--text2);

    padding: 0.4rem 0;
    padding-right: 2.3rem;

    border-radius: 0.4rem;

    font-size: calc(1rem / 1.2);

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}

:where(option) {
    background-color: var(--surface2);
}`;var te=d`:host, main {
    flex: 1;
    margin: 1%;

    box-sizing: border-box;
    padding: 0.4rem;
}

/*
    306px is 102% of 300px.
    We use 102% because that includes the margin,
    which is 1% either side.
*/
@media (max-width: 306px) {
    :host, main {
        margin: 1% calc(50% - 150px);
    }
}

@media (max-width: 300px) {
    :host, main {
        margin: 1% 0;
    }
}`;var T=d`:host, main {
    box-shadow: var(--shadow);
    background-color: var(--surface2);
    border-radius: 0.8rem;
}`;var vt=d`:host {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    overscroll-behavior: contain;
}

.header {
    display: flex;
    justify-content: space-between;
}

.content {
    flex: 1;
    overflow: hidden auto;

    scrollbar-width: thin;
    scrollbar-color: var(--surface4) transparent;
}

.content::-webkit-scrollbar-track {
    background-color: transparent;

    width: 0.4rem;
}

.content::-webkit-scrollbar-thumb {
    background-color: var(--surface4);
    border-radius: 0.4rem;
}

.content:empty::after {
    content: "No announcements. Try changing your filter or searching for something else.";

    display: block;
    width: 100%;

    margin-top: 0.4rem;

    text-align: center;

    font-size: 1.4rem;
}

announcement-post {
    margin-bottom: 1.2rem;
}`;var B=class extends H{constructor(){super();this.yearFilter="all";this.searchFilter="";this.AddResource("announcements","announcements")}renderPage(){let e=this.yearFilter=="all"?this.announcements.notices:this.announcements.notices.filter(t=>t.years.includes(this.yearFilter));return e=this.searchFilter==""?e:e.filter(t=>t.title.toLowerCase().includes(this.searchFilter.toLowerCase())||t.content.toLowerCase().includes(this.searchFilter.toLowerCase())),c`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${t=>this.searchFilter=t.target.value}">

            <select @input="${t=>this.yearFilter=t.target.value}">
                <option value="all">All</option>
                <option value="Staff">Staff</option>
                <option value="12">Year 12</option>
                <option value="11">Year 11</option>
                <option value="10">Year 10</option>
                <option value="9">Year 9</option>
                <option value="8">Year 8</option>
                <option value="7">Year 7</option>
            </select>
        </div>

        <!--The ugliest code ever written, but the div tags for .content need to be where they are, or the :empty selector won't work-->
        <div class="content">${e.map(t=>c`
            <announcement-post title="${t.title}" content="${t.content}" author="${t.authorName}"
                               years="${t.displayYears}" ?meeting="${t.isMeeting==1}"
                               ${t.meetingTime===null?"":`meetingTime="${t.meetingTime}${t.meetingTimeParsed===void 0?"":` (${t.meetingTimeParsed})`}"`}
                               weight="${t.relativeWeight+t.isMeeting}"></announcement-post>
        `)}</div>
        `}};B.styles=[T,te,x,A,be,ft,vt],a([C()],B.prototype,"announcements",2),a([C()],B.prototype,"yearFilter",2),a([C()],B.prototype,"searchFilter",2),B=a([f("school-announcements")],B);var yt=d`:host {
    position: relative;
    display: block;
}

button {
    all: unset;
    width: inherit;
    height: inherit;
}

svg {
    width: inherit;
    height: inherit;
}

slot {
    position: absolute;
    display: block;
    top: var(--offset);
    
    width: max-content;
    max-width: var(--max-width);

    background-color: var(--surface2);

    border-radius: 0.8rem;
    box-shadow: var(--shadow);
    padding: 0.8rem;

    z-index: inherit;

    box-sizing: border-box;
}

.background {
    position: absolute;
    width: var(--max-width);
    height: 200%;
    top: 0;
    clip-path: polygon(0 0, 100% 100%, 0 100%);
}`;var bt=J`<svg width="210" height="210" viewBox="0 0 210 210" xmlns="http://www.w3.org/2000/svg"><path d="M5 105a100 100 0 1 1 200 0 100 100 0 0 1-200 0Z" fill="none" stroke="#323232" stroke-width="10"/><path d="M95.8 128.4v-.6q0-9.8 2-15.5 2-5.8 5.6-9.4 3.5-3.6 8.5-6.6 4.5-2.7 7.6-7.1 3-4.4 3-10.5 0-7.5-5-12-5.1-4.4-12.3-4.4-4.2 0-8 1.8-4 1.7-6.6 5.5-2.6 3.7-3 9.7H74.7q.4-8.7 4.5-14.9 4.2-6.2 11-9.4 6.7-3.3 15-3.3 9 0 15.7 3.6 6.6 3.6 10.3 9.8 3.7 6.2 3.7 14.2 0 8.5-3.8 14.5T120.5 104q-6.7 4.2-9.5 9.2-2.8 5-3 14.6v.6H95.9Zm6.5 30.3q-3.8 0-6.5-2.7t-2.7-6.5q0-3.8 2.7-6.5t6.5-2.7q3.8 0 6.5 2.7t2.7 6.5q0 3.8-2.7 6.5t-6.5 2.7Z"/></svg>`;var ie=class extends v{constructor(){super();this.HidePopup=(()=>{this.info.style.display="none",this.background.style.display="none"}).bind(this);this.addEventListener("mouseleave",this.HidePopup),document.addEventListener("pointerover",this.HidePopup)}ShowPopup(e){this.info.style.removeProperty("display"),this.background.style.removeProperty("display"),e.stopPropagation()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pointerover",this.HidePopup)}render(){return c`
        <button @click="${this.ShowPopup}" @mouseover="${this.ShowPopup}">
            ${bt}
        </button>

        <slot style="display: none"></slot>

        <div class="background" style="display: none"></div>
        `}};ie.styles=[A,yt],a([k("slot")],ie.prototype,"info",2),a([k(".background")],ie.prototype,"background",2),ie=a([f("info-popup")],ie);var xt=d`:host {
    position: relative;

    touch-action: none;
}

#point1,
#point2 {
    --size: 1.2rem;

    position: absolute;

    width: var(--size);
    height: var(--size);

    background-color: var(--surface4);
    border-radius: calc(var(--size) / 2);

    transform: translate(-50%, -50%);

    z-index: 1;

    cursor: move;
}

#point1::after,
#point2::after {
    content: "";

    display: block;

    width: 3vmax;
    height: 3vmax;

    margin: calc(var(--size) / 2 - 1.5vmax);
}

#barcodeDisplay {
    position: absolute;

    box-sizing: border-box;

    filter: contrast(5);
}

#barcodeDisplay.outline {
    border: solid 0.4rem var(--text1);
}

info-popup {
    --max-width: 30vmax;
    --offset: 2.6rem;
    
    width: 1.9rem;
    height: 1.9rem;
    z-index: 2;
}`;var F=class extends H{constructor(){super();this.draggedElement=null;this.dragging=!1;this.addEventListener("pointerdown",e=>e.preventDefault()),this.addEventListener("pointermove",this.DragPoint),this.addEventListener("pointerup",this.EndDrag),this.AddResource("userinfo","userInfo"),g.ListenForDark(e=>{this.barcode?.classList.toggle("outline",e)})}set userInfo(e){this.studentId=e.studentId,this.requestUpdate()}StartDrag(e){e.preventDefault(),this.draggedElement=e.target,this.draggedElement.style.pointerEvents="none",this.style.cursor="move"}DragPoint(e){e.preventDefault(),this.draggedElement!=null&&(this.dragging||(this.dragging=!0,this.draggedElement.style.left=`${(e.clientX-this.offsetLeft)/this.clientWidth*100}%`,this.draggedElement.style.top=`${(e.clientY-this.offsetTop)/this.clientHeight*100}%`,this.SetBarcodePosition(),this.dragging=!1))}EndDrag(){this.draggedElement!=null&&this.draggedElement.style.removeProperty("pointer-events"),this.draggedElement=null,this.removeAttribute("style"),this.RenderBarcode()}SetBarcodePosition(){if(this.barcode===null)return;let e=parseFloat(this.point1?.style.left.substring(0,this.point1.style.left.length-1)||"0"),t=parseFloat(this.point1?.style.top.substring(0,this.point1.style.top.length-1)||"0"),i=parseFloat(this.point2?.style.left.substring(0,this.point2.style.left.length-1)||"0"),r=parseFloat(this.point2?.style.top.substring(0,this.point2.style.top.length-1)||"0"),o=Math.max(e,i),n=Math.min(e,i),u=Math.max(t,r),p=Math.min(t,r);this.barcode.style.left=`${n}%`,this.barcode.style.top=`${p}%`,this.barcode.style.width=`${o-n}%`,this.barcode.style.height=`${u-p}%`}RenderBarcode(){this.draggedElement==null&&(this.barcode===null||this.point1===null||this.point2===null||(localStorage.setItem("Barcode Points",JSON.stringify([this.point1.style.left,this.point1.style.top,this.point2.style.left,this.point2.style.top])),typeof JsBarcode=="function"&&JsBarcode(this.barcode,this.studentId,{displayValue:!1,margin:0})))}updated(){this.SetBarcodePosition(),this.RenderBarcode()}renderPage(){let e=localStorage.getItem("Barcode Points"),t=["20%","20%","80%","40%"];return e&&(t=JSON.parse(e)),c`
        <info-popup>Use this barcode to scan in instead of your Student Card. Drag the points to resize it.</info-popup>

        <div id="point1" style="left: ${t[0]}; top: ${t[1]};" @pointerdown="${this.StartDrag}"></div>
        <div id="point2" style="left: ${t[2]}; top: ${t[3]};" @pointerdown="${this.StartDrag}"></div>

        <canvas id="barcodeDisplay" class="${g.dark?"outline":""}" style="top: 20%; left: 20%; width: 60%; height: 20%;"></canvas>
        `}};F.styles=[T,te,x,A,xt],a([k("#barcodeDisplay")],F.prototype,"barcode",2),a([k("#point1")],F.prototype,"point1",2),a([k("#point2")],F.prototype,"point2",2),F=a([f("student-barcode")],F);var xe=(i=>(i.NO_COVER="nocover",i.REPLACEMENT="replacement",i.NO_VARIATION="novariation",i))(xe||{});var wt=d`:host {
    display: flex;
    justify-content: space-between;

    width: 100%;
}

p {
    color: var(--text3);
}`;var re=class extends v{render(){return c`
            <p>${this.title}</p>
            <p>${this.time}</p>
        `}};re.styles=[x,wt],a([h()],re.prototype,"title",2),a([h()],re.prototype,"time",2),re=a([f("daily-timetable-bell")],re);var $t=d`:host {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    width: 100%;
}

.info {
    font-size: 0.6rem;
}`;var z=class extends v{render(){return c`
            <div>
                <p>${this.title}</p>
                <p class="info">at ${this.time} with ${this.teacher}</p>
            </div>

            <p>${this.time}</p>
        `}};z.styles=[x,$t],a([h()],z.prototype,"title",2),a([h()],z.prototype,"time",2),a([h()],z.prototype,"teacher",2),a([h()],z.prototype,"room",2),z=a([f("daily-timetable-period")],z);var we=d`:host, main {
    padding: 0.8rem;

    margin: auto;

    width: 60vw;
    max-width: 60vh;
    min-width: 300px;
    height: 80%;
}

@media (max-width: 300px) {
    :host, main {
        width: 100vw;
        min-width: unset;
    }
}`;var Et=d`:host {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.next-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
}

.timer-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
}

.timer {
    font-size: 2.5rem;
}

.line {
    flex: 1;
    height: 0;
    border-top: solid 0.05rem var(--text3);
}

.periods {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    flex: 1;

    width: 80%;
}`;var ce=class extends H{constructor(){super();this.AddResource("dailytimetable","dailyTimetable")}GetBell(e){return c`<daily-timetable-bell title="${e.bellDisplay}" time="${e.time}"></daily-timetable-bell>`}GetPeriodTitle(e,t){return this.dailyTimetable.timetable.subjects[`${e}${t}`].title.split(" ").filter(r=>isNaN(parseFloat(r))&&r.length>1||r=="&").join(" ")}GetPeriod(e,t,i,r){return c`
        <daily-timetable-period title="${this.GetPeriodTitle(e.year,e.title)}"
                                time="${t.time}"
                                teacher="${i===void 0||i.type=="novariation"?e.fullTeacher:i.type=="nocover"?"No one":i.casualSurname??this.FormatTeacherCode(i.casual)}"
                                room="${r?.roomTo??e.room}"></daily-timetable-period>
        `}renderPage(){let e=this.dailyTimetable.bells,t=this.dailyTimetable.timetable.timetable.periods,i=Array.isArray(this.dailyTimetable.roomVariations)?{}:this.dailyTimetable.roomVariations,r=Array.isArray(this.dailyTimetable.classVariations)?{}:this.dailyTimetable.classVariations;return c`
            <div class="next-display">
                <p>Nothing</p>
                <p>in</p>
                <div class="timer-container">
                    <span class="line left"></span>
                    <h1 class="timer">Never</h1>
                    <span class="line right"></span>
                </div>
            </div>

            <div class="periods">
                ${e.map(o=>{if(o.period in t){let n=t[o.period];return"fullTeacher"in n&&"year"in n?this.GetPeriod(n,o,r[o.period],i[o.period]):this.GetBell(o)}else return this.GetBell(o)})}
            </div>
        `}};ce.styles=[T,we,x,Et],a([C()],ce.prototype,"dailyTimetable",2),ce=a([f("daily-timetable")],ce);var kt=d`:host {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

svg {
    width: inherit;
    height: inherit;
    animation: 3s infinite spin;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}`;var Ct=J`<svg width="529" height="528" viewBox="0 0 529 528" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="i"><use xlink:href="#a"/></clipPath><clipPath id="j"><use xlink:href="#b"/></clipPath><clipPath id="k"><use xlink:href="#c"/></clipPath><clipPath id="l"><use xlink:href="#d"/></clipPath><clipPath id="m"><use xlink:href="#e"/></clipPath><clipPath id="n"><use xlink:href="#f"/></clipPath><clipPath id="o"><use xlink:href="#g"/></clipPath><clipPath id="p"><use xlink:href="#h"/></clipPath><path d="M0 256a256 256 0 1 1 512 0 256 256 0 0 1-512 0Z" id="a"/><path d="M256 512a256 256 0 1 1 0-512 256 256 0 0 1 0 512Z" id="b"/><path d="M0 241.5a241.5 241.5 0 1 1 483 0 241.5 241.5 0 0 1-483 0Z" id="c"/><path d="M380 439.5a241.5 241.5 0 1 0-277-396 241.5 241.5 0 0 0 277 396c-.1 0 0 0 0 0Z" id="d"/><path d="M0 227a227 227 0 1 1 454 0 227 227 0 0 1-454 0Z" id="e"/><path d="M262.5 2.8a227 227 0 1 0 188.7 259.9A227 227 0 0 0 262.5 2.8Z" id="f"/><path d="M0 209.3a209.3 209.3 0 1 1 418.6 0 209.3 209.3 0 0 1-418.6 0Z" id="g"/><path d="M209.3 0a209.3 209.3 0 1 1 0 418.6 209.3 209.3 0 0 1 0-418.6Z" id="h"/></defs><path d="M8 264a256 256 0 1 1 512 0 256 256 0 0 1-512 0Z" fill="none"/><g clip-path="url(#i)" transform="translate(8 8)"><path d="M0 256a256 256 0 1 1 512 0 256 256 0 0 1-512 0Z" fill="none" stroke="#78AFA0" stroke-width="8" stroke-dasharray="76 4 70 76 4 70"/></g><path d="M264 520a256 256 0 1 1 0-512 256 256 0 0 1 0 512Z" fill="none"/><g clip-path="url(#j)" transform="translate(8 8)"><path d="M256 512a256 256 0 1 1 0-512 256 256 0 0 1 0 512Z" fill="none" stroke="#78AFA0" stroke-opacity=".3" stroke-width="8" stroke-dasharray="46 2 12 46 2 12"/></g><path d="M22.5 264a241.5 241.5 0 1 1 483 0 241.5 241.5 0 0 1-483 0Z" fill="none"/><g clip-path="url(#k)" transform="translate(22.5 22.5)"><path d="M0 241.5a241.5 241.5 0 1 1 483 0 241.5 241.5 0 0 1-483 0Z" fill="none" stroke="#DDA131" stroke-width="16" stroke-dasharray="76 2 40 180"/></g><path d="M402.5 461.8a241.5 241.5 0 1 0-277-396 241.5 241.5 0 0 0 277 396c-.1 0 0 0 0 0Z" fill="none"/><g clip-path="url(#l)" transform="translate(22.5 22.3)"><path d="M380 439.5a241.5 241.5 0 1 0-277-396 241.5 241.5 0 0 0 277 396c-.1 0 0 0 0 0Z" fill="none" stroke="#DDA131" stroke-opacity=".7" stroke-width="16" stroke-dasharray="56 2 4 56 2 4"/></g><path d="M37 264a227 227 0 1 1 454 0 227 227 0 0 1-454 0Z" fill="none"/><g clip-path="url(#m)" transform="translate(37 37)"><path d="M0 227a227 227 0 1 1 454 0 227 227 0 0 1-454 0Z" fill="none" stroke="#D36F2B" stroke-width="8" stroke-dasharray="51 4 10 80"/></g><path d="M299.5 39.7a227 227 0 1 0 188.7 259.8A227 227 0 0 0 299.5 39.7Z" fill="none"/><g clip-path="url(#n)" transform="translate(37 36.8)"><path d="M262.5 2.8a227 227 0 1 0 188.7 259.9A227 227 0 0 0 262.5 2.8Z" fill="none" stroke="#D36F2B" stroke-opacity=".4" stroke-width="8" stroke-dasharray="140 4 10 80"/></g><path d="M54.7 264a209.3 209.3 0 1 1 418.6 0 209.3 209.3 0 0 1-418.6 0Z" fill="none"/><g clip-path="url(#o)" transform="translate(54.7 54.7)"><path d="M0 209.3a209.3 209.3 0 1 1 418.6 0 209.3 209.3 0 0 1-418.6 0Z" fill="none" stroke="#C24127" stroke-width="4" stroke-dasharray="35 7 10 80"/></g><path d="M264 54.7a209.3 209.3 0 1 1 0 418.6 209.3 209.3 0 0 1 0-418.6Z" fill="none"/><g clip-path="url(#p)" transform="translate(54.7 54.7)"><path d="M209.3 0a209.3 209.3 0 1 1 0 418.6 209.3 209.3 0 0 1 0-418.6Z" fill="none" stroke="#C24127" stroke-opacity=".3" stroke-width="4" stroke-dasharray="35 7 10 80"/></g></svg>`;var $e=class extends v{render(){return Ct}};$e.styles=kt,$e=a([f("loading-indicator")],$e);var _t=d`:host {
    width: 100%;
    height: 100%;
}

loading-indicator {
    width: 30.8rem;
    height: 100%;
    margin: auto;
}

iframe {
    width: inherit;
    height: inherit;
    border: none;
}`;var G=class extends v{constructor(){super(...arguments);this.src=""}StopLoading(){this.loader.remove(),this.frame.removeAttribute("style")}render(){return c`
        <iframe @load="${this.StopLoading}" src="${this.src}" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" style="display: none"></iframe>
        <loading-indicator></loading-indicator>
        `}};G.styles=_t,a([h({type:String})],G.prototype,"src",2),a([k("iframe",!0)],G.prototype,"frame",2),a([k("loading-indicator",!0)],G.prototype,"loader",2),G=a([f("extension-page")],G);var Ee=d`a.button {
    text-decoration: none;
    cursor: default;
}

:where(button, .button) {
    border: solid 0.05rem var(--surface4);
    background-color: var(--surface2);
    color: var(--text2);
    padding: 0.4rem 0.8rem;
    border-radius: 0.4rem;
    box-shadow: var(--small-shadow);
    font-size: 1rem;
}

:where(button:hover, .button:hover) {
    background-color: var(--surface3);
    color: var(--text2);
}

:where(button:active, .button:active) {
    border: solid 0.05rem transparent;
    color: var(--text4);
    text-shadow: 0.1rem 0.1rem var(--shadow-colour);
    background-color: var(--surface4);
}`;var St=d`:host {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1.2rem;
}

img {
    width: 4rem;
    height: 4rem;

    border-radius: 100%;

    box-shadow: var(--small-shadow);
}

.content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.4rem;

    flex: 1;
}`;var j=class extends v{async Install(){await nt(this.title),document.getElementById("pages").requestUpdate()}async Uninstall(){await at(this.title),document.getElementById("pages").requestUpdate()}render(){return c`
        <img src="${this.img}">
        
        <div class="content">
            <h4>${this.title}</h4>
            <p>${this.description}</p>

            <button @click="${this.installed?this.Uninstall:this.Install}">${this.installed?"Uninstall":"Install"}</button>
        </div>
        `}};j.styles=[x,Ee,St],a([h()],j.prototype,"title",2),a([h()],j.prototype,"img",2),a([h()],j.prototype,"description",2),a([h({type:Boolean})],j.prototype,"installed",2),j=a([f("extension-display")],j);var At=d`:host {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    overscroll-behavior: contain;
}

.header {
    display: flex;
    justify-content: space-between;
}

.content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-template-rows: max-content;
    gap: 0.8rem;

    flex: 1;

    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--surface4) transparent;
}

.content::-webkit-scrollbar-track {
    background-color: transparent;

    width: 0.4rem;
}

.content::-webkit-scrollbar-thumb {
    background-color: var(--surface4);
    border-radius: 0.4rem;
}

.content:empty::after {
    content: "No extensions. Try searching for something else.";

    display: block;
    width: 100%;

    margin-top: 0.4rem;

    text-align: center;

    font-size: 1.4rem;
}`;var he=class extends v{constructor(){super();this.fetchingExtensions=!0;this.extensions=new Map;lt(e=>{this.fetchingExtensions=!1,this.extensions=e})}render(){let e=$.installedExtensions,t=[];for(var i of e.keys())t.push(i);return c`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${r=>this.searchFilter=r.target.value}">
            <input type="checkbox">
        </div>

        ${this.fetchingExtensions?b:c`
        <!--The ugliest code ever written, but the div tags for .content need to be where they are, or the :empty selector won't work-->
        <div class="content">${[...this.extensions.keys()].map(r=>c`
            <extension-display title="${r}" img="${ct(this.extensions.get(r))}"
                            description="${this.extensions.get(r).description}"
                            ?installed="${t.includes(r)}"></extension-display>
        `)}</div>
        `}
        `}};he.styles=[T,te,x,be,At],a([C()],he.prototype,"extensions",2),he=a([f("extensions-marketplace")],he);var Tt=d`:host {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;

    background-color: var(--surface2);
    padding: 0.6rem;
    border-radius: 0.6rem;
    box-shadow: var(--small-shadow);
}

button.indicator {
    --scale: 0.95;
}

loading-indicator {
    --scale: 1.1;
}

.indicator {
    all: unset;

    display: flex;

    width: calc(1rem * var(--scale));
    height: calc(1rem * var(--scale));
}

svg {
    width: inherit;
    height: inherit;
}`;var Rt=J`<svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#323232" stroke-width="10" stroke-linecap="round"><path d="m5 5 210 210M215 5 5 215"/></g></svg>`;var pe=class extends v{render(){return c`
        <slot></slot>
        ${this.loader?c`
        <loading-indicator class="indicator"></loading-indicator>`:c`
        <button class="indicator"  @click="${this.remove}" title="Close">
            ${Rt}
        </button>`}
        `}};pe.styles=[A,Tt],a([h({type:Boolean})],pe.prototype,"loader",2),pe=a([f("inline-notification")],pe);var Lt=d`:where(input[type=range]) {
    appearance: none;
    width: 7rem;
    background-color: var(--surface1);
    height: calc(1rem / 1.5);
    box-shadow: var(--small-shadow);
    border-radius: calc(1rem / 2.5);
}

:where(input[type=range])::-moz-range-thumb {
    -webkit-appearance: none;
    background-color: var(--surface4);
    border-radius: 100%;
    width: calc(1rem / 1.5);
    height: calc(1rem / 1.5);
    border: none;
    box-shadow: var(--small-shadow);
}

:where(input[type=range])::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: var(--surface4);
    border-radius: 100%;
    width: calc(1rem / 1.5);
    height: calc(1rem / 1.5);
    border: none;
    box-shadow: var(--small-shadow);
}`;var Pt=d`:host {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.2rem;
}

span {
    width: 80%;
    border-bottom: solid 0.05rem var(--text3);
}

#toggle {
    display: grid;

    padding: 0.4rem;
    width: 3.1rem;
    height: 3.1rem;

    appearance: none;
    -webkit-appearance: none;
}

#toggle::after {
    content: "";
    width: 100%;
    height: 100%;

    background-image: url(/images/moon.svg);
    background-size: contain;

    filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));

    pointer-events: none;
}

#toggle:checked::after {
    background-image: url(/images/sun.svg);
}

info-popup {
    position: absolute;
    top: 1.2rem;
    left: 1.2rem;
    width: 1.9rem;
    height: 1.9rem;
    --max-width: 30vmax;
    --offset: 2.6rem;
    z-index: 2;
}`;var se=class extends v{constructor(){super();this.version="0.0.0";g.GetVersion().then(e=>this.version=e)}Patch(){}ResetColour(){this.hueInput.value="200",g.SetHue("200"),g.SaveHue()}ToggleDark(e){let t=e.target;g.SetDark(t.checked),this.requestUpdate()}ToggleEditNavbar(){let e=document.querySelector("nav-bar");e&&e.toggleAttribute("editing")}render(){return c`
        <info-popup>
            Paragon is written by <a href="https://github.com/AndrewPerson">Andrew Pye</a>.
            <br>
            The source code is on <a href="https://github.com/AndrewPerson/Lit-Paragon-Client">Github</a>.
        </info-popup>

        <p id="version">Paragon v${this.version}</p>

        <button @click="${this.Patch}">Fix</button>

        <span></span>
        
        <p>Colour</p>

        <button @click="${this.ResetColour}">Reset</button>

        <input type="range" id="hue" min="0" max="359" value="${g.hue}"
               @input="${e=>g.SetHue(e.target.value)}"
               @change="${g.SaveHue.bind(g)}">

        <span></span>

        <p>${g.dark?"Dark":"Light"} Mode</p>

        <input type="checkbox" ?checked="${g.dark}" id="toggle" class="button" title="Turn on ${g.dark?"Light":"Dark"} Mode" @input="${this.ToggleDark}">
        
        <span></span>

        <p>Sidebar</p>

        <button @click="${this.ToggleEditNavbar}">Edit</button>
        `}};se.styles=[x,A,Ee,Lt,we,T,Pt],a([k("#hue",!0)],se.prototype,"hueInput",2),a([C()],se.prototype,"version",2),se=a([f("user-settings")],se);var Mt=d`:host {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.highlighted {
    border-radius: 0.4rem;

    background-color: var(--surface4);
    color: var(--text4);

    box-shadow: var(--shadow);
    text-shadow: 0.05rem 0.05rem var(--shadow-colour);

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
    width: 4rem;
    height: 1.5rem;
    text-align: center;
    line-height: 1.5rem;
}

@media (max-aspect-ratio: 3/4) {
    p {
        margin-top: 0.5vmax;
    }
}

#popup {
    position: absolute;
    top: 2rem;

    color: var(--text4);

    border-radius: 0.4rem;
    background-color: var(--surface4);

    box-shadow: var(--shadow);
    text-shadow: 0.05rem 0.05rem var(--shadow-colour);

    z-index: 97;

    animation: popupAppear 0.3s ease-out;

    pointer-events: none;
}

:host(.highlighted) > #popup {
    z-index: 98;
    box-shadow: 0 0 0 0.2rem var(--text1);
}

#popup::before {
    --size: 0.5rem;

    content: "";

    position: absolute;
    left: calc(50% - calc(var(--size) / 1.5));
    top: calc(-1 * var(--size));

    border-right: calc(var(--size) / 1.5) solid transparent;
    border-bottom: var(--size) solid var(--surface4);
    border-left: calc(var(--size) / 1.5) solid transparent;
}

#popup[reversed] {
    top: -2rem;
}

#popup[reversed]::before {
    top: unset;
    bottom: calc(-1 * var(--size));

    transform: rotate(180deg);
}

@keyframes popupAppear {
    from {
        filter: opacity(0);
    }

    to {
        filter: opacity(1);
    }
}`;var _=class extends v{static highlight(e){this.highlighted=e;for(let t of this.instances)t.requestUpdate()}constructor(){super();_.instances.push(this)}Highlight(){_.highlight(this.name),this.classList.add("highlighted")}Unhighlight(){_.highlight(""),this.classList.remove("highlighted")}firstUpdated(){this.name&&(this.tabIndex=0,this.addEventListener("mouseover",this.Highlight),this.addEventListener("mouseleave",this.Unhighlight),this.addEventListener("click",this.Highlight),this.addEventListener("focus",this.Highlight),this.addEventListener("blur",this.Unhighlight))}render(){if(_.highlighted==this.name&&this.name){let t=this.nextElementSibling,i=t?.nextElementSibling,r=t?.getAttribute("name")==this.name||i?.getAttribute("name")==this.name;return c`
            <p class="highlighted">${this.name}</p>
            <p id="popup"
                ?reversed="${r}">
                ${this.room}
            </p>
            `}else return c`<p>${this.name}</p>`}};_.styles=[x,Mt],_.instances=[],a([h()],_.prototype,"name",2),a([h()],_.prototype,"room",2),_=a([f("timetable-period")],_);var Ht=d`:host {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 4.5rem;
    min-width: 0;
}

.name {
    margin-bottom: 0.4rem;
    text-align: center;
    font-size: calc(1rem / 1.2);
    width: 3.63rem;
    color: var(--text3);
    border-bottom: solid grey 0.05rem;
}

.highlighted {
    color: var(--text2);
}`;var V=class extends v{render(){return c`
            <p class="name ${this.day==this.name?"highlighted":""}">${this.name}</p>
            
            <timetable-period name="${this.periods["1"]?.title}"
                              room="${this.periods["1"]?.room}">
            </timetable-period>
            <timetable-period name="${this.periods["2"]?.title}"
                              room="${this.periods["2"]?.room}">
            </timetable-period>
            <timetable-period name="${this.periods["3"]?.title}"
                              room="${this.periods["3"]?.room}">
            </timetable-period>
            <timetable-period name="${this.periods["4"]?.title}"
                              room="${this.periods["4"]?.room}">
            </timetable-period>
            <timetable-period name="${this.periods["5"]?.title}"
                              room="${this.periods["5"]?.room}">
            </timetable-period>
        `}};V.styles=[x,Ht],a([h()],V.prototype,"name",2),a([h({type:Array})],V.prototype,"periods",2),a([h()],V.prototype,"day",2),V=a([f("timetable-day")],V);var Nt=d`:host {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    padding-top: 0.4rem;
    margin-bottom: 0.4rem;
}

.period-nums {
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-start;
}

.period-nums > p {
    color: var(--text3);
    height: 1.5rem;
    line-height: 1.5rem;

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
}`;var M=class extends v{render(){return c`
            <div class="period-nums">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
            </div>

            <timetable-day name="MON ${this.week}"
                           .periods="${this.day1.periods}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="TUE ${this.week}"
                           .periods="${this.day2.periods}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="WED ${this.week}"
                           .periods="${this.day3.periods}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="THU ${this.week}"
                           .periods="${this.day4.periods}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="FRI ${this.week}"
                           .periods="${this.day5.periods}"
                           day="${this.day}">
            </timetable-day>
        `}};M.styles=[x,Nt],a([h()],M.prototype,"week",2),a([h({type:Object})],M.prototype,"day1",2),a([h({type:Object})],M.prototype,"day2",2),a([h({type:Object})],M.prototype,"day3",2),a([h({type:Object})],M.prototype,"day4",2),a([h({type:Object})],M.prototype,"day5",2),a([h()],M.prototype,"day",2),M=a([f("timetable-row")],M);var It=d`:host {
    margin: auto;
    padding: 1.6rem;
    max-width: 92%;
    width: 23rem;
    min-height: 29rem;
    max-height: 30rem;

    overflow-y: auto;

    scrollbar-width: thin;
    scrollbar-color: var(--surface4) transparent;
}

@media (max-aspect-ratio: 3/4) {
    :host {
        min-height: calc(29rem + 7.5vmax);
        max-height: calc(30rem + 7.5vmax);
    }
}

timetable-row + timetable-row {
    border-top: solid grey 0.05rem;
}`;var oe=class extends H{set dailyTimetable(e){this._day=e.timetable.timetable.dayname}ClearHighlight(){_.highlight("")}constructor(){super();this.AddResource("timetable","timetable"),this.AddResource("dailytimetable","dailyTimetable"),this.addEventListener("pointerover",e=>e.stopPropagation()),document.addEventListener("pointerover",this.ClearHighlight)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pointerover",this.ClearHighlight)}renderPage(){this._day=this._day.slice(0,3).toUpperCase()+" "+this._day.slice(-1);let e=Object.keys(this.timetable.days),t=[];for(let i=0;i<e.length;i++){let r=Math.floor(i/5);t.length>r?t[r].push(this.timetable.days[e[i]]):t[r]=[this.timetable.days[e[i]]]}return c`
            ${t.map((i,r)=>c`
            <timetable-row week="${String.fromCharCode(65+r)}"
                           .day1="${i[0]}"
                           .day2="${i[1]}"
                           .day3="${i[2]}"
                           .day4="${i[3]}"
                           .day5="${i[4]}"
                           day="${this._day}">
            </timetable-row>
            `)}
        `}};oe.styles=[T,It],a([C()],oe.prototype,"timetable",2),a([C()],oe.prototype,"_day",2),oe=a([f("full-timetable")],oe);Zt();async function Zt(){location.hash?Ut(location.hash):g.NavigateTo({page:document.querySelector("main").children[0].id,extension:!1}),ht(),window.addEventListener("hashchange",()=>{location.hash&&Ut(location.hash)});var t=await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");t?await t.update():await navigator.serviceWorker.register("dist/service-worker/service-worker.js",{scope:"/"});let s=sessionStorage.getItem("Last Reloaded"),e=Wt();if(s){let r=new Date(s);new Date().getTime()-r.getTime()>"3600"&&(S.FetchResources().then(e.remove.bind(e)),sessionStorage.setItem("Last Refreshed",new Date().toISOString()))}else S.FetchResources().then(e.remove.bind(e));var t=await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");t?await t.update():await navigator.serviceWorker.register("dist/service-worker/service-worker.js",{scope:"/"}),navigator.serviceWorker.addEventListener("message",r=>{r.data.command=="metadata-fetched"&&dt()});let i=await navigator.serviceWorker.ready;if(i.periodicSync){if(!(await i.periodicSync.getTags()).includes("metadata-fetch"))try{await i.periodicSync.register("metadata-fetch",{minInterval:"2592000000"})}catch{console.log("Couldn't register background fetch. Updates will be only occur when app is open.")}}else console.log("Couldn't register background fetch. Updates will be only occur when app is open.");navigator.serviceWorker.controller?.postMessage({command:"metadata-fetch"})}function Ut(s){let e=s.indexOf("extension-")==1,t="";e?t=decodeURIComponent(s.substring(11)):t=decodeURIComponent(s.substring(1)),g.NavigateTo({page:t,extension:e})}function Wt(){return g.ShowNotification("Updating resources...",!0)}
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
