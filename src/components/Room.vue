<template>
  <div class="onlie-left">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我的聊天室</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <template v-for="(o,index) in onlineList">
        <div style="text-align:start;" class="item" :key="o.uid" @click="showChat(index)">
          <el-badge :is-dot="o.hasMsg">
            <img class="avatar" :src="o.avatar || defaultIcon.defaultHeadIco">
            <span class="name">{{o.nickName}}</span>
          </el-badge>
        </div>
      </template>
    </el-card>

    <el-card class="card" :body-style="{ padding: '0px', height: '100%' }">
      <div class="nick-name">{{showItem && showItem.nickName || '-'}}</div>
      <el-row id="chatWrap" class="chat-wrap">
        <template v-for="(item,index) in chatList">
          <div :key="item.id" :class="item.isSender?'sender':''" class="chat-item flex">
            <template v-if="item.isSender">
              <div class="content">{{item.content}}</div>
              <img class="avatar" :src="item.avatar || defaultIcon.defaultHeadIco">
            </template>
            <template v-else>
              <img class="avatar" :src="item.avatar || defaultIcon.defaultHeadIco">
              <div class="content">{{item.content}}</div>
            </template>
          </div>
        </template>
        <div v-if="chatList && chatList.length === 0">没有聊天记录哦</div>
      </el-row>
      <el-row class="flex content-input-wrap">
        <el-input v-model="messageContent" clearable @keyup.enter.native="sendMessage" placeholder="请输入内容"></el-input>
        <el-button type="primary" icon="el-icon-news" @click="sendMessage">发送</el-button>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import io from "socket.io-client";

import Vue from "vue";
import defaultHeadIco from "@/assets/head_icon.svg";
import defaultUserIco from "@/assets/user_head.svg";

export default {
  name: "single",
  data() {
    return {
      defaultIcon: {
        defaultUserIco: defaultUserIco,
        defaultHeadIco: defaultHeadIco
      },
      onlineList: null,
      showItem: null,
      chatList: [],
      userInfo: null,
      messageContent: null
    };
  },

  watch: {
    chatList: {
      handler(val, old) {
        this.$nextTick().then(() => {
          this.chatScorllToBottom();
        });
      },
      deep: false
    }
  },

  mounted() {
    this.connectSocket();
    this.getOnlineList();
    this.getOwner();
  },

  methods: {
    // 聊天
    showChat(index) {
      const currentItem = this.onlineList[index];
      this.showItem = currentItem;
      this.onlineList[index].hasMsg = false;
      this.getChatById(currentItem.uid);
    },

    chatScorllToBottom() {
      const el = document.getElementById("chatWrap"),
        scrollHeight = el.scrollHeight;
      let top = el.scrollTop,
        animationFrameId = null;

      // const STEP_NUM = (scrollHeight/1500) * scrollHeight;
      const STEP_NUM = 15;
      const scroll = () => {
        el.scrollTop = top;
        if (scrollHeight >= top) {
          //  window.requestAnimationFrame(scroll);
          animationFrameId = window.requestAnimationFrame(scroll);
        } else {
          window.cancelAnimationFrame(animationFrameId);
        }
        top += STEP_NUM;
      };

      animationFrameId = window.requestAnimationFrame(scroll);
    },

    // 发送消息
    sendMessage() {
      if (!this.showItem) {
        this.$message({
          showClose: true,
          message: "还没有选择好友哦",
          type: "warning"
        });
        return;
      }

      if (!this.messageContent) {
        this.$message({
          showClose: true,
          message: "请输入内容",
          type: "warning"
        });
        return;
      }
      
      this.axios({
        url: "message/send",
        method: "post",
        data: {
          uid: this.showItem.uid,
          content: this.messageContent
        }
      }).then(res => {
        if (!this.chatList) {
          this.chatList = [];
        }
        this.messageContent = null;
        this.chatList.push(res);
      });
    },

    getChatById(uid) {
      this.axios({
        url: "message/history",
        params: {
          uid
        }
      }).then(res => {
        this.chatList = res;
      });
    },

    // 获取owner
    getOwner() {
      this.axios({
        url: "account/ownerUser",
        method: "get"
      }).then(res => {
        this.userInfo = res;
      });
    },

    getOnlineList() {
      this.axios({
        url: "friend/list",
        method: "get"
      }).then(res => {
        this.onlineList = (res || []).filter(item => item && item.uid);
      });
    },

    connectSocket() {
      const _self = this;
      const socket = io("ws://localhost:3001", {
        path: "/test",
        transports: ["websocket"],
        query: {
          token: this.$globalData.session
        }
      });
      // console.log("socket", socket);
      socket.on("connect", function() {
        socket.on(socket.id, function(data) {
          console.log("on msg single", data);
          _self.$notify({
            title: "消息",
            message: "你有新的消息",
            type: "success",
            iconClass:'el-icon-message'
          });
          if (!_self.chatList) {
            _self.chatList = [];
          }

          if (_self.showItem && data.sendUid === _self.showItem.uid) {
            _self.chatList.push(data);
          } else {
            if (_self.onlineList && _self.onlineList.length) {
              for (let i = 0; i < _self.onlineList.length; i++) {
                let item = _self.onlineList[i];
                if (item.uid === data.sendUid) {
                  item.hasMsg = true;
                  Vue.set(_self.onlineList, i, item);
                  break;
                }
              }
            }
          }
        }); //简单实现单-单通信
        socket.on("message", function(data) {
          console.log("on message", data);
        });
      });

      socket.on("error", err => {
        console.log(err);
        this.$message({
          message: err || "socket error",
          type: "warning"
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.onlie-left {
  height: calc(100vh - 160px);
}
.card {
  width: 100%;
  background: rgba(246, 246, 246, 1);
  position: relative;
}

.chat-wrap {
  text-align: left;
  height: calc(100% - 90px);
  padding: 10px 20px;
  overflow: auto;
}

.chat-item {
  margin-bottom: 12px;
}

.chat-item .avatar {
  width: 40px;
  height: 40px;
}

.chat-item .content {
  min-width: 100px;
  padding: 15px;
  margin-left: 15px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 10px 0px rgba(153, 153, 153, 0.2);
  border-radius: 0 4px 4px 4px;
  box-sizing: border-box;
}

.chat-item.sender {
  justify-content: flex-end;
}

.chat-item.sender .content {
  border-radius: 4px 0 4px 4px;
  margin-left: 0;
  margin-right: 15px;
  text-align: right;
}

.nick-name {
  margin: 15px;
  font-weight: bold;
  color: #333333;
  font-size: 16px;
}
</style>

