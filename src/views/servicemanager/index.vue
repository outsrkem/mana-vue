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
          <el-select
            size="small"
            v-model="clusterId"
            @change="onNameSpaces('namespaces')"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in clusters"
              :key="item.clusterId"
              :label="item.clusterLabel"
              :value="item.clusterId"
            >
            </el-option>
          </el-select>
          <el-select
            size="small"
            v-model="ns"
            filterable
            placeholder="请选择"
            style="margin-left: 20px;"
          >
            <el-option
              v-for="item in namespaces"
              :key="item.ns"
              :label="item.nsLabel"
              :value="item.ns"
            >
            </el-option>
          </el-select>
          <el-select
            size="small"
            v-model="control"
            filterable
            placeholder="请选择"
            style="margin-left: 20px;"
          >
            <el-option
              v-for="item in controls"
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
            @click="onRefresh">
          </el-button>
        </el-row>
        <!--/刷新按钮-->
      </div>
      <!--表格开始-->
      <el-table
        size="medium"
        :data="workingLoad"
        style="width: 100%"
        class="filter-card">
        <!--表格内展开行-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-table
                :data="props.row.containers"
                border
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="name"
                  width="300">
                </el-table-column>
                <el-table-column
                  prop="image"
                  label="image">
                </el-table-column>
                <el-table-column
                  prop="imageVersion"
                  label="imageVersion">
                </el-table-column>
              </el-table>
            </el-form>
          </template>
        </el-table-column>
        <!--/表格内展开行-->
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
import {
  getWorkingLoad,
  getNameSpaces,
  getCluster
} from '@/api/kubernetes'

export default {
  name: 'serviceManager',
  data () {
    return {
      clusters: [],
      clusterId: null,
      namespaces: [],
      ns: 'kube-system',
      controls: [{
        controlValue: 'deployments',
        controlLabel: 'deployments'
      }, {
        controlValue: 'daemondset',
        controlLabel: 'daemondset'
      }],
      control: 'deployments',
      workingLoad: [],
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadCluster('cluster')// 加载集群列表信息，用于筛选集群获取负载

    if (this.clusterId) {
      this.loadWorkingLoad() // 加载工作负载
    }
  },
  mounted () {
  },
  methods: {
    loadCluster (type) {
      // 获取取群列表
      getCluster({
        type: type
      }).then(res => {
        const result = res.data
        // 如果有一个集群，则默认为第一个集群
        this.clusterId = result.response.items[0].server
        const clusters = result.response.items.map(items => ({
          clusterId: items.server,
          clusterLabel: items.server
        }))
        this.clusters = clusters
      })
    },
    loadNamespaces (type, clusterId) {
      // 获取集群的名称空间
      getNameSpaces({
        type: type,
        address: clusterId
      }).then(res => {
        const result = res.data
        const namespaces = result.response.items.map(items => ({
          ns: items.ns,
          nsLabel: items.ns
        }))
        this.namespaces = namespaces
      })
    },
    loadWorkingLoad (pageSize = 10, page = 1) {
      getWorkingLoad({
        pageSize: pageSize,
        page: page,
        address: this.clusterId,
        namespaces: this.ns,
        control: this.control,
        type: 'workingload'
      }).then(res => {
        const { total: pageTotal } = res.data.response.pageInfo
        this.workingLoad = res.data.response.items
        this.pageTotal = pageTotal
      })
    },
    onCurrentChange (page) {
      this.page = page
      const pageSize = this.pageSize
      this.loadWorkingLoad(pageSize, page)
    },
    onSizeChange (pageSize) {
      this.pageSize = pageSize
      this.currentPage = 1
      this.loadWorkingLoad(pageSize, 1)
    },
    onRefresh () {
      // 刷新页面
      this.loadWorkingLoad(this.pageSize, this.page)
    },
    onNameSpaces (type) {
      // 加载集群名称空间
      this.loadNamespaces(type, this.clusterId)
      this.loadWorkingLoad()
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
