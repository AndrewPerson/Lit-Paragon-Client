var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i7 = decorators.length - 1, decorator; i7 >= 0; i7--)
    if (decorator = decorators[i7])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// site/ts/site/resources.ts
var Resources = class {
  static ShowLoginNotification() {
    let content = document.createElement("p");
    content.innerHTML = `You need to <a>login</a> to see the latest information.`;
    Site.ShowNotification(content);
  }
  static async GetToken() {
    let cache = await caches.open("User Resources");
    let tokenResponse = await cache.match("Token");
    if (!tokenResponse) {
      location.href = `${location.origin}/login`;
      return {
        valid: false,
        token: null
      };
    }
    let token = await tokenResponse.json();
    if (new Date() > token.termination) {
      this.ShowLoginNotification();
      return {
        valid: false,
        token: null
      };
    }
    return {
      valid: true,
      token
    };
  }
  static async SetResources(resources) {
    let cache = await caches.open("User Resources");
    let promises = [];
    resources.forEach((resourceGroup) => {
      let name = resourceGroup.name;
      let resource = resourceGroup.resource;
      promises.push(cache.put(name, new Response(resource)).then(() => this._resourceCallbacks.get(name)?.Invoke(JSON.parse(resource))));
    });
    await Promise.all(promises);
  }
  static async SetResource(name, resource) {
    let cache = await caches.open("User Resources");
    await cache.put(name, new Response(resource));
    this._resourceCallbacks.get(name)?.Invoke(JSON.parse(resource));
  }
  static async GetResourceNow(name) {
    let cache = await caches.open("User Resources");
    let response = await cache.match(name);
    if (response) {
      let resource = await response.json();
      return resource;
    } else
      return void 0;
  }
  static async GetResource(name, callback) {
    let callbacks = this._resourceCallbacks.get(name);
    if (callbacks !== void 0) {
      callbacks.AddListener(callback);
      this._resourceCallbacks.set(name, callbacks);
    }
    callback(await this.GetResourceNow(name));
  }
  static async FetchResources() {
    let { valid, token } = await this.GetToken();
    if (!valid)
      return false;
    let serverUrl = new URL("https://sbhs-random-data.profsmart.repl.co/resources");
    serverUrl.searchParams.append("token", JSON.stringify(token));
    let resourceResponse = await fetch(serverUrl.toString());
    if (!resourceResponse.ok) {
      this.ShowLoginNotification();
      return false;
    }
    let resourceResult = await resourceResponse.json();
    let cache = await caches.open("User Resources");
    await cache.put("Token", new Response(JSON.stringify(resourceResult.token)));
    await this.SetResources(Object.keys(resourceResult.result).map((key) => {
      return {
        name: key,
        resource: JSON.stringify(resourceResult.result[key])
      };
    }));
    return true;
  }
};
Resources._resourceCallbacks = /* @__PURE__ */ new Map();

// site/ts/site/callback.ts
var Callbacks = class {
  constructor() {
    this._callbacks = [];
  }
  AddListener(callback) {
    this._callbacks.push(callback);
  }
  Invoke(param) {
    for (let callback of this._callbacks)
      callback(param);
  }
};

// node_modules/@lit/reactive-element/css-tag.js
var t = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var e = Symbol();
var n = /* @__PURE__ */ new Map();
var s = class {
  constructor(t5, n6) {
    if (this._$cssResult$ = true, n6 !== e)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t5;
  }
  get styleSheet() {
    let e8 = n.get(this.cssText);
    return t && e8 === void 0 && (n.set(this.cssText, e8 = new CSSStyleSheet()), e8.replaceSync(this.cssText)), e8;
  }
  toString() {
    return this.cssText;
  }
};
var o = (t5) => new s(typeof t5 == "string" ? t5 : t5 + "", e);
var r = (t5, ...n6) => {
  const o7 = t5.length === 1 ? t5[0] : n6.reduce((e8, n7, s6) => e8 + ((t6) => {
    if (t6._$cssResult$ === true)
      return t6.cssText;
    if (typeof t6 == "number")
      return t6;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t6 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n7) + t5[s6 + 1], t5[0]);
  return new s(o7, e);
};
var i = (e8, n6) => {
  t ? e8.adoptedStyleSheets = n6.map((t5) => t5 instanceof CSSStyleSheet ? t5 : t5.styleSheet) : n6.forEach((t5) => {
    const n7 = document.createElement("style"), s6 = window.litNonce;
    s6 !== void 0 && n7.setAttribute("nonce", s6), n7.textContent = t5.cssText, e8.appendChild(n7);
  });
};
var S = t ? (t5) => t5 : (t5) => t5 instanceof CSSStyleSheet ? ((t6) => {
  let e8 = "";
  for (const n6 of t6.cssRules)
    e8 += n6.cssText;
  return o(e8);
})(t5) : t5;

// node_modules/@lit/reactive-element/reactive-element.js
var s2;
var e2 = window.trustedTypes;
var r2 = e2 ? e2.emptyScript : "";
var h = window.reactiveElementPolyfillSupport;
var o2 = { toAttribute(t5, i7) {
  switch (i7) {
    case Boolean:
      t5 = t5 ? r2 : null;
      break;
    case Object:
    case Array:
      t5 = t5 == null ? t5 : JSON.stringify(t5);
  }
  return t5;
}, fromAttribute(t5, i7) {
  let s6 = t5;
  switch (i7) {
    case Boolean:
      s6 = t5 !== null;
      break;
    case Number:
      s6 = t5 === null ? null : Number(t5);
      break;
    case Object:
    case Array:
      try {
        s6 = JSON.parse(t5);
      } catch (t6) {
        s6 = null;
      }
  }
  return s6;
} };
var n2 = (t5, i7) => i7 !== t5 && (i7 == i7 || t5 == t5);
var l = { attribute: true, type: String, converter: o2, reflect: false, hasChanged: n2 };
var a = class extends HTMLElement {
  constructor() {
    super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
  }
  static addInitializer(t5) {
    var i7;
    (i7 = this.l) !== null && i7 !== void 0 || (this.l = []), this.l.push(t5);
  }
  static get observedAttributes() {
    this.finalize();
    const t5 = [];
    return this.elementProperties.forEach((i7, s6) => {
      const e8 = this._$Eh(s6, i7);
      e8 !== void 0 && (this._$Eu.set(e8, s6), t5.push(e8));
    }), t5;
  }
  static createProperty(t5, i7 = l) {
    if (i7.state && (i7.attribute = false), this.finalize(), this.elementProperties.set(t5, i7), !i7.noAccessor && !this.prototype.hasOwnProperty(t5)) {
      const s6 = typeof t5 == "symbol" ? Symbol() : "__" + t5, e8 = this.getPropertyDescriptor(t5, s6, i7);
      e8 !== void 0 && Object.defineProperty(this.prototype, t5, e8);
    }
  }
  static getPropertyDescriptor(t5, i7, s6) {
    return { get() {
      return this[i7];
    }, set(e8) {
      const r4 = this[t5];
      this[i7] = e8, this.requestUpdate(t5, r4, s6);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t5) {
    return this.elementProperties.get(t5) || l;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t5 = Object.getPrototypeOf(this);
    if (t5.finalize(), this.elementProperties = new Map(t5.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t6 = this.properties, i7 = [...Object.getOwnPropertyNames(t6), ...Object.getOwnPropertySymbols(t6)];
      for (const s6 of i7)
        this.createProperty(s6, t6[s6]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i7) {
    const s6 = [];
    if (Array.isArray(i7)) {
      const e8 = new Set(i7.flat(1 / 0).reverse());
      for (const i8 of e8)
        s6.unshift(S(i8));
    } else
      i7 !== void 0 && s6.push(S(i7));
    return s6;
  }
  static _$Eh(t5, i7) {
    const s6 = i7.attribute;
    return s6 === false ? void 0 : typeof s6 == "string" ? s6 : typeof t5 == "string" ? t5.toLowerCase() : void 0;
  }
  o() {
    var t5;
    this._$Ep = new Promise((t6) => this.enableUpdating = t6), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t5 = this.constructor.l) === null || t5 === void 0 || t5.forEach((t6) => t6(this));
  }
  addController(t5) {
    var i7, s6;
    ((i7 = this._$Eg) !== null && i7 !== void 0 ? i7 : this._$Eg = []).push(t5), this.renderRoot !== void 0 && this.isConnected && ((s6 = t5.hostConnected) === null || s6 === void 0 || s6.call(t5));
  }
  removeController(t5) {
    var i7;
    (i7 = this._$Eg) === null || i7 === void 0 || i7.splice(this._$Eg.indexOf(t5) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t5, i7) => {
      this.hasOwnProperty(i7) && (this._$Et.set(i7, this[i7]), delete this[i7]);
    });
  }
  createRenderRoot() {
    var t5;
    const s6 = (t5 = this.shadowRoot) !== null && t5 !== void 0 ? t5 : this.attachShadow(this.constructor.shadowRootOptions);
    return i(s6, this.constructor.elementStyles), s6;
  }
  connectedCallback() {
    var t5;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t5 = this._$Eg) === null || t5 === void 0 || t5.forEach((t6) => {
      var i7;
      return (i7 = t6.hostConnected) === null || i7 === void 0 ? void 0 : i7.call(t6);
    });
  }
  enableUpdating(t5) {
  }
  disconnectedCallback() {
    var t5;
    (t5 = this._$Eg) === null || t5 === void 0 || t5.forEach((t6) => {
      var i7;
      return (i7 = t6.hostDisconnected) === null || i7 === void 0 ? void 0 : i7.call(t6);
    });
  }
  attributeChangedCallback(t5, i7, s6) {
    this._$AK(t5, s6);
  }
  _$ES(t5, i7, s6 = l) {
    var e8, r4;
    const h3 = this.constructor._$Eh(t5, s6);
    if (h3 !== void 0 && s6.reflect === true) {
      const n6 = ((r4 = (e8 = s6.converter) === null || e8 === void 0 ? void 0 : e8.toAttribute) !== null && r4 !== void 0 ? r4 : o2.toAttribute)(i7, s6.type);
      this._$Ei = t5, n6 == null ? this.removeAttribute(h3) : this.setAttribute(h3, n6), this._$Ei = null;
    }
  }
  _$AK(t5, i7) {
    var s6, e8, r4;
    const h3 = this.constructor, n6 = h3._$Eu.get(t5);
    if (n6 !== void 0 && this._$Ei !== n6) {
      const t6 = h3.getPropertyOptions(n6), l4 = t6.converter, a4 = (r4 = (e8 = (s6 = l4) === null || s6 === void 0 ? void 0 : s6.fromAttribute) !== null && e8 !== void 0 ? e8 : typeof l4 == "function" ? l4 : null) !== null && r4 !== void 0 ? r4 : o2.fromAttribute;
      this._$Ei = n6, this[n6] = a4(i7, t6.type), this._$Ei = null;
    }
  }
  requestUpdate(t5, i7, s6) {
    let e8 = true;
    t5 !== void 0 && (((s6 = s6 || this.constructor.getPropertyOptions(t5)).hasChanged || n2)(this[t5], i7) ? (this._$AL.has(t5) || this._$AL.set(t5, i7), s6.reflect === true && this._$Ei !== t5 && (this._$E_ === void 0 && (this._$E_ = /* @__PURE__ */ new Map()), this._$E_.set(t5, s6))) : e8 = false), !this.isUpdatePending && e8 && (this._$Ep = this._$EC());
  }
  async _$EC() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t6) {
      Promise.reject(t6);
    }
    const t5 = this.scheduleUpdate();
    return t5 != null && await t5, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t5;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t6, i8) => this[i8] = t6), this._$Et = void 0);
    let i7 = false;
    const s6 = this._$AL;
    try {
      i7 = this.shouldUpdate(s6), i7 ? (this.willUpdate(s6), (t5 = this._$Eg) === null || t5 === void 0 || t5.forEach((t6) => {
        var i8;
        return (i8 = t6.hostUpdate) === null || i8 === void 0 ? void 0 : i8.call(t6);
      }), this.update(s6)) : this._$EU();
    } catch (t6) {
      throw i7 = false, this._$EU(), t6;
    }
    i7 && this._$AE(s6);
  }
  willUpdate(t5) {
  }
  _$AE(t5) {
    var i7;
    (i7 = this._$Eg) === null || i7 === void 0 || i7.forEach((t6) => {
      var i8;
      return (i8 = t6.hostUpdated) === null || i8 === void 0 ? void 0 : i8.call(t6);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t5)), this.updated(t5);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t5) {
    return true;
  }
  update(t5) {
    this._$E_ !== void 0 && (this._$E_.forEach((t6, i7) => this._$ES(i7, this[i7], t6)), this._$E_ = void 0), this._$EU();
  }
  updated(t5) {
  }
  firstUpdated(t5) {
  }
};
a.finalized = true, a.elementProperties = /* @__PURE__ */ new Map(), a.elementStyles = [], a.shadowRootOptions = { mode: "open" }, h == null || h({ ReactiveElement: a }), ((s2 = globalThis.reactiveElementVersions) !== null && s2 !== void 0 ? s2 : globalThis.reactiveElementVersions = []).push("1.0.2");

