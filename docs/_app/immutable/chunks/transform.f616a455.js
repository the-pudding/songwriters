class g extends Map{constructor(n,e=m){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:e}}),n!=null)for(const[r,h]of n)this.set(r,h)}get(n){return super.get(a(this,n))}has(n){return super.has(a(this,n))}set(n,e){return super.set(l(this,n),e)}delete(n){return super.delete(d(this,n))}}function a({_intern:t,_key:n},e){const r=n(e);return t.has(r)?t.get(r):e}function l({_intern:t,_key:n},e){const r=n(e);return t.has(r)?t.get(r):(t.set(r,e),e)}function d({_intern:t,_key:n},e){const r=n(e);return t.has(r)&&(e=t.get(r),t.delete(r)),e}function m(t){return t!==null&&typeof t=="object"?t.valueOf():t}function x(t){return t}function X(t,...n){return w(t,Array.from,x,n)}function w(t,n,e,r){return function h(c,f){if(f>=r.length)return e(c);const s=new g,y=r[f++];let k=-1;for(const i of c){const u=y(i,++k,c),p=s.get(u);p?p.push(i):s.set(u,[i])}for(const[i,u]of s)s.set(i,h(u,f));return n(s)}(t,0)}function o(t,n,e){this.k=t,this.x=n,this.y=e}o.prototype={constructor:o,scale:function(t){return t===1?this:new o(this.k*t,this.x,this.y)},translate:function(t,n){return t===0&n===0?this:new o(this.k,this.x+this.k*t,this.y+this.k*n)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};o.prototype;export{X as g};
