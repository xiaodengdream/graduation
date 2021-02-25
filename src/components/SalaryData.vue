<template>
  <div>
    <el-table
      :data="salary"
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
        :filters="this.$props.months"
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
      <el-table-column prop="all" width="60" label="总工资"> </el-table-column>
      <el-table-column
        prop="payTime"
        width="95"
        label="发放工资时间"
        sortable
        column-key="month"
        :filters="this.$props.paytime"
        :filter-method="filterHandler"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "SalaryData",
  data() {
    return {
      
    };
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
  },
  props: ["salary", "paytime", "months"],
  mounted() {
    //console.log(this.$props);
  },
};
</script>
<style scoped>
#bady_table {
  width: 1125px;
  margin: 0 0 0 50px;
}
</style>