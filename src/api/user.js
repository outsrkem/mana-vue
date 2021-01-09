/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    method: 'GET',
    url: '/api/v1/common/navigation/links',
    // data 用来设置 POST 请求体
    data
  })
}

// 获取用户信息
// export const getUserInfo = () => {

// }

// 修改用户信息
// export const updateUser = () => {

// }
