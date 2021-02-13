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
          <el-select size="small" v-model="clusterId" @change="onClusterIdChange()" filterable placeholder="请选择">
            <el-option v-for="item in clusters" :key="item.clusterId" :label="item.clusterLabel" :value="item.clusterId"/>
          </el-select>
          <el-select size="small" v-model="ns" @change="onNamespacesIdChange()" filterable placeholder="请选择" style="margin-left: 20px;">
            <el-option v-for="item in namespaces" :key="item.ns" :label="item.nsLabel" :value="item.ns"/>
          </el-select>
          <el-select size="small" v-model="control" @change="onControlsChange()" filterable placeholder="请选择" style="margin-left: 20px;">
            <el-option v-for="item in controls" :key="item.controlValue" :label="item.controlLabel" :value="item.controlValue"/>
          </el-select>
        </div>
        <!--刷新按钮-->
        <el-row>
          <el-button size="small" icon="el-icon-refresh" @click="onRefresh"/>
        </el-row>
        <!--/刷新按钮-->
      </div>
      <!--表格开始-->
      <el-table size="medium" :data="workingLoad" style="width: 100%" class="filter-card">
        <!--表格内展开行-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-table :data="props.row.containers" border style="width: 100%">
                <el-table-column prop="name" label="name" width="300"/>
                <el-table-column prop="image" label="image"/>
                <el-table-column prop="imageVersion" label="imageVersion"/>
              </el-table>
            </el-form>
          </template>
        </el-table-column>
        <!--/表格内展开行结束-->
        <el-table-column prop="name" label="NAME" width="180"/>
        <el-table-column prop="replicas" label="replicas" width="180"/>
        <el-table-column prop="creationTimestamp" label="CREATIONTIME"/>
      </el-table>
      <!--/表格结束-->
      <!--Pagination 分页开始-->
        <!--
        :current-page.sync="currentPage"  当前页码
        @size-change="onSizeChange" 页码大小改变触发事件
        :total="pageTotal" 总条数
        layout="sizes, prev, pager, next" 其中sizes是显示选择多少条为一页
        -->
      <el-pagination @current-change="onCurrentChange" @size-change="onSizeChange" :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize" background layout="total, sizes, prev, pager, next" :total="pageTotal"
        :current-page.sync="currentPage" :pager-count="11"/>
      <!--/Pagination 分页结束-->
    </el-card>
  </div>
</template>

<script>
import { getCluster, getNameSpaces, getWorkingLoad } from '@/api/index.js'
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
        controlValue: 'daemonset',
        controlLabel: 'daemonset'
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
  },
  mounted () {
    this.loadCluster()
  },
  methods: {
    loadCluster: async function (type) {
      // 获取取群列表
      await getCluster().then(res => {
        const result = res
        // 如果有一个集群，则默认为第一个集群
        this.clusterId = result.response.items[0].id
        // 首次加载负载
        this.loadWorkingLoad(this.pageSize, this.page, this.clusterId, this.ns, this.control)
        // 首次加载名称空间
        this.loadNamespaces(this.clusterId)
        this.clusters = result.response.items.map(items => ({
          clusterId: items.id,
          clusterLabel: items.server
        }))
        // this.clusters = clusters
      })
    },
    // 加载名称空间
    loadNamespaces: async function (clusterId) {
      // 获取集群的名称空间
      const paths = { clusterId }
      await getNameSpaces(paths).then(res => {
        this.namespaces = res.response.items.map(items => ({
          ns: items,
          nsLabel: items
        }))
        // this.namespaces = namespaces
      })
    },
    // 加载工作负载
    loadWorkingLoad: async function (pageSize, page, clusterId, namespaces = 'kube-system', control) {
      // 定义请求参数，路径参数和params
      const paths = { clusterId, namespaces, control }
      const params = { page_size: pageSize, page: page }
      // 请求
      await getWorkingLoad(paths, params).then(res => {
        const { total: pageTotal } = res.response.pageInfo
        this.workingLoad = res.response.items
        // 转为int
        this.pageTotal = parseInt(pageTotal)
      })
    },
    onCurrentChange (page) {
      this.page = page
      const pageSize = this.pageSize
      this.loadWorkingLoad(pageSize, page, this.clusterId, this.ns, this.control)
    },
    onSizeChange (pageSize) {
      this.pageSize = pageSize
      this.currentPage = 1
      this.loadWorkingLoad(pageSize, 1)
    },
    onRefresh () {
      // 刷新页面
      this.loadWorkingLoad(this.pageSize, this.page, this.clusterId, this.ns, this.control)
      this.loadNamespaces(this.clusterId)
    },
    // 集群切换加载集群名称空间
    onClusterIdChange () {
      this.loadWorkingLoad(this.pageSize, 1, this.clusterId, this.ns, this.control)
      this.loadNamespaces(this.clusterId)
    },
    // 名称空间切换加载负载列表
    onNamespacesIdChange () {
      this.loadWorkingLoad(this.pageSize, 1, this.clusterId, this.ns, this.control)
    },
    // 控制器切换加载负载列表
    onControlsChange () {
      this.loadWorkingLoad(this.pageSize, 1, this.clusterId, this.ns, this.control)
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
