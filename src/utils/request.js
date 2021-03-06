/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'
import router from '@/router'

// 非组件模块可以这样加载使用 element 的 message 提示组件
import { Message } from 'element-ui'

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
    const authentication = JSON.parse(window.localStorage.getItem('authentication'))
    if (authentication) {
      config.headers['X-Auth-Token'] = `${authentication.token}`
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
request.interceptors.response.use(function (response) {
  // response 是响应处理
  // 注意：一定要把响应结果 return，否则真正发请求的位置拿不到数据
  // 所有响应码为2xx 都会经过这里
  return response
}, function (error) {
  // 所有响应码为4xx 都会经过这里
  const { status } = error.response
  if (status === 401) {
    // 跳转到登录页面
    // 清除本地存储中的用户登录状态
    window.localStorage.removeItem('authentication')
    router.push('/login')
    Message.error('登录状态无效，请重新登录')
    return error.response
  } else if (status === 403) {
    // token 未携带或已过期
    Message({
      type: 'warning',
      message: '没有操作权限'
    })
  } else if (status === 400) {
    // 客户端参数错误
    Message.error('参数错误，请检查请求参数')
  } else if (status >= 500) {
    Message.error('服务端内部异常，请稍后重试')
  }
  return Promise.reject(error)
})

// 导出请求方法
export default request
