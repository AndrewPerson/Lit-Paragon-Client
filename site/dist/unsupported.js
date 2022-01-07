(()=>{var Oe=Object.defineProperty;var Le=Object.getOwnPropertyDescriptor;var f=(r,e,t,i)=>{for(var s=i>1?void 0:i?Le(e,t):e,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&Oe(e,t,s),s};var _=class{static ShowLoginNotification(){let e=document.createElement("p");e.innerHTML="You need to <a>login</a> to see the latest information.",p.ShowNotification(e)}static async GetToken(){let t=await(await caches.open("User Resources")).match("Token");if(!t)return location.href=`${location.origin}/login`,{valid:!1,token:null};let i=await t.json();return new Date>i.termination?(this.ShowLoginNotification(),{valid:!1,token:null}):{valid:!0,token:i}}static async SetResources(e){let t=await caches.open("User Resources"),i=[];e.forEach(s=>{let n=s.name,o=s.resource;i.push(t.put(n,new Response(o)).then(()=>this._resourceCallbacks.get(n)?.Invoke(JSON.parse(o))))}),await Promise.all(i)}static async SetResource(e,t){await(await caches.open("User Resources")).put(e,new Response(t)),this._resourceCallbacks.get(e)?.Invoke(JSON.parse(t))}static async GetResourceNow(e){let i=await(await caches.open("User Resources")).match(e);if(i)return await i.json()}static async GetResource(e,t){let i=this._resourceCallbacks.get(e);i!==void 0&&(i.AddListener(t),this._resourceCallbacks.set(e,i)),t(await this.GetResourceNow(e))}static async FetchResources(){let{valid:e,token:t}=await this.GetToken();if(!e)return!1;let i=new URL("https://sbhs-random-data.profsmart.repl.co/resources");i.searchParams.append("token",JSON.stringify(t));let s=await fetch(i.toString());if(!s.ok)return this.ShowLoginNotification(),!1;let n=await s.json();return await(await caches.open("User Resources")).put("Token",new Response(JSON.stringify(n.token))),await this.SetResources(Object.keys(n.result).map(l=>({name:l,resource:JSON.stringify(n.result[l])}))),!0}};_._resourceCallbacks=new Map;var P=class{constructor(){this._callbacks=[]}AddListener(e){this._callbacks.push(e)}Invoke(e){for(let t of this._callbacks)t(e)}};var J=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),re=new Map,F=class{constructor(e,t){if(this._$cssResult$=!0,t!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=re.get(this.cssText);return J&&e===void 0&&(re.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}},oe=r=>new F(typeof r=="string"?r:r+"",Z),b=(r,...e)=>{let t=r.length===1?r[0]:e.reduce((i,s,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1],r[0]);return new F(t,Z)},Y=(r,e)=>{J?r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{let i=document.createElement("style"),s=window.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,r.appendChild(i)})},W=J?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return oe(t)})(r):r;var Q,ae=window.trustedTypes,He=ae?ae.emptyScript:"",le=window.reactiveElementPolyfillSupport,X={toAttribute(r,e){switch(e){case Boolean:r=r?He:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},de=(r,e)=>e!==r&&(e==e||r==r),ee={attribute:!0,type:String,converter:X,reflect:!1,hasChanged:de},E=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();let e=[];return this.elementProperties.forEach((t,i)=>{let s=this._$Eh(i,t);s!==void 0&&(this._$Eu.set(s,i),e.push(s))}),e}static createProperty(e,t=ee){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){let i=typeof e=="symbol"?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){let n=this[e];this[t]=s,this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||ee}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){let t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(let s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(W(s))}else e!==void 0&&t.push(W(e));return t}static _$Eh(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;let t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Y(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=ee){var s,n;let o=this.constructor._$Eh(e,i);if(o!==void 0&&i.reflect===!0){let l=((n=(s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==null&&n!==void 0?n:X.toAttribute)(t,i.type);this._$Ei=e,l==null?this.removeAttribute(o):this.setAttribute(o,l),this._$Ei=null}}_$AK(e,t){var i,s,n;let o=this.constructor,l=o._$Eu.get(e);if(l!==void 0&&this._$Ei!==l){let a=o.getPropertyOptions(l),d=a.converter,v=(n=(s=(i=d)===null||i===void 0?void 0:i.fromAttribute)!==null&&s!==void 0?s:typeof d=="function"?d:null)!==null&&n!==void 0?n:X.fromAttribute;this._$Ei=l,this[l]=v(t,a.type),this._$Ei=null}}requestUpdate(e,t,i){let s=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||de)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$E_===void 0&&(this._$E_=new Map),this._$E_.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((s,n)=>this[n]=s),this._$Et=void 0);let t=!1,i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(s=>{var n;return(n=s.hostUpdate)===null||n===void 0?void 0:n.call(s)}),this.update(i)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$E_!==void 0&&(this._$E_.forEach((t,i)=>this._$ES(i,this[i],t)),this._$E_=void 0),this._$EU()}updated(e){}firstUpdated(e){}};E.finalized=!0,E.elementProperties=new Map,E.elementStyles=[],E.shadowRootOptions={mode:"open"},le==null||le({ReactiveElement:E}),((Q=globalThis.reactiveElementVersions)!==null&&Q!==void 0?Q:globalThis.reactiveElementVersions=[]).push("1.0.2");var te,T=globalThis.trustedTypes,ce=T?T.createPolicy("lit-html",{createHTML:r=>r}):void 0,x=`lit$${(Math.random()+"").slice(9)}$`,he="?"+x,Ne=`<${he}>`,R=document,D=(r="")=>R.createComment(r),z=r=>r===null||typeof r!="object"&&typeof r!="function",ue=Array.isArray,Me=r=>{var e;return ue(r)||typeof((e=r)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},G=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,me=/>/g,k=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,ge=/'/g,fe=/"/g,ve=/^(?:script|style|textarea)$/i,ye=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),O=ye(1),We=ye(2),C=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),we=new WeakMap,be=(r,e,t)=>{var i,s;let n=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e,o=n._$litPart$;if(o===void 0){let l=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:null;n._$litPart$=o=new M(e.insertBefore(D(),l),l,void 0,t??{})}return o._$AI(r),o},L=R.createTreeWalker(R,129,null,!1),Ie=(r,e)=>{let t=r.length-1,i=[],s,n=e===2?"<svg>":"",o=G;for(let a=0;a<t;a++){let d=r[a],v,c,m=-1,y=0;for(;y<d.length&&(o.lastIndex=y,c=o.exec(d),c!==null);)y=o.lastIndex,o===G?c[1]==="!--"?o=pe:c[1]!==void 0?o=me:c[2]!==void 0?(ve.test(c[2])&&(s=RegExp("</"+c[2],"g")),o=k):c[3]!==void 0&&(o=k):o===k?c[0]===">"?(o=s??G,m=-1):c[1]===void 0?m=-2:(m=o.lastIndex-c[2].length,v=c[1],o=c[3]===void 0?k:c[3]==='"'?fe:ge):o===fe||o===ge?o=k:o===pe||o===me?o=G:(o=k,s=void 0);let q=o===k&&r[a+1].startsWith("/>")?" ":"";n+=o===G?d+Ne:m>=0?(i.push(v),d.slice(0,m)+"$lit$"+d.slice(m)+x+q):d+x+(m===-2?(i.push(void 0),a):q)}let l=n+(r[t]||"<?>")+(e===2?"</svg>":"");return[ce!==void 0?ce.createHTML(l):l,i]},H=class{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,o=0,l=e.length-1,a=this.parts,[d,v]=Ie(e,t);if(this.el=H.createElement(d,i),L.currentNode=this.el.content,t===2){let c=this.el.content,m=c.firstChild;m.remove(),c.append(...m.childNodes)}for(;(s=L.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes()){let c=[];for(let m of s.getAttributeNames())if(m.endsWith("$lit$")||m.startsWith(x)){let y=v[o++];if(c.push(m),y!==void 0){let q=s.getAttribute(y.toLowerCase()+"$lit$").split(x),V=/([.?@])?(.*)/.exec(y);a.push({type:1,index:n,name:V[2],strings:q,ctor:V[1]==="."?_e:V[1]==="?"?Ee:V[1]==="@"?xe:j})}else a.push({type:6,index:n})}for(let m of c)s.removeAttribute(m)}if(ve.test(s.tagName)){let c=s.textContent.split(x),m=c.length-1;if(m>0){s.textContent=T?T.emptyScript:"";for(let y=0;y<m;y++)s.append(c[y],D()),L.nextNode(),a.push({type:2,index:++n});s.append(c[m],D())}}}else if(s.nodeType===8)if(s.data===he)a.push({type:2,index:n});else{let c=-1;for(;(c=s.data.indexOf(x,c+1))!==-1;)a.push({type:7,index:n}),c+=x.length-1}n++}}static createElement(e,t){let i=R.createElement("template");return i.innerHTML=e,i}};function N(r,e,t=r,i){var s,n,o,l;if(e===C)return e;let a=i!==void 0?(s=t._$Cl)===null||s===void 0?void 0:s[i]:t._$Cu,d=z(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==d&&((n=a==null?void 0:a._$AO)===null||n===void 0||n.call(a,!1),d===void 0?a=void 0:(a=new d(r),a._$AT(r,t,i)),i!==void 0?((o=(l=t)._$Cl)!==null&&o!==void 0?o:l._$Cl=[])[i]=a:t._$Cu=a),a!==void 0&&(e=N(r,a._$AS(r,e.values),a,i)),e}var $e=class{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;let{el:{content:i},parts:s}=this._$AD,n=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:R).importNode(i,!0);L.currentNode=n;let o=L.nextNode(),l=0,a=0,d=s[0];for(;d!==void 0;){if(l===d.index){let v;d.type===2?v=new M(o,o.nextSibling,this,e):d.type===1?v=new d.ctor(o,d.name,d.strings,this,e):d.type===6&&(v=new Se(o,this,e)),this.v.push(v),d=s[++a]}l!==(d==null?void 0:d.index)&&(o=L.nextNode(),l++)}return n}m(e){let t=0;for(let i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},M=class{constructor(e,t,i,s){var n;this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cg=(n=s==null?void 0:s.isConnected)===null||n===void 0||n}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=N(this,e,t),z(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==C&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.S(e):Me(e)?this.M(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==g&&z(this._$AH)?this._$AA.nextSibling.data=e:this.S(R.createTextNode(e)),this._$AH=e}T(e){var t;let{values:i,_$litType$:s}=e,n=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=H.createElement(s.h,this.options)),s);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===n)this._$AH.m(i);else{let o=new $e(n,this),l=o.p(this.options);o.m(i),this.S(l),this._$AH=o}}_$AC(e){let t=we.get(e.strings);return t===void 0&&we.set(e.strings,t=new H(e)),t}M(e){ue(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let n of e)s===t.length?t.push(i=new M(this.A(D()),this.A(D()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){let s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},j=class{constructor(e,t,i,s,n){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=g}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){let n=this.strings,o=!1;if(n===void 0)e=N(this,e,t,0),o=!z(e)||e!==this._$AH&&e!==C,o&&(this._$AH=e);else{let l=e,a,d;for(e=n[0],a=0;a<n.length-1;a++)d=N(this,l[i+a],t,a),d===C&&(d=this._$AH[a]),o||(o=!z(d)||d!==this._$AH[a]),d===g?e=g:e!==g&&(e+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!s&&this.k(e)}k(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},_e=class extends j{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===g?void 0:e}},Ue=T?T.emptyScript:"",Ee=class extends j{constructor(){super(...arguments),this.type=4}k(e){e&&e!==g?this.element.setAttribute(this.name,Ue):this.element.removeAttribute(this.name)}},xe=class extends j{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){var i;if((e=(i=N(this,e,t,0))!==null&&i!==void 0?i:g)===C)return;let s=this._$AH,n=e===g&&s!==g||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==g&&(s===g||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}},Se=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}};var Ae=window.litHtmlPolyfillSupport;Ae==null||Ae(H,M),((te=globalThis.litHtmlVersions)!==null&&te!==void 0?te:globalThis.litHtmlVersions=[]).push("2.0.2");var ie,se;var $=class extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;let i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=be(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return C}};$.finalized=!0,$._$litElement$=!0,(ie=globalThis.litElementHydrateSupport)===null||ie===void 0||ie.call(globalThis,{LitElement:$});var ke=globalThis.litElementPolyfillSupport;ke==null||ke({LitElement:$});((se=globalThis.litElementVersions)!==null&&se!==void 0?se:globalThis.litElementVersions=[]).push("3.0.2");var K=r=>e=>typeof e=="function"?((t,i)=>(window.customElements.define(t,i),i))(r,e):((t,i)=>{let{kind:s,elements:n}=i;return{kind:s,elements:n,finisher(o){window.customElements.define(t,o)}}})(r,e);var De=(r,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,r)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,r)}};function S(r){return(e,t)=>t!==void 0?((i,s,n)=>{s.constructor.createProperty(n,i)})(r,e,t):De(r,e)}var I=({finisher:r,descriptor:e})=>(t,i)=>{var s;if(i===void 0){let n=(s=t.originalKey)!==null&&s!==void 0?s:t.key,o=e!=null?{kind:"method",placement:"prototype",key:n,descriptor:e(t.key)}:{...t,key:n};return r!=null&&(o.finisher=function(l){r(l,n)}),o}{let n=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),r==null||r(n,i)}};function U(r,e){return I({descriptor:t=>{let i={get(){var s,n;return(n=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(r))!==null&&n!==void 0?n:null},enumerable:!0,configurable:!0};if(e){let s=typeof t=="symbol"?Symbol():"__"+t;i.get=function(){var n,o;return this[s]===void 0&&(this[s]=(o=(n=this.renderRoot)===null||n===void 0?void 0:n.querySelector(r))!==null&&o!==void 0?o:null),this[s]}}return i}})}var Ce=b`:where(img, svg) {
    filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
    cursor: default;

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}
`;var Pe=b`:where(h1, h2, h3, h4, h5, h6, p) {
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
}`;var Te=b`:host {
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
}`;var A=class extends ${constructor(){super(...arguments);this.pageName="";this.extension=!1;this.title="";this.editing=!1}get page(){return{page:this.pageName,extension:this.extension}}UpdatePage(e){e.preventDefault(),p.NavigateTo(this.page)}render(){return this.draggable=this.editing,p.page.page==this.page.page&&p.page.extension==this.page.extension?this.classList.add("selected"):this.classList.remove("selected"),O`
        <a href="#${this.extension?"extension-":""}${this.pageName}" @click="${this.UpdatePage}" title="${this.title}">
            <slot></slot>
        </a>

        ${this.editing?O`<img id="handle" src="images/drag.svg" draggable="false">`:g}
        `}};A.styles=[Pe,Ce,Te],f([S({type:String})],A.prototype,"pageName",2),f([S({type:Boolean})],A.prototype,"extension",2),f([S({type:String})],A.prototype,"title",2),f([S({type:Boolean})],A.prototype,"editing",2),A=f([K("nav-item")],A);var Re=b`:host {
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
}`;var u=class extends ${constructor(){super();this.editing=!1;this.pages=[];this.icons=[];this.order=[];this.draggedNavItemIndex=0;this.GetNavItem=((e,t)=>{let i,s,n,o=!1;return e<u.defaultPages.length?{page:i,title:s,icon:n}=u.defaultPages[e]:(i=this.pages[e-u.defaultPages.length],s=this.pages[e-u.defaultPages.length],n=this.icons[e-u.defaultPages.length],o=!0),O`
            <nav-item ?editing="${this.editing}" pageName="${i}" ?extension="${o}" title="${s}" 
                      @dragstart="${this.SetDraggedNavItemIndex}" @dragenter="${this.ReorderNavItems}" @dragover="${l=>l.preventDefault()}"
                      data-index="${t}">
                <img draggable="false" src="${n}">
            </nav-item>
        `}).bind(this);matchMedia("(max-aspect-ratio: 1/1)").onchange=this.ShowShadows.bind(this)}static GetNavbarOrder(){return JSON.parse(localStorage.getItem("Nav Order")||"[0, 1, 2, 3, 4, 5]")}static SetNavbarOrder(e){localStorage.setItem("Nav Order",JSON.stringify(e)),document.querySelector("nav-bar").requestUpdate()}SetDraggedNavItemIndex(e){let t=e.target;!t.editing||t.dataset.index!==void 0&&(this.draggedNavItemIndex=parseInt(t.dataset.index),e.dataTransfer&&(e.dataTransfer.effectAllowed="copyLink"),e.dataTransfer?.setData("Text",t.id))}ReorderNavItems(e){let t=e.target;if(!t.editing||t.dataset.index===void 0)return;let i=parseInt(t.dataset.index);this.order.splice(i,0,this.order.splice(this.draggedNavItemIndex,1)[0]),this.draggedNavItemIndex=i,u.SetNavbarOrder(this.order)}ShowShadows(){!this.shadowRoot||(window.innerWidth<=window.innerHeight?(this.topShadow.style.display="none",this.bottomShadow.style.display="none",this.itemsContainer.scrollLeft==0?this.leftShadow.style.display="none":this.leftShadow.style.removeProperty("display"),this.itemsContainer.scrollLeft>=this.itemsContainer.scrollWidth-this.itemsContainer.clientWidth-1?this.rightShadow.style.display="none":this.rightShadow.style.removeProperty("display")):(this.leftShadow.style.display="none",this.rightShadow.style.display="none",this.itemsContainer.scrollTop==0?this.topShadow.style.display="none":this.topShadow.style.removeProperty("display"),this.itemsContainer.scrollTop>=this.itemsContainer.scrollHeight-this.itemsContainer.clientHeight-1?this.bottomShadow.style.display="none":this.bottomShadow.style.removeProperty("display")))}createRenderRoot(){let e=super.createRenderRoot();return e.addEventListener("pointerdown",()=>{this.itemsContainer.classList.add("hover")}),e.addEventListener("pointerup",()=>{this.itemsContainer.classList.remove("hover")}),e}firstUpdated(){this.itemsContainer.addEventListener("scroll",this.ShowShadows.bind(this))}updated(){for(let e of this.shadowRoot?.querySelectorAll("nav-item"))e.requestUpdate()}render(){this.order=u.GetNavbarOrder();let e=w.installedExtensions;for(var t of e.keys())this.pages.push(t),this.icons.push(w.GetExtensionNavIconURL(e.get(t)));let i=window.innerWidth<=window.innerHeight,s=i?window.innerWidth/100:window.innerHeight/100,n=this.order.length*12*s>window.innerHeight;return O`
        <div id="items-container">
            ${this.order.map(this.GetNavItem)}
        
            <div id="top-shadow" style="display: none"></div>
            <div id="bottom-shadow" style="${!i&&n?"":"display: none"}"></div>
            <div id="left-shadow" style="display: none"></div>
            <div id="right-shadow" style="${i&&n?"":"display: none"}"></div>
        </div>
        `}};u.styles=Re,u.defaultPages=[{page:"daily-timetable",title:"Daily Timetable",icon:"images/dailytimetable.svg"},{page:"barcode",title:"ID Barcode",icon:"images/barcode.svg"},{page:"timetable",title:"Timetable",icon:"images/timetable.svg"},{page:"announcements",title:"Announcements",icon:"images/announcements.svg"},{page:"pages",title:"Pages Marketplace",icon:"images/marketplace.svg"},{page:"settings",title:"Settings",icon:"images/settings.svg"}],f([S({type:Boolean})],u.prototype,"editing",2),f([U("#items-container",!0)],u.prototype,"itemsContainer",2),f([U("#top-shadow",!0)],u.prototype,"topShadow",2),f([U("#bottom-shadow",!0)],u.prototype,"bottomShadow",2),f([U("#left-shadow",!0)],u.prototype,"leftShadow",2),f([U("#right-shadow",!0)],u.prototype,"rightShadow",2),u=f([K("nav-bar")],u);var B=class{static get installedExtensions(){return this._installedExtensions}static set installedExtensions(e){this._installedExtensions=e,this.extensionOrigins=this.GetExtensionOrigins(e)}static GetExtensionOrigins(e){let t=[];for(let i of e.values())t.push(new URL(i.url).origin);return t}static async HandleCommand(e){let t=e.data.command,i=e.data.data;if(t=="Initialise")return{command:"Initialise",data:{dark:p.dark,hue:p.hue,version:await p.GetVersion()}};if(t=="Get Resource"){let s=this._resourceListeners.get(i.name),n=!1;s===void 0&&(n=!0,s=[]),s.push(e),this._resourceListeners.set(i.name,s),n&&_.GetResource(i.name,l=>{let a=this._resourceListeners.get(i.name)??[];for(let d of a)d.source?.postMessage({command:"Resource",data:{name:i.name,resource:l}},{targetOrigin:d.origin})});let o=await _.GetResourceNow(i.name);return{command:"Resource",data:{name:i.name,resource:o}}}if(t=="Get Token"){let s=await _.GetToken();return{command:"Token",data:{token:s.token===null?null:s.token.access_token,valid:s.valid}}}if(t=="Refresh Token"){if(!await _.FetchResources())return{command:"Refreshed Token",data:{token:null,valid:!1}};let n=await _.GetToken();return{command:"Refreshed Token",data:{token:n.token===null?null:n.token.access_token,valid:n.valid}}}return t=="Ping"?{command:"Pong"}:{command:"Unknown Command",data:{command:t}}}static async InstallExtension(e){let t=(await this.GetExtensionsNow()).get(e);if(t){this._installedExtensions.set(e,t),localStorage.setItem("Installed Extensions",JSON.stringify(Object.fromEntries(this._installedExtensions)));let i=u.GetNavbarOrder();i.splice(i.length-1,0,i.length),u.SetNavbarOrder(i)}}static async UninstallExtension(e){let t=B.installedExtensions,i=u.GetNavbarOrder(),s=i.indexOf(Object.keys(t).indexOf(e))+u.defaultPages.length,n=i.splice(s,1)[0];for(let l=0;l<i.length;l++)i[l]>n&&i[l]--;u.SetNavbarOrder(i);var o=document.getElementById(`extension-${e}`);o!==null&&o.remove(),this._installedExtensions.delete(e),localStorage.setItem("Installed Extensions",JSON.stringify(Object.fromEntries(this._installedExtensions)))}static async GetExtensionsNow(){let t=await(await caches.open("Metadata")).match("Metadata");return t?new Map(Object.entries((await t.json()).pages||{})):new Map}static async GetExtensions(e){this._extensionCallbacks.AddListener(e),e(await this.GetExtensionsNow())}static async FireExtensionCallbacks(){let e=await this.GetExtensionsNow();this._extensionCallbacks.Invoke(e)}static GetExtensionIconURL(e){let t=new URL(e.icon,e.url);return t.search=`cache-version=${e.version}`,t.toString()}static GetExtensionNavIconURL(e){let t=new URL(e.navIcon,e.url);return t.searchParams.set("cache-version",e.version),t.toString()}static AddListeners(){p.ListenForDark(e=>{for(let t=0;t<window.frames.length;t++)window.frames[t].postMessage({command:"Set Dark",data:{dark:e}},"*")}),p.ListenForHue(e=>{for(let t=0;t<window.frames.length;t++)window.frames[t].postMessage({command:"Set Hue",data:{hue:e}},"*")}),window.addEventListener("message",async e=>{let t=e.origin;!this.extensionOrigins.includes(t)||e.source?.postMessage(await this.HandleCommand(e),{targetOrigin:t})})}},w=B;w._installedExtensions=new Map(Object.entries(JSON.parse(localStorage.getItem("Installed Extensions")||"{}"))),w.extensionOrigins=B.GetExtensionOrigins(B._installedExtensions),w._extensionCallbacks=new P,w._resourceListeners=new Map;var p=class{static NavigateTo(e){if(e.extension){let t=w.installedExtensions;if(t.has(e.page)){let i=document.getElementById(`extension-${e.page}`);if(i===null){let s=document.createElement("extension-page");s.src=t.get(e.page).url,s.id=`extension-${e.page}`,document.querySelector("main")?.appendChild(s),i=s}this.SetPage(e,i)}}else this.SetPage(e,document.getElementById(e.page))}static SetPage(e,t){if(t){this._pageElement!=null&&this._pageElement.classList.add("hidden"),t.classList.remove("hidden"),this._pageElement=t,this.page=e,location.hash=e.extension?`extension-${e.page}`:e.page;let i=document.querySelector("nav-bar");i.removeAttribute("editing"),i.requestUpdate?.()}}static ShowNotification(e,t=!1){let i=document.createElement("inline-notification");return typeof e=="string"?i.innerText=e:i.appendChild(e),i.loader=t,document.getElementById("notification-area")?.appendChild(i),i}static SetDark(e){this.dark=e,document.documentElement.classList.toggle("dark",e),localStorage.setItem("Dark",e.toString()),this._darkCallbacks.Invoke(e)}static ListenForDark(e){this._darkCallbacks.AddListener(e)}static SetHue(e){document.documentElement.style.setProperty("--main-hue",e),document.documentElement.style.setProperty("--hue-rotate",`${parseFloat(e)-200}deg`),this.hue=e}static SaveHue(){localStorage.setItem("Hue",this.hue),this._hueCallbacks.Invoke(parseFloat(this.hue))}static ListenForHue(e){this._hueCallbacks.AddListener(e)}static async GetVersion(){var e=await caches.open("Metadata");let t=await e.match("Metadata");if(t)return(await t.json()).version}};p.page={page:"",extension:!1},p.dark=localStorage.getItem("Dark")=="true",p.hue=localStorage.getItem("Hue")||"200",p._pageElement=null,p._darkCallbacks=new P,p._hueCallbacks=new P;p.dark&&(document.getElementById("logo-p").src="images/logo-dark.svg");var ne=new URLSearchParams(window.location.search).get("feature");if(ne){let r=document.getElementById("message");r.innerHTML=`You need <a href="https://caniuse.com/?search=${ne}">${ne}</a> to run <b>Paragon</b>`}})();
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
