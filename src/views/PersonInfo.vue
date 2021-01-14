<template>
  <div class="content">
    <el-breadcrumb separator-class="el-icon-arrow-right" id="body_title">
      <el-breadcrumb-item :to="{ path: '/employee/salaryinfo' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="info">
      <div class="info1">
        <span class="text">工号：{{ userinfo.accounts }}</span>
        <span class="text">职称：{{ userinfo.professional }}</span>
      </div>
      <div class="info1">
        <span class="text">姓名：{{ userinfo.name }}</span>
        <span class="text">邮箱：{{ userinfo.email }}</span>
      </div>
      <div class="info1">
        <span class="text">身份证：{{ userinfo.idcard }}</span>
        <span class="text">岗位类型：{{ userinfo.posttype }}</span>
      </div>
      <div class="info1">
        <span class="text">电话：{{ userinfo.telephone }}</span>
        <span class="text">科室：{{ userinfo.department }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userinfo: this.$store.state.data[0],
    };
  },
  mounted: function () {
    // console.log(this.$store.state.data[0]);
  },
};
</script>
<style>
.content {
}
.info {
  background-color: #fff;
  margin: 0 50px 0 50px;
  padding: 50px 50px 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 10px;
}
.info1 {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}
.text {
  width: 50%;
  font-size: 18px;
  text-align: left;
}
</style>