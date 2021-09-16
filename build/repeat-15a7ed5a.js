import{Z as e,w as t}from"./default-css-6e30774d.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},n=e=>(...t)=>({_$litDirective$:e,values:t});class o{constructor(e){}T(e,t,s){this.Σdt=e,this.M=t,this.Σct=s}S(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{et:r}=e,l=()=>document.createComment(""),i=(e,t,s)=>{var n;const o=e.A.parentNode,i=void 0===t?e.B:t.A;if(void 0===s){const t=o.insertBefore(l(),i),n=o.insertBefore(l(),i);s=new r(t,n,e,e.options)}else{const t=s.B.nextSibling,r=s.M!==e;if(r&&(null===(n=s.Q)||void 0===n||n.call(s,e),s.M=e),t!==i||r){let e=s.A;for(;e!==t;){const t=e.nextSibling;o.insertBefore(e,i),e=t}}}return s},c=(e,t,s=e)=>(e.I(t,s),e),u={},f=(e,t=u)=>e.H=t,a=e=>{var t;null===(t=e.P)||void 0===t||t.call(e,!1,!0);let s=e.A;const n=e.B.nextSibling;for(;s!==n;){const e=s.nextSibling;s.remove(),s=e}},d=(e,t,s)=>{const n=new Map;for(let o=t;o<=s;o++)n.set(e[o],o);return n},v=n(class extends o{constructor(e){if(super(e),e.type!==s.CHILD)throw Error("repeat() can only be used in text expressions")}Mt(e,t,s){let n;void 0===s?s=t:void 0!==t&&(n=t);const o=[],r=[];let l=0;for(const t of e)o[l]=n?n(t,l):l,r[l]=s(t,l),l++;return{values:r,keys:o}}render(e,t,s){return this.Mt(e,t,s).values}update(e,[s,n,o]){var r;const l=e.H,{values:u,keys:v}=this.Mt(s,n,o);if(!l)return this.Pt=v,u;const h=null!==(r=this.Pt)&&void 0!==r?r:this.Pt=[],p=[];let E,T,B=0,x=l.length-1,M=0,g=u.length-1;for(;B<=x&&M<=g;)if(null===l[B])B++;else if(null===l[x])x--;else if(h[B]===v[M])p[M]=c(l[B],u[M]),B++,M++;else if(h[x]===v[g])p[g]=c(l[x],u[g]),x--,g--;else if(h[B]===v[g])p[g]=c(l[B],u[g]),i(e,p[g+1],l[B]),B++,g--;else if(h[x]===v[M])p[M]=c(l[x],u[M]),i(e,l[B],l[x]),x--,M++;else if(void 0===E&&(E=d(v,M,g),T=d(h,B,x)),E.has(h[B]))if(E.has(h[x])){const t=T.get(v[M]),s=void 0!==t?l[t]:null;if(null===s){const t=i(e,l[B]);c(t,u[M]),p[M]=t}else p[M]=c(s,u[M]),i(e,l[B],s),l[t]=null;M++}else a(l[x]),x--;else a(l[B]),B++;for(;M<=g;){const t=i(e,p[g+1]);c(t,u[M]),p[M++]=t}for(;B<=x;){const e=l[B++];null!==e&&a(e)}return this.Pt=v,f(e,p),t}});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */export{v as c,n as i,o as s,s as t};
