var Ht=Object.defineProperty;var It=Object.getOwnPropertyDescriptor;var a=(s,e,t,i)=>{for(var r=i>1?void 0:i?It(e,t):e,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(e,t,r):n(r))||r);return i&&r&&Ht(e,t,r),r};var I=class{constructor(){this._callbacks=[]}AddListener(e){this._callbacks.push(e)}Invoke(e){for(let t of this._callbacks)t(e)}};var k=class{static ShowLoginNotification(){let e=document.createElement("p");e.innerHTML="You need to <a>login</a> to see the latest information.",g.ShowNotification(e)}static async GetToken(){let t=await(await caches.open("User Resources")).match("Token");if(!t)return location.href=`${location.origin}/login`,{valid:!1,token:null};let i=await t.json();return new Date>i.termination?(this.ShowLoginNotification(),{valid:!1,token:null}):{valid:!0,token:i}}static async SetResources(e){let t=await caches.open("User Resources"),i=e.map(r=>{let o=r.name,n=r.resource;return t.put(o,new Response(n)).then(()=>this._resourceCallbacks.get(o)?.Invoke(JSON.parse(n)))});await Promise.all(i)}static async SetResource(e,t){await(await caches.open("User Resources")).put(e,new Response(t)),this._resourceCallbacks.get(e)?.Invoke(JSON.parse(t))}static async GetResourceNow(e){let i=await(await caches.open("User Resources")).match(e);if(i)return await i.json()}static async GetResource(e,t){let i=this._resourceCallbacks.get(e)??new I;i.AddListener(t),this._resourceCallbacks.set(e,i),t(await this.GetResourceNow(e))}static async FetchResources(){let{valid:e,token:t}=await this.GetToken();if(!e)return!1;let i=new URL("https://sbhs-random-data.profsmart.repl.co/resources");i.searchParams.append("token",JSON.stringify(t));let r=await fetch(i.toString());if(!r.ok)return this.ShowLoginNotification(),!1;let o=await r.json();return await(await caches.open("User Resources")).put("Token",new Response(JSON.stringify(o.token))),await this.SetResources(Object.keys(o.result).map(c=>({name:c,resource:JSON.stringify(o.result[c])}))),!0}};k._resourceCallbacks=new Map;var ue=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$e=Symbol(),Pe=new Map,ge=class{constructor(e,t){if(this._$cssResult$=!0,t!==$e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=Pe.get(this.cssText);return ue&&e===void 0&&(Pe.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}},Le=s=>new ge(typeof s=="string"?s:s+"",$e),h=(s,...e)=>{let t=s.length===1?s[0]:e.reduce((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[o+1],s[0]);return new ge(t,$e)},Ee=(s,e)=>{ue?s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{let i=document.createElement("style"),r=window.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,s.appendChild(i)})},fe=ue?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Le(t)})(s):s;var ke,Ne=window.trustedTypes,Dt=Ne?Ne.emptyScript:"",He=window.reactiveElementPolyfillSupport,Ce={toAttribute(s,e){switch(e){case Boolean:s=s?Dt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},Ie=(s,e)=>e!==s&&(e==e||s==s),_e={attribute:!0,type:String,converter:Ce,reflect:!1,hasChanged:Ie},D=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();let e=[];return this.elementProperties.forEach((t,i)=>{let r=this._$Eh(i,t);r!==void 0&&(this._$Eu.set(r,i),e.push(r))}),e}static createProperty(e,t=_e){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){let i=typeof e=="symbol"?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);r!==void 0&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){let o=this[e];this[t]=r,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||_e}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){let t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(let r of i)this.createProperty(r,t[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let r of i)t.unshift(fe(r))}else e!==void 0&&t.push(fe(e));return t}static _$Eh(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;let t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Ee(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=_e){var r,o;let n=this.constructor._$Eh(e,i);if(n!==void 0&&i.reflect===!0){let c=((o=(r=i.converter)===null||r===void 0?void 0:r.toAttribute)!==null&&o!==void 0?o:Ce.toAttribute)(t,i.type);this._$Ei=e,c==null?this.removeAttribute(n):this.setAttribute(n,c),this._$Ei=null}}_$AK(e,t){var i,r,o;let n=this.constructor,c=n._$Eu.get(e);if(c!==void 0&&this._$Ei!==c){let d=n.getPropertyOptions(c),p=d.converter,A=(o=(r=(i=p)===null||i===void 0?void 0:i.fromAttribute)!==null&&r!==void 0?r:typeof p=="function"?p:null)!==null&&o!==void 0?o:Ce.fromAttribute;this._$Ei=c,this[c]=A(t,d.type),this._$Ei=null}}requestUpdate(e,t,i){let r=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Ie)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$E_===void 0&&(this._$E_=new Map),this._$E_.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((r,o)=>this[o]=r),this._$Et=void 0);let t=!1,i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(r=>{var o;return(o=r.hostUpdate)===null||o===void 0?void 0:o.call(r)}),this.update(i)):this._$EU()}catch(r){throw t=!1,this._$EU(),r}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var r;return(r=i.hostUpdated)===null||r===void 0?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$E_!==void 0&&(this._$E_.forEach((t,i)=>this._$ES(i,this[i],t)),this._$E_=void 0),this._$EU()}updated(e){}firstUpdated(e){}};D.finalized=!0,D.elementProperties=new Map,D.elementStyles=[],D.shadowRootOptions={mode:"open"},He==null||He({ReactiveElement:D}),((ke=globalThis.reactiveElementVersions)!==null&&ke!==void 0?ke:globalThis.reactiveElementVersions=[]).push("1.0.2");var Te,Z=globalThis.trustedTypes,De=Z?Z.createPolicy("lit-html",{createHTML:s=>s}):void 0,U=`lit$${(Math.random()+"").slice(9)}$`,Ue="?"+U,Ut=`<${Ue}>`,V=document,oe=(s="")=>V.createComment(s),ne=s=>s===null||typeof s!="object"&&typeof s!="function",Oe=Array.isArray,Ot=s=>{var e;return Oe(s)||typeof((e=s)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},ae=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ze=/-->/g,je=/>/g,q=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Be=/'/g,qe=/"/g,Fe=/^(?:script|style|textarea)$/i,Ge=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),m=Ge(1),O=Ge(2),H=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),Ze=new WeakMap,Ve=(s,e,t)=>{var i,r;let o=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e,n=o._$litPart$;if(n===void 0){let c=(r=t==null?void 0:t.renderBefore)!==null&&r!==void 0?r:null;o._$litPart$=n=new K(e.insertBefore(oe(),c),c,void 0,t??{})}return n._$AI(s),n},W=V.createTreeWalker(V,129,null,!1),zt=(s,e)=>{let t=s.length-1,i=[],r,o=e===2?"<svg>":"",n=ae;for(let d=0;d<t;d++){let p=s[d],A,f,x=-1,P=0;for(;P<p.length&&(n.lastIndex=P,f=n.exec(p),f!==null);)P=n.lastIndex,n===ae?f[1]==="!--"?n=ze:f[1]!==void 0?n=je:f[2]!==void 0?(Fe.test(f[2])&&(r=RegExp("</"+f[2],"g")),n=q):f[3]!==void 0&&(n=q):n===q?f[0]===">"?(n=r??ae,x=-1):f[1]===void 0?x=-2:(x=n.lastIndex-f[2].length,A=f[1],n=f[3]===void 0?q:f[3]==='"'?qe:Be):n===qe||n===Be?n=q:n===ze||n===je?n=ae:(n=q,r=void 0);let pe=n===q&&s[d+1].startsWith("/>")?" ":"";o+=n===ae?p+Ut:x>=0?(i.push(A),p.slice(0,x)+"$lit$"+p.slice(x)+U+pe):p+U+(x===-2?(i.push(void 0),d):pe)}let c=o+(s[t]||"<?>")+(e===2?"</svg>":"");return[De!==void 0?De.createHTML(c):c,i]},J=class{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,n=0,c=e.length-1,d=this.parts,[p,A]=zt(e,t);if(this.el=J.createElement(p,i),W.currentNode=this.el.content,t===2){let f=this.el.content,x=f.firstChild;x.remove(),f.append(...x.childNodes)}for(;(r=W.nextNode())!==null&&d.length<c;){if(r.nodeType===1){if(r.hasAttributes()){let f=[];for(let x of r.getAttributeNames())if(x.endsWith("$lit$")||x.startsWith(U)){let P=A[n++];if(f.push(x),P!==void 0){let pe=r.getAttribute(P.toLowerCase()+"$lit$").split(U),me=/([.?@])?(.*)/.exec(P);d.push({type:1,index:o,name:me[2],strings:pe,ctor:me[1]==="."?Je:me[1]==="?"?Ye:me[1]==="@"?Ke:le})}else d.push({type:6,index:o})}for(let x of f)r.removeAttribute(x)}if(Fe.test(r.tagName)){let f=r.textContent.split(U),x=f.length-1;if(x>0){r.textContent=Z?Z.emptyScript:"";for(let P=0;P<x;P++)r.append(f[P],oe()),W.nextNode(),d.push({type:2,index:++o});r.append(f[x],oe())}}}else if(r.nodeType===8)if(r.data===Ue)d.push({type:2,index:o});else{let f=-1;for(;(f=r.data.indexOf(U,f+1))!==-1;)d.push({type:7,index:o}),f+=U.length-1}o++}}static createElement(e,t){let i=V.createElement("template");return i.innerHTML=e,i}};function Y(s,e,t=s,i){var r,o,n,c;if(e===H)return e;let d=i!==void 0?(r=t._$Cl)===null||r===void 0?void 0:r[i]:t._$Cu,p=ne(e)?void 0:e._$litDirective$;return(d==null?void 0:d.constructor)!==p&&((o=d==null?void 0:d._$AO)===null||o===void 0||o.call(d,!1),p===void 0?d=void 0:(d=new p(s),d._$AT(s,t,i)),i!==void 0?((n=(c=t)._$Cl)!==null&&n!==void 0?n:c._$Cl=[])[i]=d:t._$Cu=d),d!==void 0&&(e=Y(s,d._$AS(s,e.values),d,i)),e}var We=class{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;let{el:{content:i},parts:r}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:V).importNode(i,!0);W.currentNode=o;let n=W.nextNode(),c=0,d=0,p=r[0];for(;p!==void 0;){if(c===p.index){let A;p.type===2?A=new K(n,n.nextSibling,this,e):p.type===1?A=new p.ctor(n,p.name,p.strings,this,e):p.type===6&&(A=new Xe(n,this,e)),this.v.push(A),p=r[++d]}c!==(p==null?void 0:p.index)&&(n=W.nextNode(),c++)}return o}m(e){let t=0;for(let i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},K=class{constructor(e,t,i,r){var o;this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cg=(o=r==null?void 0:r.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),ne(e)?e===y||e==null||e===""?(this._$AH!==y&&this._$AR(),this._$AH=y):e!==this._$AH&&e!==H&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.S(e):Ot(e)?this.M(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==y&&ne(this._$AH)?this._$AA.nextSibling.data=e:this.S(V.createTextNode(e)),this._$AH=e}T(e){var t;let{values:i,_$litType$:r}=e,o=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=J.createElement(r.h,this.options)),r);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.m(i);else{let n=new We(o,this),c=n.p(this.options);n.m(i),this.S(c),this._$AH=n}}_$AC(e){let t=Ze.get(e.strings);return t===void 0&&Ze.set(e.strings,t=new J(e)),t}M(e){Oe(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,r=0;for(let o of e)r===t.length?t.push(i=new K(this.A(oe()),this.A(oe()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){let r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},le=class{constructor(e,t,i,r,o){this.type=1,this._$AH=y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=y}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){let o=this.strings,n=!1;if(o===void 0)e=Y(this,e,t,0),n=!ne(e)||e!==this._$AH&&e!==H,n&&(this._$AH=e);else{let c=e,d,p;for(e=o[0],d=0;d<o.length-1;d++)p=Y(this,c[i+d],t,d),p===H&&(p=this._$AH[d]),n||(n=!ne(p)||p!==this._$AH[d]),p===y?e=y:e!==y&&(e+=(p??"")+o[d+1]),this._$AH[d]=p}n&&!r&&this.k(e)}k(e){e===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Je=class extends le{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===y?void 0:e}},jt=Z?Z.emptyScript:"",Ye=class extends le{constructor(){super(...arguments),this.type=4}k(e){e&&e!==y?this.element.setAttribute(this.name,jt):this.element.removeAttribute(this.name)}},Ke=class extends le{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){var i;if((e=(i=Y(this,e,t,0))!==null&&i!==void 0?i:y)===H)return;let r=this._$AH,o=e===y&&r!==y||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,n=e!==y&&(r===y||o);o&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}},Xe=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}};var Qe=window.litHtmlPolyfillSupport;Qe==null||Qe(J,K),((Te=globalThis.litHtmlVersions)!==null&&Te!==void 0?Te:globalThis.litHtmlVersions=[]).push("2.0.2");var Ae,Se;var b=class extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;let i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=Ve(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return H}};b.finalized=!0,b._$litElement$=!0,(Ae=globalThis.litElementHydrateSupport)===null||Ae===void 0||Ae.call(globalThis,{LitElement:b});var et=globalThis.litElementPolyfillSupport;et==null||et({LitElement:b});((Se=globalThis.litElementVersions)!==null&&Se!==void 0?Se:globalThis.litElementVersions=[]).push("3.0.2");var v=s=>e=>typeof e=="function"?((t,i)=>(window.customElements.define(t,i),i))(s,e):((t,i)=>{let{kind:r,elements:o}=i;return{kind:r,elements:o,finisher(n){window.customElements.define(t,n)}}})(s,e);var Bt=(s,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,s)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,s)}};function u(s){return(e,t)=>t!==void 0?((i,r,o)=>{r.constructor.createProperty(o,i)})(s,e,t):Bt(s,e)}function C(s){return u({...s,state:!0})}var X=({finisher:s,descriptor:e})=>(t,i)=>{var r;if(i===void 0){let o=(r=t.originalKey)!==null&&r!==void 0?r:t.key,n=e!=null?{kind:"method",placement:"prototype",key:o,descriptor:e(t.key)}:{...t,key:o};return s!=null&&(n.finisher=function(c){s(c,o)}),n}{let o=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),s==null||s(o,i)}};function _(s,e){return X({descriptor:t=>{let i={get(){var r,o;return(o=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(s))!==null&&o!==void 0?o:null},enumerable:!0,configurable:!0};if(e){let r=typeof t=="symbol"?Symbol():"__"+t;i.get=function(){var o,n;return this[r]===void 0&&(this[r]=(n=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(s))!==null&&n!==void 0?n:null),this[r]}}return i}})}var S=h`:where(img, svg) {
    filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
    cursor: default;

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}
`;var w=h`:root {
    font-size: var(--font-size);
}

