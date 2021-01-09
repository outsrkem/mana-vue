<template>
  <div>
    <!--
    Card 卡片
    将信息聚合在卡片容器中展示。
    -->
    <el-card class="box-card">
      <div slot="header" class="clearfix my_refresh">
        <!--面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>主机监控</el-breadcrumb-item>
        </el-breadcrumb>
        <!--/面包屑导航-->
        <!--刷新按钮-->
        <el-row>
          <el-button
            size="small"
            icon="el-icon-refresh"
            @click="myRefresh">
          </el-button>
        </el-row>
        <!--/刷新按钮-->
      </div>
      <!--表格开始-->
      <el-table
        size="medium"
        :data="tableData"
        style="width: 100%"
        class="filter-card">
        <el-table-column
          prop="hostname"
          label="主机名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="hostip"
          label="IP地址"
          width="180">
        </el-table-column>
        <el-table-column
          prop="memory.proportion"
          label="内存">
        </el-table-column>
        <el-table-column
          prop="cpu.proportion"
          label="CPU">
        </el-table-column>
        <el-table-column
          prop="disk.proportion"
          label="磁盘">
        </el-table-column>
      </el-table>
      <!--/表格开始-->
      <!--Pagination 分页-->
      <!--
      :current-page.sync="currentPage"  当前页码
      @size-change="onSizeChange" 页码大小改变触发事件
      :total="pageTotal" 总条数
      layout="sizes, prev, pager, next" 其中sizes是显示选择多少条为一页
      -->
      <el-pagination
        @current-change="onCurrentChange"
        @size-change="onSizeChange"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        background
        layout="sizes, prev, pager, next"
        :total="pageTotal"
        :current-page.sync="currentPage"
        :pager-count="11"
      >
      </el-pagination>
      <!--/Pagination 分页-->
    </el-card>

  </div>
</template>

<script>
import { getHostMonitor } from '@/api/hostmonitor'

export default {
  name: 'hostmonitor',
  data () {
    return {
      tableData: [{
        name: '百度',
        content: 'https://www.baidu.com'
      }],
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadHostMonitor()
  },
  mounted () {
  },
  methods: {
    loadHostMonitor (pageSize = 10, page = 1) {
      getHostMonitor({
        pageSize: pageSize,
        page: page
      }).then(res => {
        // console.log(res)
        // const { items } = res.data.response
        const { total: pageTotal } = res.data.response.pageInfo
        this.tableData = res.data.response.items
        this.pageTotal = pageTotal
      })
    },
    onCurrentChange (page) {
      // console.log(page)
      this.page = page
      const pageSize = this.pageSize
      this.loadHostMonitor(pageSize, page)
    },
    onSizeChange (pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize
      this.currentPage = 1
      this.loadHostMonitor(pageSize, 1)
    },
    myRefresh () {
      // 刷新页面
      // console.log('刷新')
      this.loadHostMonitor(this.pageSize, this.page)
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
