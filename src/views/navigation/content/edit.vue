<template>
  <div>
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
        width="100">
      </el-table-column>
      <el-table-column
        label="地址"
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
        prop="content"
      />
      <el-table-column
        label="状态"
        prop="content"
      />
      <el-table-column
        label="更新时间"
        prop="content"
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
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="activate"></el-switch>
        </el-form-item>
        <el-form-item label="链接简介">
          <el-input type="textarea" v-model="dialogEditForm.describes"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">提交</el-button>
          <el-button size="mini" @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- /编辑的dialog弹框 -->
  </div>
</template>

<script>
import { getLink } from '@/api/navigation'

export default {
  // 指定 name 选项的另一个好处是便于调试。
  // 有名字的组件有更友好的警告信息。
  // 另外，当在有 vue-devtools，未命名组件将显示成 <AnonymousComponent>，这很没有语义。通过提供 name 选项，可以获得更有语义信息的组件树。
  // 结论：给一个组件起个名字是非常有意义的，尽量不要让组件的名字重复
  name: 'NavigationEdit',
  components: {},
  props: ['links'],
  data () {
    return {
      dialogVisible: false,
      activate: true,
      dialogEditForm: {},
      options: [{
        value: '1',
        label: '公共网址'
      }, {
        value: '2',
        label: '监控网址'
      }, {
        value: '3',
        label: '办公网址'
      }, {
        value: '4',
        label: '业务网址'
      }, {
        value: '5',
        label: '其他'
      }],
      value: null
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    loadNavigationLinks (id) {
      const params = {
        id: id
      }
      getLink(params).then(res => {
        this.dialogEditForm = res.data.response
        this.value = res.data.response.category
      })
    },
    onHandleEdit (id) {
      this.loadNavigationLinks(id)
      this.dialogVisible = true
    },
    onHandleDelete (index, row) {
      console.log(index, row)
    },
    handleClose (done) {
      this.dialogVisible = false
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped lang="less">
</style>
