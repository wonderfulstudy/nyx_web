<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.workerAddress" placeholder="机器地址" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.ownerAddress" placeholder="所有者地址" style="width: 400px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.status" placeholder="节点状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('usersView.search') }}
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" :label="$t('workersView.workerAddress')" min-width="200">
        <template slot-scope="{row}">
          <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" :title="row.workerAddress">{{ row.workerAddress }}</span>
          <!-- <span class="address-cell" :title="row.Address">{{ row.Address }}</span> -->
        </template>
      </el-table-column>

      <el-table-column min-width="200px" align="center" :label="$t('workersView.ownerAddress')">
        <template slot-scope="{row}">
          <span class="address-cell" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" :title="row.ownerAddress">{{ row.ownerAddress }}</span>
          <!-- <span>{{ row.Username }}</span> -->
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" :label="$t('workersView.workerStatus')">
        <template slot-scope="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" :label="$t('workersView.workerUptime')">
        <template slot-scope="{row}">
          <span>{{ row.uptime }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column min-width="300px" :label="$t('workersView.address')">
        <template slot-scope="{row}">
          <span class="address-cell" :title="row.Address">{{ row.Address }}</span>
        </template>
      </el-table-column> -->

      <el-table-column width="150px" :label="$t('usersView.edit')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleEdit(row)">
            {{ $t("usersView.actionEdit") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { fetchWorkerList } from '@/api/worker'
import Pagination from '@/components/Pagination/index.vue'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'UserTable',
  components: {
    Pagination
  },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const item = this.calendarTypeOptions.find(i => i.key === status)
      return item ? item.display_name : 'Unknown'
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        workerAddress: undefined,
        ownerAddress: undefined,
        status: undefined
      },
      calendarTypeOptions: [
        { key: '1', display_name: 'Registered' },
        { key: '2', display_name: 'Online' },
        { key: '3', display_name: 'Unresponsive' },
        { key: '4', display_name: 'RequestingOffline' },
        { key: '5', display_name: 'Offline' }
      ],
      currentRow: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      try {
        const response = await fetchWorkerList(this.listQuery)
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
    resetTemp() {
      this.temp = {
        workerAddress: undefined,
        ownerAddress: undefined,
        status: undefined
      }
    }
  }
}
</script>
