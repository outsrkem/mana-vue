/**
 * 主机监控请求模块
 */
import request from '@/utils/request'

export const getHostMonitor = params => {
  return request({
    method: 'GET',
    headers: { 'Content-Type': 'application/json;charset=utf-8"' },
    url: '/api/v1/common/resource/monitor',
    // data 用来设置 POST 请求体, 是一个对象， 为json格式
    params
  })
}
