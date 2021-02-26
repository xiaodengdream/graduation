<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" id="body_title">
      <el-breadcrumb-item :to="{ path: '/senior/seniorupdate' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="employeesinfo">
      <div class="employees_head">
        <el-dropdown>
          <el-button type="primary" size="medium"
            >新增用户<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="add1">普通员工</el-dropdown-item>
            <el-dropdown-item @click.native="add2">二级管理</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-input
          style="width: 30%"
          v-model="search"
          size="medium"
          prefix-icon="el-icon-search"
          placeholder="输入关键字搜索"
        />
      </div>
      <div class="employees_table">
        <el-table
          border
          :data="
            tableData
              .slice((currentPage - 1) * pagesize, currentPage * pagesize)
              .filter(
                (data) =>
                  !search ||
                  data.accounts.toLowerCase().includes(search.toLowerCase()) ||
                  data.name.toLowerCase().includes(search.toLowerCase()) ||
                  data.department.toLowerCase().includes(search.toLowerCase())
              )
          "
          style="width: 100%"
          ><el-table-column type="index" label="#" width="50">
          </el-table-column>
          <el-table-column label="工号" prop="accounts" width="80">
          </el-table-column>
          <el-table-column label="名字" prop="name" width="80">
          </el-table-column>
          <el-table-column label="职称" prop="professional" width="80">
          </el-table-column>
          <el-table-column label="岗位类型" prop="posttype" width="80">
          </el-table-column>
          <el-table-column label="科室" prop="department" width="80">
          </el-table-column>
          <el-table-column label="电话" prop="telephone" width="110">
          </el-table-column>
          <el-table-column label="身份证" prop="idcard"> </el-table-column>

          <el-table-column label="邮件" prop="email"> </el-table-column>
          <el-table-column width="260" label="功能">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                icon="el-icon-search"
                @click="handleSee(scope.$index, scope.row)"
                >查看</el-button
              >
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <template>
                <el-popconfirm
                  cancel-button-text="取消"
                  confirm-button-text="确定"
                  icon="el-icon-circle-check"
                  icon-color="#007bff"
                  title="个人信息内容确定修改吗？"
                  @confirm="handleDelete(scope.$index, scope.row)"
                >
                  <el-button
                    size="mini"
                    slot="reference"
                    type="danger"
                    icon="el-icon-delete"
                    style="margin-left: 10px"
                    >删除</el-button
                  >
                </el-popconfirm>
              </template>

              <!-- <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              > -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="employee_tail">
        <span class="employee_pag">共 {{ this.tableData.length }} 条</span>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="this.tableData.length"
          :current-page="currentPage"
          :page-size="pagesize"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="工资信息"
      :visible.sync="dialogTableVisible"
      width="80%"
      top="20px"
    >
      <SalaryData
        v-bind:salary="salary"
        v-bind:paytime="paytime"
        v-bind:months="months"
      />
    </el-dialog>
    <el-dialog
      title="新增员工信息"
      :visible.sync="dialogTableVisible1"
      width="50%"
      top="20px"
    >
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        style="width: 60%; margin-left: 10%"
        class="demo-ruleForm"
      >
        <el-form-item label="工号">
          <el-input v-model="accounts"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="professional"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="email"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="idcard"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="telephone"></el-input>
        </el-form-item>
        <el-form-item label="科室">
          <el-input v-model="department"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password"></el-input>
        </el-form-item>
        <el-form-item label="岗位类型">
          <el-select
            v-model="posttype"
            placeholder="请选择活动区域"
            style="float: left; width: 100%"
          >
            <el-option label="A" value="A"></el-option>
            <el-option label="B" value="B"></el-option>
            <el-option label="C" value="C"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div style="float: left">
            <el-popconfirm
              cancel-button-text="取消"
              confirm-button-text="确定"
              icon="el-icon-circle-check"
              icon-color="#007bff"
              title="个人信息内容确定新增吗？"
              @confirm="onSubmit1"
            >
              <el-button slot="reference" type="primary">确定新增</el-button>
            </el-popconfirm>

            <el-button style="margin-left: 22px" type="success"
              >清空表单</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="更新员工信息"
      :visible.sync="dialogTableVisible3"
      width="50%"
      top="20px"
    >
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        style="width: 60%; margin-left: 10%"
        class="demo-ruleForm"
      >
        <el-form-item label="工号">
          <el-input v-model="userinfo.accounts"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="userinfo.name"></el-input>
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="userinfo.professional"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userinfo.email"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="userinfo.idcard"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userinfo.telephone"></el-input>
        </el-form-item>
        <el-form-item label="科室">
          <el-input v-model="userinfo.department"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userinfo.password"></el-input>
        </el-form-item>
        <el-form-item label="岗位类型">
          <el-select
            v-model="userinfo.posttype"
            placeholder="请选择活动区域"
            style="float: left; width: 100%"
          >
            <el-option label="A" value="A"></el-option>
            <el-option label="B" value="B"></el-option>
            <el-option label="C" value="C"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div style="float: left">
            <el-popconfirm
              cancel-button-text="取消"
              confirm-button-text="确定"
              icon="el-icon-circle-check"
              icon-color="#007bff"
              title="个人信息内容确定更新吗？"
              @confirm="onSubmit3"
            >
              <el-button slot="reference" type="primary">确定更新</el-button>
            </el-popconfirm>

            <el-button style="margin-left: 22px" type="success"
              >清空表单</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="新增二级管理员信息"
      :visible.sync="dialogTableVisible2"
      width="50%"
      top="20px"
    >
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        style="width: 60%; margin-left: 10%"
        class="demo-ruleForm"
      >
        <el-form-item label="工号">
          <el-input v-model="accounts1"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="email1"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="idcard1"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="telephone1"></el-input>
        </el-form-item>
        <el-form-item label="科室">
          <el-input v-model="department1"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password1"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="float: left">
            <el-popconfirm
              cancel-button-text="取消"
              confirm-button-text="确定"
              icon="el-icon-circle-check"
              icon-color="#007bff"
              title="个人信息内容确定新增吗？"
              @confirm="onSubmit2"
            >
              <el-button slot="reference" type="primary">确定新增</el-button>
            </el-popconfirm>

            <el-button style="margin-left: 22px" type="success"
              >清空表单</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="更新二级管理员信息"
      :visible.sync="dialogTableVisible4"
      width="50%"
      top="20px"
    >
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        style="width: 60%; margin-left: 10%"
        class="demo-ruleForm"
      >
        <el-form-item label="工号">
          <el-input v-model="userinfo.accounts"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userinfo.email"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="userinfo.idcard"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userinfo.telephone"></el-input>
        </el-form-item>
        <el-form-item label="科室">
          <el-input v-model="userinfo.department"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userinfo.password"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="float: left">
            <el-popconfirm
              cancel-button-text="取消"
              confirm-button-text="确定"
              icon="el-icon-circle-check"
              icon-color="#007bff"
              title="个人信息内容确定更新吗？"
              @confirm="onSubmit4"
            >
              <el-button slot="reference" type="primary">确定更新</el-button>
            </el-popconfirm>

            <el-button style="margin-left: 22px" type="success"
              >清空表单</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import format from "../../until/formateDate";
