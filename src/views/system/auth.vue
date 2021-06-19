<template>

  <div>
    <div class="link-breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }"><span @click="onToNewPath('/')">首页</span></el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>授权管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix refresh">
        <!--功能按钮-->
        <el-row class="box-card-header">
          <el-button size="small" type="primary" @click="setCheckedKeys">菜单权限</el-button>
          <el-button size="small" type="primary" @click="dialogVisibleRoleUpdate = true">接口权限</el-button>
          <el-button size="small" type="primary" @click="dialogVisibleUserAuth = true">用户权限</el-button>
          <!-- 菜单弹出框开始 -->
            <el-dialog title="查看权限" :visible.sync="dialogVisibleRoleList" width="50%"
              :before-close="handleClose" :close-on-click-modal="false" append-to-body>
                <el-select size="small" v-model="roleListOptionsId" placeholder="请选择角色">
                  <el-option
                    v-for="item in roleListOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="small" @click="ongetMenuAllAndAuthorizedRequest(roleListOptionsId)">查询</el-button>
              <el-tree :data="roleData" show-checkbox node-key="id" ref="tree"
              :default-expanded-keys="expanded"
              :default-checked-keys="authorized"
              :props="defaultProps">
              </el-tree>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleRoleList = false">取 消</el-button>
                <el-button type="primary" @click="onUpdateRolePermissionRequest">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog title="修改权限" :visible.sync="dialogVisibleRoleUpdate" width="50%"
            :before-close="handleClose" :close-on-click-modal="false" append-to-body>
              <template>添加角色</template>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleRoleUpdate = false">取 消</el-button>
                <el-button type="primary" >确 定</el-button>
              </span>
            </el-dialog>

          <el-dialog title="用户权限" :visible.sync="dialogVisibleUserAuth" width="50%"
                     :before-close="handleClose" :close-on-click-modal="false" append-to-body>
                <el-select size="small" v-model="userListOptionsId" placeholder="请选择角色">
                  <el-option
                    v-for="item in userListOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>&nbsp;
                <el-button type="small" @click="onGetUserListRequest(userListOptionsId)">查询</el-button>

            <el-transfer :titles="['未绑定角色', '已绑定角色']" v-model="multipleSelectionRoleIdAndUser" :data="roleListAlignData"></el-transfer>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleUserAuth = false">取 消</el-button>
                <el-button type="primary" @click="UpdateUserRoleRequest">确 定</el-button>
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
import { getRoleList, getMenuAllAndAuthorized, UpdateRolePermission, getUserList, GetUserRoleList, UpdateUserRole } from '@/api/index.js'
export default {
  name: 'SystemAuthConfig',
  components: {},
  data () {
    return {
      dialogVisibleRoleList: false,
      dialogVisibleRoleUpdate: false,
      dialogVisibleUserAuth: false,
      refreshLoading: false,
      multipleSelectionRoleId: [],
      authorized: [],
      expanded: [1, 6, 9, 10],
      loading: null,
      pageSize: 10,
      pageTotal: 0,
      currentPage: 1,
      roleList: [],
      roleData: [],
      roleListOptions: [],
      roleListOptionsId: null,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleBindingData: {},
      userListOptions: [],
      userListOptionsId: null,
      userAuthorized: [],
      roleListData: [],
      multipleSelectionRoleIdAndUser: [],
      roleListAlignData: []
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
    this.getUserListRequest()
  },
  methods: {
    loadRoleList: async function () {
      await getRoleList().then(res => {
        this.roleList = res.response.items
        this.roleListOptions = res.response.items.map(items => ({
          value: items.role_id,
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
    // 获取角色授权的所有菜单
    getMenuAllAndAuthorizedRequest: async function (rid) {
      const params = { rid: rid }
      await getMenuAllAndAuthorized(params).then(res => {
        this.authorized = res.response.authorized
        this.roleData = res.response.menu_list
      }).catch(_ => {})
    },
    // 获取用户绑定的角色
    GetUserRoleListRequest: async function (uid) {
      const params = { uid: uid }
      await GetUserRoleList(params).then(res => {
        this.multipleSelectionRoleIdAndUser = res.response.authorized
        this.roleListData = res.response.role_list.items

        this.roleListAlignData = res.response.role_list.items.map(items => ({
          key: items.role_id,
          label: items.role_name,
          disabled: false
        }))
      }).catch(_ => {})
    },
    ongetMenuAllAndAuthorizedRequest (id) {
      this.getMenuAllAndAuthorizedRequest(id)
    },
    onGetUserListRequest (id) {
      this.GetUserRoleListRequest(id)
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
    // handleSelectionChangeRolelist
    handleSelectionChangeRolelist (val) {
      // val 为选中的详细信息，https://www.pianshen.com/article/749990274/
      this.multipleSelectionRoleIdAndUser = []
      for (let i = 0; i < val.length; i++) {
        if (this.multipleSelectionRoleIdAndUser.indexOf(val[i].role_id) === -1) {
          this.multipleSelectionRoleIdAndUser.push(val[i].role_id)
        }
      }
    },
    // 发送获取用户列表请求
    getUserListRequest: async function () {
      await getUserList().then(res => {
        this.userListOptions = res.response.items.map(items => ({
          value: items.user_id,
          label: items.user_name
        }))
        //
      }).catch(_ => {
      })
    },
    // 发送更新角色权限的请求
    UpdateRolePermissionRequest: async function () {
      const data = this.roleBindingData
      await UpdateRolePermission(data).then(_ => {
        this.onRefresh() /** 刷新页面 */
        this.$notify({ duration: 1000, title: '删除成功', type: 'success' })
      }).catch(err => {
        this.$notify({ title: '删除失败', message: err, type: 'error' })
      })
    },

    // 发送更新用户绑定角色的请求
    UpdateUserRoleRequest: async function () {
      const roleBindingData = { user_id: this.userListOptionsId, role_id: this.multipleSelectionRoleIdAndUser }
      await UpdateUserRole(roleBindingData).then(_ => {
        this.onRefresh() /** 刷新页面 */
        this.roleListAlignData = []
        this.multipleSelectionRoleIdAndUser = []
        this.$notify({ duration: 1000, title: '更新成功', type: 'success' })
      }).catch(err => {
        this.$notify({ title: '更新失败', message: err, type: 'error' })
      })
    },
    handleClose (_) {
      this.dialogVisibleRoleAdd = false
      this.dialogVisibleRoleList = false
      this.dialogVisibleRoleUpdate = false
      this.dialogVisibleUserAuth = false
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    onUpdateRolePermissionRequest () {
      const permissionId = this.$refs.tree.getCheckedKeys()
      const array = []
      // 权限id转化为int类型
      for (let i = 0; i < permissionId.length; i++) {
        array.push(parseInt(permissionId[i]))
      }
      this.roleBindingData = { role_id: this.roleListOptionsId, permission_id: array }
      this.UpdateRolePermissionRequest()
      this.roleBindingData = {}
    },
    onSizeChange (pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize
      this.currentPage = 1
      this.loadCluster(pageSize, 1)
    },
    // 权限查看部分
    setCheckedKeys (id) {
      this.dialogVisibleRoleList = true
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
