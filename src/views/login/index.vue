<template>
  <div class="login-container">
    <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
    -->
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form class="login-form" ref="form" :model="user" :rules="formLoginRules">
        <el-form-item prop="username">
          <el-input v-model="user.username" prefix-icon='el-icon-user' clearable placeholder="请输入登录名"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password" prefix-icon='el-icon-lock' clearable show-password @keyup.enter.native="onLogin" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" :loading="loginLoading" @click="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/index.js'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      loginLoading: false, // 登录的 loading 状态
      user: {
        username: 'admin', // 登录名
        password: '123456' // 密码
      },
      checked: true, // 是否同意协议的选中状态
      // 表单验证规则配置
      formLoginRules: {
        username: [
          { required: true, type: 'string', message: '请输入用户名', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, type: 'string', message: '请输入密码', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async loginRequest () {
      return await login(this.user)
    },
    onLogin: async function () {
      /**
       * 获取表单数据（根据接口要求绑定数据）
       * const user = this.user
       * 表单验证
       * 验证通过，提交登录
       * 对于代码中的请求操作
       * 1、接口请求可能需要重用
       * 2、实际工作中，接口非常容易变动，改起来麻烦
       * 我们建议的做法是把所有的请求都封装成函数然后统一的组织到模块中进行管理
       * 这样做的好处就是：管理维护更方便，也好重用
       */
      this.loginLoading = true
      const res = await this.loginRequest().catch(err => {
        this.loginLoading = false
        console.log('登录失败', err)
      })
      this.loginLoading = false
      if (res.metaInfo.code === '200') {
        /**
         * 登录成功后保存信息到cookies，浏览器关闭后删除
         * 保存 token 到 localStorage，退出删除，涉及到的改动有：
         * 1、登录界面，退出界面  src/views/layout/index.vue ， src/views/login/index.vue
         * 2、 src/utils/request.js
         * 3、src/router/index.js
         */
        const response = res.response
        window.localStorage.setItem('authentication', JSON.stringify({ token: response.token }))
        this.$cookies.set('userid', response.userid, '0')
        this.$cookies.set('nickname', response.nickname, '0')
        this.$router.push({ /* 这个 name 是路由的名字 */ name: 'home' })
        this.loginLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;

  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;

    .login-head {
      display: flex;
      justify-content: center;

      .logo {
        width: 200px;
        height: 57px;
        background: url("./logo_index.png") no-repeat;
        background-size: contain;
      }
    }

    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
