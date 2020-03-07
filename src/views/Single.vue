<template>
  <div class="online-left">
    <friendsComponent @show="showChat" :datas="onlineList"> </friendsComponent>
    <chatComponent ref="chatRef" :chatHistory="chatList" :chatInfo="showItem" @send="sendMessage"></chatComponent>
  </div>
</template>
<script>
import friendsComponent from "@/components/friends";
import chatComponent from "@/components/chat";

import { EVENT_HAS_READ_MSG, ASIDE_SINGLE_NUM, SINGLE } from '@/service/constant';

export default {
  name: "single",
  components: {
    friendsComponent,
    chatComponent
  },
  data() {
    return {
      currentIndex: null,
      onlineList: null,
      showItem: null,
      chatList: null,
    };
  },

  mounted() {
    this.getOnlineList();
  },

  methods: {
    // 聊天
    async showChat(index) {
      const currentItem = this.onlineList[index];
      if (!currentItem) {
        return;
      }
      this.showItem = currentItem;
      await this.getChatById(currentItem.uid);
      this.myListener.emit(EVENT_HAS_READ_MSG, currentItem.notReadCount, SINGLE); // 发送已读通知
      this.onlineList[index].notReadCount = 0;
    },

    async getChatById(uid) {
      const res = await this.axios({
        url: "message/history",
        params: {
          uid
        }
      });
      this.chatList = res;
      return;
    },

    getOnlineList() {
      this.axios({
        url: "friend/list",
        method: "get"
      }).then(res => {
        this.onlineList = (res || []).filter(item => item && item.uid);
        // this.showChat(0);
        this.listenMessage();
      });
    },

    // 发送消息
    sendMessage(content) {
      if (!this.showItem) {
        this.$message({
          showClose: true,
          message: "还没有选择好友哦",
          type: "warning"
        });
        return;
      }

      if (!content) {
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
          content: content
        }
      }).then(res => {
        if (!this.chatList) {
          this.chatList = [];
        }
        this.$refs["chatRef"].clearInput();
        this.chatList.push(res);
      });
    },

    listenMessage() {
      this.WS.on("message", (data, type) => {
        if (type !== SINGLE) {
          return;
        }
        this.$notify({
          title: "消息",
          message: "你有新的消息",
          type: "success",
          iconClass: "el-icon-message"
        });
        if (!this.chatList) {
          this.chatList = [];
        }

        if (this.showItem && data.sendUid === this.showItem.uid) {
          this.chatList.push(data);
        } else {
          // 判断在线列表
          if (!this.onlineList || !this.onlineList.length) {
            return;
          }

          for (let i = 0; i < this.onlineList.length; i++) {
            const item = this.onlineList[i];
            if (item.uid === data.sendUid) {
              item.notReadCount++;
              item.last = data;
              this.$set(this.onlineList, i, item);
              break;
            }
          }
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