:where(h1, h2, h3, h4, h5, h6, p) {
    margin: 0;
}

:where(*) {
    font-weight: 400;
    color: var(--text1);
    cursor: default;
    font-size: inherit;

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
}`;var tt=h`:host {
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
}`;var z=class extends b{constructor(){super(...arguments);this.pageName="";this.extension=!1;this.title="";this.editing=!1}get page(){return{page:this.pageName,extension:this.extension}}UpdatePage(e){e.preventDefault(),g.NavigateTo(this.page)}render(){return this.draggable=this.editing,g.page.page==this.page.page&&g.page.extension==this.page.extension?this.classList.add("selected"):this.classList.remove("selected"),m`
        <a href="#${this.extension?"extension-":""}${this.pageName}" @click="${this.UpdatePage}" title="${this.title}">
            <slot></slot>
        </a>

        ${this.editing?m`<img id="handle" src="images/drag.svg" draggable="false">`:y}
        `}};z.styles=[w,S,tt],a([u({type:String})],z.prototype,"pageName",2),a([u({type:Boolean})],z.prototype,"extension",2),a([u({type:String})],z.prototype,"title",2),a([u({type:Boolean})],z.prototype,"editing",2),z=a([v("nav-item")],z);var it=h`:host {
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
}`;var $=class extends b{constructor(){super(...arguments);this.editing=!1;this.pages=[];this.icons=[];this.order=[];this.draggedNavItemIndex=0;this.GetNavItem=((e,t)=>{let i,r,o,n=!1;return e<$.defaultPages.length?{page:i,title:r,icon:o}=$.defaultPages[e]:(i=this.pages[e-$.defaultPages.length],r=this.pages[e-$.defaultPages.length],o=this.icons[e-$.defaultPages.length],n=!0),m`
            <nav-item ?editing="${this.editing}" pageName="${i}" ?extension="${n}" title="${r}" 
                      @dragstart="${this.SetDraggedNavItemIndex}" @dragenter="${this.ReorderNavItems}" @dragover="${c=>c.preventDefault()}"
                      data-index="${t}">
                <img draggable="false" src="${o}">
            </nav-item>
        `}).bind(this)}static GetNavbarOrder(){return JSON.parse(localStorage.getItem("Nav Order")||"[0, 1, 2, 3, 4, 5]")}static SetNavbarOrder(e){localStorage.setItem("Nav Order",JSON.stringify(e)),document.querySelector("nav-bar").requestUpdate()}SetDraggedNavItemIndex(e){let t=e.target;!t.editing||t.dataset.index!==void 0&&(this.draggedNavItemIndex=parseInt(t.dataset.index),e.dataTransfer&&(e.dataTransfer.effectAllowed="copyLink"),e.dataTransfer?.setData("Text",t.id))}ReorderNavItems(e){let t=e.target;if(!t.editing||t.dataset.index===void 0)return;let i=parseInt(t.dataset.index);this.order.splice(i,0,this.order.splice(this.draggedNavItemIndex,1)[0]),this.draggedNavItemIndex=i,$.SetNavbarOrder(this.order)}createRenderRoot(){let e=super.createRenderRoot();return e.addEventListener("pointerdown",()=>{this.itemsContainer.classList.add("hover")}),e.addEventListener("pointerup",()=>{this.itemsContainer.classList.remove("hover")}),e}updated(){for(let e of this.shadowRoot?.querySelectorAll("nav-item"))e.requestUpdate()}render(){this.order=$.GetNavbarOrder();let e=E.installedExtensions;for(var t of e.keys())this.pages.push(t),this.icons.push(rt(e.get(t)));return m`
        <div id="items-container">
            ${this.order.map(this.GetNavItem)}
        </div>
        `}};$.styles=it,$.defaultPages=[{page:"daily-timetable",title:"Daily Timetable",icon:"images/dailytimetable.svg"},{page:"barcode",title:"ID Barcode",icon:"images/barcode.svg"},{page:"timetable",title:"Timetable",icon:"images/timetable.svg"},{page:"announcements",title:"Announcements",icon:"images/announcements.svg"},{page:"pages",title:"Pages Marketplace",icon:"images/marketplace.svg"},{page:"settings",title:"Settings",icon:"images/settings.svg"}],a([u({type:Boolean})],$.prototype,"editing",2),a([_("#items-container",!0)],$.prototype,"itemsContainer",2),$=a([v("nav-bar")],$);var E=class{};E.installedExtensions=new Map(Object.entries(JSON.parse(localStorage.getItem("Installed Extensions")||"{}"))),E._extensionCallbacks=new I,E._resourceListeners=new Map;function qt(){let s=[];for(let e of E.installedExtensions.values())s.push(new URL(e.url).origin);return s}async function st(s){let e=(await Me()).get(s);if(e){E.installedExtensions.set(s,e),localStorage.setItem("Installed Extensions",JSON.stringify(Object.fromEntries(E.installedExtensions)));let t=$.GetNavbarOrder();t.splice(t.length-1,0,t.length),$.SetNavbarOrder(t)}}async function ot(s){let e=E.installedExtensions,t=$.GetNavbarOrder(),i=t.indexOf(Object.keys(e).indexOf(s))+$.defaultPages.length,r=t.splice(i,1)[0];for(let n=0;n<t.length;n++)t[n]>r&&t[n]--;$.SetNavbarOrder(t);var o=document.getElementById(`extension-${s}`);o!==null&&o.remove(),E.installedExtensions.delete(s),localStorage.setItem("Installed Extensions",JSON.stringify(Object.fromEntries(E.installedExtensions)))}async function Me(){let e=await(await caches.open("Metadata")).match("Metadata");return e?new Map(Object.entries((await e.json()).pages||{})):new Map}async function nt(s){E._extensionCallbacks.AddListener(s),s(await Me())}async function at(){let s=await Me();E._extensionCallbacks.Invoke(s)}function lt(s){let e=new URL(s.icon,s.url);return e.search=`cache-version=${s.version}`,e.toString()}function rt(s){let e=new URL(s.navIcon,s.url);return e.searchParams.set("cache-version",s.version),e.toString()}function dt(){g.ListenForDark(e=>{for(let t=0;t<window.frames.length;t++)window.frames[t].postMessage({command:"Set Dark",data:{dark:e}},"*")}),g.ListenForHue(e=>{for(let t=0;t<window.frames.length;t++)window.frames[t].postMessage({command:"Set Hue",data:{hue:e}},"*")}),window.addEventListener("message",async e=>{let t=e.origin;!qt().includes(t)||e.source?.postMessage(await s(e),{targetOrigin:t})});async function s(e){let t=e.data.command,i=e.data.data;if(t=="Initialise")return{command:"Initialise",data:{dark:g.dark,hue:g.hue,version:await g.GetVersion()}};if(t=="Get Resource"){let r=E._resourceListeners.get(i.name),o=!1;r===void 0&&(o=!0,r=[]),r.push(e),E._resourceListeners.set(i.name,r),o&&k.GetResource(i.name,c=>{let d=E._resourceListeners.get(i.name)??[];for(let p of d)p.source?.postMessage({command:"Resource",data:{name:i.name,resource:c}},{targetOrigin:p.origin})});let n=await k.GetResourceNow(i.name);return{command:"Resource",data:{name:i.name,resource:n}}}if(t=="Get Token"){let r=await k.GetToken();return{command:"Token",data:{token:r.token===null?null:r.token.access_token,valid:r.valid}}}if(t=="Refresh Token"){if(!await k.FetchResources())return{command:"Refreshed Token",data:{token:null,valid:!1}};let o=await k.GetToken();return{command:"Refreshed Token",data:{token:o.token===null?null:o.token.access_token,valid:o.valid}}}if(t=="Show Notification"){if(i.loader&&typeof i.id!="string")return;let r=g.ShowNotification(i.contents,i.loader??!1);r.id=i.id;return}if(t=="Close Notification"){let r=document.getElementById(i.id);r!==null&&"Close"in r&&typeof r.Close=="function"&&r.Close();return}return t=="Ping"?{command:"Pong"}:{command:"Unknown Command",data:{command:t}}}}var g=class{static NavigateTo(e){if(e.extension){let t=E.installedExtensions;if(t.has(e.page)){let i=document.getElementById(`extension-${e.page}`);if(i===null){let r=document.createElement("extension-page");r.src=t.get(e.page).url,r.id=`extension-${e.page}`,document.querySelector("main")?.appendChild(r),i=r}this.SetPage(e,i)}}else this.SetPage(e,document.getElementById(e.page))}static SetPage(e,t){if(t){this._pageElement!=null&&this._pageElement.classList.add("hidden"),t.classList.remove("hidden"),this._pageElement=t,this.page=e,location.hash=e.extension?`extension-${e.page}`:e.page;let i=document.querySelector("nav-bar");i.removeAttribute("editing"),i.requestUpdate?.()}}static ShowNotification(e,t=!1){let i=document.createElement("inline-notification");return typeof e=="string"?i.innerText=e:i.appendChild(e),i.loader=t,document.getElementById("notification-area")?.appendChild(i),i}static SetDark(e){this.dark=e,document.documentElement.classList.toggle("dark",e),localStorage.setItem("Dark",e.toString()),this._darkCallbacks.Invoke(e)}static ListenForDark(e){this._darkCallbacks.AddListener(e)}static SetHue(e){document.documentElement.style.setProperty("--main-hue",e),document.documentElement.style.setProperty("--hue-rotate",`${parseFloat(e)-200}deg`),this.hue=e}static SaveHue(){localStorage.setItem("Hue",this.hue),this._hueCallbacks.Invoke(parseFloat(this.hue))}static ListenForHue(e){this._hueCallbacks.AddListener(e)}static async GetVersion(){var e=await caches.open("Metadata");let t=await e.match("Metadata");if(t)return(await t.json()).version}};g.page={page:"",extension:!1},g.dark=localStorage.getItem("Dark")=="true",g.hue=localStorage.getItem("Hue")||"200",g._pageElement=null,g._darkCallbacks=new I,g._hueCallbacks=new I;var L=class extends b{constructor(){super(...arguments);this._state=0;this._unreceivedResources=0;this._uncompletedResources=0}AddResource(e,t){this._unreceivedResources++,this._uncompletedResources++;let i=!1,r=!1;k.GetResource(e,o=>{i||(this._unreceivedResources--,i=!0),o!=null&&(r||(this._uncompletedResources--,r=!0),this[t]=o),this._uncompletedResources==0?this._state=2:this._unreceivedResources==0&&(this._state=1)})}render(){return this._state==0?y:this._state==1?m`
            <loading-indicator style="width: 30.8rem; height: 100%; margin: auto;"></loading-indicator>
            <style>
                :host {
                    display: flex;
                }
            </style>
            `:this.renderPage()}renderPage(){return y}};a([C()],L.prototype,"_state",2);var ct={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ht=s=>(...e)=>({_$litDirective$:s,values:e}),Re=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var ve=class extends Re{constructor(e){if(super(e),this.it=y,e.type!==ct.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===y||e==null)return this.vt=void 0,this.it=e;if(e===H)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this.vt;this.it=e;let t=[e];return t.raw=t,this.vt={_$litType$:this.constructor.resultType,strings:t,values:[]}}};ve.directiveName="unsafeHTML",ve.resultType=1;var pt=ht(ve);var mt=h`:host {
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
}`;var M=class extends b{render(){return m`
        <details>
            <summary>
                <h3>${this.title}</h3>
                <p class="info">By ${this.author} | For ${this.years}${this.meeting?` | At${this.meetingDate==""?"":` ${this.meetingDate}`} ${this.meetingTime}`:""}</p>
            </summary>

            ${pt(this.content)}
        </details>
        `}};M.styles=[w,mt],a([u()],M.prototype,"title",2),a([u()],M.prototype,"author",2),a([u()],M.prototype,"years",2),a([u({type:Boolean})],M.prototype,"meeting",2),a([u()],M.prototype,"meetingDate",2),a([u()],M.prototype,"meetingTime",2),a([u()],M.prototype,"content",2),a([u({type:Number})],M.prototype,"weight",2),M=a([v("announcement-post")],M);var be=h`:where(input[type=search]) {
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
}`;var ut=h`:where(select) {
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
}`;var Q=h`:host, main {
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
}`;var R=h`:host, main {
    box-shadow: var(--shadow);
    background-color: var(--surface2);
    border-radius: 0.8rem;
}`;var gt=h`:host {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
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
}`;var F=class extends L{constructor(){super();this.yearFilter="all";this.searchFilter="";this.AddResource("announcements","announcements")}renderPage(){let e=this.announcements.notices??[],t=this.yearFilter=="all"?e:e.filter(i=>(i.years??[]).includes(this.yearFilter));return t=this.searchFilter==""?t:t.filter(i=>{let r=i.title,o=i.content;return r==null||o===void 0||o===null?!1:r.toLowerCase().includes(this.searchFilter.toLowerCase())||o.toLowerCase().includes(this.searchFilter.toLowerCase())}),m`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${i=>this.searchFilter=i.target.value}">

            <select @input="${i=>this.yearFilter=i.target.value}">
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
        <div class="content">${t.map(i=>{let r=i.isMeeting==1,o=i.meetingDate??"";return new Date().toISOString().split("T")[0]==o&&(o=""),m`
            <announcement-post title="${i.title??"???"}" content="${i.content??"???"}"
                               author="${i.authorName??"???"}" years="${i.displayYears??"???"}"
                               ?meeting="${r}" meetingDate="${o}" meetingTime="${r?i.meetingTime??i.meetingTimeParsed??"??:??":""}"
                               weight="${(i.relativeWeight??0)+(r?1:0)}"></announcement-post>
            `})}</div>
        `}};F.styles=[w,S,be,ut,R,Q,gt],a([C()],F.prototype,"announcements",2),a([C()],F.prototype,"yearFilter",2),a([C()],F.prototype,"searchFilter",2),F=a([v("school-announcements")],F);var ft=h`:host {
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
}`;var vt=O`<svg width="210" height="210" viewBox="0 0 210 210" xmlns="http://www.w3.org/2000/svg"><path d="M5 105a100 100 0 1 1 200 0 100 100 0 0 1-200 0Z" fill="none" stroke="#323232" stroke-width="10"/><path d="M95.8 128.4v-.6q0-9.8 2-15.5 2-5.8 5.6-9.4 3.5-3.6 8.5-6.6 4.5-2.7 7.6-7.1 3-4.4 3-10.5 0-7.5-5-12-5.1-4.4-12.3-4.4-4.2 0-8 1.8-4 1.7-6.6 5.5-2.6 3.7-3 9.7H74.7q.4-8.7 4.5-14.9 4.2-6.2 11-9.4 6.7-3.3 15-3.3 9 0 15.7 3.6 6.6 3.6 10.3 9.8 3.7 6.2 3.7 14.2 0 8.5-3.8 14.5T120.5 104q-6.7 4.2-9.5 9.2-2.8 5-3 14.6v.6H95.9Zm6.5 30.3q-3.8 0-6.5-2.7t-2.7-6.5q0-3.8 2.7-6.5t6.5-2.7q3.8 0 6.5 2.7t2.7 6.5q0 3.8-2.7 6.5t-6.5 2.7Z"/></svg>`;var ee=class extends b{constructor(){super();this.HidePopup=(()=>{this.info.style.display="none",this.background.style.display="none"}).bind(this);this.addEventListener("mouseleave",this.HidePopup),document.addEventListener("pointerover",this.HidePopup)}ShowPopup(e){this.info.style.removeProperty("display"),this.background.style.removeProperty("display"),e.stopPropagation()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pointerover",this.HidePopup)}render(){return m`
        <button @click="${this.ShowPopup}" @mouseover="${this.ShowPopup}">
            ${vt}
        </button>

        <slot style="display: none"></slot>

        <div class="background" style="display: none"></div>
        `}};ee.styles=[S,ft],a([_("slot")],ee.prototype,"info",2),a([_(".background")],ee.prototype,"background",2),ee=a([v("info-popup")],ee);var bt=h`:host {
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

    width: calc(var(--size) * 2);
    height: calc(var(--size) * 2);

    margin: calc(var(--size) / -2);
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
    
    position: absolute;
    top: 1%;
    left: 1%;

    width: 1.9rem;
    height: 1.9rem;
    z-index: 2;
}

