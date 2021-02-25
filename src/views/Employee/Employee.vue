<template>
  <el-row class="tac">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <div class="title">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3">消息中心</el-menu-item>
        <el-menu-item index="4"
          ><a
            style="color: white; text-decoration: none"
            href="https://www.ele.me"
            target="_blank"
            >订单管理</a
          ></el-menu-item
        >
      </div>
      <div @click="quite">
        <img alt="Vue logo" class="avatar" src="../../assets/bg1.jpg" />
      </div>
    </el-menu>
    <div class="left">
      <el-menu
        :default-active="this.$route.name"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="salaryinfo">
          <i class="el-icon-s-home"></i>
          <span>个人首页</span>
        </el-menu-item>
        <el-menu-item index="1" disabled>
          <i class="el-icon-menu"></i>
          <span slot="title">工资管理</span>
        </el-menu-item>
        <el-menu-item index="infoupdate">
          <i class="el-icon-document"></i>
          <span slot="title">信息管理</span>
        </el-menu-item>
        <el-menu-item index="findps">
          <i class="el-icon-setting"></i>
          <span slot="title">密码找回</span>
        </el-menu-item>
        <el-menu-item index="personinfo">
          <i class="el-icon-s-check"></i>
          <span slot="title">个人中心</span>
        </el-menu-item>
        <div class="list"></div>
      </el-menu>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    quite() {
      this.$router.push("/");
    },
  },
  mounted: function () {
    // console.log(this.$route)
  },
};
</script>
<style scoped>
.title {
  display: flex;
  flex-direction: row;
  padding: 0 28% 0 28%;
  justify-content: space-around;
}
.left {
  float: left;
  width: 20%;
  margin-top: -2px;
  background-color: #545c64;
  overflow: hidden;
}
.list {
  height: 386px;
}
.avatar {
  position: absolute;
  top: 8.5px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50px;
}
.body {
  float: right;
  width: 80%;
  height: 663px;
  background: rgba(237, 237, 243);
  overflow: scroll;
}
</style>