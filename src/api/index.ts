import axios from "axios";
import { showToast } from 'vant';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json' // 响应

// 响应拦截
axios.interceptors.response.use(res => {
  if (res.status !== 200) { // 程序错误
    showToast('服务器异常');
    return Promise.reject(res)
  } else {
    return res
  }
})

export default axios
// 请求拦截
// axios.interceptors.request.use(req => {
//   let jwtToken = sessionStorage.getItem('token')
//   if (jwtToken) {
//     req.headers.Authorization = jwtToken
//   }
//   return req
// })


