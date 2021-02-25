<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" id="body_title">
      <el-breadcrumb-item :to="{ path: '/admin/adminfoupdate' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>工资管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="employeesinfo">
      <div class="employees_head">
        <el-button type="primary" size="medium" @click="addSalary"
          >新增工资</el-button
        >
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
          :data="
            this.salary
              .slice((currentPage - 1) * pagesize, currentPage * pagesize)
              .filter(
                (data) =>
                  !search ||
                  data.name.toLowerCase().includes(search.toLowerCase())
              )
          "
          border
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          id="bady_table"
        >
          <el-table-column prop="accounts" width="55" label="工号">
          </el-table-column>
          <el-table-column prop="month" width="55" label="月份">
          </el-table-column>
          <el-table-column prop="name" width="60" label="姓名">
          </el-table-column>
          <el-table-column prop="basicSalary" width="60" label="基本工资">
          </el-table-column>
          <el-table-column
            prop="senioritySalary"
            width="60"
            label="工资工龄"
          ></el-table-column>
          <el-table-column prop="postSubsidy" width="60" label="岗位补贴">
          </el-table-column>
          <el-table-column prop="postAllowance" width="60" label="岗位津贴">
          </el-table-column>
          <el-table-column prop="monthlyBonus" width="60" label="月奖金">
          </el-table-column>
          <el-table-column
            prop="endowmentInsurance"
            width="60"
            label="养老保险"
          >
          </el-table-column>
          <el-table-column prop="accumulationFund" width="60" label="公积金">
          </el-table-column>
          <el-table-column prop="medicalInsurance" width="60" label="医疗保险">
          </el-table-column>
          <el-table-column
            prop="unemploymentInsurance"
            width="60"
            label="失业保险"
          >
          </el-table-column>
          <el-table-column
            prop="transportationSubsidy"
            width="60"
            label="交通补贴"
          >
          </el-table-column>
          <el-table-column
            prop="performanceSalary"
            width="60"
            label="岗位绩效工资"
          >
          </el-table-column>
          <el-table-column prop="halfAward" width="50" label="半年奖">
          </el-table-column>
          <el-table-column prop="annualBonus" width="50" label="年终奖">
          </el-table-column>
          <el-table-column width="100" label="功能">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                style="margin-bottom: 8px"
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
                    style="margin-left: 0px"
                    >删除</el-button
                  >
                </el-popconfirm>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="employee_tail">
        <span class="employee_pag">共 {{ this.salary.length }} 条</span>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="this.salary.length"
          :current-page="currentPage"
          :page-size="pagesize"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="更新工资"
      :visible.sync="dialogTableVisible"
      width="50%"
      top="20px"
    >
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        style="width: 60%; margin-left: 10%"
        :model="formLabelAlign"
        class="demo-ruleForm"
      >
        <el-form-item label="工号">
          <el-input v-model="formLabelAlign.accounts" disabled></el-input>
        </el-form-item>
        <el-form-item label="月份">
          <el-input v-model="formLabelAlign.month" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formLabelAlign.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="基本工资">
          <el-input v-model="formLabelAlign.basicSalary"></el-input>
        </el-form-item>
        <el-form-item label="工资工龄">
          <el-input v-model="formLabelAlign.senioritySalary"></el-input>
        </el-form-item>
        <el-form-item label="岗位补贴">
          <el-input v-model="formLabelAlign.postSubsidy"></el-input>
        </el-form-item>
        <el-form-item label="岗位津贴">
          <el-input v-model="formLabelAlign.postAllowance"></el-input>
        </el-form-item>
        <el-form-item label="月奖金">
          <el-input v-model="formLabelAlign.monthlyBonus"></el-input>
        </el-form-item>
        <el-form-item label="养老保险">
          <el-input v-model="formLabelAlign.endowmentInsurance"></el-input>
        </el-form-item>
        <el-form-item label="公积金">
          <el-input v-model="formLabelAlign.accumulationFund"></el-input>
        </el-form-item>
        <el-form-item label="医疗保险">
          <el-input v-model="formLabelAlign.medicalInsurance"></el-input>
        </el-form-item>
        <el-form-item label="失业保险">
          <el-input v-model="formLabelAlign.unemploymentInsurance"></el-input>
        </el-form-item>
        <el-form-item label="交通补贴">
          <el-input v-model="formLabelAlign.transportationSubsidy"></el-input>
        </el-form-item>
        <el-form-item label="岗位绩效工资">
          <el-input v-model="formLabelAlign.performanceSalary"></el-input>
        </el-form-item>
        <el-form-item label="半年奖">
          <el-input v-model="formLabelAlign.halfAward"></el-input>
        </el-form-item>
        <el-form-item label="年终奖">
          <el-input v-model="formLabelAlign.annualBonus"></el-input>
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
    </el-dialog>
    <el-dialog
      title="新增工资"
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
          <el-input v-model="accounts"></el-input>
        </el-form-item>
        <el-form-item label="月份">
          <el-select
            v-model="month"
            placeholder="请选择活动区域"
            style="float: left; width: 100%"
          >
            <el-option label="一月" value="一月"></el-option>
            <el-option label="二月" value="二月"></el-option>
            <el-option label="三月" value="三月"></el-option>
            <el-option label="四月" value="四月"></el-option>
            <el-option label="五月" value="五月"></el-option>
            <el-option label="六月" value="六月"></el-option>
            <el-option label="七月" value="七月"></el-option>
            <el-option label="八月" value="八月"></el-option>
            <el-option label="九月" value="九月"></el-option>
            <el-option label="十月" value="十月"></el-option>
            <el-option label="十一月" value="十一月"></el-option>
            <el-option label="十二月" value="十二月"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="基本工资">
          <el-input v-model="basicSalary"></el-input>
        </el-form-item>
        <el-form-item label="工资工龄">
          <el-input v-model="senioritySalary"></el-input>
        </el-form-item>
        <el-form-item label="岗位补贴">
          <el-input v-model="postSubsidy"></el-input>
        </el-form-item>
        <el-form-item label="岗位津贴">
          <el-input v-model="postAllowance"></el-input>
        </el-form-item>
        <el-form-item label="月奖金">
          <el-input v-model="monthlyBonus"></el-input>
        </el-form-item>
        <el-form-item label="养老保险">
          <el-input v-model="endowmentInsurance"></el-input>
        </el-form-item>
        <el-form-item label="公积金">
          <el-input v-model="accumulationFund"></el-input>
        </el-form-item>
        <el-form-item label="医疗保险">
          <el-input v-model="medicalInsurance"></el-input>
        </el-form-item>
        <el-form-item label="失业保险">
          <el-input v-model="unemploymentInsurance"></el-input>
        </el-form-item>
        <el-form-item label="交通补贴">
          <el-input v-model="transportationSubsidy"></el-input>
        </el-form-item>
        <el-form-item label="岗位绩效工资">
          <el-input v-model="performanceSalary"></el-input>
        </el-form-item>
        <el-form-item label="半年奖">
          <el-input v-model="halfAward"></el-input>
        </el-form-item>
        <el-form-item label="年终奖">
          <el-input v-model="annualBonus"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="float: left">
            <el-popconfirm
              cancel-button-text="取消"
              confirm-button-text="确定"
              icon="el-icon-circle-check"
              icon-color="#007bff"
              title="个人信息内容确定修改吗？"
              @confirm="onSubmit2"
            >
              <el-button slot="reference" type="primary">确定修改</el-button>
            </el-popconfirm>

            <el-button style="margin-left: 22px" type="success" @click="onClear"
              >清空表单</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import newSalary from "../../until/SalaryAxios";
