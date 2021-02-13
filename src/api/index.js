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
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'
/**
 *********************************用户相关****************************************************
 */

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
 *********************************导航链接****************************************************
 */
/**
 * 查询单条记录
 * @param {*} paths 路径参数，
 */
export const getLink = (paths) => ajax('/api/v1/common/navigation/links/' + paths.id)

/**
 *********************************主机监控****************************************************
 */
/**
 * 获取主机监控信息
 * @param {*} params 查询参数
 */
export const getHostMonitor = (params) => ajax('/api/v1/common/resource/monitor', 'GET', params)

/**
 ********************************************************************************************
 */
//
//
/**
 */
// 1.获取地址信息(根据经纬度串)
// 这个接口的经纬度参数是在url路径里的param参数，没有query参数
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)

// 2.获取 msite 页面食品分类列表
export const reqCategorys = () => ajax(BASE_URL + '/index_category')

// 3.获取 msite 商铺列表(根据query参数：经纬度)
// 将经纬度两个数据作为一个参数对象传入
// 也可以两个数据分别传入ajax， 然后再放入一个对象参数内， 如下面的手机号接口
export const reqShops = ({
  latitude,
  longitude
}) => ajax(BASE_URL + '/shops', {
  latitude,
  longitude
})

// 4.根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL + '/search_shops', {
  geohash,
  keyword
})

// 6.账号密码登录
export const reqPwdLogin = ({
  name,
  pwd,
  captcha
}) => ajax(BASE_URL + '/login_pwd', {
  name,
  pwd,
  captcha
}, 'POST')

// 8.手机号验证码登录
export const reqSmsLogin = (phone, code) => ajax(BASE_URL + '/login_sms', {
  phone,
  code
}, 'POST')
