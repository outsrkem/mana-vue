<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <!-- 卡片 -->
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>公共网址</span>
              <el-button size="mini" icon="el-icon-refresh" style="float: right; padding: 7px 15px;" :loading="refreshLoading" @click="onRefresh"/>
            </div>
            <div class="text item" v-for="(data,index) in links" :key="index">
              <div class="link-list-line" v-if="data.category==='1'">
                <div style="" class="link-list-line-name">
                  <el-link target="_blank" :href="data.content" >{{ data.name }}</el-link>
                </div>
                <el-link type="primary" target="_blank" :href="data.content">{{ data.content | UrlSnippet }}</el-link>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <!-- 卡片 -->
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>监控网址</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item" v-for="(data,index) in links" :key="index">
              <div class="link-list-line" v-if="data.category==='2'">
                <div style="" class="link-list-line-name">
                  <el-link target="_blank" :href="data.content" >{{ data.name }}</el-link>
                </div>
                <el-link type="primary" target="_blank" :href="data.content">{{ data.content | UrlSnippet }}</el-link>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <!-- 卡片 -->
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>办公网址</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item" v-for="(data,index) in links" :key="index">
              <div class="link-list-line" v-if="data.category==='3'">
                <div style="" class="link-list-line-name">
                  <el-link target="_blank" :href="data.content" >{{ data.name }}</el-link>
                </div>
                <el-link type="primary" target="_blank" :href="data.content">{{ data.content | UrlSnippet }}</el-link>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <!-- 卡片 -->
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>业务网址</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item" v-for="(data,index) in links" :key="index">
              <div class="link-list-line" v-if="data.category==='4'">
                <div style="" class="link-list-line-name">
                  <el-link target="_blank" :href="data.content" >{{ data.name }}</el-link>
                </div>
                <el-link type="primary" target="_blank" :href="data.content">{{ data.content | UrlSnippet }}</el-link>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <!-- 卡片 -->
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>其他</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item" v-for="(data,index) in links" :key="index">
              <div class="link-list-line" v-if="data.category==='5'">
                <div style="" class="link-list-line-name">
                  <el-link target="_blank" :href="data.content" >{{ data.name }}</el-link>
                </div>
                <el-link type="primary" target="_blank" :href="data.content">{{ data.content | UrlSnippet }}</el-link>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <!-- 卡片 -->
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item" v-for="(data,index) in links" :key="index">
              <div class="link-list-line" v-if="data.category==='6'">
                <div style="" class="link-list-line-name">
                  <el-link target="_blank" :href="data.content" >{{ data.name }}</el-link>
                </div>
                <el-link type="primary" target="_blank" :href="data.content">{{ data.content | UrlSnippet }}</el-link>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getLinksAll } from '@/api/navigation'
export default {
  // 指定 name 选项的另一个好处是便于调试。
  // 有名字的组件有更友好的警告信息。
  // 另外，当在有 vue-devtools，未命名组件将显示成 <AnonymousComponent>，这很没有语义。通过提供 name 选项，可以获得更有语义信息的组件树。
  // 结论：给一个组件起个名字是非常有意义的，尽量不要让组件的名字重复
  name: 'NavigationLinks',
  components: {},
  data () {
    return {
      links: [],
      refreshLoading: false
    }
  },
  computed: {},
  filters: {
    // url snippet
    UrlSnippet: function (value) {
      const len = 30
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
    onRefresh () {
      // 刷新页面
      this.refreshLoading = true
      this.loadNavigationLinksAll()
    }
  }
}
</script>

<style scoped lang="less">
  .link-list-line {
    display: flex;
    .link-list-line-name {
      width:200px;
    }
  }
</style>
