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
            @click="dialogVisible = true">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="onHandleDelete(scope.$index, scope.row)">删除
          </el-button>
          <el-dialog
            title="编辑"
            :visible.sync="dialogVisible"
            width="40%"
            append-to-body
            :before-close="handleClose">
            <el-form ref="form" :model="links" label-width="80px">
              <el-form-item label="名称">
                <el-input v-model="scope.row.name"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="分类">
                <el-select v-model="form.region" placeholder="请选择分类">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否启用">
                <el-switch v-model="form.delivery"></el-switch>
              </el-form-item>
              <el-form-item label="链接简介">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="mini" type="primary" @click="onSubmit">提交</el-button>
                <el-button size="mini" @click="handleClose">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

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
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    onHandleEdit (index, row) {
      console.log(index, row)
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
