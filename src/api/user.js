/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

// 用户登录
// /api/v1/common/users/login
export const login = data => {
  return request({
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8"' },
    url: '/api/v1/common/users/login',
    // data 用来设置 POST 请求体, 是一个对象， 为json格式
    data
  })
}

// 获取用户信息
// /api/v1/common/users/123
export const getUserInfo = () => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  // console.log(user)
  return request({
    method: 'POST',
    headers:
      {
        'Content-Type': 'application/json;charset=utf-8'
        // 'X-Auth-Token': `${user.token}`
      },
    url: `/api/v1/common/users/userinfo/${user.userid}`
  })
}

// 修改用户信息
// export const updateUser = () => {

// }
