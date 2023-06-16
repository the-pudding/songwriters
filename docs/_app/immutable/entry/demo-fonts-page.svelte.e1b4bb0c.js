import{S as te,i as le,s as se,k as b,a as P,q as x,J as ve,l as z,h as m,c as A,m as S,r as I,n as g,p as Q,C as i,b as O,a3 as ge,N as Z,u as W,a4 as Ee,D as ee,a5 as ce,o as be,a6 as X,g as U,v as ue,f as de,d as G,K as pe,a7 as ze,y as he,z as me,A as ye,B as _e}from"../chunks/index.615836d1.js";import{g as Ce}from"../chunks/transform.f616a455.js";import{b as ke}from"../chunks/paths.409d9d67.js";function Se(l,e){return l==null||e==null?NaN:e<l?-1:e>l?1:e>=l?0:NaN}async function Te(l){if("clipboard"in navigator)await navigator.clipboard.writeText(l);else{const e=document.createElement("input");e.type="text",e.disabled=!0,e.style.setProperty("position","fixed"),e.style.setProperty("z-index","-100"),e.style.setProperty("pointer-events","none"),e.style.setProperty("opacity","0"),e.value=l,document.body.appendChild(e),e.click(),e.select(),document.execCommand("copy"),document.body.removeChild(e)}}const De=(l,e)=>{async function n(){if(c)try{await Te(c),l.dispatchEvent(new CustomEvent("svelte-copy",{detail:c}))}catch(o){l.dispatchEvent(new CustomEvent("svelte-copy:error",{detail:o}))}}let t=typeof e=="string"?["click"]:[e.events].flat(1),c=typeof e=="string"?e:e.text;return t.forEach(o=>{l.addEventListener(o,n,!0)}),{update:o=>{const v=typeof o=="string"?["click"]:[o.events].flat(1),E=typeof o=="string"?o:o.text,_=v.filter(p=>!t.includes(p)),s=t.filter(p=>!v.includes(p));_.forEach(p=>{l.addEventListener(p,n,!0)}),s.forEach(p=>{l.removeEventListener(p,n,!0)}),t=v,c=E},destroy:()=>{t.forEach(o=>{l.removeEventListener(o,n,!0)})}}};function we(l){let e,n,t,c,o,v,E,_,s,p,a,r,d,T,D,j,L,M,q,w,B,N,H,K;return{c(){e=b("link"),n=P(),t=b("div"),c=b("h3"),o=x(l[0]),v=P(),E=b("p"),_=x(l[1]),s=P(),p=b("details"),a=b("summary"),r=x("CSS Snippet"),d=P(),T=b("code"),D=x(l[2]),j=P(),L=b("p"),M=b("button"),q=x("Copy CSS to Clipboard"),B=b("span"),N=x(l[3]),this.h()},l(k){const C=ve("svelte-1uevrx3",document.head);e=z(C,"LINK",{rel:!0,href:!0}),C.forEach(m),n=A(k),t=z(k,"DIV",{style:!0,class:!0});var u=S(t);c=z(u,"H3",{class:!0});var Y=S(c);o=I(Y,l[0]),Y.forEach(m),v=A(u),E=z(u,"P",{});var f=S(E);_=I(f,l[1]),f.forEach(m),s=A(u),p=z(u,"DETAILS",{class:!0});var h=S(p);a=z(h,"SUMMARY",{class:!0});var y=S(a);r=I(y,"CSS Snippet"),y.forEach(m),d=A(h),T=z(h,"CODE",{class:!0});var R=S(T);D=I(R,l[2]),R.forEach(m),h.forEach(m),j=A(u),L=z(u,"P",{});var V=S(L);M=z(V,"BUTTON",{class:!0});var F=S(M);q=I(F,"Copy CSS to Clipboard"),F.forEach(m),B=z(V,"SPAN",{class:!0});var J=S(B);N=I(J,l[3]),J.forEach(m),V.forEach(m),u.forEach(m),this.h()},h(){g(e,"rel","external stylesheet"),g(e,"href",l[5]),g(c,"class","svelte-19ry7n"),Q(E,"font-size",l[4]),g(a,"class","svelte-19ry7n"),g(T,"class","svelte-19ry7n"),g(p,"class","svelte-19ry7n"),g(M,"class","svelte-19ry7n"),g(B,"class","svelte-19ry7n"),Q(t,"font-family","'"+l[0]+"'"),g(t,"class","svelte-19ry7n")},m(k,C){i(document.head,e),O(k,n,C),O(k,t,C),i(t,c),i(c,o),i(t,v),i(t,E),i(E,_),i(t,s),i(t,p),i(p,a),i(a,r),i(p,d),i(p,T),i(T,D),i(t,j),i(t,L),i(L,M),i(M,q),i(L,B),i(B,N),H||(K=[ge(w=De.call(null,M,l[2])),Z(M,"svelte-copy",l[6])],H=!0)},p(k,[C]){C&1&&W(o,k[0]),C&2&&W(_,k[1]),C&16&&Q(E,"font-size",k[4]),C&4&&W(D,k[2]),w&&Ee(w.update)&&C&4&&w.update.call(null,k[2]),C&8&&W(N,k[3]),C&1&&Q(t,"font-family","'"+k[0]+"'")},i:ee,o:ee,d(k){m(e),k&&m(n),k&&m(t),H=!1,ce(K)}}}function Le(l,e,n){let t,{id:c=""}=e,{family:o=""}=e,{size:v=16}=e,{text:E}=e,_="",s="";const p=`${ke}/assets/demo/fonts/${c}.css`,a=()=>{n(3,s="Copied!"),setTimeout(()=>{n(3,s="")},1e3)};return be(async()=>{const r=await fetch(p);n(2,_=await r.text())}),l.$$set=r=>{"id"in r&&n(7,c=r.id),"family"in r&&n(0,o=r.family),"size"in r&&n(8,v=r.size),"text"in r&&n(1,E=r.text)},l.$$.update=()=>{l.$$.dirty&256&&n(4,t=`${v}px`)},[o,E,_,s,t,p,a,c,v]}class Ne extends te{constructor(e){super(),le(this,e,Le,we,se,{id:7,family:0,size:8,text:1})}}const Pe=[{id:"atkinson",family:"Atkinson",type:"sans-serif"},{id:"atlas",family:"Atlas Grotesk",type:"sans-serif"},{id:"baloo-bhai",family:"Baloo Bhai",type:"sans-serif"},{id:"canela",family:"Canela",type:"serif"},{id:"computer-modern",family:"Computer Modern",type:"serif"},{id:"cozette",family:"Cozette",type:"other"},{id:"inter",family:"Inter",type:"sans-serif"},{id:"jamboree",family:"Jamboree",type:"other"},{id:"jersey",family:"Jersey M54",type:"other"},{id:"lyon",family:"Lyon Display",type:"serif"},{id:"metropolis",family:"Metropolis",type:"sans-serif"},{id:"national",family:"National 2 Web",type:"sans-serif"},{id:"publico",family:"Publico Text",type:"serif"},{id:"recoleta",family:"Recoleta",type:"serif"},{id:"rubik",family:"Rubik",type:"sans-serif"},{id:"spacemono",family:"Space Mono",type:"mono"},{id:"tiempos",family:"Tiempos Text",type:"serif"}];function ae(l,e,n){const t=l.slice();return t[5]=e[n][0],t[6]=e[n][1],t}function ie(l,e,n){const t=l.slice();return t[9]=e[n].family,t[10]=e[n].id,t}function re(l){let e,n;return e=new Ne({props:{id:l[10],family:l[9],size:l[0],text:l[1]}}),{c(){he(e.$$.fragment)},l(t){me(e.$$.fragment,t)},m(t,c){ye(e,t,c),n=!0},p(t,c){const o={};c&1&&(o.size=t[0]),c&2&&(o.text=t[1]),e.$set(o)},i(t){n||(U(e.$$.fragment,t),n=!0)},o(t){G(e.$$.fragment,t),n=!1},d(t){_e(e,t)}}}function fe(l){let e,n=l[5]+"",t,c,o,v,E,_=l[6],s=[];for(let a=0;a<_.length;a+=1)s[a]=re(ie(l,_,a));const p=a=>G(s[a],1,1,()=>{s[a]=null});return{c(){e=b("h2"),t=x(n),c=P(),o=b("section");for(let a=0;a<s.length;a+=1)s[a].c();v=P(),this.h()},l(a){e=z(a,"H2",{});var r=S(e);t=I(r,n),r.forEach(m),c=A(a),o=z(a,"SECTION",{class:!0});var d=S(o);for(let T=0;T<s.length;T+=1)s[T].l(d);v=A(d),d.forEach(m),this.h()},h(){g(o,"class","svelte-1lzc8ku")},m(a,r){O(a,e,r),i(e,t),O(a,c,r),O(a,o,r);for(let d=0;d<s.length;d+=1)s[d]&&s[d].m(o,null);i(o,v),E=!0},p(a,r){if(r&7){_=a[6];let d;for(d=0;d<_.length;d+=1){const T=ie(a,_,d);s[d]?(s[d].p(T,r),U(s[d],1)):(s[d]=re(T),s[d].c(),U(s[d],1),s[d].m(o,v))}for(ue(),d=_.length;d<s.length;d+=1)p(d);de()}},i(a){if(!E){for(let r=0;r<_.length;r+=1)U(s[r]);E=!0}},o(a){s=s.filter(Boolean);for(let r=0;r<s.length;r+=1)G(s[r]);E=!1},d(a){a&&m(e),a&&m(c),a&&m(o),pe(s,a)}}}function xe(l){let e,n,t,c,o,v,E,_,s,p,a,r,d,T,D,j,L,M,q,w,B,N,H,K,k,C=l[2],u=[];for(let f=0;f<C.length;f+=1)u[f]=fe(ae(l,C,f));const Y=f=>G(u[f],1,1,()=>{u[f]=null});return{c(){e=b("div"),n=b("h1"),t=x("Hosted Fonts on The Pudding"),c=P(),o=b("p"),v=b("em"),E=x("Do not use fonts hosted by The Pudding without written permission."),_=P(),s=b("form"),p=b("label"),a=x("font-size: "),r=x(l[0]),d=x("px"),T=P(),D=b("input"),j=P(),L=b("label"),M=x("text sample"),q=P(),w=b("input"),B=P(),N=b("article");for(let f=0;f<u.length;f+=1)u[f].c();this.h()},l(f){e=z(f,"DIV",{id:!0,class:!0});var h=S(e);n=z(h,"H1",{});var y=S(n);t=I(y,"Hosted Fonts on The Pudding"),y.forEach(m),c=A(h),o=z(h,"P",{});var R=S(o);v=z(R,"EM",{});var V=S(v);E=I(V,"Do not use fonts hosted by The Pudding without written permission."),V.forEach(m),R.forEach(m),_=A(h),s=z(h,"FORM",{});var F=S(s);p=z(F,"LABEL",{for:!0,class:!0});var J=S(p);a=I(J,"font-size: "),r=I(J,l[0]),d=I(J,"px"),J.forEach(m),T=A(F),D=z(F,"INPUT",{id:!0,type:!0,min:!0,max:!0}),j=A(F),L=z(F,"LABEL",{for:!0,class:!0});var ne=S(L);M=I(ne,"text sample"),ne.forEach(m),q=A(F),w=z(F,"INPUT",{id:!0,type:!0,maxlength:!0}),F.forEach(m),h.forEach(m),B=A(f),N=z(f,"ARTICLE",{class:!0});var oe=S(N);for(let $=0;$<u.length;$+=1)u[$].l(oe);oe.forEach(m),this.h()},h(){g(p,"for","size"),g(p,"class","svelte-1lzc8ku"),g(D,"id","size"),g(D,"type","range"),g(D,"min","12"),g(D,"max","48"),g(L,"for","text"),g(L,"class","svelte-1lzc8ku"),g(w,"id","text"),g(w,"type","text"),g(w,"maxlength","100"),g(e,"id","info"),g(e,"class","svelte-1lzc8ku"),g(N,"class","svelte-1lzc8ku")},m(f,h){O(f,e,h),i(e,n),i(n,t),i(e,c),i(e,o),i(o,v),i(v,E),i(e,_),i(e,s),i(s,p),i(p,a),i(p,r),i(p,d),i(s,T),i(s,D),X(D,l[0]),i(s,j),i(s,L),i(L,M),i(s,q),i(s,w),X(w,l[1]),O(f,B,h),O(f,N,h);for(let y=0;y<u.length;y+=1)u[y]&&u[y].m(N,null);H=!0,K||(k=[Z(D,"change",l[3]),Z(D,"input",l[3]),Z(w,"input",l[4])],K=!0)},p(f,[h]){if((!H||h&1)&&W(r,f[0]),h&1&&X(D,f[0]),h&2&&w.value!==f[1]&&X(w,f[1]),h&7){C=f[2];let y;for(y=0;y<C.length;y+=1){const R=ae(f,C,y);u[y]?(u[y].p(R,h),U(u[y],1)):(u[y]=fe(R),u[y].c(),U(u[y],1),u[y].m(N,null))}for(ue(),y=C.length;y<u.length;y+=1)Y(y);de()}},i(f){if(!H){for(let h=0;h<C.length;h+=1)U(u[h]);H=!0}},o(f){u=u.filter(Boolean);for(let h=0;h<u.length;h+=1)G(u[h]);H=!1},d(f){f&&m(e),f&&m(B),f&&m(N),pe(u,f),K=!1,ce(k)}}}function Ae(l,e,n){let t=18,c="The quick brown fox jumps over the lazy dog.";const o=Ce(Pe,_=>_.type);o.sort((_,s)=>Se(_[1].length,s[1].length));function v(){t=ze(this.value),n(0,t)}function E(){c=this.value,n(1,c)}return[t,c,o,v,E]}class Ie extends te{constructor(e){super(),le(this,e,Ae,xe,se,{})}}function Me(l){let e,n;return e=new Ie({}),{c(){he(e.$$.fragment)},l(t){me(e.$$.fragment,t)},m(t,c){ye(e,t,c),n=!0},p:ee,i(t){n||(U(e.$$.fragment,t),n=!0)},o(t){G(e.$$.fragment,t),n=!1},d(t){_e(e,t)}}}class Re extends te{constructor(e){super(),le(this,e,null,Me,se,{})}}export{Re as default};
