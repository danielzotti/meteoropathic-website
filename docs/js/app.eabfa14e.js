(function(e){function t(t){for(var r,s,a=t[0],c=t[1],u=t[2],d=0,h=[];d<a.length;d++)s=a[d],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&h.push(i[s][0]),i[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(h.length)h.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==i[c]&&(r=!1)}r&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},i={app:0},o=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"02b7":function(e,t,n){},1:function(e,t){},2:function(e,t){},"2f0e":function(e,t,n){},3:function(e,t){},"3f3f":function(e,t,n){"use strict";n("02b7")},"499d":function(e,t,n){"use strict";n("e8c8")},b612:function(e,t,n){"use strict";n("2f0e")},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),i={class:"expression"};function o(e,t,n,o,s,a){var c=Object(r["j"])("WebcamVideo"),u=Object(r["j"])("Meteo");return Object(r["g"])(),Object(r["c"])(r["a"],null,[Object(r["e"])(c,{"show-buttons":!1,"show-landmarks":!1,"show-video":!0,onExpressionChanged:e.onFaceExpressionChange},null,8,["onExpressionChanged"]),Object(r["e"])(u,{"meteo-class":e.meteoClass},null,8,["meteo-class"]),Object(r["e"])("div",i,Object(r["k"])(e.expression),1)],64)}var s=Object(r["l"])("data-v-68a5a6ce");Object(r["i"])("data-v-68a5a6ce");var a={class:"container"},c={class:"buttons"},u={key:0};Object(r["h"])();var l=s((function(e,t,n,i,o,s){return Object(r["g"])(),Object(r["c"])("div",a,[Object(r["e"])("div",{class:"video-container",style:e.styleObject},[Object(r["e"])("video",{ref:"video",width:e.width,height:e.height,autoplay:"",muted:""},null,8,["width","height"]),Object(r["e"])("canvas",{ref:"canvas",width:e.width,height:e.height},null,8,["width","height"])],4),Object(r["e"])("div",c,[Object(r["e"])("button",{onClick:t[1]||(t[1]=function(){return e.toggleShowButtons&&e.toggleShowButtons.apply(e,arguments)})},"⚙"),e.isButtonsVisible?(Object(r["g"])(),Object(r["c"])("span",u,[Object(r["e"])("button",{onClick:t[2]||(t[2]=function(){return e.togglePlayVideo&&e.togglePlayVideo.apply(e,arguments)})},Object(r["k"])(e.isPlaying?"stop":"play")+" video",1),Object(r["e"])("button",{onClick:t[3]||(t[3]=function(){return e.toggleShowVideo&&e.toggleShowVideo.apply(e,arguments)})},Object(r["k"])(e.isVideoVisible?"hide":"show")+" video",1),Object(r["e"])("button",{onClick:t[4]||(t[4]=function(){return e.toggleShowLandmarks&&e.toggleShowLandmarks.apply(e,arguments)})},Object(r["k"])(e.isLandmarksVisible?"hide":"show")+" landmarks",1)])):Object(r["d"])("",!0)])])})),d=n("1da1"),h=(n("96cf"),n("a9e3"),n("ab39")),p=n("3835"),f=n("d4ec"),b=n("bee2"),g=(n("13d5"),n("4fad"),n("b75a")),v=n("b8be"),m=n("c79c"),j=n("8730"),O=n("883e"),w=function(){function e(){Object(f["a"])(this,e)}return Object(b["a"])(e,null,[{key:"init",value:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t="/models",e.next=3,Object(h["g"])(t);case 3:return e.next=5,Object(h["e"])(t);case 5:return e.next=7,Object(h["f"])(t);case 7:return e.next=9,Object(h["d"])(t);case 9:return e.next=11,Object(h["h"])(t);case 11:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getVideo",value:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(){var t,n,r=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:{maxWidth:1280,maxHeight:720},n={audio:!1,video:{width:{max:t.maxWidth},height:{max:t.maxHeight}}},e.prev=2,e.next=5,navigator.mediaDevices.getUserMedia(n);case 5:return e.abrupt("return",e.sent);case 8:e.prev=8,e.t0=e["catch"](2),console.log(e.t0);case 11:return e.abrupt("return",null);case 12:case"end":return e.stop()}}),e,null,[[2,8]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"getExpressionDetection",value:function(e){var t=this,n=e.videoRef,r=e.refreshMs,i=void 0===r?100:r,o=Object(g["a"])(n,"play"),s=Object(v["a"])(i);return Object(m["a"])([s,o]).pipe(Object(j["a"])((function(e){var r=Object(p["a"])(e,2);r[0],r[1];return t.detectFace(n)})),Object(O["a"])((function(e){return!!e})))}},{key:"detectFace",value:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(h["b"])(t,new h["a"]).withFaceLandmarks().withFaceExpressions().withFaceDescriptor());case 1:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getExpressionName",value:function(e){if(null===e||void 0===e||!e.expressions)return null;var t=Object.entries(e.expressions).reduce((function(e,t){var n=Object(p["a"])(t,2),r=n[0],i=n[1];return i>e.value?{key:r,value:i}:e}),{key:"neutral",value:0});return t.key}}]),e}(),y=n("4503"),k=n("3a47"),x=n("196e"),V=n("3b1c"),C=Object(r["f"])({name:"WebcamVideo",data:function(){return{isButtonsVisible:this.showButtons,isVideoVisible:this.showVideo,isLandmarksVisible:this.showLandmarks,isPlaying:!0}},props:{width:{type:Number,default:144},height:{type:Number,default:112},showVideo:{type:Boolean,default:!0},showButtons:{type:Boolean,default:!1},showLandmarks:{type:Boolean,default:!1}},mounted:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.play();case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),computed:{styleObject:function(){return{width:"".concat(this.width,"px"),height:"".concat(this.height,"px"),opacity:this.isVideoVisible?"1":"0"}}},methods:{togglePlayVideo:function(){this.isPlaying?this.stop():this.play()},toggleShowButtons:function(){this.isButtonsVisible=!this.isButtonsVisible},toggleShowVideo:function(){this.isVideoVisible=!this.isVideoVisible},toggleShowLandmarks:function(){this.isLandmarksVisible=!this.isLandmarksVisible,this.isLandmarksVisible||this.clearCanvas()},play:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(){var t,n,r,i,o,s=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.debug("Start playing..."),this.isPlaying=!0,t=this.$refs.video,n=this.$refs.canvas,e.next=6,w.init();case 6:return e.next=8,w.getVideo({maxWidth:this.width,maxHeight:this.height});case 8:t.srcObject=e.sent,r=100,i=1e3,o=w.getExpressionDetection({videoRef:t,refreshMs:r}),o.pipe(Object(O["a"])((function(e){return!!s.isLandmarksVisible})),Object(y["a"])((function(e){return s.printLandmarks(e,n)}))).subscribe(),o.pipe(Object(O["a"])((function(e){return!!e})),Object(k["a"])((function(e){return e?w.getExpressionName(e):null})),Object(x["a"])(),Object(V["a"])(i)).subscribe((function(e){return s.expressionChanged(e)})),console.debug("Started");case 15:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),stop:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.debug("stop"),t=this.$refs.video,t.srcObject=null,this.isPlaying=!1;case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),clearCanvas:function(){var e=this.$refs.canvas,t=e.getContext("2d");null===t||void 0===t||t.clearRect(0,0,e.width,e.height)},printLandmarks:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.clearCanvas(),t&&h["c"].drawDetections(n,t);case 2:case"end":return e.stop()}}),e,this)})));function t(t,n){return e.apply(this,arguments)}return t}(),expressionChanged:function(e){this.$emit("expressionChanged",e)}},emits:["expressionChanged"]});n("3f3f");C.render=l,C.__scopeId="data-v-68a5a6ce";var S=C,R=Object(r["l"])("data-v-2c893816"),P=R((function(e,t,n,i,o,s){return Object(r["g"])(),Object(r["c"])("div",{class:["meteo-container",e.meteoClass]},null,2)})),L=Object(r["f"])({name:"Meteo",props:{meteoClass:String}});n("b612");L.render=P,L.__scopeId="data-v-2c893816";var B=L,E=Object(r["f"])({name:"App",components:{WebcamVideo:S,Meteo:B},data:function(){return{meteoClass:"cloudy",expression:"neutral"}},methods:{onFaceExpressionChange:function(e){switch(this.expression=e,console.debug({expressionInApp:e}),e){case"happy":this.meteoClass="sun";break;case"angry":this.meteoClass="storm";break;case"sad":this.meteoClass="rain";break;case"disgusted":this.meteoClass="pollution";break;case"surprised":this.meteoClass="sunset";break;default:this.meteoClass="cloudy"}}},computed:{}});n("499d");E.render=o;var M=E,_=n("9483");Object(_["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),Object(r["b"])(M).mount("#app")},e8c8:function(e,t,n){}});
//# sourceMappingURL=app.eabfa14e.js.map