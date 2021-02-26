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
    //根据id删除管理员信息
    async deleteAdminInfo(id) {
        var a = await axios.post("http://localhost:1000/admin/infodelete", {
            id: id,
        })
            .then((data) => {
               // console.log(data)
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
                console.log(data);
            }).catch((error) => {
                console.log(error);
            })
        return a
    },
    //更新管理员所有信息
    async updateAdminInfos(accounts, email, idcard, telephone, department, password,id) {
        var a = await axios.post("http://localhost:1000/admin/infoUpdates", {
            accounts: accounts,
            email: email,
            idcard: idcard,
            telephone: telephone,
            department: department,
            password: password,
            id:id,
        })
            .then((data) => {
                console.log(data);
            }).catch((error) => {
                console.log(error);
            })
        return a
    },
    // 获取所有管理员信息
    async getAdminInfo() {
        var a = await axios.get("http://localhost:1000/admin/infos")
            .then((data) => {
                //console.log(data)
                return data.data.data
            })
            .catch((error) => {
                console.log(error);
            })
        return a
    },
    //新增管理员信息
    async addAdminInfo(accounts,
        email,
        idcard,
        telephone,
        department,
        password) {
        var a = await axios.post("http://localhost:1000/admin/register", {
            accounts: accounts,
            email: email,
            idcard: idcard,
            telephone: telephone,
            department: department,
            password: password
        })
            .then((data) => {
                console.log(data)
                // return data.data.data
            })
            .catch((error) => {
                console.log(error);
            })
        return a
    }
}
export default newAdminInfo;