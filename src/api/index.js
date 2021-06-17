/*
 * 与后台交互模块 （依赖已封装的ajax函数）
 * 包含n个接口请求函数的模块，函数的返回值是promise对象
 */
import ajax from '@/api/ajax'
/**
 * ajax 有如下4个参数
 * @param {*} url 请求路径，默认为空
 * @param {*} method 请求方法，默认为GET
 * @param {*} params 请求参数，默认为空对象
 * @param {*} data 请求参数，默认为空对象
 */
/** *********************************用户相关**************************************************** */
/**
 * 用户登录
 * @param {*} data 登录请求体：{username: "lis", password: "123456"}
 */
export const login = (data) => ajax('/api/v1/common/user/login', 'POST', null, data)

/**
 * 查询用户信息
 * @param {*} userid 用户id
 */
export const getUserInfo = (userid) => ajax('/api/v1/common/user/userinfo/' + userid, null, null, null)

/**
 * 查询菜单列表
 * @returns
 */
export const getMenus = () => ajax('/api/v1/common/menus/list')

/**
 * 获取角色列表
 * @returns
 */
export const getRoleList = () => ajax('/api/v1/common/system/role')

/**
 * 添加角色
 * @param {*} data 添加角色请求体 {"role_name":"角色名称","role_desc":"角色描述"}
 */
export const addRole = (data) => ajax('/api/v1/common/system/role', 'POST', null, data)

/**
 * 删除角色
 * @param {*} data {"role_id":[1003,1002,1001]}
 */
export const deleteRole = (data) => ajax('/api/v1/common/system/role', 'DELETE', null, data)

/**
 * 获取角色授权的所有菜单
 * @param {*} params 查询参数?rid=1002
 */
export const getMenuAllAndAuthorized = (params) => ajax('/api/v1/common/system/menus/list', 'GET', params)

/** *********************************导航链接**************************************************** */
/**
 * 查询单条记录
 * @param {*} paths 路径参数:{id: "xx"}
 */
export const getLink = (paths) => ajax('/api/v1/common/navigation/links/' + paths.id)

/**
 * 查询多个记录
 * @param {*} params 查询参数
 */
export const getLinksAll = (params) => ajax('/api/v1/common/navigation/links', 'GET', params)

/**
 * 修改导航链接
 * @param {*} paths 路径参数:{id: "xx"}
 * @param {*} data 请求参数:{name: "xxx", url: "x", activate: "x", category: "x", describes: "xxx"}
 */
export const editLink = (paths, data) => ajax(`/api/v1/common/navigation/links/${paths.id}`, 'PATCH', null, data)

/**
 * 删除导航链接
 * @param {*} paths paths 路径参数:{id: "xx"}
 */
export const deleteLink = (paths) => ajax(`/api/v1/common/navigation/links/${paths.id}`, 'DELETE')

/**
 * 添加导航链接
 * @param {*} data 请求参数:{name: "xxx", url: "x", activate: "x", category: "x", describes: "xxx"}
 */
export const addLink = (data) => ajax('/api/v1/common/navigation/links', 'POST', null, data)

/** *********************************主机监控**************************************************** */
/**
 * 获取主机监控信息
 * @param {*} params 查询参数
 */
export const getHostMonitor = (params) => ajax('/api/v1/common/resource/monitor', 'GET', params)

/** *********************************kubernetes**************************************************** */
/**
 * 获取集群列表
 * @param {*} params 查询参数
 */
export const getCluster = (params) => ajax('/api/v1/common/kubernetes/cluster', 'GET', params)

/**
 * 添加集群
 * @param {*} data k8s 集群鉴权文件 json
 */
export const addCluster = (data) => ajax('/api/v1/common/kubernetes/cluster', 'POST', null, data)

/**
 * 删除集群配置
 * @param {*} paths {config_id: "xx"} 要删除的配置的
 */
export const deleteCluster = (paths) => ajax(`/api/v1/common/kubernetes/cluster/${paths.config_id}`, 'DELETE')

/**
 * 获取集群名称空间
 * @param {*} paths
 * @param {*} params
 */
export const getNameSpaces = (paths, params) => ajax(`/api/v1/common/kubernetes/cluster/${paths.clusterId}/namespaces`, 'GET', params)

/**
 * 获取负载列表
 * https://10.10.10.10/api/v1/common/kubernetes/cluster/66/control/kube-system/deployments
 * @param {*} paths
 * @param {*} params
 */
export const getWorkingLoad = (paths, params) => ajax(
  `/api/v1/common/kubernetes/cluster/${paths.clusterId}/control/${paths.namespaces}/${paths.control}`, 'GET', params)