// node_modules/lit-html/lit-html.js
var t2;
var i2 = globalThis.trustedTypes;
var s3 = i2 ? i2.createPolicy("lit-html", { createHTML: (t5) => t5 }) : void 0;
var e3 = `lit$${(Math.random() + "").slice(9)}$`;
var o3 = "?" + e3;
var n3 = `<${o3}>`;
var l2 = document;
var h2 = (t5 = "") => l2.createComment(t5);
var r3 = (t5) => t5 === null || typeof t5 != "object" && typeof t5 != "function";
var d = Array.isArray;
var u = (t5) => {
  var i7;
  return d(t5) || typeof ((i7 = t5) === null || i7 === void 0 ? void 0 : i7[Symbol.iterator]) == "function";
};
var c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var a2 = />/g;
var f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
var _ = /'/g;
var m = /"/g;
var g = /^(?:script|style|textarea)$/i;
var $ = (t5) => (i7, ...s6) => ({ _$litType$: t5, strings: i7, values: s6 });
var p = $(1);
var y = $(2);
var b = Symbol.for("lit-noChange");
var T = Symbol.for("lit-nothing");
var x = /* @__PURE__ */ new WeakMap();
var w = (t5, i7, s6) => {
  var e8, o7;
  const n6 = (e8 = s6 == null ? void 0 : s6.renderBefore) !== null && e8 !== void 0 ? e8 : i7;
  let l4 = n6._$litPart$;
  if (l4 === void 0) {
    const t6 = (o7 = s6 == null ? void 0 : s6.renderBefore) !== null && o7 !== void 0 ? o7 : null;
    n6._$litPart$ = l4 = new N(i7.insertBefore(h2(), t6), t6, void 0, s6 != null ? s6 : {});
  }
  return l4._$AI(t5), l4;
};
var A = l2.createTreeWalker(l2, 129, null, false);
var C = (t5, i7) => {
  const o7 = t5.length - 1, l4 = [];
  let h3, r4 = i7 === 2 ? "<svg>" : "", d2 = c;
  for (let i8 = 0; i8 < o7; i8++) {
    const s6 = t5[i8];
    let o8, u5, $2 = -1, p2 = 0;
    for (; p2 < s6.length && (d2.lastIndex = p2, u5 = d2.exec(s6), u5 !== null); )
      p2 = d2.lastIndex, d2 === c ? u5[1] === "!--" ? d2 = v : u5[1] !== void 0 ? d2 = a2 : u5[2] !== void 0 ? (g.test(u5[2]) && (h3 = RegExp("</" + u5[2], "g")), d2 = f) : u5[3] !== void 0 && (d2 = f) : d2 === f ? u5[0] === ">" ? (d2 = h3 != null ? h3 : c, $2 = -1) : u5[1] === void 0 ? $2 = -2 : ($2 = d2.lastIndex - u5[2].length, o8 = u5[1], d2 = u5[3] === void 0 ? f : u5[3] === '"' ? m : _) : d2 === m || d2 === _ ? d2 = f : d2 === v || d2 === a2 ? d2 = c : (d2 = f, h3 = void 0);
    const y2 = d2 === f && t5[i8 + 1].startsWith("/>") ? " " : "";
    r4 += d2 === c ? s6 + n3 : $2 >= 0 ? (l4.push(o8), s6.slice(0, $2) + "$lit$" + s6.slice($2) + e3 + y2) : s6 + e3 + ($2 === -2 ? (l4.push(void 0), i8) : y2);
  }
  const u4 = r4 + (t5[o7] || "<?>") + (i7 === 2 ? "</svg>" : "");
  return [s3 !== void 0 ? s3.createHTML(u4) : u4, l4];
};
var P = class {
  constructor({ strings: t5, _$litType$: s6 }, n6) {
    let l4;
    this.parts = [];
    let r4 = 0, d2 = 0;
    const u4 = t5.length - 1, c4 = this.parts, [v2, a4] = C(t5, s6);
    if (this.el = P.createElement(v2, n6), A.currentNode = this.el.content, s6 === 2) {
      const t6 = this.el.content, i7 = t6.firstChild;
      i7.remove(), t6.append(...i7.childNodes);
    }
    for (; (l4 = A.nextNode()) !== null && c4.length < u4; ) {
      if (l4.nodeType === 1) {
        if (l4.hasAttributes()) {
          const t6 = [];
          for (const i7 of l4.getAttributeNames())
            if (i7.endsWith("$lit$") || i7.startsWith(e3)) {
              const s7 = a4[d2++];
              if (t6.push(i7), s7 !== void 0) {
                const t7 = l4.getAttribute(s7.toLowerCase() + "$lit$").split(e3), i8 = /([.?@])?(.*)/.exec(s7);
                c4.push({ type: 1, index: r4, name: i8[2], strings: t7, ctor: i8[1] === "." ? M : i8[1] === "?" ? H : i8[1] === "@" ? I : S2 });
              } else
                c4.push({ type: 6, index: r4 });
            }
          for (const i7 of t6)
            l4.removeAttribute(i7);
        }
        if (g.test(l4.tagName)) {
          const t6 = l4.textContent.split(e3), s7 = t6.length - 1;
          if (s7 > 0) {
            l4.textContent = i2 ? i2.emptyScript : "";
            for (let i7 = 0; i7 < s7; i7++)
              l4.append(t6[i7], h2()), A.nextNode(), c4.push({ type: 2, index: ++r4 });
            l4.append(t6[s7], h2());
          }
        }
      } else if (l4.nodeType === 8)
        if (l4.data === o3)
          c4.push({ type: 2, index: r4 });
        else {
          let t6 = -1;
          for (; (t6 = l4.data.indexOf(e3, t6 + 1)) !== -1; )
            c4.push({ type: 7, index: r4 }), t6 += e3.length - 1;
        }
      r4++;
    }
  }
  static createElement(t5, i7) {
    const s6 = l2.createElement("template");
    return s6.innerHTML = t5, s6;
  }
};
function V(t5, i7, s6 = t5, e8) {
  var o7, n6, l4, h3;
  if (i7 === b)
    return i7;
  let d2 = e8 !== void 0 ? (o7 = s6._$Cl) === null || o7 === void 0 ? void 0 : o7[e8] : s6._$Cu;
  const u4 = r3(i7) ? void 0 : i7._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u4 && ((n6 = d2 == null ? void 0 : d2._$AO) === null || n6 === void 0 || n6.call(d2, false), u4 === void 0 ? d2 = void 0 : (d2 = new u4(t5), d2._$AT(t5, s6, e8)), e8 !== void 0 ? ((l4 = (h3 = s6)._$Cl) !== null && l4 !== void 0 ? l4 : h3._$Cl = [])[e8] = d2 : s6._$Cu = d2), d2 !== void 0 && (i7 = V(t5, d2._$AS(t5, i7.values), d2, e8)), i7;
}
var E = class {
  constructor(t5, i7) {
    this.v = [], this._$AN = void 0, this._$AD = t5, this._$AM = i7;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t5) {
    var i7;
    const { el: { content: s6 }, parts: e8 } = this._$AD, o7 = ((i7 = t5 == null ? void 0 : t5.creationScope) !== null && i7 !== void 0 ? i7 : l2).importNode(s6, true);
    A.currentNode = o7;
    let n6 = A.nextNode(), h3 = 0, r4 = 0, d2 = e8[0];
    for (; d2 !== void 0; ) {
      if (h3 === d2.index) {
        let i8;
        d2.type === 2 ? i8 = new N(n6, n6.nextSibling, this, t5) : d2.type === 1 ? i8 = new d2.ctor(n6, d2.name, d2.strings, this, t5) : d2.type === 6 && (i8 = new L(n6, this, t5)), this.v.push(i8), d2 = e8[++r4];
      }
      h3 !== (d2 == null ? void 0 : d2.index) && (n6 = A.nextNode(), h3++);
    }
    return o7;
  }
  m(t5) {
    let i7 = 0;
    for (const s6 of this.v)
      s6 !== void 0 && (s6.strings !== void 0 ? (s6._$AI(t5, s6, i7), i7 += s6.strings.length - 2) : s6._$AI(t5[i7])), i7++;
  }
};
var N = class {
  constructor(t5, i7, s6, e8) {
    var o7;
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t5, this._$AB = i7, this._$AM = s6, this.options = e8, this._$Cg = (o7 = e8 == null ? void 0 : e8.isConnected) === null || o7 === void 0 || o7;
  }
  get _$AU() {
    var t5, i7;
    return (i7 = (t5 = this._$AM) === null || t5 === void 0 ? void 0 : t5._$AU) !== null && i7 !== void 0 ? i7 : this._$Cg;
  }
  get parentNode() {
    let t5 = this._$AA.parentNode;
    const i7 = this._$AM;
    return i7 !== void 0 && t5.nodeType === 11 && (t5 = i7.parentNode), t5;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t5, i7 = this) {
    t5 = V(this, t5, i7), r3(t5) ? t5 === T || t5 == null || t5 === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t5 !== this._$AH && t5 !== b && this.$(t5) : t5._$litType$ !== void 0 ? this.T(t5) : t5.nodeType !== void 0 ? this.S(t5) : u(t5) ? this.M(t5) : this.$(t5);
  }
  A(t5, i7 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t5, i7);
  }
  S(t5) {
    this._$AH !== t5 && (this._$AR(), this._$AH = this.A(t5));
  }
  $(t5) {
    this._$AH !== T && r3(this._$AH) ? this._$AA.nextSibling.data = t5 : this.S(l2.createTextNode(t5)), this._$AH = t5;
  }
  T(t5) {
    var i7;
    const { values: s6, _$litType$: e8 } = t5, o7 = typeof e8 == "number" ? this._$AC(t5) : (e8.el === void 0 && (e8.el = P.createElement(e8.h, this.options)), e8);
    if (((i7 = this._$AH) === null || i7 === void 0 ? void 0 : i7._$AD) === o7)
      this._$AH.m(s6);
    else {
      const t6 = new E(o7, this), i8 = t6.p(this.options);
      t6.m(s6), this.S(i8), this._$AH = t6;
    }
  }
  _$AC(t5) {
    let i7 = x.get(t5.strings);
    return i7 === void 0 && x.set(t5.strings, i7 = new P(t5)), i7;
  }
  M(t5) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i7 = this._$AH;
    let s6, e8 = 0;
    for (const o7 of t5)
      e8 === i7.length ? i7.push(s6 = new N(this.A(h2()), this.A(h2()), this, this.options)) : s6 = i7[e8], s6._$AI(o7), e8++;
    e8 < i7.length && (this._$AR(s6 && s6._$AB.nextSibling, e8), i7.length = e8);
  }
  _$AR(t5 = this._$AA.nextSibling, i7) {
    var s6;
    for ((s6 = this._$AP) === null || s6 === void 0 || s6.call(this, false, true, i7); t5 && t5 !== this._$AB; ) {
      const i8 = t5.nextSibling;
      t5.remove(), t5 = i8;
    }
  }
  setConnected(t5) {
    var i7;
    this._$AM === void 0 && (this._$Cg = t5, (i7 = this._$AP) === null || i7 === void 0 || i7.call(this, t5));
  }
};
var S2 = class {
  constructor(t5, i7, s6, e8, o7) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t5, this.name = i7, this._$AM = e8, this.options = o7, s6.length > 2 || s6[0] !== "" || s6[1] !== "" ? (this._$AH = Array(s6.length - 1).fill(new String()), this.strings = s6) : this._$AH = T;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t5, i7 = this, s6, e8) {
    const o7 = this.strings;
    let n6 = false;
    if (o7 === void 0)
      t5 = V(this, t5, i7, 0), n6 = !r3(t5) || t5 !== this._$AH && t5 !== b, n6 && (this._$AH = t5);
    else {
      const e9 = t5;
      let l4, h3;
      for (t5 = o7[0], l4 = 0; l4 < o7.length - 1; l4++)
        h3 = V(this, e9[s6 + l4], i7, l4), h3 === b && (h3 = this._$AH[l4]), n6 || (n6 = !r3(h3) || h3 !== this._$AH[l4]), h3 === T ? t5 = T : t5 !== T && (t5 += (h3 != null ? h3 : "") + o7[l4 + 1]), this._$AH[l4] = h3;
    }
    n6 && !e8 && this.k(t5);
  }
  k(t5) {
    t5 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t5 != null ? t5 : "");
  }
};
var M = class extends S2 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  k(t5) {
    this.element[this.name] = t5 === T ? void 0 : t5;
  }
};
var k = i2 ? i2.emptyScript : "";
var H = class extends S2 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  k(t5) {
    t5 && t5 !== T ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
  }
};
var I = class extends S2 {
  constructor(t5, i7, s6, e8, o7) {
    super(t5, i7, s6, e8, o7), this.type = 5;
  }
  _$AI(t5, i7 = this) {
    var s6;
    if ((t5 = (s6 = V(this, t5, i7, 0)) !== null && s6 !== void 0 ? s6 : T) === b)
      return;
    const e8 = this._$AH, o7 = t5 === T && e8 !== T || t5.capture !== e8.capture || t5.once !== e8.once || t5.passive !== e8.passive, n6 = t5 !== T && (e8 === T || o7);
    o7 && this.element.removeEventListener(this.name, this, e8), n6 && this.element.addEventListener(this.name, this, t5), this._$AH = t5;
  }
  handleEvent(t5) {
    var i7, s6;
    typeof this._$AH == "function" ? this._$AH.call((s6 = (i7 = this.options) === null || i7 === void 0 ? void 0 : i7.host) !== null && s6 !== void 0 ? s6 : this.element, t5) : this._$AH.handleEvent(t5);
  }
};
var L = class {
  constructor(t5, i7, s6) {
    this.element = t5, this.type = 6, this._$AN = void 0, this._$AM = i7, this.options = s6;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t5) {
    V(this, t5);
  }
};
var R = { P: "$lit$", V: e3, L: o3, I: 1, N: C, R: E, D: u, j: V, H: N, O: S2, F: H, B: I, W: M, Z: L };
var z = window.litHtmlPolyfillSupport;
z == null || z(P, N), ((t2 = globalThis.litHtmlVersions) !== null && t2 !== void 0 ? t2 : globalThis.litHtmlVersions = []).push("2.0.2");

