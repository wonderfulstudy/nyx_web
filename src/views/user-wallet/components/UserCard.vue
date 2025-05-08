<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>账户详情</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>你好</div>
          {{ user.role }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>{{ $t('userWallet.userInfo') }}</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.introduction }}
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <svg-icon icon-class="skill" /><span>账户余额</span></div>
      <div class="balance-card">
        <div class="balance-info">
          <svg-icon icon-class="wallet" class="wallet-icon" />
          <span class="balance-text">零钱:<span class="amount">99</span></span>
        </div>
        <div class="component-item">
          <el-button v-waves type="primary" class="action-button">
            充值
          </el-button>
          <el-button v-waves type="primary" class="action-button">
            提现
          </el-button>
        </div>
      </div>
      <div class="balance-card">
        <div class="balance-info">
          <svg-icon icon-class="lock" class="wallet-icon" />
          <span class="balance-text">质押:<span class="amount">99</span></span>
        </div>
        <div class="component-item">
          <el-button v-waves type="primary" class="action-button">
            质押
          </el-button>
          <el-button v-waves type="primary" class="action-button">
            解押
          </el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          role: '',
          introduction: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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

.balance-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.balance-info {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.wallet-icon {
  font-size: 24px;
  color: #409EFF;
  margin-right: 8px;
}

.balance-text {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.amount {
  color: #409EFF;
  font-size: 16px;
  transition: color 0.3s ease;
}

.amount:hover {
  color: #67C23A;
}

.action-button {
  margin-left: 8px;
  height: 32px;
  padding: 6px 12px;
  font-size: 11px;
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.action-button:hover {
  background-color: #66b1ff;
  transform: translateY(-2px);
}

.component-item{
  min-height: 20px;
  display: flex;
  justify-self: space-between;
  align-items: center;
}
</style>
