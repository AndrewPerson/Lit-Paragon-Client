(() => {
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
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e8) {
          reject(e8);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e8) {
          reject(e8);
        }
      };
      var step = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/@lit/reactive-element/css-tag.js
  var t = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var e = Symbol();
  var n = /* @__PURE__ */ new Map();
  var s = class {
    constructor(t6, n6) {
      if (this._$cssResult$ = true, n6 !== e)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t6;
    }
    get styleSheet() {
      let e8 = n.get(this.cssText);
      return t && e8 === void 0 && (n.set(this.cssText, e8 = new CSSStyleSheet()), e8.replaceSync(this.cssText)), e8;
    }
    toString() {
      return this.cssText;
    }
  };
  var o = (t6) => new s(typeof t6 == "string" ? t6 : t6 + "", e);
  var r = (t6, ...n6) => {
    const o8 = t6.length === 1 ? t6[0] : n6.reduce((e8, n7, s6) => e8 + ((t7) => {
      if (t7._$cssResult$ === true)
        return t7.cssText;
      if (typeof t7 == "number")
        return t7;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t7 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(n7) + t6[s6 + 1], t6[0]);
    return new s(o8, e);
  };
  var i = (e8, n6) => {
    t ? e8.adoptedStyleSheets = n6.map((t6) => t6 instanceof CSSStyleSheet ? t6 : t6.styleSheet) : n6.forEach((t6) => {
      const n7 = document.createElement("style"), s6 = window.litNonce;
      s6 !== void 0 && n7.setAttribute("nonce", s6), n7.textContent = t6.cssText, e8.appendChild(n7);
    });
  };
  var S = t ? (t6) => t6 : (t6) => t6 instanceof CSSStyleSheet ? ((t7) => {
    let e8 = "";
    for (const n6 of t7.cssRules)
      e8 += n6.cssText;
    return o(e8);
  })(t6) : t6;

  // node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window.trustedTypes;
  var r2 = e2 ? e2.emptyScript : "";
  var h = window.reactiveElementPolyfillSupport;
  var o2 = { toAttribute(t6, i7) {
    switch (i7) {
      case Boolean:
        t6 = t6 ? r2 : null;
        break;
      case Object:
      case Array:
        t6 = t6 == null ? t6 : JSON.stringify(t6);
    }
    return t6;
  }, fromAttribute(t6, i7) {
    let s6 = t6;
    switch (i7) {
      case Boolean:
        s6 = t6 !== null;
        break;
      case Number:
        s6 = t6 === null ? null : Number(t6);
        break;
      case Object:
      case Array:
        try {
          s6 = JSON.parse(t6);
        } catch (t7) {
          s6 = null;
        }
    }
    return s6;
  } };
  var n2 = (t6, i7) => i7 !== t6 && (i7 == i7 || t6 == t6);
  var l = { attribute: true, type: String, converter: o2, reflect: false, hasChanged: n2 };
  var a = class extends HTMLElement {
    constructor() {
      super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
    }
    static addInitializer(t6) {
      var i7;
      (i7 = this.l) !== null && i7 !== void 0 || (this.l = []), this.l.push(t6);
    }
    static get observedAttributes() {
      this.finalize();
      const t6 = [];
      return this.elementProperties.forEach((i7, s6) => {
        const e8 = this._$Eh(s6, i7);
        e8 !== void 0 && (this._$Eu.set(e8, s6), t6.push(e8));
      }), t6;
    }
    static createProperty(t6, i7 = l) {
      if (i7.state && (i7.attribute = false), this.finalize(), this.elementProperties.set(t6, i7), !i7.noAccessor && !this.prototype.hasOwnProperty(t6)) {
        const s6 = typeof t6 == "symbol" ? Symbol() : "__" + t6, e8 = this.getPropertyDescriptor(t6, s6, i7);
        e8 !== void 0 && Object.defineProperty(this.prototype, t6, e8);
      }
    }
    static getPropertyDescriptor(t6, i7, s6) {
      return { get() {
        return this[i7];
      }, set(e8) {
        const r4 = this[t6];
        this[i7] = e8, this.requestUpdate(t6, r4, s6);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t6) {
      return this.elementProperties.get(t6) || l;
    }
    static finalize() {
      if (this.hasOwnProperty("finalized"))
        return false;
      this.finalized = true;
      const t6 = Object.getPrototypeOf(this);
      if (t6.finalize(), this.elementProperties = new Map(t6.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t7 = this.properties, i7 = [...Object.getOwnPropertyNames(t7), ...Object.getOwnPropertySymbols(t7)];
        for (const s6 of i7)
          this.createProperty(s6, t7[s6]);
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
    static _$Eh(t6, i7) {
      const s6 = i7.attribute;
      return s6 === false ? void 0 : typeof s6 == "string" ? s6 : typeof t6 == "string" ? t6.toLowerCase() : void 0;
    }
    o() {
      var t6;
      this._$Ep = new Promise((t7) => this.enableUpdating = t7), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t6 = this.constructor.l) === null || t6 === void 0 || t6.forEach((t7) => t7(this));
    }
    addController(t6) {
      var i7, s6;
      ((i7 = this._$Eg) !== null && i7 !== void 0 ? i7 : this._$Eg = []).push(t6), this.renderRoot !== void 0 && this.isConnected && ((s6 = t6.hostConnected) === null || s6 === void 0 || s6.call(t6));
    }
    removeController(t6) {
      var i7;
      (i7 = this._$Eg) === null || i7 === void 0 || i7.splice(this._$Eg.indexOf(t6) >>> 0, 1);
    }
    _$Em() {
      this.constructor.elementProperties.forEach((t6, i7) => {
        this.hasOwnProperty(i7) && (this._$Et.set(i7, this[i7]), delete this[i7]);
      });
    }
    createRenderRoot() {
      var t6;
      const s6 = (t6 = this.shadowRoot) !== null && t6 !== void 0 ? t6 : this.attachShadow(this.constructor.shadowRootOptions);
      return i(s6, this.constructor.elementStyles), s6;
    }
    connectedCallback() {
      var t6;
      this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t6 = this._$Eg) === null || t6 === void 0 || t6.forEach((t7) => {
        var i7;
        return (i7 = t7.hostConnected) === null || i7 === void 0 ? void 0 : i7.call(t7);
      });
    }
    enableUpdating(t6) {
    }
    disconnectedCallback() {
      var t6;
      (t6 = this._$Eg) === null || t6 === void 0 || t6.forEach((t7) => {
        var i7;
        return (i7 = t7.hostDisconnected) === null || i7 === void 0 ? void 0 : i7.call(t7);
      });
    }
    attributeChangedCallback(t6, i7, s6) {
      this._$AK(t6, s6);
    }
    _$ES(t6, i7, s6 = l) {
      var e8, r4;
      const h3 = this.constructor._$Eh(t6, s6);
      if (h3 !== void 0 && s6.reflect === true) {
        const n6 = ((r4 = (e8 = s6.converter) === null || e8 === void 0 ? void 0 : e8.toAttribute) !== null && r4 !== void 0 ? r4 : o2.toAttribute)(i7, s6.type);
        this._$Ei = t6, n6 == null ? this.removeAttribute(h3) : this.setAttribute(h3, n6), this._$Ei = null;
      }
    }
    _$AK(t6, i7) {
      var s6, e8, r4;
      const h3 = this.constructor, n6 = h3._$Eu.get(t6);
      if (n6 !== void 0 && this._$Ei !== n6) {
        const t7 = h3.getPropertyOptions(n6), l4 = t7.converter, a4 = (r4 = (e8 = (s6 = l4) === null || s6 === void 0 ? void 0 : s6.fromAttribute) !== null && e8 !== void 0 ? e8 : typeof l4 == "function" ? l4 : null) !== null && r4 !== void 0 ? r4 : o2.fromAttribute;
        this._$Ei = n6, this[n6] = a4(i7, t7.type), this._$Ei = null;
      }
    }
    requestUpdate(t6, i7, s6) {
      let e8 = true;
      t6 !== void 0 && (((s6 = s6 || this.constructor.getPropertyOptions(t6)).hasChanged || n2)(this[t6], i7) ? (this._$AL.has(t6) || this._$AL.set(t6, i7), s6.reflect === true && this._$Ei !== t6 && (this._$E_ === void 0 && (this._$E_ = /* @__PURE__ */ new Map()), this._$E_.set(t6, s6))) : e8 = false), !this.isUpdatePending && e8 && (this._$Ep = this._$EC());
    }
    async _$EC() {
      this.isUpdatePending = true;
      try {
        await this._$Ep;
      } catch (t7) {
        Promise.reject(t7);
      }
      const t6 = this.scheduleUpdate();
      return t6 != null && await t6, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t6;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Et && (this._$Et.forEach((t7, i8) => this[i8] = t7), this._$Et = void 0);
      let i7 = false;
      const s6 = this._$AL;
      try {
        i7 = this.shouldUpdate(s6), i7 ? (this.willUpdate(s6), (t6 = this._$Eg) === null || t6 === void 0 || t6.forEach((t7) => {
          var i8;
          return (i8 = t7.hostUpdate) === null || i8 === void 0 ? void 0 : i8.call(t7);
        }), this.update(s6)) : this._$EU();
      } catch (t7) {
        throw i7 = false, this._$EU(), t7;
      }
      i7 && this._$AE(s6);
    }
    willUpdate(t6) {
    }
    _$AE(t6) {
      var i7;
      (i7 = this._$Eg) === null || i7 === void 0 || i7.forEach((t7) => {
        var i8;
        return (i8 = t7.hostUpdated) === null || i8 === void 0 ? void 0 : i8.call(t7);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t6)), this.updated(t6);
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
    shouldUpdate(t6) {
      return true;
    }
    update(t6) {
      this._$E_ !== void 0 && (this._$E_.forEach((t7, i7) => this._$ES(i7, this[i7], t7)), this._$E_ = void 0), this._$EU();
    }
    updated(t6) {
    }
    firstUpdated(t6) {
    }
  };
  a.finalized = true, a.elementProperties = /* @__PURE__ */ new Map(), a.elementStyles = [], a.shadowRootOptions = { mode: "open" }, h == null || h({ ReactiveElement: a }), ((s2 = globalThis.reactiveElementVersions) !== null && s2 !== void 0 ? s2 : globalThis.reactiveElementVersions = []).push("1.0.2");

  // node_modules/lit-html/lit-html.js
  var t2;
  var i2 = globalThis.trustedTypes;
  var s3 = i2 ? i2.createPolicy("lit-html", { createHTML: (t6) => t6 }) : void 0;
  var e3 = `lit$${(Math.random() + "").slice(9)}$`;
  var o3 = "?" + e3;
  var n3 = `<${o3}>`;
  var l2 = document;
  var h2 = (t6 = "") => l2.createComment(t6);
  var r3 = (t6) => t6 === null || typeof t6 != "object" && typeof t6 != "function";
  var d = Array.isArray;
  var u = (t6) => {
    var i7;
    return d(t6) || typeof ((i7 = t6) === null || i7 === void 0 ? void 0 : i7[Symbol.iterator]) == "function";
  };
  var c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var a2 = />/g;
  var f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
  var _ = /'/g;
  var m = /"/g;
  var g = /^(?:script|style|textarea)$/i;
  var $ = (t6) => (i7, ...s6) => ({ _$litType$: t6, strings: i7, values: s6 });
  var p = $(1);
  var y = $(2);
  var b = Symbol.for("lit-noChange");
  var T = Symbol.for("lit-nothing");
  var x = new WeakMap();
  var w = (t6, i7, s6) => {
    var e8, o8;
    const n6 = (e8 = s6 == null ? void 0 : s6.renderBefore) !== null && e8 !== void 0 ? e8 : i7;
    let l4 = n6._$litPart$;
    if (l4 === void 0) {
      const t7 = (o8 = s6 == null ? void 0 : s6.renderBefore) !== null && o8 !== void 0 ? o8 : null;
      n6._$litPart$ = l4 = new N(i7.insertBefore(h2(), t7), t7, void 0, s6 != null ? s6 : {});
    }
    return l4._$AI(t6), l4;
  };
  var A = l2.createTreeWalker(l2, 129, null, false);
  var C = (t6, i7) => {
    const o8 = t6.length - 1, l4 = [];
    let h3, r4 = i7 === 2 ? "<svg>" : "", d2 = c;
    for (let i8 = 0; i8 < o8; i8++) {
      const s6 = t6[i8];
      let o9, u5, $2 = -1, p2 = 0;
      for (; p2 < s6.length && (d2.lastIndex = p2, u5 = d2.exec(s6), u5 !== null); )
        p2 = d2.lastIndex, d2 === c ? u5[1] === "!--" ? d2 = v : u5[1] !== void 0 ? d2 = a2 : u5[2] !== void 0 ? (g.test(u5[2]) && (h3 = RegExp("</" + u5[2], "g")), d2 = f) : u5[3] !== void 0 && (d2 = f) : d2 === f ? u5[0] === ">" ? (d2 = h3 != null ? h3 : c, $2 = -1) : u5[1] === void 0 ? $2 = -2 : ($2 = d2.lastIndex - u5[2].length, o9 = u5[1], d2 = u5[3] === void 0 ? f : u5[3] === '"' ? m : _) : d2 === m || d2 === _ ? d2 = f : d2 === v || d2 === a2 ? d2 = c : (d2 = f, h3 = void 0);
      const y2 = d2 === f && t6[i8 + 1].startsWith("/>") ? " " : "";
      r4 += d2 === c ? s6 + n3 : $2 >= 0 ? (l4.push(o9), s6.slice(0, $2) + "$lit$" + s6.slice($2) + e3 + y2) : s6 + e3 + ($2 === -2 ? (l4.push(void 0), i8) : y2);
    }
    const u4 = r4 + (t6[o8] || "<?>") + (i7 === 2 ? "</svg>" : "");
    return [s3 !== void 0 ? s3.createHTML(u4) : u4, l4];
  };
  var P = class {
    constructor({ strings: t6, _$litType$: s6 }, n6) {
      let l4;
      this.parts = [];
      let r4 = 0, d2 = 0;
      const u4 = t6.length - 1, c4 = this.parts, [v2, a4] = C(t6, s6);
      if (this.el = P.createElement(v2, n6), A.currentNode = this.el.content, s6 === 2) {
        const t7 = this.el.content, i7 = t7.firstChild;
        i7.remove(), t7.append(...i7.childNodes);
      }
      for (; (l4 = A.nextNode()) !== null && c4.length < u4; ) {
        if (l4.nodeType === 1) {
          if (l4.hasAttributes()) {
            const t7 = [];
            for (const i7 of l4.getAttributeNames())
              if (i7.endsWith("$lit$") || i7.startsWith(e3)) {
                const s7 = a4[d2++];
                if (t7.push(i7), s7 !== void 0) {
                  const t8 = l4.getAttribute(s7.toLowerCase() + "$lit$").split(e3), i8 = /([.?@])?(.*)/.exec(s7);
                  c4.push({ type: 1, index: r4, name: i8[2], strings: t8, ctor: i8[1] === "." ? M : i8[1] === "?" ? H : i8[1] === "@" ? I : S2 });
                } else
                  c4.push({ type: 6, index: r4 });
              }
            for (const i7 of t7)
              l4.removeAttribute(i7);
          }
          if (g.test(l4.tagName)) {
            const t7 = l4.textContent.split(e3), s7 = t7.length - 1;
            if (s7 > 0) {
              l4.textContent = i2 ? i2.emptyScript : "";
              for (let i7 = 0; i7 < s7; i7++)
                l4.append(t7[i7], h2()), A.nextNode(), c4.push({ type: 2, index: ++r4 });
              l4.append(t7[s7], h2());
            }
          }
        } else if (l4.nodeType === 8)
          if (l4.data === o3)
            c4.push({ type: 2, index: r4 });
          else {
            let t7 = -1;
            for (; (t7 = l4.data.indexOf(e3, t7 + 1)) !== -1; )
              c4.push({ type: 7, index: r4 }), t7 += e3.length - 1;
          }
        r4++;
      }
    }
    static createElement(t6, i7) {
      const s6 = l2.createElement("template");
      return s6.innerHTML = t6, s6;
    }
  };
  function V(t6, i7, s6 = t6, e8) {
    var o8, n6, l4, h3;
    if (i7 === b)
      return i7;
    let d2 = e8 !== void 0 ? (o8 = s6._$Cl) === null || o8 === void 0 ? void 0 : o8[e8] : s6._$Cu;
    const u4 = r3(i7) ? void 0 : i7._$litDirective$;
    return (d2 == null ? void 0 : d2.constructor) !== u4 && ((n6 = d2 == null ? void 0 : d2._$AO) === null || n6 === void 0 || n6.call(d2, false), u4 === void 0 ? d2 = void 0 : (d2 = new u4(t6), d2._$AT(t6, s6, e8)), e8 !== void 0 ? ((l4 = (h3 = s6)._$Cl) !== null && l4 !== void 0 ? l4 : h3._$Cl = [])[e8] = d2 : s6._$Cu = d2), d2 !== void 0 && (i7 = V(t6, d2._$AS(t6, i7.values), d2, e8)), i7;
  }
  var E = class {
    constructor(t6, i7) {
      this.v = [], this._$AN = void 0, this._$AD = t6, this._$AM = i7;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    p(t6) {
      var i7;
      const { el: { content: s6 }, parts: e8 } = this._$AD, o8 = ((i7 = t6 == null ? void 0 : t6.creationScope) !== null && i7 !== void 0 ? i7 : l2).importNode(s6, true);
      A.currentNode = o8;
      let n6 = A.nextNode(), h3 = 0, r4 = 0, d2 = e8[0];
      for (; d2 !== void 0; ) {
        if (h3 === d2.index) {
          let i8;
          d2.type === 2 ? i8 = new N(n6, n6.nextSibling, this, t6) : d2.type === 1 ? i8 = new d2.ctor(n6, d2.name, d2.strings, this, t6) : d2.type === 6 && (i8 = new L(n6, this, t6)), this.v.push(i8), d2 = e8[++r4];
        }
        h3 !== (d2 == null ? void 0 : d2.index) && (n6 = A.nextNode(), h3++);
      }
      return o8;
    }
    m(t6) {
      let i7 = 0;
      for (const s6 of this.v)
        s6 !== void 0 && (s6.strings !== void 0 ? (s6._$AI(t6, s6, i7), i7 += s6.strings.length - 2) : s6._$AI(t6[i7])), i7++;
    }
  };
  var N = class {
    constructor(t6, i7, s6, e8) {
      var o8;
      this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t6, this._$AB = i7, this._$AM = s6, this.options = e8, this._$Cg = (o8 = e8 == null ? void 0 : e8.isConnected) === null || o8 === void 0 || o8;
    }
    get _$AU() {
      var t6, i7;
      return (i7 = (t6 = this._$AM) === null || t6 === void 0 ? void 0 : t6._$AU) !== null && i7 !== void 0 ? i7 : this._$Cg;
    }
    get parentNode() {
      let t6 = this._$AA.parentNode;
      const i7 = this._$AM;
      return i7 !== void 0 && t6.nodeType === 11 && (t6 = i7.parentNode), t6;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t6, i7 = this) {
      t6 = V(this, t6, i7), r3(t6) ? t6 === T || t6 == null || t6 === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t6 !== this._$AH && t6 !== b && this.$(t6) : t6._$litType$ !== void 0 ? this.T(t6) : t6.nodeType !== void 0 ? this.S(t6) : u(t6) ? this.M(t6) : this.$(t6);
    }
    A(t6, i7 = this._$AB) {
      return this._$AA.parentNode.insertBefore(t6, i7);
    }
    S(t6) {
      this._$AH !== t6 && (this._$AR(), this._$AH = this.A(t6));
    }
    $(t6) {
      this._$AH !== T && r3(this._$AH) ? this._$AA.nextSibling.data = t6 : this.S(l2.createTextNode(t6)), this._$AH = t6;
    }
    T(t6) {
      var i7;
      const { values: s6, _$litType$: e8 } = t6, o8 = typeof e8 == "number" ? this._$AC(t6) : (e8.el === void 0 && (e8.el = P.createElement(e8.h, this.options)), e8);
      if (((i7 = this._$AH) === null || i7 === void 0 ? void 0 : i7._$AD) === o8)
        this._$AH.m(s6);
      else {
        const t7 = new E(o8, this), i8 = t7.p(this.options);
        t7.m(s6), this.S(i8), this._$AH = t7;
      }
    }
    _$AC(t6) {
      let i7 = x.get(t6.strings);
      return i7 === void 0 && x.set(t6.strings, i7 = new P(t6)), i7;
    }
    M(t6) {
      d(this._$AH) || (this._$AH = [], this._$AR());
      const i7 = this._$AH;
      let s6, e8 = 0;
      for (const o8 of t6)
        e8 === i7.length ? i7.push(s6 = new N(this.A(h2()), this.A(h2()), this, this.options)) : s6 = i7[e8], s6._$AI(o8), e8++;
      e8 < i7.length && (this._$AR(s6 && s6._$AB.nextSibling, e8), i7.length = e8);
    }
    _$AR(t6 = this._$AA.nextSibling, i7) {
      var s6;
      for ((s6 = this._$AP) === null || s6 === void 0 || s6.call(this, false, true, i7); t6 && t6 !== this._$AB; ) {
        const i8 = t6.nextSibling;
        t6.remove(), t6 = i8;
      }
    }
    setConnected(t6) {
      var i7;
      this._$AM === void 0 && (this._$Cg = t6, (i7 = this._$AP) === null || i7 === void 0 || i7.call(this, t6));
    }
  };
  var S2 = class {
    constructor(t6, i7, s6, e8, o8) {
      this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t6, this.name = i7, this._$AM = e8, this.options = o8, s6.length > 2 || s6[0] !== "" || s6[1] !== "" ? (this._$AH = Array(s6.length - 1).fill(new String()), this.strings = s6) : this._$AH = T;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t6, i7 = this, s6, e8) {
      const o8 = this.strings;
      let n6 = false;
      if (o8 === void 0)
        t6 = V(this, t6, i7, 0), n6 = !r3(t6) || t6 !== this._$AH && t6 !== b, n6 && (this._$AH = t6);
      else {
        const e9 = t6;
        let l4, h3;
        for (t6 = o8[0], l4 = 0; l4 < o8.length - 1; l4++)
          h3 = V(this, e9[s6 + l4], i7, l4), h3 === b && (h3 = this._$AH[l4]), n6 || (n6 = !r3(h3) || h3 !== this._$AH[l4]), h3 === T ? t6 = T : t6 !== T && (t6 += (h3 != null ? h3 : "") + o8[l4 + 1]), this._$AH[l4] = h3;
      }
      n6 && !e8 && this.k(t6);
    }
    k(t6) {
      t6 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t6 != null ? t6 : "");
    }
  };
  var M = class extends S2 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    k(t6) {
      this.element[this.name] = t6 === T ? void 0 : t6;
    }
  };
  var k = i2 ? i2.emptyScript : "";
  var H = class extends S2 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    k(t6) {
      t6 && t6 !== T ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
    }
  };
  var I = class extends S2 {
    constructor(t6, i7, s6, e8, o8) {
      super(t6, i7, s6, e8, o8), this.type = 5;
    }
    _$AI(t6, i7 = this) {
      var s6;
      if ((t6 = (s6 = V(this, t6, i7, 0)) !== null && s6 !== void 0 ? s6 : T) === b)
        return;
      const e8 = this._$AH, o8 = t6 === T && e8 !== T || t6.capture !== e8.capture || t6.once !== e8.once || t6.passive !== e8.passive, n6 = t6 !== T && (e8 === T || o8);
      o8 && this.element.removeEventListener(this.name, this, e8), n6 && this.element.addEventListener(this.name, this, t6), this._$AH = t6;
    }
    handleEvent(t6) {
      var i7, s6;
      typeof this._$AH == "function" ? this._$AH.call((s6 = (i7 = this.options) === null || i7 === void 0 ? void 0 : i7.host) !== null && s6 !== void 0 ? s6 : this.element, t6) : this._$AH.handleEvent(t6);
    }
  };
  var L = class {
    constructor(t6, i7, s6) {
      this.element = t6, this.type = 6, this._$AN = void 0, this._$AM = i7, this.options = s6;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t6) {
      V(this, t6);
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
      var t6, e8;
      const i7 = super.createRenderRoot();
      return (t6 = (e8 = this.renderOptions).renderBefore) !== null && t6 !== void 0 || (e8.renderBefore = i7.firstChild), i7;
    }
    update(t6) {
      const i7 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t6), this._$Dt = w(i7, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t6;
      super.connectedCallback(), (t6 = this._$Dt) === null || t6 === void 0 || t6.setConnected(true);
    }
    disconnectedCallback() {
      var t6;
      super.disconnectedCallback(), (t6 = this._$Dt) === null || t6 === void 0 || t6.setConnected(false);
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
    const { kind: t6, elements: i7 } = e9;
    return { kind: t6, elements: i7, finisher(e10) {
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
    return (n6, t6) => t6 !== void 0 ? ((i7, e9, n7) => {
      e9.constructor.createProperty(n7, i7);
    })(e8, n6, t6) : i3(e8, n6);
  }

  // node_modules/@lit/reactive-element/decorators/state.js
  function t3(t6) {
    return e4({ ...t6, state: true });
  }

  // node_modules/@lit/reactive-element/decorators/base.js
  var o5 = ({ finisher: e8, descriptor: t6 }) => (o8, n6) => {
    var r4;
    if (n6 === void 0) {
      const n7 = (r4 = o8.originalKey) !== null && r4 !== void 0 ? r4 : o8.key, i7 = t6 != null ? { kind: "method", placement: "prototype", key: n7, descriptor: t6(o8.key) } : { ...o8, key: n7 };
      return e8 != null && (i7.finisher = function(t7) {
        e8(t7, n7);
      }), i7;
    }
    {
      const r5 = o8.constructor;
      t6 !== void 0 && Object.defineProperty(o8, n6, t6(n6)), e8 == null || e8(r5, n6);
    }
  };

  // node_modules/@lit/reactive-element/decorators/query.js
  function i4(i7, n6) {
    return o5({ descriptor: (o8) => {
      const t6 = { get() {
        var o9, n7;
        return (n7 = (o9 = this.renderRoot) === null || o9 === void 0 ? void 0 : o9.querySelector(i7)) !== null && n7 !== void 0 ? n7 : null;
      }, enumerable: true, configurable: true };
      if (n6) {
        const n7 = typeof o8 == "symbol" ? Symbol() : "__" + o8;
        t6.get = function() {
          var o9, t7;
          return this[n7] === void 0 && (this[n7] = (t7 = (o9 = this.renderRoot) === null || o9 === void 0 ? void 0 : o9.querySelector(i7)) !== null && t7 !== void 0 ? t7 : null), this[n7];
        };
      }
      return t6;
    } });
  }

  // site/js/site.ts
  var Site = class {
    static NavigateTo(page) {
      var _a;
      if (page.extension) {
        var extensions = this.GetInstalledExtensions();
        if (Object.keys(extensions).indexOf(page.page) != -1) {
          var newPage = document.getElementById(`extension-${page.page}`);
          if (newPage)
            this.SetPage(page, newPage);
          else {
            var extensionPage = document.createElement("extension-page");
            extensionPage.src = extensions[page.page].url;
            extensionPage.id = `extension-${page.page}`;
            (_a = document.getElementById("pages-container")) == null ? void 0 : _a.appendChild(extensionPage);
          }
        }
      } else
        this.SetPage(page, document.getElementById(page.page));
    }
    static SetPage(page, element) {
      var _a;
      if (element) {
        if (this.pageElement != null)
          this.pageElement.classList.add("hidden");
        element.classList.remove("hidden");
        this.pageElement = element;
        this.page = page;
        location.hash = page.extension ? `extension-${page.page}` : page.page;
        var navbar = document.querySelector("nav-bar");
        navbar.removeAttribute("editing");
        (_a = navbar.requestUpdate) == null ? void 0 : _a.call(navbar);
      }
    }
    static SetResources(resources) {
      return __async(this, null, function* () {
        var cache = yield caches.open("User Resources");
        var promises = [];
        resources.forEach((resourceGroup) => {
          var name = resourceGroup.name;
          var resource = resourceGroup.resource;
          promises.push(cache.put(name, new Response(resource)).then(() => {
            for (var callback of this.resourceCallbacks[name])
              callback(resource);
          }));
        });
        yield Promise.all(promises);
      });
    }
    static SetResource(name, resource) {
      return __async(this, null, function* () {
        var cache = yield caches.open("User Resources");
        yield cache.put(name, new Response(resource));
        if (name in this.resourceCallbacks) {
          for (var callback of this.resourceCallbacks[name])
            callback(resource);
        }
      });
    }
    static GetResource(name, callback) {
      return __async(this, null, function* () {
        if (name in this.resourceCallbacks)
          this.resourceCallbacks[name].push(callback);
        else
          this.resourceCallbacks[name] = [callback];
        var cache = yield caches.open("User Resources");
        var response = yield cache.match(name);
        if (response) {
          var resource = yield response.json();
          if (resource !== void 0 && resource !== null)
            callback(resource);
        }
      });
    }
    static GetInstalledExtensions() {
      return JSON.parse(localStorage.getItem("Installed Extensions")) || {};
    }
    static SetDark(dark2) {
      this.dark = dark2;
      document.documentElement.classList.toggle("dark", dark2);
    }
    static SetColour(hue) {
      document.documentElement.style.setProperty("--main-hue", hue);
      document.documentElement.style.setProperty("--hue-rotate", `${parseFloat(hue) - 200}deg`);
    }
  };
  Site.page = {
    page: "dailytimetable",
    extension: false
  };
  Site.dark = false;
  Site.pageElement = null;
  Site.resourceCallbacks = {};
  if (location.hash)
    Site.NavigateTo({
      page: location.hash.substring(1),
      extension: location.hash.indexOf("extension-") == 1
    });
  var dark = localStorage.getItem("Dark") == "true";
  Site.SetDark(dark);

  // site/css/default/text.css
  var styles = r`:where(h1, h2, h3, h4, h5, h6, p, li) {
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

:where(blockquote) {
    border-left: calc(var(--font-size) / 2) solid var(--surface4);
    margin: 0;
    padding-left: calc(var(--font-size) / 4 * 3);
}`;
  var text_default = styles;

  // site/css/default/img.css
  var styles2 = r`:where(img, svg) {
    filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
    cursor: default;

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}
`;
  var img_default = styles2;

  // site/css/default/elements/element.css
  var styles3 = r`:host {
    box-shadow: var(--shadow);
    background-color: var(--surface2);
    border-radius: 2vmin;
}`;
  var element_default = styles3;

  // site/css/default/elements/full.css
  var styles4 = r`:host {
    flex: 1;
    margin: 1%;
}

/*
    306px is 102% of 300px.
    We use 102% because that includes the margin,
    which is 1% either side.
*/
@media (max-width: 306px) {
    :host {
        margin: 1% calc(50% - 150px);
    }
}

@media (max-width: 300px) {
    :host {
        margin: 1% 0;
    }
}`;
  var full_default = styles4;

  // site/js/elements/barcode/barcode.css
  var styles5 = r`:host {
    position: relative;
}

#point1,
#point2 {
    --size: 3vmin;

    position: absolute;

    width: var(--size);
    height: var(--size);

    background-color: var(--surface4);
    border-radius: calc(var(--size) / 2);

    transform: translate(-50%, -50%);

    z-index: 1;

    cursor: move;
}

#barcodeDisplay {
    position: absolute;

    box-sizing: border-box;

    filter: contrast(5);
}

#barcodeDisplay.outline {
    border: solid 1vmin var(--text1);
}

info-popup {
    margin-top: 1vmin;
    margin-left: 1vmin;
    width: 5vmin;
    height: 5vmin;
    --max-width: 30vmax;
    --offset: 7vmin;
    z-index: 2;
}`;
  var barcode_default = styles5;

  // site/js/elements/barcode/barcode.ts
  var StudentBarcode = class extends s4 {
    constructor() {
      super();
      this.barcode = null;
      this.point1 = null;
      this.point2 = null;
      this.draggedElement = null;
      this.dragging = false;
      this.studentId = "";
      this.loading = true;
      this.addEventListener("pointermove", this.DragPoint);
      this.addEventListener("pointerup", this.EndDrag);
      Site.GetResource("userinfo", (resource) => {
        this.studentId = resource.studentId;
        this.loading = false;
      });
    }
    StartDrag(e8) {
      e8.preventDefault();
      this.draggedElement = e8.target;
      this.style.cursor = "move";
      return false;
    }
    DragPoint(e8) {
      if (this.draggedElement == null)
        return true;
      e8.preventDefault();
      if (!this.dragging) {
        this.dragging = true;
        this.draggedElement.style.left = `${(e8.clientX - this.offsetLeft) / this.clientWidth * 100}%`;
        this.draggedElement.style.top = `${(e8.clientY - this.offsetTop) / this.clientHeight * 100}%`;
        this.SetBarcodePosition();
        this.dragging = false;
      }
      return false;
    }
    EndDrag() {
      this.draggedElement = null;
      this.removeAttribute("style");
      this.RenderBarcode();
    }
    SetBarcodePosition() {
      var _a, _b, _c, _d;
      if (this.barcode == null)
        return;
      var x1 = parseFloat(((_a = this.point1) == null ? void 0 : _a.style.left.substring(0, this.point1.style.left.length - 1)) || "0");
      var y1 = parseFloat(((_b = this.point1) == null ? void 0 : _b.style.top.substring(0, this.point1.style.top.length - 1)) || "0");
      var x2 = parseFloat(((_c = this.point2) == null ? void 0 : _c.style.left.substring(0, this.point2.style.left.length - 1)) || "0");
      var y2 = parseFloat(((_d = this.point2) == null ? void 0 : _d.style.top.substring(0, this.point2.style.top.length - 1)) || "0");
      var maxX = Math.max(x1, x2);
      var minX = Math.min(x1, x2);
      var maxY = Math.max(y1, y2);
      var minY = Math.min(y1, y2);
      this.barcode.style.left = `${minX}%`;
      this.barcode.style.top = `${minY}%`;
      this.barcode.style.width = `${maxX - minX}%`;
      this.barcode.style.height = `${maxY - minY}%`;
    }
    RenderBarcode() {
      if (this.draggedElement != null)
        return;
      if (this.barcode == null)
        return;
      try {
        JsBarcode(this.barcode, this.studentId, {
          displayValue: false,
          margin: 0
        });
      } catch (e8) {
      }
    }
    updated() {
      this.RenderBarcode();
    }
    render() {
      if (this.loading)
        return p`<loading-indicator></loading-indicator>`;
      return p`
            <info-popup>Use this barcode to scan in instead of your Student Card.</info-popup>

            <div id="point1" style="top: 20%; left: 20%;" @pointerdown="${this.StartDrag}" @pointermove="${(e8) => e8.stopPropagation()}"></div>
            <div id="point2" style="top: 40%; left: 80%;" @pointerdown="${this.StartDrag}" @pointermove="${(e8) => e8.stopPropagation()}"></div>

            <canvas id="barcodeDisplay" class="${Site.dark ? "outline" : ""}" style="top: 20%; left: 20%; width: 60%; height: 20%;"></canvas>
        `;
    }
  };
  StudentBarcode.styles = [element_default, full_default, text_default, img_default, barcode_default];
  __decorateClass([
    i4("#barcodeDisplay")
  ], StudentBarcode.prototype, "barcode", 2);
  __decorateClass([
    i4("#point1")
  ], StudentBarcode.prototype, "point1", 2);
  __decorateClass([
    i4("#point2")
  ], StudentBarcode.prototype, "point2", 2);
  __decorateClass([
    t3()
  ], StudentBarcode.prototype, "studentId", 2);
  __decorateClass([
    t3()
  ], StudentBarcode.prototype, "loading", 2);
  StudentBarcode = __decorateClass([
    n5("student-barcode")
  ], StudentBarcode);

  // site/js/elements/extensions/extensions.css
  var styles6 = r``;
  var extensions_default = styles6;

  // site/js/elements/extensions/extensions.ts
  var ExtensionPage = class extends s4 {
    constructor() {
      super(...arguments);
      this.src = "";
      this.frame = null;
      this.loader = null;
    }
    firstUpdated() {
      var _a;
      (_a = this.frame) == null ? void 0 : _a.addEventListener("load", () => {
        var _a2, _b;
        (_a2 = this.loader) == null ? void 0 : _a2.remove();
        (_b = this.frame) == null ? void 0 : _b.removeAttribute("style");
      });
    }
    render() {
      return p`
            <iframe sandbox="allow-scripts allow-same-origin" src="${this.src}" style="display: none"></iframe>
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

  // node_modules/lit-html/directive.js
  var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e5 = (t6) => (...e8) => ({ _$litDirective$: t6, values: e8 });
  var i5 = class {
    constructor(t6) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t6, e8, i7) {
      this._$Ct = t6, this._$AM = e8, this._$Ci = i7;
    }
    _$AS(t6, e8) {
      return this.update(t6, e8);
    }
    update(t6, e8) {
      return this.render(...e8);
    }
  };

  // node_modules/lit-html/directives/unsafe-html.js
  var e6 = class extends i5 {
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
  e6.directiveName = "unsafeHTML", e6.resultType = 1;
  var o6 = e5(e6);

  // node_modules/lit-html/directives/unsafe-svg.js
  var t5 = class extends e6 {
  };
  t5.directiveName = "unsafeSVG", t5.resultType = 2;
  var o7 = e5(t5);

  // site/js/elements/info/info.css
  var styles7 = r`:host {
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
    width: var(--max-width);

    background-color: var(--surface2);

    border-radius: 2vmin;
    box-shadow: var(--shadow);
    padding: 2vmin;

    z-index: inherit;
}`;
  var info_default = styles7;

  // site/images/info.svg
  var info_default2 = '<?xml version="1.0" encoding="utf-8"?>\r\n<svg width="210px" height="210px" viewBox="0 0 210 210" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">\r\n  <g id="Group" transform="translate(5 5)">\r\n    <path d="M0 100C0 44.7715 44.7715 0 100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100Z" id="Ellipse" fill="none" fill-rule="evenodd" stroke="#323232" stroke-width="10" />\r\n    <g id="" transform="translate(58 37)">\r\n      <path d="M32.7841 86.4091L32.7841 85.7954Q32.8864 76.0284 34.8295 70.25Q36.7727 64.4716 40.3523 60.892Q43.9318 57.3125 48.9432 54.2954Q53.4432 51.5852 56.5114 47.1875Q59.5795 42.7898 59.5795 36.7045Q59.5795 29.1875 54.4915 24.7642Q49.4034 20.3409 42.1932 20.3409Q38 20.3409 34.1136 22.0795Q30.2273 23.8182 27.6193 27.5511Q25.0114 31.2841 24.6023 37.3182L11.7159 37.3182Q12.125 28.625 16.2415 22.4375Q20.358 16.25 27.1335 12.9773Q33.9091 9.70454 42.1932 9.70454Q51.1932 9.70454 57.8665 13.2841Q64.5398 16.8636 68.196 23.1023Q71.8523 29.3409 71.8523 37.3182Q71.8523 45.8068 68.0682 51.8409Q64.2841 57.875 57.5341 61.9659Q50.7841 66.1591 47.9972 71.2216Q45.2102 76.2841 45.0568 85.7954L45.0568 86.4091L32.7841 86.4091ZM39.3295 116.682Q35.5454 116.682 32.8352 113.972Q30.125 111.261 30.125 107.477Q30.125 103.693 32.8352 100.983Q35.5454 98.2727 39.3295 98.2727Q43.1136 98.2727 45.8239 100.983Q48.5341 103.693 48.5341 107.477Q48.5341 111.261 45.8239 113.972Q43.1136 116.682 39.3295 116.682Z" />\r\n    </g>\r\n  </g>\r\n</svg>';

  // site/js/elements/info/info.ts
  var Info = class extends s4 {
    constructor() {
      super(...arguments);
      this.info = null;
    }
    ShowPopup() {
      var _a;
      (_a = this.info) == null ? void 0 : _a.style.removeProperty("display");
    }
    HidePopup() {
      if (this.info != null)
        this.info.style.display = "none";
    }
    render() {
      return p`
            <button @pointerover=${this.ShowPopup} @pointerleave=${this.HidePopup}>
                ${o7(info_default2)}
            </button>

            <slot style="display: none"></slot>
        `;
    }
  };
  Info.styles = [img_default, info_default];
  __decorateClass([
    i4("slot", true)
  ], Info.prototype, "info", 2);
  Info = __decorateClass([
    n5("info-popup")
  ], Info);

  // site/js/elements/loader/loader.css
  var styles8 = r`:host {
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
}`;
  var loader_default = styles8;

  // site/js/elements/loader/loader.ts
  var LoadingIndicator = class extends s4 {
    render() {
      return p`
            <img draggable="false" class="spinner" src="images/rings.svg" />
        `;
    }
  };
  LoadingIndicator.styles = loader_default;
  LoadingIndicator = __decorateClass([
    n5("loading-indicator")
  ], LoadingIndicator);

  // node_modules/lit-html/directive-helpers.js
  var { H: i6 } = R;
  var e7 = () => document.createComment("");
  var u2 = (o8, t6, n6) => {
    var v2;
    const l4 = o8._$AA.parentNode, d2 = t6 === void 0 ? o8._$AB : t6._$AA;
    if (n6 === void 0) {
      const t7 = l4.insertBefore(e7(), d2), v3 = l4.insertBefore(e7(), d2);
      n6 = new i6(t7, v3, o8, o8.options);
    } else {
      const i7 = n6._$AB.nextSibling, t7 = n6._$AM, r4 = t7 !== o8;
      if (r4) {
        let i8;
        (v2 = n6._$AQ) === null || v2 === void 0 || v2.call(n6, o8), n6._$AM = o8, n6._$AP !== void 0 && (i8 = o8._$AU) !== t7._$AU && n6._$AP(i8);
      }
      if (i7 !== d2 || r4) {
        let o9 = n6._$AA;
        for (; o9 !== i7; ) {
          const i8 = o9.nextSibling;
          l4.insertBefore(o9, d2), o9 = i8;
        }
      }
    }
    return n6;
  };
  var c2 = (o8, i7, t6 = o8) => (o8._$AI(i7, t6), o8);
  var f2 = {};
  var s5 = (o8, i7 = f2) => o8._$AH = i7;
  var a3 = (o8) => o8._$AH;
  var m2 = (o8) => {
    var i7;
    (i7 = o8._$AP) === null || i7 === void 0 || i7.call(o8, false, true);
    let t6 = o8._$AA;
    const n6 = o8._$AB.nextSibling;
    for (; t6 !== n6; ) {
      const o9 = t6.nextSibling;
      t6.remove(), t6 = o9;
    }
  };

  // node_modules/lit-html/directives/repeat.js
  var u3 = (e8, s6, t6) => {
    const r4 = /* @__PURE__ */ new Map();
    for (let l4 = s6; l4 <= t6; l4++)
      r4.set(e8[l4], l4);
    return r4;
  };
  var c3 = e5(class extends i5 {
    constructor(e8) {
      if (super(e8), e8.type !== t4.CHILD)
        throw Error("repeat() can only be used in text expressions");
    }
    dt(e8, s6, t6) {
      let r4;
      t6 === void 0 ? t6 = s6 : s6 !== void 0 && (r4 = s6);
      const l4 = [], o8 = [];
      let i7 = 0;
      for (const s7 of e8)
        l4[i7] = r4 ? r4(s7, i7) : i7, o8[i7] = t6(s7, i7), i7++;
      return { values: o8, keys: l4 };
    }
    render(e8, s6, t6) {
      return this.dt(e8, s6, t6).values;
    }
    update(s6, [t6, r4, c4]) {
      var d2;
      const a4 = a3(s6), { values: p2, keys: v2 } = this.dt(t6, r4, c4);
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
            const e8 = x2.get(v2[w2]), t7 = e8 !== void 0 ? a4[e8] : null;
            if (t7 === null) {
              const e9 = u2(s6, a4[j]);
              c2(e9, p2[w2]), m3[w2] = e9;
            } else
              m3[w2] = c2(t7, p2[w2]), u2(s6, a4[j], t7), a4[e8] = null;
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

  // site/js/elements/navbar/navbar.css
  var styles9 = r`:host {
    flex-shrink: 0;

    background-color: var(--surface3);
    box-shadow: var(--small-shadow);
    
    overflow: hidden;

    box-sizing: border-box;

    z-index: 100;
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
  var navbar_default = styles9;

  // node_modules/sortablejs/modular/sortable.core.esm.js
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) {
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i7 = 1; i7 < arguments.length; i7++) {
      var source = arguments[i7] != null ? arguments[i7] : {};
      if (i7 % 2) {
        ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i7 = 1; i7 < arguments.length; i7++) {
        var source = arguments[i7];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i7;
    for (i7 = 0; i7 < sourceKeys.length; i7++) {
      key = sourceKeys[i7];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null)
      return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i7;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i7 = 0; i7 < sourceSymbolKeys.length; i7++) {
        key = sourceSymbolKeys[i7];
        if (excluded.indexOf(key) >= 0)
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  var version = "1.14.0";
  function userAgent(pattern) {
    if (typeof window !== "undefined" && window.navigator) {
      return !!/* @__PURE__ */ navigator.userAgent.match(pattern);
    }
  }
  var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
  var Edge = userAgent(/Edge/i);
  var FireFox = userAgent(/firefox/i);
  var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
  var IOS = userAgent(/iP(ad|od|hone)/i);
  var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
  var captureMode = {
    capture: false,
    passive: false
  };
  function on(el, event, fn) {
    el.addEventListener(event, fn, !IE11OrLess && captureMode);
  }
  function off(el, event, fn) {
    el.removeEventListener(event, fn, !IE11OrLess && captureMode);
  }
  function matches(el, selector) {
    if (!selector)
      return;
    selector[0] === ">" && (selector = selector.substring(1));
    if (el) {
      try {
        if (el.matches) {
          return el.matches(selector);
        } else if (el.msMatchesSelector) {
          return el.msMatchesSelector(selector);
        } else if (el.webkitMatchesSelector) {
          return el.webkitMatchesSelector(selector);
        }
      } catch (_2) {
        return false;
      }
    }
    return false;
  }
  function getParentOrHost(el) {
    return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
  }
  function closest(el, selector, ctx, includeCTX) {
    if (el) {
      ctx = ctx || document;
      do {
        if (selector != null && (selector[0] === ">" ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
          return el;
        }
        if (el === ctx)
          break;
      } while (el = getParentOrHost(el));
    }
    return null;
  }
  var R_SPACE = /\s+/g;
  function toggleClass(el, name, state) {
    if (el && name) {
      if (el.classList) {
        el.classList[state ? "add" : "remove"](name);
      } else {
        var className = (" " + el.className + " ").replace(R_SPACE, " ").replace(" " + name + " ", " ");
        el.className = (className + (state ? " " + name : "")).replace(R_SPACE, " ");
      }
    }
  }
  function css(el, prop, val) {
    var style = el && el.style;
    if (style) {
      if (val === void 0) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
          val = document.defaultView.getComputedStyle(el, "");
        } else if (el.currentStyle) {
          val = el.currentStyle;
        }
        return prop === void 0 ? val : val[prop];
      } else {
        if (!(prop in style) && prop.indexOf("webkit") === -1) {
          prop = "-webkit-" + prop;
        }
        style[prop] = val + (typeof val === "string" ? "" : "px");
      }
    }
  }
  function matrix(el, selfOnly) {
    var appliedTransforms = "";
    if (typeof el === "string") {
      appliedTransforms = el;
    } else {
      do {
        var transform = css(el, "transform");
        if (transform && transform !== "none") {
          appliedTransforms = transform + " " + appliedTransforms;
        }
      } while (!selfOnly && (el = el.parentNode));
    }
    var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
    return matrixFn && new matrixFn(appliedTransforms);
  }
  function find(ctx, tagName, iterator) {
    if (ctx) {
      var list = ctx.getElementsByTagName(tagName), i7 = 0, n6 = list.length;
      if (iterator) {
        for (; i7 < n6; i7++) {
          iterator(list[i7], i7);
        }
      }
      return list;
    }
    return [];
  }
  function getWindowScrollingElement() {
    var scrollingElement = document.scrollingElement;
    if (scrollingElement) {
      return scrollingElement;
    } else {
      return document.documentElement;
    }
  }
  function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
    if (!el.getBoundingClientRect && el !== window)
      return;
    var elRect, top, left, bottom, right, height, width;
    if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
      elRect = el.getBoundingClientRect();
      top = elRect.top;
      left = elRect.left;
      bottom = elRect.bottom;
      right = elRect.right;
      height = elRect.height;
      width = elRect.width;
    } else {
      top = 0;
      left = 0;
      bottom = window.innerHeight;
      right = window.innerWidth;
      height = window.innerHeight;
      width = window.innerWidth;
    }
    if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
      container = container || el.parentNode;
      if (!IE11OrLess) {
        do {
          if (container && container.getBoundingClientRect && (css(container, "transform") !== "none" || relativeToNonStaticParent && css(container, "position") !== "static")) {
            var containerRect = container.getBoundingClientRect();
            top -= containerRect.top + parseInt(css(container, "border-top-width"));
            left -= containerRect.left + parseInt(css(container, "border-left-width"));
            bottom = top + elRect.height;
            right = left + elRect.width;
            break;
          }
        } while (container = container.parentNode);
      }
    }
    if (undoScale && el !== window) {
      var elMatrix = matrix(container || el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d;
      if (elMatrix) {
        top /= scaleY;
        left /= scaleX;
        width /= scaleX;
        height /= scaleY;
        bottom = top + height;
        right = left + width;
      }
    }
    return {
      top,
      left,
      bottom,
      right,
      width,
      height
    };
  }
  function isScrolledPast(el, elSide, parentSide) {
    var parent = getParentAutoScrollElement(el, true), elSideVal = getRect(el)[elSide];
    while (parent) {
      var parentSideVal = getRect(parent)[parentSide], visible = void 0;
      if (parentSide === "top" || parentSide === "left") {
        visible = elSideVal >= parentSideVal;
      } else {
        visible = elSideVal <= parentSideVal;
      }
      if (!visible)
        return parent;
      if (parent === getWindowScrollingElement())
        break;
      parent = getParentAutoScrollElement(parent, false);
    }
    return false;
  }
  function getChild(el, childNum, options, includeDragEl) {
    var currentChild = 0, i7 = 0, children = el.children;
    while (i7 < children.length) {
      if (children[i7].style.display !== "none" && children[i7] !== Sortable.ghost && (includeDragEl || children[i7] !== Sortable.dragged) && closest(children[i7], options.draggable, el, false)) {
        if (currentChild === childNum) {
          return children[i7];
        }
        currentChild++;
      }
      i7++;
    }
    return null;
  }
  function lastChild(el, selector) {
    var last = el.lastElementChild;
    while (last && (last === Sortable.ghost || css(last, "display") === "none" || selector && !matches(last, selector))) {
      last = last.previousElementSibling;
    }
    return last || null;
  }
  function index(el, selector) {
    var index2 = 0;
    if (!el || !el.parentNode) {
      return -1;
    }
    while (el = el.previousElementSibling) {
      if (el.nodeName.toUpperCase() !== "TEMPLATE" && el !== Sortable.clone && (!selector || matches(el, selector))) {
        index2++;
      }
    }
    return index2;
  }
  function getRelativeScrollOffset(el) {
    var offsetLeft = 0, offsetTop = 0, winScroller = getWindowScrollingElement();
    if (el) {
      do {
        var elMatrix = matrix(el), scaleX = elMatrix.a, scaleY = elMatrix.d;
        offsetLeft += el.scrollLeft * scaleX;
        offsetTop += el.scrollTop * scaleY;
      } while (el !== winScroller && (el = el.parentNode));
    }
    return [offsetLeft, offsetTop];
  }
  function indexOfObject(arr, obj) {
    for (var i7 in arr) {
      if (!arr.hasOwnProperty(i7))
        continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === arr[i7][key])
          return Number(i7);
      }
    }
    return -1;
  }
  function getParentAutoScrollElement(el, includeSelf) {
    if (!el || !el.getBoundingClientRect)
      return getWindowScrollingElement();
    var elem = el;
    var gotSelf = false;
    do {
      if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
        var elemCSS = css(elem);
        if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == "auto" || elemCSS.overflowX == "scroll") || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == "auto" || elemCSS.overflowY == "scroll")) {
          if (!elem.getBoundingClientRect || elem === document.body)
            return getWindowScrollingElement();
          if (gotSelf || includeSelf)
            return elem;
          gotSelf = true;
        }
      }
    } while (elem = elem.parentNode);
    return getWindowScrollingElement();
  }
  function extend(dst, src) {
    if (dst && src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) {
          dst[key] = src[key];
        }
      }
    }
    return dst;
  }
  function isRectEqual(rect1, rect2) {
    return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
  }
  var _throttleTimeout;
  function throttle(callback, ms) {
    return function() {
      if (!_throttleTimeout) {
        var args = arguments, _this = this;
        if (args.length === 1) {
          callback.call(_this, args[0]);
        } else {
          callback.apply(_this, args);
        }
        _throttleTimeout = setTimeout(function() {
          _throttleTimeout = void 0;
        }, ms);
      }
    };
  }
  function cancelThrottle() {
    clearTimeout(_throttleTimeout);
    _throttleTimeout = void 0;
  }
  function scrollBy(el, x2, y2) {
    el.scrollLeft += x2;
    el.scrollTop += y2;
  }
  function clone(el) {
    var Polymer = window.Polymer;
    var $2 = window.jQuery || window.Zepto;
    if (Polymer && Polymer.dom) {
      return Polymer.dom(el).cloneNode(true);
    } else if ($2) {
      return $2(el).clone(true)[0];
    } else {
      return el.cloneNode(true);
    }
  }
  var expando = "Sortable" + new Date().getTime();
  function AnimationStateManager() {
    var animationStates = [], animationCallbackId;
    return {
      captureAnimationState: function captureAnimationState() {
        animationStates = [];
        if (!this.options.animation)
          return;
        var children = [].slice.call(this.el.children);
        children.forEach(function(child) {
          if (css(child, "display") === "none" || child === Sortable.ghost)
            return;
          animationStates.push({
            target: child,
            rect: getRect(child)
          });
          var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect);
          if (child.thisAnimationDuration) {
            var childMatrix = matrix(child, true);
            if (childMatrix) {
              fromRect.top -= childMatrix.f;
              fromRect.left -= childMatrix.e;
            }
          }
          child.fromRect = fromRect;
        });
      },
      addAnimationState: function addAnimationState(state) {
        animationStates.push(state);
      },
      removeAnimationState: function removeAnimationState(target) {
        animationStates.splice(indexOfObject(animationStates, {
          target
        }), 1);
      },
      animateAll: function animateAll(callback) {
        var _this = this;
        if (!this.options.animation) {
          clearTimeout(animationCallbackId);
          if (typeof callback === "function")
            callback();
          return;
        }
        var animating = false, animationTime = 0;
        animationStates.forEach(function(state) {
          var time = 0, target = state.target, fromRect = target.fromRect, toRect = getRect(target), prevFromRect = target.prevFromRect, prevToRect = target.prevToRect, animatingRect = state.rect, targetMatrix = matrix(target, true);
          if (targetMatrix) {
            toRect.top -= targetMatrix.f;
            toRect.left -= targetMatrix.e;
          }
          target.toRect = toRect;
          if (target.thisAnimationDuration) {
            if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
              time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
            }
          }
          if (!isRectEqual(toRect, fromRect)) {
            target.prevFromRect = fromRect;
            target.prevToRect = toRect;
            if (!time) {
              time = _this.options.animation;
            }
            _this.animate(target, animatingRect, toRect, time);
          }
          if (time) {
            animating = true;
            animationTime = Math.max(animationTime, time);
            clearTimeout(target.animationResetTimer);
            target.animationResetTimer = setTimeout(function() {
              target.animationTime = 0;
              target.prevFromRect = null;
              target.fromRect = null;
              target.prevToRect = null;
              target.thisAnimationDuration = null;
            }, time);
            target.thisAnimationDuration = time;
          }
        });
        clearTimeout(animationCallbackId);
        if (!animating) {
          if (typeof callback === "function")
            callback();
        } else {
          animationCallbackId = setTimeout(function() {
            if (typeof callback === "function")
              callback();
          }, animationTime);
        }
        animationStates = [];
      },
      animate: function animate(target, currentRect, toRect, duration) {
        if (duration) {
          css(target, "transition", "");
          css(target, "transform", "");
          var elMatrix = matrix(this.el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d, translateX = (currentRect.left - toRect.left) / (scaleX || 1), translateY = (currentRect.top - toRect.top) / (scaleY || 1);
          target.animatingX = !!translateX;
          target.animatingY = !!translateY;
          css(target, "transform", "translate3d(" + translateX + "px," + translateY + "px,0)");
          this.forRepaintDummy = repaint(target);
          css(target, "transition", "transform " + duration + "ms" + (this.options.easing ? " " + this.options.easing : ""));
          css(target, "transform", "translate3d(0,0,0)");
          typeof target.animated === "number" && clearTimeout(target.animated);
          target.animated = setTimeout(function() {
            css(target, "transition", "");
            css(target, "transform", "");
            target.animated = false;
            target.animatingX = false;
            target.animatingY = false;
          }, duration);
        }
      }
    };
  }
  function repaint(target) {
    return target.offsetWidth;
  }
  function calculateRealTime(animatingRect, fromRect, toRect, options) {
    return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
  }
  var plugins = [];
  var defaults = {
    initializeByDefault: true
  };
  var PluginManager = {
    mount: function mount(plugin) {
      for (var option2 in defaults) {
        if (defaults.hasOwnProperty(option2) && !(option2 in plugin)) {
          plugin[option2] = defaults[option2];
        }
      }
      plugins.forEach(function(p2) {
        if (p2.pluginName === plugin.pluginName) {
          throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
        }
      });
      plugins.push(plugin);
    },
    pluginEvent: function pluginEvent(eventName, sortable, evt) {
      var _this = this;
      this.eventCanceled = false;
      evt.cancel = function() {
        _this.eventCanceled = true;
      };
      var eventNameGlobal = eventName + "Global";
      plugins.forEach(function(plugin) {
        if (!sortable[plugin.pluginName])
          return;
        if (sortable[plugin.pluginName][eventNameGlobal]) {
          sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
            sortable
          }, evt));
        }
        if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
          sortable[plugin.pluginName][eventName](_objectSpread2({
            sortable
          }, evt));
        }
      });
    },
    initializePlugins: function initializePlugins(sortable, el, defaults2, options) {
      plugins.forEach(function(plugin) {
        var pluginName = plugin.pluginName;
        if (!sortable.options[pluginName] && !plugin.initializeByDefault)
          return;
        var initialized = new plugin(sortable, el, sortable.options);
        initialized.sortable = sortable;
        initialized.options = sortable.options;
        sortable[pluginName] = initialized;
        _extends(defaults2, initialized.defaults);
      });
      for (var option2 in sortable.options) {
        if (!sortable.options.hasOwnProperty(option2))
          continue;
        var modified = this.modifyOption(sortable, option2, sortable.options[option2]);
        if (typeof modified !== "undefined") {
          sortable.options[option2] = modified;
        }
      }
    },
    getEventProperties: function getEventProperties(name, sortable) {
      var eventProperties = {};
      plugins.forEach(function(plugin) {
        if (typeof plugin.eventProperties !== "function")
          return;
        _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
      });
      return eventProperties;
    },
    modifyOption: function modifyOption(sortable, name, value) {
      var modifiedValue;
      plugins.forEach(function(plugin) {
        if (!sortable[plugin.pluginName])
          return;
        if (plugin.optionListeners && typeof plugin.optionListeners[name] === "function") {
          modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
        }
      });
      return modifiedValue;
    }
  };
  function dispatchEvent(_ref) {
    var sortable = _ref.sortable, rootEl2 = _ref.rootEl, name = _ref.name, targetEl = _ref.targetEl, cloneEl2 = _ref.cloneEl, toEl = _ref.toEl, fromEl = _ref.fromEl, oldIndex2 = _ref.oldIndex, newIndex2 = _ref.newIndex, oldDraggableIndex2 = _ref.oldDraggableIndex, newDraggableIndex2 = _ref.newDraggableIndex, originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, extraEventProperties = _ref.extraEventProperties;
    sortable = sortable || rootEl2 && rootEl2[expando];
    if (!sortable)
      return;
    var evt, options = sortable.options, onName = "on" + name.charAt(0).toUpperCase() + name.substr(1);
    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent(name, {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent("Event");
      evt.initEvent(name, true, true);
    }
    evt.to = toEl || rootEl2;
    evt.from = fromEl || rootEl2;
    evt.item = targetEl || rootEl2;
    evt.clone = cloneEl2;
    evt.oldIndex = oldIndex2;
    evt.newIndex = newIndex2;
    evt.oldDraggableIndex = oldDraggableIndex2;
    evt.newDraggableIndex = newDraggableIndex2;
    evt.originalEvent = originalEvent;
    evt.pullMode = putSortable2 ? putSortable2.lastPutMode : void 0;
    var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));
    for (var option2 in allEventProperties) {
      evt[option2] = allEventProperties[option2];
    }
    if (rootEl2) {
      rootEl2.dispatchEvent(evt);
    }
    if (options[onName]) {
      options[onName].call(sortable, evt);
    }
  }
  var _excluded = ["evt"];
  var pluginEvent2 = function pluginEvent3(eventName, sortable) {
    var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, originalEvent = _ref.evt, data = _objectWithoutProperties(_ref, _excluded);
    PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread2({
      dragEl,
      parentEl,
      ghostEl,
      rootEl,
      nextEl,
      lastDownEl,
      cloneEl,
      cloneHidden,
      dragStarted: moved,
      putSortable,
      activeSortable: Sortable.active,
      originalEvent,
      oldIndex,
      oldDraggableIndex,
      newIndex,
      newDraggableIndex,
      hideGhostForTarget: _hideGhostForTarget,
      unhideGhostForTarget: _unhideGhostForTarget,
      cloneNowHidden: function cloneNowHidden() {
        cloneHidden = true;
      },
      cloneNowShown: function cloneNowShown() {
        cloneHidden = false;
      },
      dispatchSortableEvent: function dispatchSortableEvent(name) {
        _dispatchEvent({
          sortable,
          name,
          originalEvent
        });
      }
    }, data));
  };
  function _dispatchEvent(info) {
    dispatchEvent(_objectSpread2({
      putSortable,
      cloneEl,
      targetEl: dragEl,
      rootEl,
      oldIndex,
      oldDraggableIndex,
      newIndex,
      newDraggableIndex
    }, info));
  }
  var dragEl;
  var parentEl;
  var ghostEl;
  var rootEl;
  var nextEl;
  var lastDownEl;
  var cloneEl;
  var cloneHidden;
  var oldIndex;
  var newIndex;
  var oldDraggableIndex;
  var newDraggableIndex;
  var activeGroup;
  var putSortable;
  var awaitingDragStarted = false;
  var ignoreNextClick = false;
  var sortables = [];
  var tapEvt;
  var touchEvt;
  var lastDx;
  var lastDy;
  var tapDistanceLeft;
  var tapDistanceTop;
  var moved;
  var lastTarget;
  var lastDirection;
  var pastFirstInvertThresh = false;
  var isCircumstantialInvert = false;
  var targetMoveDistance;
  var ghostRelativeParent;
  var ghostRelativeParentInitialScroll = [];
  var _silent = false;
  var savedInputChecked = [];
  var documentExists = typeof document !== "undefined";
  var PositionGhostAbsolutely = IOS;
  var CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float";
  var supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div");
  var supportCssPointerEvents = function() {
    if (!documentExists)
      return;
    if (IE11OrLess) {
      return false;
    }
    var el = document.createElement("x");
    el.style.cssText = "pointer-events:auto";
    return el.style.pointerEvents === "auto";
  }();
  var _detectDirection = function _detectDirection2(el, options) {
    var elCSS = css(el), elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth), child1 = getChild(el, 0, options), child2 = getChild(el, 1, options), firstChildCSS = child1 && css(child1), secondChildCSS = child2 && css(child2), firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width, secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;
    if (elCSS.display === "flex") {
      return elCSS.flexDirection === "column" || elCSS.flexDirection === "column-reverse" ? "vertical" : "horizontal";
    }
    if (elCSS.display === "grid") {
      return elCSS.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
    }
    if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== "none") {
      var touchingSideChild2 = firstChildCSS["float"] === "left" ? "left" : "right";
      return child2 && (secondChildCSS.clear === "both" || secondChildCSS.clear === touchingSideChild2) ? "vertical" : "horizontal";
    }
    return child1 && (firstChildCSS.display === "block" || firstChildCSS.display === "flex" || firstChildCSS.display === "table" || firstChildCSS.display === "grid" || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === "none" || child2 && elCSS[CSSFloatProperty] === "none" && firstChildWidth + secondChildWidth > elWidth) ? "vertical" : "horizontal";
  };
  var _dragElInRowColumn = function _dragElInRowColumn2(dragRect, targetRect, vertical) {
    var dragElS1Opp = vertical ? dragRect.left : dragRect.top, dragElS2Opp = vertical ? dragRect.right : dragRect.bottom, dragElOppLength = vertical ? dragRect.width : dragRect.height, targetS1Opp = vertical ? targetRect.left : targetRect.top, targetS2Opp = vertical ? targetRect.right : targetRect.bottom, targetOppLength = vertical ? targetRect.width : targetRect.height;
    return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
  };
  var _detectNearestEmptySortable = function _detectNearestEmptySortable2(x2, y2) {
    var ret;
    sortables.some(function(sortable) {
      var threshold = sortable[expando].options.emptyInsertThreshold;
      if (!threshold || lastChild(sortable))
        return;
      var rect = getRect(sortable), insideHorizontally = x2 >= rect.left - threshold && x2 <= rect.right + threshold, insideVertically = y2 >= rect.top - threshold && y2 <= rect.bottom + threshold;
      if (insideHorizontally && insideVertically) {
        return ret = sortable;
      }
    });
    return ret;
  };
  var _prepareGroup = function _prepareGroup2(options) {
    function toFn(value, pull) {
      return function(to, from, dragEl2, evt) {
        var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;
        if (value == null && (pull || sameGroup)) {
          return true;
        } else if (value == null || value === false) {
          return false;
        } else if (pull && value === "clone") {
          return value;
        } else if (typeof value === "function") {
          return toFn(value(to, from, dragEl2, evt), pull)(to, from, dragEl2, evt);
        } else {
          var otherGroup = (pull ? to : from).options.group.name;
          return value === true || typeof value === "string" && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
        }
      };
    }
    var group = {};
    var originalGroup = options.group;
    if (!originalGroup || _typeof(originalGroup) != "object") {
      originalGroup = {
        name: originalGroup
      };
    }
    group.name = originalGroup.name;
    group.checkPull = toFn(originalGroup.pull, true);
    group.checkPut = toFn(originalGroup.put);
    group.revertClone = originalGroup.revertClone;
    options.group = group;
  };
  var _hideGhostForTarget = function _hideGhostForTarget2() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, "display", "none");
    }
  };
  var _unhideGhostForTarget = function _unhideGhostForTarget2() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, "display", "");
    }
  };
  if (documentExists) {
    document.addEventListener("click", function(evt) {
      if (ignoreNextClick) {
        evt.preventDefault();
        evt.stopPropagation && evt.stopPropagation();
        evt.stopImmediatePropagation && evt.stopImmediatePropagation();
        ignoreNextClick = false;
        return false;
      }
    }, true);
  }
  var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent2(evt) {
    if (dragEl) {
      evt = evt.touches ? evt.touches[0] : evt;
      var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
      if (nearest) {
        var event = {};
        for (var i7 in evt) {
          if (evt.hasOwnProperty(i7)) {
            event[i7] = evt[i7];
          }
        }
        event.target = event.rootEl = nearest;
        event.preventDefault = void 0;
        event.stopPropagation = void 0;
        nearest[expando]._onDragOver(event);
      }
    }
  };
  var _checkOutsideTargetEl = function _checkOutsideTargetEl2(evt) {
    if (dragEl) {
      dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
    }
  };
  function Sortable(el, options) {
    if (!(el && el.nodeType && el.nodeType === 1)) {
      throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
    }
    this.el = el;
    this.options = options = _extends({}, options);
    el[expando] = this;
    var defaults2 = {
      group: null,
      sort: true,
      disabled: false,
      store: null,
      handle: null,
      draggable: /^[uo]l$/i.test(el.nodeName) ? ">li" : ">*",
      swapThreshold: 1,
      invertSwap: false,
      invertedSwapThreshold: null,
      removeCloneOnHide: true,
      direction: function direction() {
        return _detectDirection(el, this.options);
      },
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      ignore: "a, img",
      filter: null,
      preventOnFilter: true,
      animation: 0,
      easing: null,
      setData: function setData(dataTransfer, dragEl2) {
        dataTransfer.setData("Text", dragEl2.textContent);
      },
      dropBubble: false,
      dragoverBubble: false,
      dataIdAttr: "data-id",
      delay: 0,
      delayOnTouchOnly: false,
      touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
      forceFallback: false,
      fallbackClass: "sortable-fallback",
      fallbackOnBody: false,
      fallbackTolerance: 0,
      fallbackOffset: {
        x: 0,
        y: 0
      },
      supportPointer: Sortable.supportPointer !== false && "PointerEvent" in window && !Safari,
      emptyInsertThreshold: 5
    };
    PluginManager.initializePlugins(this, el, defaults2);
    for (var name in defaults2) {
      !(name in options) && (options[name] = defaults2[name]);
    }
    _prepareGroup(options);
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    }
    this.nativeDraggable = options.forceFallback ? false : supportDraggable;
    if (this.nativeDraggable) {
      this.options.touchStartThreshold = 1;
    }
    if (options.supportPointer) {
      on(el, "pointerdown", this._onTapStart);
    } else {
      on(el, "mousedown", this._onTapStart);
      on(el, "touchstart", this._onTapStart);
    }
    if (this.nativeDraggable) {
      on(el, "dragover", this);
      on(el, "dragenter", this);
    }
    sortables.push(this.el);
    options.store && options.store.get && this.sort(options.store.get(this) || []);
    _extends(this, AnimationStateManager());
  }
  Sortable.prototype = {
    constructor: Sortable,
    _isOutsideThisEl: function _isOutsideThisEl(target) {
      if (!this.el.contains(target) && target !== this.el) {
        lastTarget = null;
      }
    },
    _getDirection: function _getDirection(evt, target) {
      return typeof this.options.direction === "function" ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
    },
    _onTapStart: function _onTapStart(evt) {
      if (!evt.cancelable)
        return;
      var _this = this, el = this.el, options = this.options, preventOnFilter = options.preventOnFilter, type = evt.type, touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === "touch" && evt, target = (touch || evt).target, originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target, filter = options.filter;
      _saveInputCheckedState(el);
      if (dragEl) {
        return;
      }
      if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
        return;
      }
      if (originalTarget.isContentEditable) {
        return;
      }
      if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === "SELECT") {
        return;
      }
      target = closest(target, options.draggable, el, false);
      if (target && target.animated) {
        return;
      }
      if (lastDownEl === target) {
        return;
      }
      oldIndex = index(target);
      oldDraggableIndex = index(target, options.draggable);
      if (typeof filter === "function") {
        if (filter.call(this, evt, target, this)) {
          _dispatchEvent({
            sortable: _this,
            rootEl: originalTarget,
            name: "filter",
            targetEl: target,
            toEl: el,
            fromEl: el
          });
          pluginEvent2("filter", _this, {
            evt
          });
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return;
        }
      } else if (filter) {
        filter = filter.split(",").some(function(criteria) {
          criteria = closest(originalTarget, criteria.trim(), el, false);
          if (criteria) {
            _dispatchEvent({
              sortable: _this,
              rootEl: criteria,
              name: "filter",
              targetEl: target,
              fromEl: el,
              toEl: el
            });
            pluginEvent2("filter", _this, {
              evt
            });
            return true;
          }
        });
        if (filter) {
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return;
        }
      }
      if (options.handle && !closest(originalTarget, options.handle, el, false)) {
        return;
      }
      this._prepareDragStart(evt, touch, target);
    },
    _prepareDragStart: function _prepareDragStart(evt, touch, target) {
      var _this = this, el = _this.el, options = _this.options, ownerDocument = el.ownerDocument, dragStartFn;
      if (target && !dragEl && target.parentNode === el) {
        var dragRect = getRect(target);
        rootEl = el;
        dragEl = target;
        parentEl = dragEl.parentNode;
        nextEl = dragEl.nextSibling;
        lastDownEl = target;
        activeGroup = options.group;
        Sortable.dragged = dragEl;
        tapEvt = {
          target: dragEl,
          clientX: (touch || evt).clientX,
          clientY: (touch || evt).clientY
        };
        tapDistanceLeft = tapEvt.clientX - dragRect.left;
        tapDistanceTop = tapEvt.clientY - dragRect.top;
        this._lastX = (touch || evt).clientX;
        this._lastY = (touch || evt).clientY;
        dragEl.style["will-change"] = "all";
        dragStartFn = function dragStartFn2() {
          pluginEvent2("delayEnded", _this, {
            evt
          });
          if (Sortable.eventCanceled) {
            _this._onDrop();
            return;
          }
          _this._disableDelayedDragEvents();
          if (!FireFox && _this.nativeDraggable) {
            dragEl.draggable = true;
          }
          _this._triggerDragStart(evt, touch);
          _dispatchEvent({
            sortable: _this,
            name: "choose",
            originalEvent: evt
          });
          toggleClass(dragEl, options.chosenClass, true);
        };
        options.ignore.split(",").forEach(function(criteria) {
          find(dragEl, criteria.trim(), _disableDraggable);
        });
        on(ownerDocument, "dragover", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "mousemove", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "touchmove", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "mouseup", _this._onDrop);
        on(ownerDocument, "touchend", _this._onDrop);
        on(ownerDocument, "touchcancel", _this._onDrop);
        if (FireFox && this.nativeDraggable) {
          this.options.touchStartThreshold = 4;
          dragEl.draggable = true;
        }
        pluginEvent2("delayStart", this, {
          evt
        });
        if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
          if (Sortable.eventCanceled) {
            this._onDrop();
            return;
          }
          on(ownerDocument, "mouseup", _this._disableDelayedDrag);
          on(ownerDocument, "touchend", _this._disableDelayedDrag);
          on(ownerDocument, "touchcancel", _this._disableDelayedDrag);
          on(ownerDocument, "mousemove", _this._delayedDragTouchMoveHandler);
          on(ownerDocument, "touchmove", _this._delayedDragTouchMoveHandler);
          options.supportPointer && on(ownerDocument, "pointermove", _this._delayedDragTouchMoveHandler);
          _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
        } else {
          dragStartFn();
        }
      }
    },
    _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(e8) {
      var touch = e8.touches ? e8.touches[0] : e8;
      if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
        this._disableDelayedDrag();
      }
    },
    _disableDelayedDrag: function _disableDelayedDrag() {
      dragEl && _disableDraggable(dragEl);
      clearTimeout(this._dragStartTimer);
      this._disableDelayedDragEvents();
    },
    _disableDelayedDragEvents: function _disableDelayedDragEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, "mouseup", this._disableDelayedDrag);
      off(ownerDocument, "touchend", this._disableDelayedDrag);
      off(ownerDocument, "touchcancel", this._disableDelayedDrag);
      off(ownerDocument, "mousemove", this._delayedDragTouchMoveHandler);
      off(ownerDocument, "touchmove", this._delayedDragTouchMoveHandler);
      off(ownerDocument, "pointermove", this._delayedDragTouchMoveHandler);
    },
    _triggerDragStart: function _triggerDragStart(evt, touch) {
      touch = touch || evt.pointerType == "touch" && evt;
      if (!this.nativeDraggable || touch) {
        if (this.options.supportPointer) {
          on(document, "pointermove", this._onTouchMove);
        } else if (touch) {
          on(document, "touchmove", this._onTouchMove);
        } else {
          on(document, "mousemove", this._onTouchMove);
        }
      } else {
        on(dragEl, "dragend", this);
        on(rootEl, "dragstart", this._onDragStart);
      }
      try {
        if (document.selection) {
          _nextTick(function() {
            document.selection.empty();
          });
        } else {
          window.getSelection().removeAllRanges();
        }
      } catch (err) {
      }
    },
    _dragStarted: function _dragStarted(fallback, evt) {
      awaitingDragStarted = false;
      if (rootEl && dragEl) {
        pluginEvent2("dragStarted", this, {
          evt
        });
        if (this.nativeDraggable) {
          on(document, "dragover", _checkOutsideTargetEl);
        }
        var options = this.options;
        !fallback && toggleClass(dragEl, options.dragClass, false);
        toggleClass(dragEl, options.ghostClass, true);
        Sortable.active = this;
        fallback && this._appendGhost();
        _dispatchEvent({
          sortable: this,
          name: "start",
          originalEvent: evt
        });
      } else {
        this._nulling();
      }
    },
    _emulateDragOver: function _emulateDragOver() {
      if (touchEvt) {
        this._lastX = touchEvt.clientX;
        this._lastY = touchEvt.clientY;
        _hideGhostForTarget();
        var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        var parent = target;
        while (target && target.shadowRoot) {
          target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
          if (target === parent)
            break;
          parent = target;
        }
        dragEl.parentNode[expando]._isOutsideThisEl(target);
        if (parent) {
          do {
            if (parent[expando]) {
              var inserted = void 0;
              inserted = parent[expando]._onDragOver({
                clientX: touchEvt.clientX,
                clientY: touchEvt.clientY,
                target,
                rootEl: parent
              });
              if (inserted && !this.options.dragoverBubble) {
                break;
              }
            }
            target = parent;
          } while (parent = parent.parentNode);
        }
        _unhideGhostForTarget();
      }
    },
    _onTouchMove: function _onTouchMove(evt) {
      if (tapEvt) {
        var options = this.options, fallbackTolerance = options.fallbackTolerance, fallbackOffset = options.fallbackOffset, touch = evt.touches ? evt.touches[0] : evt, ghostMatrix = ghostEl && matrix(ghostEl, true), scaleX = ghostEl && ghostMatrix && ghostMatrix.a, scaleY = ghostEl && ghostMatrix && ghostMatrix.d, relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1), dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1);
        if (!Sortable.active && !awaitingDragStarted) {
          if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
            return;
          }
          this._onDragStart(evt, true);
        }
        if (ghostEl) {
          if (ghostMatrix) {
            ghostMatrix.e += dx - (lastDx || 0);
            ghostMatrix.f += dy - (lastDy || 0);
          } else {
            ghostMatrix = {
              a: 1,
              b: 0,
              c: 0,
              d: 1,
              e: dx,
              f: dy
            };
          }
          var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
          css(ghostEl, "webkitTransform", cssMatrix);
          css(ghostEl, "mozTransform", cssMatrix);
          css(ghostEl, "msTransform", cssMatrix);
          css(ghostEl, "transform", cssMatrix);
          lastDx = dx;
          lastDy = dy;
          touchEvt = touch;
        }
        evt.cancelable && evt.preventDefault();
      }
    },
    _appendGhost: function _appendGhost() {
      if (!ghostEl) {
        var container = this.options.fallbackOnBody ? document.body : rootEl, rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container), options = this.options;
        if (PositionGhostAbsolutely) {
          ghostRelativeParent = container;
          while (css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document) {
            ghostRelativeParent = ghostRelativeParent.parentNode;
          }
          if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
            if (ghostRelativeParent === document)
              ghostRelativeParent = getWindowScrollingElement();
            rect.top += ghostRelativeParent.scrollTop;
            rect.left += ghostRelativeParent.scrollLeft;
          } else {
            ghostRelativeParent = getWindowScrollingElement();
          }
          ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
        }
        ghostEl = dragEl.cloneNode(true);
        toggleClass(ghostEl, options.ghostClass, false);
        toggleClass(ghostEl, options.fallbackClass, true);
        toggleClass(ghostEl, options.dragClass, true);
        css(ghostEl, "transition", "");
        css(ghostEl, "transform", "");
        css(ghostEl, "box-sizing", "border-box");
        css(ghostEl, "margin", 0);
        css(ghostEl, "top", rect.top);
        css(ghostEl, "left", rect.left);
        css(ghostEl, "width", rect.width);
        css(ghostEl, "height", rect.height);
        css(ghostEl, "opacity", "0.8");
        css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed");
        css(ghostEl, "zIndex", "100000");
        css(ghostEl, "pointerEvents", "none");
        Sortable.ghost = ghostEl;
        container.appendChild(ghostEl);
        css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
      }
    },
    _onDragStart: function _onDragStart(evt, fallback) {
      var _this = this;
      var dataTransfer = evt.dataTransfer;
      var options = _this.options;
      pluginEvent2("dragStart", this, {
        evt
      });
      if (Sortable.eventCanceled) {
        this._onDrop();
        return;
      }
      pluginEvent2("setupClone", this);
      if (!Sortable.eventCanceled) {
        cloneEl = clone(dragEl);
        cloneEl.draggable = false;
        cloneEl.style["will-change"] = "";
        this._hideClone();
        toggleClass(cloneEl, this.options.chosenClass, false);
        Sortable.clone = cloneEl;
      }
      _this.cloneId = _nextTick(function() {
        pluginEvent2("clone", _this);
        if (Sortable.eventCanceled)
          return;
        if (!_this.options.removeCloneOnHide) {
          rootEl.insertBefore(cloneEl, dragEl);
        }
        _this._hideClone();
        _dispatchEvent({
          sortable: _this,
          name: "clone"
        });
      });
      !fallback && toggleClass(dragEl, options.dragClass, true);
      if (fallback) {
        ignoreNextClick = true;
        _this._loopId = setInterval(_this._emulateDragOver, 50);
      } else {
        off(document, "mouseup", _this._onDrop);
        off(document, "touchend", _this._onDrop);
        off(document, "touchcancel", _this._onDrop);
        if (dataTransfer) {
          dataTransfer.effectAllowed = "move";
          options.setData && options.setData.call(_this, dataTransfer, dragEl);
        }
        on(document, "drop", _this);
        css(dragEl, "transform", "translateZ(0)");
      }
      awaitingDragStarted = true;
      _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
      on(document, "selectstart", _this);
      moved = true;
      if (Safari) {
        css(document.body, "user-select", "none");
      }
    },
    _onDragOver: function _onDragOver(evt) {
      var el = this.el, target = evt.target, dragRect, targetRect, revert, options = this.options, group = options.group, activeSortable = Sortable.active, isOwner = activeGroup === group, canSort = options.sort, fromSortable = putSortable || activeSortable, vertical, _this = this, completedFired = false;
      if (_silent)
        return;
      function dragOverEvent(name, extra) {
        pluginEvent2(name, _this, _objectSpread2({
          evt,
          isOwner,
          axis: vertical ? "vertical" : "horizontal",
          revert,
          dragRect,
          targetRect,
          canSort,
          fromSortable,
          target,
          completed,
          onMove: function onMove(target2, after2) {
            return _onMove(rootEl, el, dragEl, dragRect, target2, getRect(target2), evt, after2);
          },
          changed
        }, extra));
      }
      function capture() {
        dragOverEvent("dragOverAnimationCapture");
        _this.captureAnimationState();
        if (_this !== fromSortable) {
          fromSortable.captureAnimationState();
        }
      }
      function completed(insertion) {
        dragOverEvent("dragOverCompleted", {
          insertion
        });
        if (insertion) {
          if (isOwner) {
            activeSortable._hideClone();
          } else {
            activeSortable._showClone(_this);
          }
          if (_this !== fromSortable) {
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
            toggleClass(dragEl, options.ghostClass, true);
          }
          if (putSortable !== _this && _this !== Sortable.active) {
            putSortable = _this;
          } else if (_this === Sortable.active && putSortable) {
            putSortable = null;
          }
          if (fromSortable === _this) {
            _this._ignoreWhileAnimating = target;
          }
          _this.animateAll(function() {
            dragOverEvent("dragOverAnimationComplete");
            _this._ignoreWhileAnimating = null;
          });
          if (_this !== fromSortable) {
            fromSortable.animateAll();
            fromSortable._ignoreWhileAnimating = null;
          }
        }
        if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
          lastTarget = null;
        }
        if (!options.dragoverBubble && !evt.rootEl && target !== document) {
          dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
          !insertion && nearestEmptyInsertDetectEvent(evt);
        }
        !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
        return completedFired = true;
      }
      function changed() {
        newIndex = index(dragEl);
        newDraggableIndex = index(dragEl, options.draggable);
        _dispatchEvent({
          sortable: _this,
          name: "change",
          toEl: el,
          newIndex,
          newDraggableIndex,
          originalEvent: evt
        });
      }
      if (evt.preventDefault !== void 0) {
        evt.cancelable && evt.preventDefault();
      }
      target = closest(target, options.draggable, el, true);
      dragOverEvent("dragOver");
      if (Sortable.eventCanceled)
        return completedFired;
      if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
        return completed(false);
      }
      ignoreNextClick = false;
      if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
        vertical = this._getDirection(evt, target) === "vertical";
        dragRect = getRect(dragEl);
        dragOverEvent("dragOverValid");
        if (Sortable.eventCanceled)
          return completedFired;
        if (revert) {
          parentEl = rootEl;
          capture();
          this._hideClone();
          dragOverEvent("revert");
          if (!Sortable.eventCanceled) {
            if (nextEl) {
              rootEl.insertBefore(dragEl, nextEl);
            } else {
              rootEl.appendChild(dragEl);
            }
          }
          return completed(true);
        }
        var elLastChild = lastChild(el, options.draggable);
        if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
          if (elLastChild === dragEl) {
            return completed(false);
          }
          if (elLastChild && el === evt.target) {
            target = elLastChild;
          }
          if (target) {
            targetRect = getRect(target);
          }
          if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
            capture();
            el.appendChild(dragEl);
            parentEl = el;
            changed();
            return completed(true);
          }
        } else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
          var firstChild = getChild(el, 0, options, true);
          if (firstChild === dragEl) {
            return completed(false);
          }
          target = firstChild;
          targetRect = getRect(target);
          if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
            capture();
            el.insertBefore(dragEl, firstChild);
            parentEl = el;
            changed();
            return completed(true);
          }
        } else if (target.parentNode === el) {
          targetRect = getRect(target);
          var direction = 0, targetBeforeFirstSwap, differentLevel = dragEl.parentNode !== el, differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical), side1 = vertical ? "top" : "left", scrolledPastTop = isScrolledPast(target, "top", "top") || isScrolledPast(dragEl, "top", "top"), scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
          if (lastTarget !== target) {
            targetBeforeFirstSwap = targetRect[side1];
            pastFirstInvertThresh = false;
            isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
          }
          direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
          var sibling;
          if (direction !== 0) {
            var dragIndex = index(dragEl);
            do {
              dragIndex -= direction;
              sibling = parentEl.children[dragIndex];
            } while (sibling && (css(sibling, "display") === "none" || sibling === ghostEl));
          }
          if (direction === 0 || sibling === target) {
            return completed(false);
          }
          lastTarget = target;
          lastDirection = direction;
          var nextSibling = target.nextElementSibling, after = false;
          after = direction === 1;
          var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
          if (moveVector !== false) {
            if (moveVector === 1 || moveVector === -1) {
              after = moveVector === 1;
            }
            _silent = true;
            setTimeout(_unsilent, 30);
            capture();
            if (after && !nextSibling) {
              el.appendChild(dragEl);
            } else {
              target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
            }
            if (scrolledPastTop) {
              scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
            }
            parentEl = dragEl.parentNode;
            if (targetBeforeFirstSwap !== void 0 && !isCircumstantialInvert) {
              targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
            }
            changed();
            return completed(true);
          }
        }
        if (el.contains(dragEl)) {
          return completed(false);
        }
      }
      return false;
    },
    _ignoreWhileAnimating: null,
    _offMoveEvents: function _offMoveEvents() {
      off(document, "mousemove", this._onTouchMove);
      off(document, "touchmove", this._onTouchMove);
      off(document, "pointermove", this._onTouchMove);
      off(document, "dragover", nearestEmptyInsertDetectEvent);
      off(document, "mousemove", nearestEmptyInsertDetectEvent);
      off(document, "touchmove", nearestEmptyInsertDetectEvent);
    },
    _offUpEvents: function _offUpEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, "mouseup", this._onDrop);
      off(ownerDocument, "touchend", this._onDrop);
      off(ownerDocument, "pointerup", this._onDrop);
      off(ownerDocument, "touchcancel", this._onDrop);
      off(document, "selectstart", this);
    },
    _onDrop: function _onDrop(evt) {
      var el = this.el, options = this.options;
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      pluginEvent2("drop", this, {
        evt
      });
      parentEl = dragEl && dragEl.parentNode;
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      if (Sortable.eventCanceled) {
        this._nulling();
        return;
      }
      awaitingDragStarted = false;
      isCircumstantialInvert = false;
      pastFirstInvertThresh = false;
      clearInterval(this._loopId);
      clearTimeout(this._dragStartTimer);
      _cancelNextTick(this.cloneId);
      _cancelNextTick(this._dragStartId);
      if (this.nativeDraggable) {
        off(document, "drop", this);
        off(el, "dragstart", this._onDragStart);
      }
      this._offMoveEvents();
      this._offUpEvents();
      if (Safari) {
        css(document.body, "user-select", "");
      }
      css(dragEl, "transform", "");
      if (evt) {
        if (moved) {
          evt.cancelable && evt.preventDefault();
          !options.dropBubble && evt.stopPropagation();
        }
        ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
        if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") {
          cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
        }
        if (dragEl) {
          if (this.nativeDraggable) {
            off(dragEl, "dragend", this);
          }
          _disableDraggable(dragEl);
          dragEl.style["will-change"] = "";
          if (moved && !awaitingDragStarted) {
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
          }
          toggleClass(dragEl, this.options.chosenClass, false);
          _dispatchEvent({
            sortable: this,
            name: "unchoose",
            toEl: parentEl,
            newIndex: null,
            newDraggableIndex: null,
            originalEvent: evt
          });
          if (rootEl !== parentEl) {
            if (newIndex >= 0) {
              _dispatchEvent({
                rootEl: parentEl,
                name: "add",
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "remove",
                toEl: parentEl,
                originalEvent: evt
              });
              _dispatchEvent({
                rootEl: parentEl,
                name: "sort",
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "sort",
                toEl: parentEl,
                originalEvent: evt
              });
            }
            putSortable && putSortable.save();
          } else {
            if (newIndex !== oldIndex) {
              if (newIndex >= 0) {
                _dispatchEvent({
                  sortable: this,
                  name: "update",
                  toEl: parentEl,
                  originalEvent: evt
                });
                _dispatchEvent({
                  sortable: this,
                  name: "sort",
                  toEl: parentEl,
                  originalEvent: evt
                });
              }
            }
          }
          if (Sortable.active) {
            if (newIndex == null || newIndex === -1) {
              newIndex = oldIndex;
              newDraggableIndex = oldDraggableIndex;
            }
            _dispatchEvent({
              sortable: this,
              name: "end",
              toEl: parentEl,
              originalEvent: evt
            });
            this.save();
          }
        }
      }
      this._nulling();
    },
    _nulling: function _nulling() {
      pluginEvent2("nulling", this);
      rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
      savedInputChecked.forEach(function(el) {
        el.checked = true;
      });
      savedInputChecked.length = lastDx = lastDy = 0;
    },
    handleEvent: function handleEvent(evt) {
      switch (evt.type) {
        case "drop":
        case "dragend":
          this._onDrop(evt);
          break;
        case "dragenter":
        case "dragover":
          if (dragEl) {
            this._onDragOver(evt);
            _globalDragOver(evt);
          }
          break;
        case "selectstart":
          evt.preventDefault();
          break;
      }
    },
    toArray: function toArray() {
      var order = [], el, children = this.el.children, i7 = 0, n6 = children.length, options = this.options;
      for (; i7 < n6; i7++) {
        el = children[i7];
        if (closest(el, options.draggable, this.el, false)) {
          order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
        }
      }
      return order;
    },
    sort: function sort(order, useAnimation) {
      var items = {}, rootEl2 = this.el;
      this.toArray().forEach(function(id, i7) {
        var el = rootEl2.children[i7];
        if (closest(el, this.options.draggable, rootEl2, false)) {
          items[id] = el;
        }
      }, this);
      useAnimation && this.captureAnimationState();
      order.forEach(function(id) {
        if (items[id]) {
          rootEl2.removeChild(items[id]);
          rootEl2.appendChild(items[id]);
        }
      });
      useAnimation && this.animateAll();
    },
    save: function save() {
      var store = this.options.store;
      store && store.set && store.set(this);
    },
    closest: function closest$1(el, selector) {
      return closest(el, selector || this.options.draggable, this.el, false);
    },
    option: function option(name, value) {
      var options = this.options;
      if (value === void 0) {
        return options[name];
      } else {
        var modifiedValue = PluginManager.modifyOption(this, name, value);
        if (typeof modifiedValue !== "undefined") {
          options[name] = modifiedValue;
        } else {
          options[name] = value;
        }
        if (name === "group") {
          _prepareGroup(options);
        }
      }
    },
    destroy: function destroy() {
      pluginEvent2("destroy", this);
      var el = this.el;
      el[expando] = null;
      off(el, "mousedown", this._onTapStart);
      off(el, "touchstart", this._onTapStart);
      off(el, "pointerdown", this._onTapStart);
      if (this.nativeDraggable) {
        off(el, "dragover", this);
        off(el, "dragenter", this);
      }
      Array.prototype.forEach.call(el.querySelectorAll("[draggable]"), function(el2) {
        el2.removeAttribute("draggable");
      });
      this._onDrop();
      this._disableDelayedDragEvents();
      sortables.splice(sortables.indexOf(this.el), 1);
      this.el = el = null;
    },
    _hideClone: function _hideClone() {
      if (!cloneHidden) {
        pluginEvent2("hideClone", this);
        if (Sortable.eventCanceled)
          return;
        css(cloneEl, "display", "none");
        if (this.options.removeCloneOnHide && cloneEl.parentNode) {
          cloneEl.parentNode.removeChild(cloneEl);
        }
        cloneHidden = true;
      }
    },
    _showClone: function _showClone(putSortable2) {
      if (putSortable2.lastPutMode !== "clone") {
        this._hideClone();
        return;
      }
      if (cloneHidden) {
        pluginEvent2("showClone", this);
        if (Sortable.eventCanceled)
          return;
        if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
          rootEl.insertBefore(cloneEl, dragEl);
        } else if (nextEl) {
          rootEl.insertBefore(cloneEl, nextEl);
        } else {
          rootEl.appendChild(cloneEl);
        }
        if (this.options.group.revertClone) {
          this.animate(dragEl, cloneEl);
        }
        css(cloneEl, "display", "");
        cloneHidden = false;
      }
    }
  };
  function _globalDragOver(evt) {
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = "move";
    }
    evt.cancelable && evt.preventDefault();
  }
  function _onMove(fromEl, toEl, dragEl2, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
    var evt, sortable = fromEl[expando], onMoveFn = sortable.options.onMove, retVal;
    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent("move", {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent("Event");
      evt.initEvent("move", true, true);
    }
    evt.to = toEl;
    evt.from = fromEl;
    evt.dragged = dragEl2;
    evt.draggedRect = dragRect;
    evt.related = targetEl || toEl;
    evt.relatedRect = targetRect || getRect(toEl);
    evt.willInsertAfter = willInsertAfter;
    evt.originalEvent = originalEvent;
    fromEl.dispatchEvent(evt);
    if (onMoveFn) {
      retVal = onMoveFn.call(sortable, evt, originalEvent);
    }
    return retVal;
  }
  function _disableDraggable(el) {
    el.draggable = false;
  }
  function _unsilent() {
    _silent = false;
  }
  function _ghostIsFirst(evt, vertical, sortable) {
    var rect = getRect(getChild(sortable.el, 0, sortable.options, true));
    var spacer = 10;
    return vertical ? evt.clientX < rect.left - spacer || evt.clientY < rect.top && evt.clientX < rect.right : evt.clientY < rect.top - spacer || evt.clientY < rect.bottom && evt.clientX < rect.left;
  }
  function _ghostIsLast(evt, vertical, sortable) {
    var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
    var spacer = 10;
    return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
  }
  function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
    var mouseOnAxis = vertical ? evt.clientY : evt.clientX, targetLength = vertical ? targetRect.height : targetRect.width, targetS1 = vertical ? targetRect.top : targetRect.left, targetS2 = vertical ? targetRect.bottom : targetRect.right, invert = false;
    if (!invertSwap) {
      if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
        if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
          pastFirstInvertThresh = true;
        }
        if (!pastFirstInvertThresh) {
          if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance : mouseOnAxis > targetS2 - targetMoveDistance) {
            return -lastDirection;
          }
        } else {
          invert = true;
        }
      } else {
        if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
          return _getInsertDirection(target);
        }
      }
    }
    invert = invert || invertSwap;
    if (invert) {
      if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
        return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
      }
    }
    return 0;
  }
  function _getInsertDirection(target) {
    if (index(dragEl) < index(target)) {
      return 1;
    } else {
      return -1;
    }
  }
  function _generateId(el) {
    var str = el.tagName + el.className + el.src + el.href + el.textContent, i7 = str.length, sum = 0;
    while (i7--) {
      sum += str.charCodeAt(i7);
    }
    return sum.toString(36);
  }
  function _saveInputCheckedState(root) {
    savedInputChecked.length = 0;
    var inputs = root.getElementsByTagName("input");
    var idx = inputs.length;
    while (idx--) {
      var el = inputs[idx];
      el.checked && savedInputChecked.push(el);
    }
  }
  function _nextTick(fn) {
    return setTimeout(fn, 0);
  }
  function _cancelNextTick(id) {
    return clearTimeout(id);
  }
  if (documentExists) {
    on(document, "touchmove", function(evt) {
      if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
        evt.preventDefault();
      }
    });
  }
  Sortable.utils = {
    on,
    off,
    css,
    find,
    is: function is(el, selector) {
      return !!closest(el, selector, el, false);
    },
    extend,
    throttle,
    closest,
    toggleClass,
    clone,
    index,
    nextTick: _nextTick,
    cancelNextTick: _cancelNextTick,
    detectDirection: _detectDirection,
    getChild
  };
  Sortable.get = function(element) {
    return element[expando];
  };
  Sortable.mount = function() {
    for (var _len = arguments.length, plugins2 = new Array(_len), _key = 0; _key < _len; _key++) {
      plugins2[_key] = arguments[_key];
    }
    if (plugins2[0].constructor === Array)
      plugins2 = plugins2[0];
    plugins2.forEach(function(plugin) {
      if (!plugin.prototype || !plugin.prototype.constructor) {
        throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
      }
      if (plugin.utils)
        Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
      PluginManager.mount(plugin);
    });
  };
  Sortable.create = function(el, options) {
    return new Sortable(el, options);
  };
  Sortable.version = version;
  var autoScrolls = [];
  var scrollEl;
  var scrollRootEl;
  var scrolling = false;
  var lastAutoScrollX;
  var lastAutoScrollY;
  var touchEvt$1;
  var pointerElemChangedInterval;
  function AutoScrollPlugin() {
    function AutoScroll() {
      this.defaults = {
        scroll: true,
        forceAutoScrollFallback: false,
        scrollSensitivity: 30,
        scrollSpeed: 10,
        bubbleScroll: true
      };
      for (var fn in this) {
        if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
          this[fn] = this[fn].bind(this);
        }
      }
    }
    AutoScroll.prototype = {
      dragStarted: function dragStarted(_ref) {
        var originalEvent = _ref.originalEvent;
        if (this.sortable.nativeDraggable) {
          on(document, "dragover", this._handleAutoScroll);
        } else {
          if (this.options.supportPointer) {
            on(document, "pointermove", this._handleFallbackAutoScroll);
          } else if (originalEvent.touches) {
            on(document, "touchmove", this._handleFallbackAutoScroll);
          } else {
            on(document, "mousemove", this._handleFallbackAutoScroll);
          }
        }
      },
      dragOverCompleted: function dragOverCompleted(_ref2) {
        var originalEvent = _ref2.originalEvent;
        if (!this.options.dragOverBubble && !originalEvent.rootEl) {
          this._handleAutoScroll(originalEvent);
        }
      },
      drop: function drop3() {
        if (this.sortable.nativeDraggable) {
          off(document, "dragover", this._handleAutoScroll);
        } else {
          off(document, "pointermove", this._handleFallbackAutoScroll);
          off(document, "touchmove", this._handleFallbackAutoScroll);
          off(document, "mousemove", this._handleFallbackAutoScroll);
        }
        clearPointerElemChangedInterval();
        clearAutoScrolls();
        cancelThrottle();
      },
      nulling: function nulling() {
        touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
        autoScrolls.length = 0;
      },
      _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
        this._handleAutoScroll(evt, true);
      },
      _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
        var _this = this;
        var x2 = (evt.touches ? evt.touches[0] : evt).clientX, y2 = (evt.touches ? evt.touches[0] : evt).clientY, elem = document.elementFromPoint(x2, y2);
        touchEvt$1 = evt;
        if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
          autoScroll(evt, this.options, elem, fallback);
          var ogElemScroller = getParentAutoScrollElement(elem, true);
          if (scrolling && (!pointerElemChangedInterval || x2 !== lastAutoScrollX || y2 !== lastAutoScrollY)) {
            pointerElemChangedInterval && clearPointerElemChangedInterval();
            pointerElemChangedInterval = setInterval(function() {
              var newElem = getParentAutoScrollElement(document.elementFromPoint(x2, y2), true);
              if (newElem !== ogElemScroller) {
                ogElemScroller = newElem;
                clearAutoScrolls();
              }
              autoScroll(evt, _this.options, newElem, fallback);
            }, 10);
            lastAutoScrollX = x2;
            lastAutoScrollY = y2;
          }
        } else {
          if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
            clearAutoScrolls();
            return;
          }
          autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
        }
      }
    };
    return _extends(AutoScroll, {
      pluginName: "scroll",
      initializeByDefault: true
    });
  }
  function clearAutoScrolls() {
    autoScrolls.forEach(function(autoScroll2) {
      clearInterval(autoScroll2.pid);
    });
    autoScrolls = [];
  }
  function clearPointerElemChangedInterval() {
    clearInterval(pointerElemChangedInterval);
  }
  var autoScroll = throttle(function(evt, options, rootEl2, isFallback) {
    if (!options.scroll)
      return;
    var x2 = (evt.touches ? evt.touches[0] : evt).clientX, y2 = (evt.touches ? evt.touches[0] : evt).clientY, sens = options.scrollSensitivity, speed = options.scrollSpeed, winScroller = getWindowScrollingElement();
    var scrollThisInstance = false, scrollCustomFn;
    if (scrollRootEl !== rootEl2) {
      scrollRootEl = rootEl2;
      clearAutoScrolls();
      scrollEl = options.scroll;
      scrollCustomFn = options.scrollFn;
      if (scrollEl === true) {
        scrollEl = getParentAutoScrollElement(rootEl2, true);
      }
    }
    var layersOut = 0;
    var currentParent = scrollEl;
    do {
      var el = currentParent, rect = getRect(el), top = rect.top, bottom = rect.bottom, left = rect.left, right = rect.right, width = rect.width, height = rect.height, canScrollX = void 0, canScrollY = void 0, scrollWidth = el.scrollWidth, scrollHeight = el.scrollHeight, elCSS = css(el), scrollPosX = el.scrollLeft, scrollPosY = el.scrollTop;
      if (el === winScroller) {
        canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll" || elCSS.overflowX === "visible");
        canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll" || elCSS.overflowY === "visible");
      } else {
        canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll");
        canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll");
      }
      var vx = canScrollX && (Math.abs(right - x2) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x2) <= sens && !!scrollPosX);
      var vy = canScrollY && (Math.abs(bottom - y2) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y2) <= sens && !!scrollPosY);
      if (!autoScrolls[layersOut]) {
        for (var i7 = 0; i7 <= layersOut; i7++) {
          if (!autoScrolls[i7]) {
            autoScrolls[i7] = {};
          }
        }
      }
      if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
        autoScrolls[layersOut].el = el;
        autoScrolls[layersOut].vx = vx;
        autoScrolls[layersOut].vy = vy;
        clearInterval(autoScrolls[layersOut].pid);
        if (vx != 0 || vy != 0) {
          scrollThisInstance = true;
          autoScrolls[layersOut].pid = setInterval(function() {
            if (isFallback && this.layer === 0) {
              Sortable.active._onTouchMove(touchEvt$1);
            }
            var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
            var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
            if (typeof scrollCustomFn === "function") {
              if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== "continue") {
                return;
              }
            }
            scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
          }.bind({
            layer: layersOut
          }), 24);
        }
      }
      layersOut++;
    } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));
    scrolling = scrollThisInstance;
  }, 30);
  var drop = function drop2(_ref) {
    var originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, dragEl2 = _ref.dragEl, activeSortable = _ref.activeSortable, dispatchSortableEvent = _ref.dispatchSortableEvent, hideGhostForTarget = _ref.hideGhostForTarget, unhideGhostForTarget = _ref.unhideGhostForTarget;
    if (!originalEvent)
      return;
    var toSortable = putSortable2 || activeSortable;
    hideGhostForTarget();
    var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
    var target = document.elementFromPoint(touch.clientX, touch.clientY);
    unhideGhostForTarget();
    if (toSortable && !toSortable.el.contains(target)) {
      dispatchSortableEvent("spill");
      this.onSpill({
        dragEl: dragEl2,
        putSortable: putSortable2
      });
    }
  };
  function Revert() {
  }
  Revert.prototype = {
    startIndex: null,
    dragStart: function dragStart(_ref2) {
      var oldDraggableIndex2 = _ref2.oldDraggableIndex;
      this.startIndex = oldDraggableIndex2;
    },
    onSpill: function onSpill(_ref3) {
      var dragEl2 = _ref3.dragEl, putSortable2 = _ref3.putSortable;
      this.sortable.captureAnimationState();
      if (putSortable2) {
        putSortable2.captureAnimationState();
      }
      var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);
      if (nextSibling) {
        this.sortable.el.insertBefore(dragEl2, nextSibling);
      } else {
        this.sortable.el.appendChild(dragEl2);
      }
      this.sortable.animateAll();
      if (putSortable2) {
        putSortable2.animateAll();
      }
    },
    drop
  };
  _extends(Revert, {
    pluginName: "revertOnSpill"
  });
  function Remove() {
  }
  Remove.prototype = {
    onSpill: function onSpill2(_ref4) {
      var dragEl2 = _ref4.dragEl, putSortable2 = _ref4.putSortable;
      var parentSortable = putSortable2 || this.sortable;
      parentSortable.captureAnimationState();
      dragEl2.parentNode && dragEl2.parentNode.removeChild(dragEl2);
      parentSortable.animateAll();
    },
    drop
  };
  _extends(Remove, {
    pluginName: "removeOnSpill"
  });
  var sortable_core_esm_default = Sortable;

  // site/js/elements/navbar/navitem.css
  var styles10 = r`:host {
    display: inline-block;
    width: 12vmin;
    height: 12vmin;
    position: relative;
    border-radius: 2vmin;
    overflow: hidden;
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

:host(.drag) {
    background-color: var(--surface4) !important;
    border-radius: 2vmin !important;
    box-shadow: none !important;
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
}`;
  var navitem_default = styles10;

  // site/js/elements/navbar/navitem.ts
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
      return false;
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

            ${this.editing ? p`<img id="handle" src="images/drag.svg" draggable="false"/>` : T}
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

  // site/js/elements/navbar/navbar.ts
  sortable_core_esm_default.mount(AutoScrollPlugin);
  var Navbar = class extends s4 {
    constructor() {
      super();
      this.editing = false;
      this.itemsContainer = null;
      this.topShadow = null;
      this.bottomShadow = null;
      this.leftShadow = null;
      this.rightShadow = null;
      this.pages = [];
      this.icons = [];
      this.order = [0, 1, 2, 3, 4, 5];
      this.sortable = null;
      this.GetNavItem = ((order) => {
        var page;
        var title;
        var icon;
        var extension = false;
        if (order < Navbar.defaultPages.length)
          ({ page, title, icon } = Navbar.defaultPages[order]);
        else {
          page = this.pages[order - Navbar.defaultPages.length];
          title = this.pages[order - Navbar.defaultPages.length];
          icon = this.icons[order - Navbar.defaultPages.length];
          extension = true;
        }
        return p`
            <nav-item ?editing="${this.editing}" pageName="${page}" ?extension="${extension}" title="${title}">
                <img draggable="false" src="${icon}" />
            </nav-item>
        `;
      }).bind(this);
      matchMedia("(max-aspect-ratio: 1/1)").onchange = this.ShowShadows.bind(this);
    }
    ShowShadows() {
      if (!this.shadowRoot || !this.topShadow || !this.bottomShadow || !this.leftShadow || !this.rightShadow || !this.itemsContainer)
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
      var root = super.createRenderRoot();
      root.addEventListener("pointerdown", () => {
        var _a;
        (_a = this.itemsContainer) == null ? void 0 : _a.classList.add("hover");
      });
      root.addEventListener("pointerup", () => {
        var _a;
        (_a = this.itemsContainer) == null ? void 0 : _a.classList.remove("hover");
      });
      return root;
    }
    firstUpdated() {
      var _a;
      (_a = this.itemsContainer) == null ? void 0 : _a.addEventListener("scroll", this.ShowShadows.bind(this));
      this.sortable = new sortable_core_esm_default(this.itemsContainer, {
        group: "nav-items",
        sort: true,
        disabled: !this.editing,
        draggable: "nav-item",
        handle: "#handle",
        ghostClass: "selected",
        dragClass: "drag",
        fallbackOnBody: true,
        onEnd: (e8) => {
          if (Site.page == e8.item.page)
            e8.item.classList.add("selected");
          if (e8.oldIndex === void 0 || e8.newIndex === void 0)
            return;
          var order = this.order.splice(e8.oldIndex, 1)[0];
          this.order.splice(e8.newIndex, 0, order);
          localStorage.setItem("Nav Order", JSON.stringify(this.order));
          this.requestUpdate();
        }
      });
    }
    updated() {
      var _a;
      for (var navItem of (_a = this.shadowRoot) == null ? void 0 : _a.querySelectorAll("nav-item")) {
        navItem.requestUpdate();
      }
    }
    render() {
      var order = localStorage.getItem("Nav Order");
      if (order)
        this.order = JSON.parse(order);
      var extensions = Site.GetInstalledExtensions();
      this.pages = Object.keys(extensions);
      this.icons = this.pages.map((key) => {
        var url = new URL(extensions[key].url);
        url.pathname = extensions[key].navIcon;
        url.search = `cache-version=${extensions[key].version}`;
        return url.toString();
      });
      var mobile = window.innerWidth <= window.innerHeight;
      var vmin = mobile ? window.innerWidth / 100 : window.innerHeight / 100;
      var scrollable = this.order.length * 12 * vmin > window.innerHeight;
      if (this.sortable != null)
        this.sortable.option("disabled", !this.editing);
      return p`
            <div id="items-container">
                ${c3(this.order, (key) => key, this.GetNavItem)}
            
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
      page: "dailytimetable",
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
})();
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
/**!
 * Sortable 1.14.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