// node_modules/lit-element/lit-element.js
var l3;
var o4;
var s4 = class extends a {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t5, e8;
    const i7 = super.createRenderRoot();
    return (t5 = (e8 = this.renderOptions).renderBefore) !== null && t5 !== void 0 || (e8.renderBefore = i7.firstChild), i7;
  }
  update(t5) {
    const i7 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t5), this._$Dt = w(i7, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t5;
    super.connectedCallback(), (t5 = this._$Dt) === null || t5 === void 0 || t5.setConnected(true);
  }
  disconnectedCallback() {
    var t5;
    super.disconnectedCallback(), (t5 = this._$Dt) === null || t5 === void 0 || t5.setConnected(false);
  }
  render() {
    return b;
  }
};
s4.finalized = true, s4._$litElement$ = true, (l3 = globalThis.litElementHydrateSupport) === null || l3 === void 0 || l3.call(globalThis, { LitElement: s4 });
var n4 = globalThis.litElementPolyfillSupport;
n4 == null || n4({ LitElement: s4 });
((o4 = globalThis.litElementVersions) !== null && o4 !== void 0 ? o4 : globalThis.litElementVersions = []).push("3.0.2");

// node_modules/@lit/reactive-element/decorators/custom-element.js
var n5 = (n6) => (e8) => typeof e8 == "function" ? ((n7, e9) => (window.customElements.define(n7, e9), e9))(n6, e8) : ((n7, e9) => {
  const { kind: t5, elements: i7 } = e9;
  return { kind: t5, elements: i7, finisher(e10) {
    window.customElements.define(n7, e10);
  } };
})(n6, e8);

// node_modules/@lit/reactive-element/decorators/property.js
var i3 = (i7, e8) => e8.kind === "method" && e8.descriptor && !("value" in e8.descriptor) ? { ...e8, finisher(n6) {
  n6.createProperty(e8.key, i7);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e8.key, initializer() {
  typeof e8.initializer == "function" && (this[e8.key] = e8.initializer.call(this));
}, finisher(n6) {
  n6.createProperty(e8.key, i7);
} };
function e4(e8) {
  return (n6, t5) => t5 !== void 0 ? ((i7, e9, n7) => {
    e9.constructor.createProperty(n7, i7);
  })(e8, n6, t5) : i3(e8, n6);
}

// node_modules/@lit/reactive-element/decorators/state.js
function t3(t5) {
  return e4({ ...t5, state: true });
}

// node_modules/@lit/reactive-element/decorators/base.js
var o5 = ({ finisher: e8, descriptor: t5 }) => (o7, n6) => {
  var r4;
  if (n6 === void 0) {
    const n7 = (r4 = o7.originalKey) !== null && r4 !== void 0 ? r4 : o7.key, i7 = t5 != null ? { kind: "method", placement: "prototype", key: n7, descriptor: t5(o7.key) } : { ...o7, key: n7 };
    return e8 != null && (i7.finisher = function(t6) {
      e8(t6, n7);
    }), i7;
  }
  {
    const r5 = o7.constructor;
    t5 !== void 0 && Object.defineProperty(o7, n6, t5(n6)), e8 == null || e8(r5, n6);
  }
};

// node_modules/@lit/reactive-element/decorators/query.js
function i4(i7, n6) {
  return o5({ descriptor: (o7) => {
    const t5 = { get() {
      var o8, n7;
      return (n7 = (o8 = this.renderRoot) === null || o8 === void 0 ? void 0 : o8.querySelector(i7)) !== null && n7 !== void 0 ? n7 : null;
    }, enumerable: true, configurable: true };
    if (n6) {
      const n7 = typeof o7 == "symbol" ? Symbol() : "__" + o7;
      t5.get = function() {
        var o8, t6;
        return this[n7] === void 0 && (this[n7] = (t6 = (o8 = this.renderRoot) === null || o8 === void 0 ? void 0 : o8.querySelector(i7)) !== null && t6 !== void 0 ? t6 : null), this[n7];
      };
    }
    return t5;
  } });
}

// node_modules/lit-html/directive.js
var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e5 = (t5) => (...e8) => ({ _$litDirective$: t5, values: e8 });
var i5 = class {
  constructor(t5) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t5, e8, i7) {
    this._$Ct = t5, this._$AM = e8, this._$Ci = i7;
  }
  _$AS(t5, e8) {
    return this.update(t5, e8);
  }
  update(t5, e8) {
    return this.render(...e8);
  }
};

// node_modules/lit-html/directive-helpers.js
var { H: i6 } = R;
var e6 = () => document.createComment("");
var u2 = (o7, t5, n6) => {
  var v2;
  const l4 = o7._$AA.parentNode, d2 = t5 === void 0 ? o7._$AB : t5._$AA;
  if (n6 === void 0) {
    const t6 = l4.insertBefore(e6(), d2), v3 = l4.insertBefore(e6(), d2);
    n6 = new i6(t6, v3, o7, o7.options);
  } else {
    const i7 = n6._$AB.nextSibling, t6 = n6._$AM, r4 = t6 !== o7;
    if (r4) {
      let i8;
      (v2 = n6._$AQ) === null || v2 === void 0 || v2.call(n6, o7), n6._$AM = o7, n6._$AP !== void 0 && (i8 = o7._$AU) !== t6._$AU && n6._$AP(i8);
    }
    if (i7 !== d2 || r4) {
      let o8 = n6._$AA;
      for (; o8 !== i7; ) {
        const i8 = o8.nextSibling;
        l4.insertBefore(o8, d2), o8 = i8;
      }
    }
  }
  return n6;
};
var c2 = (o7, i7, t5 = o7) => (o7._$AI(i7, t5), o7);
var f2 = {};
var s5 = (o7, i7 = f2) => o7._$AH = i7;
var a3 = (o7) => o7._$AH;
var m2 = (o7) => {
  var i7;
  (i7 = o7._$AP) === null || i7 === void 0 || i7.call(o7, false, true);
  let t5 = o7._$AA;
  const n6 = o7._$AB.nextSibling;
  for (; t5 !== n6; ) {
    const o8 = t5.nextSibling;
    t5.remove(), t5 = o8;
  }
};

// node_modules/lit-html/directives/repeat.js
var u3 = (e8, s6, t5) => {
  const r4 = /* @__PURE__ */ new Map();
  for (let l4 = s6; l4 <= t5; l4++)
    r4.set(e8[l4], l4);
  return r4;
};
var c3 = e5(class extends i5 {
  constructor(e8) {
    if (super(e8), e8.type !== t4.CHILD)
      throw Error("repeat() can only be used in text expressions");
  }
  dt(e8, s6, t5) {
    let r4;
    t5 === void 0 ? t5 = s6 : s6 !== void 0 && (r4 = s6);
    const l4 = [], o7 = [];
    let i7 = 0;
    for (const s7 of e8)
      l4[i7] = r4 ? r4(s7, i7) : i7, o7[i7] = t5(s7, i7), i7++;
    return { values: o7, keys: l4 };
  }
  render(e8, s6, t5) {
    return this.dt(e8, s6, t5).values;
  }
  update(s6, [t5, r4, c4]) {
    var d2;
    const a4 = a3(s6), { values: p2, keys: v2 } = this.dt(t5, r4, c4);
    if (!Array.isArray(a4))
      return this.ct = v2, p2;
    const h3 = (d2 = this.ct) !== null && d2 !== void 0 ? d2 : this.ct = [], m3 = [];
    let y2, x2, j = 0, k2 = a4.length - 1, w2 = 0, A2 = p2.length - 1;
    for (; j <= k2 && w2 <= A2; )
      if (a4[j] === null)
        j++;
      else if (a4[k2] === null)
        k2--;
      else if (h3[j] === v2[w2])
        m3[w2] = c2(a4[j], p2[w2]), j++, w2++;
      else if (h3[k2] === v2[A2])
        m3[A2] = c2(a4[k2], p2[A2]), k2--, A2--;
      else if (h3[j] === v2[A2])
        m3[A2] = c2(a4[j], p2[A2]), u2(s6, m3[A2 + 1], a4[j]), j++, A2--;
      else if (h3[k2] === v2[w2])
        m3[w2] = c2(a4[k2], p2[w2]), u2(s6, a4[j], a4[k2]), k2--, w2++;
      else if (y2 === void 0 && (y2 = u3(v2, w2, A2), x2 = u3(h3, j, k2)), y2.has(h3[j]))
        if (y2.has(h3[k2])) {
          const e8 = x2.get(v2[w2]), t6 = e8 !== void 0 ? a4[e8] : null;
          if (t6 === null) {
            const e9 = u2(s6, a4[j]);
            c2(e9, p2[w2]), m3[w2] = e9;
          } else
            m3[w2] = c2(t6, p2[w2]), u2(s6, a4[j], t6), a4[e8] = null;
          w2++;
        } else
          m2(a4[k2]), k2--;
      else
        m2(a4[j]), j++;
    for (; w2 <= A2; ) {
      const e8 = u2(s6, m3[A2 + 1]);
      c2(e8, p2[w2]), m3[w2++] = e8;
    }
    for (; j <= k2; ) {
      const e8 = a4[j++];
      e8 !== null && m2(e8);
    }
    return this.ct = v2, s5(s6, m3), b;
  }
});

