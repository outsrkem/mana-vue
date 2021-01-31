<template>
  <div>
    <el-card class="box-card">
      <!--
      Card 卡片
      将信息聚合在卡片容器中展示。
      -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="导航链接" name="1"></el-tab-pane>
        <el-tab-pane label="链接编辑" name="2"></el-tab-pane>
        <el-tab-pane label="添加链接" name="3"></el-tab-pane>
      </el-tabs>
      <div class="tab-content">
        <keep-alive>
          <component :is="curComponents[activeName]" :links="links"></component>
        </keep-alive>
      </div>
    </el-card>

  </div>
</template>

<script>
import { getLink } from '@/api/navigation'
import Links from './content/links.vue'
import Edit from './content/edit.vue'
import LinkAdd from './content/linkAdd.vue'

export default {
  name: 'Navigation',
  data () {
    return {
      links: [{
        name: '百度',
        content: 'https://www.baidu.com'
      }],
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10,
      activeName: '',
      curComponents: {
        1: 'Links',
        2: 'Edit',
        3: 'LinkAdd'
      }
    }
  },
  computed: {},
  components: {
    Links,
    Edit,
    LinkAdd
  },
  watch: {
    '$route.query': {
      handler (newval, oldval) {
        this.activeName = newval.type
      },
      immediate: true
    }
  },
  created () {
    this.loadNavigationLinks()
    this.activeName = this.$route.query.type || '1'
  },
  mounted () {
  },
  methods: {
    loadNavigationLinks () {
      getLink().then(res => {
        this.links = res.data.response.items
      })
    },
    // 切换tabs
    handleClick (tab) {
      this.activeName = tab.name
      this.$router.push({
        path: '/navigation',
        query: { type: this.activeName }
      })
    },

    myRefreshLinks () {
      // 刷新页面
      // console.log('刷新')
      this.loadNavigationLinks(this.pageSize, this.page)
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 20px;
}

.my_refresh {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
