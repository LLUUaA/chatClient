<template>
  <el-container>
    <el-header>
      <div class="login-btn" v-if="!userInfo || !userInfo.uid">
        <a href="#">注册 ·</a>
        <a href="#">登陆</a>
      </div>

      <el-dropdown v-else class="login-btn user-wrap">
        <el-badge is-dot>
          <img class="avatar" :src="userInfo.avatar || './assets/img/ico_headImg.svg'">
        </el-badge>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>账号信息</el-dropdown-item>
          <el-dropdown-item divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main>
      <el-tabs type="border-card">
        <el-tab-pane data-id="online" label="在线聊天">
          <div>在线聊天</div>
          <el-card class="box-card">
            <div v-for="o in onLineList" :key="o" class="item">{{'好友ID: ' + o }}</div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane data-id="chat" label="聊天室">聊天室</el-tab-pane>
      </el-tabs>
    </el-main>

    <el-dialog
      class="dialog"
      title="登陆"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>请登录</span>
      <el-input
        class="ipt"
        prefix-icon="el-icon-mobile-phone"
        v-model="form.account"
        placeholder="账号"
      ></el-input>
      <el-input
        class="ipt"
        prefix-icon="el-icon-view"
        v-model="form.password"
        placeholder="密码"
        type="password"
        :clearable="true"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">登 陆</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
import io from "socket.io-client";

export default {
  name: "HelloWorld",
  data() {
    return {
      dialogVisible: false,
      form: {},
      onLineList: [],
      userInfo: null
    };
  },

  mounted() {
    this.connectSocket();
    this.getOnlineList()
  },

  methods: {
    handleClose(event) {
      this.dialogVisible = false;
    },

    getOnlineList () {
      this.axios({
        url: "message/onLine",
        method: "get"
      }).then(res=>{
        
      })
    },

    connectSocket() {
      const socket = io("ws://localhost:3001", {
        path: "/test",
        transports: ["websocket"],
        query: {
          token: this.session
        }
      });
      console.log("socket", socket);
      socket.on("connect", function() {
        socket.emit("message", 11);
        socket.on(socket.id, function(data) {
          console.log("on msg single", data);
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
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.login-btn {
  float: right;
  margin-top: 10px;
  margin-right: 15px;
}

.login-btn a {
  color: #303133;
}

.user-wrap {
  height: 40px;
}

.user-wrap .avatar {
  width: 40px;
  height: 40px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

.dialog .ipt {
  margin-top: 10px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.box-card {
}

.box-card .item {
  text-align: start;
}
</style>
