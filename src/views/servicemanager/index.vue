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
          <el-breadcrumb-item>服务管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--/面包屑导航-->
        <div>
          <el-select v-model="clusterValue" filterable placeholder="请选择">
            <el-option
              v-for="item in clusters"
              :key="item.clusterValue"
              :label="item.clusterLabel"
              :value="item.clusterValue">
            </el-option>
          </el-select>
          <el-select v-model="namespacesValue" filterable placeholder="请选择">
            <el-option
              v-for="item in namespaces"
              :key="item.namespacesValue"
              :label="item.namespacesLabel"
              :value="item.namespacesValue">
            </el-option>
          </el-select>
          <el-select v-model="controlValue" filterable placeholder="请选择">
            <el-option
              v-for="item in control"
              :key="item.controlValue"
              :label="item.controlLabel"
              :value="item.controlValue">
            </el-option>
          </el-select>
        </div>
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
          prop="name"
          label="NAME"
          width="180">
        </el-table-column>
        <el-table-column
          prop="replicas"
          label="replicas"
          width="180">
        </el-table-column>
        <el-table-column
          prop="image"
          label="image">
        </el-table-column>
        <el-table-column
          prop="imageversion"
          label="VERSION">
        </el-table-column>
        <el-table-column
          prop="creationTimestamp"
          label="CREATIONTIME">
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
import { getWorkingLoad } from '@/api/servicemanager'

export default {
  name: 'hostmonitor',
  data () {
    return {
      clusters: [{
        clusterValue: 'cluster1',
        clusterLabel: 'cluster1'
      }],
      clusterValue: 'cluster1',
      namespaces: [{
        namespacesValue: 'default',
        namespacesLabel: 'default'
      }],
      namespacesValue: 'default',
      control: [{
        controlValue: 'deployment',
        controlLabel: 'deployment'
      }],
      controlValue: 'deployment',
      tableData: [],
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadWorkingLoad()
  },
  mounted () {
  },
  methods: {
    loadWorkingLoad (pageSize = 10, page = 1) {
      getWorkingLoad({
        pageSize: pageSize,
        page: page,
        cluster: this.clusterValue,
        namespaces: this.namespacesValue,
        // namespaces: "asd",
        control: this.controlValue
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
      this.loadWorkingLoad(pageSize, page)
    },
    onSizeChange (pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize
      this.currentPage = 1
      this.loadWorkingLoad(pageSize, 1)
    },
    myRefresh () {
      // 刷新页面
      // console.log('刷新')
      this.loadWorkingLoad(this.pageSize, this.page)
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
