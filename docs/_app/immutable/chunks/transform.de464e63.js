function N(t,n){return t==null||n==null?NaN:n<t?-1:n>t?1:n>=t?0:NaN}class d extends Map{constructor(n,e=w){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:e}}),n!=null)for(const[r,c]of n)this.set(r,c)}get(n){return super.get(y(this,n))}has(n){return super.has(y(this,n))}set(n,e){return super.set(m(this,n),e)}delete(n){return super.delete(x(this,n))}}function y({_intern:t,_key:n},e){const r=n(e);return t.has(r)?t.get(r):e}function m({_intern:t,_key:n},e){const r=n(e);return t.has(r)?t.get(r):(t.set(r,e),e)}function x({_intern:t,_key:n},e){const r=n(e);return t.has(r)&&(e=t.get(r),t.delete(r)),e}function w(t){return t!==null&&typeof t=="object"?t.valueOf():t}function h(t){return t}function X(t,...n){return a(t,h,h,n)}function Y(t,...n){return a(t,Array.from,h,n)}function v(t,n,...e){return a(t,h,n,e)}function a(t,n,e,r){return function c(f,p){if(p>=r.length)return e(f);const s=new d,k=r[p++];let g=-1;for(const i of f){const o=k(i,++g,f),l=s.get(o);l?l.push(i):s.set(o,[i])}for(const[i,o]of s)s.set(i,c(o,p));return n(s)}(t,0)}function u(t,n,e){this.k=t,this.x=n,this.y=e}u.prototype={constructor:u,scale:function(t){return t===1?this:new u(this.k*t,this.x,this.y)},translate:function(t,n){return t===0&n===0?this:new u(this.k,this.x+this.k*t,this.y+this.k*n)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};u.prototype;export{X as a,N as d,Y as g,v as r};