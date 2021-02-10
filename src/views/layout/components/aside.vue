<template>
  <!--
    el-menu-item 的 index 不能重复，确保唯一即可
    route 是开启路由模式
   -->
  <div class="el-aside">
    <el-menu :default-active="activePath" router unique-opened>
      <el-menu-item index="/" @click="onSaveNavState('/')">
        <i class="el-icon-setting"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 可折叠 -->
      <el-submenu index="/link">
        <template slot="title">
          <i class="el-icon-link"></i>
          <span>导航链接</span>
        </template>
          <el-menu-item index="/link/list" @click="onSaveNavState('/link/list')">链接浏览</el-menu-item>
          <el-menu-item index="/link/edit" @click="onSaveNavState('/link/edit')">链接编辑</el-menu-item>
          <el-menu-item index="/link/create" @click="onSaveNavState('/link/create')">添加链接</el-menu-item>
      </el-submenu>
      <el-menu-item index="/hostmonitor" @click="onSaveNavState('/hostmonitor')">
        <i class="el-icon-stopwatch"></i>
        <span slot="title">主机监控</span>
      </el-menu-item>
      <el-menu-item index="/servicemanager" @click="onSaveNavState('/servicemanager')">
        <i class="el-icon-mouse"></i>
        <span slot="title">服务管理</span>
      </el-menu-item>
      <el-menu-item index="/cluster" @click="onSaveNavState('/cluster')">
        <i class="el-icon-box"></i>
        <span slot="title">集群管理</span>
      </el-menu-item>
      <el-menu-item index="/settings" @click="onSaveNavState('/settings')">
        <i class="el-icon-menu"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AppAside',
  components: {},
  props: {},
  data () {
    return {
      activePath: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    /**
     * 组件创建后初始化 activePath
     * 若 sessionStorage 没有，则使用 "/"
     */
    this.activePath = window.sessionStorage.getItem('active-path') || '/'
  },
  mounted () {},
  methods: {
    // 保存菜单激活状态
    onSaveNavState (activePath) {
      this.activePath = activePath
      window.sessionStorage.setItem('active-path', activePath)
    }
  }
}
</script>

<style scoped lang="less">
  .el-aside {
    background-color: #FFFFFF;
    .el-menu {
      border-right: none;
    }
  }

</style>
