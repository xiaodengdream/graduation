<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" id="body_title">
      <el-breadcrumb-item :to="{ path: '/employee/salaryinfo' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="body_form">
      <el-form
        ref="form"
        label-width="80px"
        :label-position="labelPosition"
        style="width: 40%; margin: 5% 5% 5% 5%"
      >
        <el-form-item label="工号">
          <el-input v-model="accounts" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="name" disabled></el-input>
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="professional" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="email"
            @blur="verification(email, '邮箱')"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input
            v-model="idcard"
            @blur="verification(idcard, '身份证')"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input
            v-model="telephone"
            @blur="verification(telephone, '电话')"
          ></el-input>
        </el-form-item>
        <el-form-item label="科室">
          <el-input v-model="department" disabled></el-input>
        </el-form-item>
        <el-form-item label="岗位类型">
          <el-select
            v-model="posttype"
            placeholder="请选择活动区域"
            style="float: left"
            disabled
          >
            <el-option label="A岗位" value="A"></el-option>
            <el-option label="B岗位" value="B"></el-option>
            <el-option label="C岗位" value="C"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div style="float: left">
            <el-popconfirm
              cancel-button-text="取消"
              confirm-button-text="确定"
              icon="el-icon-circle-check"
              icon-color="#007bff"
              title="个人信息内容确定修改吗？"
              @confirm="onSubmit"
            >
              <el-button slot="reference" type="primary">确定修改</el-button>
            </el-popconfirm>

            <el-button style="margin-left: 22px" type="success" @click="onClear"
              >清空表单</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import newInfo from "../../until/EmployeeAxios";
export default {
  data() {
    return {
      accounts: "",
      name: "",
      professional: "",
      email: "",
      idcard: "",
      telephone: "",
      department: "",
      posttype: "",
      labelPosition: "left",
    };
  },
  methods: {
    onSubmit() {
      if (
        this.email == "" ||
        this.idcard == "" ||
        this.idcard == "" ||
        this.telephone == ""
      ) {
        this.$message({
          showClose: true,
          message: "存在为空选项",
          type: "error",
          duration: 1000,
        });
      } else {
        newInfo.updateInfo(
          this.email,
          this.idcard,
          this.telephone,
          this.accounts
        );
        this.$message({
          showClose: true,
          message: " 更新成功",
          type: "success",
          duration: 1000,
        });
      }
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    onClear() {
      this.name = "";
      this.email = "";
      this.idcard = "";
      this.telephone = "";
    },
    verification(value, label) {
      if (value == "") {
        this.$message({
          showClose: true,
          message: label + "为空",
          type: "error",
          duration: 1000,
        });
      }
    },
  },
  mounted: function () {
    newInfo.getInfo(this.$store.state.data[0].accounts).then((data) => {
      this.$store.commit("getinfo", data);
      this.accounts = this.$store.state.data[0].accounts;
      this.name = this.$store.state.data[0].name;
      this.professional = this.$store.state.data[0].professional;
      this.email = this.$store.state.data[0].email;
      this.idcard = this.$store.state.data[0].idcard;
      this.telephone = this.$store.state.data[0].telephone;
      this.department = this.$store.state.data[0].department;
      this.posttype = this.$store.state.data[0].posttype;
    });
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
.body_form {
  width: 80%;
  margin: 0 0 20px 10%;
  background-color: #fff;
  border: 1px solid rgba(220, 220, 220, 0.8);
  box-shadow: 5px 5px 5px rgba(220, 220, 220, 0.8);
}
</style>