#save {
    all: unset;
    width: 1.7rem;
    height: 1.7rem;
    position: absolute;
    top: 1.25%;
    right: 1.25%;
}

#save > svg {
    width: inherit;
    height: inherit;
}`;var yt=O`<svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg"><path d="M173 9.7c-3-3-7-4.7-11.4-4.7H28.3A23.3 23.3 0 0 0 5 28.3v163.4A23.3 23.3 0 0 0 28.3 215h163.4a23.4 23.4 0 0 0 23.3-23.3V58.4c0-4.3-1.7-8.4-4.7-11.5L173 9.7Zm-63 181a32.3 32.3 0 1 1 0-64.5 32.3 32.3 0 0 1 0 64.6h0Zm24.2-113H37.3a8 8 0 0 1-8-8V37.2a8 8 0 0 1 8-8h97a8 8 0 0 1 8 8v32.3a8 8 0 0 1-8 8h0Z" fill="none" stroke="#323232" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>`;var j=class extends L{constructor(){super();this.draggedElement=null;this.dragging=!1;this.addEventListener("pointerdown",e=>e.preventDefault()),this.addEventListener("pointermove",this.DragPoint),this.addEventListener("pointerup",this.EndDrag),this.AddResource("userinfo","userInfo"),g.ListenForDark(e=>{this.barcode?.classList.toggle("outline",e)})}set userInfo(e){let t=e.studentId;t!=null&&(this.studentId=t,this.requestUpdate())}StartDrag(e){e.preventDefault(),this.draggedElement=e.target,this.draggedElement.style.pointerEvents="none",this.style.cursor="move"}DragPoint(e){e.preventDefault(),this.draggedElement!=null&&(this.dragging||(this.dragging=!0,this.draggedElement.style.left=`${(e.clientX-this.offsetLeft)/this.clientWidth*100}%`,this.draggedElement.style.top=`${(e.clientY-this.offsetTop)/this.clientHeight*100}%`,this.SetBarcodePosition(),this.dragging=!1))}EndDrag(){this.draggedElement!=null&&this.draggedElement.style.removeProperty("pointer-events"),this.draggedElement=null,this.removeAttribute("style"),this.RenderBarcode()}SetBarcodePosition(){if(this.barcode===null)return;let e=parseFloat(this.point1?.style.left.substring(0,this.point1.style.left.length-1)||"0"),t=parseFloat(this.point1?.style.top.substring(0,this.point1.style.top.length-1)||"0"),i=parseFloat(this.point2?.style.left.substring(0,this.point2.style.left.length-1)||"0"),r=parseFloat(this.point2?.style.top.substring(0,this.point2.style.top.length-1)||"0"),o=Math.max(e,i),n=Math.min(e,i),c=Math.max(t,r),d=Math.min(t,r);this.barcode.style.left=`${n}%`,this.barcode.style.top=`${d}%`,this.barcode.style.width=`${o-n}%`,this.barcode.style.height=`${c-d}%`}RenderBarcode(){if(this.draggedElement==null&&!(this.barcode===null||this.point1===null||this.point2===null)&&(localStorage.setItem("Barcode Points",JSON.stringify([this.point1.style.left,this.point1.style.top,this.point2.style.left,this.point2.style.top])),typeof JsBarcode=="function"&&JsBarcode(this.barcode,this.studentId,{displayValue:!1,margin:0}),this.saveLink!==null)){let e=this.barcode.toDataURL("image/png");this.saveLink.href=e,this.saveLink.download=`${this.studentId}.png`}}updated(){this.SetBarcodePosition(),this.RenderBarcode()}renderPage(){let e=localStorage.getItem("Barcode Points"),t=["20%","20%","80%","40%"];return e&&(t=JSON.parse(e)),m`
        <info-popup>Use this barcode to scan in instead of your Student Card. Drag the points to resize it.</info-popup>
        <a id="save" title="Save Barcode">${yt}</a>

        <div id="point1" style="left: ${t[0]}; top: ${t[1]};" @pointerdown="${this.StartDrag}"></div>
        <div id="point2" style="left: ${t[2]}; top: ${t[3]};" @pointerdown="${this.StartDrag}"></div>

        <canvas id="barcodeDisplay" class="${g.dark?"outline":""}" style="top: 20%; left: 20%; width: 60%; height: 20%;"></canvas>
        `}};j.styles=[w,S,R,Q,bt],a([_("#barcodeDisplay")],j.prototype,"barcode",2),a([_("#point1")],j.prototype,"point1",2),a([_("#point2")],j.prototype,"point2",2),a([_("#save")],j.prototype,"saveLink",2),j=a([v("student-barcode")],j);var xt=h`:host {
    display: flex;
    justify-content: space-between;

    width: 100%;

    padding: 0.5rem;
    border-radius: 0.5rem;
}