import newInfo from "../../until/EmployeeAxios";
import newAdminInfo from "../../until/AdminAxios";
import newSalary from "../../until/SalaryAxios";
import SalaryData from "@/components/SalaryData";
export default {
  components: {
    SalaryData,
  },
  data() {
    return {
      tableData: [],
      salary: [],
      paytime: [],
      months: [],
      search: "",
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      dialogTableVisible: false,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      dialogTableVisible4: false,
      labelPosition: "left",
      accounts: "",
      name: "",
      professional: "",
      email: "",
      idcard: "",
      telephone: "",
      department: "",
      posttype: "",
      password: "",
      accounts1: "",
      email1: "",
      idcard1: "",
      telephone1: "",
      department1: "",
      password1: "",
      userinfo: [],
    };
  },
  methods: {
    add1() {
      this.dialogTableVisible1 = true;
    },
    onSubmit1() {
      if (
        this.accounts == "" ||
        this.name == "" ||
        this.professional == "" ||
        this.email == "" ||
        this.idcard == "" ||
        this.telephone == "" ||
        this.department == "" ||
        this.posttype == "" ||
        this.password == ""
      ) {
        this.$message({
          showClose: true,
          message: "存在为空",
          type: "error",
          duration: 1000,
        });
      } else {
        newInfo
          .addInfos(
            this.accounts,
            this.name,
            this.professional,
            this.email,
            this.idcard,
            this.telephone,
            this.department,
            this.posttype,
            this.password
          )
          .then((data) => {
            //console.log(data)
          });
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    },

    onSubmit2() {
      if (
        this.accounts1 == "" ||
        this.email1 == "" ||
        this.idcard1 == "" ||
        this.telephone1 == "" ||
        this.department1 == "" ||
        this.password1 == ""
      ) {
        this.$message({
          showClose: true,
          message: "存在为空",
          type: "error",
          duration: 1000,
        });
      } else {
        newAdminInfo
          .addAdminInfo(
            this.accounts1,
            this.email1,
            this.idcard1,
            this.telephone1,
            this.department1,
            this.password1
          )
          .then((data) => {
            //console.log(data)
          });
        this.$message({
          showClose: true,
          message: " 更新成功",
          type: "success",
          duration: 1000,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    },

    add2() {
      this.dialogTableVisible2 = true;
    },
    onSubmit3() {
      if (
        this.userinfo.accounts == "" ||
        this.userinfo.name == "" ||
        this.userinfo.professional == "" ||
        this.userinfo.email == "" ||
        this.userinfo.idcard == "" ||
        this.userinfo.telephone == "" ||
        this.userinfo.department == "" ||
        this.userinfo.posttype == "" ||
        this.userinfo.password == ""
      ) {
        this.$message({
          showClose: true,
          message: "存在为空",
          type: "error",
          duration: 1000,
        });
      } else {
        newInfo
          .updateInfos(
            this.userinfo.accounts,
            this.userinfo.name,
            this.userinfo.professional,
            this.userinfo.email,
            this.userinfo.idcard,
            this.userinfo.telephone,
            this.userinfo.department,
            this.userinfo.posttype,
            this.userinfo.password,
            this.userinfo.id
          )
          .then((data) => {});
        this.$message({
          showClose: true,
          message: " 更新成功",
          type: "success",
          duration: 1000,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    },

    onSubmit4() {
      if (
        this.userinfo.accounts == "" ||
        this.userinfo.email == "" ||
        this.userinfo.idcard == "" ||
        this.userinfo.telephone == "" ||
        this.userinfo.department == "" ||
        this.userinfo.password == ""
      ) {
        this.$message({
          showClose: true,
          message: "存在为空",
          type: "error",
          duration: 1000,
        });
      } else {
        newAdminInfo
          .updateAdminInfos(
            this.userinfo.accounts,
            this.userinfo.email,
            this.userinfo.idcard,
            this.userinfo.telephone,
            this.userinfo.department,
            this.userinfo.password,
            this.userinfo.id
          )
          .then((data) => {});
        this.$message({
          showClose: true,
          message: " 更新成功",
          type: "success",
          duration: 1000,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    },

    handleSee(index, row) {
      //console.log(row.accounts);
      newSalary
        .getSalary(row.accounts)
        .then((data) => {
          this.salary = data.map((item) => {
            item.payTime = format.formateDate(item.payTime);
            return item;
          });
        })
        .catch((error) => {
          console.log(error);
        });
      this.dialogTableVisible = true;
    },
    handleEdit(index, row) {
      if (row.name) {
        this.dialogTableVisible3 = true;
      } else {
        this.dialogTableVisible4 = true;
      }
      this.userinfo = row;

      // console.log(row);
    },
    handleDelete(index, row) {
      if (row.name) {
        newInfo.deleteInfo(row.id);
        this.$message({
          showClose: true,
          message: " 删除成功",
          type: "success",
          duration: 1000,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        newAdminInfo.deleteAdminInfo(row.id);
        this.$message({
          showClose: true,
          message: " 删除成功",
          type: "success",
          duration: 1000,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
      // console.log(row);
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
  },
  mounted: function () {
    newInfo
      .getInfos()
      .then((data) => {
        this.tableData = data;
        //console.log(this.tableData);
      })
      .catch((error) => {
        console.log(error);
      });
    newAdminInfo
      .getAdminInfo()
      .then((data) => {
        this.tableData = this.tableData.concat(data);
        //console.log(this.tableData);
      })
      .catch((error) => {
        console.log(error);
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
.employeesinfo {
  margin: 0 50px 20px 50px;
  padding: 50px 50px 50px 50px;
  border: 1px solid rgba(220, 220, 220, 0.8);
  background-color: white;
  box-shadow: 5px 5px 5px rgba(220, 220, 220, 0.8);
}
.employees_table {
  margin: 20px 0 20px 0;
}
.employees_head {
  display: flex;
  justify-content: space-between;
}
.employee_tail {
  display: flex;
  align-items: center;
}
.employee_pag {
  font-size: 14px;
  color: rgba(120, 120, 120, 1);
  background: rgba(244, 244, 255, 0.8);
  padding: 5px;
  border-radius: 5px;
}
</style>