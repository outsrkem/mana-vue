/**
 * 导航链接请求模块
 */
import request from '@/utils/request'

// 查询多个记录
export const getLinksAll = params => {
  return request({
    method: 'GET',
    headers: { 'Content-Type': 'application/json;charset=utf-8"' },
    url: '/api/v1/common/navigation/links',
    // data 用来设置 POST 请求体, 是一个对象， 为json格式
    params
  })
}

// 查询单条记录
export const getLink = paths => {
  return request({
    method: 'GET',
    headers: { 'Content-Type': 'application/json;charset=utf-8"' },
    url: `/api/v1/common/navigation/links/${paths.id}`
    // data 用来设置 POST 请求体, 是一个对象， 为json格式
  })
}