:host(:hover) {
    background-color: var(--surface3);
}

p {
    color: var(--text3);
}

.changed {
    color: var(--text2);
}`;var te=class extends b{render(){return m`
            <p>${this.title}</p>
            <p>${this.time}</p>
        `}};te.styles=[w,xt],a([u()],te.prototype,"title",2),a([u()],te.prototype,"time",2),te=a([v("daily-timetable-bell")],te);var wt=h`:host {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    width: 100%;

    padding: 0.5rem;
    border-radius: 0.5rem;
}

:host(:hover) {
    background-color: var(--surface3);
}

.info {
    font-size: 0.6rem;
}

.changed {
    color: var(--text2);
}`;var N=class extends b{render(){return m`
            <div>
                <p>${this.title}</p>
                <p class="info">at <span class="${this.roomChanged?"changed":""}">${this.room}</span> with <span class="${this.teacherChanged?"changed":""}">${this.teacher}</span></p>
            </div>

            <p>${this.time}</p>
        `}};N.styles=[w,wt],a([u()],N.prototype,"title",2),a([u()],N.prototype,"time",2),a([u()],N.prototype,"teacher",2),a([u({type:Boolean})],N.prototype,"teacherChanged",2),a([u()],N.prototype,"room",2),a([u({type:Boolean})],N.prototype,"roomChanged",2),N=a([v("daily-timetable-period")],N);var de=(i=>(i.NO_COVER="nocover",i.REPLACEMENT="replacement",i.NO_VARIATION="novariation",i))(de||{});var ye=h`:host, main {
    padding: 0.8rem;

    margin: auto;

    width: 60vw;
    max-width: 60vh;
    min-width: 300px;
    height: fit-content;
    min-height: 80%;
}

