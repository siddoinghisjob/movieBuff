"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[335],{335:function(e,n,t){t.r(n),t.d(n,{default:function(){return o}});var l=t(982),i=t(885),r=t(791),s=t(643),a=t(184);function o(e){var n=(0,r.useState)([]),o=(0,i.Z)(n,2),c=o[0],d=o[1],f=r.lazy((function(){return t.e(684).then(t.bind(t,684))}));return(0,r.useEffect)((function(){fetch("https://api.themoviedb.org/3/"+(null===e||void 0===e?void 0:e.type)+"/"+(null===e||void 0===e?void 0:e.id)+"/recommendations?api_key=d295dbc3df693393259f2c07fb7a0e4a&page=1").then((function(e){return e.json()})).then((function(n){var t;d([]),null===(t=n.results)||void 0===t||t.forEach((function(n){d((function(t){return[].concat((0,l.Z)(t),[{src:n.poster_path?"https://image.tmdb.org/t/p/w500"+n.poster_path:"/assets/images/nonfoundhor.png",alt:n.title,link:"/"+(null===e||void 0===e?void 0:e.type)+"/"+n.id}])}))}))})).catch((function(e){window.open("/404")}))}),[]),(0,a.jsx)(a.Fragment,{children:(null===c||void 0===c?void 0:c.length)>0&&(0,a.jsxs)("div",{className:"flex font-xl fontDesi p-2 flex-col w-full h-8/12",children:[(0,a.jsxs)("div",{className:"flex w-full flex-row items-center mb-2",children:[(0,a.jsx)("div",{className:"w-28 h-1 bg-black"}),(0,a.jsx)("div",{className:"border-2 border-black rounded-b-none bg-yellow-400 text-black w-fit p-2 py-1 rounded-xl",children:"Recommendations"})]})," ",(0,a.jsxs)(r.Suspense,{fallback:(0,a.jsx)("div",{className:"h-full w-full justify-center items-center flex",children:(0,a.jsx)(s.fe,{visible:!0,height:"80",width:"80",ariaLabel:"dna-loading",wrapperStyle:{},wrapperClass:"dna-wrapper"})}),children:[" ",(0,a.jsx)(f,{className:"cursor-pointer",arr:c})]})]})})}}}]);
//# sourceMappingURL=335.20db6e36.chunk.js.map