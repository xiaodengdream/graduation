const axios = require('axios')
const newPs = {
    //根据电话获取员工信息
    async getnewps(phone) {
        var a = await axios.post("http://localhost:1000/employee/findps", {
            telephone: phone,
        })
            .then((data) => {
                return data.data.data
            })
            .catch((error) => {
                console.log(error);
            })
        return a
    },
    //根据电话获取管理员信息
    async getnewadmps(phone) {
        var a = await axios.post("http://localhost:1000/admin/findps", {
            telephone: phone,
        })
            .then((data) => {
                return data.data.data
            })
            .catch((error) => {
                console.log(error);
            })
        return a
    },
}
export default newPs;