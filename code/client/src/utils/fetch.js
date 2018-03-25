import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'


axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})

axios.interceptors.response.use(response => response, err => Promise.resolve(err.response))

// function checkStatus(res) {
//     if (res.status === 200 || res.status === 304) {
//         return res.data
//     }
//     return {
//         code: 0,
//         msg: res.data.msg || res.statusText,
//         data: res.statusText
//     }
//     return res
// }

// function checkCode(res) {
//     if (res.code === 0) {
//         Vue.prototype.$alert(res.msg)
//         throw new Error(res.msg)
//     }
    
//     return res
// }

let prefix = 'http://localhost:3000/'
export default {
    get(url, params) {
        if (!url) return
        return axios({
            method: 'get',
            url: prefix + url,
            params,
            timeout: 10000
        })
    },
    post(url, data) {
        if (!url) return
        return axios({
            method: 'post',
            url: prefix + url,
            data: qs.stringify(data),
            timeout: 10000
        })
    },
    postFile(url, data) {
        if (!url) return
        return axios({
            method: 'post',
            url: prefix + url,
            headers: {
                // 'Content-Type': 'multipart/form-data'
                // 'Content-Type': 'application/x-www-from-urlencoded'
            },
            data: data,
            timeout: 10000
        }).then(checkStatus).then(checkCode)
    }
}
