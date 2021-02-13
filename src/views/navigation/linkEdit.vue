<template>
  <div>
    <div class="link-breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }" ><span @click="onToNewPath('/')">首页</span></el-breadcrumb-item>
        <el-breadcrumb-item>导航链接</el-breadcrumb-item>
        <el-breadcrumb-item>链接编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
        <div class="control-header">
        <div>
            <el-row>
            <el-button size="small" type="primary"  @click="onToNewPath('/link/create')">添加链接</el-button>
            </el-row>
        </div>
        <div>
            <el-row>
            <el-select v-model="categoryValue" @change="onCategoryChange()" size="small" style="margin-left: 20px;" filterable clearable placeholder="请选择类别">
                <el-option v-for="item in categoryOptions" :key="item.categoryValue" :label="item.label" :value="item.categoryValue"/>
            </el-select>
            <el-select v-model="activateValue" @change="onActivateChange()" size="small" style="margin-left: 20px;" filterable clearable placeholder="请选择禁启用">
                <el-option v-for="item in activateOptions" :key="item.activateValue" :label="item.label" :value="item.activateValue"/>
            </el-select>
            <!--刷新按钮-->
            <el-button size="small" icon="el-icon-refresh" style="margin-left: 20px;" :loading="refreshLoading" @click="onRefresh"/>
            <!--/刷新按钮-->
            </el-row>
        </div>
        </div>
        <el-table size="medium" :data="linksActivateFiltered" style="width: 100%" class="filter-card">
        <el-table-column label="序号" width="50">
            <template slot-scope="scope">
            {{ scope.$index + 1 }}
            </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="150"> </el-table-column>
        <el-table-column label="地址" width="450" prop="content" :formatter="formatterContent" >
            <template slot-scope="scope">
            <!--
            添加link跳转
            添加link跳转
            target="_blank" 会打开新的标签页
            el-tooltip 鼠标放上去的标签
            UrlSnippet 对较长的url截取
            -->
            <el-tooltip class="item" effect="light" :content="scope.row.content" placement="right">
                <el-link :href="scope.row.content" target="_blank" type="primary" >{{ scope.row.content | UrlSnippet}}</el-link>
            </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column label="分类"  prop="category">
            <template slot-scope="scope">
            <span :type="categoryOptions[scope.row.category - 1].categoryValue">{{ categoryOptions[scope.row.category -1].label }}</span>
            </template>
        </el-table-column>
        <el-table-column label="状态" prop="activate">
            <template slot-scope="scope">
            <el-tag size="mini" :type="activateOptions[scope.row.activate].type">{{ activateOptions[scope.row.activate].label }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateTime" />
        <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button size="mini" @click="onHandleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="onHandleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
        <div class="pagination-row">
          <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-size="10" :total="pageTotal"
            @size-change="onSizeChange" @current-change="onCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]">
          </el-pagination>
        </div>
        <!-- 编辑的dialog弹框 -->
        <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%" append-to-body :before-close="handleClose">
        <el-form ref="" :model="dialogEditForm" :rules="formRules" label-width="80px">
            <el-form-item label="名称" prop="name">
            <el-input v-model="dialogEditForm.name"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="content">
            <el-input v-model="dialogEditForm.content"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="category">
            <el-select v-model="dialogEditForm.category" placeholder="请选择">
                <el-option v-for="item in categoryOptions" :key="item.categoryValue" :label="item.label" :value="item.categoryValue"/>
            </el-select>
            </el-form-item>
            <el-form-item label="是否启用" prop="activate">
            <el-switch v-model="dialogEditForm.activate" active-value="1" inactive-value="0"/>
            </el-form-item>
            <el-form-item label="链接简介" prop="describes">
            <el-input v-model="dialogEditForm.describes" type="textarea" placeholder="请输入链接说明" :maxlength="500"
                show-word-limit :autosize="{minRows: 2, maxRows: 3}" :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button size="mini" type="primary" @click="onSubmitCommitChanges(dialogEditForm.id, dialogEditForm)">提交</el-button>
            <el-button size="mini" @click="handleClose">取消</el-button>
            </el-form-item>
        </el-form>
        </el-dialog>
        <!-- /编辑的dialog弹框 -->
        <!-- 删除的dialog弹框 -->
        <el-dialog title="提示，即将删除如下链接" :visible.sync="dialogVisibleDelete" width="30%" append-to-body :before-close="handleCloseDelete">
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
    </el-card>
  </div>
</template>

<script>
import { getLinksAll, getLink, editLink, deleteLink } from '@/api/navigation'
import { getLinkNew } from '@/api/index.js'
import globalBus from '@/utils/global-bus'
export default {
  /**
   * 指定 name 选项的另一个好处是便于调试。
   * 有名字的组件有更友好的警告信息。
   * 另外，当在有 vue-devtools，未命名组件将显示成 <AnonymousComponent>，这很没有语义。通过提供 name 选项，可以获得更有语义信息的组件树。
   * 结论：给一个组件起个名字是非常有意义的，尽量不要让组件的名字重复
   */
  name: 'NavigationEdit',
  components: {},
  data () {
    return {
      dialogVisible: false,
      dialogVisibleDelete: false,
      refreshLoading: false,
      dialogEditForm: {},
      pageTotal: 0,
      currentPage: 1,
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
      // 编辑链接的表单验证
      formRules: {
        name: [
          { required: true, message: '请输入链接名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入链接', trigger: 'blur' },
          { pattern: /^https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/, message: 'URL 格式有误', trigger: 'change' }
        ],
        category: [
          { required: true, message: '请选择类别', trigger: 'blur' }
        ],
        activate: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        describes: [
          { required: true, message: '请输入链接描述', trigger: 'blur' },
          { min: 2, max: 500, message: '长度在 2 到 500 个字符', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    // 按类别过滤
    linksCategoryFiltered: function () {
      return this.links.filter((links) => {
        return links.category.match(this.categoryValue)
      })
    },
    // 按激活状态过滤，使用按类别过滤后的数据在过滤，在model 中绑定 linksActivateFiltered 即可。
    linksActivateFiltered: function () {
      return this.linksCategoryFiltered.filter((linksCategoryFiltered) => {
        return linksCategoryFiltered.activate.match(this.activateValue)
      })
    }
  },
  filters: {
    // url snippet
    UrlSnippet: function (value) {
      const len = 45
      if (value.length < len) {
        return value
      }
      return value.slice(0, len) + '...'
    }
  },
  watch: {},
  created () {
  },
  mounted () {
    this.loadNavigationLinksAll()
  },
  methods: {
    // 表格参数格式化,暂未使用
    formatterContent: function (row, column) {
      return row.content.slice(0, 40) + '...'
    },
    // 状态参数格式化,暂未使用
    formatterActivate: function (row, column) {
      return row.sex === 1 ? '启用' : row.sex === 0 ? '禁用' : ''
    },
    loadNavigationLinksAll (pageSize = 10, page = 1) {
      var activate, category
      activate = (this.activateValue === '') ? 'all' : this.activateValue
      category = (this.categoryValue === '') ? null : this.categoryValue
      const params = {
        page_size: pageSize,
        page: page,
        category: category,
        activate: activate
      }
      getLinksAll(params).then(res => {
        this.links = res.data.response.items
        this.pageTotal = parseInt(res.data.response.pageInfo.total)
        this.refreshLoading = false
      }).catch(_ => {
        // 刷新失败，也重置刷新按钮
        this.refreshLoading = false
      })
    },
    async loadNavigationLinks (id) {
      const paths = { id: id }
      const res = await getLinkNew(paths)
      this.dialogEditForm = res.response
      if (res.metaInfo.code !== '200') {
        return false
      }
      return true
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
    onHandleEdit: async function (id) {
      if (await this.loadNavigationLinks(id)) {
        this.dialogVisible = true
      }
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
      this.loadNavigationLinksAll(this.pageSize, this.page)
    },
    onToNewPath (path) {
      this.$router.push(path)
      // 通过消息更新激活状态
      globalBus.$emit('update-active-path', path)
      window.sessionStorage.setItem('active-path', path)
    },
    onCurrentChange (page) {
      this.page = page
      this.loadNavigationLinksAll(this.pageSize, page)
    },
    onSizeChange (pageSize) {
      this.pageSize = pageSize
      this.currentPage = 1
      this.loadNavigationLinksAll(pageSize, 1)
    },
    onActivateChange () {
      //
      this.loadNavigationLinksAll(this.pageSize, 1)
    },
    onCategoryChange () {
      //
      this.loadNavigationLinksAll(this.pageSize, 1)
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
.pagination-row {
  padding-top: 20px;
}
</style>
