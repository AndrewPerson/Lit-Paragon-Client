import{Z as e,w as t}from"./lit-element-6ea6c272.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},n=e=>(...t)=>({_$litDirective$:e,values:t});class l{constructor(e){}T(e,t,s){this.Σdt=e,this.M=t,this.Σct=s}S(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{et:o}=e,r=()=>document.createComment(""),i=(e,t,s)=>{var n;const l=e.A.parentNode,i=void 0===t?e.B:t.A;if(void 0===s){const t=l.insertBefore(r(),i),n=l.insertBefore(r(),i);s=new o(t,n,e,e.options)}else{const t=s.B.nextSibling,o=s.M!==e;if(o&&(null===(n=s.Q)||void 0===n||n.call(s,e),s.M=e),t!==i||o){let e=s.A;for(;e!==t;){const t=e.nextSibling;l.insertBefore(e,i),e=t}}}return s},c=(e,t,s=e)=>(e.I(t,s),e),u={},f=(e,t=u)=>e.H=t,a=e=>{var t;null===(t=e.P)||void 0===t||t.call(e,!1,!0);let s=e.A;const n=e.B.nextSibling;for(;s!==n;){const e=s.nextSibling;s.remove(),s=e}},d=(e,t,s)=>{const n=new Map;for(let l=t;l<=s;l++)n.set(e[l],l);return n},v=n(class extends l{constructor(e){if(super(e),e.type!==s.CHILD)throw Error("repeat() can only be used in text expressions")}Mt(e,t,s){let n;void 0===s?s=t:void 0!==t&&(n=t);const l=[],o=[];let r=0;for(const t of e)l[r]=n?n(t,r):r,o[r]=s(t,r),r++;return{values:o,keys:l}}render(e,t,s){return this.Mt(e,t,s).values}update(e,[s,n,l]){var o;const r=e.H,{values:u,keys:v}=this.Mt(s,n,l);if(!r)return this.Pt=v,u;const h=null!==(o=this.Pt)&&void 0!==o?o:this.Pt=[],p=[];let E,T,B=0,x=r.length-1,M=0,g=u.length-1;for(;B<=x&&M<=g;)if(null===r[B])B++;else if(null===r[x])x--;else if(h[B]===v[M])p[M]=c(r[B],u[M]),B++,M++;else if(h[x]===v[g])p[g]=c(r[x],u[g]),x--,g--;else if(h[B]===v[g])p[g]=c(r[B],u[g]),i(e,p[g+1],r[B]),B++,g--;else if(h[x]===v[M])p[M]=c(r[x],u[M]),i(e,r[B],r[x]),x--,M++;else if(void 0===E&&(E=d(v,M,g),T=d(h,B,x)),E.has(h[B]))if(E.has(h[x])){const t=T.get(v[M]),s=void 0!==t?r[t]:null;if(null===s){const t=i(e,r[B]);c(t,u[M]),p[M]=t}else p[M]=c(s,u[M]),i(e,r[B],s),r[t]=null;M++}else a(r[x]),x--;else a(r[B]),B++;for(;M<=g;){const t=i(e,p[g+1]);c(t,u[M]),p[M++]=t}for(;B<=x;){const e=r[B++];null!==e&&a(e)}return this.Pt=v,f(e,p),t}});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */export{v as c,n as i,l as s,s as t};
