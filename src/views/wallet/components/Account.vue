<template>
  <el-form ref="actionForm" :rules="rules">
    <el-form-item label="真实姓名" prop="name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="联系电话" prop="phone">
      <el-input v-model.trim="user.phone" />
    </el-form-item>
    <el-form-item label="提币地址">
      <el-input v-model.trim="user.address" />
    </el-form-item>
    <el-form-item label="个人简介">
      <el-input v-model.trim="user.introduction" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import { updateUser } from '@/api/user'

export default {
  rules: {
    username: [
      { required: true, message: '用户名必填', trigger: 'blur' },
      { min: 3, max: 15, message: '长度在3到15个字符', trigger: 'blur' }
    ],
    phone: [
      { required: true, message: '电话号码必填', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码', trigger: 'blur' }
    ]
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          uuid: '',
          name: '',
          phone: '',
          address: '',
          introduction: ''
        }
      }
    }
  },
  methods: {
    validateForm(formRef, callback) {
      this.$refs[formRef].validate(valid => {
        if (valid) {
          callback()
        }
      })
    },
    submit() {
      // this.validateForm('actionForm', () => {
      //   updateUser(this.newUser).then(response => {
      //     if (response.code === 20000) {
      //       this.$notify({
      //         title: '创建用户成功',
      //         message: '用户已创建',
      //         type: 'success',
      //         duration: 2000
      //       })
      //       this.getList()
      //     } else {
      //       throw new Error('无效响应格式', response.data)
      //     }
      //   }).catch(error => {
      //     // 添加详细错误处理
      //     console.error('创建用户错误详情:', {
      //       error,
      //       response: error.response,
      //       status: error.status,
      //       data: error.response?.data
      //     })

      //     this.$message({
      //       message: `创建失败: ${error.message}`,
      //       type: 'error'
      //     })
      //   })
      // })

      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
