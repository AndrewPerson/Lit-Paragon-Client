var Nt=Object.defineProperty;var Ht=Object.getOwnPropertyDescriptor;var a=(s,e,t,r)=>{for(var i=r>1?void 0:r?Ht(e,t):e,o=s.length-1,n;o>=0;o--)(n=s[o])&&(i=(r?n(e,t,i):n(i))||i);return r&&i&&Nt(e,t,i),i};var H=class{constructor(){this._callbacks=[]}AddListener(e){this._callbacks.push(e)}Invoke(e){for(let t of this._callbacks)t(e)}};var R=class{static ShowLoginNotification(){let e=document.createElement("p");e.innerHTML="You need to <a>login</a> to see the latest information.",u.ShowNotification(e)}static async GetToken(){let t=await(await caches.open("User Resources")).match("Token");if(!t)return location.href=`${location.origin}/login`,{valid:!1,token:null};let r=await t.json();return new Date>r.termination?(this.ShowLoginNotification(),{valid:!1,token:null}):{valid:!0,token:r}}static async SetResources(e){let t=await caches.open("User Resources"),r=e.map(i=>{let o=i.name,n=i.resource;return t.put(o,new Response(n)).then(()=>this._resourceCallbacks.get(o)?.Invoke(JSON.parse(n)))});await Promise.all(r)}static async SetResource(e,t){await(await caches.open("User Resources")).put(e,new Response(t)),this._resourceCallbacks.get(e)?.Invoke(JSON.parse(t))}static async GetResourceNow(e){let r=await(await caches.open("User Resources")).match(e);if(r)return await r.json()}static async GetResource(e,t){let r=this._resourceCallbacks.get(e)??new H;r.AddListener(t),this._resourceCallbacks.set(e,r),t(await this.GetResourceNow(e))}static async FetchResources(){let{valid:e,token:t}=await this.GetToken();if(!e)return!1;let r=new URL("https://sbhs-random-data.profsmart.repl.co/resources");r.searchParams.append("token",JSON.stringify(t));let i=await fetch(r.toString());if(!i.ok)return this.ShowLoginNotification(),!1;let o=await i.json();return await(await caches.open("User Resources")).put("Token",new Response(JSON.stringify(o.token))),await this.SetResources(Object.keys(o.result).map(p=>({name:p,resource:JSON.stringify(o.result[p])}))),!0}};R._resourceCallbacks=new Map;var ue=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$e=Symbol(),Me=new Map,ge=class{constructor(e,t){if(this._$cssResult$=!0,t!==$e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=Me.get(this.cssText);return ue&&e===void 0&&(Me.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}},Ue=s=>new ge(typeof s=="string"?s:s+"",$e),d=(s,...e)=>{let t=s.length===1?s[0]:e.reduce((r,i,o)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[o+1],s[0]);return new ge(t,$e)},Ee=(s,e)=>{ue?s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{let r=document.createElement("style"),i=window.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=t.cssText,s.appendChild(r)})},fe=ue?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return Ue(t)})(s):s;var Ce,Ne=window.trustedTypes,Dt=Ne?Ne.emptyScript:"",He=window.reactiveElementPolyfillSupport,_e={toAttribute(s,e){switch(e){case Boolean:s=s?Dt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},De=(s,e)=>e!==s&&(e==e||s==s),Ae={attribute:!0,type:String,converter:_e,reflect:!1,hasChanged:De},D=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();let e=[];return this.elementProperties.forEach((t,r)=>{let i=this._$Eh(r,t);i!==void 0&&(this._$Eu.set(i,r),e.push(i))}),e}static createProperty(e,t=Ae){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){let r=typeof e=="symbol"?Symbol():"__"+e,i=this.getPropertyDescriptor(e,r,t);i!==void 0&&Object.defineProperty(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(i){let o=this[e];this[t]=i,this.requestUpdate(e,o,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Ae}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){let t=this.properties,r=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(let i of r)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let i of r)t.unshift(fe(i))}else e!==void 0&&t.push(fe(e));return t}static _$Eh(e,t){let r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,r;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((r=e.hostConnected)===null||r===void 0||r.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;let t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Ee(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var r;return(r=t.hostConnected)===null||r===void 0?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var r;return(r=t.hostDisconnected)===null||r===void 0?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ES(e,t,r=Ae){var i,o;let n=this.constructor._$Eh(e,r);if(n!==void 0&&r.reflect===!0){let p=((o=(i=r.converter)===null||i===void 0?void 0:i.toAttribute)!==null&&o!==void 0?o:_e.toAttribute)(t,r.type);this._$Ei=e,p==null?this.removeAttribute(n):this.setAttribute(n,p),this._$Ei=null}}_$AK(e,t){var r,i,o;let n=this.constructor,p=n._$Eu.get(e);if(p!==void 0&&this._$Ei!==p){let c=n.getPropertyOptions(p),m=c.converter,S=(o=(i=(r=m)===null||r===void 0?void 0:r.fromAttribute)!==null&&i!==void 0?i:typeof m=="function"?m:null)!==null&&o!==void 0?o:_e.fromAttribute;this._$Ei=p,this[p]=S(t,c.type),this._$Ei=null}}requestUpdate(e,t,r){let i=!0;e!==void 0&&(((r=r||this.constructor.getPropertyOptions(e)).hasChanged||De)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),r.reflect===!0&&this._$Ei!==e&&(this._$E_===void 0&&(this._$E_=new Map),this._$E_.set(e,r))):i=!1),!this.isUpdatePending&&i&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((i,o)=>this[o]=i),this._$Et=void 0);let t=!1,r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),(e=this._$Eg)===null||e===void 0||e.forEach(i=>{var o;return(o=i.hostUpdate)===null||o===void 0?void 0:o.call(i)}),this.update(r)):this._$EU()}catch(i){throw t=!1,this._$EU(),i}t&&this._$AE(r)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(r=>{var i;return(i=r.hostUpdated)===null||i===void 0?void 0:i.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$E_!==void 0&&(this._$E_.forEach((t,r)=>this._$ES(r,this[r],t)),this._$E_=void 0),this._$EU()}updated(e){}firstUpdated(e){}};D.finalized=!0,D.elementProperties=new Map,D.elementStyles=[],D.shadowRootOptions={mode:"open"},He==null||He({ReactiveElement:D}),((Ce=globalThis.reactiveElementVersions)!==null&&Ce!==void 0?Ce:globalThis.reactiveElementVersions=[]).push("1.0.2");var Se,V=globalThis.trustedTypes,Ie=V?V.createPolicy("lit-html",{createHTML:s=>s}):void 0,I=`lit$${(Math.random()+"").slice(9)}$`,Oe="?"+I,It=`<${Oe}>`,Z=document,oe=(s="")=>Z.createComment(s),ne=s=>s===null||typeof s!="object"&&typeof s!="function",ze=Array.isArray,Ot=s=>{var e;return ze(s)||typeof((e=s)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},ae=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,je=/-->/g,qe=/>/g,q=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Be=/'/g,Fe=/"/g,Ge=/^(?:script|style|textarea)$/i,Ve=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),h=Ve(1),W=Ve(2),N=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),Ze=new WeakMap,We=(s,e,t)=>{var r,i;let o=(r=t==null?void 0:t.renderBefore)!==null&&r!==void 0?r:e,n=o._$litPart$;if(n===void 0){let p=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:null;o._$litPart$=n=new X(e.insertBefore(oe(),p),p,void 0,t??{})}return n._$AI(s),n},J=Z.createTreeWalker(Z,129,null,!1),zt=(s,e)=>{let t=s.length-1,r=[],i,o=e===2?"<svg>":"",n=ae;for(let c=0;c<t;c++){let m=s[c],S,b,k=-1,T=0;for(;T<m.length&&(n.lastIndex=T,b=n.exec(m),b!==null);)T=n.lastIndex,n===ae?b[1]==="!--"?n=je:b[1]!==void 0?n=qe:b[2]!==void 0?(Ge.test(b[2])&&(i=RegExp("</"+b[2],"g")),n=q):b[3]!==void 0&&(n=q):n===q?b[0]===">"?(n=i??ae,k=-1):b[1]===void 0?k=-2:(k=n.lastIndex-b[2].length,S=b[1],n=b[3]===void 0?q:b[3]==='"'?Fe:Be):n===Fe||n===Be?n=q:n===je||n===qe?n=ae:(n=q,i=void 0);let he=n===q&&s[c+1].startsWith("/>")?" ":"";o+=n===ae?m+It:k>=0?(r.push(S),m.slice(0,k)+"$lit$"+m.slice(k)+I+he):m+I+(k===-2?(r.push(void 0),c):he)}let p=o+(s[t]||"<?>")+(e===2?"</svg>":"");return[Ie!==void 0?Ie.createHTML(p):p,r]},Y=class{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let o=0,n=0,p=e.length-1,c=this.parts,[m,S]=zt(e,t);if(this.el=Y.createElement(m,r),J.currentNode=this.el.content,t===2){let b=this.el.content,k=b.firstChild;k.remove(),b.append(...k.childNodes)}for(;(i=J.nextNode())!==null&&c.length<p;){if(i.nodeType===1){if(i.hasAttributes()){let b=[];for(let k of i.getAttributeNames())if(k.endsWith("$lit$")||k.startsWith(I)){let T=S[n++];if(b.push(k),T!==void 0){let he=i.getAttribute(T.toLowerCase()+"$lit$").split(I),me=/([.?@])?(.*)/.exec(T);c.push({type:1,index:o,name:me[2],strings:he,ctor:me[1]==="."?Ye:me[1]==="?"?Ke:me[1]==="@"?Xe:le})}else c.push({type:6,index:o})}for(let k of b)i.removeAttribute(k)}if(Ge.test(i.tagName)){let b=i.textContent.split(I),k=b.length-1;if(k>0){i.textContent=V?V.emptyScript:"";for(let T=0;T<k;T++)i.append(b[T],oe()),J.nextNode(),c.push({type:2,index:++o});i.append(b[k],oe())}}}else if(i.nodeType===8)if(i.data===Oe)c.push({type:2,index:o});else{let b=-1;for(;(b=i.data.indexOf(I,b+1))!==-1;)c.push({type:7,index:o}),b+=I.length-1}o++}}static createElement(e,t){let r=Z.createElement("template");return r.innerHTML=e,r}};function K(s,e,t=s,r){var i,o,n,p;if(e===N)return e;let c=r!==void 0?(i=t._$Cl)===null||i===void 0?void 0:i[r]:t._$Cu,m=ne(e)?void 0:e._$litDirective$;return(c==null?void 0:c.constructor)!==m&&((o=c==null?void 0:c._$AO)===null||o===void 0||o.call(c,!1),m===void 0?c=void 0:(c=new m(s),c._$AT(s,t,r)),r!==void 0?((n=(p=t)._$Cl)!==null&&n!==void 0?n:p._$Cl=[])[r]=c:t._$Cu=c),c!==void 0&&(e=K(s,c._$AS(s,e.values),c,r)),e}var Je=class{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;let{el:{content:r},parts:i}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:Z).importNode(r,!0);J.currentNode=o;let n=J.nextNode(),p=0,c=0,m=i[0];for(;m!==void 0;){if(p===m.index){let S;m.type===2?S=new X(n,n.nextSibling,this,e):m.type===1?S=new m.ctor(n,m.name,m.strings,this,e):m.type===6&&(S=new Qe(n,this,e)),this.v.push(S),m=i[++c]}p!==(m==null?void 0:m.index)&&(n=J.nextNode(),p++)}return o}m(e){let t=0;for(let r of this.v)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},X=class{constructor(e,t,r,i){var o;this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cg=(o=i==null?void 0:i.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),ne(e)?e===y||e==null||e===""?(this._$AH!==y&&this._$AR(),this._$AH=y):e!==this._$AH&&e!==N&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.S(e):Ot(e)?this.M(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==y&&ne(this._$AH)?this._$AA.nextSibling.data=e:this.S(Z.createTextNode(e)),this._$AH=e}T(e){var t;let{values:r,_$litType$:i}=e,o=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Y.createElement(i.h,this.options)),i);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.m(r);else{let n=new Je(o,this),p=n.p(this.options);n.m(r),this.S(p),this._$AH=n}}_$AC(e){let t=Ze.get(e.strings);return t===void 0&&Ze.set(e.strings,t=new Y(e)),t}M(e){ze(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,i=0;for(let o of e)i===t.length?t.push(r=new X(this.A(oe()),this.A(oe()),this,this.options)):r=t[i],r._$AI(o),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)===null||r===void 0||r.call(this,!1,!0,t);e&&e!==this._$AB;){let i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},le=class{constructor(e,t,r,i,o){this.type=1,this._$AH=y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=y}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,r,i){let o=this.strings,n=!1;if(o===void 0)e=K(this,e,t,0),n=!ne(e)||e!==this._$AH&&e!==N,n&&(this._$AH=e);else{let p=e,c,m;for(e=o[0],c=0;c<o.length-1;c++)m=K(this,p[r+c],t,c),m===N&&(m=this._$AH[c]),n||(n=!ne(m)||m!==this._$AH[c]),m===y?e=y:e!==y&&(e+=(m??"")+o[c+1]),this._$AH[c]=m}n&&!i&&this.k(e)}k(e){e===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ye=class extends le{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===y?void 0:e}},jt=V?V.emptyScript:"",Ke=class extends le{constructor(){super(...arguments),this.type=4}k(e){e&&e!==y?this.element.setAttribute(this.name,jt):this.element.removeAttribute(this.name)}},Xe=class extends le{constructor(e,t,r,i,o){super(e,t,r,i,o),this.type=5}_$AI(e,t=this){var r;if((e=(r=K(this,e,t,0))!==null&&r!==void 0?r:y)===N)return;let i=this._$AH,o=e===y&&i!==y||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==y&&(i===y||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,r;typeof this._$AH=="function"?this._$AH.call((r=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&r!==void 0?r:this.element,e):this._$AH.handleEvent(e)}},Qe=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}};var et=window.litHtmlPolyfillSupport;et==null||et(Y,X),((Se=globalThis.litHtmlVersions)!==null&&Se!==void 0?Se:globalThis.litHtmlVersions=[]).push("2.0.2");var Te,Re;var v=class extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;let r=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=r.firstChild),r}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=We(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return N}};v.finalized=!0,v._$litElement$=!0,(Te=globalThis.litElementHydrateSupport)===null||Te===void 0||Te.call(globalThis,{LitElement:v});var tt=globalThis.litElementPolyfillSupport;tt==null||tt({LitElement:v});((Re=globalThis.litElementVersions)!==null&&Re!==void 0?Re:globalThis.litElementVersions=[]).push("3.0.2");var f=s=>e=>typeof e=="function"?((t,r)=>(window.customElements.define(t,r),r))(s,e):((t,r)=>{let{kind:i,elements:o}=r;return{kind:i,elements:o,finisher(n){window.customElements.define(t,n)}}})(s,e);var qt=(s,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,s)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,s)}};function g(s){return(e,t)=>t!==void 0?((r,i,o)=>{i.constructor.createProperty(o,r)})(s,e,t):qt(s,e)}function C(s){return g({...s,state:!0})}var Q=({finisher:s,descriptor:e})=>(t,r)=>{var i;if(r===void 0){let o=(i=t.originalKey)!==null&&i!==void 0?i:t.key,n=e!=null?{kind:"method",placement:"prototype",key:o,descriptor:e(t.key)}:{...t,key:o};return s!=null&&(n.finisher=function(p){s(p,o)}),n}{let o=t.constructor;e!==void 0&&Object.defineProperty(t,r,e(r)),s==null||s(o,r)}};function A(s,e){return Q({descriptor:t=>{let r={get(){var i,o;return(o=(i=this.renderRoot)===null||i===void 0?void 0:i.querySelector(s))!==null&&o!==void 0?o:null},enumerable:!0,configurable:!0};if(e){let i=typeof t=="symbol"?Symbol():"__"+t;r.get=function(){var o,n;return this[i]===void 0&&(this[i]=(n=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(s))!==null&&n!==void 0?n:null),this[i]}}return r}})}var L=d`:where(img, svg) {
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
}`;var O=class extends v{constructor(){super(...arguments);this.pageName="";this.extension=!1;this.title="";this.editing=!1}get page(){return{page:this.pageName,extension:this.extension}}UpdatePage(e){e.preventDefault(),u.NavigateTo(this.page)}render(){return this.draggable=this.editing,u.page.page==this.page.page&&u.page.extension==this.page.extension?this.classList.add("selected"):this.classList.remove("selected"),h`
        <a href="#${this.extension?"extension-":""}${this.pageName}" @click="${this.UpdatePage}" title="${this.title}">
            <slot></slot>
        </a>

        ${this.editing?h`<img id="handle" src="images/drag.svg" draggable="false">`:y}
        `}};O.styles=[x,L,rt],a([g({type:String})],O.prototype,"pageName",2),a([g({type:Boolean})],O.prototype,"extension",2),a([g({type:String})],O.prototype,"title",2),a([g({type:Boolean})],O.prototype,"editing",2),O=a([f("nav-item")],O);var it=d`:host {
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
}`;var $=class extends v{constructor(){super(...arguments);this.editing=!1;this.pages=[];this.icons=[];this.order=[];this.draggedNavItemIndex=0;this.GetNavItem=((e,t)=>{let r,i,o,n=!1;return e<$.defaultPages.length?{page:r,title:i,icon:o}=$.defaultPages[e]:(r=this.pages[e-$.defaultPages.length],i=this.pages[e-$.defaultPages.length],o=this.icons[e-$.defaultPages.length],n=!0),h`
            <nav-item ?editing="${this.editing}" pageName="${r}" ?extension="${n}" title="${i}" 
                      @dragstart="${this.SetDraggedNavItemIndex}" @dragenter="${this.ReorderNavItems}" @dragover="${p=>p.preventDefault()}"
                      data-index="${t}">
                <img draggable="false" src="${o}">
            </nav-item>
        `}).bind(this)}static GetNavbarOrder(){return JSON.parse(localStorage.getItem("Nav Order")||"[0, 1, 2, 3, 4, 5]")}static SetNavbarOrder(e){localStorage.setItem("Nav Order",JSON.stringify(e)),document.querySelector("nav-bar").requestUpdate()}SetDraggedNavItemIndex(e){let t=e.target;!t.editing||t.dataset.index!==void 0&&(this.draggedNavItemIndex=parseInt(t.dataset.index),e.dataTransfer&&(e.dataTransfer.effectAllowed="copyLink"),e.dataTransfer?.setData("Text",t.id))}ReorderNavItems(e){let t=e.target;if(!t.editing||t.dataset.index===void 0)return;let r=parseInt(t.dataset.index);this.order.splice(r,0,this.order.splice(this.draggedNavItemIndex,1)[0]),this.draggedNavItemIndex=r,$.SetNavbarOrder(this.order)}createRenderRoot(){let e=super.createRenderRoot();return e.addEventListener("pointerdown",()=>{this.itemsContainer.classList.add("hover")}),e.addEventListener("pointerup",()=>{this.itemsContainer.classList.remove("hover")}),e}updated(){for(let e of this.shadowRoot?.querySelectorAll("nav-item"))e.requestUpdate()}render(){this.order=$.GetNavbarOrder();let e=E.installedExtensions;for(var t of e.keys())this.pages.push(t),this.icons.push(st(e.get(t)));return h`
        <div id="items-container">
            ${this.order.map(this.GetNavItem)}
        </div>
        `}};$.styles=it,$.defaultPages=[{page:"daily-timetable",title:"Daily Timetable",icon:"images/dailytimetable.svg"},{page:"barcode",title:"ID Barcode",icon:"images/barcode.svg"},{page:"timetable",title:"Timetable",icon:"images/timetable.svg"},{page:"announcements",title:"Announcements",icon:"images/announcements.svg"},{page:"pages",title:"Pages Marketplace",icon:"images/marketplace.svg"},{page:"settings",title:"Settings",icon:"images/settings.svg"}],a([g({type:Boolean})],$.prototype,"editing",2),a([A("#items-container",!0)],$.prototype,"itemsContainer",2),$=a([f("nav-bar")],$);var E=class{};E.installedExtensions=new Map(Object.entries(JSON.parse(localStorage.getItem("Installed Extensions")||"{}"))),E._extensionCallbacks=new H,E._resourceListeners=new Map;function Bt(){let s=[];for(let e of E.installedExtensions.values())s.push(new URL(e.url).origin);return s}async function ot(s){let e=(await Pe()).get(s);if(e){E.installedExtensions.set(s,e),localStorage.setItem("Installed Extensions",JSON.stringify(Object.fromEntries(E.installedExtensions)));let t=$.GetNavbarOrder();t.splice(t.length-1,0,t.length),$.SetNavbarOrder(t)}}async function nt(s){let e=E.installedExtensions,t=$.GetNavbarOrder(),r=t.indexOf(Object.keys(e).indexOf(s))+$.defaultPages.length,i=t.splice(r,1)[0];for(let n=0;n<t.length;n++)t[n]>i&&t[n]--;$.SetNavbarOrder(t);var o=document.getElementById(`extension-${s}`);o!==null&&o.remove(),E.installedExtensions.delete(s),localStorage.setItem("Installed Extensions",JSON.stringify(Object.fromEntries(E.installedExtensions)))}async function Pe(){let e=await(await caches.open("Metadata")).match("Metadata");return e?new Map(Object.entries((await e.json()).pages||{})):new Map}async function at(s){E._extensionCallbacks.AddListener(s),s(await Pe())}async function lt(){let s=await Pe();E._extensionCallbacks.Invoke(s)}function dt(s){let e=new URL(s.icon,s.url);return e.search=`cache-version=${s.version}`,e.toString()}function st(s){let e=new URL(s.navIcon,s.url);return e.searchParams.set("cache-version",s.version),e.toString()}function ct(){u.ListenForDark(e=>{for(let t=0;t<window.frames.length;t++)window.frames[t].postMessage({command:"Set Dark",data:{dark:e}},"*")}),u.ListenForHue(e=>{for(let t=0;t<window.frames.length;t++)window.frames[t].postMessage({command:"Set Hue",data:{hue:e}},"*")}),window.addEventListener("message",async e=>{let t=e.origin;!Bt().includes(t)||e.source?.postMessage(await s(e),{targetOrigin:t})});async function s(e){let t=e.data.command,r=e.data.data;if(t=="Initialise")return{command:"Initialise",data:{dark:u.dark,hue:u.hue,version:await u.GetVersion()}};if(t=="Get Resource"){let i=E._resourceListeners.get(r.name),o=!1;i===void 0&&(o=!0,i=[]),i.push(e),E._resourceListeners.set(r.name,i),o&&R.GetResource(r.name,p=>{let c=E._resourceListeners.get(r.name)??[];for(let m of c)m.source?.postMessage({command:"Resource",data:{name:r.name,resource:p}},{targetOrigin:m.origin})});let n=await R.GetResourceNow(r.name);return{command:"Resource",data:{name:r.name,resource:n}}}if(t=="Get Token"){let i=await R.GetToken();return{command:"Token",data:{token:i.token===null?null:i.token.access_token,valid:i.valid}}}if(t=="Refresh Token"){if(!await R.FetchResources())return{command:"Refreshed Token",data:{token:null,valid:!1}};let o=await R.GetToken();return{command:"Refreshed Token",data:{token:o.token===null?null:o.token.access_token,valid:o.valid}}}if(t=="Show Notification"){if(r.loader&&typeof r.id!="string")return;let i=u.ShowNotification(r.contents,r.loader??!1);i.id=r.id;return}if(t=="Close Notification"){let i=document.getElementById(r.id);i!==null&&"Close"in i&&typeof i.Close=="function"&&i.Close();return}return t=="Ping"?{command:"Pong"}:{command:"Unknown Command",data:{command:t}}}}var u=class{static NavigateTo(e){if(e.extension){let t=E.installedExtensions;if(t.has(e.page)){let r=document.getElementById(`extension-${e.page}`);if(r===null){let i=document.createElement("extension-page");i.src=t.get(e.page).url,i.id=`extension-${e.page}`,document.querySelector("main")?.appendChild(i),r=i}this.SetPage(e,r)}}else this.SetPage(e,document.getElementById(e.page))}static SetPage(e,t){if(t){this._pageElement!=null&&this._pageElement.classList.add("hidden"),t.classList.remove("hidden"),this._pageElement=t,this.page=e,location.hash=e.extension?`extension-${e.page}`:e.page;let r=document.querySelector("nav-bar");r.removeAttribute("editing"),r.requestUpdate?.()}}static ShowNotification(e,t=!1){let r=document.createElement("inline-notification");return typeof e=="string"?r.innerText=e:r.appendChild(e),r.loader=t,document.getElementById("notification-area")?.appendChild(r),r}static SetDark(e){this.dark=e,document.documentElement.classList.toggle("dark",e),localStorage.setItem("Dark",e.toString()),this._darkCallbacks.Invoke(e)}static ListenForDark(e){this._darkCallbacks.AddListener(e)}static SetHue(e){document.documentElement.style.setProperty("--main-hue",e),document.documentElement.style.setProperty("--hue-rotate",`${parseFloat(e)-200}deg`),this.hue=e}static SaveHue(){localStorage.setItem("Hue",this.hue),this._hueCallbacks.Invoke(parseFloat(this.hue))}static ListenForHue(e){this._hueCallbacks.AddListener(e)}static async GetVersion(){var e=await caches.open("Metadata");let t=await e.match("Metadata");if(t)return(await t.json()).version}};u.page={page:"",extension:!1},u.dark=localStorage.getItem("Dark")=="true",u.hue=localStorage.getItem("Hue")||"200",u._pageElement=null,u._darkCallbacks=new H,u._hueCallbacks=new H;var U=class extends v{constructor(){super(...arguments);this._state=0;this._unreceivedResources=0;this._uncompletedResources=0}AddResource(e,t){this._unreceivedResources++,this._uncompletedResources++;let r=!1,i=!1;R.GetResource(e,o=>{r||(this._unreceivedResources--,r=!0),o!=null&&(i||(this._uncompletedResources--,i=!0),this[t]=o),this._uncompletedResources==0?this._state=2:this._unreceivedResources==0&&(this._state=1)})}render(){return this._state==0?y:this._state==1?h`
            <loading-indicator style="width: 30.8rem; height: 100%; margin: auto;"></loading-indicator>
            <style>
                :host {
                    display: flex;
                }
            </style>
            `:this.renderPage()}renderPage(){return y}};a([C()],U.prototype,"_state",2);var pt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ht=s=>(...e)=>({_$litDirective$:s,values:e}),Le=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var ve=class extends Le{constructor(e){if(super(e),this.it=y,e.type!==pt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===y||e==null)return this.vt=void 0,this.it=e;if(e===N)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this.vt;this.it=e;let t=[e];return t.raw=t,this.vt={_$litType$:this.constructor.resultType,strings:t,values:[]}}};ve.directiveName="unsafeHTML",ve.resultType=1;var mt=ht(ve);var ut=d`:host {
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
}`;var P=class extends v{render(){return h`
        <details>
            <summary>
                <h3>${this.title}</h3>
                <p class="info">By ${this.author} | For ${this.years}${this.meeting?` | At${this.meetingDate==""?"":` ${this.meetingDate}`} ${this.meetingTime} | In ${this.meetingLocation}`:""}</p>
            </summary>

            ${mt(this.content)}
        </details>
        `}};P.styles=[x,ut],a([g()],P.prototype,"title",2),a([g()],P.prototype,"author",2),a([g()],P.prototype,"years",2),a([g({type:Boolean})],P.prototype,"meeting",2),a([g()],P.prototype,"meetingDate",2),a([g()],P.prototype,"meetingTime",2),a([g()],P.prototype,"meetingLocation",2),a([g()],P.prototype,"content",2),a([g({type:Number})],P.prototype,"weight",2),P=a([f("announcement-post")],P);function w(s,e,t){let r=s;for(let i=0;i<e.length;i++){if(r==null)return;if(e[i]=="array"){if(!Array.isArray(r))return}else if(typeof r!==e[i])return;i<t.length&&(r=r[t[i]])}return r}var be=d`:where(input[type=search]) {
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
}`;var gt=d`:where(select) {
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
}`;var ee=d`:host, main {
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
}`;var M=d`:host, main {
    box-shadow: var(--shadow);
    background-color: var(--surface2);
    border-radius: 0.8rem;
}`;var ft=d`:host {
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
}`;var B=class extends U{constructor(){super();this.yearFilter="all";this.searchFilter="";this.AddResource("announcements","announcements")}renderPage(){let e=w(this.announcements,["object","array"],["notices"])??[],t=this.yearFilter=="all"?e:e.filter(r=>(w(r,["object","array"],["years"])??[]).includes(this.yearFilter));return t=this.searchFilter==""?t:t.filter(r=>{let i=w(r,["object","string"],["title"]),o=w(r,["object","string"],["content"]);return i===void 0||o===void 0?!1:i.toLowerCase().includes(this.searchFilter.toLowerCase())||o.toLowerCase().includes(this.searchFilter.toLowerCase())}),h`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${r=>this.searchFilter=r.target.value}">

            <select @input="${r=>this.yearFilter=r.target.value}">
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
        <div class="content">${t.map(r=>{let i=w(r,["object","string"],["title"])??"???",o=w(r,["object","string"],["content"])??"???",n=w(r,["object","string"],["authorName"])??"No one",p=w(r,["object","string"],["displayYears"])??"No one",c=(w(r,["object","number"],["isMeeting"])??0)==1,m=w(r,["object","string"],["meetingDate"])??"";new Date().toISOString().split("T")[0]==m&&(m="");let S=w(r,["object","string"],["meetingTime"]),b=w(r,["object","string"],["meetingTimeParsed"])??"",k=w(r,["object","string"],["meetingLocation"])??"",T=w(r,["object","number"],["relativeWeight"])??0;return h`
            <announcement-post title="${i}" content="${o}" author="${n}" years="${p}"
                               ?meeting="${c}" meetingDate="${m}" meetingTime="${c?S??b:""}"
                               meetingLocation="${c?k:""}" weight="${T+(c?1:0)}"></announcement-post>
            `})}</div>
        `}};B.styles=[x,L,be,gt,M,ee,ft],a([C()],B.prototype,"announcements",2),a([C()],B.prototype,"yearFilter",2),a([C()],B.prototype,"searchFilter",2),B=a([f("school-announcements")],B);var vt=d`:host {
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
}`;var bt=W`<svg width="210" height="210" viewBox="0 0 210 210" xmlns="http://www.w3.org/2000/svg"><path d="M5 105a100 100 0 1 1 200 0 100 100 0 0 1-200 0Z" fill="none" stroke="#323232" stroke-width="10"/><path d="M95.8 128.4v-.6q0-9.8 2-15.5 2-5.8 5.6-9.4 3.5-3.6 8.5-6.6 4.5-2.7 7.6-7.1 3-4.4 3-10.5 0-7.5-5-12-5.1-4.4-12.3-4.4-4.2 0-8 1.8-4 1.7-6.6 5.5-2.6 3.7-3 9.7H74.7q.4-8.7 4.5-14.9 4.2-6.2 11-9.4 6.7-3.3 15-3.3 9 0 15.7 3.6 6.6 3.6 10.3 9.8 3.7 6.2 3.7 14.2 0 8.5-3.8 14.5T120.5 104q-6.7 4.2-9.5 9.2-2.8 5-3 14.6v.6H95.9Zm6.5 30.3q-3.8 0-6.5-2.7t-2.7-6.5q0-3.8 2.7-6.5t6.5-2.7q3.8 0 6.5 2.7t2.7 6.5q0 3.8-2.7 6.5t-6.5 2.7Z"/></svg>`;var te=class extends v{constructor(){super();this.HidePopup=(()=>{this.info.style.display="none",this.background.style.display="none"}).bind(this);this.addEventListener("mouseleave",this.HidePopup),document.addEventListener("pointerover",this.HidePopup)}ShowPopup(e){this.info.style.removeProperty("display"),this.background.style.removeProperty("display"),e.stopPropagation()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pointerover",this.HidePopup)}render(){return h`
        <button @click="${this.ShowPopup}" @mouseover="${this.ShowPopup}">
            ${bt}
        </button>

        <slot style="display: none"></slot>

        <div class="background" style="display: none"></div>
        `}};te.styles=[L,vt],a([A("slot")],te.prototype,"info",2),a([A(".background")],te.prototype,"background",2),te=a([f("info-popup")],te);var yt=d`:host {
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
    
    width: 1.9rem;
    height: 1.9rem;
    z-index: 2;
}`;var F=class extends U{constructor(){super();this.draggedElement=null;this.dragging=!1;this.addEventListener("pointerdown",e=>e.preventDefault()),this.addEventListener("pointermove",this.DragPoint),this.addEventListener("pointerup",this.EndDrag),this.AddResource("userinfo","userInfo"),u.ListenForDark(e=>{this.barcode?.classList.toggle("outline",e)})}set userInfo(e){let t=w(e,["object","string"],["studentId"]);t!==void 0&&(this.studentId=t,this.requestUpdate())}StartDrag(e){e.preventDefault(),this.draggedElement=e.target,this.draggedElement.style.pointerEvents="none",this.style.cursor="move"}DragPoint(e){e.preventDefault(),this.draggedElement!=null&&(this.dragging||(this.dragging=!0,this.draggedElement.style.left=`${(e.clientX-this.offsetLeft)/this.clientWidth*100}%`,this.draggedElement.style.top=`${(e.clientY-this.offsetTop)/this.clientHeight*100}%`,this.SetBarcodePosition(),this.dragging=!1))}EndDrag(){this.draggedElement!=null&&this.draggedElement.style.removeProperty("pointer-events"),this.draggedElement=null,this.removeAttribute("style"),this.RenderBarcode()}SetBarcodePosition(){if(this.barcode===null)return;let e=parseFloat(this.point1?.style.left.substring(0,this.point1.style.left.length-1)||"0"),t=parseFloat(this.point1?.style.top.substring(0,this.point1.style.top.length-1)||"0"),r=parseFloat(this.point2?.style.left.substring(0,this.point2.style.left.length-1)||"0"),i=parseFloat(this.point2?.style.top.substring(0,this.point2.style.top.length-1)||"0"),o=Math.max(e,r),n=Math.min(e,r),p=Math.max(t,i),c=Math.min(t,i);this.barcode.style.left=`${n}%`,this.barcode.style.top=`${c}%`,this.barcode.style.width=`${o-n}%`,this.barcode.style.height=`${p-c}%`}RenderBarcode(){this.draggedElement==null&&(this.barcode===null||this.point1===null||this.point2===null||(localStorage.setItem("Barcode Points",JSON.stringify([this.point1.style.left,this.point1.style.top,this.point2.style.left,this.point2.style.top])),typeof JsBarcode=="function"&&JsBarcode(this.barcode,this.studentId,{displayValue:!1,margin:0})))}updated(){this.SetBarcodePosition(),this.RenderBarcode()}renderPage(){let e=localStorage.getItem("Barcode Points"),t=["20%","20%","80%","40%"];return e&&(t=JSON.parse(e)),h`
        <info-popup>Use this barcode to scan in instead of your Student Card. Drag the points to resize it.</info-popup>

        <div id="point1" style="left: ${t[0]}; top: ${t[1]};" @pointerdown="${this.StartDrag}"></div>
        <div id="point2" style="left: ${t[2]}; top: ${t[3]};" @pointerdown="${this.StartDrag}"></div>

        <canvas id="barcodeDisplay" class="${u.dark?"outline":""}" style="top: 20%; left: 20%; width: 60%; height: 20%;"></canvas>
        `}};F.styles=[x,L,M,ee,yt],a([A("#barcodeDisplay")],F.prototype,"barcode",2),a([A("#point1")],F.prototype,"point1",2),a([A("#point2")],F.prototype,"point2",2),F=a([f("student-barcode")],F);var ye=(r=>(r.NO_COVER="nocover",r.REPLACEMENT="replacement",r.NO_VARIATION="novariation",r))(ye||{});var xt=d`:host {
    display: flex;
    justify-content: space-between;

    width: 100%;
}

