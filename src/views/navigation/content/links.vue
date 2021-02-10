<template>
  <div>
    <div class="link-category-container">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="link-category">
            <span>链接类型：</span>
            <el-button type="text" @click="onCategoryValue()">全部</el-button>
            <span v-for="(item, index) in categoryOptions" :key="index">
              <el-button type="text" @click="onCategoryValue(index)">{{item}}</el-button>
            </span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="link-url-container" style="">
        <el-row :gutter="20">
          <el-col :span="3" v-for="(link,index) in linksCategoryFiltered" :key="index">
            <el-link :href="link.content" target="_blank" type="primary">{{ link.name | nameSnippet }}</el-link>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import { getLinksAll } from '@/api/navigation'
export default {
  name: 'NavigationLinks',
  components: {},
  data () {
    return {
      links: [],
      categoryOptions: {
        1: '公共网址',
        2: '监控网址',
        3: '办公网址',
        4: '业务网址',
        5: '其他'
      },
      categoryValue: '',
      refreshLoading: false
    }
  },
  computed: {
    // 按类别过滤
    linksCategoryFiltered: function () {
      return this.links.filter((links) => {
        return links.category.match(this.categoryValue)
      })
    }
  },
  filters: {
    // url snippet
    nameSnippet: function (value) {
      const len = 8
      if (value.length < len) {
        return value
      }
      return value.slice(0, len) + '...'
    }
  },
  watch: {},
  created () {
    this.loadNavigationLinksAll()
  },
  mounted () {
  },
  methods: {
    loadNavigationLinksAll () {
      // eslint-disable-next-line no-undef
      getLinksAll().then(res => {
        this.links = res.data.response.items
        this.refreshLoading = false
      }).catch(_ => {
        // 刷新失败，也重置刷新按钮
        this.refreshLoading = false
      })
    },
    onRefresh () {
      // 刷新页面
      this.refreshLoading = true
      this.loadNavigationLinksAll()
    },
    onCategoryValue (value = '') {
      this.categoryValue = value
    }
  }
}
</script>

<style scoped lang="less">
  .link-list-line {
    display: flex;
    .link-list-line-name {
      width:200px;
    }
  }
  .link-category-container {
    margin: auto;
    width: 80%;
    line-height: 36px;
    border-bottom: 1px solid #c1c3c7;
    .link-category {
      border-radius: 4px;
      min-height: 36px;
      span {
        padding-left: 20px;
      }
      .el-button {
        margin-left: 26px;
      }
    }
  }
  .link-url-container {
    margin: auto;
    width: 90%;
    line-height: 36px;
    margin-top:20px;
  }
</style>
