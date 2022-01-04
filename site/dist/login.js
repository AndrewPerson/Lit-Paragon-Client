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
      promises.push(cache.put(name, new Response(resource)).then(() => {
        for (let callback of this._resourceCallbacks.get(name) ?? [])
          callback(JSON.parse(resource));
      }));
    });
    await Promise.all(promises);
  }
  static async SetResource(name, resource) {
    let cache = await caches.open("User Resources");
    await cache.put(name, new Response(resource));
    for (let callback of this._resourceCallbacks.get(name) ?? [])
      callback(JSON.parse(resource));
  }
  static async GetResource(name, callback) {
    let callbacks = this._resourceCallbacks.get(name) ?? [];
    callbacks.push(callback);
    this._resourceCallbacks.set(name, callbacks);
    let cache = await caches.open("User Resources");
    let response = await cache.match(name);
    if (response) {
      let resource = await response.json();
      callback(resource);
    } else
      callback(void 0);
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

// node_modules/@lit/reactive-element/css-tag.js
var t = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var e = Symbol();
var n = /* @__PURE__ */ new Map();
var s = class {
  constructor(t4, n6) {
    if (this._$cssResult$ = true, n6 !== e)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t4;
  }
  get styleSheet() {
    let e7 = n.get(this.cssText);
    return t && e7 === void 0 && (n.set(this.cssText, e7 = new CSSStyleSheet()), e7.replaceSync(this.cssText)), e7;
  }
  toString() {
    return this.cssText;
  }
};
var o = (t4) => new s(typeof t4 == "string" ? t4 : t4 + "", e);
var r = (t4, ...n6) => {
  const o6 = t4.length === 1 ? t4[0] : n6.reduce((e7, n7, s6) => e7 + ((t5) => {
    if (t5._$cssResult$ === true)
      return t5.cssText;
    if (typeof t5 == "number")
      return t5;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n7) + t4[s6 + 1], t4[0]);
  return new s(o6, e);
};
var i = (e7, n6) => {
  t ? e7.adoptedStyleSheets = n6.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet) : n6.forEach((t4) => {
    const n7 = document.createElement("style"), s6 = window.litNonce;
    s6 !== void 0 && n7.setAttribute("nonce", s6), n7.textContent = t4.cssText, e7.appendChild(n7);
  });
};
var S = t ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
  let e7 = "";
  for (const n6 of t5.cssRules)
    e7 += n6.cssText;
  return o(e7);
})(t4) : t4;

