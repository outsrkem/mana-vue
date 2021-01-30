/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'
import cookie from 'js-cookie'
// axios()
// axios.get()
// axios.post()
// 创建一个 axios 实例，说白了就是复制了一个 axios
// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/' // 请求的基础路径
})

// 请求拦截器
// 若没有封装则使用  axios.interceptors.request.use(
// 此处封装过 axios，所以写 request.interceptors.request.use(
request.interceptors.request.use(
  // 任何所有请求会经过这里
  // config 是当前请求相关的配置信息对象
  // config 是可以修改的
  function (config) {
    // 如果有登录用户信息，则统一设置 token
    // 获取Cookie中的token
    const token = cookie.get('authentication-token')
    if (token) {
      config.headers['X-Auth-Token'] = `${token}`
      config.headers['Content-Type'] = 'application/json;charset=utf-8'
    }
    // 当这里 return config 之后请求在会真正的发出去
    return config
  },
  // 请求失败，会经过这里
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器

// 导出请求方法
export default request

// 谁要使用谁就加载 request 模块
// import request from 'request.js'
// request.xxx
// request({
//   method: ,
//   url: ''
// })
