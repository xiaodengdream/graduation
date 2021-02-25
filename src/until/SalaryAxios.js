const axios = require('axios')
const newSalary = {
    //根据工号获取工资信息
    async getSalary(id) {
        var a = await axios.post("http://localhost:1000/employee/Salary", {
            accounts: id,
        })
            .then((data) => {
                return data.data.data
            })
            .catch((error) => {
                console.log(error);
            })
        return a
    },
    //新增工资信息
    async addSalary(
        accounts,
        name,
        month,
        basicSalary,
        senioritySalary,
        postSubsidy,
        postAllowance,
        monthlyBonus,
        endowmentInsurance,
        accumulationFund,
        medicalInsurance,
        unemploymentInsurance,
        transportationSubsidy,
        performanceSalary,
        halfAward,
        annualBonus) {
        var a = await axios.post("http://localhost:1000/employee/salary/add", {
            accounts: accounts,
            name: name,
            month: month,
            basicSalary: basicSalary,
            senioritySalary: senioritySalary,
            postSubsidy: postSubsidy,
            postAllowance: postAllowance,
            monthlyBonus: monthlyBonus,
            endowmentInsurance: endowmentInsurance,
            accumulationFund: accumulationFund,
            medicalInsurance: medicalInsurance,
            unemploymentInsurance: unemploymentInsurance,
            transportationSubsidy: transportationSubsidy,
            performanceSalary: performanceSalary,
            halfAward: halfAward,
            annualBonus: annualBonus
        })
            .then((data) => {
                //console.log(data);
            }).catch((error) => {
                console.log(error);
            })
        return a
    },
    //根据id更新员工工资信息
    async updateSalary(
        id,
        basicSalary,
        senioritySalary,
        postSubsidy,
        postAllowance,
        monthlyBonus,
        endowmentInsurance,
        accumulationFund,
        medicalInsurance,
        unemploymentInsurance,
        transportationSubsidy,
        performanceSalary,
        halfAward,
        annualBonus) {
        var a = await axios.post("http://localhost:1000/employee/salary/edit", {
            id: id,
            basicSalary: basicSalary,
            senioritySalary: senioritySalary,
            postSubsidy: postSubsidy,
            postAllowance: postAllowance,
            monthlyBonus: monthlyBonus,
            endowmentInsurance: endowmentInsurance,
            accumulationFund: accumulationFund,
            medicalInsurance: medicalInsurance,
            unemploymentInsurance: unemploymentInsurance,
            transportationSubsidy: transportationSubsidy,
            performanceSalary: performanceSalary,
            halfAward: halfAward,
            annualBonus: annualBonus
        })
            .then((data) => {
                //console.log(data);
            }).catch((error) => {
                console.log(error);
            })
        return a
    },
    //根据id删除员工工资信息
    async deleteSalary(id) {
        var a = await axios.post("http://localhost:1000/employee/salary/delete", { id: id })
            .then((data) => {
               // console.log(data);
            }).catch((error) => {
                console.log(error);
            })
        return a
    },
    // 获取所有员工信息
    async getSalarys() {
        var a = await axios.get("http://localhost:1000/employees/salary")
            .then((data) => {
                return data.data.data
            })
            .catch((error) => {
                console.log(error);
            })
        return a
    }
}
export default newSalary;