// site/css/default/img.css
var img_default = r`:where(img, svg) {
    filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
    cursor: default;

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}
`;

// site/css/default/text.css
var text_default = r`:where(h1, h2, h3, h4, h5, h6, p) {
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
}`;

// site/ts/elements/navbar/navitem.css
var navitem_default = r`:host {
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
}`;

// site/ts/elements/navbar/navitem.ts
var NavItem = class extends s4 {
  constructor() {
    super(...arguments);
    this.pageName = "";
    this.extension = false;
    this.title = "";
    this.editing = false;
  }
  get page() {
    return {
      page: this.pageName,
      extension: this.extension
    };
  }
  UpdatePage(e8) {
    e8.preventDefault();
    Site.NavigateTo(this.page);
  }
  render() {
    this.draggable = this.editing;
    if (Site.page.page == this.page.page && Site.page.extension == this.page.extension)
      this.classList.add("selected");
    else
      this.classList.remove("selected");
    return p`
        <a href="#${this.extension ? "extension-" : ""}${this.pageName}" @click="${this.UpdatePage}" title="${this.title}">
            <slot></slot>
        </a>

        ${this.editing ? p`<img id="handle" src="images/drag.svg" draggable="false">` : T}
        `;
  }
};
NavItem.styles = [text_default, img_default, navitem_default];
__decorateClass([
  e4({ type: String })
], NavItem.prototype, "pageName", 2);
__decorateClass([
  e4({ type: Boolean })
], NavItem.prototype, "extension", 2);
__decorateClass([
  e4({ type: String })
], NavItem.prototype, "title", 2);
__decorateClass([
  e4({ type: Boolean })
], NavItem.prototype, "editing", 2);
NavItem = __decorateClass([
  n5("nav-item")
], NavItem);

// site/ts/elements/navbar/navbar.css
var navbar_default = r`:host {
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
}`;

// site/ts/elements/navbar/navbar.ts
var Navbar = class extends s4 {
  constructor() {
    super();
    this.editing = false;
    this.pages = [];
    this.icons = [];
    this.order = [];
    this.draggedNavItemIndex = 0;
    this.GetNavItem = ((order, index) => {
      let page;
      let title;
      let icon;
      let extension = false;
      if (order < Navbar.defaultPages.length)
        ({ page, title, icon } = Navbar.defaultPages[order]);
      else {
        page = this.pages[order - Navbar.defaultPages.length];
        title = this.pages[order - Navbar.defaultPages.length];
        icon = this.icons[order - Navbar.defaultPages.length];
        extension = true;
      }
      return p`
            <nav-item ?editing="${this.editing}" pageName="${page}" ?extension="${extension}" title="${title}" 
                      @dragstart="${this.SetDraggedNavItemIndex}" @dragenter="${this.ReorderNavItems}" @dragover="${(e8) => e8.preventDefault()}"
                      data-index="${index}">
                <img draggable="false" src="${icon}">
            </nav-item>
        `;
    }).bind(this);
    matchMedia("(max-aspect-ratio: 1/1)").onchange = this.ShowShadows.bind(this);
  }
  static GetNavbarOrder() {
    return JSON.parse(localStorage.getItem("Nav Order") || "[0, 1, 2, 3, 4, 5]");
  }
  static SetNavbarOrder(order) {
    localStorage.setItem("Nav Order", JSON.stringify(order));
    document.querySelector("nav-bar").requestUpdate();
  }
  SetDraggedNavItemIndex(e8) {
    let target = e8.target;
    if (!target.editing)
      return;
    if (target.dataset.index === void 0)
      return;
    this.draggedNavItemIndex = parseInt(target.dataset.index);
    if (e8.dataTransfer)
      e8.dataTransfer.effectAllowed = "copyLink";
    e8.dataTransfer?.setData("Text", target.id);
  }
  ReorderNavItems(e8) {
    let target = e8.target;
    if (!target.editing)
      return;
    if (target.dataset.index === void 0)
      return;
    let newIndex = parseInt(target.dataset.index);
    this.order.splice(newIndex, 0, this.order.splice(this.draggedNavItemIndex, 1)[0]);
    this.draggedNavItemIndex = newIndex;
    Navbar.SetNavbarOrder(this.order);
  }
  ShowShadows() {
    if (!this.shadowRoot)
      return;
    if (window.innerWidth <= window.innerHeight) {
      this.topShadow.style.display = "none";
      this.bottomShadow.style.display = "none";
      if (this.itemsContainer.scrollLeft == 0)
        this.leftShadow.style.display = "none";
      else
        this.leftShadow.style.removeProperty("display");
      if (this.itemsContainer.scrollLeft >= this.itemsContainer.scrollWidth - this.itemsContainer.clientWidth - 1)
        this.rightShadow.style.display = "none";
      else
        this.rightShadow.style.removeProperty("display");
    } else {
      this.leftShadow.style.display = "none";
      this.rightShadow.style.display = "none";
      if (this.itemsContainer.scrollTop == 0)
        this.topShadow.style.display = "none";
      else
        this.topShadow.style.removeProperty("display");
      if (this.itemsContainer.scrollTop >= this.itemsContainer.scrollHeight - this.itemsContainer.clientHeight - 1)
        this.bottomShadow.style.display = "none";
      else
        this.bottomShadow.style.removeProperty("display");
    }
  }
  createRenderRoot() {
    let root = super.createRenderRoot();
    root.addEventListener("pointerdown", () => {
      this.itemsContainer.classList.add("hover");
    });
    root.addEventListener("pointerup", () => {
      this.itemsContainer.classList.remove("hover");
    });
    return root;
  }
  firstUpdated() {
    this.itemsContainer.addEventListener("scroll", this.ShowShadows.bind(this));
  }
  updated() {
    for (let navItem of this.shadowRoot?.querySelectorAll("nav-item")) {
      navItem.requestUpdate();
    }
  }
  render() {
    this.order = Navbar.GetNavbarOrder();
    let extensions = Extensions.installedExtensions;
    for (var key of extensions.keys()) {
      this.pages.push(key);
      this.icons.push(Extensions.GetExtensionNavIconURL(extensions.get(key)));
    }
    let mobile = window.innerWidth <= window.innerHeight;
    let vmin = mobile ? window.innerWidth / 100 : window.innerHeight / 100;
    let scrollable = this.order.length * 12 * vmin > window.innerHeight;
    return p`
        <div id="items-container">
            ${c3(this.order, this.GetNavItem)}
        
            <div id="top-shadow" style="display: none"></div>
            <div id="bottom-shadow" style="${!mobile && scrollable ? "" : "display: none"}"></div>
            <div id="left-shadow" style="display: none"></div>
            <div id="right-shadow" style="${mobile && scrollable ? "" : "display: none"}"></div>
        </div>
        `;
  }
};
Navbar.styles = navbar_default;
Navbar.defaultPages = [
  {
    page: "daily-timetable",
    title: "Daily Timetable",
    icon: "images/dailytimetable.svg"
  },
  {
    page: "barcode",
    title: "ID Barcode",
    icon: "images/barcode.svg"
  },
  {
    page: "timetable",
    title: "Timetable",
    icon: "images/timetable.svg"
  },
  {
    page: "announcements",
    title: "Announcements",
    icon: "images/announcements.svg"
  },
  {
    page: "pages",
    title: "Pages Marketplace",
    icon: "images/marketplace.svg"
  },
  {
    page: "settings",
    title: "Settings",
    icon: "images/settings.svg"
  }
];
__decorateClass([
  e4({ type: Boolean })
], Navbar.prototype, "editing", 2);
__decorateClass([
  i4("#items-container", true)
], Navbar.prototype, "itemsContainer", 2);
__decorateClass([
  i4("#top-shadow", true)
], Navbar.prototype, "topShadow", 2);
__decorateClass([
  i4("#bottom-shadow", true)
], Navbar.prototype, "bottomShadow", 2);
__decorateClass([
  i4("#left-shadow", true)
], Navbar.prototype, "leftShadow", 2);
__decorateClass([
  i4("#right-shadow", true)
], Navbar.prototype, "rightShadow", 2);
Navbar = __decorateClass([
  n5("nav-bar")
], Navbar);

// site/ts/site/extensions.ts
var _Extensions = class {
  static get installedExtensions() {
    return this._installedExtensions;
  }
  static set installedExtensions(value) {
    this._installedExtensions = value;
    this.extensionOrigins = this.GetExtensionOrigins(value);
  }
  static GetExtensionOrigins(extensions) {
    let origins = [];
    for (let extension of extensions.values())
      origins.push(new URL(extension.url).origin);
    return origins;
  }
  static async HandleCommand(e8) {
    let command = e8.data.command;
    let data = e8.data.data;
    if (command == "Initialise") {
      return {
        command: "Initialise",
        data: {
          dark: Site.dark,
          hue: Site.hue,
          version: await Site.GetVersion()
        }
      };
    }
    if (command == "Get Resource") {
      let listeners = this._resourceListeners.get(data.name);
      let firstTime = false;
      if (listeners === void 0) {
        firstTime = true;
        listeners = [];
      }
      listeners.push(e8);
      this._resourceListeners.set(data.name, listeners);
      if (firstTime) {
        Resources.GetResource(data.name, (resource2) => {
          let listeners2 = this._resourceListeners.get(data.name) ?? [];
          for (let listener of listeners2) {
            listener.source?.postMessage({
              command: "Resource",
              data: {
                name: data.name,
                resource: resource2
              }
            }, {
              targetOrigin: listener.origin
            });
          }
        });
      }
      let resource = await Resources.GetResourceNow(data.name);
      return {
        command: "Resource",
        data: {
          name: data.name,
          resource
        }
      };
    }
    if (command == "Get Token") {
      let token = await Resources.GetToken();
      return {
        command: "Token",
        data: {
          token: token.token === null ? null : token.token.access_token,
          valid: token.valid
        }
      };
    }
    if (command == "Refresh Token") {
      let fetchedResources = await Resources.FetchResources();
      if (!fetchedResources)
        return {
          command: "Refreshed Token",
          data: {
            token: null,
            valid: false
          }
        };
      let token = await Resources.GetToken();
      return {
        command: "Refreshed Token",
        data: {
          token: token.token === null ? null : token.token.access_token,
          valid: token.valid
        }
      };
    }
    if (command == "Ping") {
      return {
        command: "Pong"
      };
    }
    return {
      command: "Unknown Command",
      data: {
        command
      }
    };
  }
  static async InstallExtension(extensionName) {
    let extension = (await this.GetExtensionsNow()).get(extensionName);
    if (extension) {
      this._installedExtensions.set(extensionName, extension);
      localStorage.setItem("Installed Extensions", JSON.stringify(Object.fromEntries(this._installedExtensions)));
      let order = Navbar.GetNavbarOrder();
      order.splice(order.length - 1, 0, order.length);
      Navbar.SetNavbarOrder(order);
    }
  }
  static async UninstallExtension(extensionName) {
    let installedExtensions = _Extensions.installedExtensions;
    let order = Navbar.GetNavbarOrder();
    let index = order.indexOf(Object.keys(installedExtensions).indexOf(extensionName)) + Navbar.defaultPages.length;
    let position = order.splice(index, 1)[0];
    for (let i7 = 0; i7 < order.length; i7++) {
      if (order[i7] > position) {
        order[i7]--;
      }
    }
    Navbar.SetNavbarOrder(order);
    var extensionPage = document.getElementById(`extension-${extensionName}`);
    if (extensionPage !== null)
      extensionPage.remove();
    this._installedExtensions.delete(extensionName);
    localStorage.setItem("Installed Extensions", JSON.stringify(Object.fromEntries(this._installedExtensions)));
  }
  static async GetExtensionsNow() {
    let cache = await caches.open("Metadata");
    let response = await cache.match("Metadata");
    if (!response)
      return /* @__PURE__ */ new Map();
    let extensions = new Map(Object.entries((await response.json()).pages || {}));
    return extensions;
  }
  static async GetExtensions(callback) {
    this._extensionCallbacks.AddListener(callback);
    callback(await this.GetExtensionsNow());
  }
  static async FireExtensionCallbacks() {
    let extensions = await this.GetExtensionsNow();
    this._extensionCallbacks.Invoke(extensions);
  }
  static GetExtensionIconURL(extension) {
    let url = new URL(extension.icon, extension.url);
    url.search = `cache-version=${extension.version}`;
    return url.toString();
  }
  static GetExtensionNavIconURL(extension) {
    let url = new URL(extension.navIcon, extension.url);
    url.searchParams.set("cache-version", extension.version);
    return url.toString();
  }
  static AddListeners() {
    Site.ListenForDark((dark) => {
      for (let i7 = 0; i7 < window.frames.length; i7++) {
        let frame = window.frames[i7];
        frame.postMessage({
          command: "Set Dark",
          data: {
            dark
          }
        }, "*");
      }
    });
    Site.ListenForHue((hue) => {
      for (let i7 = 0; i7 < window.frames.length; i7++) {
        let frame = window.frames[i7];
        frame.postMessage({
          command: "Set Hue",
          data: {
            hue
          }
        }, "*");
      }
    });
    window.addEventListener("message", async (e8) => {
      let origin = e8.origin;
      if (!this.extensionOrigins.includes(origin))
        return;
      e8.source?.postMessage(await this.HandleCommand(e8), {
        targetOrigin: origin
      });
    });
  }
};
var Extensions = _Extensions;
Extensions._installedExtensions = new Map(Object.entries(JSON.parse(localStorage.getItem("Installed Extensions") || "{}")));
Extensions.extensionOrigins = _Extensions.GetExtensionOrigins(_Extensions._installedExtensions);
Extensions._extensionCallbacks = new Callbacks();
Extensions._resourceListeners = /* @__PURE__ */ new Map();

