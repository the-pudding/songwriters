function y(){}function G(t,e){for(const n in e)t[n]=e[n];return t}function O(t){return t()}function z(){return Object.create(null)}function b(t){t.forEach(O)}function T(t){return typeof t=="function"}function dt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function J(t){return Object.keys(t).length===0}function K(t,...e){if(t==null)return y;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function _t(t,e,n){t.$$.on_destroy.push(K(e,n))}function ht(t,e,n,i){if(t){const r=W(t,e,n,i);return t[0](r)}}function W(t,e,n,i){return t[1]&&i?G(n.ctx.slice(),t[1](i(e))):n.ctx}function mt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const u=[],s=Math.max(e.dirty.length,r.length);for(let l=0;l<s;l+=1)u[l]=e.dirty[l]|r[l];return u}return e.dirty|r}return e.dirty}function pt(t,e,n,i,r,u){if(r){const s=W(e,n,i,u);t.p(s,r)}}function yt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function gt(t){return t&&T(t.destroy)?t.destroy:y}let v=!1;function Q(){v=!0}function U(){v=!1}function V(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function X(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let c=0;c<e.length;c++){const f=e[c];f.claim_order!==void 0&&o.push(f)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let o=0;o<e.length;o++){const c=e[o].claim_order,f=(r>0&&e[n[r]].claim_order<=c?r+1:V(1,r,x=>e[n[x]].claim_order,c))-1;i[o]=n[f]+1;const a=f+1;n[a]=o,r=Math.max(a,r)}const u=[],s=[];let l=e.length-1;for(let o=n[r]+1;o!=0;o=i[o-1]){for(u.push(e[o-1]);l>=o;l--)s.push(e[l]);l--}for(;l>=0;l--)s.push(e[l]);u.reverse(),s.sort((o,c)=>o.claim_order-c.claim_order);for(let o=0,c=0;o<s.length;o++){for(;c<u.length&&s[o].claim_order>=u[c].claim_order;)c++;const f=c<u.length?u[c]:null;t.insertBefore(s[o],f)}}function Y(t,e){t.appendChild(e)}function Z(t,e){if(v){for(X(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function bt(t,e,n){v&&!n?Z(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function B(t){t.parentNode&&t.parentNode.removeChild(t)}function xt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function H(t){return document.createElement(t)}function tt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function j(t){return document.createTextNode(t)}function $t(){return j(" ")}function wt(){return j("")}function D(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function et(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function vt(t,e,n){e in t?t[e]=typeof t[e]=="boolean"&&n===""?!0:n:et(t,e,n)}function Et(t){return t===""?null:+t}function nt(t){return Array.from(t.childNodes)}function it(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function P(t,e,n,i,r=!1){it(t);const u=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const l=t[s];if(e(l)){const o=n(l);return o===void 0?t.splice(s,1):t[s]=o,r||(t.claim_info.last_index=s),l}}for(let s=t.claim_info.last_index-1;s>=0;s--){const l=t[s];if(e(l)){const o=n(l);return o===void 0?t.splice(s,1):t[s]=o,r?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,l}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function q(t,e,n,i){return P(t,r=>r.nodeName===e,r=>{const u=[];for(let s=0;s<r.attributes.length;s++){const l=r.attributes[s];n[l.name]||u.push(l.name)}u.forEach(s=>r.removeAttribute(s))},()=>i(e))}function Nt(t,e,n){return q(t,e,n,H)}function At(t,e,n){return q(t,e,n,tt)}function rt(t,e){return P(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>j(e),!0)}function St(t){return rt(t," ")}function Ct(t,e){e=""+e,t.data!==e&&(t.data=e)}function Tt(t,e){t.value=e??""}function jt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function kt(t,e,n){for(let i=0;i<t.options.length;i+=1){const r=t.options[i];if(r.__value===e){r.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function Mt(t){const e=t.querySelector(":checked");return e&&e.__value}let $;function st(){if($===void 0){$=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{$=!0}}return $}function zt(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=H("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=st();let u;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",u=D(window,"message",s=>{s.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{u=D(i.contentWindow,"resize",e),e()}),Y(t,i),()=>{(r||u&&i.contentWindow)&&u(),B(i)}}function Dt(t,e,n){t.classList[n?"add":"remove"](e)}function Lt(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const u=r.textContent.trim();u===`HEAD_${t}_END`?(i-=1,n.push(r)):u===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function Ot(t,e){return new t(e)}let g;function p(t){g=t}function E(){if(!g)throw new Error("Function called outside component initialization");return g}function Wt(t){E().$$.on_mount.push(t)}function Bt(t){E().$$.after_update.push(t)}function Ht(t,e){return E().$$.context.set(t,e),e}function Pt(t){return E().$$.context.get(t)}const h=[],L=[];let m=[];const A=[],I=Promise.resolve();let S=!1;function F(){S||(S=!0,I.then(R))}function qt(){return F(),I}function C(t){m.push(t)}function It(t){A.push(t)}const N=new Set;let _=0;function R(){if(_!==0)return;const t=g;do{try{for(;_<h.length;){const e=h[_];_++,p(e),ot(e.$$)}}catch(e){throw h.length=0,_=0,e}for(p(null),h.length=0,_=0;L.length;)L.pop()();for(let e=0;e<m.length;e+=1){const n=m[e];N.has(n)||(N.add(n),n())}m.length=0}while(h.length);for(;A.length;)A.pop()();S=!1,N.clear(),p(t)}function ot(t){if(t.fragment!==null){t.update(),b(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}function ct(t){const e=[],n=[];m.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),m=e}const w=new Set;let d;function Ft(){d={r:0,c:[],p:d}}function Rt(){d.r||b(d.c),d=d.p}function ut(t,e){t&&t.i&&(w.delete(t),t.i(e))}function Gt(t,e,n,i){if(t&&t.o){if(w.has(t))return;w.add(t),d.c.push(()=>{w.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Jt=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function Kt(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Qt(t){t&&t.c()}function Ut(t,e){t&&t.l(e)}function lt(t,e,n,i){const{fragment:r,after_update:u}=t.$$;r&&r.m(e,n),i||C(()=>{const s=t.$$.on_mount.map(O).filter(T);t.$$.on_destroy?t.$$.on_destroy.push(...s):b(s),t.$$.on_mount=[]}),u.forEach(C)}function at(t,e){const n=t.$$;n.fragment!==null&&(ct(n.after_update),b(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ft(t,e){t.$$.dirty[0]===-1&&(h.push(t),F(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Vt(t,e,n,i,r,u,s,l=[-1]){const o=g;p(t);const c=t.$$={fragment:null,ctx:[],props:u,update:y,not_equal:r,bound:z(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:z(),dirty:l,skip_bound:!1,root:e.target||o.$$.root};s&&s(c.root);let f=!1;if(c.ctx=n?n(t,e.props||{},(a,x,...k)=>{const M=k.length?k[0]:x;return c.ctx&&r(c.ctx[a],c.ctx[a]=M)&&(!c.skip_bound&&c.bound[a]&&c.bound[a](M),f&&ft(t,a)),x}):[],c.update(),f=!0,b(c.before_update),c.fragment=i?i(c.ctx):!1,e.target){if(e.hydrate){Q();const a=nt(e.target);c.fragment&&c.fragment.l(a),a.forEach(B)}else c.fragment&&c.fragment.c();e.intro&&ut(t.$$.fragment),lt(t,e.target,e.anchor,e.customElement),U(),R()}p(o)}class Xt{$destroy(){at(this,1),this.$destroy=y}$on(e,n){if(!T(n))return y;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!J(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{T as $,lt as A,at as B,Z as C,y as D,ht as E,pt as F,yt as G,mt as H,_t as I,Lt as J,xt as K,C as L,kt as M,D as N,Mt as O,Kt as P,It as Q,vt as R,Xt as S,Jt as T,zt as U,Dt as V,tt as W,At as X,Pt as Y,Ht as Z,gt as _,$t as a,b as a0,Tt as a1,Et as a2,bt as b,St as c,Gt as d,wt as e,Rt as f,ut as g,B as h,Vt as i,Bt as j,H as k,Nt as l,nt as m,et as n,Wt as o,jt as p,j as q,rt as r,dt as s,qt as t,Ct as u,Ft as v,L as w,Ot as x,Qt as y,Ut as z};
