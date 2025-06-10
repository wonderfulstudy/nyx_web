<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>{{ $t("walletView.about") }}</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <span class="user-uuid text-center">{{ user.uuid }}</span>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="form" /><span>{{ $t("walletView.introduction") }}</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">{{ user.introduction }}</div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="wallet" /><span>{{ $t("walletView.wallet") }}</span></div>
        <el-card class="wallet-balance" shadow="never">
          <div class="label">{{ $t("walletView.blance") }}</div>
          <div class="amount">{{ wallet.balance }}</div>
        </el-card>
        <el-card class="wallet-pow" shadow="never">
          <div class="balance">
            <div class="label">{{ $t("walletView.pow") }}</div>
            <div class="amount">{{ wallet.pow }}</div>
          </div>
        </el-card>
        <el-card class="wallet-pos" shadow="never">
          <div class="balance">
            <div class="label">{{ $t("walletView.pos") }}</div>
            <div class="amount">{{ wallet.pos }}</div>
          </div>
        </el-card>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getWallet } from '@/api/wallet'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          uuid: '',
          phone: '',
          address: '',
          introduction: ''
        }
      }
    }
  },
  data() {
    return {
      wallet: {
        balance: 0,
        pow: 0,
        pos: 0
      }
    }
  },
  created() {
    this.initWallet()
  },
  methods: {
    initWallet() {
      // 1. 验证 UUID
      if (!this.user || !this.user.uuid) {
        console.error('User UUID 未定义')
        return
      }

      // 2. 调用 API
      getWallet(this.user.uuid)
        .then(response => {
          this.wallet.balance = response.data.balance
          this.wallet.pow = response.data.pow
          this.wallet.pos = response.data.pos
        })
        .catch(error => {
          // 5. 错误处理
          console.error('获取钱包信息失败:', error)
          this.$message.error('获取钱包信息失败')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.wallet-balance, .wallet-pow, .wallet-pos {
  width: 100%;
  box-shadow: none !important;
  border: none !important;
}
.wallet-balance .label, .wallet-pow .label, .wallet-pos .label {
  font-size: 14px;
  color: #888;
  text-align: center;
  margin-bottom: 10px;
}
.wallet-balance .amount, .wallet-pow .amount, .wallet-pos .amount {
  font-size: 28px;
  font-weight: bold;
  color: #2d8cf0;
  text-align: center;
}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .user-uuid {
    font-size: 12px;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
