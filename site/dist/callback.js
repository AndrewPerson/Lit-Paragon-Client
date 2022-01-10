var Pe=Object.defineProperty;var Oe=Object.getOwnPropertyDescriptor;var f=(n,e,t,i)=>{for(var s=i>1?void 0:i?Oe(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&Pe(e,t,s),s};var $=class{constructor(){this._callbacks=[]}AddListener(e){this._callbacks.push(e)}Invoke(e){for(let t of this._callbacks)t(e)}};var F=class{static ShowLoginNotification(){let e=document.createElement("p");e.innerHTML="You need to <a>login</a> to see the latest information.",g.ShowNotification(e)}static async GetToken(){let t=await(await caches.open("User Resources")).match("Token");if(!t)return location.href=`${location.origin}/login`,{valid:!1,token:null};let i=await t.json();return new Date>i.termination?(this.ShowLoginNotification(),{valid:!1,token:null}):{valid:!0,token:i}}static async SetResources(e){let t=await caches.open("User Resources"),i=e.map(s=>{let r=s.name,o=s.resource;return t.put(r,new Response(o)).then(()=>this._resourceCallbacks.get(r)?.Invoke(JSON.parse(o)))});await Promise.all(i)}static async SetResource(e,t){await(await caches.open("User Resources")).put(e,new Response(t)),this._resourceCallbacks.get(e)?.Invoke(JSON.parse(t))}static async GetResourceNow(e){let i=await(await caches.open("User Resources")).match(e);if(i)return await i.json()}static async GetResource(e,t){let i=this._resourceCallbacks.get(e)??new $;i.AddListener(t),this._resourceCallbacks.set(e,i),t(await this.GetResourceNow(e))}static async FetchResources(){let{valid:e,token:t}=await this.GetToken();if(!e)return!1;let i=new URL("https://sbhs-random-data.profsmart.repl.co/resources");i.searchParams.append("token",JSON.stringify(t));let s=await fetch(i.toString());if(!s.ok)return this.ShowLoginNotification(),!1;let r=await s.json();return await(await caches.open("User Resources")).put("Token",new Response(JSON.stringify(r.token))),await this.SetResources(Object.keys(r.result).map(d=>({name:d,resource:JSON.stringify(r.result[d])}))),!0}};F._resourceCallbacks=new Map;var q=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),se=new Map,V=class{constructor(e,t){if(this._$cssResult$=!0,t!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=se.get(this.cssText);return q&&e===void 0&&(se.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}},ne=n=>new V(typeof n=="string"?n:n+"",K),w=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new V(t,K)},Z=(n,e)=>{q?n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{let i=document.createElement("style"),s=window.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)})},J=q?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return ne(t)})(n):n;var Y,re=window.trustedTypes,Ne=re?re.emptyScript:"",oe=window.reactiveElementPolyfillSupport,Q={toAttribute(n,e){switch(e){case Boolean:n=n?Ne:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},ae=(n,e)=>e!==n&&(e==e||n==n),X={attribute:!0,type:String,converter:Q,reflect:!1,hasChanged:ae},_=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();let e=[];return this.elementProperties.forEach((t,i)=>{let s=this._$Eh(i,t);s!==void 0&&(this._$Eu.set(s,i),e.push(s))}),e}static createProperty(e,t=X){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){let i=typeof e=="symbol"?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){let r=this[e];this[t]=s,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||X}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){let t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(let s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(J(s))}else e!==void 0&&t.push(J(e));return t}static _$Eh(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;let t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Z(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=X){var s,r;let o=this.constructor._$Eh(e,i);if(o!==void 0&&i.reflect===!0){let d=((r=(s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==null&&r!==void 0?r:Q.toAttribute)(t,i.type);this._$Ei=e,d==null?this.removeAttribute(o):this.setAttribute(o,d),this._$Ei=null}}_$AK(e,t){var i,s,r;let o=this.constructor,d=o._$Eu.get(e);if(d!==void 0&&this._$Ei!==d){let a=o.getPropertyOptions(d),l=a.converter,v=(r=(s=(i=l)===null||i===void 0?void 0:i.fromAttribute)!==null&&s!==void 0?s:typeof l=="function"?l:null)!==null&&r!==void 0?r:Q.fromAttribute;this._$Ei=d,this[d]=v(t,a.type),this._$Ei=null}}requestUpdate(e,t,i){let s=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||ae)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$E_===void 0&&(this._$E_=new Map),this._$E_.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((s,r)=>this[r]=s),this._$Et=void 0);let t=!1,i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(s=>{var r;return(r=s.hostUpdate)===null||r===void 0?void 0:r.call(s)}),this.update(i)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$E_!==void 0&&(this._$E_.forEach((t,i)=>this._$ES(i,this[i],t)),this._$E_=void 0),this._$EU()}updated(e){}firstUpdated(e){}};_.finalized=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},oe==null||oe({ReactiveElement:_}),((Y=globalThis.reactiveElementVersions)!==null&&Y!==void 0?Y:globalThis.reactiveElementVersions=[]).push("1.0.2");var ee,R=globalThis.trustedTypes,le=R?R.createPolicy("lit-html",{createHTML:n=>n}):void 0,E=`lit$${(Math.random()+"").slice(9)}$`,de="?"+E,Le=`<${de}>`,T=document,M=(n="")=>T.createComment(n),D=n=>n===null||typeof n!="object"&&typeof n!="function",ce=Array.isArray,He=n=>{var e;return ce(n)||typeof((e=n)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,he=/-->/g,ue=/>/g,k=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,pe=/'/g,me=/"/g,ge=/^(?:script|style|textarea)$/i,fe=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),P=fe(1),Qe=fe(2),C=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ve=new WeakMap,ye=(n,e,t)=>{var i,s;let r=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e,o=r._$litPart$;if(o===void 0){let d=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:null;r._$litPart$=o=new H(e.insertBefore(M(),d),d,void 0,t??{})}return o._$AI(n),o},O=T.createTreeWalker(T,129,null,!1),Ue=(n,e)=>{let t=n.length-1,i=[],s,r=e===2?"<svg>":"",o=z;for(let a=0;a<t;a++){let l=n[a],v,c,u=-1,y=0;for(;y<l.length&&(o.lastIndex=y,c=o.exec(l),c!==null);)y=o.lastIndex,o===z?c[1]==="!--"?o=he:c[1]!==void 0?o=ue:c[2]!==void 0?(ge.test(c[2])&&(s=RegExp("</"+c[2],"g")),o=k):c[3]!==void 0&&(o=k):o===k?c[0]===">"?(o=s??z,u=-1):c[1]===void 0?u=-2:(u=o.lastIndex-c[2].length,v=c[1],o=c[3]===void 0?k:c[3]==='"'?me:pe):o===me||o===pe?o=k:o===he||o===ue?o=z:(o=k,s=void 0);let G=o===k&&n[a+1].startsWith("/>")?" ":"";r+=o===z?l+Le:u>=0?(i.push(v),l.slice(0,u)+"$lit$"+l.slice(u)+E+G):l+E+(u===-2?(i.push(void 0),a):G)}let d=r+(n[t]||"<?>")+(e===2?"</svg>":"");return[le!==void 0?le.createHTML(d):d,i]},N=class{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,o=0,d=e.length-1,a=this.parts,[l,v]=Ue(e,t);if(this.el=N.createElement(l,i),O.currentNode=this.el.content,t===2){let c=this.el.content,u=c.firstChild;u.remove(),c.append(...u.childNodes)}for(;(s=O.nextNode())!==null&&a.length<d;){if(s.nodeType===1){if(s.hasAttributes()){let c=[];for(let u of s.getAttributeNames())if(u.endsWith("$lit$")||u.startsWith(E)){let y=v[o++];if(c.push(u),y!==void 0){let G=s.getAttribute(y.toLowerCase()+"$lit$").split(E),B=/([.?@])?(.*)/.exec(y);a.push({type:1,index:r,name:B[2],strings:G,ctor:B[1]==="."?be:B[1]==="?"?$e:B[1]==="@"?_e:j})}else a.push({type:6,index:r})}for(let u of c)s.removeAttribute(u)}if(ge.test(s.tagName)){let c=s.textContent.split(E),u=c.length-1;if(u>0){s.textContent=R?R.emptyScript:"";for(let y=0;y<u;y++)s.append(c[y],M()),O.nextNode(),a.push({type:2,index:++r});s.append(c[u],M())}}}else if(s.nodeType===8)if(s.data===de)a.push({type:2,index:r});else{let c=-1;for(;(c=s.data.indexOf(E,c+1))!==-1;)a.push({type:7,index:r}),c+=E.length-1}r++}}static createElement(e,t){let i=T.createElement("template");return i.innerHTML=e,i}};function L(n,e,t=n,i){var s,r,o,d;if(e===C)return e;let a=i!==void 0?(s=t._$Cl)===null||s===void 0?void 0:s[i]:t._$Cu,l=D(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==l&&((r=a==null?void 0:a._$AO)===null||r===void 0||r.call(a,!1),l===void 0?a=void 0:(a=new l(n),a._$AT(n,t,i)),i!==void 0?((o=(d=t)._$Cl)!==null&&o!==void 0?o:d._$Cl=[])[i]=a:t._$Cu=a),a!==void 0&&(e=L(n,a._$AS(n,e.values),a,i)),e}var we=class{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;let{el:{content:i},parts:s}=this._$AD,r=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:T).importNode(i,!0);O.currentNode=r;let o=O.nextNode(),d=0,a=0,l=s[0];for(;l!==void 0;){if(d===l.index){let v;l.type===2?v=new H(o,o.nextSibling,this,e):l.type===1?v=new l.ctor(o,l.name,l.strings,this,e):l.type===6&&(v=new Ee(o,this,e)),this.v.push(v),l=s[++a]}d!==(l==null?void 0:l.index)&&(o=O.nextNode(),d++)}return r}m(e){let t=0;for(let i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},H=class{constructor(e,t,i,s){var r;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cg=(r=s==null?void 0:s.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=L(this,e,t),D(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==C&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.S(e):He(e)?this.M(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==p&&D(this._$AH)?this._$AA.nextSibling.data=e:this.S(T.createTextNode(e)),this._$AH=e}T(e){var t;let{values:i,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=N.createElement(s.h,this.options)),s);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.m(i);else{let o=new we(r,this),d=o.p(this.options);o.m(i),this.S(d),this._$AH=o}}_$AC(e){let t=ve.get(e.strings);return t===void 0&&ve.set(e.strings,t=new N(e)),t}M(e){ce(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let r of e)s===t.length?t.push(i=new H(this.A(M()),this.A(M()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){let s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},j=class{constructor(e,t,i,s,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){let r=this.strings,o=!1;if(r===void 0)e=L(this,e,t,0),o=!D(e)||e!==this._$AH&&e!==C,o&&(this._$AH=e);else{let d=e,a,l;for(e=r[0],a=0;a<r.length-1;a++)l=L(this,d[i+a],t,a),l===C&&(l=this._$AH[a]),o||(o=!D(l)||l!==this._$AH[a]),l===p?e=p:e!==p&&(e+=(l??"")+r[a+1]),this._$AH[a]=l}o&&!s&&this.k(e)}k(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},be=class extends j{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===p?void 0:e}},Ie=R?R.emptyScript:"",$e=class extends j{constructor(){super(...arguments),this.type=4}k(e){e&&e!==p?this.element.setAttribute(this.name,Ie):this.element.removeAttribute(this.name)}},_e=class extends j{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){var i;if((e=(i=L(this,e,t,0))!==null&&i!==void 0?i:p)===C)return;let s=this._$AH,r=e===p&&s!==p||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==p&&(s===p||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}},Ee=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){L(this,e)}};var xe=window.litHtmlPolyfillSupport;xe==null||xe(N,H),((ee=globalThis.litHtmlVersions)!==null&&ee!==void 0?ee:globalThis.litHtmlVersions=[]).push("2.0.2");var te,ie;var b=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;let i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=ye(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return C}};b.finalized=!0,b._$litElement$=!0,(te=globalThis.litElementHydrateSupport)===null||te===void 0||te.call(globalThis,{LitElement:b});var Se=globalThis.litElementPolyfillSupport;Se==null||Se({LitElement:b});((ie=globalThis.litElementVersions)!==null&&ie!==void 0?ie:globalThis.litElementVersions=[]).push("3.0.2");var W=n=>e=>typeof e=="function"?((t,i)=>(window.customElements.define(t,i),i))(n,e):((t,i)=>{let{kind:s,elements:r}=i;return{kind:s,elements:r,finisher(o){window.customElements.define(t,o)}}})(n,e);var Me=(n,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,n)}};function x(n){return(e,t)=>t!==void 0?((i,s,r)=>{s.constructor.createProperty(r,i)})(n,e,t):Me(n,e)}var U=({finisher:n,descriptor:e})=>(t,i)=>{var s;if(i===void 0){let r=(s=t.originalKey)!==null&&s!==void 0?s:t.key,o=e!=null?{kind:"method",placement:"prototype",key:r,descriptor:e(t.key)}:{...t,key:r};return n!=null&&(o.finisher=function(d){n(d,r)}),o}{let r=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),n==null||n(r,i)}};function I(n,e){return U({descriptor:t=>{let i={get(){var s,r;return(r=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(n))!==null&&r!==void 0?r:null},enumerable:!0,configurable:!0};if(e){let s=typeof t=="symbol"?Symbol():"__"+t;i.get=function(){var r,o;return this[s]===void 0&&(this[s]=(o=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(n))!==null&&o!==void 0?o:null),this[s]}}return i}})}var Ae=w`:where(img, svg) {
    filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
    cursor: default;

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}
`;var ke=w`:where(h1, h2, h3, h4, h5, h6, p) {
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
}`;var Ce=w`:host {
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
}`;var S=class extends b{constructor(){super(...arguments);this.pageName="";this.extension=!1;this.title="";this.editing=!1}get page(){return{page:this.pageName,extension:this.extension}}UpdatePage(e){e.preventDefault(),g.NavigateTo(this.page)}render(){return this.draggable=this.editing,g.page.page==this.page.page&&g.page.extension==this.page.extension?this.classList.add("selected"):this.classList.remove("selected"),P`
        <a href="#${this.extension?"extension-":""}${this.pageName}" @click="${this.UpdatePage}" title="${this.title}">
            <slot></slot>
        </a>

        ${this.editing?P`<img id="handle" src="images/drag.svg" draggable="false">`:p}
        `}};S.styles=[ke,Ae,Ce],f([x({type:String})],S.prototype,"pageName",2),f([x({type:Boolean})],S.prototype,"extension",2),f([x({type:String})],S.prototype,"title",2),f([x({type:Boolean})],S.prototype,"editing",2),S=f([W("nav-item")],S);var Re=w`:host {
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
}`;var m=class extends b{constructor(){super();this.editing=!1;this.pages=[];this.icons=[];this.order=[];this.draggedNavItemIndex=0;this.GetNavItem=((e,t)=>{let i,s,r,o=!1;return e<m.defaultPages.length?{page:i,title:s,icon:r}=m.defaultPages[e]:(i=this.pages[e-m.defaultPages.length],s=this.pages[e-m.defaultPages.length],r=this.icons[e-m.defaultPages.length],o=!0),P`
            <nav-item ?editing="${this.editing}" pageName="${i}" ?extension="${o}" title="${s}" 
                      @dragstart="${this.SetDraggedNavItemIndex}" @dragenter="${this.ReorderNavItems}" @dragover="${d=>d.preventDefault()}"
                      data-index="${t}">
                <img draggable="false" src="${r}">
            </nav-item>
        `}).bind(this);matchMedia("(max-aspect-ratio: 1/1)").onchange=this.ShowShadows.bind(this)}static GetNavbarOrder(){return JSON.parse(localStorage.getItem("Nav Order")||"[0, 1, 2, 3, 4, 5]")}static SetNavbarOrder(e){localStorage.setItem("Nav Order",JSON.stringify(e)),document.querySelector("nav-bar").requestUpdate()}SetDraggedNavItemIndex(e){let t=e.target;!t.editing||t.dataset.index!==void 0&&(this.draggedNavItemIndex=parseInt(t.dataset.index),e.dataTransfer&&(e.dataTransfer.effectAllowed="copyLink"),e.dataTransfer?.setData("Text",t.id))}ReorderNavItems(e){let t=e.target;if(!t.editing||t.dataset.index===void 0)return;let i=parseInt(t.dataset.index);this.order.splice(i,0,this.order.splice(this.draggedNavItemIndex,1)[0]),this.draggedNavItemIndex=i,m.SetNavbarOrder(this.order)}ShowShadows(){!this.shadowRoot||(window.innerWidth<=window.innerHeight?(this.topShadow.style.display="none",this.bottomShadow.style.display="none",this.itemsContainer.scrollLeft==0?this.leftShadow.style.display="none":this.leftShadow.style.removeProperty("display"),this.itemsContainer.scrollLeft>=this.itemsContainer.scrollWidth-this.itemsContainer.clientWidth-1?this.rightShadow.style.display="none":this.rightShadow.style.removeProperty("display")):(this.leftShadow.style.display="none",this.rightShadow.style.display="none",this.itemsContainer.scrollTop==0?this.topShadow.style.display="none":this.topShadow.style.removeProperty("display"),this.itemsContainer.scrollTop>=this.itemsContainer.scrollHeight-this.itemsContainer.clientHeight-1?this.bottomShadow.style.display="none":this.bottomShadow.style.removeProperty("display")))}createRenderRoot(){let e=super.createRenderRoot();return e.addEventListener("pointerdown",()=>{this.itemsContainer.classList.add("hover")}),e.addEventListener("pointerup",()=>{this.itemsContainer.classList.remove("hover")}),e}firstUpdated(){this.itemsContainer.addEventListener("scroll",this.ShowShadows.bind(this))}updated(){for(let e of this.shadowRoot?.querySelectorAll("nav-item"))e.requestUpdate()}render(){this.order=m.GetNavbarOrder();let e=A.installedExtensions;for(var t of e.keys())this.pages.push(t),this.icons.push(Te(e.get(t)));let i=window.innerWidth<=window.innerHeight,s=i?window.innerWidth/100:window.innerHeight/100,r=this.order.length*12*s>window.innerHeight;return P`
        <div id="items-container">
            ${this.order.map(this.GetNavItem)}
        
            <div id="top-shadow" style="display: none"></div>
            <div id="bottom-shadow" style="${!i&&r?"":"display: none"}"></div>
            <div id="left-shadow" style="display: none"></div>
            <div id="right-shadow" style="${i&&r?"":"display: none"}"></div>
        </div>
        `}};m.styles=Re,m.defaultPages=[{page:"daily-timetable",title:"Daily Timetable",icon:"images/dailytimetable.svg"},{page:"barcode",title:"ID Barcode",icon:"images/barcode.svg"},{page:"timetable",title:"Timetable",icon:"images/timetable.svg"},{page:"announcements",title:"Announcements",icon:"images/announcements.svg"},{page:"pages",title:"Pages Marketplace",icon:"images/marketplace.svg"},{page:"settings",title:"Settings",icon:"images/settings.svg"}],f([x({type:Boolean})],m.prototype,"editing",2),f([I("#items-container",!0)],m.prototype,"itemsContainer",2),f([I("#top-shadow",!0)],m.prototype,"topShadow",2),f([I("#bottom-shadow",!0)],m.prototype,"bottomShadow",2),f([I("#left-shadow",!0)],m.prototype,"leftShadow",2),f([I("#right-shadow",!0)],m.prototype,"rightShadow",2),m=f([W("nav-bar")],m);var A=class{};A.installedExtensions=new Map(Object.entries(JSON.parse(localStorage.getItem("Installed Extensions")||"{}"))),A._extensionCallbacks=new $,A._resourceListeners=new Map;function Te(n){let e=new URL(n.navIcon,n.url);return e.searchParams.set("cache-version",n.version),e.toString()}var g=class{static NavigateTo(e){if(e.extension){let t=A.installedExtensions;if(t.has(e.page)){let i=document.getElementById(`extension-${e.page}`);if(i===null){let s=document.createElement("extension-page");s.src=t.get(e.page).url,s.id=`extension-${e.page}`,document.querySelector("main")?.appendChild(s),i=s}this.SetPage(e,i)}}else this.SetPage(e,document.getElementById(e.page))}static SetPage(e,t){if(t){this._pageElement!=null&&this._pageElement.classList.add("hidden"),t.classList.remove("hidden"),this._pageElement=t,this.page=e,location.hash=e.extension?`extension-${e.page}`:e.page;let i=document.querySelector("nav-bar");i.removeAttribute("editing"),i.requestUpdate?.()}}static ShowNotification(e,t=!1){let i=document.createElement("inline-notification");return typeof e=="string"?i.innerText=e:i.appendChild(e),i.loader=t,document.getElementById("notification-area")?.appendChild(i),i}static SetDark(e){this.dark=e,document.documentElement.classList.toggle("dark",e),localStorage.setItem("Dark",e.toString()),this._darkCallbacks.Invoke(e)}static ListenForDark(e){this._darkCallbacks.AddListener(e)}static SetHue(e){document.documentElement.style.setProperty("--main-hue",e),document.documentElement.style.setProperty("--hue-rotate",`${parseFloat(e)-200}deg`),this.hue=e}static SaveHue(){localStorage.setItem("Hue",this.hue),this._hueCallbacks.Invoke(parseFloat(this.hue))}static ListenForHue(e){this._hueCallbacks.AddListener(e)}static async GetVersion(){var e=await caches.open("Metadata");let t=await e.match("Metadata");if(t)return(await t.json()).version}};g.page={page:"",extension:!1},g.dark=localStorage.getItem("Dark")=="true",g.hue=localStorage.getItem("Hue")||"200",g._pageElement=null,g._darkCallbacks=new $,g._hueCallbacks=new $;g.dark&&(document.getElementById("logo-p").src="images/logo-dark.svg");async function De(n){let e=await fetch("https://sbhs-random-data.profsmart.repl.co/auth",{method:"POST",body:n});return e.status!=200||!e?!1:((await caches.open("User Resources")).put("Token",e),!0)}var ze=new URLSearchParams(window.location.search),je=ze.get("code");De(je).then(n=>{location.href=`${location.origin}/${n?"":"login"}`});
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
