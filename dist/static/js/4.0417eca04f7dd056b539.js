webpackJsonp([4],{mlqX:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("BO1k"),s=n.n(i),o=n("p2oO"),a=n("IxXs"),r=n.n(a),c=n("8cdv"),l=[],u={name:"index",data:function(){return{defalutIcon:r.a,ownerInfo:{},currentIndex:1,popoverVisible:null,navList:[{id:1,icon:"icon-aside-chat",txet:"聊天",path:"/index/single"},{id:2,icon:"icon-aside-group",txet:"多人聊天",path:"/index/room"},{id:3,icon:"icon-search",txet:"搜索",path:"/index/search"},{id:4,icon:"icon-setting",txet:"设置",path:"/index/setting"}]}},destroyed:function(){this.destroyedListener(l),this.WS.removeAllListeners()},beforeMount:function(){var t=this;this.getOwnerInfo(),this.getNotReadMsgCountFromServer(),this.handleCurrentShow(this.$route.path),this.$router.beforeEach(function(e,n,i){try{i(),t.handleCurrentShow(e.path),setTimeout(function(){t.emitMsg(c.EVENT_GET_OWNER_INFO,t.$globalData.userInfo)},100)}catch(t){}})},mounted:function(){var t=this;this.listenSocket();var e=this.myListener.on(c.EVENT_UPDATE_OWNER_INFO,function(){t.getOwnerInfo()}),n=this.myListener.on(c.EVENT_HAS_READ_MSG,function(e,n){switch(n){case c.SINGLE:t.navList[0].newMsgCount-=e;break;case c.ROOM:t.navList[1].newMsgCount-=e}});l.push(e,n)},methods:{listenSocket:function(){var t=this;this.WS.on("message",function(e,n){switch(console.log("global listenSocket:",e,n),e){case c.ROOM:t.$notify({title:"消息",message:"你有新的聊天消息",type:"success",iconClass:"el-icon-message"}),t.myListener.emit(c.EVENT_NEW_ROOM_MSG,n);break;case c.SINGLE:t.$notify({title:"消息",message:"你有新的个人消息",type:"success",iconClass:"el-icon-message"}),t.myListener.emit(c.EVENT_NEW_SINGLE_MSG,n);break;case c.TYPING:t.myListener.emit(c.EVENT_TYPING,n);break;case c.ONLNIE_STATUS:t.myListener.emit(c.EVENT_ONLNIE_STATUS,n)}t.checkMsg(e,1)})},emitMsg:function(t,e){this.myListener.emit(t,e)},getOwnerInfo:function(){var t=this;this.axios({url:"/account/owner"}).then(function(e){t.ownerInfo=e,t.$globalData.userInfo=e,t.emitMsg(c.EVENT_GET_OWNER_INFO,e)})},getNotReadMsgCountFromServer:function(){var t=this;this.axios({url:"/message/notRead"}).then(function(e){for(var n in e)t.checkMsg(n,e[n])})},checkMsg:function(t,e){switch(t){case c.ROOM:this.handleMsgState(c.ASIDE_ROOM_NUM,e);break;case c.SINGLE:this.handleMsgState(c.ASIDE_SINGLE_NUM,e)}},handleMsgState:function(t,e){try{var n=this.navList[t-1].newMsgCount||0;this.$set(this.navList[t-1],"newMsgCount",n+e)}catch(t){}},logout:function(){try{this.$router.push("/login"),Object(o.a)(),this.WS.close()}catch(t){}},handleCurrentShow:function(t){var e=!0,n=!1,i=void 0;try{for(var o,a=s()(this.navList);!(e=(o=a.next()).done);e=!0){var r=o.value;if(r.path===t){this.currentIndex=r.id;break}}}catch(t){n=!0,i=t}finally{try{!e&&a.return&&a.return()}finally{if(n)throw i}}},navigateTo:function(t,e){this.$router.push(t.path)}}},h={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-container",{staticClass:"index-container"},[n("el-container",[n("div",{staticClass:"aside-nav-bar"},[n("div",{staticClass:"avatar online"},[n("img",{directives:[{name:"imgLoad",rawName:"v-imgLoad",value:{src:t.ownerInfo.avatar,errorSrc:t.defalutIcon},expression:"{src: ownerInfo.avatar, errorSrc: defalutIcon}"}],attrs:{alt:"avatar"}})]),t._v(" "),n("ul",[t._l(t.navList,function(e,i){return[n("li",{key:i,class:{current:t.currentIndex===e.id,"new-msg":e.newMsgCount>0},attrs:{"data-count":e.newMsgCount},on:{click:function(n){t.navigateTo(e,i)}}},[n("i",{staticClass:"iconfont",class:e.icon}),t._v(" "),n("div",[t._v(t._s(e.txet))])])]})],2),t._v(" "),n("el-popover",{attrs:{placement:"top",width:"160"},model:{value:t.popoverVisible,callback:function(e){t.popoverVisible=e},expression:"popoverVisible"}},[n("p",[t._v("你确定退出聊天吗？")]),t._v(" "),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.popoverVisible=!1}}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.logout}},[t._v("确定")])],1),t._v(" "),n("div",{staticClass:"exit-btn",attrs:{slot:"reference"},slot:"reference"},[n("i",{staticClass:"iconfont icon-exit"})])])],1),t._v(" "),n("el-main",{staticClass:"main"},[n("router-view")],1)],1)],1)},staticRenderFns:[]};var v=n("VU/8")(u,h,!1,function(t){n("zhP/")},null,null);e.default=v.exports},"zhP/":function(t,e){}});