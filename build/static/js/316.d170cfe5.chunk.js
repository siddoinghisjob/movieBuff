"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[316],{316:function(e,l,n){n.r(l),n.d(l,{default:function(){return d}});var i=n(982),t=n(885),r=n(791),o=n(184);function d(e){var l=(0,r.useState)([]),d=(0,t.Z)(l,2),a=d[0],s=d[1],c=r.lazy((function(){return n.e(684).then(n.bind(n,684))}));return(0,r.useEffect)((function(){fetch("https://api.themoviedb.org/3/"+e.type+"/"+e.id+"/credits?api_key=d295dbc3df693393259f2c07fb7a0e4a").then((function(e){return e.json()})).then((function(e){s([]);for(var l=function(l){var n,t,r,o,d,a={alt:null===e||void 0===e||null===(n=e.crew[l])||void 0===n?void 0:n.name,tag:[null===e||void 0===e||null===(t=e.crew[l])||void 0===t?void 0:t.job,null===e||void 0===e||null===(r=e.crew[l])||void 0===r?void 0:r.name],src:null!==e&&void 0!==e&&null!==(o=e.crew[l])&&void 0!==o&&o.profile_path?"https://image.tmdb.org/t/p/w200"+(null===e||void 0===e||null===(d=e.crew[l])||void 0===d?void 0:d.profile_path):"/assets/images/nonfoundhor.png"};s((function(e){return[].concat((0,i.Z)(e),[a])}))},n=0;n<((null===e||void 0===e||null===(t=e.crew)||void 0===t?void 0:t.length)<20?null===e||void 0===e||null===(r=e.crew)||void 0===r?void 0:r.length:20);n++){var t,r;l(n)}})).catch((function(e){window.open("/404")}))}),[]),(0,o.jsx)(o.Fragment,{children:(null===a||void 0===a?void 0:a.length)>0&&(0,o.jsxs)("div",{className:"flex font-xl fontDesi p-2 flex-col w-full h-full",children:[(0,o.jsx)("div",{className:"w-full flex justify-end",children:(0,o.jsxs)("div",{className:"flex w-full flex-row-reverse items-center gap-0",children:[(0,o.jsx)("div",{className:"w-28 h-1 bg-black"}),(0,o.jsx)("div",{className:"border-2 border-black rounded-b-none bg-yellow-400 text-black w-fit p-2 py-1 rounded-xl",children:"Crew"})]})}),(0,o.jsxs)(r.Suspense,{fallback:(0,o.jsx)("div",{className:"h-full w-full justify-center items-center flex",children:(0,o.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-arrow-repeat",viewBox:"0 0 16 16",children:[(0,o.jsx)("path",{d:"M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"}),(0,o.jsx)("path",{"fill-rule":"evenodd",d:"M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"})]})}),children:[" ",(0,o.jsx)(c,{arr:a})]})]})})}}}]);
//# sourceMappingURL=316.d170cfe5.chunk.js.map