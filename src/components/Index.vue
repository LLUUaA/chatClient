<template>
  <!-- <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <el-row class="">
          <el-col>
            <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">在线聊天</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-setting"></i>
                <span slot="title">聊天室</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container> -->

  <el-container style="min-height:100vh;">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <el-row class="">
          <el-col>
            <el-menu router default-active="/index" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
              <el-menu-item index="/index">
                <i class="el-icon-menu"></i>
                <span slot="title">在线聊天</span>
              </el-menu-item>
              <el-menu-item index="/index/room">
                <i class="el-icon-setting"></i>
                <span slot="title">聊天室</span>
              </el-menu-item>
              <el-menu-item index="/index/search">
                <i class="el-icon-search"></i>
                <span slot="title">查找</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>

</template>
<script>
export default {
  name: "index",
  data() {
    return {

    };
  },

  mounted() {

  },

  methods: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


.el-menu-item {
  text-align: start;
}

.slider {

}
.box-card {
  min-width: 450px;
  height: 100%;
  min-height: 550px;
}

.onlie-left {
  display: flex;
  height: 100%;
}

.box-card .item {
  padding: 10px;
  text-align: start;
}

.box-card .item:hover {
  background-color: #f5f7fa;
  cursor: pointer;
}

.content-input-wrap {
  padding: 0 10px;
}

.el-input {
  margin-right: 20px;
}

.onlie-left .avatar {
  width: 20px;
  height: 20px;
  vertical-align: bottom;
}
.onlie-left .name {
  vertical-align: middle;
}

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

.main {
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
</style>
