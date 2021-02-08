<template>

  <div>
    <div class="control-header">
      <div>
        <el-row>
          <el-button size="small" type="primary"  @click="onAddNavigationLink">操作</el-button>
        </el-row>
      </div>
      <div>
        <el-row>
          <el-select
          v-model="categoryValue"
          size="small"
          style="margin-left: 20px;"
          filterable clearable
          placeholder="请选择">
            <el-option
              v-for="item in categoryOptions"
              :key="item.categoryValue"
              :label="item.label"
              :value="item.categoryValue">
            </el-option>
          </el-select>
          <el-select
          v-model="activateValue"
          size="small"
          style="margin-left: 20px;"
          filterable clearable
          placeholder="请选择">
            <el-option
              v-for="item in activateOptions"
              :key="item.activateValue"
              :label="item.label"
              :value="item.activateValue">
            </el-option>
          </el-select>
          <!--刷新按钮-->
          <el-button
            size="small"
            icon="el-icon-refresh"
            style="margin-left: 20px;"
            :loading="refreshLoading"
            @click="onRefresh">
          </el-button>
          <!--/刷新按钮-->
        </el-row>
      </div>
    </div>
    <el-table
      size="medium"
      :data="links"
      style="width: 100%"
      class="filter-card">
      <el-table-column
        label="序号"
        width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="150">
      </el-table-column>
      <el-table-column
        label="地址"
        width="450"
        prop="content"
      >
        <!--
          添加link跳转
          添加link跳转
          target="_blank" 会打开新的标签页
        -->
        <template slot-scope="scope">
          <el-link
            :href="scope.row.content"
            target="_blank"
            type="primary"
          >{{ scope.row.content }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        prop="category"
      >
      <template slot-scope="scope">
        <span :type="categoryOptions[scope.row.category - 1].categoryValue">{{ categoryOptions[scope.row.category -1].label }}</span>
        <!-- <span v-if="scope.row.category === '1'">公共网址</span> -->
      </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="activate"
      >
        <template slot-scope="scope">
          <!-- <span :type="activateOptions[scope.row.activate].type">{{ activateOptions[scope.row.activate].label }}</span> -->
          <el-tag size="mini" :type="activateOptions[scope.row.activate].type">{{ activateOptions[scope.row.activate].label }}</el-tag>
          <!-- <span v-if="scope.row.category === '1'">公共网址</span> -->
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        prop="updateTime"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="onHandleEdit(scope.row.id)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="onHandleDelete(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑的dialog弹框 -->
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="40%"
      append-to-body
      :before-close="handleClose">
      <el-form ref="" :model="dialogEditForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="dialogEditForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="dialogEditForm.content"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="dialogEditForm.category" placeholder="请选择">
            <el-option
              v-for="item in categoryOptions"
              :key="item.categoryValue"
              :label="item.label"
              :value="item.categoryValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="dialogEditForm.activate"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item label="链接简介">
          <el-input type="textarea" v-model="dialogEditForm.describes"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmitCommitChanges(dialogEditForm.id, dialogEditForm)">提交
          </el-button>
          <el-button size="mini" @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- /编辑的dialog弹框 -->
    <!-- 删除的dialog弹框 -->
    <el-dialog
      title="提示，即将删除如下链接"
      :visible.sync="dialogVisibleDelete"
      width="30%"
      append-to-body
      :before-close="handleCloseDelete">
      <div :v-model="dialogVisibleDelete" style="">
        <p>名称: {{ dialogEditForm.name }}</p>
        <p>链接: {{ dialogEditForm.content }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisibleDelete = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="onSubmitCommitDelete(dialogEditForm.id)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- /删除的dialog弹框 -->
  </div>
</template>

<script>
import { getLinksAll, getLink, editLink, deleteLink } from '@/api/navigation'

export default {
  // 指定 name 选项的另一个好处是便于调试。
  // 有名字的组件有更友好的警告信息。
  // 另外，当在有 vue-devtools，未命名组件将显示成 <AnonymousComponent>，这很没有语义。通过提供 name 选项，可以获得更有语义信息的组件树。
  // 结论：给一个组件起个名字是非常有意义的，尽量不要让组件的名字重复
  name: 'NavigationEdit',
  components: {},
  data () {
    return {
      dialogVisible: false,
      dialogVisibleDelete: false,
      refreshLoading: false,
      dialogEditForm: {},
      links: [],
      categoryOptions: [
        { categoryValue: '1', label: '公共网址' },
        { categoryValue: '2', label: '监控网址' },
        { categoryValue: '3', label: '办公网址' },
        { categoryValue: '4', label: '业务网址' },
        { categoryValue: '5', label: '其他' }
      ],
      categoryValue: '',
      activateOptions: [
        { activateValue: '0', label: '禁用', type: 'danger' },
        { activateValue: '1', label: '启用', type: 'success' }
      ],
      activateValue: '',
      formData: {
        category: 1
      }
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
    this.loadNavigationLinksAll()
  },
  methods: {
    loadNavigationLinksAll () {
      // eslint-disable-next-line no-undef
      getLinksAll().then(res => {
        this.links = res.data.response.items
        this.refreshLoading = false
      }).catch(_ => {
        // 刷新失败，也重置刷新按钮
        this.refreshLoading = false
      })
    },
    loadNavigationLinks (id) {
      const paths = {
        id: id
      }
      getLink(paths).then(res => {
        this.dialogEditForm = res.data.response
        this.value = res.data.response.category
      })
    },
    // 提交修改
    loadCommitChanges (id, formData) {
      const paths = {
        id: id
      }
      const data = {
        name: formData.name,
        url: formData.content,
        activate: formData.activate,
        category: formData.category,
        describes: formData.describes
      }
      editLink(paths, data).then(res => {
        // eslint-disable-next-line no-unused-vars
        // 请求成功
        this.$notify({
          duration: 1000,
          title: '修改链接成功',
          type: 'success'
        })
        this.loadNavigationLinksAll()
      }).catch(err => {
        // 请求失败
        this.$notify({
          title: '修改失败',
          message: err,
          type: 'error'
        })
      })
    },
    // 提交删除
    loadDeleteLink (id) {
      const paths = {
        id: id
      }
      deleteLink(paths).then(res => {
        this.$notify({
          duration: 1000,
          title: '删除成功',
          type: 'success'
        })
        this.loadNavigationLinksAll()
      }).catch(err => {
        this.$notify({
          title: '删除失败',
          message: err,
          type: 'error'
        })
      })
    },
    onHandleEdit (id) {
      this.loadNavigationLinks(id)
      this.dialogVisible = true
    },
    // 删除,需要处理请求成功后加载对话框
    onHandleDelete (id) {
      this.loadNavigationLinks(id)
      this.dialogVisibleDelete = true
    },
    handleCloseDelete (done) {
      this.dialogVisibleDelete = false
    },
    onSubmitCommitDelete (id) {
      this.dialogVisibleDelete = false
      this.loadDeleteLink(id)
    },
    handleClose (done) {
      this.dialogVisible = false
    },
    // 提交修改
    onSubmitCommitChanges (id, formData) {
      this.loadCommitChanges(id, formData)
      // 关闭对话框
      this.dialogVisible = false
    },
    onRefresh () {
      // 刷新页面
      this.refreshLoading = true
      this.loadNavigationLinksAll()
    },
    onAddNavigationLink () {
      this.$notify({
        duration: 1000,
        title: '暂无事件',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped lang="less">
.control-header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  background-color: #ffffff;
}
</style>