// node_modules/@lit/reactive-element/reactive-element.js
var s2;
var e2 = window.trustedTypes;
var r2 = e2 ? e2.emptyScript : "";
var h = window.reactiveElementPolyfillSupport;
var o2 = { toAttribute(t4, i7) {
  switch (i7) {
    case Boolean:
      t4 = t4 ? r2 : null;
      break;
    case Object:
    case Array:
      t4 = t4 == null ? t4 : JSON.stringify(t4);
  }
  return t4;
}, fromAttribute(t4, i7) {
  let s6 = t4;
  switch (i7) {
    case Boolean:
      s6 = t4 !== null;
      break;
    case Number:
      s6 = t4 === null ? null : Number(t4);
      break;
    case Object:
    case Array:
      try {
        s6 = JSON.parse(t4);
      } catch (t5) {
        s6 = null;
      }
  }
  return s6;
} };
var n2 = (t4, i7) => i7 !== t4 && (i7 == i7 || t4 == t4);
var l = { attribute: true, type: String, converter: o2, reflect: false, hasChanged: n2 };
var a = class extends HTMLElement {
  constructor() {
    super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
  }
  static addInitializer(t4) {
    var i7;
    (i7 = this.l) !== null && i7 !== void 0 || (this.l = []), this.l.push(t4);
  }
  static get observedAttributes() {
    this.finalize();
    const t4 = [];
    return this.elementProperties.forEach((i7, s6) => {
      const e7 = this._$Eh(s6, i7);
      e7 !== void 0 && (this._$Eu.set(e7, s6), t4.push(e7));
    }), t4;
  }
  static createProperty(t4, i7 = l) {
    if (i7.state && (i7.attribute = false), this.finalize(), this.elementProperties.set(t4, i7), !i7.noAccessor && !this.prototype.hasOwnProperty(t4)) {
      const s6 = typeof t4 == "symbol" ? Symbol() : "__" + t4, e7 = this.getPropertyDescriptor(t4, s6, i7);
      e7 !== void 0 && Object.defineProperty(this.prototype, t4, e7);
    }
  }
  static getPropertyDescriptor(t4, i7, s6) {
    return { get() {
      return this[i7];
    }, set(e7) {
      const r4 = this[t4];
      this[i7] = e7, this.requestUpdate(t4, r4, s6);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t4) {
    return this.elementProperties.get(t4) || l;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t4 = Object.getPrototypeOf(this);
    if (t4.finalize(), this.elementProperties = new Map(t4.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t5 = this.properties, i7 = [...Object.getOwnPropertyNames(t5), ...Object.getOwnPropertySymbols(t5)];
      for (const s6 of i7)
        this.createProperty(s6, t5[s6]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i7) {
    const s6 = [];
    if (Array.isArray(i7)) {
      const e7 = new Set(i7.flat(1 / 0).reverse());
      for (const i8 of e7)
        s6.unshift(S(i8));
    } else
      i7 !== void 0 && s6.push(S(i7));
    return s6;
  }
  static _$Eh(t4, i7) {
    const s6 = i7.attribute;
    return s6 === false ? void 0 : typeof s6 == "string" ? s6 : typeof t4 == "string" ? t4.toLowerCase() : void 0;
  }
  o() {
    var t4;
    this._$Ep = new Promise((t5) => this.enableUpdating = t5), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t4 = this.constructor.l) === null || t4 === void 0 || t4.forEach((t5) => t5(this));
  }
  addController(t4) {
    var i7, s6;
    ((i7 = this._$Eg) !== null && i7 !== void 0 ? i7 : this._$Eg = []).push(t4), this.renderRoot !== void 0 && this.isConnected && ((s6 = t4.hostConnected) === null || s6 === void 0 || s6.call(t4));
  }
  removeController(t4) {
    var i7;
    (i7 = this._$Eg) === null || i7 === void 0 || i7.splice(this._$Eg.indexOf(t4) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t4, i7) => {
      this.hasOwnProperty(i7) && (this._$Et.set(i7, this[i7]), delete this[i7]);
    });
  }
  createRenderRoot() {
    var t4;
    const s6 = (t4 = this.shadowRoot) !== null && t4 !== void 0 ? t4 : this.attachShadow(this.constructor.shadowRootOptions);
    return i(s6, this.constructor.elementStyles), s6;
  }
  connectedCallback() {
    var t4;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t4 = this._$Eg) === null || t4 === void 0 || t4.forEach((t5) => {
      var i7;
      return (i7 = t5.hostConnected) === null || i7 === void 0 ? void 0 : i7.call(t5);
    });
  }
  enableUpdating(t4) {
  }
  disconnectedCallback() {
    var t4;
    (t4 = this._$Eg) === null || t4 === void 0 || t4.forEach((t5) => {
      var i7;
      return (i7 = t5.hostDisconnected) === null || i7 === void 0 ? void 0 : i7.call(t5);
    });
  }
  attributeChangedCallback(t4, i7, s6) {
    this._$AK(t4, s6);
  }
  _$ES(t4, i7, s6 = l) {
    var e7, r4;
    const h3 = this.constructor._$Eh(t4, s6);
    if (h3 !== void 0 && s6.reflect === true) {
      const n6 = ((r4 = (e7 = s6.converter) === null || e7 === void 0 ? void 0 : e7.toAttribute) !== null && r4 !== void 0 ? r4 : o2.toAttribute)(i7, s6.type);
      this._$Ei = t4, n6 == null ? this.removeAttribute(h3) : this.setAttribute(h3, n6), this._$Ei = null;
    }
  }
  _$AK(t4, i7) {
    var s6, e7, r4;
    const h3 = this.constructor, n6 = h3._$Eu.get(t4);
    if (n6 !== void 0 && this._$Ei !== n6) {
      const t5 = h3.getPropertyOptions(n6), l4 = t5.converter, a4 = (r4 = (e7 = (s6 = l4) === null || s6 === void 0 ? void 0 : s6.fromAttribute) !== null && e7 !== void 0 ? e7 : typeof l4 == "function" ? l4 : null) !== null && r4 !== void 0 ? r4 : o2.fromAttribute;
      this._$Ei = n6, this[n6] = a4(i7, t5.type), this._$Ei = null;
    }
  }
  requestUpdate(t4, i7, s6) {
    let e7 = true;
    t4 !== void 0 && (((s6 = s6 || this.constructor.getPropertyOptions(t4)).hasChanged || n2)(this[t4], i7) ? (this._$AL.has(t4) || this._$AL.set(t4, i7), s6.reflect === true && this._$Ei !== t4 && (this._$E_ === void 0 && (this._$E_ = /* @__PURE__ */ new Map()), this._$E_.set(t4, s6))) : e7 = false), !this.isUpdatePending && e7 && (this._$Ep = this._$EC());
  }
  async _$EC() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t5) {
      Promise.reject(t5);
    }
    const t4 = this.scheduleUpdate();
    return t4 != null && await t4, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t4;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t5, i8) => this[i8] = t5), this._$Et = void 0);
    let i7 = false;
    const s6 = this._$AL;
    try {
      i7 = this.shouldUpdate(s6), i7 ? (this.willUpdate(s6), (t4 = this._$Eg) === null || t4 === void 0 || t4.forEach((t5) => {
        var i8;
        return (i8 = t5.hostUpdate) === null || i8 === void 0 ? void 0 : i8.call(t5);
      }), this.update(s6)) : this._$EU();
    } catch (t5) {
      throw i7 = false, this._$EU(), t5;
    }
    i7 && this._$AE(s6);
  }
  willUpdate(t4) {
  }
  _$AE(t4) {
    var i7;
    (i7 = this._$Eg) === null || i7 === void 0 || i7.forEach((t5) => {
      var i8;
      return (i8 = t5.hostUpdated) === null || i8 === void 0 ? void 0 : i8.call(t5);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
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
  shouldUpdate(t4) {
    return true;
  }
  update(t4) {
    this._$E_ !== void 0 && (this._$E_.forEach((t5, i7) => this._$ES(i7, this[i7], t5)), this._$E_ = void 0), this._$EU();
  }
  updated(t4) {
  }
  firstUpdated(t4) {
  }
};
a.finalized = true, a.elementProperties = /* @__PURE__ */ new Map(), a.elementStyles = [], a.shadowRootOptions = { mode: "open" }, h == null || h({ ReactiveElement: a }), ((s2 = globalThis.reactiveElementVersions) !== null && s2 !== void 0 ? s2 : globalThis.reactiveElementVersions = []).push("1.0.2");

// node_modules/lit-html/lit-html.js
var t2;
var i2 = globalThis.trustedTypes;
var s3 = i2 ? i2.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
var e3 = `lit$${(Math.random() + "").slice(9)}$`;
var o3 = "?" + e3;
var n3 = `<${o3}>`;
var l2 = document;
var h2 = (t4 = "") => l2.createComment(t4);
var r3 = (t4) => t4 === null || typeof t4 != "object" && typeof t4 != "function";
var d = Array.isArray;
var u = (t4) => {
  var i7;
  return d(t4) || typeof ((i7 = t4) === null || i7 === void 0 ? void 0 : i7[Symbol.iterator]) == "function";
};
var c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var a2 = />/g;
var f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
var _ = /'/g;
var m = /"/g;
var g = /^(?:script|style|textarea)$/i;
var $ = (t4) => (i7, ...s6) => ({ _$litType$: t4, strings: i7, values: s6 });
var p = $(1);
var y = $(2);
var b = Symbol.for("lit-noChange");
var T = Symbol.for("lit-nothing");
var x = /* @__PURE__ */ new WeakMap();
var w = (t4, i7, s6) => {
  var e7, o6;
  const n6 = (e7 = s6 == null ? void 0 : s6.renderBefore) !== null && e7 !== void 0 ? e7 : i7;
  let l4 = n6._$litPart$;
  if (l4 === void 0) {
    const t5 = (o6 = s6 == null ? void 0 : s6.renderBefore) !== null && o6 !== void 0 ? o6 : null;
    n6._$litPart$ = l4 = new N(i7.insertBefore(h2(), t5), t5, void 0, s6 != null ? s6 : {});
  }
  return l4._$AI(t4), l4;
};
var A = l2.createTreeWalker(l2, 129, null, false);
var C = (t4, i7) => {
  const o6 = t4.length - 1, l4 = [];
  let h3, r4 = i7 === 2 ? "<svg>" : "", d2 = c;
  for (let i8 = 0; i8 < o6; i8++) {
    const s6 = t4[i8];
    let o7, u5, $2 = -1, p2 = 0;
    for (; p2 < s6.length && (d2.lastIndex = p2, u5 = d2.exec(s6), u5 !== null); )
      p2 = d2.lastIndex, d2 === c ? u5[1] === "!--" ? d2 = v : u5[1] !== void 0 ? d2 = a2 : u5[2] !== void 0 ? (g.test(u5[2]) && (h3 = RegExp("</" + u5[2], "g")), d2 = f) : u5[3] !== void 0 && (d2 = f) : d2 === f ? u5[0] === ">" ? (d2 = h3 != null ? h3 : c, $2 = -1) : u5[1] === void 0 ? $2 = -2 : ($2 = d2.lastIndex - u5[2].length, o7 = u5[1], d2 = u5[3] === void 0 ? f : u5[3] === '"' ? m : _) : d2 === m || d2 === _ ? d2 = f : d2 === v || d2 === a2 ? d2 = c : (d2 = f, h3 = void 0);
    const y2 = d2 === f && t4[i8 + 1].startsWith("/>") ? " " : "";
    r4 += d2 === c ? s6 + n3 : $2 >= 0 ? (l4.push(o7), s6.slice(0, $2) + "$lit$" + s6.slice($2) + e3 + y2) : s6 + e3 + ($2 === -2 ? (l4.push(void 0), i8) : y2);
  }
  const u4 = r4 + (t4[o6] || "<?>") + (i7 === 2 ? "</svg>" : "");
  return [s3 !== void 0 ? s3.createHTML(u4) : u4, l4];
};
var P = class {
  constructor({ strings: t4, _$litType$: s6 }, n6) {
    let l4;
    this.parts = [];
    let r4 = 0, d2 = 0;
    const u4 = t4.length - 1, c4 = this.parts, [v2, a4] = C(t4, s6);
    if (this.el = P.createElement(v2, n6), A.currentNode = this.el.content, s6 === 2) {
      const t5 = this.el.content, i7 = t5.firstChild;
      i7.remove(), t5.append(...i7.childNodes);
    }
    for (; (l4 = A.nextNode()) !== null && c4.length < u4; ) {
      if (l4.nodeType === 1) {
        if (l4.hasAttributes()) {
          const t5 = [];
          for (const i7 of l4.getAttributeNames())
            if (i7.endsWith("$lit$") || i7.startsWith(e3)) {
              const s7 = a4[d2++];
              if (t5.push(i7), s7 !== void 0) {
                const t6 = l4.getAttribute(s7.toLowerCase() + "$lit$").split(e3), i8 = /([.?@])?(.*)/.exec(s7);
                c4.push({ type: 1, index: r4, name: i8[2], strings: t6, ctor: i8[1] === "." ? M : i8[1] === "?" ? H : i8[1] === "@" ? I : S2 });
              } else
                c4.push({ type: 6, index: r4 });
            }
          for (const i7 of t5)
            l4.removeAttribute(i7);
        }
        if (g.test(l4.tagName)) {
          const t5 = l4.textContent.split(e3), s7 = t5.length - 1;
          if (s7 > 0) {
            l4.textContent = i2 ? i2.emptyScript : "";
            for (let i7 = 0; i7 < s7; i7++)
              l4.append(t5[i7], h2()), A.nextNode(), c4.push({ type: 2, index: ++r4 });
            l4.append(t5[s7], h2());
          }
        }
      } else if (l4.nodeType === 8)
        if (l4.data === o3)
          c4.push({ type: 2, index: r4 });
        else {
          let t5 = -1;
          for (; (t5 = l4.data.indexOf(e3, t5 + 1)) !== -1; )
            c4.push({ type: 7, index: r4 }), t5 += e3.length - 1;
        }
      r4++;
    }
  }
  static createElement(t4, i7) {
    const s6 = l2.createElement("template");
    return s6.innerHTML = t4, s6;
  }
};
function V(t4, i7, s6 = t4, e7) {
  var o6, n6, l4, h3;
  if (i7 === b)
    return i7;
  let d2 = e7 !== void 0 ? (o6 = s6._$Cl) === null || o6 === void 0 ? void 0 : o6[e7] : s6._$Cu;
  const u4 = r3(i7) ? void 0 : i7._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u4 && ((n6 = d2 == null ? void 0 : d2._$AO) === null || n6 === void 0 || n6.call(d2, false), u4 === void 0 ? d2 = void 0 : (d2 = new u4(t4), d2._$AT(t4, s6, e7)), e7 !== void 0 ? ((l4 = (h3 = s6)._$Cl) !== null && l4 !== void 0 ? l4 : h3._$Cl = [])[e7] = d2 : s6._$Cu = d2), d2 !== void 0 && (i7 = V(t4, d2._$AS(t4, i7.values), d2, e7)), i7;
}
var E = class {
  constructor(t4, i7) {
    this.v = [], this._$AN = void 0, this._$AD = t4, this._$AM = i7;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t4) {
    var i7;
    const { el: { content: s6 }, parts: e7 } = this._$AD, o6 = ((i7 = t4 == null ? void 0 : t4.creationScope) !== null && i7 !== void 0 ? i7 : l2).importNode(s6, true);
    A.currentNode = o6;
    let n6 = A.nextNode(), h3 = 0, r4 = 0, d2 = e7[0];
    for (; d2 !== void 0; ) {
      if (h3 === d2.index) {
        let i8;
        d2.type === 2 ? i8 = new N(n6, n6.nextSibling, this, t4) : d2.type === 1 ? i8 = new d2.ctor(n6, d2.name, d2.strings, this, t4) : d2.type === 6 && (i8 = new L(n6, this, t4)), this.v.push(i8), d2 = e7[++r4];
      }
      h3 !== (d2 == null ? void 0 : d2.index) && (n6 = A.nextNode(), h3++);
    }
    return o6;
  }
  m(t4) {
    let i7 = 0;
    for (const s6 of this.v)
      s6 !== void 0 && (s6.strings !== void 0 ? (s6._$AI(t4, s6, i7), i7 += s6.strings.length - 2) : s6._$AI(t4[i7])), i7++;
  }
};
var N = class {
  constructor(t4, i7, s6, e7) {
    var o6;
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t4, this._$AB = i7, this._$AM = s6, this.options = e7, this._$Cg = (o6 = e7 == null ? void 0 : e7.isConnected) === null || o6 === void 0 || o6;
  }
  get _$AU() {
    var t4, i7;
    return (i7 = (t4 = this._$AM) === null || t4 === void 0 ? void 0 : t4._$AU) !== null && i7 !== void 0 ? i7 : this._$Cg;
  }
  get parentNode() {
    let t4 = this._$AA.parentNode;
    const i7 = this._$AM;
    return i7 !== void 0 && t4.nodeType === 11 && (t4 = i7.parentNode), t4;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t4, i7 = this) {
    t4 = V(this, t4, i7), r3(t4) ? t4 === T || t4 == null || t4 === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t4 !== this._$AH && t4 !== b && this.$(t4) : t4._$litType$ !== void 0 ? this.T(t4) : t4.nodeType !== void 0 ? this.S(t4) : u(t4) ? this.M(t4) : this.$(t4);
  }
  A(t4, i7 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t4, i7);
  }
  S(t4) {
    this._$AH !== t4 && (this._$AR(), this._$AH = this.A(t4));
  }
  $(t4) {
    this._$AH !== T && r3(this._$AH) ? this._$AA.nextSibling.data = t4 : this.S(l2.createTextNode(t4)), this._$AH = t4;
  }
  T(t4) {
    var i7;
    const { values: s6, _$litType$: e7 } = t4, o6 = typeof e7 == "number" ? this._$AC(t4) : (e7.el === void 0 && (e7.el = P.createElement(e7.h, this.options)), e7);
    if (((i7 = this._$AH) === null || i7 === void 0 ? void 0 : i7._$AD) === o6)
      this._$AH.m(s6);
    else {
      const t5 = new E(o6, this), i8 = t5.p(this.options);
      t5.m(s6), this.S(i8), this._$AH = t5;
    }
  }
  _$AC(t4) {
    let i7 = x.get(t4.strings);
    return i7 === void 0 && x.set(t4.strings, i7 = new P(t4)), i7;
  }
  M(t4) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i7 = this._$AH;
    let s6, e7 = 0;
    for (const o6 of t4)
      e7 === i7.length ? i7.push(s6 = new N(this.A(h2()), this.A(h2()), this, this.options)) : s6 = i7[e7], s6._$AI(o6), e7++;
    e7 < i7.length && (this._$AR(s6 && s6._$AB.nextSibling, e7), i7.length = e7);
  }
  _$AR(t4 = this._$AA.nextSibling, i7) {
    var s6;
    for ((s6 = this._$AP) === null || s6 === void 0 || s6.call(this, false, true, i7); t4 && t4 !== this._$AB; ) {
      const i8 = t4.nextSibling;
      t4.remove(), t4 = i8;
    }
  }
  setConnected(t4) {
    var i7;
    this._$AM === void 0 && (this._$Cg = t4, (i7 = this._$AP) === null || i7 === void 0 || i7.call(this, t4));
  }
};
var S2 = class {
  constructor(t4, i7, s6, e7, o6) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t4, this.name = i7, this._$AM = e7, this.options = o6, s6.length > 2 || s6[0] !== "" || s6[1] !== "" ? (this._$AH = Array(s6.length - 1).fill(new String()), this.strings = s6) : this._$AH = T;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t4, i7 = this, s6, e7) {
    const o6 = this.strings;
    let n6 = false;
    if (o6 === void 0)
      t4 = V(this, t4, i7, 0), n6 = !r3(t4) || t4 !== this._$AH && t4 !== b, n6 && (this._$AH = t4);
    else {
      const e8 = t4;
      let l4, h3;
      for (t4 = o6[0], l4 = 0; l4 < o6.length - 1; l4++)
        h3 = V(this, e8[s6 + l4], i7, l4), h3 === b && (h3 = this._$AH[l4]), n6 || (n6 = !r3(h3) || h3 !== this._$AH[l4]), h3 === T ? t4 = T : t4 !== T && (t4 += (h3 != null ? h3 : "") + o6[l4 + 1]), this._$AH[l4] = h3;
    }
    n6 && !e7 && this.k(t4);
  }
  k(t4) {
    t4 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t4 != null ? t4 : "");
  }
};
var M = class extends S2 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  k(t4) {
    this.element[this.name] = t4 === T ? void 0 : t4;
  }
};
var k = i2 ? i2.emptyScript : "";
var H = class extends S2 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  k(t4) {
    t4 && t4 !== T ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
  }
};
var I = class extends S2 {
  constructor(t4, i7, s6, e7, o6) {
    super(t4, i7, s6, e7, o6), this.type = 5;
  }
  _$AI(t4, i7 = this) {
    var s6;
    if ((t4 = (s6 = V(this, t4, i7, 0)) !== null && s6 !== void 0 ? s6 : T) === b)
      return;
    const e7 = this._$AH, o6 = t4 === T && e7 !== T || t4.capture !== e7.capture || t4.once !== e7.once || t4.passive !== e7.passive, n6 = t4 !== T && (e7 === T || o6);
    o6 && this.element.removeEventListener(this.name, this, e7), n6 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
  }
  handleEvent(t4) {
    var i7, s6;
    typeof this._$AH == "function" ? this._$AH.call((s6 = (i7 = this.options) === null || i7 === void 0 ? void 0 : i7.host) !== null && s6 !== void 0 ? s6 : this.element, t4) : this._$AH.handleEvent(t4);
  }
};
var L = class {
  constructor(t4, i7, s6) {
    this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i7, this.options = s6;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t4) {
    V(this, t4);
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
    var t4, e7;
    const i7 = super.createRenderRoot();
    return (t4 = (e7 = this.renderOptions).renderBefore) !== null && t4 !== void 0 || (e7.renderBefore = i7.firstChild), i7;
  }
  update(t4) {
    const i7 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Dt = w(i7, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t4;
    super.connectedCallback(), (t4 = this._$Dt) === null || t4 === void 0 || t4.setConnected(true);
  }
  disconnectedCallback() {
    var t4;
    super.disconnectedCallback(), (t4 = this._$Dt) === null || t4 === void 0 || t4.setConnected(false);
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
var n5 = (n6) => (e7) => typeof e7 == "function" ? ((n7, e8) => (window.customElements.define(n7, e8), e8))(n6, e7) : ((n7, e8) => {
  const { kind: t4, elements: i7 } = e8;
  return { kind: t4, elements: i7, finisher(e9) {
    window.customElements.define(n7, e9);
  } };
})(n6, e7);

// node_modules/@lit/reactive-element/decorators/property.js
var i3 = (i7, e7) => e7.kind === "method" && e7.descriptor && !("value" in e7.descriptor) ? { ...e7, finisher(n6) {
  n6.createProperty(e7.key, i7);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e7.key, initializer() {
  typeof e7.initializer == "function" && (this[e7.key] = e7.initializer.call(this));
}, finisher(n6) {
  n6.createProperty(e7.key, i7);
} };
function e4(e7) {
  return (n6, t4) => t4 !== void 0 ? ((i7, e8, n7) => {
    e8.constructor.createProperty(n7, i7);
  })(e7, n6, t4) : i3(e7, n6);
}

// node_modules/@lit/reactive-element/decorators/base.js
var o5 = ({ finisher: e7, descriptor: t4 }) => (o6, n6) => {
  var r4;
  if (n6 === void 0) {
    const n7 = (r4 = o6.originalKey) !== null && r4 !== void 0 ? r4 : o6.key, i7 = t4 != null ? { kind: "method", placement: "prototype", key: n7, descriptor: t4(o6.key) } : { ...o6, key: n7 };
    return e7 != null && (i7.finisher = function(t5) {
      e7(t5, n7);
    }), i7;
  }
  {
    const r5 = o6.constructor;
    t4 !== void 0 && Object.defineProperty(o6, n6, t4(n6)), e7 == null || e7(r5, n6);
  }
};

// node_modules/@lit/reactive-element/decorators/query.js
function i4(i7, n6) {
  return o5({ descriptor: (o6) => {
    const t4 = { get() {
      var o7, n7;
      return (n7 = (o7 = this.renderRoot) === null || o7 === void 0 ? void 0 : o7.querySelector(i7)) !== null && n7 !== void 0 ? n7 : null;
    }, enumerable: true, configurable: true };
    if (n6) {
      const n7 = typeof o6 == "symbol" ? Symbol() : "__" + o6;
      t4.get = function() {
        var o7, t5;
        return this[n7] === void 0 && (this[n7] = (t5 = (o7 = this.renderRoot) === null || o7 === void 0 ? void 0 : o7.querySelector(i7)) !== null && t5 !== void 0 ? t5 : null), this[n7];
      };
    }
    return t4;
  } });
}

// node_modules/lit-html/directive.js
var t3 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e5 = (t4) => (...e7) => ({ _$litDirective$: t4, values: e7 });
var i5 = class {
  constructor(t4) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t4, e7, i7) {
    this._$Ct = t4, this._$AM = e7, this._$Ci = i7;
  }
  _$AS(t4, e7) {
    return this.update(t4, e7);
  }
  update(t4, e7) {
    return this.render(...e7);
  }
};

// node_modules/lit-html/directive-helpers.js
var { H: i6 } = R;
var e6 = () => document.createComment("");
var u2 = (o6, t4, n6) => {
  var v2;
  const l4 = o6._$AA.parentNode, d2 = t4 === void 0 ? o6._$AB : t4._$AA;
  if (n6 === void 0) {
    const t5 = l4.insertBefore(e6(), d2), v3 = l4.insertBefore(e6(), d2);
    n6 = new i6(t5, v3, o6, o6.options);
  } else {
    const i7 = n6._$AB.nextSibling, t5 = n6._$AM, r4 = t5 !== o6;
    if (r4) {
      let i8;
      (v2 = n6._$AQ) === null || v2 === void 0 || v2.call(n6, o6), n6._$AM = o6, n6._$AP !== void 0 && (i8 = o6._$AU) !== t5._$AU && n6._$AP(i8);
    }
    if (i7 !== d2 || r4) {
      let o7 = n6._$AA;
      for (; o7 !== i7; ) {
        const i8 = o7.nextSibling;
        l4.insertBefore(o7, d2), o7 = i8;
      }
    }
  }
  return n6;
};
var c2 = (o6, i7, t4 = o6) => (o6._$AI(i7, t4), o6);
var f2 = {};
var s5 = (o6, i7 = f2) => o6._$AH = i7;
var a3 = (o6) => o6._$AH;
var m2 = (o6) => {
  var i7;
  (i7 = o6._$AP) === null || i7 === void 0 || i7.call(o6, false, true);
  let t4 = o6._$AA;
  const n6 = o6._$AB.nextSibling;
  for (; t4 !== n6; ) {
    const o7 = t4.nextSibling;
    t4.remove(), t4 = o7;
  }
};

// node_modules/lit-html/directives/repeat.js
var u3 = (e7, s6, t4) => {
  const r4 = /* @__PURE__ */ new Map();
  for (let l4 = s6; l4 <= t4; l4++)
    r4.set(e7[l4], l4);
  return r4;
};
var c3 = e5(class extends i5 {
  constructor(e7) {
    if (super(e7), e7.type !== t3.CHILD)
      throw Error("repeat() can only be used in text expressions");
  }
  dt(e7, s6, t4) {
    let r4;
    t4 === void 0 ? t4 = s6 : s6 !== void 0 && (r4 = s6);
    const l4 = [], o6 = [];
    let i7 = 0;
    for (const s7 of e7)
      l4[i7] = r4 ? r4(s7, i7) : i7, o6[i7] = t4(s7, i7), i7++;
    return { values: o6, keys: l4 };
  }
  render(e7, s6, t4) {
    return this.dt(e7, s6, t4).values;
  }
  update(s6, [t4, r4, c4]) {
    var d2;
    const a4 = a3(s6), { values: p2, keys: v2 } = this.dt(t4, r4, c4);
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
          const e7 = x2.get(v2[w2]), t5 = e7 !== void 0 ? a4[e7] : null;
          if (t5 === null) {
            const e8 = u2(s6, a4[j]);
            c2(e8, p2[w2]), m3[w2] = e8;
          } else
            m3[w2] = c2(t5, p2[w2]), u2(s6, a4[j], t5), a4[e7] = null;
          w2++;
        } else
          m2(a4[k2]), k2--;
      else
        m2(a4[j]), j++;
    for (; w2 <= A2; ) {
      const e7 = u2(s6, m3[A2 + 1]);
      c2(e7, p2[w2]), m3[w2++] = e7;
    }
    for (; j <= k2; ) {
      const e7 = a4[j++];
      e7 !== null && m2(e7);
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

    /*mix-blend-mode: difference;*/
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
    font-size: calc(var(--font-size) * 1.6);
}

:where(h2) {
    font-size: calc(var(--font-size) * 1.5);
}

:where(h3) {
    font-size: calc(var(--font-size) * 1.4);
}

:where(h4) {
    font-size: calc(var(--font-size) * 1.3);
}

:where(h5) {
    font-size: calc(var(--font-size) * 1.2);
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
    border-radius: 2vmin;
    overflow: hidden;
    flex-shrink: 0;
}

:host(:hover:not(:host([editing]))) {
    background-color: var(--surface2);
    box-shadow: var(--shadow-colour) calc(var(--shadow-x) / 2) calc(var(--shadow-y) / 2) var(--shadow-spread);
}

#handle {
    --size: 2vmin;
    --padding: 2vmin;

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
  UpdatePage(e7) {
    e7.preventDefault();
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

    border-radius: 0 2vmin 2vmin 0;
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

        border-radius: 0 2vmin 2vmin 0;
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
        border-radius: 0 0 2vmin 0;
    }
}

@media (max-aspect-ratio: 1/1) {
    :host {
        order: 100;

        width: 100%;
        height: 12vmin;

        border-radius: 2vmin 2vmin 0 0;
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
    left: 0;
    --angle: 90deg;
}

#right-shadow {
    border-radius: 0 2vmin 0 0;
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
                      @dragstart="${this.SetDraggedNavItemIndex}" @dragenter="${this.ReorderNavItems}" @dragover="${(e7) => e7.preventDefault()}"
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
  SetDraggedNavItemIndex(e7) {
    let target = e7.target;
    if (!target.editing)
      return;
    if (target.dataset.index === void 0)
      return;
    this.draggedNavItemIndex = parseInt(target.dataset.index);
    if (e7.dataTransfer)
      e7.dataTransfer.effectAllowed = "copyLink";
    e7.dataTransfer?.setData("Text", target.id);
  }
  ReorderNavItems(e7) {
    let target = e7.target;
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
  static async HandleCommand(command, data, source) {
    if (command == "Get Resource") {
      return new Promise((resolve) => {
        let resolved = false;
        Resources.GetResource(data.name, async (resource) => {
          if (resolved) {
            source?.postMessage({
              command: "Resource",
              data: {
                resource
              }
            });
            return;
          }
          resolved = true;
          resolve({
            command: "Resource",
            data: {
              resource
            }
          });
        });
      });
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
    this._extensionCallbacks.push(callback);
    callback(await this.GetExtensionsNow());
  }
  static async FireExtensionCallbacks() {
    let extensions = await this.GetExtensionsNow();
    for (let callback of this._extensionCallbacks)
      callback(extensions);
  }
  static GetExtensionIconURL(extension) {
    let url = new URL(extension.icon, extension.url);
    url.search = `cache-version=${extension.version}`;
    return url.toString();
  }
  static GetExtensionNavIconURL(extension) {
    let url = new URL(extension.navIcon, extension.url);
    url.search = `cache-version=${extension.version}`;
    return url.toString();
  }
  static AddListeners() {
    Site.ListenForDark((dark) => {
      for (let i7 = 0; i7 < window.frames.length; i7++) {
        let frame = window.frames[i7];
        frame.postMessage({
          command: "Set Dark",
          data: dark
        }, "*");
      }
    });
    window.addEventListener("message", async (e7) => {
      let origin = e7.origin;
      if (!_Extensions.extensionOrigins.includes(origin))
        return;
      e7.source?.postMessage(await _Extensions.HandleCommand(e7.data.command, e7.data.data, e7.source));
    });
  }
};
var Extensions = _Extensions;
Extensions._installedExtensions = new Map(Object.entries(JSON.parse(localStorage.getItem("Installed Extensions") || "{}")));
Extensions.extensionOrigins = _Extensions.GetExtensionOrigins(_Extensions._installedExtensions);
Extensions._extensionCallbacks = [];

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
      if (this.pageElement != null)
        this.pageElement.classList.add("hidden");
      element.classList.remove("hidden");
      this.pageElement = element;
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
    for (let callback of this.darkCallbacks) {
      callback(dark);
    }
  }
  static ListenForDark(callback) {
    this.darkCallbacks.push(callback);
  }
  static SetColour(hue) {
    document.documentElement.style.setProperty("--main-hue", hue);
    document.documentElement.style.setProperty("--hue-rotate", `${parseFloat(hue) - 200}deg`);
  }
};
Site.page = {
  page: "",
  extension: false
};
Site.dark = localStorage.getItem("Dark") == "true";
Site.hue = localStorage.getItem("Hue") || "200";
Site.pageElement = null;
Site.darkCallbacks = [];

// site/ts/login-url.ts
var login_url_default = `https://student.sbhs.net.au/api/authorize?response_type=code&scope=all-ro&state=abc&client_id=${""}&redirect_uri=${location.origin}/callback`;

// site/ts/login.ts
if (Site.dark)
  document.getElementById("logo-p").src = "images/logo-dark.svg";
var loginLink = document.getElementById("login");
loginLink.href = login_url_default;
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