import format from "../../until/formateDate";
export default {
  name: "SalaryData",
  data() {
    return {
      salary: [],
      search: "",
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      dialogTableVisible: false,
      dialogTableVisible2: false,
      labelPosition: "left",
      formLabelAlign: [],
      accounts: "",
      name: "",
      month: "",
      basicSalary: "",
      senioritySalary: "",
      postSubsidy: "",
      postAllowance: "",
      monthlyBonus: "",
      endowmentInsurance: "",
      accumulationFund: "",
      medicalInsurance: "",
      unemploymentInsurance: "",
      transportationSubsidy: "",
      performanceSalary: "",
      halfAward: "",
      annualBonus: "",
    };
  },
  methods: {
    addSalary() {
      this.dialogTableVisible2 = true;
    },
    onSubmit() {
      // console.log(this.formLabelAlign)
      newSalary.updateSalary(
        this.formLabelAlign.id,
        this.formLabelAlign.basicSalary,
        this.formLabelAlign.senioritySalary,
        this.formLabelAlign.postSubsidy,
        this.formLabelAlign.postAllowance,
        this.formLabelAlign.monthlyBonus,
        this.formLabelAlign.endowmentInsurance,
        this.formLabelAlign.accumulationFund,
        this.formLabelAlign.medicalInsurance,
        this.formLabelAlign.unemploymentInsurance,
        this.formLabelAlign.transportationSubsidy,
        this.formLabelAlign.performanceSalary,
        this.formLabelAlign.halfAward,
        this.formLabelAlign.annualBonus
      );
      this.$message({
        showClose: true,
        message: " 更新成功",
        type: "success",
        duration: 1000,
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    onSubmit2() {
      newSalary.addSalary(
        this.accounts,
        this.name,
        this.month,
        this.basicSalary,
        this.senioritySalary,
        this.postSubsidy,
        this.postAllowance,
        this.monthlyBonus,
        this.endowmentInsurance,
        this.accumulationFund,
        this.medicalInsurance,
        this.unemploymentInsurance,
        this.transportationSubsidy,
        this.performanceSalary,
        this.halfAward,
        this.annualBonus
      );
      this.$message({
        showClose: true,
        message: " 新增成功",
        type: "success",
        duration: 1000,
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    onClear() {},
    handleEdit(index, row) {
      // console.log(row)
      this.dialogTableVisible = true;
      this.formLabelAlign = row;
      // console.log(this.formLabelAlign);
    },
    handleDelete(index, row) {
      newSalary.deleteSalary(row.id);
      this.$message({
        showClose: true,
        message: " 删除成功",
        type: "success",
        duration: 1000,
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
      // console.log(index, row);
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
  },
  mounted() {
    newSalary
      .getSalarys(this.$store.state.data[0].accounts)
      .then((data) => {
        this.salary = data.map((item) => {
          item.payTime = format.formateDate(item.payTime);
          return item;
        });
        // console.log(this.salary);
        // console.log(data);
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
#bady_table {
  /* width: 1100px; */
  margin: 20px 0 20px 0;
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