// site/ts/site/site.ts
var Site = class {
  static NavigateTo(page) {
    if (page.extension) {
      let extensions = Extensions.installedExtensions;
      if (extensions.has(page.page)) {
        let newPage = document.getElementById(`extension-${page.page}`);
        if (newPage === null) {
          let extensionPage = document.createElement("extension-page");
          extensionPage.src = extensions.get(page.page).url;
          extensionPage.id = `extension-${page.page}`;
          document.querySelector("main")?.appendChild(extensionPage);
          newPage = extensionPage;
        }
        this.SetPage(page, newPage);
      }
    } else
      this.SetPage(page, document.getElementById(page.page));
  }
  static SetPage(page, element) {
    if (element) {
      if (this._pageElement != null)
        this._pageElement.classList.add("hidden");
      element.classList.remove("hidden");
      this._pageElement = element;
      this.page = page;
      location.hash = page.extension ? `extension-${page.page}` : page.page;
      let navbar = document.querySelector("nav-bar");
      navbar.removeAttribute("editing");
      navbar.requestUpdate?.();
    }
  }
  static ShowNotification(content, loader = false) {
    let notification = document.createElement("inline-notification");
    if (typeof content === "string")
      notification.innerText = content;
    else
      notification.appendChild(content);
    notification.loader = loader;
    document.getElementById("notification-area")?.appendChild(notification);
    return notification;
  }
  static SetDark(dark) {
    this.dark = dark;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("Dark", dark.toString());
    this._darkCallbacks.Invoke(dark);
  }
  static ListenForDark(callback) {
    this._darkCallbacks.AddListener(callback);
  }
  static SetHue(hue) {
    document.documentElement.style.setProperty("--main-hue", hue);
    document.documentElement.style.setProperty("--hue-rotate", `${parseFloat(hue) - 200}deg`);
    this.hue = hue;
  }
  static SaveHue() {
    localStorage.setItem("Hue", this.hue);
    this._hueCallbacks.Invoke(parseFloat(this.hue));
  }
  static ListenForHue(callback) {
    this._hueCallbacks.AddListener(callback);
  }
  static async GetVersion() {
    var cache = await caches.open("Metadata");
    let metadataResponse = await cache.match("Metadata");
    if (metadataResponse) {
      let metadata = await metadataResponse.json();
      return metadata.version;
    }
    return void 0;
  }
};
Site.page = {
  page: "",
  extension: false
};
Site.dark = localStorage.getItem("Dark") == "true";
Site.hue = localStorage.getItem("Hue") || "200";
Site._pageElement = null;
Site._darkCallbacks = new Callbacks();
Site._hueCallbacks = new Callbacks();

// site/ts/elements/page/page.ts
var Page2 = class extends s4 {
  constructor() {
    super(...arguments);
    this._state = 0 /* Waiting */;
    this._unreceivedResources = 0;
    this._uncompletedResources = 0;
  }
  AddResource(resourceName, property) {
    this._unreceivedResources++;
    this._uncompletedResources++;
    let received = false;
    let completed = false;
    Resources.GetResource(resourceName, (resource) => {
      if (!received) {
        this._unreceivedResources--;
        received = true;
      }
      if (resource !== null && resource !== void 0) {
        if (!completed) {
          this._uncompletedResources--;
          completed = true;
        }
        this[property] = resource;
      }
      if (this._uncompletedResources == 0)
        this._state = 2 /* Loaded */;
      else if (this._unreceivedResources == 0)
        this._state = 1 /* Loading */;
    });
  }
  render() {
    if (this._state == 0 /* Waiting */)
      return T;
    if (this._state == 1 /* Loading */) {
      return p`
            <loading-indicator style="width: 30.8rem; height: 100%; margin: auto;"></loading-indicator>
            <style>
                :host {
                    display: flex;
                }
            </style>
            `;
    }
    return this.renderPage();
  }
  renderPage() {
    return T;
  }
};
__decorateClass([
  t3()
], Page2.prototype, "_state", 2);

