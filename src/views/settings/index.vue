<template>
  <div class="settings-container">
    <div class="link-breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }" ><span @click="onToNewPath('/')">首页</span></el-breadcrumb-item>
        <el-breadcrumb-item>个人设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix my_refresh">
        <div>
          <el-row class="box-card-header">
            <el-button size="small" type="primary" @click="dialogVisible = true">编辑资料</el-button>
            <el-dialog title="编辑个人资料" :visible.sync="dialogVisible" width="40%" :before-close="handleClose" append-to-body>
              <el-form ref="form" :model="user" label-width="100px">
                <el-form-item label="用户名称："><el-input v-model="user.username"></el-input></el-form-item>
                <el-form-item label="用户昵称："><el-input v-model="user.nickname"></el-input></el-form-item>
                <el-form-item label="个人邮箱："><el-input v-model="user.email"></el-input></el-form-item>
                <el-form-item label="联系电话："><el-input v-model="user.mobile"></el-input></el-form-item>
                <el-form-item label="个人描述：">
                  <el-input type="textarea" placeholder="只支持json格式内容" v-model="user.describes" :autosize="{ minRows: 2, maxRows: 9}"/>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="onUpdateUserInfo">确 定</el-button>
              </span>
            </el-dialog>
          </el-row>
        </div>
        <!--刷新按钮-->
        <el-row>
          <el-button size="small" icon="el-icon-refresh" @click="onRefresh"></el-button>
        </el-row>
        <!--/刷新按钮-->
      </div>
      <!--内容开始-->
      <el-row>
        <el-col :span="10">
          <el-form ref="form" :model="user" label-width="100px">
            <el-form-item label="用户名称：">{{ user.username }}</el-form-item>
            <el-form-item label="用户昵称：">{{ user.nickname }}</el-form-item>
            <el-form-item label="个人邮箱：">{{ user.email }}</el-form-item>
            <el-form-item label="联系电话：">{{ user.mobile }}</el-form-item>
            <el-form-item label="个人描述：">{{ user.describes }}</el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <!--/内容开始-->
    </el-card>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/index.js'
import globalBus from '@/utils/global-bus'

export default {
  name: 'Settings',
  components: {},
  props: {},
  data () {
    return {
      user: {},
      dialogVisible: false
    }
  },
  computed: {},
  watch: {},
  created () {
    // 组件初始化好，请求获取用户资料
    this.loadUserInfo()
  },
  mounted () {},
  methods: {
    loadUserInfo: async function () {
      const userid = this.$cookies.get('userid')
      const res = await getUserInfo(userid)
      this.user = res.response
    },
    onRefresh () {
      // 刷新页面
      this.loadUserInfo()
    },
    onUpdateUserInfo () {
      // 提交接口数据
      // 代码
      // 修改顶栏的信息
      globalBus.$emit('update-user', this.user)
      this.dialogVisible = false
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

.el-form-item {
  margin-bottom: 5px;
}
</style>
