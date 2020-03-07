<template>
  <el-container>
    <el-main class="main-wrap">
      <!-- <img src="../assets/logo.png"> -->
      <p>0 . 0</p>
      <el-input v-model="form.account" prefix-icon="el-icon-mobile-phone" placeholder="账号"></el-input>
      <el-input v-model="form.password" prefix-icon="el-icon-view" placeholder="密码" type="password" @keyup.enter.native="login"></el-input>
      <el-button type="primary" :loading="showLoading" @click="login">登陆</el-button>
      <p>还没有账号？<router-link to="/register">去注册</router-link></p>
    </el-main>
  </el-container>
</template>

<script>
import { setSession } from '../service/session'
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
          setSession(res.sessionKey);
          this.$globalData.userInfo = res;
          this.$globalData.session = res.sessionKey;
          this.$router.push('/index/single')
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
  margin: 0 auto;
  padding: 200px 0;
}

.main-wrap p{
  text-align-last: center;
}

.main-wrap a{
  color: #eee;
}

.el-input,
.el-button {
  margin-top: 15px;
}

.el-button {
  width: 100%;
}
</style>
