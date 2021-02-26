<template>
  <div class="content">
    <img alt="Vue logo" class="bg" src="../assets/bg1.jpg" />
    <div class="login_box">
      <div class="title">{{ radio }}登录</div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
        id="form"
      >
        <el-form-item prop="account">
          <el-input
            placeholder="请输入账号"
            prefix-icon="el-icon-user-solid"
            v-model="ruleForm.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-s-goods"
            v-model="ruleForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <div style="float:left;margin-bottom:10px">
          <el-radio v-model="radio" label="员工">员工</el-radio>
           <el-radio v-model="radio" label="一级管理">一级管理</el-radio>
          <el-radio v-model="radio" label="二级管理">二级管理</el-radio>
          </div>
          <div style="float:right">
          <el-button style="margin-right:10px" type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button style="" type="primary" @click="resetForm('ruleForm')"
            >重置</el-button
          >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      }
      if (value.length <= 3) {
        callback(new Error("字段长度应大于3"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      radio: "员工",
      ID: "",
      ruleForm: {
        password: "",
        account: "",
      },
      rules: {
        account: [{ validator: validateAccount, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      if (this.radio == "员工") {
        this.$http
          .post("http://localhost:1000/login", {
            accounts: this.ruleForm.account,
            password: this.ruleForm.password,
          })
          .then((data) => {
            //console.log(data);
            if (data.data.code == 0) {
              this.$message({
                showClose: true,
                message: data.data.message,
                type: "success",
                duration: 1000,
              });
              // localStorage.setItem("token",data.data.token)
              this.$store.commit("getinfo", data.data.data);
              this.$router.push("/employee/salaryinfo").catch((err) => {});
            } else {
              this.$message({
                showClose: true,
                message: data.data.message,
                type: "error",
                duration: 1000,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else if(this.radio == "二级管理") {
        this.$http
          .post("http://localhost:1000/admin", {
            accounts: this.ruleForm.account,
            password: this.ruleForm.password,
          })
          .then((data) => {
           // console.log(data);
            if (data.data.code == 0) {
              this.$message({
                showClose: true,
                message: data.data.message,
                type: "success",
                duration: 1000,
              });
              // localStorage.setItem("token",data.data.token)
              this.$store.commit("getinfo", data.data.data);
              this.$router.push("/admin/adminfoupdate").catch((err) => {});
            } else {
              this.$message({
                showClose: true,
                message: data.data.message,
                type: "error",
                duration: 1000,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      else if(this.radio == "一级管理") {
        this.$http
          .post("http://localhost:1000/senior", {
            accounts: this.ruleForm.account,
            password: this.ruleForm.password,
          })
          .then((data) => {
           // console.log(data);
            if (data.data.code == 0) {
              this.$message({
                showClose: true,
                message: data.data.message,
                type: "success",
                duration: 1000,
              });
              // localStorage.setItem("token",data.data.token)
              this.$store.commit("getinfo", data.data.data);
              this.$router.push("/senior/seniorupdate").catch((err) => {});
            } else {
              this.$message({
                showClose: true,
                message: data.data.message,
                type: "error",
                duration: 1000,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.content {
  height: 100%;
  background-color: #2b4b6b;
}
.title {
  color: rgba(1, 177, 255, 1);
  font-family: "Courier New", Courier, monospace;
  font-size: 28px;
  margin-top: 20px;
  margin-bottom: 15px;
  font-weight: bold;
}
.login_box {
  width: 36%;
  height: 42%;
  background-color: #fff;
  position: absolute;
  left: 32%;
  top: 29%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#form {
  width: 65%;
}
.btn {
  float: right;
}
.bg {
  position: relative;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  filter: blur(100px);
}
</style>
