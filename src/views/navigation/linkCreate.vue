<template>
  <div>
    <el-card class="box-card">
        <div>
            <el-row :gutter="15">
            <el-form ref="elForm" :model="formLinkData" :rules="formRules" size="medium" label-width="100px">
                <el-col :span="8">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="formLinkData.name" placeholder="请输入链接名称" clearable :style="{width: '100%'}">
                    </el-input>
                </el-form-item>
                <el-form-item label="地址" prop="url">
                    <el-input v-model="formLinkData.url" placeholder="请输入链接" clearable :style="{width: '100%'}">
                    </el-input>
                </el-form-item>
                <el-form-item label="分类" prop="category">
                <el-select v-model="formLinkData.category" placeholder="请选择" :style="{width: '100%'}">
                    <el-option  v-for="item in categoryOptions" :key="item.categoryValue" :label="item.label" :value="item.categoryValue"/>
                </el-select>
                </el-form-item>
                <el-form-item label="是否启用" prop="activate">
                <el-switch v-model="formLinkData.activate" active-value="1" inactive-value="0"/>
                </el-form-item>
                <el-form-item label="链接简介" prop="describes">
                    <el-input v-model="formLinkData.describes" type="textarea" placeholder="请输入链接说明" :maxlength="500"
                    show-word-limit :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="24">
                <el-form-item size="mini">
                    <el-button type="primary" @click="onSubmitFormAddLink">提交</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
                </el-col>
            </el-form>
            </el-row>
        </div>
    </el-card>
  </div>
</template>
<script>
import { addLink } from '@/api/navigation'

export default {
  name: 'NavigationAdd',
  components: {},
  props: [],
  data () {
    return {
      formLinkData: {},
      // 表单验证
      formRules: {
        name: [
          { required: true, message: '请输入链接名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'change' }
        ],
        url: [
          { required: true, message: '请输入链接', trigger: 'blur' },
          { pattern: /^https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/, message: 'URL 格式有误', trigger: 'change' }
        ],
        category: [
          { required: true, message: '请选择类别', trigger: 'blur' }
        ],
        activate: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        describes: [
          { required: true, message: '请输入链接描述', trigger: 'blur' },
          { min: 2, max: 500, message: '长度在 2 到 500 个字符', trigger: 'change' }
        ]
      },
      // 链接类别
      categoryOptions: [
        { categoryValue: '1', label: '公共网址' },
        { categoryValue: '2', label: '监控网址' },
        { categoryValue: '3', label: '办公网址' },
        { categoryValue: '4', label: '业务网址' },
        { categoryValue: '5', label: '其他' }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 提交修改
    loadCommitAddlink (fromData) {
      const data = {
        name: fromData.name,
        url: fromData.url,
        activate: fromData.activate,
        category: fromData.category,
        describes: fromData.describes
      }
      addLink(data).then(res => {
        // eslint-disable-next-line no-unused-vars
        // 请求成功
        this.$notify({
          duration: 1000,
          title: '添加链接成功',
          type: 'success'
        })
        this.resetForm()
      }).catch(err => {
        // 请求失败
        this.$notify({
          title: '添加失败',
          message: err,
          type: 'error'
        })
      })
    },
    onSubmitFormAddLink () {
      this.$refs.elForm.validate(valid => {
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        // TODO 提交表单
        this.loadCommitAddlink(this.formLinkData)
      })
    },
    resetForm () {
      this.$refs.elForm.resetFields()
    }
  }
}
</script>
<style scoped lang="less"></style>
