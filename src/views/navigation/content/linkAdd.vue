<template>
  <div>
    <el-row :gutter="15">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-col :span="8">
          <el-form-item label="名称" prop="field101">
            <el-input v-model="formData.field101" placeholder="请输入单行文本" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
          <el-form-item label="地址" prop="field101">
            <el-input v-model="formData.field101" placeholder="请输入单行文本" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        <el-form-item label="分类" prop="field112">
          <el-select v-model="dialogEditForm.category" placeholder="请选择" :style="{width: '100%'}">
            <el-option
              v-for="item in categoryOptions"
              :key="item.categoryValue"
              :label="item.label"
              :value="item.categoryValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop="field113">
          <el-switch
            v-model="dialogEditForm.activate"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
          <el-form-item label="链接简介" prop="field110">
            <el-input v-model="formData.field110" type="textarea" placeholder="请输入链接简介" :maxlength="500"
              show-word-limit :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item size="mini">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data () {
    return {
      formData: {
        field101: undefined
      },
      rules: {
        field101: [{
          required: true,
          message: '请输入单行文本',
          trigger: 'blur'
        }],
        field112: [{
          required: true,
          message: '请选择下拉选择',
          trigger: 'change'
        }],
        field110: [{
          required: true,
          message: '请输入多行文本',
          trigger: 'blur'
        }],
        field113: [{
          required: true,
          message: '请选择下拉选择',
          trigger: 'change'
        }]
      },
      dialogEditForm: {},
      categoryOptions: [{
        categoryValue: '1',
        label: '公共网址'
      }, {
        categoryValue: '2',
        label: '监控网址'
      }, {
        categoryValue: '3',
        label: '办公网址'
      }, {
        categoryValue: '4',
        label: '业务网址'
      }, {
        categoryValue: '5',
        label: '其他'
      }],
      field110: [{
        required: true,
        message: '请输入多行文本',
        trigger: 'blur'
      }]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    submitForm () {
      this.$refs.elForm.validate(valid => {
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm () {
      this.$refs.elForm.resetFields()
    },
  }
}

</script>
<style>
</style>