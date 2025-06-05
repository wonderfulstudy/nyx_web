<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import managerDsahboard from './manager'
import userDashboard from './user'

export default {
  name: 'Dashboard',
  components: { managerDsahboard, userDashboard },
  data() {
    return {
      currentRole: 'managerDsahboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (this.roles.includes('admin') || this.roles.includes('operator')) {
      this.currentRole = 'managerDsahboard'
    } else {
      this.currentRole = 'userDashboard'
    }
  }
}
</script>
