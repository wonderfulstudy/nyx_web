<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="用户名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.address" placeholder="提币地址" style="width: 400px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('usersView.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('usersView.add') }}
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" :label="$t('usersView.uuid')" width="300">
        <template slot-scope="{row}">
          <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" :title="row.Uuid">{{ row.Uuid }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" :label="$t('usersView.username')">
        <template slot-scope="{row}">
          <span>{{ row.Username }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" :label="$t('usersView.name')">
        <template slot-scope="{row}">
          <span>{{ row.Name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" :label="$t('usersView.phone')">
        <template slot-scope="{row}">
          <span>{{ row.Phone }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" :label="$t('usersView.address')">
        <template slot-scope="{row}">
          <span class="address-cell" :title="row.Address">{{ row.Address }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" :label="$t('usersView.edit')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleEdit(row)">
            {{ $t("usersView.actionEdit") }}
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">
            {{ $t("usersView.actionDelete") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="$t('usersView.createTitle')" :visible.sync="createDialogVisible">
      <el-form ref="createForm" :model="newUser" :rules="rules">
        <el-form-item :label="$t('usersView.createUserName')" prop="username">
          <el-input v-model="newUser.username" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('usersView.createPhone')" prop="phone">
          <el-input v-model="newUser.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('usersView.createName')" prop="name">
          <el-input v-model="newUser.name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('usersView.createAddress')" prop="address">
          <el-input v-model="newUser.address" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">{{ $t('usersView.createCancel') }}</el-button>
        <el-button type="primary" @click="createChange">{{ $t('usersView.createSubmit') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('usersView.editTitle')" :visible.sync="editDialogVisible">
      <el-form ref="editForm" :model="currentRow" :rules="rules">
        <el-form-item :label="$t('usersView.editUserName')" prop="username">
          <el-input v-model="currentRow.Username" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('usersView.editName')" prop="name">
          <el-input v-model="currentRow.Name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('usersView.editPhone')" prop="phone">
          <el-input v-model="currentRow.Phone" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('usersView.editAddress')" prop="address">
          <el-input v-model="currentRow.Address" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">{{ $t('usersView.editCancel') }}</el-button>
        <el-button type="primary" @click="editChanges">{{ $t('usersView.editSubmit') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchUserList, createUser, deleteUser, updateUser } from '@/api/user'
import Pagination from '@/components/Pagination/index.vue'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'UserTable',
  components: {
    Pagination
  },
  directives: { waves },
  data() {
    return {
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
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        address: undefined
      },
      editDialogVisible: false,
      createDialogVisible: false,
      currentRow: {},
      newUser: {
        username: '',
        name: '',
        phone: '',
        address: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      try {
        const response = await fetchUserList(this.listQuery)
        if (response.data && response.data.items && response.data.total !== undefined) {
          this.list = response.data.items
          this.total = response.data.total
        } else {
          console.error('Invalid data structure from API')
          this.list = []
          this.total = 0
        }
      } catch (error) {
        console.error('Error fetching user list:', error)
        this.list = []
        this.total = 0
      } finally {
        this.listLoading = false
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleEdit(row) {
      this.currentRow = { ...row } // 深拷贝避免直接修改表格数据
      this.editDialogVisible = true
    },
    handleDelete(row, index) {
      this.currentRow = { ...row } // 深拷贝避免直接修改表格数据
      deleteUser(this.currentRow).then(response => {
        this.$notify({
          title: '删除成功',
          message: '用户已删除',
          type: 'success',
          duration: 2000
        })
        this.getList()
      }).catch(error => {
        this.$notify({
          title: '删除失败',
          message: '用户未删除',
          type: 'success',
          duration: 2000
        })
        throw new Error('删除报错日志', error)
      })
    },
    resetTemp() {
      this.temp = {
        name: undefined,
        address: undefined
      }
    },
    resetUserTemp() {
      this.newUser = {
        username: '',
        name: '',
        phone: '',
        address: ''
      }
    },
    // 表单验证统一方法
    validateForm(formRef, callback) {
      this.$refs[formRef].validate(valid => {
        if (valid) {
          callback()
        }
      })
    },
    handleCreate() {
      this.resetUserTemp()
      this.createDialogVisible = true
    },
    createChange() {
      this.validateForm('createForm', () => {
        // 创建表单验证通过后的逻辑
        this.createDialogVisible = false
        // 这里可以添加创建用户的API调用
        createUser(this.newUser).then(response => {
          if (response.code === 20000) {
            this.$notify({
              title: '创建用户成功',
              message: '用户已创建',
              type: 'success',
              duration: 2000
            })
          } else {
            throw new Error('无效响应格式', response.data)
          }
        }).catch(error => {
          // 添加详细错误处理
          console.error('创建用户错误详情:', {
            error,
            response: error.response,
            status: error.status,
            data: error.response?.data
          })

          this.$message({
            message: `创建失败: ${error.message}`,
            type: 'error'
          })
        })
      })
    },
    editChanges() {
      this.validateForm('editForm', () => {
        // 编辑表单验证通过后的逻辑
        this.editDialogVisible = false
        // 这里可以添加保存编辑的API调用
        updateUser(this.currentRow).then(response => {
          if (response.code === 20000) {
            this.$notify({
              title: '修改用户成功',
              message: '用户已修改',
              type: 'success',
              duration: 2000
            })
          } else {
            throw new Error('无效响应格式', response.data)
          }
        }).catch(error => {
          // 添加详细错误处理
          console.error('创建用户错误详情:', {
            error,
            response: error.response,
            status: error.status,
            data: error.response?.data
          })

          this.$message({
            message: `创建失败: ${error.message}`,
            type: 'error'
          })
        })
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    }
  }
}
</script>
