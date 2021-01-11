<template>
  <!--
    el-menu-item 的 index 不能重复，确保唯一即可
    route 是开启路由模式
   -->
  <el-menu
    default-active="/"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/">
      <i class="el-icon-setting"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/navigation">
      <i class="el-icon-link"></i>
      <span slot="title">导航链接</span>
    </el-menu-item>
    <el-menu-item index="/hostmonitor">
      <i class="el-icon-stopwatch"></i>
      <span slot="title">主机监控</span>
    </el-menu-item>
    <el-menu-item index="/servicemanager">
      <i class="el-icon-mouse"></i>
      <span slot="title">服务管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-menu"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  components: {},
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

<style scoped lang="less"></style>
