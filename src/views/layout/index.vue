<template>
  <el-container class="layout-container">
    <el-aside
      class="aside"
      width="200px"
    >
      <app-aside class="aside-menu"/>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i class="el-icon-s-fold"></i>
          <span>管理系统</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar" src="" alt="">
            <span>{{ user.nickname }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <!--
              组件默认是不识别原生事件的，除非内部做了处理
              https://cn.vuejs.org/v2/guide/components-custom-events.html#%E5%B0%86%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E7%BB%84%E4%BB%B6
             -->
            <el-dropdown-item
              @click.native="onLogout"
            >退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserInfo } from '@/api/user.js'
import globalBus from '@/utils/global-bus'

export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      user: {} // 当前登录用户信息
    }
  },
  computed: {},
  watch: {},
  created () {
    // 组件初始化好，请求获取用户资料
    this.loadUserInfo()

    // 要注册事件
    globalBus.$on('update-user', (data) => {
      // console.log('update-user', data)
      // 对象之间是引用数据类型，导致$emit中修改后，这边也变化
      // this.user = data
      // 使用普通数据就不会相互影响
      // this.user.nickname = data.nickname
      this.user.nickname = data.nickname
    })
  },
  mounted () {
  },
  methods: {
    // 除了登录接口，其它所有接口都需要授权才能请求使用
    // 或者说，除了登录接口，其它接口都需要提供你的身份令牌才能获取数据
    loadUserInfo () {
      getUserInfo().then(res => {
        this.user = res.data.response
      })
    },

    onLogout () {
      // MessageBox 弹框
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 把用户的登录状态清除
        window.localStorage.removeItem('user')

        // 跳转到登录页面
        this.$router.push('/login')
      }).catch(() => {
        // 取消的弹窗
        // this.$message({
        //   type: 'info',
        //   message: '已取消退出'
        // })
      })
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #d3dce6;

  .aside-menu {
    height: 100%;
  }
}

.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  background-color: #ffffff;

  .avatar-wrap {
    display: flex;
    align-items: center;

    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}

.main {
  background-color: #e9eef3;
}
</style>
