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
      <el-form class="login-form" ref="form" :model="user">
        <el-form-item>
          <el-input
            v-model="user.username"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="user.password"
            placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            @click="onLogin"
          >登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import request from '@/utils/request'
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        username: 'admin', // 手机号
        password: '123456' // 验证码
      },
      checked: false // 是否同意协议的选中状态
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    onLogin () {
      // 获取表单数据（根据接口要求绑定数据）
      // const user = this.user

      // 表单验证

      // 验证通过，提交登录
      // 对于代码中的请求操作
      // 1、接口请求可能需要重用
      // 2、实际工作中，接口非常容易变动，改起来麻烦
      // 我们建议的做法是把所有的请求都封装成函数然后统一的组织到模块中进行管理
      // 这样做的好处就是：管理维护更方便，也好重用
      login(this.user).then(res => {
        // 登录成功
        const response = res.data.response
        // 保存信息到cookies，浏览器关闭后删除
        this.$cookies.set('authentication-token', response.token, '0')
        this.$cookies.set('userid', response.userid, '0')
        this.$cookies.set('nickname', response.nickname, '0')

        // 跳转到首页
        // this.$router.push('/')
        this.$router.push({
          // 这个 name 是路由的名字
          name: 'home'
        })
      }).catch(err => {
        console.log('登录失败', err)
        // 登录失败
      })
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
