<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="交易记录" name="activity">
                <activity :user="user" />
              </el-tab-pane>
              <el-tab-pane label="钱包信息" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Account },
  data() {
    return {
      user: {},
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'uuid',
      'phone',
      'address',
      'introduction'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        uuid: this.uuid,
        phone: this.phone,
        address: this.address,
        introduction: this.introduction
      }
    }
  }
}
</script>
