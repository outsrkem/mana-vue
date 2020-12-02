import Vue from 'vue'
import VueRouter from 'vue-router'
// 在 VueCLI 创建的项目中 @ 表示 src 目录
// 它是 src 目录的路径别名
// 好处：它不受当前文件路径影响
// 注意：@ 就是 src 路径，后面别忘了写那个斜杠
// 使用建议：如果加载的资源路径就在当前目录下，那就正常写
//       如果需要进行父级路径查找的都使用 @
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Layout from '@/views/layout/index.vue'
import Navigation from '@/views/navigation/'
import HostMonitor from '@/views/hostmonitor/index'
import ServiceManager from '@/views/servicemanager/index'
import Settings from '@/views/settings/'
import Cluster from '@/views/kubernetes/cluster/index'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/', // path 为空，会作为默认子路由渲染
    // 路由的名字是干啥的？
    // 参考：https://gitee.com/lipengzhou/toutiao-publish-admin/issues/I1F1BA
    // name: 'Layout',
    component: Layout,
    children: [
      {
        path: '', // path 为空，会作为默认子路由渲染

        // 路由的名字是干啥的？
        // 参考：https://gitee.com/lipengzhou/toutiao-publish-admin/issues/I1F1BA
        name: 'home',
        component: Home
      },
      {
        path: '/navigation',
        name: Navigation,
        component: Navigation
      },
      {
        path: '/hostmonitor',
        name: HostMonitor,
        component: HostMonitor
      },
      {
        path: '/cluster',
        name: Cluster,
        component: Cluster
      },
      {
        path: '/servicemanager',
        name: ServiceManager,
        component: ServiceManager
      },
      {
        path: '/settings',
        name: 'settings',
        component: Settings
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫：说白了所有页面的导航都会经过这里
// 守卫页面的导航的
// to：要去的路由信息
// from：来自哪里的路由信息
// next：放行方法
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login，校验登录状态
  // 如果没有登录，则跳转到登录页面
  // 如果登录了，则允许通过
  // 允许通过
  // next()
  const user = JSON.parse(window.localStorage.getItem('user'))
  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 已登录，允许通过
      next()
    } else {
      // 没有登录，跳转到登录页面
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})

// 我们在组件中使用的 this.$router 其实就是这个模块中的 router
export default router
