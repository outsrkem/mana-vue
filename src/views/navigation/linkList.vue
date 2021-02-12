<template>
  <div>
    <div class="link-breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }"><span @click="onToNewPath('/')">首页</span></el-breadcrumb-item>
        <el-breadcrumb-item>导航链接</el-breadcrumb-item>
        <el-breadcrumb-item>链接浏览</el-breadcrumb-item>
        <el-breadcrumb-item>{{ breadcrumbCategory  }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
        <div class="link-category-container">
            <el-row :gutter="20">
                <el-col :span="24">
                  <div class="link-category">
                      <span>链接类型：</span>
                        <el-button type="text" :loading="refreshLoading" @click="onRefresh()">刷新</el-button>
                        <el-button type="text" @click="onCategoryValue()">全部</el-button>
                        <span v-for="(item, index) in categoryOptions" :key="index">
                        <el-button type="text" @click="onCategoryValue(index)">{{ item }}</el-button>
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
        <!-- 分页 -->
        <div class="pagination-row">
          <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-size="100" :total="pageTotal"
            @size-change="onSizeChange" @current-change="onCurrentChange" :current-page.sync="currentPage" :page-sizes="[50, 100 ,150, 200]">
          </el-pagination>
        </div>
    </el-card>
  </div>
</template>

<script>
import { getLinksAll } from '@/api/navigation'
import globalBus from '@/utils/global-bus'
export default {
  name: 'NavigationLinks',
  components: {},
  data () {
    return {
      links: [],
      pageTotal: 0,
      currentPage: 1,
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
    },
    // 面包屑导航显示的分类
    breadcrumbCategory: function () {
      return (this.categoryValue === '') ? '全部' : this.categoryOptions[this.categoryValue]
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
    loadNavigationLinksAll (pageSize = 100, page = 1) {
      const params = {
        page_size: pageSize,
        page: page,
        category: (this.categoryValue === '') ? null : this.categoryValue,
        activate: (this.activateValue === '') ? null : this.activateValue
      }
      getLinksAll(params).then(res => {
        this.links = res.data.response.items
        this.pageTotal = parseInt(res.data.response.pageInfo.total)
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
      this.loadNavigationLinksAll(this.pageSize, 1)
    },
    onToNewPath (path) {
      this.$router.push(path)
      // 通过消息更新激活状态
      globalBus.$emit('update-active-path', path)
      window.sessionStorage.setItem('active-path', path)
    },
    onCurrentChange (page) {
      this.page = page
      this.loadNavigationLinksAll(this.pageSize, page)
    },
    onSizeChange (pageSize) {
      this.pageSize = pageSize
      this.currentPage = 1
      this.loadNavigationLinksAll(pageSize, 1)
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
  .box-card {
    .pagination-row {
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }
</style>
