const axios = require('axios')
const newAdminInfo = {
    //根据id获取管理员信息
    async getAdminInfo(id) {
        var a = await axios.post("http://localhost:1000/admin/info", {
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
    //更新管理员信息
    async updateAdminInfo(email, idcard, telephone, accounts) {
        var a = await axios.post("http://localhost:1000/admin/infoUpdate", {
            email: email,
            idcard: idcard,
            telephone: telephone,
            accounts: accounts,
        })
            .then((data) => {
                //console.log(data);
            }).catch((error) => {
                console.log(error);
            })
        return a
    },
    //获取所有员工信息
    // async getInfos() {
    //     var a = await axios.get("http://localhost:1000/employee/infos")
    //         .then((data) => {
    //             return data.data.data
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    //     return a
    // }
}
export default newAdminInfo;