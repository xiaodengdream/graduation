<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" id="body_title">
      <el-breadcrumb-item :to="{ path: '/admin/adminfoupdate' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="employeesinfo">
      <div class="employees_head">
        <el-button type="primary" size="medium">添加用户</el-button>
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
                  data.name.toLowerCase().includes(search.toLowerCase())||
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
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
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
  </div>
</template>
<script>
import format from "../../until/formateDate";
import newInfo from "../../until/EmployeeAxios";
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
    };
  },
  methods: {
    handleSee(index, row) {
      //console.log(row.accounts);
      newSalary
        .getSalary(row.accounts)
        .then((data) => {
          this.salary = data.map((item) => {
            item.payTime = format.formateDate(item.payTime);
            return item;
          });
          this.paytime = data.map((item) => {
            var values = format.formateDate(item.payTime);
            var zhi = { text: values, value: values };
            return zhi;
          });
          this.months = data.map((item) => {
            var values = item.month;
            var zhi = { text: values, value: values };
            return zhi;
          });
        })
        .catch((error) => {
          console.log(error);
        });
      this.dialogTableVisible = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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