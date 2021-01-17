<template>
  <div class="home-container">{{ userInfo.username }}</div>
</template>

<script>
import { test } from '@/api/index.js'

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
        userid: '1610853130945803400',
        username: 'admin'
      }]
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  async mounted () {
    // 调用 ajax 的封装
    const res = await test()
    // 可直接获取到返回的数据
    console.log(res)
    this.userInfo = res.response
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
