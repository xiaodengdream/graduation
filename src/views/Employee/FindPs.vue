<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" id="body_title">
      <el-breadcrumb-item v-if="vs1" :to="{ path: '/employee/salaryinfo' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item v-if="vs2" :to="{ path: '/admin/adminfoupdate' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>密码找回</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="input">
        <span class="text1">输入手机号:</span>
        <el-input
          v-model="phone"
          style="width: 30%; margin: 0 10px 0 10px"
        ></el-input>
        <el-button
          v-show="show1"
          style="margin-left: 20px"
          type="success"
          @click="getcode"
          >获取验证码</el-button
        >
      </div>
      <div class="vd">
        <span class="text1">验证码:</span>
        <el-input
          v-model="inputvd"
          style="width: 20%; margin: 0 10px 0 10px"
        ></el-input
        ><span
          v-show="show2"
          style="padding: 5px; background: #13ce66; color: white"
          >{{ vd }}</span
        >
        <el-button
          v-show="show2"
          style="margin-left: 20px"
          type="success"
          @click="sbcode"
          >下一步</el-button
        >
      </div>
      <div class="vd">
        <span class="text1">你的密码:</span>
        <el-input
          v-model="password"
          disabled
          style="width: 20%; margin: 0 10px 0 10px"
        ></el-input>
        <el-button
          v-show="show3"
          style="margin-left: 20px"
          type="success"
          @click="done"
          >完成</el-button
        >
      </div>
      <div class="vd">
        <span class="text1"></span>
        <el-button style="margin-left: 10px" type="success" @click="goback"
          >上一步</el-button
        >
      </div>
      <div class="step">
        <el-steps :active="cg" finish-status="success" :align-center="true">
          <el-step title="验证码"></el-step>
          <el-step title="进行中"></el-step>
          <el-step title="已完成"></el-step>
        </el-steps>
      </div>
    </div>
  </div>
</template>
<script>
import newps from "../../until/FindPs";
export default {
  data() {
    return {
      show1: true,
      show2: false,
      show3: false,
      phone: "",
      vd: "",
      inputvd: "",
      password: "",
      passwords: "",
      cg: 1,
      vs1: "",
      vs2: "",
    };
  },
  mounted() {
    if (this.$store.state.data[0].name) {
      this.vs1 = true;
      this.vs2 = false;
    } else {
      this.vs1 = true;
      this.vs1 = false;
      this.vs2 = true;
    }
  //  console.log(this.$store.state.data[0]);
  },
  methods: {
    getcode() {
      if (this.$store.state.data[0].name) {
        newps.getnewps(this.phone).then((data) => {
          if (data == "") {
            this.$message({
              showClose: true,
              message: "无效号码",
              type: "warning",
              duration: 1000,
            });
          } else {
            this.show1 = false;
            this.show2 = true;
            this.cg = 2;
            this.passwords = data[0].password;
            this.vd = Math.floor(Math.random() * (9999 - 1000)) + 1000;
            //console.log(data[0].password)
          }
        });
      } else {
        if(this.$store.state.data[0].eamil){
        newps.getnewadmps(this.phone).then((data) => {
          if (data == "") {
            this.$message({
              showClose: true,
              message: "无效号码",
              type: "warning",
              duration: 1000,
            });
          } else {
            this.show1 = false;
            this.show2 = true;
            this.cg = 2;
            this.passwords = data[0].password;
            this.vd = Math.floor(Math.random() * (9999 - 1000)) + 1000;
            //console.log(data[0].password)
          }
        })}
        else{
          newps.getnewsenior(this.phone).then((data) => {
          if (data == "") {
            this.$message({
              showClose: true,
              message: "无效号码",
              type: "warning",
              duration: 1000,
            });
          } else {
            this.show1 = false;
            this.show2 = true;
            this.cg = 2;
            this.passwords = data[0].password;
            this.vd = Math.floor(Math.random() * (9999 - 1000)) + 1000;
            //console.log(data[0].password)
          }
        })
        }
      }
    },
    sbcode() {
      if (this.vd == this.inputvd) {
        this.show2 = false;
        this.show3 = true;
        this.cg = 3;
        this.password = this.passwords;
      } else {
        this.$message({
          showClose: true,
          message: "验证码不对",
          type: "warning",
          duration: 1000,
        });
      }
    },
    done() {},
    goback() {
      if (this.show3 == true) {
        this.show3 = false;
        this.show2 = true;
        this.cg = 2;
      } else if (this.show2 == true) {
        this.show3 = false;
        this.show2 = false;
        this.show1 = true;
        this.cg = 1;
      } else if (this.show1 == true) {
        this.$message({
          showClose: true,
          message: "最上面了",
          type: "warning",
          duration: 1000,
        });
      }
    },
  },
};
</script>
<style scoped>
#body_title {
  font-size: 16px;
  height: 12%;
  display: flex;
  align-items: center;
  margin: 28px 0 28px 50px;
}
.content {
  width: 80%;
  margin: 0 0 0 10%;
  background-color: #fff;
  border: 1px solid rgba(220, 220, 220, 0.8);
  box-shadow: 5px 5px 5px rgba(220, 220, 220, 0.8);
}
.input {
  margin: 80px 0 25px 0;
  padding: 0 0 0 10px;
  display: flex;
  align-items: center;
}
.vd {
  margin: 0 0 25px 0;
  padding: 0 0 0 10px;
  display: flex;
  align-items: center;
}
.text1 {
  width: 20%;
  text-align: right;
}
.step {
  margin: 160px 0 50px 0;
  width: 100%;
}
</style>