<template>

  <div >
    <div class="link-breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }"><span @click="onToNewPath('/')">首页</span></el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
菜单管理
  </div>
</template>

<script>
import globalBus from '@/utils/global-bus'
export default {
  name: 'NavigationLinks',
  components: {},
  data () {
    return {}
  },
  computed: { },
  filters: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {

    onToNewPath (path) {
      this.$router.push(path)
      // 通过消息更新激活状态
      globalBus.$emit('update-active-path', path)
      window.sessionStorage.setItem('active-path', path)
    }
  }
}
</script>

<style scoped lang="less">

</style>
