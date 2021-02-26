const axios = require('axios')
const newSeniorInfo = {
    //根据id获取管理员信息
    async getSeniorInfo(accounts) {
        var a = await axios.post("http://localhost:1000/seniorinfo", {
            accounts: accounts,
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
    async updateSeniorInfo( idcard, telephone, accounts) {
        var a = await axios.post("http://localhost:1000/seniorinfo/update", {
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
}
export default newSeniorInfo;