<template>
  <div>
    <el-table
      size="medium"
      :data="links"
      style="width: 100%"
      class="filter-card">
      <el-table-column
        label="序号"
        width="180">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
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
    </el-table>
  </div>
</template>

<script>

export default {
  // 指定 name 选项的另一个好处是便于调试。
  // 有名字的组件有更友好的警告信息。
  // 另外，当在有 vue-devtools，未命名组件将显示成 <AnonymousComponent>，这很没有语义。通过提供 name 选项，可以获得更有语义信息的组件树。
  // 结论：给一个组件起个名字是非常有意义的，尽量不要让组件的名字重复
  name: 'NavigationLinks',
  components: {},
  props: ['links'],
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {}
}
</script>

<style scoped lang="less">
</style>