// node_modules/lit-html/directives/unsafe-html.js
var e7 = class extends i5 {
  constructor(i7) {
    if (super(i7), this.it = T, i7.type !== t4.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r4) {
    if (r4 === T || r4 == null)
      return this.vt = void 0, this.it = r4;
    if (r4 === b)
      return r4;
    if (typeof r4 != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r4 === this.it)
      return this.vt;
    this.it = r4;
    const s6 = [r4];
    return s6.raw = s6, this.vt = { _$litType$: this.constructor.resultType, strings: s6, values: [] };
  }
};
e7.directiveName = "unsafeHTML", e7.resultType = 1;
var o6 = e5(e7);

// site/ts/elements/announcements/post.css
var post_default = r`:host {
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
}`;

// site/ts/elements/announcements/post.ts
var AnnouncementPost = class extends s4 {
  render() {
    return p`
        <details>
            <summary>
                <h3>${this.title}</h3>
                <p class="info">By ${this.author} | For ${this.years}${this.meetingTime === void 0 ? "" : ` | At ${this.meetingTime}`}</p>
            </summary>

            ${o6(this.content)}
        </details>
        `;
  }
};
AnnouncementPost.styles = [text_default, post_default];
__decorateClass([
  e4()
], AnnouncementPost.prototype, "title", 2);
__decorateClass([
  e4()
], AnnouncementPost.prototype, "author", 2);
__decorateClass([
  e4()
], AnnouncementPost.prototype, "years", 2);
__decorateClass([
  e4({ type: Boolean })
], AnnouncementPost.prototype, "meeting", 2);
__decorateClass([
  e4()
], AnnouncementPost.prototype, "meetingTime", 2);
__decorateClass([
  e4()
], AnnouncementPost.prototype, "content", 2);
__decorateClass([
  e4({ type: Number })
], AnnouncementPost.prototype, "weight", 2);
AnnouncementPost = __decorateClass([
  n5("announcement-post")
], AnnouncementPost);

// site/css/default/search.css
var search_default = r`:where(input[type=search]) {
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
}`;

// site/css/default/select.css
var select_default = r`:where(select) {
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
}`;

// site/css/default/pages/full.css
var full_default = r`:host, main {
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
}`;

// site/css/default/pages/page.css
var page_default = r`:host, main {
    box-shadow: var(--shadow);
    background-color: var(--surface2);
    border-radius: 0.8rem;
}`;

// site/ts/elements/announcements/announcements.css
var announcements_default = r`:host {
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
}`;

// site/ts/elements/announcements/announcements.ts
var SchoolAnnouncements = class extends Page2 {
  constructor() {
    super();
    this.yearFilter = "all";
    this.searchFilter = "";
    this.AddResource("announcements", "announcements");
  }
  renderPage() {
    let filteredAnnouncements = this.yearFilter == "all" ? this.announcements.notices : this.announcements.notices.filter((announcement) => announcement.years.includes(this.yearFilter));
    filteredAnnouncements = this.searchFilter == "" ? filteredAnnouncements : filteredAnnouncements.filter((announcement) => announcement.title.toLowerCase().includes(this.searchFilter.toLowerCase()) || announcement.content.toLowerCase().includes(this.searchFilter.toLowerCase()));
    return p`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${(e8) => this.searchFilter = e8.target.value}">

            <select @input="${(e8) => this.yearFilter = e8.target.value}">
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
        <div class="content">${c3(filteredAnnouncements, (announcement) => p`
        <announcement-post title="${announcement.title}" content="${announcement.content}" author="${announcement.authorName}"
                           years="${announcement.displayYears}" ?meeting="${announcement.isMeeting == 1}"
                           ${announcement.meetingTime === null ? "" : `meetingTime="${announcement.meetingTime}${announcement.meetingTimeParsed === void 0 ? "" : ` (${announcement.meetingTimeParsed})`}"`}
                           weight="${announcement.relativeWeight + announcement.isMeeting}"></announcement-post>
        `)}</div>
        `;
  }
};
SchoolAnnouncements.styles = [page_default, full_default, text_default, img_default, search_default, select_default, announcements_default];
__decorateClass([
  t3()
], SchoolAnnouncements.prototype, "announcements", 2);
__decorateClass([
  t3()
], SchoolAnnouncements.prototype, "yearFilter", 2);
__decorateClass([
  t3()
], SchoolAnnouncements.prototype, "searchFilter", 2);
SchoolAnnouncements = __decorateClass([
  n5("school-announcements")
], SchoolAnnouncements);

// site/ts/elements/info/info.css
var info_default = r`:host {
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
}`;

// site/images/info.svg
var info_default2 = y`<?xml version="1.0" encoding="utf-8"?>
<svg width="210px" height="210px" viewBox="0 0 210 210" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
  <g id="Group" transform="translate(5 5)">
    <path d="M0 100C0 44.7715 44.7715 0 100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100Z" id="Ellipse" fill="none" fill-rule="evenodd" stroke="#323232" stroke-width="10" />
    <g id="" transform="translate(58 37)">
      <path d="M32.7841 86.4091L32.7841 85.7954Q32.8864 76.0284 34.8295 70.25Q36.7727 64.4716 40.3523 60.892Q43.9318 57.3125 48.9432 54.2954Q53.4432 51.5852 56.5114 47.1875Q59.5795 42.7898 59.5795 36.7045Q59.5795 29.1875 54.4915 24.7642Q49.4034 20.3409 42.1932 20.3409Q38 20.3409 34.1136 22.0795Q30.2273 23.8182 27.6193 27.5511Q25.0114 31.2841 24.6023 37.3182L11.7159 37.3182Q12.125 28.625 16.2415 22.4375Q20.358 16.25 27.1335 12.9773Q33.9091 9.70454 42.1932 9.70454Q51.1932 9.70454 57.8665 13.2841Q64.5398 16.8636 68.196 23.1023Q71.8523 29.3409 71.8523 37.3182Q71.8523 45.8068 68.0682 51.8409Q64.2841 57.875 57.5341 61.9659Q50.7841 66.1591 47.9972 71.2216Q45.2102 76.2841 45.0568 85.7954L45.0568 86.4091L32.7841 86.4091ZM39.3295 116.682Q35.5454 116.682 32.8352 113.972Q30.125 111.261 30.125 107.477Q30.125 103.693 32.8352 100.983Q35.5454 98.2727 39.3295 98.2727Q43.1136 98.2727 45.8239 100.983Q48.5341 103.693 48.5341 107.477Q48.5341 111.261 45.8239 113.972Q43.1136 116.682 39.3295 116.682Z" />
    </g>
  </g>
</svg>`;

// site/ts/elements/info/info.ts
var Info = class extends s4 {
  constructor() {
    super();
    this.HidePopup = (() => {
      this.info.style.display = "none";
      this.background.style.display = "none";
    }).bind(this);
    this.addEventListener("mouseleave", this.HidePopup);
    document.addEventListener("pointerover", this.HidePopup);
  }
  ShowPopup(e8) {
    this.info.style.removeProperty("display");
    this.background.style.removeProperty("display");
    e8.stopPropagation();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("pointerover", this.HidePopup);
  }
  render() {
    return p`
        <button @click="${this.ShowPopup}" @mouseover="${this.ShowPopup}">
            ${info_default2}
        </button>

        <slot style="display: none"></slot>

        <div class="background" style="display: none"></div>
        `;
  }
};
Info.styles = [img_default, info_default];
__decorateClass([
  i4("slot")
], Info.prototype, "info", 2);
__decorateClass([
  i4(".background")
], Info.prototype, "background", 2);
Info = __decorateClass([
  n5("info-popup")
], Info);

// site/ts/elements/barcode/barcode.css
var barcode_default = r`:host {
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
}`;

// site/ts/elements/barcode/barcode.ts
var StudentBarcode = class extends Page2 {
  constructor() {
    super();
    this.draggedElement = null;
    this.dragging = false;
    this.addEventListener("pointerdown", (e8) => e8.preventDefault());
    this.addEventListener("pointermove", this.DragPoint);
    this.addEventListener("pointerup", this.EndDrag);
    this.AddResource("userinfo", "userInfo");
    Site.ListenForDark((dark) => {
      this.barcode?.classList.toggle("outline", dark);
    });
  }
  set userInfo(value) {
    this.studentId = value.studentId;
    this.requestUpdate();
  }
  StartDrag(e8) {
    e8.preventDefault();
    this.draggedElement = e8.target;
    this.draggedElement.style.pointerEvents = "none";
    this.style.cursor = "move";
  }
  DragPoint(e8) {
    e8.preventDefault();
    if (this.draggedElement == null)
      return;
    if (!this.dragging) {
      this.dragging = true;
      this.draggedElement.style.left = `${(e8.clientX - this.offsetLeft) / this.clientWidth * 100}%`;
      this.draggedElement.style.top = `${(e8.clientY - this.offsetTop) / this.clientHeight * 100}%`;
      this.SetBarcodePosition();
      this.dragging = false;
    }
  }
  EndDrag() {
    if (this.draggedElement != null)
      this.draggedElement.style.removeProperty("pointer-events");
    this.draggedElement = null;
    this.removeAttribute("style");
    this.RenderBarcode();
  }
  SetBarcodePosition() {
    if (this.barcode === null)
      return;
    let x1 = parseFloat(this.point1?.style.left.substring(0, this.point1.style.left.length - 1) || "0");
    let y1 = parseFloat(this.point1?.style.top.substring(0, this.point1.style.top.length - 1) || "0");
    let x2 = parseFloat(this.point2?.style.left.substring(0, this.point2.style.left.length - 1) || "0");
    let y2 = parseFloat(this.point2?.style.top.substring(0, this.point2.style.top.length - 1) || "0");
    let maxX = Math.max(x1, x2);
    let minX = Math.min(x1, x2);
    let maxY = Math.max(y1, y2);
    let minY = Math.min(y1, y2);
    this.barcode.style.left = `${minX}%`;
    this.barcode.style.top = `${minY}%`;
    this.barcode.style.width = `${maxX - minX}%`;
    this.barcode.style.height = `${maxY - minY}%`;
  }
  RenderBarcode() {
    if (this.draggedElement != null)
      return;
    if (this.barcode === null || this.point1 === null || this.point2 === null)
      return;
    localStorage.setItem("Barcode Points", JSON.stringify([
      this.point1.style.left,
      this.point1.style.top,
      this.point2.style.left,
      this.point2.style.top
    ]));
    if (typeof JsBarcode === "function") {
      JsBarcode(this.barcode, this.studentId, {
        displayValue: false,
        margin: 0
      });
    }
  }
  updated() {
    this.SetBarcodePosition();
    this.RenderBarcode();
  }
  renderPage() {
    let storedPoints = localStorage.getItem("Barcode Points");
    let points = ["20%", "20%", "80%", "40%"];
    if (storedPoints)
      points = JSON.parse(storedPoints);
    return p`
        <info-popup>Use this barcode to scan in instead of your Student Card. Drag the points to resize it.</info-popup>

        <div id="point1" style="left: ${points[0]}; top: ${points[1]};" @pointerdown="${this.StartDrag}"></div>
        <div id="point2" style="left: ${points[2]}; top: ${points[3]};" @pointerdown="${this.StartDrag}"></div>

        <canvas id="barcodeDisplay" class="${Site.dark ? "outline" : ""}" style="top: 20%; left: 20%; width: 60%; height: 20%;"></canvas>
        `;
  }
};
StudentBarcode.styles = [page_default, full_default, text_default, img_default, barcode_default];
__decorateClass([
  i4("#barcodeDisplay")
], StudentBarcode.prototype, "barcode", 2);
__decorateClass([
  i4("#point1")
], StudentBarcode.prototype, "point1", 2);
__decorateClass([
  i4("#point2")
], StudentBarcode.prototype, "point2", 2);
StudentBarcode = __decorateClass([
  n5("student-barcode")
], StudentBarcode);

// site/css/default/pages/card.css
var card_default = r`:host, main {
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
}`;

// site/ts/elements/daily-timetable/daily-timetable.css
var daily_timetable_default = r`:host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.next-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
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
}`;

// site/ts/elements/daily-timetable/daily-timetable.ts
var SchoolAnnouncements2 = class extends Page2 {
  constructor() {
    super();
    this.AddResource("dailytimetable", "dailyTimetable");
  }
  renderPage() {
    return p`
            <div class="next-display">
                <p>Nothing</p>
                <p>in</p>
                <div class="timer-container">
                    <span class="line left"></span>
                    <h1 class="timer">Never</h1>
                    <span class="line right"></span>
                </div>
            </div>
        `;
  }
};
SchoolAnnouncements2.styles = [page_default, card_default, text_default, daily_timetable_default];
__decorateClass([
  t3()
], SchoolAnnouncements2.prototype, "dailyTimetable", 2);
SchoolAnnouncements2 = __decorateClass([
  n5("daily-timetable")
], SchoolAnnouncements2);

// site/ts/elements/loader/loader.css
var loader_default = r`:host {
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
}`;

// site/images/rings.svg
var rings_default = y`<?xml version="1.0" encoding="utf-8"?>
<svg width="529px" height="528px" viewBox="0 0 529 528" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <path d="M0 256C0 114.615 114.608 0 255.984 0C397.361 0 511.969 114.615 511.969 256C511.969 397.385 397.361 512 255.984 512C114.608 512 0 397.385 0 256L0 256Z" id="path_1" />
    <path d="M256.002 511.994C114.616 511.994 6.16908e-06 397.38 0 255.997C-6.19888e-06 114.614 114.616 0 256.002 0C397.387 -0.00100708 512.003 114.613 512.003 255.997C512.003 397.38 397.387 511.994 256.002 511.994L256.002 511.994Z" id="path_2" />
    <path d="M0 241.509C0 108.127 108.121 0 241.495 0C374.869 0 482.989 108.127 482.989 241.509C482.989 374.891 374.869 483.019 241.495 483.019C108.121 483.019 0 374.891 0 241.509L0 241.509Z" id="path_3" />
    <path d="M380.023 439.471C489.186 362.832 515.752 212.294 439.273 102.971C362.795 -6.35058 212.092 -32.7554 102.929 43.7218C-6.23417 120.199 -32.8002 270.738 43.6788 380.06C119.996 489.383 270.699 515.948 380.023 439.471C379.862 439.471 380.023 439.471 380.023 439.471L380.023 439.471L380.023 439.471Z" id="path_4" />
    <path d="M0 227.019C0 101.64 101.634 0 227.005 0C352.376 0 454.01 101.64 454.01 227.019C454.01 352.398 352.376 454.038 227.005 454.038C101.634 454.038 0 352.398 0 227.019L0 227.019Z" id="path_5" />
    <path d="M262.54 2.83489C138.725 -16.8081 22.4778 67.7209 2.83485 191.534C-16.808 315.347 67.7209 431.755 191.536 451.397C315.35 470.879 431.598 386.512 451.241 262.698L451.241 262.698C470.884 138.724 386.355 22.4779 262.54 2.83489L262.54 2.83489L262.54 2.83489L262.54 2.83489Z" id="path_6" />
    <path d="M0 209.308C0 93.7105 93.7048 0 209.295 0C324.886 0 418.591 93.7105 418.591 209.308C418.591 324.906 324.886 418.616 209.295 418.616C93.7048 418.616 0 324.906 0 209.308L0 209.308Z" id="path_7" />
    <path d="M209.309 0C324.908 7.62939e-06 418.619 93.7094 418.619 209.306C418.619 324.902 324.908 418.612 209.309 418.612C93.711 418.612 1.52588e-05 324.902 2.28882e-05 209.306C2.67029e-05 93.7094 93.711 0 209.309 0L209.309 0Z" id="path_8" />
    <clipPath id="mask_1">
      <use xlink:href="#path_1" />
    </clipPath>
    <clipPath id="mask_2">
      <use xlink:href="#path_2" />
    </clipPath>
    <clipPath id="mask_3">
      <use xlink:href="#path_3" />
    </clipPath>
    <clipPath id="mask_4">
      <use xlink:href="#path_4" />
    </clipPath>
    <clipPath id="mask_5">
      <use xlink:href="#path_5" />
    </clipPath>
    <clipPath id="mask_6">
      <use xlink:href="#path_6" />
    </clipPath>
    <clipPath id="mask_7">
      <use xlink:href="#path_7" />
    </clipPath>
    <clipPath id="mask_8">
      <use xlink:href="#path_8" />
    </clipPath>
  </defs>
  <g id="Rings" transform="translate(8 8)">
    <g id="Green-Solid" transform="translate(7.6293945E-05 0)">
      <g id="Mask-group">
        <path d="M0 256C0 114.615 114.608 0 255.984 0C397.361 0 511.969 114.615 511.969 256C511.969 397.385 397.361 512 255.984 512C114.608 512 0 397.385 0 256L0 256Z" id="path_2" fill="none" fill-rule="evenodd" stroke="none" />
        <g clip-path="url(#mask_1)">
          <g id="Group">
            <path d="M0 256C0 114.615 114.608 0 255.984 0C397.361 0 511.969 114.615 511.969 256C511.969 397.385 397.361 512 255.984 512C114.608 512 0 397.385 0 256L0 256Z" id="path_2" fill="none" fill-rule="evenodd" stroke="#78AFA0" stroke-width="8" stroke-dasharray="76 4 70 76 4 70" />
          </g>
        </g>
      </g>
    </g>
    <g id="Green-Transparent" transform="translate(0 0.00030517578)">
      <g id="Mask-group">
        <path d="M256.002 511.994C114.616 511.994 6.16908e-06 397.38 0 255.997C-6.19888e-06 114.614 114.616 0 256.002 0C397.387 -0.00100708 512.003 114.613 512.003 255.997C512.003 397.38 397.387 511.994 256.002 511.994L256.002 511.994Z" id="path_3" fill="none" fill-rule="evenodd" stroke="none" />
        <g clip-path="url(#mask_2)">
          <g id="Group">
            <path d="M256.002 511.994C114.616 511.994 6.16908e-06 397.38 0 255.997C-6.19888e-06 114.614 114.616 0 256.002 0C397.387 -0.00100708 512.003 114.613 512.003 255.997C512.003 397.38 397.387 511.994 256.002 511.994L256.002 511.994Z" id="path_3" fill="none" fill-rule="evenodd" stroke="#78AFA0" stroke-opacity="0.2784314" stroke-width="8" stroke-dasharray="46 2 12 46 2 12" />
          </g>
        </g>
      </g>
    </g>
    <g id="Yellow-Solid" transform="translate(14.489731 14.490631)">
      <g id="Mask-group">
        <path d="M0 241.509C0 108.127 108.121 0 241.495 0C374.869 0 482.989 108.127 482.989 241.509C482.989 374.891 374.869 483.019 241.495 483.019C108.121 483.019 0 374.891 0 241.509L0 241.509Z" id="path_4" fill="none" fill-rule="evenodd" stroke="none" />
        <g clip-path="url(#mask_3)">
          <g id="Group">
            <path d="M0 241.509C0 108.127 108.121 0 241.495 0C374.869 0 482.989 108.127 482.989 241.509C482.989 374.891 374.869 483.019 241.495 483.019C108.121 483.019 0 374.891 0 241.509L0 241.509Z" id="path_4" fill="none" fill-rule="evenodd" stroke="#DDA131" stroke-width="16" stroke-dasharray="76 2 40 180" />
          </g>
        </g>
      </g>
    </g>
    <g id="Yellow-Transparent" transform="translate(14.498611 14.347076)">
      <g id="Mask-group">
        <path d="M380.023 439.471C489.186 362.832 515.752 212.294 439.273 102.971C362.795 -6.35058 212.092 -32.7554 102.929 43.7218C-6.23417 120.199 -32.8002 270.738 43.6788 380.06C119.996 489.383 270.699 515.948 380.023 439.471C379.862 439.471 380.023 439.471 380.023 439.471L380.023 439.471L380.023 439.471Z" id="path_5" fill="none" fill-rule="evenodd" stroke="none" />
        <g clip-path="url(#mask_4)">
          <g id="Group">
            <path d="M380.023 439.471C489.186 362.832 515.752 212.294 439.273 102.971C362.795 -6.35058 212.092 -32.7554 102.929 43.7218C-6.23417 120.199 -32.8002 270.738 43.6788 380.06C119.996 489.383 270.699 515.948 380.023 439.471C379.862 439.471 380.023 439.471 380.023 439.471L380.023 439.471L380.023 439.471Z" id="path_5" fill="none" fill-rule="evenodd" stroke="#DDA131" stroke-opacity="0.6901961" stroke-width="16" stroke-dasharray="56 2 4 56 2 4" />
          </g>
        </g>
      </g>
    </g>
    <g id="Orange-Solid" transform="translate(28.979431 28.98117)">
      <g id="Mask-group">
        <path d="M0 227.019C0 101.64 101.634 0 227.005 0C352.376 0 454.01 101.64 454.01 227.019C454.01 352.398 352.376 454.038 227.005 454.038C101.634 454.038 0 352.398 0 227.019L0 227.019Z" id="path_6" fill="none" fill-rule="evenodd" stroke="none" />
        <g clip-path="url(#mask_5)">
          <g id="Group">
            <path d="M0 227.019C0 101.64 101.634 0 227.005 0C352.376 0 454.01 101.64 454.01 227.019C454.01 352.398 352.376 454.038 227.005 454.038C101.634 454.038 0 352.398 0 227.019L0 227.019Z" id="path_6" fill="none" fill-rule="evenodd" stroke="#D36F2B" stroke-width="8" stroke-dasharray="51 4 10 80" />
          </g>
        </g>
      </g>
    </g>
    <g id="Orange-Transparent" transform="translate(28.98436 28.81987)">
      <g id="Mask-group">
        <path d="M262.54 2.83489C138.725 -16.8081 22.4778 67.7209 2.83485 191.534C-16.808 315.347 67.7209 431.755 191.536 451.397C315.35 470.879 431.598 386.512 451.241 262.698L451.241 262.698C470.884 138.724 386.355 22.4779 262.54 2.83489L262.54 2.83489L262.54 2.83489L262.54 2.83489Z" id="path_7" fill="none" fill-rule="evenodd" stroke="none" />
        <g clip-path="url(#mask_6)">
          <g id="Group">
            <path d="M262.54 2.83489C138.725 -16.8081 22.4778 67.7209 2.83485 191.534C-16.808 315.347 67.7209 431.755 191.536 451.397C315.35 470.879 431.598 386.512 451.241 262.698L451.241 262.698C470.884 138.724 386.355 22.4779 262.54 2.83489L262.54 2.83489L262.54 2.83489L262.54 2.83489Z" id="path_7" fill="none" fill-rule="evenodd" stroke="#D36F2B" stroke-opacity="0.4392157" stroke-width="8" stroke-dasharray="140 4 10 80" />
          </g>
        </g>
      </g>
    </g>
    <g id="Red-Solid" transform="translate(46.68904 46.691833)">
      <g id="Mask-group">
        <path d="M0 209.308C0 93.7105 93.7048 0 209.295 0C324.886 0 418.591 93.7105 418.591 209.308C418.591 324.906 324.886 418.616 209.295 418.616C93.7048 418.616 0 324.906 0 209.308L0 209.308Z" id="path_8" fill="none" fill-rule="evenodd" stroke="none" />
        <g clip-path="url(#mask_7)">
          <g id="Group">
            <path d="M0 209.308C0 93.7105 93.7048 0 209.295 0C324.886 0 418.591 93.7105 418.591 209.308C418.591 324.906 324.886 418.616 209.295 418.616C93.7048 418.616 0 324.906 0 209.308L0 209.308Z" id="path_8" fill="none" fill-rule="evenodd" stroke="#C24127" stroke-width="4" stroke-dasharray="35 7 10 80" />
          </g>
        </g>
      </g>
    </g>
    <g id="Red-Transparent" transform="translate(46.691147 46.691635)">
      <g id="Mask-group">
        <path d="M209.309 0C324.908 7.62939e-06 418.619 93.7094 418.619 209.306C418.619 324.902 324.908 418.612 209.309 418.612C93.711 418.612 1.52588e-05 324.902 2.28882e-05 209.306C2.67029e-05 93.7094 93.711 0 209.309 0L209.309 0Z" id="path_9" fill="none" fill-rule="evenodd" stroke="none" />
        <g clip-path="url(#mask_8)">
          <g id="Group">
            <path d="M209.309 0C324.908 7.62939e-06 418.619 93.7094 418.619 209.306C418.619 324.902 324.908 418.612 209.309 418.612C93.711 418.612 1.52588e-05 324.902 2.28882e-05 209.306C2.67029e-05 93.7094 93.711 0 209.309 0L209.309 0Z" id="path_9" fill="none" fill-rule="evenodd" stroke="#C24127" stroke-opacity="0.2784314" stroke-width="4" stroke-dasharray="35 7 10 80" />
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>`;

// site/ts/elements/loader/loader.ts
var LoadingIndicator = class extends s4 {
  render() {
    return rings_default;
  }
};
LoadingIndicator.styles = loader_default;
LoadingIndicator = __decorateClass([
  n5("loading-indicator")
], LoadingIndicator);

// site/ts/elements/extensions/extensions.css
var extensions_default = r`:host {
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
}`;

// site/ts/elements/extensions/extensions.ts
var ExtensionPage = class extends s4 {
  constructor() {
    super(...arguments);
    this.src = "";
  }
  StopLoading() {
    this.loader.remove();
    this.frame.removeAttribute("style");
  }
  render() {
    return p`
        <iframe @load="${this.StopLoading}" src="${this.src}" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" style="display: none"></iframe>
        <loading-indicator></loading-indicator>
        `;
  }
};
ExtensionPage.styles = extensions_default;
__decorateClass([
  e4({ type: String })
], ExtensionPage.prototype, "src", 2);
__decorateClass([
  i4("iframe", true)
], ExtensionPage.prototype, "frame", 2);
__decorateClass([
  i4("loading-indicator", true)
], ExtensionPage.prototype, "loader", 2);
ExtensionPage = __decorateClass([
  n5("extension-page")
], ExtensionPage);

// site/css/default/button.css
var button_default = r`a.button {
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
}`;

// site/ts/elements/extensions-marketplace/extension-display.css
var extension_display_default = r`:host {
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
}`;

// site/ts/elements/extensions-marketplace/extension-display.ts
var ExtensionDisplay = class extends s4 {
  async Install() {
    await Extensions.InstallExtension(this.title);
    document.getElementById("pages").requestUpdate();
  }
  async Uninstall() {
    await Extensions.UninstallExtension(this.title);
    document.getElementById("pages").requestUpdate();
  }
  render() {
    return p`
        <img src="${this.img}">
        
        <div class="content">
            <h4>${this.title}</h4>
            <p>${this.description}</p>

            <button @click="${this.installed ? this.Uninstall : this.Install}">${this.installed ? "Uninstall" : "Install"}</button>
        </div>
        `;
  }
};
ExtensionDisplay.styles = [text_default, button_default, extension_display_default];
__decorateClass([
  e4()
], ExtensionDisplay.prototype, "title", 2);
__decorateClass([
  e4()
], ExtensionDisplay.prototype, "img", 2);
__decorateClass([
  e4()
], ExtensionDisplay.prototype, "description", 2);
__decorateClass([
  e4({ type: Boolean })
], ExtensionDisplay.prototype, "installed", 2);
ExtensionDisplay = __decorateClass([
  n5("extension-display")
], ExtensionDisplay);

// site/ts/elements/extensions-marketplace/extensions-marketplace.css
var extensions_marketplace_default = r`:host {
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
}`;

// site/ts/elements/extensions-marketplace/extensions-marketplace.ts
var ExtensionsMarketplace = class extends s4 {
  constructor() {
    super();
    this.fetchingExtensions = true;
    this.extensions = /* @__PURE__ */ new Map();
    Extensions.GetExtensions((extensions) => {
      this.fetchingExtensions = false;
      this.extensions = extensions;
    });
  }
  render() {
    let installedExtensions = Extensions.installedExtensions;
    let installedExtensionNames = [];
    for (var key of installedExtensions.keys())
      installedExtensionNames.push(key);
    return p`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${(e8) => this.searchFilter = e8.target.value}">
            <input type="checkbox">
        </div>

        ${this.fetchingExtensions ? T : p`
        <!--The ugliest code ever written, but the div tags for .content need to be where they are, or the :empty selector won't work-->
        <div class="content">${c3(this.extensions.keys(), (extensionName) => p`
        <extension-display title="${extensionName}" img="${Extensions.GetExtensionIconURL(this.extensions.get(extensionName))}"
                           description="${this.extensions.get(extensionName).description}"
                           ?installed="${installedExtensionNames.includes(extensionName)}"></extension-display>
        `)}</div>
        `}
        `;
  }
};
ExtensionsMarketplace.styles = [page_default, full_default, text_default, search_default, extensions_marketplace_default];
__decorateClass([
  t3()
], ExtensionsMarketplace.prototype, "extensions", 2);
ExtensionsMarketplace = __decorateClass([
  n5("extensions-marketplace")
], ExtensionsMarketplace);

// site/ts/elements/notification/notification.css
var notification_default = r`:host {
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
}`;

// site/images/cross.svg
var cross_default = y`<?xml version="1.0" encoding="utf-8"?>
<svg width="220px" height="220px" viewBox="0 0 220 220" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
  <g id="Cross" transform="translate(5 5)">
    <path d="M0 0L210 210" id="Line" fill="none" fill-rule="evenodd" stroke="#323232" stroke-width="10" stroke-linecap="round" />
    <path d="M210 0L0 210" id="Line-2" fill="none" fill-rule="evenodd" stroke="#323232" stroke-width="10" stroke-linecap="round" />
  </g>
</svg>`;

// site/ts/elements/notification/notification.ts
var InlineNotification = class extends s4 {
  render() {
    return p`
        <slot></slot>
        ${this.loader ? p`
        <loading-indicator class="indicator"></loading-indicator>` : p`
        <button class="indicator"  @click="${this.remove}" title="Close">
            ${cross_default}
        </button>`}
        `;
  }
};
InlineNotification.styles = [img_default, notification_default];
__decorateClass([
  e4({ type: Boolean })
], InlineNotification.prototype, "loader", 2);
InlineNotification = __decorateClass([
  n5("inline-notification")
], InlineNotification);

// site/css/default/range.css
var range_default = r`:where(input[type=range]) {
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
}`;

// site/ts/elements/settings/settings.css
var settings_default = r`:host {
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
}`;

// site/ts/elements/settings/settings.ts
var Settings = class extends s4 {
  constructor() {
    super();
    this.version = "0.0.0";
    Site.GetVersion().then((version) => this.version = version);
  }
  Patch() {
  }
  ResetColour() {
    this.hueInput.value = "200";
    Site.SetHue("200");
    Site.SaveHue();
  }
  ToggleDark(e8) {
    let darkCheckbox = e8.target;
    Site.SetDark(darkCheckbox.checked);
    this.requestUpdate();
  }
  ToggleEditNavbar() {
    let navbar = document.querySelector("nav-bar");
    if (navbar) {
      navbar.toggleAttribute("editing");
    }
  }
  render() {
    return p`
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

        <input type="range" id="hue" min="0" max="359" value="${Site.hue}"
               @input="${(e8) => Site.SetHue(e8.target.value)}"
               @change="${Site.SaveHue.bind(Site)}">

        <span></span>

        <p>${Site.dark ? "Dark" : "Light"} Mode</p>

        <input type="checkbox" ?checked="${Site.dark}" id="toggle" class="button" title="Turn on ${Site.dark ? "Light" : "Dark"} Mode" @input="${this.ToggleDark}">
        
        <span></span>

        <p>Sidebar</p>

        <button @click="${this.ToggleEditNavbar}">Edit</button>
        `;
  }
};
Settings.styles = [text_default, img_default, button_default, range_default, card_default, page_default, settings_default];
__decorateClass([
  i4("#hue", true)
], Settings.prototype, "hueInput", 2);
__decorateClass([
  t3()
], Settings.prototype, "version", 2);
Settings = __decorateClass([
  n5("user-settings")
], Settings);

// site/ts/elements/timetable/timetable-period.css
var timetable_period_default = r`:host {
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
}`;

// site/ts/elements/timetable/timetable-period.ts
var TimetablePeriod = class extends s4 {
  static highlight(name) {
    this.highlighted = name;
    for (let instance of this.instances)
      instance.requestUpdate();
  }
  constructor() {
    super();
    TimetablePeriod.instances.push(this);
  }
  Highlight() {
    TimetablePeriod.highlight(this.name);
    this.classList.add("highlighted");
  }
  Unhighlight() {
    TimetablePeriod.highlight("");
    this.classList.remove("highlighted");
  }
  firstUpdated() {
    if (this.name) {
      this.tabIndex = 0;
      this.addEventListener("mouseover", this.Highlight);
      this.addEventListener("mouseleave", this.Unhighlight);
      this.addEventListener("click", this.Highlight);
      this.addEventListener("focus", this.Highlight);
      this.addEventListener("blur", this.Unhighlight);
    }
  }
  render() {
    let highlighted = TimetablePeriod.highlighted == this.name && this.name;
    if (highlighted) {
      let nextSibling = this.nextElementSibling;
      let nextNextSibling = nextSibling?.nextElementSibling;
      let displayPopupTop = nextSibling?.getAttribute("name") == this.name || nextNextSibling?.getAttribute("name") == this.name;
      return p`
            <p class="highlighted">${this.name}</p>
            <p id="popup"
                ?reversed="${displayPopupTop}">
                ${this.room}
            </p>
            `;
    } else
      return p`<p>${this.name}</p>`;
  }
};
TimetablePeriod.styles = [text_default, timetable_period_default];
TimetablePeriod.instances = [];
__decorateClass([
  e4()
], TimetablePeriod.prototype, "name", 2);
__decorateClass([
  e4()
], TimetablePeriod.prototype, "room", 2);
TimetablePeriod = __decorateClass([
  n5("timetable-period")
], TimetablePeriod);

// site/ts/elements/timetable/timetable-day.css
var timetable_day_default = r`:host {
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
}`;

// site/ts/elements/timetable/timetable-day.ts
var TimetableDay = class extends s4 {
  render() {
    return p`
            <p class="name ${this.day == this.name ? "highlighted" : ""}">${this.name}</p>
            
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
        `;
  }
};
TimetableDay.styles = [text_default, timetable_day_default];
__decorateClass([
  e4()
], TimetableDay.prototype, "name", 2);
__decorateClass([
  e4({ type: Array })
], TimetableDay.prototype, "periods", 2);
__decorateClass([
  e4()
], TimetableDay.prototype, "day", 2);
TimetableDay = __decorateClass([
  n5("timetable-day")
], TimetableDay);

// site/ts/elements/timetable/timetable-row.css
var timetable_row_default = r`:host {
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
}`;

// site/ts/elements/timetable/timetable-row.ts
var TimetableRow = class extends s4 {
  render() {
    return p`
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
        `;
  }
};
TimetableRow.styles = [text_default, timetable_row_default];
__decorateClass([
  e4()
], TimetableRow.prototype, "week", 2);
__decorateClass([
  e4({ type: Object })
], TimetableRow.prototype, "day1", 2);
__decorateClass([
  e4({ type: Object })
], TimetableRow.prototype, "day2", 2);
__decorateClass([
  e4({ type: Object })
], TimetableRow.prototype, "day3", 2);
__decorateClass([
  e4({ type: Object })
], TimetableRow.prototype, "day4", 2);
__decorateClass([
  e4({ type: Object })
], TimetableRow.prototype, "day5", 2);
__decorateClass([
  e4()
], TimetableRow.prototype, "day", 2);
TimetableRow = __decorateClass([
  n5("timetable-row")
], TimetableRow);

// site/ts/elements/timetable/timetable.css
var timetable_default = r`:host {
    margin: auto;
    padding: calc((100vw - 23rem) / 2);
    max-width: 92%;
    width: 23rem;
    height: 29rem;
}

@media (max-aspect-ratio: 3/4) {
    :host {
        height: calc(29rem + 7.5vmax);
    }
}

/* We use 26.2rem because that is the full width of the timetable including padding. */
@media (max-width: 26.2rem) {
    :host {
        padding: calc((100vw - 23rem) / 2);
    }
}

timetable-row + timetable-row {
    border-top: solid grey 0.05rem;
}`;

// site/ts/elements/timetable/timetable.ts
var FullTimetable = class extends Page2 {
  set dailyTimetable(value) {
    this._day = value.timetable.timetable.dayname;
  }
  ClearHighlight() {
    TimetablePeriod.highlight("");
  }
  constructor() {
    super();
    this.AddResource("timetable", "timetable");
    this.AddResource("dailytimetable", "dailyTimetable");
    this.addEventListener("pointerover", (e8) => e8.stopPropagation());
    document.addEventListener("pointerover", this.ClearHighlight);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("pointerover", this.ClearHighlight);
  }
  renderPage() {
    this._day = this._day.slice(0, 3).toUpperCase() + " " + this._day.slice(-1);
    return p`
            <timetable-row week="A"
                           .day1="${this.timetable.days["1"]}"
                           .day2="${this.timetable.days["2"]}"
                           .day3="${this.timetable.days["3"]}"
                           .day4="${this.timetable.days["4"]}"
                           .day5="${this.timetable.days["5"]}"
                           day="${this._day}">
            </timetable-row>
            <timetable-row week="B"
                           .day1="${this.timetable.days["6"]}"
                           .day2="${this.timetable.days["7"]}"
                           .day3="${this.timetable.days["8"]}"
                           .day4="${this.timetable.days["9"]}"
                           .day5="${this.timetable.days["10"]}"
                           day="${this._day}">
            </timetable-row>
            <timetable-row week="C"
                           .day1="${this.timetable.days["11"]}"
                           .day2="${this.timetable.days["12"]}"
                           .day3="${this.timetable.days["13"]}"
                           .day4="${this.timetable.days["14"]}"
                           .day5="${this.timetable.days["15"]}"
                           day="${this._day}">
            </timetable-row>
        `;
  }
};
FullTimetable.styles = [page_default, timetable_default];
__decorateClass([
  t3()
], FullTimetable.prototype, "timetable", 2);
__decorateClass([
  t3()
], FullTimetable.prototype, "_day", 2);
FullTimetable = __decorateClass([
  n5("full-timetable")
], FullTimetable);

// site/ts/index.ts
Main();
async function Main() {
  if (location.hash) {
    NavigateToHash(location.hash);
  } else {
    Site.NavigateTo({
      page: document.querySelector("main").children[0].id,
      extension: false
    });
  }
  Extensions.AddListeners();
  window.addEventListener("hashchange", () => {
    if (location.hash) {
      NavigateToHash(location.hash);
    }
  });
  var registration = await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");
  if (registration)
    await registration.update();
  else
    await navigator.serviceWorker.register("dist/service-worker/service-worker.js", {
      scope: "/"
    });
  let lastReloadedText = sessionStorage.getItem("Last Reloaded");
  let resourceNotification = ShowResourceNotification();
  if (lastReloadedText) {
    let lastReloaded = new Date(lastReloadedText);
    if (new Date().getTime() - lastReloaded.getTime() > "3600") {
      Resources.FetchResources().then(resourceNotification.remove.bind(resourceNotification));
      sessionStorage.setItem("Last Refreshed", new Date().toISOString());
    }
  } else
    Resources.FetchResources().then(resourceNotification.remove.bind(resourceNotification));
  var registration = await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");
  if (registration)
    await registration.update();
  else
    await navigator.serviceWorker.register("dist/service-worker/service-worker.js", {
      scope: "/"
    });
  navigator.serviceWorker.addEventListener("message", (e8) => {
    if (e8.data.command == "metadata-fetched") {
      Extensions.FireExtensionCallbacks();
    }
  });
  let serviceWorker = await navigator.serviceWorker.ready;
  if (serviceWorker.periodicSync) {
    let tags = await serviceWorker.periodicSync.getTags();
    if (!tags.includes("metadata-fetch")) {
      try {
        await serviceWorker.periodicSync.register("metadata-fetch", {
          minInterval: "2592000000"
        });
      } catch (e8) {
        console.log("Couldn't register background fetch. Updates will be only occur when app is open.");
      }
    }
  } else
    console.log("Couldn't register background fetch. Updates will be only occur when app is open.");
  navigator.serviceWorker.controller?.postMessage({ command: "metadata-fetch" });
}
function NavigateToHash(hash) {
  let extension = hash.indexOf("extension-") == 1;
  let page = "";
  if (extension) {
    page = decodeURIComponent(hash.substring(11));
  } else {
    page = decodeURIComponent(hash.substring(1));
  }
  Site.NavigateTo({
    page,
    extension
  });
}
function ShowResourceNotification() {
  return Site.ShowNotification("Updating resources...", true);
}
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
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
