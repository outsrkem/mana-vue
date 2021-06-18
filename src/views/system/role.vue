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
          <el-button size="small" type="primary" @click="dialogVisibleRoleDelete = true">删除角色</el-button>
          <!-- 菜单弹出框开始 -->
            <el-dialog title="添加角色" :visible.sync="dialogVisibleRoleAdd" width="50%"
            :before-close="handleClose" :close-on-click-modal="false" append-to-body>
              <el-input type="text" placeholder="请输入角色名称" v-model="new_role_raw.role_name" maxlength="10" show-word-limit/>
                  <div style="margin: 20px 0;"></div>
              <el-input type="textarea" placeholder="请输入角色描述" v-model="new_role_raw.role_desc" maxlength="30" show-word-limit/>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleRoleAdd = false">取 消</el-button>
                <el-button type="primary" @click="onAddRole">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 删除的dialog弹框 -->
            <el-dialog title="请确认删除" :close-on-click-modal="false"
            :visible.sync="dialogVisibleRoleDelete" width="30%" append-to-body :before-close="handleCloseDelete">
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisibleRoleDelete = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="onSubmitCommitDelete(multipleSelectionRoleId)">确 定</el-button>
            </span>
            </el-dialog>
            <!-- /删除的dialog弹框 -->
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
      <el-table :data="roleList" style="width: 100%" v-loading="loading" @selection-change="handleSelectionChangeRole" class="filter-card">
        <el-table-column type="selection" :selectable="checkSelectable" width="50"></el-table-column>
        <el-table-column width="100" prop="role_id" label="角色ID"/>
        <el-table-column prop="role_name" label="角色名称"/>
        <el-table-column prop="role_type" label="类型"/>
        <el-table-column prop="role_state" label="状态"/>
        <el-table-column prop="role_desc" label="说明"/>
        <!-- 处理时间格式 -->
        <el-table-column label="创建时间">
          <template slot-scope="scope"> {{ scope.row.create_time|formatDate }}</template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template slot-scope="scope"> {{ scope.row.update_time|formatDate }}</template>
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
import { formatDate } from '@/utils/date.js'
import { getRoleList, addRole, deleteRole } from '@/api/index.js'
export default {
  name: 'SystemRole',
  components: {},
  data () {
    return {
      dialogVisibleRoleAdd: false,
      dialogVisibleRoleDelete: false,
      refreshLoading: false,
      loading: null,
      pageSize: 10,
      pageTotal: 0,
      currentPage: 1,
      roleList: [],
      new_role_raw: {
        role_name: null,
        role_desc: null
      },
      multipleSelection: []
    }
  },
  computed: { },
  filters: {
    // 时间格式过滤器
    formatDate (time) {
      return formatDate(new Date(time))
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.loadRoleList()
  },
  methods: {
    loadRoleList: async function () {
      await getRoleList().then(res => {
        this.roleList = res.response.items
        this.roleListOptions = res.response.items.map(items => ({
          value: items.role_name,
          label: items.role_name
        }))
        this.refreshLoading = false
      }).catch(_ => {
        this.refreshLoading = false
      })
    },
    // 判断为系统角色则不可勾选，role_type=1 为系统角色
    checkSelectable (row) {
      return row.role_type !== 1
    },
    // 发送添加角色请求
    addRoleRequest: async function (data) {
      await addRole(data).then(res => {
        this.onRefresh()
        this.$notify({ title: '', message: '添加成功', type: 'success' })
      }).catch(err => {
        this.$notify({ title: '添加失败', message: err, type: 'error' })
      })
      this.new_role_raw = {}
    },
    // 发送删除角色请求
    deleteRoleRequest: async function (roleIdList) {
      const data = { role_id: roleIdList }
      await deleteRole(data).then(_ => {
        this.onRefresh() /** 刷新页面 */
        this.$notify({ duration: 1000, title: '删除成功', type: 'success' })
      }).catch(err => {
        this.$notify({ title: '删除失败', message: err, type: 'error' })
      })
    },
    // 删除,需要处理请求成功后加载对话框
    handleCloseDelete () {
      this.dialogVisibleRoleDelete = false
    },
    ongetMenuAllAndAuthorizedRequest (id) {
      this.getMenuAllAndAuthorizedRequest(id)
    },
    // 提交删除事件
    onSubmitCommitDelete (id) {
      this.dialogVisibleRoleDelete = false
      this.deleteRoleRequest(id)
    },
    // 获取选中的角色 id, [1003,1002,1001]
    handleSelectionChangeRole (val) {
      // val 为选中的详细信息，https://www.pianshen.com/article/749990274/
      this.multipleSelectionRoleId = []
      for (let i = 0; i < val.length; i++) {
        if (this.multipleSelectionRoleId.indexOf(val[i].role_id) === -1) {
          this.multipleSelectionRoleId.push(val[i].role_id)
        }
      }
    },
    handleClose (_) {
      this.dialogVisibleRoleAdd = false
      this.dialogVisibleRoleList = false
      this.dialogVisibleRoleUpdate = false
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

    // 添加操作
    onAddRole () {
      this.dialogVisibleRoleAdd = false
      this.addRoleRequest(this.new_role_raw)
    },

    onRefresh () {
      // 刷新页面
      this.refreshLoading = true
      this.loadRoleList()
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
