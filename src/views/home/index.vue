<template>
  <div class="home-container">{{ userInfo.username }}
    <el-row>
    <el-button @click="onbutto">默认按钮</el-button>
  </el-row>
  </div>
</template>

<script>
import { test, getUserInfo } from '@/api/index.js'

export default {
  // 指定 name 选项的另一个好处是便于调试。
  // 有名字的组件有更友好的警告信息。
  // 另外，当在有 vue-devtools，未命名组件将显示成 <AnonymousComponent>，这很没有语义。通过提供 name 选项，可以获得更有语义信息的组件树。
  // 结论：给一个组件起个名字是非常有意义的，尽量不要让组件的名字重复
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      userInfo: [{
        userid: '',
        username: ''
      }]
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  async mounted () {
    this.onbutto()
  },
  methods: {
    async onbutto () {
      const userid = this.$cookies.get('userid')
      // 调用 ajax 的封装
      const res = await getUserInfo(userid)
      // 可直接获取到返回的数据
      this.userInfo = res.response
    }
  }
}
</script>

<style scoped lang="less"></style>
