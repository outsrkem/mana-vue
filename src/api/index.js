/*
 * 与后台交互模块 （依赖已封装的ajax函数）
 * 包含n个接口请求函数的模块，函数的返回值是promise对象
 */
import ajax from '@/api/ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'

// 获取用户信息, 4个参数，后面3个为空，可以不传
export const getUserInfo = (userid) => ajax('/api/v1/common/user/userinfo/' + userid, null, null, null)

// 查询导航链接
export const getLinkNew = (paths) => ajax('/api/v1/common/navigation/links/' + paths.id)

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
