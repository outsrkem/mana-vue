/**
 * kubernetes相关请求模块
 * /api/v1/common/kubernetes/cluster  集群操作接口
 * /api/v1/common/kubernetes/workingload 获取k8s负载
 */
import request from '@/utils/request'

// 添加集群
// /api/v1/common/kubernetes/cluster?type=cluster
export const addCluster = data => {
  return request({
    method: 'POST',
    url: '/api/v1/common/kubernetes/cluster',
    data
  })
}

// 获取集群列表
// /api/v1/common/kubernetes/cluster?type=cluster
export const getCluster = params => {
  return request({
    method: 'GET',
    url: '/api/v1/common/kubernetes/cluster',
    params
  })
}

// 获取集群名称空间
// /api/v1/common/kubernetes/cluster?cluster=123&type=namespaces
export const getNameSpaces = params => {
  return request({
    method: 'GET',
    url: '/api/v1/common/kubernetes/cluster',
    params
  })
}

// 获取负载列表
export const getWorkingLoad = params => {
  return request({
    method: 'GET',
    url: '/api/v1/common/kubernetes/cluster',
    params
  })
}

// 删除集群配置
export const deleteCluster = params => {
  return request({
    method: 'DELETE',
    url: '/api/v1/common/kubernetes/cluster',
    params
  })
}
