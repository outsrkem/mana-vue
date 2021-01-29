<template>
  <div class="settings-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix my_refresh">
        <!--面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!--/面包屑导航-->
        <!--刷新按钮-->
        <el-row>
          <el-button
            size="small"
            icon="el-icon-refresh"
            @click="onRefresh">
          </el-button>
        </el-row>
        <!--/刷新按钮-->
      </div>
      <!--内容开始-->
      <el-row>
        <el-col :span="10">
          <el-form ref="form" :model="user" label-width="100px">
            <el-form-item label="用户名称：">{{ user.username }}
            </el-form-item>
            <el-form-item label="用户昵称：">
              <el-input v-model="user.nickname"></el-input>
            </el-form-item>
            <el-form-item label="个人邮箱：">{{ user.email }}
            </el-form-item>
            <el-form-item label="联系电话：">{{ user.mobile }}
            </el-form-item>
            <el-form-item label="个人描述：">{{ user.describes }}
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onUpdataUserInfo"
              >保存修改
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <!--/内容开始-->
    </el-card>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import globalBus from '@/utils/global-bus'

export default {

  name: 'Settings',
  components: {},
  props: {},
  data () {
    return {
      user: {
        userid: '',
        username: '',
        email: '',
        mobile: '',
        describes: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    // 组件初始化好，请求获取用户资料
    this.loadUserInfo()
  },
  mounted () {
  },
  methods: {
    loadUserInfo () {
      // 获取用户信息
      getUserInfo().then(res => {
        this.user = res.data.response
      })
    },
    onRefresh () {
      // 刷新页面
      this.loadUserInfo()
    },
    onUpdataUserInfo () {
      // console.log('onUpdateUserInfo')
      globalBus.$emit('update-user', this.user)
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 20px;
}

.my_refresh {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
