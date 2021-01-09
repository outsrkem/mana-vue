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
          <li class="el-icon-s-fold"></li>
          <span>管理系统</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar">
            <span>用户名</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
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

export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {}
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
