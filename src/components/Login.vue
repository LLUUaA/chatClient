<template>
  <el-container>
    <el-main>
      <!-- <img src="../assets/logo.png"> -->
      <p>0 . 0</p>
      <el-input v-model="form.account" prefix-icon="el-icon-mobile-phone" placeholder="账号"></el-input>
      <el-input v-model="form.password" prefix-icon="el-icon-view" placeholder="密码" type="password"></el-input>
      <el-button type="primary" :loading="showLoading" @click="login">登陆</el-button>
    </el-main>
  </el-container>
</template>

<script>
import { setSession } from '../utils/session'
export default {
  name: "login",
  data() {
    return {
      form: {},
      showLoading: false
    };
  },

  mounted() {},

  methods: {
    login() {
      this.showLoading = true;
      this.axios({
        url: "account/login",
        method: "post",
        data: this.form
      })
        .then(res => {
          this.$message({
            message: "登陆成功",
            type: "success"
          });

          this.userInfo = res;
          this.session = sessionKey;
          setSession(res.sessionKey);
          this.$router.push('login')
        },err => {
          console.log("err", err);
          this.$message({
            message: err.data.content || "登陆失败",
            type: "warning"
          });
        })
        .then(e => {
          this.showLoading = false;
        });
    }
  }
};
</script>

<style scoped>
.el-container {
  max-width: 450px;
  margin: 200px auto;
}

.el-input,
.el-button {
  margin-top: 15px;
}

.el-button {
  width: 100%;
}
</style>
