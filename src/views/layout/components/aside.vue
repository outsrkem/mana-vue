<template>
  <!--
    el-menu-item 的 index 不能重复，确保唯一即可
    route 是开启路由模式
   -->
  <div class="el-aside">
    <el-menu :default-active="activePath" router unique-opened>
      <el-menu-item index="/" @click="onSaveNavState('/')">
        <i class="el-icon-house"></i><span slot="title">首页</span>
      </el-menu-item>
      <!-- 可折叠导航链接 -->
      <!-- @click="onSaveNavState(subItem.path)" 用于保存当前展开的菜单 -->
      <el-submenu :index="item.id + ''" v-for="item in menusList" :key="item.id">
        <template slot="title"><i class="el-icon-link"></i> <span>{{ item.name}}</span></template>
          <el-menu-item :index="subItem.path" v-for="subItem in item.leafNode" :key="subItem.id" @click="onSaveNavState(subItem.path)">
            <i class="el-icon-menu"></i><span slot="title">{{ subItem.name}}</span>
          </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { getMenus } from '@/api/index.js'
import globalBus from '@/utils/global-bus'
export default {
  name: 'AppAside',
  components: {},
  props: {},
  data () {
    return {
      activePath: '',
      menusList: []
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
    // 更新激活状态
    globalBus.$on('update-active-path', (data) => {
      this.activePath = data
    })
    // 获取菜单
    this.loadMenuList()
  },
  mounted () {},
  methods: {
    // 保存菜单激活状态
    onSaveNavState (activePath) {
      this.activePath = activePath
      window.sessionStorage.setItem('active-path', activePath)
    },
    // 获取菜单
    async loadMenuList () {
      await getMenus().then(res => {
        this.menusList = res.response.items
      })
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
