(()=>{"use strict";var e,t,n,o,r,s={192:(e,t,n)=>{n.d(t,{Z:()=>s});var o=n(645),r=n.n(o)()((function(e){return e[1]}));r.push([e.id,"body{width:100%;height:100%;margin:0;display:flex;flex-direction:column;justify-content:center;align-items:center}body .title{display:flex}body .title>div{margin:0 15px;cursor:pointer}body .content{height:80vh}body .content .sample{display:flex;flex-direction:column}body .content .sample>div:nth-child(1){display:flex;justify-content:center;margin:50px 0 15px 0;padding:0 15px}body .content .sample>div:nth-child(2){margin-bottom:70px}body .content .sample img{max-width:100vw}body .content .benchmark{display:none;flex-direction:column}body .content .benchmark>.start{display:flex;justify-content:center;margin:50px 0 15px 0;padding:0 15px}body .content .benchmark>.count{display:flex;flex-direction:column;min-width:30vw;max-width:90vw}body .content .benchmark>.count>div{display:flex;justify-content:space-between}body .content .benchmark>.tips{display:none;justify-content:center}\n",""]);const s=r},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=e(t);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,o){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(o)for(var s=0;s<this.length;s++){var i=this[s][0];null!=i&&(r[i]=!0)}for(var a=0;a<e.length;a++){var c=[].concat(e[a]);o&&r[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}},404:(e,t,n)=>{var o=n(379),r=n.n(o),s=n(192);r()(s.Z,{insert:"head",singleton:!1}),s.Z.locals},379:(e,t,n)=>{var o,r=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),s=[];function i(e){for(var t=-1,n=0;n<s.length;n++)if(s[n].identifier===e){t=n;break}return t}function a(e,t){for(var n={},o=[],r=0;r<e.length;r++){var a=e[r],c=t.base?a[0]+t.base:a[0],d=n[c]||0,l="".concat(c," ").concat(d);n[c]=d+1;var u=i(l),m={css:a[1],media:a[2],sourceMap:a[3]};-1!==u?(s[u].references++,s[u].updater(m)):s.push({identifier:l,updater:h(m,t),references:1}),o.push(l)}return o}function c(e){var t=document.createElement("style"),o=e.attributes||{};if(void 0===o.nonce){var s=n.nc;s&&(o.nonce=s)}if(Object.keys(o).forEach((function(e){t.setAttribute(e,o[e])})),"function"==typeof e.insert)e.insert(t);else{var i=r(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(t)}return t}var d,l=(d=[],function(e,t){return d[e]=t,d.filter(Boolean).join("\n")});function u(e,t,n,o){var r=n?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(e.styleSheet)e.styleSheet.cssText=l(t,r);else{var s=document.createTextNode(r),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(s,i[t]):e.appendChild(s)}}function m(e,t,n){var o=n.css,r=n.media,s=n.sourceMap;if(r?e.setAttribute("media",r):e.removeAttribute("media"),s&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}var p=null,f=0;function h(e,t){var n,o,r;if(t.singleton){var s=f++;n=p||(p=c(t)),o=u.bind(null,n,s,!1),r=u.bind(null,n,s,!0)}else n=c(t),o=m.bind(null,n,t),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=(void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o));var n=a(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var o=0;o<n.length;o++){var r=i(n[o]);s[r].references--}for(var c=a(e,t),d=0;d<n.length;d++){var l=i(n[d]);0===s[l].references&&(s[l].updater(),s.splice(l,1))}n=c}}}},50:(e,t,n)=>{n.d(t,{Z:()=>o});const o=class extends class{constructor(){this.functionEventMap=new Map}emit(e,t){const n=this.functionEventMap.get(e);if(n)for(const o of n)o.fn(t),o.isOnce&&this.remove(e,o.fn)}on(e,t){this.functionEventMap.has(e)||this.functionEventMap.set(e,new Set);const n=this.functionEventMap.get(e);let o=!1;for(const e of n)if(e.fn===t){o=!0,e.isOnce=!1;break}o||n.add({fn:t,isOnce:!1})}once(e,t){this.functionEventMap.has(e)||this.functionEventMap.set(e,new Set);const n=this.functionEventMap.get(e);let o=!1;for(const e of n)if(e.fn===t){o=!0,e.isOnce=!0;break}o||n.add({fn:t,isOnce:!0})}remove(e,t){const n=this.functionEventMap.get(e);if(n){for(const e of n)if(e.fn===t){n.delete(e);break}0===n.size&&this.functionEventMap.delete(e)}}removeAll(e){this.functionEventMap.delete(e)}hasEventName(e){return!!this.functionEventMap.has(e)&&this.functionEventMap.get(e).size>0}}{constructor(e){super(),this.worker=e,this._lastSendMessage=0,this._sendMessageTimeout=null,this._combineMessages=[],navigator.serviceWorker.addEventListener("message",this._handleMessage.bind(this)),window.addEventListener("beforeunload",(()=>{this._sendMessageToWorker({type:"unregister"})}))}_handleMessage(e){let t=[];Array.isArray(e.data)?t=e.data:t[0]=e.data;for(const e of t){const{from:t,type:n,eventName:o,data:r}=e;if("service worker event"!==t)return;"emit"===n&&super.emit(o,r),"removeAll"===n&&super.removeAll(o)}}_sendMessageToWorker(e){if(e&&(e.from="service worker event",this._combineMessages.push(e)),30>Date.now()-this._lastSendMessage&&this._combineMessages.length<100)return this._sendMessageTimeout&&window.clearTimeout(this._sendMessageTimeout),void(this._sendMessageTimeout=window.setTimeout((()=>{this._sendMessageTimeout=null,this._sendMessageToWorker()}),Date.now()-this._lastSendMessage));this._lastSendMessage=Date.now(),this.worker.postMessage(this._combineMessages),this._combineMessages=[]}emit(e,t){this._sendMessageToWorker({type:"emit",eventName:e,data:t}),super.emit(e,t),super.hasEventName(e)||this._sendMessageToWorker({type:"remove",eventName:e})}on(e,t){this._sendMessageToWorker({type:"on",eventName:e}),super.on(e,t)}once(e,t){this._sendMessageToWorker({type:"once",eventName:e}),super.once(e,t)}remove(e,t){super.remove(e,t),super.hasEventName(e)||this._sendMessageToWorker({type:"remove",eventName:e})}removeAll(e){this._sendMessageToWorker({type:"removeAll",eventName:e}),super.removeAll(e)}}},607:(e,t,n)=>{n.a(e,(async e=>{var t=n(50);n(404),await(async()=>{try{const e=location.pathname.split("/");e.pop();const n=e.join("/")+"/service-worker.bundle.js",o=await navigator.serviceWorker.register(n);let r;if(o.installing)r=o.installing;else if(o.waiting)r=o.waiting;else if(o.active){r=o.active;const e=new t.Z(r);return void(window.swe=e)}if(!r)throw new Error("worker not exists");r.addEventListener("statechange",(function(e){if("activated"===e.target.state){const e=new t.Z(r);window.swe=e}}))}catch(e){console.error("init service worker error:",e)}})();let o=0,r=0,s="",i="",a=0,c=null;const d=e=>{r++,r%1e4==0&&(()=>{const e=document.querySelector("body .benchmark .count"),t=document.createElement("div"),n=document.createElement("div");n.className="number",n.textContent=r.toString();const s=document.createElement("div");if(s.className="time",s.textContent=(Date.now()-o).toString()+" ms",t.appendChild(n),t.appendChild(s),e.appendChild(t),15===e.childNodes.length){const t=document.createElement("div"),n=document.createElement("div");n.className="number",n.textContent="speed";const r=document.createElement("div");r.className="time",r.textContent=Math.floor(15e6/(Date.now()-o))+" events/s",t.appendChild(n),t.appendChild(r),e.appendChild(t)}})()},l=e=>{a++};window.swe.on("_start_benchmark",(e=>{const t=e.start,n=e.number;if(s!==t)for(let e=0;e<n;e++)window.swe.emit(t,Date.now())})),window.swe.on("_prepare_benchmark",(e=>{const t=e.prepare;i!==t&&window.swe.emit(t,"")})),window.startBenchmark=()=>{document.querySelector("body .benchmark .tips").setAttribute("style","display: none"),s&&window.swe.remove(s,d),c&&(clearTimeout(c),c=null),a=0,document.querySelector("body .benchmark .count").innerHTML="",r=0;const e=Math.random().toString().substr(2);s="_benchmark"+e,i="_prepare_benchmark"+e,c=setTimeout((()=>{a?(o=Date.now(),c=null,window.swe.emit("_start_benchmark",{start:s,number:Math.ceil(15e4/a)})):document.querySelector("body .benchmark .tips").setAttribute("style","display: flex")}),1e3),window.swe.on(s,d),window.swe.on(i,l),window.swe.emit("_prepare_benchmark",{prepare:i})},window.handleSampleClick=()=>{document.querySelector("body .sample").setAttribute("style","display: flex"),document.querySelector("body .benchmark").setAttribute("style","display: none")},window.handleBenchmarkClick=()=>{document.querySelector("body .sample").setAttribute("style","display: none"),document.querySelector("body .benchmark").setAttribute("style","display: flex")},e()}),1)}},i={};function a(e){var t=i[e];if(void 0!==t)return t.exports;var n=i[e]={id:e,exports:{}};return s[e](n,n.exports,a),n.exports}e="function"==typeof Symbol?Symbol("webpack then"):"__webpack_then__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n=e=>{e&&(e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},o=e=>!--e.r&&e(),r=(e,t)=>e?e.push(t):o(t),a.a=(s,i,a)=>{var c,d,l,u=a&&[],m=s.exports,p=!0,f=!1,h=(t,n,o)=>{f||(f=!0,n.r+=t.length,t.map(((t,r)=>t[e](n,o))),f=!1)},v=new Promise(((e,t)=>{l=t,d=()=>(e(m),n(u),u=0)}));v[t]=m,v[e]=(e,t)=>{if(p)return o(e);c&&h(c,e,t),r(u,e),v.catch(t)},s.exports=v,i((s=>{if(!s)return d();var i,a;c=(s=>s.map((s=>{if(null!==s&&"object"==typeof s){if(s[e])return s;if(s.then){var i=[];s.then((e=>{a[t]=e,n(i),i=0}));var a={[e]:(e,t)=>(r(i,e),s.catch(t))};return a}}return{[e]:e=>o(e),[t]:s}})))(s);var l=new Promise(((e,n)=>{(i=()=>e(a=c.map((e=>e[t])))).r=0,h(c,i,n)}));return i.r?l:a})).then(d,l),p=!1},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a(607)})();