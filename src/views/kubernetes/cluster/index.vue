<template>
  <div className="cluster-container">
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
        <el-row>
          <el-button size="small" type="primary" @click="dialogVisible = true">添加集群</el-button>
          <el-button type="primary" size="small">删除集群</el-button>
          <el-dialog
            title="添加集群鉴权文件"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            append-to-body="true"
            close-on-click-modal="false"
          >
            <el-input
              type="textarea"
              placeholder="只支持json格式内容"
              v-model="clusterConfig"
              :autosize="{ minRows: 2, maxRows: 9}"
            >
            </el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="AddCluster"
              >确 定</el-button>
            </span>
          </el-dialog>
        </el-row>
        <!--/功能按钮-->
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
      <!--中间内容部分-->
      <el-table
        :data="ClusterList"
        style="width: 100%">
        <el-table-column
          prop="server"
          label="集群ID"
        >
        </el-table-column>
        <el-table-column
          prop="clusterName"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户">
        </el-table-column>
        <el-table-column
          prop="server"
          label="集群地址">
        </el-table-column>
        <el-table-column
          prop="creationTime"
          label="添加时间">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
      </el-table>
      <!--/中间内容部分-->
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
  addCluster,
  getCluster
} from '@/api/kubernetes'

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
      clusterConfig: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadCluster('cluster')
  },
  mounted () {
  },
  methods: {
    loadCluster (type, pageSize = 10, page = 1) {
      // 获取取群列表
      getCluster({
        type: type,
        'page_size': pageSize,
        page
      }).then(res => {
        const ClusterList = res.data.response.items
        this.ClusterList = ClusterList
      })
    },
    AddCluster () {
      // console.log('添加集群')
      this.dialogVisible = false
      addCluster(this.clusterConfig).then(res => {
        if (res.status === 201 || res.status === 200) {
          this.$notify({
            title: '',
            message: '添加集群成功',
            type: 'success'
          })
        }
      }).catch(err => {
        // 失败
        this.$notify({
          title: '添加集群失败',
          message: err,
          type: 'error'
        })
      })
      this.clusterConfig = null
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    onCurrentChange (page) {
      // console.log(page)
      this.page = page
    },
    onSizeChange (pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize
      this.currentPage = 1
    },
    onRefresh () {
      // 刷新页面
      this.loadCluster('cluster', this.pageSize, this.page)
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
