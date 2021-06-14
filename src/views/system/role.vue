<template>

  <div >
    <div class="link-breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }"><span @click="onToNewPath('/')">首页</span></el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix refresh">
        <!--功能按钮-->
        <el-row class="box-card-header">
          <el-button size="small" type="primary" @click="dialogVisibleRoleAdd = true">添加角色</el-button>
          <el-button size="small" type="primary" @click="dialogVisibleRoleList = true">查看权限</el-button>
          <el-button size="small" type="primary" @click="dialogVisibleRoleUpdate = true">修改权限</el-button>
          <el-button size="small" type="primary" @click="dialogVisibleRoleDelete = true">删除角色</el-button>
          <!-- 菜单弹出框开始 -->
            <el-dialog title="添加角色" :visible.sync="dialogVisibleRoleAdd" width="50%"
            :before-close="handleClose" :close-on-click-modal="false" append-to-body>
              <template>添加角色</template>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleRoleAdd = false">取 消</el-button>
                <el-button type="primary" @click="onAddCluster">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog title="查看权限" :visible.sync="dialogVisibleRoleList" width="50%"
            :before-close="handleClose" :close-on-click-modal="false" append-to-body>
              <el-tree :data="roleData" show-checkbox node-key="id"
              :default-expanded-keys="[1, 2]"
              :default-checked-keys="[5, 8]"
              :props="defaultProps">
              </el-tree>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleRoleList = false">取 消</el-button>
                <el-button type="primary" @click="onAddCluster">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog title="修改权限" :visible.sync="dialogVisibleRoleUpdate" width="50%"
            :before-close="handleClose" :close-on-click-modal="false" append-to-body>
              <template>添加角色</template>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleRoleUpdate = false">取 消</el-button>
                <el-button type="primary" @click="onAddCluster">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog title="删除角色" :visible.sync="dialogVisibleRoleDelete" width="50%"
            :before-close="handleClose" :close-on-click-modal="false" append-to-body>
              <template>添加角色</template>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleRoleDelete = false">取 消</el-button>
                <el-button type="primary" @click="onAddCluster">确 定</el-button>
              </span>
            </el-dialog>
          <!-- 菜单弹出框结束 -->
        </el-row>
        <!--/功能按钮-->
        <!--刷新按钮-->
        <el-row>
          <el-button size="small" icon="el-icon-refresh" @click="onRefresh" :loading="refreshLoading"/>
        </el-row>
        <!--/刷新按钮-->
      </div>
      <!--中间内容部分-->
      <el-table :data="roleList" style="width: 100%" v-loading="loading" @selection-change="handleSelectionChange" class="filter-card">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="rid" label="角色ID"/>
        <el-table-column prop="r_name" label="角色名称"/>
        <el-table-column prop="r_state" label="状态"/>
        <el-table-column prop="r_desc" label="说明"/>
        <el-table-column prop="create_time" label="创建时间"/>
        <el-table-column prop="update_time" label="更新时间">
        </el-table-column>
      </el-table>
      <!--/中间内容部分结束-->
      <!--分页开始-->
      <el-pagination @current-change="onCurrentChange" @size-change="onSizeChange" :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize" background :total="pageTotal" :current-page.sync="currentPage"
        layout="total, sizes, prev, pager, next" :pager-count="11"/>
      <!--分页结束-->
    </el-card>
  </div>
</template>

<script>
import globalBus from '@/utils/global-bus'
export default {
  name: 'SystemRole',
  components: {},
  data () {
    return {
      dialogVisibleRoleAdd: false,
      dialogVisibleRoleList: false,
      dialogVisibleRoleUpdate: false,
      dialogVisibleRoleDelete: false,
      refreshLoading: false,
      loading: null,
      pageSize: 10,
      pageTotal: 0,
      currentPage: 1,
      roleList: [
        { rid: '1001', r_name: 'guest', r_state: '1', r_desc: '只读', create_time: '1623540133918', update_time: '1623540133000' },
        { rid: '1001', r_name: 'guest', r_state: '1', r_desc: '只读', create_time: '1623540133918', update_time: '1623540133000' }
      ],
      roleData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{ id: 9, label: '三级 1-1-1' }, { id: 10, label: '三级 1-1-2' }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      multipleSelection: []
    }
  },
  computed: { },
  filters: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleClose (_) {
      this.dialogVisibleRoleAdd = false
      this.dialogVisibleRoleList = false
      this.dialogVisibleRoleUpdate = false
      this.dialogVisibleRoleDelete = false
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    onSizeChange (pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize
      this.currentPage = 1
      this.loadCluster(pageSize, 1)
    },
    onAddCluster () {
      console.log('添加集群')
    },
    onRefresh () {
      // 刷新页面
      this.refreshLoading = true
    },
    onCurrentChange (page) {
      console.log(page)
    },
    onToNewPath (path) {
      this.$router.push(path)
      // 通过消息更新激活状态
      globalBus.$emit('update-active-path', path)
      window.sessionStorage.setItem('active-path', path)
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
