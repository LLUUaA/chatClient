<template>
  <div style="height:100%;">
    <el-dialog title="创建房间" :visible.sync="dialogVisible">
      <el-form :model="roomModal">
        <el-form-item label="名称" label-width="100px">
          <el-input v-model="roomModal.name" autocomplete="off" maxlength="16" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="房间号" label-width="100px" maxlength="20" show-word-limit>
          <el-input v-model="roomModal.roomNo" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="100px" maxlength="100" show-word-limit>
          <el-input v-model="roomModal.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newRoom">确 定</el-button>
      </div>
    </el-dialog>
    <div class="online-left">
      <friendsComponent :noDataText="noDataText" @show="showChat" :datas="roomList"> </friendsComponent>
      <chatComponent ref="chatRef" :chatHistory="chatList" :chatInfo="showItem" :showAvatar="true" @send="sendMessage"></chatComponent>
    </div>
  </div>

</template>

<script>
import friendsComponent from "@/components/friends";
import chatComponent from "@/components/chat";

import { ASIDE_ROOM_NUM, ROOM, EVENT_HAS_READ_MSG } from '@/service/constant';

export default {
  name: "room",
  components: {
    friendsComponent,
    chatComponent
  },
  data() {
    return {
      roomModal: {
        name: null,
        roomNo: null,
        description: null
      },
      noDataText: '还没有聊天室哦，添加聊天室进行聊天吧',
      dialogVisible: null,
      roomList: null,
      showItem: null,
      chatList: null,
    };
  },

  mounted() {
    this.getRoomList();
  },

  methods: {
    // 聊天
     async showChat(index) {
      const currentItem = this.roomList[index];
      if (!currentItem) {
        return;
      }
      this.showItem = currentItem;
      await this.getChatById(currentItem.id);
      this.myListener.emit(EVENT_HAS_READ_MSG, currentItem.notReadCount, ROOM); // 发送已读通知
      this.roomList[index].notReadCount = 0;
    },
    /**
     * @description 新建房间
     */
    async newRoom() {
      this.axios({
        url: "/room/create",
        method: "post",
        data: this.roomModal
      }).then(
        res => {
          this.dialogVisible = false;
          this.$message({
            showClose: true,
            message: "success",
            type: "success"
          });
        },
        err => {}
      );
    },

    // 发送消息
    sendMessage(content) {
      if (!this.showItem) {
        this.$message({
          showClose: true,
          message: "还没有选择聊天室哦",
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
        url: "message/room/send",
        method: "post",
        data: {
          id: this.showItem.id,
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

    async getChatById(roomId) {
      const res = await this.axios({
        url: "message/history/room",
        params: {
          id: roomId
        }
      });
      this.chatList = res;
      return;
    },

    getRoomList() {
      this.axios({
        url: "room/list",
        method: "get"
      }).then(res => {
        this.roomList = res;
        // this.showChat(0);
        this.listenMessage();
      });
    },

    listenMessage() {
      this.WS.on("message", (data, type) => {
        if (type !== ROOM) {
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
        if (this.showItem && data.roomId === this.showItem.id) {
          this.chatList.push(data);
        } else {
          if (!this.roomList || !this.roomList.length) { return; }

          for (let i = 0; i < this.roomList.length; i++) {
            const item = this.roomList[i];
            if (item.id === data.roomId) {
              item.notReadCount++;
              item.last = data;
              this.$set(this.roomList, i, item);
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

