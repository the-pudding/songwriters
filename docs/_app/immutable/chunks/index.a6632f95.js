function y(){}function z(t,n){for(const e in n)t[e]=n[e];return t}function O(t){return t()}function M(){return Object.create(null)}function x(t){t.forEach(O)}function C(t){return typeof t=="function"}function ct(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function F(t){return Object.keys(t).length===0}function I(t,...n){if(t==null)return y;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function st(t,n,e){t.$$.on_destroy.push(I(n,e))}function ot(t,n,e,i){if(t){const r=B(t,n,e,i);return t[0](r)}}function B(t,n,e,i){return t[1]&&i?z(e.ctx.slice(),t[1](i(n))):e.ctx}function lt(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const l=[],u=Math.max(n.dirty.length,r.length);for(let o=0;o<u;o+=1)l[o]=n.dirty[o]|r[o];return l}return n.dirty|r}return n.dirty}function ft(t,n,e,i,r,l){if(r){const u=B(n,e,i,l);t.p(u,r)}}function at(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function dt(t){return t&&C(t.destroy)?t.destroy:y}let E=!1;function R(){E=!0}function W(){E=!1}function G(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function J(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let s=0;s<n.length;s++){const a=n[s];a.claim_order!==void 0&&c.push(a)}n=c}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let c=0;c<n.length;c++){const s=n[c].claim_order,a=(r>0&&n[e[r]].claim_order<=s?r+1:G(1,r,b=>n[e[b]].claim_order,s))-1;i[c]=e[a]+1;const f=a+1;e[f]=c,r=Math.max(f,r)}const l=[],u=[];let o=n.length-1;for(let c=e[r]+1;c!=0;c=i[c-1]){for(l.push(n[c-1]);o>=c;o--)u.push(n[o]);o--}for(;o>=0;o--)u.push(n[o]);l.reverse(),u.sort((c,s)=>c.claim_order-s.claim_order);for(let c=0,s=0;c<u.length;c++){for(;s<l.length&&u[c].claim_order>=l[s].claim_order;)s++;const a=s<l.length?l[s]:null;t.insertBefore(u[c],a)}}function K(t,n){if(E){for(J(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function _t(t,n,e){E&&!e?K(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function Q(t){t.parentNode&&t.parentNode.removeChild(t)}function ht(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function U(t){return document.createElement(t)}function j(t){return document.createTextNode(t)}function mt(){return j(" ")}function pt(){return j("")}function yt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function gt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function xt(t){return t===""?null:+t}function V(t){return Array.from(t.childNodes)}function X(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function H(t,n,e,i,r=!1){X(t);const l=(()=>{for(let u=t.claim_info.last_index;u<t.length;u++){const o=t[u];if(n(o)){const c=e(o);return c===void 0?t.splice(u,1):t[u]=c,r||(t.claim_info.last_index=u),o}}for(let u=t.claim_info.last_index-1;u>=0;u--){const o=t[u];if(n(o)){const c=e(o);return c===void 0?t.splice(u,1):t[u]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=u,o}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function Y(t,n,e,i){return H(t,r=>r.nodeName===n,r=>{const l=[];for(let u=0;u<r.attributes.length;u++){const o=r.attributes[u];e[o.name]||l.push(o.name)}l.forEach(u=>r.removeAttribute(u))},()=>i(n))}function bt(t,n,e){return Y(t,n,e,U)}function Z(t,n){return H(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>j(n),!0)}function $t(t){return Z(t," ")}function Et(t,n){n=""+n,t.data!==n&&(t.data=n)}function vt(t,n){t.value=n??""}function wt(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function Nt(t,n,e){for(let i=0;i<t.options.length;i+=1){const r=t.options[i];if(r.__value===n){r.selected=!0;return}}(!e||n!==void 0)&&(t.selectedIndex=-1)}function At(t){const n=t.querySelector(":checked");return n&&n.__value}function St(t,n){const e=[];let i=0;for(const r of n.childNodes)if(r.nodeType===8){const l=r.textContent.trim();l===`HEAD_${t}_END`?(i-=1,e.push(r)):l===`HEAD_${t}_START`&&(i+=1,e.push(r))}else i>0&&e.push(r);return e}function Ct(t,n){return new t(n)}let g;function p(t){g=t}function v(){if(!g)throw new Error("Function called outside component initialization");return g}function jt(t){v().$$.on_mount.push(t)}function Tt(t){v().$$.after_update.push(t)}function kt(t,n){return v().$$.context.set(t,n),n}function Mt(t){return v().$$.context.get(t)}const h=[],D=[];let m=[];const N=[],L=Promise.resolve();let A=!1;function P(){A||(A=!0,L.then(q))}function Dt(){return P(),L}function S(t){m.push(t)}function Ot(t){N.push(t)}const w=new Set;let _=0;function q(){if(_!==0)return;const t=g;do{try{for(;_<h.length;){const n=h[_];_++,p(n),tt(n.$$)}}catch(n){throw h.length=0,_=0,n}for(p(null),h.length=0,_=0;D.length;)D.pop()();for(let n=0;n<m.length;n+=1){const e=m[n];w.has(e)||(w.add(e),e())}m.length=0}while(h.length);for(;N.length;)N.pop()();A=!1,w.clear(),p(t)}function tt(t){if(t.fragment!==null){t.update(),x(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(S)}}function nt(t){const n=[],e=[];m.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),m=n}const $=new Set;let d;function Bt(){d={r:0,c:[],p:d}}function Ht(){d.r||x(d.c),d=d.p}function et(t,n){t&&t.i&&($.delete(t),t.i(n))}function Lt(t,n,e,i){if(t&&t.o){if($.has(t))return;$.add(t),d.c.push(()=>{$.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}else i&&i()}function Pt(t,n,e){const i=t.$$.props[n];i!==void 0&&(t.$$.bound[i]=e,e(t.$$.ctx[i]))}function qt(t){t&&t.c()}function zt(t,n){t&&t.l(n)}function it(t,n,e,i){const{fragment:r,after_update:l}=t.$$;r&&r.m(n,e),i||S(()=>{const u=t.$$.on_mount.map(O).filter(C);t.$$.on_destroy?t.$$.on_destroy.push(...u):x(u),t.$$.on_mount=[]}),l.forEach(S)}function rt(t,n){const e=t.$$;e.fragment!==null&&(nt(e.after_update),x(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function ut(t,n){t.$$.dirty[0]===-1&&(h.push(t),P(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Ft(t,n,e,i,r,l,u,o=[-1]){const c=g;p(t);const s=t.$$={fragment:null,ctx:[],props:l,update:y,not_equal:r,bound:M(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(c?c.$$.context:[])),callbacks:M(),dirty:o,skip_bound:!1,root:n.target||c.$$.root};u&&u(s.root);let a=!1;if(s.ctx=e?e(t,n.props||{},(f,b,...T)=>{const k=T.length?T[0]:b;return s.ctx&&r(s.ctx[f],s.ctx[f]=k)&&(!s.skip_bound&&s.bound[f]&&s.bound[f](k),a&&ut(t,f)),b}):[],s.update(),a=!0,x(s.before_update),s.fragment=i?i(s.ctx):!1,n.target){if(n.hydrate){R();const f=V(n.target);s.fragment&&s.fragment.l(f),f.forEach(Q)}else s.fragment&&s.fragment.c();n.intro&&et(t.$$.fragment),it(t,n.target,n.anchor,n.customElement),W(),q()}p(c)}class It{$destroy(){rt(this,1),this.$destroy=y}$on(n,e){if(!C(e))return y;const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!F(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{it as A,rt as B,K as C,y as D,ot as E,ft as F,at as G,lt as H,st as I,St as J,ht as K,S as L,Nt as M,yt as N,At as O,Pt as P,Ot as Q,Mt as R,It as S,kt as T,dt as U,C as V,x as W,vt as X,xt as Y,mt as a,_t as b,$t as c,Lt as d,pt as e,Ht as f,et as g,Q as h,Ft as i,Tt as j,U as k,bt as l,V as m,gt as n,jt as o,wt as p,j as q,Z as r,ct as s,Dt as t,Et as u,Bt as v,D as w,Ct as x,qt as y,zt as z};
