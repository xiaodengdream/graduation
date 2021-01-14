const axios = require('axios')
const gettoken = {
    get() {
          return new Promise((resolve, reject) => {
            axios.get("http://localhost:1000/login", {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: localStorage.getItem("token"),
                },
            }).then((data) => {
                resolve(data.data.status)
            }).catch((error) => {
                console.log(error)
            })
        })

    }
}
module.exports = gettoken;