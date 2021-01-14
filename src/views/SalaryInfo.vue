<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" id="body_title">
      <el-breadcrumb-item :to="{ path: '/employee/salaryinfo' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人工资</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="tableData"
      border
      show-summary
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      id="bady_table"
    >
      <el-table-column prop="accounts" width="55" label="ID"> </el-table-column>
      <el-table-column
        prop="month"
        width="55"
        sortable
        column-key="month"
        :filters="this.months"
        :filter-method="filterHandler"
        label="月份"
      >
      </el-table-column>
      <el-table-column prop="name" width="70" label="姓名"> </el-table-column>
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
      <el-table-column prop="endowmentInsurance" width="60" label="养老保险">
      </el-table-column>
      <el-table-column prop="accumulationFund" width="60" label="公积金">
      </el-table-column>
      <el-table-column prop="medicalInsurance" width="60" label="医疗保险">
      </el-table-column>
      <el-table-column prop="unemploymentInsurance" width="60" label="失业保险">
      </el-table-column>
      <el-table-column prop="transportationSubsidy" width="60" label="交通补贴">
      </el-table-column>
      <el-table-column prop="performanceSalary" width="70" label="岗位绩效工资">
      </el-table-column>
      <el-table-column prop="halfAward" width="60" label="半年奖">
      </el-table-column>
      <el-table-column prop="annualBonus" width="60" label="年终奖">
      </el-table-column>
      <el-table-column prop="all" width="60" label="总工资">
      </el-table-column>
      <el-table-column
        prop="payTime"
        width="95"
        label="发放工资时间"
        sortable
        column-key="month"
        :filters="this.paytime"
        :filter-method="filterHandler"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import format from "../until/formateDate";
export default {
  data() {
    return {
      tableData: [],
      paytime: [],
      months: [],
    };
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted: function () {
    // console.log(this.$route);
    // console.log(this.$store.state)
    this.$http
      .post("http://localhost:1000/salary", {
        accounts: this.$store.state.data[0].accounts,
      })
      .then((data) => {
        this.tableData = data.data.data.map((item) => {
          item.payTime = format.formateDate(item.payTime);
          return item;
        });
        this.paytime = data.data.data.map((item) => {
          var values = format.formateDate(item.payTime);
          var zhi = { text: values, value: values };
          return zhi;
        });
        this.months = data.data.data.map((item) => {
          var values = item.month;
          var zhi = { text: values, value: values };
          return zhi;
        });
        // console.log(data.data.data);
      });
  },
};
</script>
<style>
#body_title {
  font-size: 16px;
  height: 12%;
  display: flex;
  align-items: center;
  margin:30px 0 30px 50px;
}
#bady_table {
  width: 1125px;
  margin: 0 0 0 50px;
  border-radius: 8px;
}
</style>