<template>
  <div>
    <div class="link-breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }" ><span @click="onToNewPath('/')">首页</span></el-breadcrumb-item>
        <el-breadcrumb-item>kubernetes</el-breadcrumb-item>
        <el-breadcrumb-item>集群管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--
    Card 卡片
    将信息聚合在卡片容器中展示。
    -->
    <el-card class="box-card">
      <div slot="header" class="clearfix refresh">
        <!--面包屑导航-->
        <!--        <el-breadcrumb separator-class="el-icon-arrow-right">-->
        <!--          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
        <!--          <el-breadcrumb-item>集群管理</el-breadcrumb-item>-->
        <!--        </el-breadcrumb>-->
        <!--/面包屑导航-->
        <!--功能按钮-->
        <el-row class="box-card-header">
          <el-button size="small" type="primary" @click="dialogVisible = true">添加集群</el-button>
          <el-dialog title="添加集群鉴权文件" :visible.sync="dialogVisible" width="30%"
          :before-close="handleClose" :close-on-click-modal="false" append-to-body>
            <el-input type="textarea" placeholder="只支持json格式内容" v-model="clusterConfig" :autosize="{ minRows: 2, maxRows: 9}"/>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="onAddCluster">确 定</el-button>
            </span>
          </el-dialog>
        </el-row>
        <!--/功能按钮-->
        <!--刷新按钮-->
        <el-row>
          <el-button size="small" icon="el-icon-refresh" @click="onRefresh" :loading="refreshLoading"/>
        </el-row>
        <!--/刷新按钮-->
      </div>
      <!--中间内容部分-->
      <el-table :data="ClusterList" style="width: 100%" v-loading="loading" class="filter-card" >
        <el-table-column prop="clusterName" label="名称"/>
        <el-table-column prop="userName" label="用户"/>
        <el-table-column prop="server" label="集群地址"/>
        <el-table-column prop="creationTime" label="添加时间"/>
        <el-table-column prop="status" label="状态"/>
        <el-table-column label="操作">
          <template slot-scope="props">
            <el-button type="text" size="small" @click="onDeleteClusterConfig(props.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--/中间内容部分结束-->
      <el-pagination @current-change="onCurrentChange" @size-change="onSizeChange" :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize" background :total="pageTotal" :current-page.sync="currentPage"
        layout="total, sizes, prev, pager, next" :pager-count="11"/>
      <!--/Pagination 分页-->
    </el-card>
  </div>
</template>

<script>
import { getCluster, addCluster, deleteCluster } from '@/api/index.js'

export default {
  name: 'Cluster',
  components: {},
  props: {},
  data () {
    return {
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10,
      ClusterList: [],
      dialogVisible: false,
      clusterConfig: null,
      clusterConfigId: null,
      loading: null,
      refreshLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadCluster(this.pageSize)
  },
  mounted () {
  },
  methods: {
    loadCluster: async function (pageSize = 10, page = 1) {
      // 获取取群列表
      const params = { page_size: pageSize, page }
      await getCluster(params).then(res => {
        this.ClusterList = res.response.items
        this.pageTotal = parseInt(res.response.pageInfo.total)
        this.loading = false
        this.refreshLoading = false
      }).catch(_ => {
        // 刷新失败，也重置刷新按钮
        this.refreshLoading = false
      })
    },
    // 发送添加集群请求
    addClusterRequest: async function (data) {
      await addCluster(data).then(res => {
        this.onRefresh()
        this.$notify({ title: '', message: '添加集群成功', type: 'success' })
      }).catch(err => {
        this.$notify({ title: '添加集群失败', message: err, type: 'error' })
      })
      this.clusterConfig = null
    },
    // 发送删除集群请求
    deleteClusterRequest: async function (clusterConfigId) {
      const paths = { config_id: clusterConfigId }
      await deleteCluster(paths).then(res => {
        this.onRefresh()
        this.$notify({ duration: 700, title: '删除集群成功', message: 'Delete successful', type: 'success' })
      }).catch(err => {
        this.$notify({ title: '删除集失败', message: err, type: 'error' })
      })
    },
    onAddCluster () {
      console.log('添加集群')
      this.dialogVisible = false
      this.addClusterRequest(this.clusterConfig)
    },
    handleClose (_) {
      this.dialogVisible = false
    },
    onCurrentChange (page) {
      // console.log(page)
      this.page = page
      const pageSize = this.pageSize
      this.loadCluster(pageSize, page)
    },
    onSizeChange (pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize
      this.currentPage = 1
      this.loadCluster(pageSize, 1)
    },
    onRefresh () {
      // 刷新页面
      this.refreshLoading = true
      this.loadCluster(this.pageSize, this.currentPage)
    },
    onDeleteClusterConfig (configId) {
      this.$confirm('此操作将永久删除该集群配置, 是否继续?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
      }).then(() => {
        // 确定
        this.deleteClusterRequest(configId)
      }).catch(() => {
        this.$notify.info({ duration: 700, message: '已取消删除' })
      })
    }
  }
}
</script>

<style scoped lang="less">
  .filter-card {
    margin-bottom: 20px;
  }
  .refresh {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
