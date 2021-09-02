/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(t,n)};function t(e,t,n,i){return new(n||(n=Promise))((function(r,o){function a(e){try{c(i.next(e))}catch(e){o(e)}}function s(e){try{c(i.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}c((i=i.apply(e,t||[])).next())}))}function n(e,t){var n,i,r,o,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,i&&(r=2&o[0]?i.return:o[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,o[1])).done)return r;switch(i=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,i=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(r=a.trys,(r=r.length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){a.label=o[1];break}if(6===o[0]&&a.label<r[1]){a.label=r[1],r=o;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(o);break}r[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],i=0}finally{n=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}function i(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],i=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&i>=e.length&&(e=void 0),{value:e&&e[i++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function r(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var i,r,o=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(i=o.next()).done;)a.push(i.value)}catch(e){r={error:e}}finally{try{i&&!i.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}return a}function o(e,t,n){if(n||2===arguments.length)for(var i,r=0,o=t.length;r<o;r++)!i&&r in t||(i||(i=Array.prototype.slice.call(t,0,r)),i[r]=t[r]);return e.concat(i||t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var a=function(){function e(){var e=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise((function(t,n){e.resolve=t,e.reject=n}))}return e.prototype.wrapCallback=function(e){var t=this;return function(n,i){n?t.reject(n):t.resolve(i),"function"==typeof e&&(t.promise.catch((function(){})),1===e.length?e(n):e(n,i))}},e}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var s=function(t){function n(e,i,r){var o=t.call(this,i)||this;return o.code=e,o.customData=r,o.name="FirebaseError",Object.setPrototypeOf(o,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,c.prototype.create),o}return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function i(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}(n,t),n}(Error),c=function(){function e(e,t,n){this.service=e,this.serviceName=t,this.errors=n}return e.prototype.create=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var i=t[0]||{},r=this.service+"/"+e,o=this.errors[e],a=o?l(o,i):"Error",c=this.serviceName+": "+a+" ("+r+").",u=new s(r,c,i);return u},e}();function l(e,t){return e.replace(u,(function(e,n){var i=t[n];return null!=i?String(i):"<"+n+"?>"}))}var u=/\{\$([^}]+)}/g;function p(e,t){if(e===t)return!0;for(var n=Object.keys(e),i=Object.keys(t),r=0,o=n;r<o.length;r++){var a=o[r];if(!i.includes(a))return!1;var s=e[a],c=t[a];if(f(s)&&f(c)){if(!p(s,c))return!1}else if(s!==c)return!1}for(var l=0,u=i;l<u.length;l++){a=u[l];if(!n.includes(a))return!1}return!0}function f(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d(e,t,n){void 0===t&&(t=1e3),void 0===n&&(n=2);var i=t*Math.pow(n,e),r=Math.round(.5*i*(Math.random()-.5)*2);return Math.min(144e5,i+r)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h(e){return e&&e._delegate?e._delegate:e}var m=function(){function e(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return e.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},e.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},e.prototype.setServiceProps=function(e){return this.serviceProps=e,this},e.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},e}(),g=function(){function e(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}return e.prototype.get=function(e){var t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){var n=new a;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{var i=this.getOrInitializeService({instanceIdentifier:t});i&&n.resolve(i)}catch(e){}}return this.instancesDeferred.get(t).promise},e.prototype.getImmediate=function(e){var t,n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),i=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(i)return null;throw Error("Service "+this.name+" is not available")}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(i)return null;throw e}},e.prototype.getComponent=function(){return this.component},e.prototype.setComponent=function(e){var t,n;if(e.name!==this.name)throw Error("Mismatching Component "+e.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService({instanceIdentifier:"[DEFAULT]"})}catch(e){}try{for(var o=i(this.instancesDeferred.entries()),a=o.next();!a.done;a=o.next()){var s=r(a.value,2),c=s[0],l=s[1],u=this.normalizeInstanceIdentifier(c);try{var p=this.getOrInitializeService({instanceIdentifier:u});l.resolve(p)}catch(e){}}}catch(e){t={error:e}}finally{try{a&&!a.done&&(n=o.return)&&n.call(o)}finally{if(t)throw t.error}}}},e.prototype.clearInstance=function(e){void 0===e&&(e="[DEFAULT]"),this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)},e.prototype.delete=function(){return t(this,void 0,void 0,(function(){var e;return n(this,(function(t){switch(t.label){case 0:return e=Array.from(this.instances.values()),[4,Promise.all(o(o([],r(e.filter((function(e){return"INTERNAL"in e})).map((function(e){return e.INTERNAL.delete()})))),r(e.filter((function(e){return"_delete"in e})).map((function(e){return e._delete()})))))];case 1:return t.sent(),[2]}}))}))},e.prototype.isComponentSet=function(){return null!=this.component},e.prototype.isInitialized=function(e){return void 0===e&&(e="[DEFAULT]"),this.instances.has(e)},e.prototype.getOptions=function(e){return void 0===e&&(e="[DEFAULT]"),this.instancesOptions.get(e)||{}},e.prototype.initialize=function(e){var t,n;void 0===e&&(e={});var o=e.options,a=void 0===o?{}:o,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(this.name+"("+s+") has already been initialized");if(!this.isComponentSet())throw Error("Component "+this.name+" has not been registered yet");var c=this.getOrInitializeService({instanceIdentifier:s,options:a});try{for(var l=i(this.instancesDeferred.entries()),u=l.next();!u.done;u=l.next()){var p=r(u.value,2),f=p[0],d=p[1];s===this.normalizeInstanceIdentifier(f)&&d.resolve(c)}}catch(e){t={error:e}}finally{try{u&&!u.done&&(n=l.return)&&n.call(l)}finally{if(t)throw t.error}}return c},e.prototype.onInit=function(e,t){var n,i=this.normalizeInstanceIdentifier(t),r=null!==(n=this.onInitCallbacks.get(i))&&void 0!==n?n:new Set;r.add(e),this.onInitCallbacks.set(i,r);var o=this.instances.get(i);return o&&e(o,i),function(){r.delete(e)}},e.prototype.invokeOnInitCallbacks=function(e,t){var n,r,o=this.onInitCallbacks.get(t);if(o)try{for(var a=i(o),s=a.next();!s.done;s=a.next()){var c=s.value;try{c(e,t)}catch(e){}}}catch(e){n={error:e}}finally{try{s&&!s.done&&(r=a.return)&&r.call(a)}finally{if(n)throw n.error}}},e.prototype.getOrInitializeService=function(e){var t,n=e.instanceIdentifier,i=e.options,r=void 0===i?{}:i,o=this.instances.get(n);if(!o&&this.component&&(o=this.component.instanceFactory(this.container,{instanceIdentifier:(t=n,"[DEFAULT]"===t?void 0:t),options:r}),this.instances.set(n,o),this.instancesOptions.set(n,r),this.invokeOnInitCallbacks(o,n),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,n,o)}catch(e){}return o||null},e.prototype.normalizeInstanceIdentifier=function(e){return void 0===e&&(e="[DEFAULT]"),this.component?this.component.multipleInstances?e:"[DEFAULT]":e},e.prototype.shouldAutoInitialize=function(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode},e}();
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var y,v,w=function(){function e(e){this.name=e,this.providers=new Map}return e.prototype.addComponent=function(e){var t=this.getProvider(e.name);if(t.isComponentSet())throw new Error("Component "+e.name+" has already been registered with "+this.name);t.setComponent(e)},e.prototype.addOrOverwriteComponent=function(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)},e.prototype.getProvider=function(e){if(this.providers.has(e))return this.providers.get(e);var t=new g(e,this);return this.providers.set(e,t),t},e.prototype.getProviders=function(){return Array.from(this.providers.values())},e}();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */function b(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var i=Array(e),r=0;for(t=0;t<n;t++)for(var o=arguments[t],a=0,s=o.length;a<s;a++,r++)i[r]=o[a];return i}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(v||(v={}));var I={debug:v.DEBUG,verbose:v.VERBOSE,info:v.INFO,warn:v.WARN,error:v.ERROR,silent:v.SILENT},E=v.INFO,D=((y={})[v.DEBUG]="log",y[v.VERBOSE]="log",y[v.INFO]="info",y[v.WARN]="warn",y[v.ERROR]="error",y),_=function(e,t){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];if(!(t<e.logLevel)){var r=(new Date).toISOString(),o=D[t];if(!o)throw new Error("Attempted to log a message with an invalid logType (value: "+t+")");console[o].apply(console,b(["["+r+"]  "+e.name+":"],n))}},S=function(){function e(e){this.name=e,this._logLevel=E,this._logHandler=_,this._userLogHandler=null}return Object.defineProperty(e.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in v))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),e.prototype.setLogLevel=function(e){this._logLevel="string"==typeof e?I[e]:e},Object.defineProperty(e.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,b([this,v.DEBUG],e)),this._logHandler.apply(this,b([this,v.DEBUG],e))},e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,b([this,v.VERBOSE],e)),this._logHandler.apply(this,b([this,v.VERBOSE],e))},e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,b([this,v.INFO],e)),this._logHandler.apply(this,b([this,v.INFO],e))},e.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,b([this,v.WARN],e)),this._logHandler.apply(this,b([this,v.WARN],e))},e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,b([this,v.ERROR],e)),this._logHandler.apply(this,b([this,v.ERROR],e))},e}();
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class C{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map((e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}}const T=new S("@firebase/app"),O={"@firebase/app":"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},A=new Map,k=new Map;function j(e,t){try{e.container.addComponent(t)}catch(n){T.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function P(e){const t=e.name;if(k.has(t))return T.debug(`There were multiple attempts to register component ${t}.`),!1;k.set(t,e);for(const t of A.values())j(t,e);return!0}function x(e,t){return e.container.getProvider(t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F=new c("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class L{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new m("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw F.create("app-deleted",{appName:this._name})}}function N(e,t,n){var i;let r=null!==(i=O[e])&&void 0!==i?i:e;n&&(r+=`-${n}`);const o=r.match(/\s|\//),a=t.match(/\s|\//);if(o||a){const e=[`Unable to register library "${r}" with version "${t}":`];return o&&e.push(`library name "${r}" contains illegal characters (whitespace or "/")`),o&&a&&e.push("and"),a&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void T.warn(e.join(" "))}P(new m(`${r}-version`,(()=>({library:r,version:t})),"VERSION"))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $;P(new m("platform-logger",(e=>new C(e)),"PRIVATE")),N("@firebase/app","0.7.0",$),N("fire-js","");function M(e){return Array.prototype.slice.call(e)}function z(e){return new Promise((function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}}))}function R(e,t,n){var i,r=new Promise((function(r,o){z(i=e[t].apply(e,n)).then(r,o)}));return r.request=i,r}function B(e,t,n){var i=R(e,t,n);return i.then((function(e){if(e)return new G(e,i.request)}))}function q(e,t,n){n.forEach((function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})}))}function H(e,t,n,i){i.forEach((function(i){i in n.prototype&&(e.prototype[i]=function(){return R(this[t],i,arguments)})}))}function K(e,t,n,i){i.forEach((function(i){i in n.prototype&&(e.prototype[i]=function(){return this[t][i].apply(this[t],arguments)})}))}function U(e,t,n,i){i.forEach((function(i){i in n.prototype&&(e.prototype[i]=function(){return B(this[t],i,arguments)})}))}function V(e){this._index=e}function G(e,t){this._cursor=e,this._request=t}function W(e){this._store=e}function J(e){this._tx=e,this.complete=new Promise((function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}}))}function X(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new J(n)}function Y(e){this._db=e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
N("firebase","9.0.0","app"),q(V,"_index",["name","keyPath","multiEntry","unique"]),H(V,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),U(V,"_index",IDBIndex,["openCursor","openKeyCursor"]),q(G,"_cursor",["direction","key","primaryKey","value"]),H(G,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach((function(e){e in IDBCursor.prototype&&(G.prototype[e]=function(){var t=this,n=arguments;return Promise.resolve().then((function(){return t._cursor[e].apply(t._cursor,n),z(t._request).then((function(e){if(e)return new G(e,t._request)}))}))})})),W.prototype.createIndex=function(){return new V(this._store.createIndex.apply(this._store,arguments))},W.prototype.index=function(){return new V(this._store.index.apply(this._store,arguments))},q(W,"_store",["name","keyPath","indexNames","autoIncrement"]),H(W,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),U(W,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),K(W,"_store",IDBObjectStore,["deleteIndex"]),J.prototype.objectStore=function(){return new W(this._tx.objectStore.apply(this._tx,arguments))},q(J,"_tx",["objectStoreNames","mode"]),K(J,"_tx",IDBTransaction,["abort"]),X.prototype.createObjectStore=function(){return new W(this._db.createObjectStore.apply(this._db,arguments))},q(X,"_db",["name","version","objectStoreNames"]),K(X,"_db",IDBDatabase,["deleteObjectStore","close"]),Y.prototype.transaction=function(){return new J(this._db.transaction.apply(this._db,arguments))},q(Y,"_db",["name","version","objectStoreNames"]),K(Y,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach((function(e){[W,V].forEach((function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var t=M(arguments),n=t[t.length-1],i=this._store||this._index,r=i[e].apply(i,t.slice(0,-1));r.onsuccess=function(){n(r.result)}})}))})),[V,W].forEach((function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,i=[];return new Promise((function(r){n.iterateCursor(e,(function(e){e?(i.push(e.value),void 0===t||i.length!=t?e.continue():r(i)):r(i)}))}))})}));const Z=new c("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function Q(e){return e instanceof s&&e.code.includes("request-failed")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function te(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function ne(e,t){const n=(await t.json()).error;return Z.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function ie({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function re(e,{refreshToken:t}){const n=ie(e);return n.append("Authorization",function(e){return`FIS_v2 ${e}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)),n}async function oe(e){const t=await e();return t.status>=500&&t.status<600?e():t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ae(e){return new Promise((t=>{setTimeout(t,e)}))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const se=/^[cdef][\w-]{21}$/;function ce(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){return(t=e,btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22);var t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e);return se.test(t)?t:""}catch(e){return""}}function le(e){return`${e.appName}!${e.appId}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ue=new Map;function pe(e,t){const n=le(e);fe(n,t),function(e,t){const n=function(){!de&&"BroadcastChannel"in self&&(de=new BroadcastChannel("[Firebase] FID Change"),de.onmessage=e=>{fe(e.data.key,e.data.fid)});return de}();n&&n.postMessage({key:e,fid:t});0===ue.size&&de&&(de.close(),de=null)}(n,t)}function fe(e,t){const n=ue.get(e);if(n)for(const e of n)e(t)}let de=null;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const he="firebase-installations-store";let me=null;function ge(){return me||(me=function(e,t,n){var i=R(indexedDB,"open",[e,t]),r=i.request;return r&&(r.onupgradeneeded=function(e){n&&n(new X(r.result,e.oldVersion,r.transaction))}),i.then((function(e){return new Y(e)}))}("firebase-installations-database",1,(e=>{switch(e.oldVersion){case 0:e.createObjectStore(he)}}))),me}async function ye(e,t){const n=le(e),i=(await ge()).transaction(he,"readwrite"),r=i.objectStore(he),o=await r.get(n);return await r.put(t,n),await i.complete,o&&o.fid===t.fid||pe(e,t.fid),t}async function ve(e){const t=le(e),n=(await ge()).transaction(he,"readwrite");await n.objectStore(he).delete(t),await n.complete}async function we(e,t){const n=le(e),i=(await ge()).transaction(he,"readwrite"),r=i.objectStore(he),o=await r.get(n),a=t(o);return void 0===a?await r.delete(n):await r.put(a,n),await i.complete,!a||o&&o.fid===a.fid||pe(e,a.fid),a}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function be(e){let t;const n=await we(e,(n=>{const i=function(e){return De(e||{fid:ce(),registrationStatus:0})}(n),r=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(Z.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()};return{installationEntry:n,registrationPromise:async function(e,t){try{return ye(e,await async function(e,{fid:t}){const n=ee(e),i=ie(e),r={fid:t,authVersion:"FIS_v2",appId:e.appId,sdkVersion:"w:0.5.0"},o={method:"POST",headers:i,body:JSON.stringify(r)},a=await oe((()=>fetch(n,o)));if(a.ok){const e=await a.json();return{fid:e.fid||t,registrationStatus:2,refreshToken:e.refreshToken,authToken:te(e.authToken)}}throw await ne("Create Installation",a)}(e,t))}catch(n){throw Q(n)&&409===n.customData.serverCode?await ve(e):await ye(e,{fid:t.fid,registrationStatus:0}),n}}(e,n)}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:Ie(e)}:{installationEntry:t}}(e,i);return t=r.registrationPromise,r.installationEntry}));return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function Ie(e){let t=await Ee(e);for(;1===t.registrationStatus;)await ae(100),t=await Ee(e);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await be(e);return n||t}return t}function Ee(e){return we(e,(e=>{if(!e)throw Z.create("installation-not-found");return De(e)}))}function De(e){return 1===(t=e).registrationStatus&&t.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}async function _e({appConfig:e,platformLoggerProvider:t},n){const i=function(e,{fid:t}){return`${ee(e)}/${t}/authTokens:generate`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,n),r=re(e,n),o=t.getImmediate({optional:!0});o&&r.append("x-firebase-client",o.getPlatformInfoString());const a={installation:{sdkVersion:"w:0.5.0"}},s={method:"POST",headers:r,body:JSON.stringify(a)},c=await oe((()=>fetch(i,s)));if(c.ok){return te(await c.json())}throw await ne("Generate Auth Token",c)}async function Se(e,t=!1){let n;const i=await we(e.appConfig,(i=>{if(!Te(i))throw Z.create("not-registered");const r=i.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(e)}(r))return i;if(1===r.requestStatus)return n=async function(e,t){let n=await Ce(e.appConfig);for(;1===n.authToken.requestStatus;)await ae(100),n=await Ce(e.appConfig);const i=n.authToken;return 0===i.requestStatus?Se(e,t):i}(e,t),i;{if(!navigator.onLine)throw Z.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(i);return n=async function(e,t){try{const n=await _e(e,t),i=Object.assign(Object.assign({},t),{authToken:n});return await ye(e.appConfig,i),n}catch(n){if(!Q(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await ye(e.appConfig,n)}else await ve(e.appConfig);throw n}}(e,t),t}}));return n?await n:i.authToken}function Ce(e){return we(e,(e=>{if(!Te(e))throw Z.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+1e4<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e;var n;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}))}function Te(e){return void 0!==e&&2===e.registrationStatus}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Oe(e,t=!1){const n=e;await async function(e){const{registrationPromise:t}=await be(e);t&&await t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n.appConfig);return(await Se(n,t)).token}function Ae(e){return Z.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ke=e=>{const t=x(e.getProvider("app").getImmediate(),"installations").getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:i}=await be(t.appConfig);return i?i.catch(console.error):Se(t).catch(console.error),n.fid}(t),getToken:e=>Oe(t,e)}};P(new m("installations",(e=>{const t=e.getProvider("app").getImmediate();return{app:t,appConfig:function(e){if(!e||!e.options)throw Ae("App Configuration");if(!e.name)throw Ae("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw Ae(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t),platformLoggerProvider:x(t,"platform-logger"),_delete:()=>Promise.resolve()}}),"PUBLIC")),P(new m("installations-internal",ke,"PRIVATE")),N("@firebase/installations","0.5.0");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const je="https://www.googletagmanager.com/gtag/js",Pe=new S("@firebase/analytics");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function xe(e){return Promise.all(e.map((e=>e.catch((e=>e)))))}function Fe(e,t,n,i){return async function(r,o,a){try{"event"===r?await async function(e,t,n,i,r){try{let o=[];if(r&&r.send_to){let e=r.send_to;Array.isArray(e)||(e=[e]);const i=await xe(n);for(const n of e){const e=i.find((e=>e.measurementId===n)),r=e&&t[e.appId];if(!r){o=[];break}o.push(r)}}0===o.length&&(o=Object.values(t)),await Promise.all(o),e("event",i,r||{})}catch(e){Pe.error(e)}}(e,t,n,o,a):"config"===r?await async function(e,t,n,i,r,o){const a=i[r];try{if(a)await t[a];else{const e=(await xe(n)).find((e=>e.measurementId===r));e&&await t[e.appId]}}catch(e){Pe.error(e)}e("config",r,o)}(e,t,n,i,o,a):e("set",o)}catch(e){Pe.error(e)}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Le=new c("analytics","Analytics",{"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.'});const Ne=new class{constructor(e={},t=1e3){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}};function $e(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function Me(e,t=Ne,n){const{appId:i,apiKey:r,measurementId:o}=e.options;if(!i)throw Le.create("no-app-id");if(!r){if(o)return{measurementId:o,appId:i};throw Le.create("no-api-key")}const a=t.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},s=new Re;return setTimeout((async()=>{s.abort()}),void 0!==n?n:6e4),ze({appId:i,apiKey:r,measurementId:o},a,s,t)}async function ze(e,{throttleEndTimeMillis:t,backoffCount:n},i,r=Ne){const{appId:o,measurementId:a}=e;try{await function(e,t){return new Promise(((n,i)=>{const r=Math.max(t-Date.now(),0),o=setTimeout(n,r);e.addEventListener((()=>{clearTimeout(o),i(Le.create("fetch-throttle",{throttleEndTimeMillis:t}))}))}))}(i,t)}catch(e){if(a)return Pe.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${e.message}]`),{appId:o,measurementId:a};throw e}try{const t=await async function(e){var t;const{appId:n,apiKey:i}=e,r={method:"GET",headers:$e(i)},o="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",n),a=await fetch(o,r);if(200!==a.status&&304!==a.status){let e="";try{const n=await a.json();(null===(t=n.error)||void 0===t?void 0:t.message)&&(e=n.error.message)}catch(e){}throw Le.create("config-fetch-failed",{httpStatus:a.status,responseMessage:e})}return a.json()}(e);return r.deleteThrottleMetadata(o),t}catch(t){if(!function(e){if(!(e instanceof s&&e.customData))return!1;const t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(t)){if(r.deleteThrottleMetadata(o),a)return Pe.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${t.message}]`),{appId:o,measurementId:a};throw t}const c=503===Number(t.customData.httpStatus)?d(n,r.intervalMillis,30):d(n,r.intervalMillis),l={throttleEndTimeMillis:Date.now()+c,backoffCount:n+1};return r.setThrottleMetadata(o,l),Pe.debug(`Calling attemptFetch again in ${c} millis`),ze(e,l,i,r)}}class Re{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach((e=>e()))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Be(){if(!("indexedDB"in self)||null==indexedDB)return Pe.warn(Le.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await new Promise((function(e,t){try{var n=!0,i="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(i);r.onsuccess=function(){r.result.close(),n||self.indexedDB.deleteDatabase(i),e(!0)},r.onupgradeneeded=function(){n=!1},r.onerror=function(){var e;t((null===(e=r.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}}))}catch(e){return Pe.warn(Le.create("indexeddb-unavailable",{errorInfo:e}).message),!1}return!0}async function qe(e,t,n,i,r,o,a){var s;const c=Me(e);c.then((t=>{n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&Pe.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)})).catch((e=>Pe.error(e))),t.push(c);const l=Be().then((e=>e?i.getId():void 0)),[u,p]=await Promise.all([c,l]);(function(){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(je))return t;return null})()||function(e,t){const n=document.createElement("script");n.src=`${je}?l=${e}&id=${t}`,n.async=!0,document.head.appendChild(n)}(o,u.measurementId),r("js",new Date);const f=null!==(s=null==a?void 0:a.config)&&void 0!==s?s:{};return f.origin="firebase",f.update=!0,null!=p&&(f.firebase_id=p),r("config",u.measurementId,f),u.measurementId}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e){this.app=e}_delete(){return delete Ke[this.app.options.appId],Promise.resolve()}}let Ke={},Ue=[];const Ve={};let Ge,We,Je=!1;function Xe(){const e=[];var t;if("object"==typeof(t="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0)&&void 0!==t.id&&e.push("This is a browser extension environment."),navigator&&navigator.cookieEnabled||e.push("Cookies are not available."),e.length>0){const t=e.map(((e,t)=>`(${t+1}) ${e}`)).join(" "),n=Le.create("invalid-analytics-context",{errorInfo:t});Pe.warn(n.message)}}function Ye(e,t,n){Xe();const i=e.options.appId;if(!i)throw Le.create("no-app-id");if(!e.options.apiKey){if(!e.options.measurementId)throw Le.create("no-api-key");Pe.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`)}if(null!=Ke[i])throw Le.create("already-exists",{id:i});if(!Je){!function(e){let t=[];Array.isArray(window[e])?t=window[e]:window[e]=t}("dataLayer");const{wrappedGtag:e,gtagCore:t}=function(e,t,n,i,r){let o=function(...e){window[i].push(arguments)};return window[r]&&"function"==typeof window[r]&&(o=window[r]),window[r]=Fe(o,e,t,n),{gtagCore:o,wrappedGtag:window[r]}}(Ke,Ue,Ve,"dataLayer","gtag");We=e,Ge=t,Je=!0}Ke[i]=qe(e,Ue,Ve,t,Ge,"dataLayer",n);return new He(e)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ze(e,t,n,i){e=h(e),async function(e,t,n,i,r){if(r&&r.global)e("event",n,i);else{const r=await t;e("event",n,Object.assign(Object.assign({},i),{send_to:r}))}}(We,Ke[e.app.options.appId],t,n,i).catch((e=>Pe.error(e)))}P(new m("analytics",((e,{options:t})=>Ye(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),t)),"PUBLIC")),P(new m("analytics-internal",(function(e){try{const t=e.getProvider("analytics").getImmediate();return{logEvent:(e,n,i)=>Ze(t,e,n,i)}}catch(e){throw Le.create("interop-component-reg-failed",{reason:e})}}),"PRIVATE")),N("@firebase/analytics","0.7.0");!function(e=function(e="[DEFAULT]"){const t=A.get(e);if(!t)throw F.create("no-app",{appName:e});return t}()){const t=x(e=h(e),"analytics");t.isInitialized()?t.getImmediate():function(e,t={}){const n=x(e,"analytics");if(n.isInitialized()){const e=n.getImmediate();if(p(t,n.getOptions()))return e;throw Le.create("already-initialized")}n.initialize({options:t})}(e)}(function(e,t={}){if("object"!=typeof t){t={name:t}}const n=Object.assign({name:"[DEFAULT]",automaticDataCollectionEnabled:!1},t),i=n.name;if("string"!=typeof i||!i)throw F.create("bad-app-name",{appName:String(i)});const r=A.get(i);if(r){if(p(e,r.options)&&p(n,r.config))return r;throw F.create("duplicate-app",{appName:i})}const o=new w(i);for(const e of k.values())o.addComponent(e);const a=new L(e,n,o);return A.set(i,a),a}({apiKey:"AIzaSyDXDDZJS3mHlAGwcLL9qRYs30SAW5h3Ly0",authDomain:"web-paragon.firebaseapp.com",projectId:"web-paragon",storageBucket:"web-paragon.appspot.com",messagingSenderId:"59394117419",appId:"1:59394117419:web:fc7173d15609bb0332bf6e",measurementId:"G-DK3FHC0RDM"}));