p {
    color: var(--text3);
}`;var re=class extends v{render(){return h`
            <p>${this.title}</p>
            <p>${this.time}</p>
        `}};re.styles=[x,xt],a([g()],re.prototype,"title",2),a([g()],re.prototype,"time",2),re=a([f("daily-timetable-bell")],re);var wt=d`:host {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    width: 100%;
}

.info {
    font-size: 0.6rem;
}`;var z=class extends v{render(){return h`
            <div>
                <p>${this.title}</p>
                <p class="info">at ${this.time} with ${this.teacher}</p>
            </div>

            <p>${this.time}</p>
        `}};z.styles=[x,wt],a([g()],z.prototype,"title",2),a([g()],z.prototype,"time",2),a([g()],z.prototype,"teacher",2),a([g()],z.prototype,"room",2),z=a([f("daily-timetable-period")],z);var xe=d`:host, main {
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
}`;var kt=d`:host {
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
}`;var de=class extends U{constructor(){super();this.AddResource("dailytimetable","dailyTimetable")}GetBell(e){return h`<daily-timetable-bell title="${e.bellDisplay}" time="${e.time}"></daily-timetable-bell>`}GetPeriodTitle(e,t){return this.dailyTimetable.timetable.subjects[`${e}${t}`].title.split(" ").filter(i=>isNaN(parseFloat(i))&&i.length>1||i=="&").join(" ")}GetPeriod(e,t,r,i){return h`
        <daily-timetable-period title="${this.GetPeriodTitle(e.year,e.title)}"
                                time="${t.time}"
                                teacher="${r===void 0||r.type=="novariation"?e.fullTeacher:r.type=="nocover"?"No one":r.casualSurname??this.FormatTeacherCode(r.casual)}"
                                room="${i?.roomTo??e.room}"></daily-timetable-period>
        `}renderPage(){let e=this.dailyTimetable.bells,t=this.dailyTimetable.timetable.timetable.periods,r=Array.isArray(this.dailyTimetable.roomVariations)?{}:this.dailyTimetable.roomVariations,i=Array.isArray(this.dailyTimetable.classVariations)?{}:this.dailyTimetable.classVariations;return h`
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
                ${e.map(o=>{if(o.period in t){let n=t[o.period];return"fullTeacher"in n&&"year"in n?this.GetPeriod(n,o,i[o.period],r[o.period]):this.GetBell(o)}else return this.GetBell(o)})}
            </div>
        `}};de.styles=[x,M,xe,kt],a([C()],de.prototype,"dailyTimetable",2),de=a([f("daily-timetable")],de);var $t=d`:host {
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
}`;var Et=W`<svg width="529" height="528" viewBox="0 0 529 528" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="i"><use xlink:href="#a"/></clipPath><clipPath id="j"><use xlink:href="#b"/></clipPath><clipPath id="k"><use xlink:href="#c"/></clipPath><clipPath id="l"><use xlink:href="#d"/></clipPath><clipPath id="m"><use xlink:href="#e"/></clipPath><clipPath id="n"><use xlink:href="#f"/></clipPath><clipPath id="o"><use xlink:href="#g"/></clipPath><clipPath id="p"><use xlink:href="#h"/></clipPath><path d="M0 256a256 256 0 1 1 512 0 256 256 0 0 1-512 0Z" id="a"/><path d="M256 512a256 256 0 1 1 0-512 256 256 0 0 1 0 512Z" id="b"/><path d="M0 241.5a241.5 241.5 0 1 1 483 0 241.5 241.5 0 0 1-483 0Z" id="c"/><path d="M380 439.5a241.5 241.5 0 1 0-277-396 241.5 241.5 0 0 0 277 396c-.1 0 0 0 0 0Z" id="d"/><path d="M0 227a227 227 0 1 1 454 0 227 227 0 0 1-454 0Z" id="e"/><path d="M262.5 2.8a227 227 0 1 0 188.7 259.9A227 227 0 0 0 262.5 2.8Z" id="f"/><path d="M0 209.3a209.3 209.3 0 1 1 418.6 0 209.3 209.3 0 0 1-418.6 0Z" id="g"/><path d="M209.3 0a209.3 209.3 0 1 1 0 418.6 209.3 209.3 0 0 1 0-418.6Z" id="h"/></defs><path d="M8 264a256 256 0 1 1 512 0 256 256 0 0 1-512 0Z" fill="none"/><g clip-path="url(#i)" transform="translate(8 8)"><path d="M0 256a256 256 0 1 1 512 0 256 256 0 0 1-512 0Z" fill="none" stroke="#78AFA0" stroke-width="8" stroke-dasharray="76 4 70 76 4 70"/></g><path d="M264 520a256 256 0 1 1 0-512 256 256 0 0 1 0 512Z" fill="none"/><g clip-path="url(#j)" transform="translate(8 8)"><path d="M256 512a256 256 0 1 1 0-512 256 256 0 0 1 0 512Z" fill="none" stroke="#78AFA0" stroke-opacity=".3" stroke-width="8" stroke-dasharray="46 2 12 46 2 12"/></g><path d="M22.5 264a241.5 241.5 0 1 1 483 0 241.5 241.5 0 0 1-483 0Z" fill="none"/><g clip-path="url(#k)" transform="translate(22.5 22.5)"><path d="M0 241.5a241.5 241.5 0 1 1 483 0 241.5 241.5 0 0 1-483 0Z" fill="none" stroke="#DDA131" stroke-width="16" stroke-dasharray="76 2 40 180"/></g><path d="M402.5 461.8a241.5 241.5 0 1 0-277-396 241.5 241.5 0 0 0 277 396c-.1 0 0 0 0 0Z" fill="none"/><g clip-path="url(#l)" transform="translate(22.5 22.3)"><path d="M380 439.5a241.5 241.5 0 1 0-277-396 241.5 241.5 0 0 0 277 396c-.1 0 0 0 0 0Z" fill="none" stroke="#DDA131" stroke-opacity=".7" stroke-width="16" stroke-dasharray="56 2 4 56 2 4"/></g><path d="M37 264a227 227 0 1 1 454 0 227 227 0 0 1-454 0Z" fill="none"/><g clip-path="url(#m)" transform="translate(37 37)"><path d="M0 227a227 227 0 1 1 454 0 227 227 0 0 1-454 0Z" fill="none" stroke="#D36F2B" stroke-width="8" stroke-dasharray="51 4 10 80"/></g><path d="M299.5 39.7a227 227 0 1 0 188.7 259.8A227 227 0 0 0 299.5 39.7Z" fill="none"/><g clip-path="url(#n)" transform="translate(37 36.8)"><path d="M262.5 2.8a227 227 0 1 0 188.7 259.9A227 227 0 0 0 262.5 2.8Z" fill="none" stroke="#D36F2B" stroke-opacity=".4" stroke-width="8" stroke-dasharray="140 4 10 80"/></g><path d="M54.7 264a209.3 209.3 0 1 1 418.6 0 209.3 209.3 0 0 1-418.6 0Z" fill="none"/><g clip-path="url(#o)" transform="translate(54.7 54.7)"><path d="M0 209.3a209.3 209.3 0 1 1 418.6 0 209.3 209.3 0 0 1-418.6 0Z" fill="none" stroke="#C24127" stroke-width="4" stroke-dasharray="35 7 10 80"/></g><path d="M264 54.7a209.3 209.3 0 1 1 0 418.6 209.3 209.3 0 0 1 0-418.6Z" fill="none"/><g clip-path="url(#p)" transform="translate(54.7 54.7)"><path d="M209.3 0a209.3 209.3 0 1 1 0 418.6 209.3 209.3 0 0 1 0-418.6Z" fill="none" stroke="#C24127" stroke-opacity=".3" stroke-width="4" stroke-dasharray="35 7 10 80"/></g></svg>`;var we=class extends v{render(){return Et}};we.styles=$t,we=a([f("loading-indicator")],we);var Ct=d`:host {
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
}`;var G=class extends v{constructor(){super(...arguments);this.src=""}StopLoading(){this.loader.remove(),this.frame.removeAttribute("style")}render(){return h`
        <iframe @load="${this.StopLoading}" src="${this.src}" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" style="display: none"></iframe>
        <loading-indicator></loading-indicator>
        `}};G.styles=Ct,a([g({type:String})],G.prototype,"src",2),a([A("iframe",!0)],G.prototype,"frame",2),a([A("loading-indicator",!0)],G.prototype,"loader",2),G=a([f("extension-page")],G);var ke=d`a.button {
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
}`;var _t=d`:host {
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
}`;var j=class extends v{async Install(){await ot(this.title),document.getElementById("pages").requestUpdate()}async Uninstall(){await nt(this.title),document.getElementById("pages").requestUpdate()}render(){return h`
        <img src="${this.img}">
        
        <div class="content">
            <h4>${this.title}</h4>
            <p>${this.description}</p>

            <button @click="${this.installed?this.Uninstall:this.Install}">${this.installed?"Uninstall":"Install"}</button>
        </div>
        `}};j.styles=[x,ke,_t],a([g()],j.prototype,"title",2),a([g()],j.prototype,"img",2),a([g()],j.prototype,"description",2),a([g({type:Boolean})],j.prototype,"installed",2),j=a([f("extension-display")],j);var At=d`:host {
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
}`;var ce=class extends v{constructor(){super();this.fetchingExtensions=!0;this.extensions=new Map;at(e=>{this.fetchingExtensions=!1,this.extensions=e})}render(){let e=E.installedExtensions,t=[];for(var r of e.keys())t.push(r);return h`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${i=>this.searchFilter=i.target.value}">
            <input type="checkbox">
        </div>

        ${this.fetchingExtensions?y:h`
        <!--The ugliest code ever written, but the div tags for .content need to be where they are, or the :empty selector won't work-->
        <div class="content">${[...this.extensions.keys()].map(i=>h`
            <extension-display title="${i}" img="${dt(this.extensions.get(i))}"
                            description="${this.extensions.get(i).description}"
                            ?installed="${t.includes(i)}"></extension-display>
        `)}</div>
        `}
        `}};ce.styles=[x,be,M,ee,At],a([C()],ce.prototype,"extensions",2),ce=a([f("extensions-marketplace")],ce);var St=d`:host {
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
}`;var Tt=W`<svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#323232" stroke-width="10" stroke-linecap="round"><path d="m5 5 210 210M215 5 5 215"/></g></svg>`;var pe=class extends v{constructor(){super(...arguments);this.Close=this.remove.bind(this)}render(){return h`
        <slot></slot>
        ${this.loader?h`
        <loading-indicator class="indicator"></loading-indicator>`:h`
        <button class="indicator"  @click="${this.remove}" title="Close">
            ${Tt}
        </button>`}
        `}};pe.styles=[L,St],a([g({type:Boolean})],pe.prototype,"loader",2),pe=a([f("inline-notification")],pe);var Rt=d`:where(input[type=range]) {
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
}`;var ie=class extends v{constructor(){super();this.version="0.0.0";u.GetVersion().then(e=>this.version=e)}Patch(){}ResetColour(){this.hueInput.value="200",u.SetHue("200"),u.SaveHue()}ToggleDark(e){let t=e.target;u.SetDark(t.checked),this.requestUpdate()}ToggleEditNavbar(){let e=document.querySelector("nav-bar");e&&e.toggleAttribute("editing")}render(){return h`
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

        <input type="range" id="hue" min="0" max="359" value="${u.hue}"
               @input="${e=>u.SetHue(e.target.value)}"
               @change="${u.SaveHue.bind(u)}">

        <span></span>

        <p>${u.dark?"Dark":"Light"} Mode</p>

        <input type="checkbox" ?checked="${u.dark}" id="toggle" class="button" title="Turn on ${u.dark?"Light":"Dark"} Mode" @input="${this.ToggleDark}">
        
        <span></span>

        <p>Sidebar</p>

        <button @click="${this.ToggleEditNavbar}">Edit</button>
        `}};ie.styles=[x,L,ke,Rt,xe,M,Pt],a([A("#hue",!0)],ie.prototype,"hueInput",2),a([C()],ie.prototype,"version",2),ie=a([f("user-settings")],ie);var Lt=d`:host {
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
}`;var _=class extends v{static Highlight(e){if(this.highlighted!=e){this.highlighted=e;for(let t of this.instances)t.requestUpdate()}}constructor(){super();_.instances.push(this)}Highlight(){_.Highlight(this.name),this.classList.add("highlighted")}Unhighlight(){_.Highlight(void 0),this.classList.remove("highlighted")}firstUpdated(){this.room!==void 0&&this.room!==null&&(this.tabIndex=0)}render(){let e=_.highlighted==this.name;return this.classList.toggle("highlighted",e),e||this.blur(),h`
        <p>${this.name}</p>
        <p id="popup"
           style="${e?"":"display: none"}">
            ${this.room}
        </p>
        `}};_.styles=[x,Lt],_.instances=[],a([g()],_.prototype,"name",2),a([g()],_.prototype,"room",2),_=a([f("timetable-period")],_);var Mt=d`:host {
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
}`;var se=class extends U{set dailyTimetable(e){let t=w(e,["object","object","object","string"],["timetable","timetable","dayname"]);t!==void 0&&(this._day=t.slice(0,3).toUpperCase()+" "+t.slice(-1).toUpperCase())}constructor(){super();this.AddResource("timetable","timetable"),this.AddResource("dailytimetable","dailyTimetable"),document.addEventListener("pointerover",this.ClearHighlight)}SetHighlight(e){_.Highlight(e.target.name),e.stopPropagation()}ClearHighlight(e){_.Highlight(void 0),e.stopPropagation()}CreateTable(e){let t=[],r=[];for(let i of e){t.push(w(i,["object","string"],["dayname"])??"");let o=w(i,["object","object"],["periods"])??{},n=Object.keys(o);for(let p=0;p<n.length;p++)p>=r.length?r.push([o[n[p]]]):r[p].push(o[n[p]])}return h`
        <table>
            <thead>
                <tr>
                    <th></th>
                    ${t.map(i=>{let o=i.split(" "),n=`${o.shift()?.substring(0,3).toUpperCase()??"???"} ${o.map(p=>p.toUpperCase()).join(" ")}`;return h`
                        <th class="${n==this._day?"current-day":""}">${n}</th>
                        `})}
                </tr>
            </thead>
            <tbody>
                ${r.map(i=>h`
                <tr>
                    ${i.map(o=>{let n=w(o,["object","string"],["title"])??"";return h`
                        <td>
                            <timetable-period name="${n}" room="${w(o,["object","string"],["room"])??"???"}"></timetable-period>
                        </td>
                        `})}
                </tr>
                `)}
            </tbody>
        </table>
        `}createRenderRoot(){let e=super.createRenderRoot();return e.addEventListener("pointerover",this.SetHighlight),e.addEventListener("focusin",this.SetHighlight),e}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pointerover",this.ClearHighlight)}renderPage(){let e=w(this.timetable,["object","object"],["days"])??{},t=Object.keys(e),r=[],i=[];for(let o=0;o<t.length;o++)o%5==0&&(i.length>0&&r.push(this.CreateTable(i)),i=[]),i.push(e[t[o]]);return i.length>0&&r.push(this.CreateTable(i)),h`${r}`}};se.styles=[x,M,Mt],a([C()],se.prototype,"timetable",2),a([C()],se.prototype,"_day",2),se=a([f("full-timetable")],se);Ft();async function Ft(){location.hash?Ut(location.hash):u.NavigateTo({page:document.querySelector("main").children[0].id,extension:!1}),ct(),window.addEventListener("hashchange",()=>{location.hash&&Ut(location.hash)});var t=await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");t?await t.update():await navigator.serviceWorker.register("dist/service-worker/service-worker.js",{scope:"/"});let s=sessionStorage.getItem("Last Reloaded"),e=Gt();if(s){let i=new Date(s);new Date().getTime()-i.getTime()>"3600"&&(R.FetchResources().then(e.Close),sessionStorage.setItem("Last Refreshed",new Date().toISOString()))}else R.FetchResources().then(e.Close);var t=await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");t?await t.update():await navigator.serviceWorker.register("dist/service-worker/service-worker.js",{scope:"/"}),navigator.serviceWorker.addEventListener("message",i=>{i.data.command=="metadata-fetched"&&lt()});let r=await navigator.serviceWorker.ready;if(r.periodicSync){if(!(await r.periodicSync.getTags()).includes("metadata-fetch"))try{await r.periodicSync.register("metadata-fetch",{minInterval:"2592000000"})}catch{console.log("Couldn't register background fetch. Updates will be only occur when app is open.")}}else console.log("Couldn't register background fetch. Updates will be only occur when app is open.");navigator.serviceWorker.controller?.postMessage({command:"metadata-fetch"})}function Ut(s){let e=s.indexOf("extension-")==1,t="";e?t=decodeURIComponent(s.substring(11)):t=decodeURIComponent(s.substring(1)),u.NavigateTo({page:t,extension:e})}function Gt(){return u.ShowNotification("Updating resources...",!0)}
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
