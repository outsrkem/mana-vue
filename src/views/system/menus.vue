<template>

  <div >
    <div class="link-breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }"><span @click="onToNewPath('/')">首页</span></el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
import globalBus from '@/utils/global-bus'
export default {
  name: 'NavigationLinks',
  components: {},
  data () {
    return {
      tableGateData: [
        {
          name: '刘大',
          nameId: 1,
          deptname: '内科',
          level: '主任医生'
        },
        {
          name: '刘二',
          nameId: 2,
          deptname: '内科',
          level: '主任医生'
        },
        {
          name: '刘三',
          nameId: 3,
          deptname: '内科',
          level: '主任医生'
        },
        {
          name: '刘四',
          nameId: 4,
          deptname: '内科',
          level: '主任医生'
        },
        {
          name: '刘五',
          nameId: 5,
          deptname: '内科',
          level: '主任医生'
        }],
      docSelection: [
        {
          name: '刘二',
          nameId: 2,
          deptname: '内科',
          level: '主任医生'
        },
        {
          name: '刘四',
          nameId: 4,
          deptname: '内科',
          level: '主任医生'
        }]
    }
  },
  computed: { },
  filters: {},
  watch: {},
  created () {},
  mounted () {
    const arr = []
    this.docList.forEach(item => {
      this.docSelection.forEach(val => {
        if (val.nameId === item.nameId) {
          arr.push(item)
        }
      })
    })
    this.toggleSelection(arr)
  },
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
