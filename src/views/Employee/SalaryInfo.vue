<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" id="body_title">
      <el-breadcrumb-item :to="{ path: '/employee/salaryinfo' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>个人工资</el-breadcrumb-item>
    </el-breadcrumb>
    <SalaryData
      v-bind:salary="salary"
      v-bind:paytime="paytime"
      v-bind:months="months"
    />
  </div>
</template>
<script>
import format from "../../until/formateDate";
import newSalary from "../../until/SalaryAxios";
import SalaryData from "@/components/SalaryData";
export default {
  components: {
    SalaryData,
  },
  data() {
    return {
      salary: [],
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
    newSalary
      .getSalary(this.$store.state.data[0].accounts)
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
        // console.log(data.data.data);
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
</style>