@media (max-width: 300px) {
    :host, main {
        width: 100vw;
        min-width: unset;
    }
}`;var $t=h`:host {
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
}`;var ie=class extends L{constructor(){super();this._dailyTimetableChanged=!1;this._savedPeriodsHtml=[];this.AddResource("dailytimetable","dailyTimetable"),setInterval(()=>{this.requestUpdate()},1e3)}set dailyTimetable(e){let t=e.bells;if(t==null){this._dailyTimetable=e;return}let i=e.timetable?.timetable?.periods??{},r=!1,o=[],n=[];for(let c=0;c<t.length;c++){let d=t[c];d.period!==void 0&&d.period!==null&&d.period in i?(r=!0,n=[]):r==!1?o.push(c):n.push(c)}o.push(...n);for(let c=o.length-1;c>=0;c--)t.splice(o[c],1);this._dailyTimetable=e,this._dailyTimetableChanged=!0}static UpdateData(){this.updatingData||(this.updatingData=!0,k.FetchResources().then(e=>{this.updatingData=!e}))}BellDate(e){let t=new Date(this._dailyTimetable.date??""),i=e.time?.split(":")??["00","00"],r=Number.parseInt(i[0]),o=Number.parseInt(i[1]);return t.setHours(r),t.setMinutes(o),t}NextBell(){let e=new Date;for(let t of this._dailyTimetable.bells??[]){if(t.time===void 0||t.time===null)continue;if(this.BellDate(t).getTime()>=e.getTime())return t}}TimeDisplay(e){let t=this.BellDate(e),i=new Date,r=t.getTime()-i.getTime();if(i.getMonth()>t.getMonth()&&i.getDate()>t.getDate()){let n=(t.getMonth()<i.getMonth()?t.getMonth()+12:t.getMonth())-i.getMonth();return{preposition:"in",time:n+(n==1?" Month":" Months")}}else if(r>864e5){var o=Math.round(r/864e5);return o==1?{preposition:"is",time:"Tomorrow"}:{preposition:"in",time:o+" Days"}}else{let n=Math.floor(r/36e5).toString(),c=Math.floor(r%36e5/6e4).toString(),d=Math.floor(r%36e5%6e4/1e3).toString();return n.length<2&&(n="0"+n),c.length<2&&(c="0"+c),d.length<2&&(d="0"+d),n=="00"?{preposition:"in",time:`${c}:${d}`}:{preposition:"in",time:`${n}:${c}:${d}`}}}GetBell(e){return m`<daily-timetable-bell title="${e.bellDisplay??"???"}" time="${e.time??"??:??"}"></daily-timetable-bell>`}GetPeriodTitle(e,t){return(this._dailyTimetable?.timetable?.subjects?.[`${e}${t}`]?.title??t).split(" ").filter(r=>isNaN(parseFloat(r))&&r.length>1||r=="&").join(" ")}FormatTeacherCode(e){return e.length==0?"":e.length==1?e.toUpperCase():e.length==2?`${e[0].toUpperCase()} ${e[1].toUpperCase()}`:`${e[0].toUpperCase()} ${e[1].toUpperCase()}${e.substring(2).toLowerCase()}`}GetPeriod(e,t,i,r){let o=i!=null&&i.type!="novariation",n=r!=null;return m`
        <daily-timetable-period title="${this.GetPeriodTitle(e.year??"?",e.title??"???")}"
                                time="${t.time??"??:??"}"
                                teacher="${i==null||i.type=="novariation"?e.fullTeacher??"???":i.type=="nocover"?"No one":i.casualSurname??this.FormatTeacherCode(i.casual??"????")}"
                                ?teacherChanged="${o}"
                                room="${r?.roomTo??e.room??"???"}"
                                ?roomChanged="${n}"></daily-timetable-period>
        `}renderPage(){let e=this.NextBell();e===void 0&&this.UpdateData();let t=this._dailyTimetable?.timetable?.timetable?.periods?.[e?.bell??""],i=e?.bellDisplay??"Nothing";t!=null&&"year"in t&&(i=this.GetPeriodTitle(t.year??"?",t.title??"???"));let r={time:"Never",preposition:"in"};e!==void 0&&(r=this.TimeDisplay(e));let o=this._dailyTimetable.bells??[],n=this._dailyTimetable.timetable?.timetable?.periods??{},c=(Array.isArray(this._dailyTimetable.roomVariations)?{}:this._dailyTimetable.roomVariations)??{},d=(Array.isArray(this._dailyTimetable.classVariations)?{}:this._dailyTimetable.classVariations)??{},p=this._dailyTimetableChanged?o.map(f=>{if(f.period!==void 0&&f.period!==null&&f.period in n){let x=n[f.period];return x!=null&&"fullTeacher"in x&&"year"in x?this.GetPeriod(x,f,d[f.period],c[f.period]):this.GetBell(f)}else return this.GetBell(f)}):this._savedPeriodsHtml,A=m`
            <div class="next-display">
                <p>${i}</p>
                <p>${r.preposition}</p>
                <div class="timer-container">
                    <span class="line left"></span>
                    <h1 class="timer">${r.time}</h1>
                    <span class="line right"></span>
                </div>
            </div>

            <div class="periods">
                ${p}
            </div>
        `;return this._dailyTimetableChanged=!1,this._savedPeriodsHtml=p,A}};ie.styles=[w,R,ye,$t],ie.updatingData=!1,a([C()],ie.prototype,"_dailyTimetable",2),ie=a([v("daily-timetable")],ie);var Et=h`:host {
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
}`;var kt=O`<svg width="529" height="528" viewBox="0 0 529 528" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="i"><use xlink:href="#a"/></clipPath><clipPath id="j"><use xlink:href="#b"/></clipPath><clipPath id="k"><use xlink:href="#c"/></clipPath><clipPath id="l"><use xlink:href="#d"/></clipPath><clipPath id="m"><use xlink:href="#e"/></clipPath><clipPath id="n"><use xlink:href="#f"/></clipPath><clipPath id="o"><use xlink:href="#g"/></clipPath><clipPath id="p"><use xlink:href="#h"/></clipPath><path d="M0 256a256 256 0 1 1 512 0 256 256 0 0 1-512 0Z" id="a"/><path d="M256 512a256 256 0 1 1 0-512 256 256 0 0 1 0 512Z" id="b"/><path d="M0 241.5a241.5 241.5 0 1 1 483 0 241.5 241.5 0 0 1-483 0Z" id="c"/><path d="M380 439.5a241.5 241.5 0 1 0-277-396 241.5 241.5 0 0 0 277 396c-.1 0 0 0 0 0Z" id="d"/><path d="M0 227a227 227 0 1 1 454 0 227 227 0 0 1-454 0Z" id="e"/><path d="M262.5 2.8a227 227 0 1 0 188.7 259.9A227 227 0 0 0 262.5 2.8Z" id="f"/><path d="M0 209.3a209.3 209.3 0 1 1 418.6 0 209.3 209.3 0 0 1-418.6 0Z" id="g"/><path d="M209.3 0a209.3 209.3 0 1 1 0 418.6 209.3 209.3 0 0 1 0-418.6Z" id="h"/></defs><path d="M8 264a256 256 0 1 1 512 0 256 256 0 0 1-512 0Z" fill="none"/><g clip-path="url(#i)" transform="translate(8 8)"><path d="M0 256a256 256 0 1 1 512 0 256 256 0 0 1-512 0Z" fill="none" stroke="#78AFA0" stroke-width="8" stroke-dasharray="76 4 70 76 4 70"/></g><path d="M264 520a256 256 0 1 1 0-512 256 256 0 0 1 0 512Z" fill="none"/><g clip-path="url(#j)" transform="translate(8 8)"><path d="M256 512a256 256 0 1 1 0-512 256 256 0 0 1 0 512Z" fill="none" stroke="#78AFA0" stroke-opacity=".3" stroke-width="8" stroke-dasharray="46 2 12 46 2 12"/></g><path d="M22.5 264a241.5 241.5 0 1 1 483 0 241.5 241.5 0 0 1-483 0Z" fill="none"/><g clip-path="url(#k)" transform="translate(22.5 22.5)"><path d="M0 241.5a241.5 241.5 0 1 1 483 0 241.5 241.5 0 0 1-483 0Z" fill="none" stroke="#DDA131" stroke-width="16" stroke-dasharray="76 2 40 180"/></g><path d="M402.5 461.8a241.5 241.5 0 1 0-277-396 241.5 241.5 0 0 0 277 396c-.1 0 0 0 0 0Z" fill="none"/><g clip-path="url(#l)" transform="translate(22.5 22.3)"><path d="M380 439.5a241.5 241.5 0 1 0-277-396 241.5 241.5 0 0 0 277 396c-.1 0 0 0 0 0Z" fill="none" stroke="#DDA131" stroke-opacity=".7" stroke-width="16" stroke-dasharray="56 2 4 56 2 4"/></g><path d="M37 264a227 227 0 1 1 454 0 227 227 0 0 1-454 0Z" fill="none"/><g clip-path="url(#m)" transform="translate(37 37)"><path d="M0 227a227 227 0 1 1 454 0 227 227 0 0 1-454 0Z" fill="none" stroke="#D36F2B" stroke-width="8" stroke-dasharray="51 4 10 80"/></g><path d="M299.5 39.7a227 227 0 1 0 188.7 259.8A227 227 0 0 0 299.5 39.7Z" fill="none"/><g clip-path="url(#n)" transform="translate(37 36.8)"><path d="M262.5 2.8a227 227 0 1 0 188.7 259.9A227 227 0 0 0 262.5 2.8Z" fill="none" stroke="#D36F2B" stroke-opacity=".4" stroke-width="8" stroke-dasharray="140 4 10 80"/></g><path d="M54.7 264a209.3 209.3 0 1 1 418.6 0 209.3 209.3 0 0 1-418.6 0Z" fill="none"/><g clip-path="url(#o)" transform="translate(54.7 54.7)"><path d="M0 209.3a209.3 209.3 0 1 1 418.6 0 209.3 209.3 0 0 1-418.6 0Z" fill="none" stroke="#C24127" stroke-width="4" stroke-dasharray="35 7 10 80"/></g><path d="M264 54.7a209.3 209.3 0 1 1 0 418.6 209.3 209.3 0 0 1 0-418.6Z" fill="none"/><g clip-path="url(#p)" transform="translate(54.7 54.7)"><path d="M209.3 0a209.3 209.3 0 1 1 0 418.6 209.3 209.3 0 0 1 0-418.6Z" fill="none" stroke="#C24127" stroke-opacity=".3" stroke-width="4" stroke-dasharray="35 7 10 80"/></g></svg>`;var xe=class extends b{render(){return kt}};xe.styles=Et,xe=a([v("loading-indicator")],xe);var Ct=h`:host {
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
}`;var G=class extends b{constructor(){super(...arguments);this.src=""}StopLoading(){this.loader.remove(),this.frame.removeAttribute("style")}render(){return m`
        <iframe @load="${this.StopLoading}" src="${this.src}" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" style="display: none"></iframe>
        <loading-indicator></loading-indicator>
        `}};G.styles=Ct,a([u({type:String})],G.prototype,"src",2),a([_("iframe",!0)],G.prototype,"frame",2),a([_("loading-indicator",!0)],G.prototype,"loader",2),G=a([v("extension-page")],G);var we=h`a.button {
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
}`;var _t=h`:host {
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
}`;var B=class extends b{async Install(){await st(this.title),document.getElementById("pages").requestUpdate()}async Uninstall(){await ot(this.title),document.getElementById("pages").requestUpdate()}render(){return m`
        <img src="${this.img}">
        
        <div class="content">
            <h4>${this.title}</h4>
            <p>${this.description}</p>

            <button @click="${this.installed?this.Uninstall:this.Install}">${this.installed?"Uninstall":"Install"}</button>
        </div>
        `}};B.styles=[w,we,_t],a([u()],B.prototype,"title",2),a([u()],B.prototype,"img",2),a([u()],B.prototype,"description",2),a([u({type:Boolean})],B.prototype,"installed",2),B=a([v("extension-display")],B);var Tt=h`:host {
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
}`;var ce=class extends b{constructor(){super();this.fetchingExtensions=!0;this.extensions=new Map;nt(e=>{this.fetchingExtensions=!1,this.extensions=e})}render(){let e=E.installedExtensions,t=[];for(var i of e.keys())t.push(i);return m`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${r=>this.searchFilter=r.target.value}">
            <input type="checkbox">
        </div>

        ${this.fetchingExtensions?y:m`
        <!--The ugliest code ever written, but the div tags for .content need to be where they are, or the :empty selector won't work-->
        <div class="content">${[...this.extensions.keys()].map(r=>m`
            <extension-display title="${r}" img="${lt(this.extensions.get(r))}"
                            description="${this.extensions.get(r).description}"
                            ?installed="${t.includes(r)}"></extension-display>
        `)}</div>
        `}
        `}};ce.styles=[w,be,R,Q,Tt],a([C()],ce.prototype,"extensions",2),ce=a([v("extensions-marketplace")],ce);var At=h`:host {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.6rem;

    max-width: var(--max-width, unset);

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
}`;var St=O`<svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#323232" stroke-width="10" stroke-linecap="round"><path d="m5 5 210 210M215 5 5 215"/></g></svg>`;var he=class extends b{constructor(){super(...arguments);this.Close=this.remove.bind(this)}render(){return m`
        <slot></slot>
        ${this.loader?m`
        <loading-indicator class="indicator"></loading-indicator>`:m`
        <button class="indicator"  @click="${this.remove}" title="Close">
            ${St}
        </button>`}
        `}};he.styles=[S,At],a([u({type:Boolean})],he.prototype,"loader",2),he=a([v("inline-notification")],he);var Mt=h`:where(input[type=range]) {
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
}`;var Rt=h`:host {
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
}`;var re=class extends b{constructor(){super();this.version="0.0.0";g.GetVersion().then(e=>this.version=e)}Patch(){}ResetColour(){this.hueInput.value="200",g.SetHue("200"),g.SaveHue()}ToggleDark(e){let t=e.target;g.SetDark(t.checked),this.requestUpdate()}ToggleEditNavbar(){let e=document.querySelector("nav-bar");e&&e.toggleAttribute("editing")}render(){return m`
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

        <span></span>

        <p>Errors</p>

        <button @click="${()=>{throw new Error("Test Error")}}">Create Error</button>
        `}};re.styles=[w,S,we,Mt,ye,R,Rt],a([_("#hue",!0)],re.prototype,"hueInput",2),a([C()],re.prototype,"version",2),re=a([v("user-settings")],re);var Pt=h`:host {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

:host(.highlighted) > p {
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
    line-height: 1.5;

    border-radius: 0.4rem;
}

#popup {
    position: absolute;
    top: 2rem;

    z-index: 97;

    pointer-events: none;
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

:host(:hover), :host(:focus) {
    z-index: 98;
}

:host(:hover) > p,
:host(:focus) > p {
    z-index: 98;
    box-shadow: 0 0 0 0.2rem var(--text1) !important;
}`;var T=class extends b{static Highlight(e){if(this.highlighted!=e){this.highlighted=e;for(let t of this.instances)t.requestUpdate()}}constructor(){super();T.instances.push(this)}Highlight(){T.Highlight(this.name),this.classList.add("highlighted")}Unhighlight(){T.Highlight(void 0),this.classList.remove("highlighted")}firstUpdated(){this.room!==void 0&&this.room!==null&&(this.tabIndex=0)}render(){let e=T.highlighted==this.name;return this.classList.toggle("highlighted",e),e||this.blur(),m`
        <p>${this.name}</p>
        <p id="popup"
           style="${e?"":"display: none"}">
            ${this.room}
        </p>
        `}};T.styles=[w,Pt],T.instances=[],a([u()],T.prototype,"name",2),a([u()],T.prototype,"room",2),T=a([v("timetable-period")],T);var Lt=h`:host {
    margin: auto;
    padding: 1.6rem;
    max-width: 92%;
    width: 25.2rem;
    min-height: 29rem;
    max-height: 98%;

    box-sizing: border-box;
}

table + table {
    border-top: solid grey 0.05rem;
}

table {
    counter-reset: period;

    display: grid;
    grid-template-columns: 3% repeat(5, calc(97% / 5));
    grid-template-rows: 0.5fr repeat(5, 1fr);

    width: 100%;
}

thead, tbody, tr {
    display: contents;
}

thead > tr {
    border-bottom: solid 0.05rem var(--text3);
}

tbody > tr {
    padding-top: 0.4rem;
    margin-bottom: 0.4rem;
}

tbody > tr::before {
    counter-increment: period;
    content: counter(period);

    color: var(--text3);

    line-height: 1.5;
}

td, th {
    text-align: center;
    padding: 0;
}

th {
    color: var(--text3);
    font-size: calc(1rem / 1.2);
}

th:not(:empty) {
    border-bottom: solid 0.05rem var(--text3);
}

.current-day {
    color: var(--text2);
}

td {
    height: 1.5rem;
    line-height: 1.5;
}

@media (pointer: coarse) {
    :host {
        min-height: 33.5rem;
    }

    td {
        height: 1.8rem;
        line-height: 1.8;
    }
}

timetable-period {
    width: 100%;
    height: 100%;
}`;var se=class extends L{set dailyTimetable(e){let t=e.timetable?.timetable?.dayname;t!=null&&(this._day=t.slice(0,3).toUpperCase()+" "+t.slice(-1).toUpperCase())}constructor(){super();this.AddResource("timetable","timetable"),this.AddResource("dailytimetable","dailyTimetable"),document.addEventListener("pointerover",this.ClearHighlight)}SetHighlight(e){T.Highlight(e.target.name),e.stopPropagation()}ClearHighlight(e){T.Highlight(void 0),e.stopPropagation()}CreateTable(e){let t=[],i=[];for(let r of e){let o=r.dayname??"???";t.push(o);let n=r.periods??{},c=Object.keys(n);for(let d=0;d<c.length;d++){let p=n[c[d]];p!=null&&(d>=i.length?i.push([p]):i[d].push(p))}}return m`
        <table>
            <thead>
                <tr>
                    <th></th>
                    ${t.map(r=>{let o=r.split(" "),n=`${o.shift()?.substring(0,3).toUpperCase()??"???"} ${o.map(c=>c.toUpperCase()).join(" ")}`;return m`
                        <th class="${n==this._day?"current-day":""}">${n}</th>
                        `})}
                </tr>
            </thead>
            <tbody>
                ${i.map(r=>m`
                <tr>
                    ${r.map(o=>{let n=o.title??"???";return m`
                        <td>
                            <timetable-period name="${n}" room="${o.room??"???"}"></timetable-period>
                        </td>
                        `})}
                </tr>
                `)}
            </tbody>
        </table>
        `}createRenderRoot(){let e=super.createRenderRoot();return e.addEventListener("pointerover",this.SetHighlight),e.addEventListener("focusin",this.SetHighlight),e}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pointerover",this.ClearHighlight)}renderPage(){let e=this.timetable.days??{},t=Object.keys(e),i=[],r=[];for(let o=0;o<t.length;o++){o%5==0&&(r.length>0&&i.push(this.CreateTable(r)),r=[]);let n=e[t[o]];n!=null&&r.push(n)}return r.length>0&&i.push(this.CreateTable(r)),m`${i}`}};se.styles=[w,R,Lt],a([C()],se.prototype,"timetable",2),a([C()],se.prototype,"_day",2),se=a([v("full-timetable")],se);Ft();async function Ft(){location.hash?Nt(location.hash):g.NavigateTo({page:document.querySelector("main").children[0].id,extension:!1}),dt(),window.addEventListener("hashchange",()=>{location.hash&&Nt(location.hash)});var t=await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");t?await t.update():await navigator.serviceWorker.register("dist/service-worker/service-worker.js",{scope:"/"});let s=sessionStorage.getItem("Last Reloaded"),e=Gt();if(s){let r=new Date(s);new Date().getTime()-r.getTime()>"3600"&&(k.FetchResources().then(e.Close),sessionStorage.setItem("Last Refreshed",new Date().toISOString()))}else k.FetchResources().then(e.Close);var t=await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");t?await t.update():await navigator.serviceWorker.register("dist/service-worker/service-worker.js",{scope:"/"}),navigator.serviceWorker.addEventListener("message",r=>{r.data.command=="metadata-fetched"&&at()});let i=await navigator.serviceWorker.ready;if(i.periodicSync){if(!(await i.periodicSync.getTags()).includes("metadata-fetch"))try{await i.periodicSync.register("metadata-fetch",{minInterval:"2592000000"})}catch{console.log("Couldn't register background fetch. Updates will be only occur when app is open.")}}else console.log("Couldn't register background fetch. Updates will be only occur when app is open.");navigator.serviceWorker.controller?.postMessage({command:"metadata-fetch"})}function Nt(s){let e=s.indexOf("extension-")==1,t="";e?t=decodeURIComponent(s.substring(11)):t=decodeURIComponent(s.substring(1)),g.NavigateTo({page:t,extension:e})}function Gt(){return g.ShowNotification("Updating resources...",!0)}
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
