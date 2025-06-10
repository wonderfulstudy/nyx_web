<template>
  <div class="user-activity">
    <div class="post">
      <div class="user-block">
        <span class="username" style="text-align: center;font-size: 25px;font-weight: bold;">{{ $t("walletView.announcement") }}</span>
      </div>
      <div class="user-images">
        <el-carousel :interval="6000" type="card" height="50px" class="custom-carousel">
          <el-carousel-item v-for="item in announcements" :key="item" class="custom-carousel-item">
            <h1>{{ item }}</h1>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <el-card v-for="(action, index) in actionList" :key="index" class="post" shadow="hover">
      <div class="user-block">
        <img class="img-circle" :src="'https://wpimg.wallstcn.com/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg'">
        <span class="username text-muted">{{ actionName[action.actionId] || '未知操作' }}</span>
        <span class="createdtime">{{ action.createdAt }}</span>
      </div>
      <div class="post-text">{{ action.amount }}</div>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-share" />
            撤销
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <svg-icon icon-class="like" />
            催促
          </span>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import { getActionList } from '@/api/wallet'

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
      actionName: {
        '1': '提现',
        '2': '充值',
        '3': '转账',
        '4': 'POW收益',
        '5': 'POS收益'
      },
      announcements: [
        '每日13点至14点可进行余额提现操作',
        '每次提现操作至少50个代币起',
        '单日提现代笔不得超过2000个',
        '发起提现后请耐心等待处理'
      ],
      actionList: []
    }
  },
  created() {
    this.getActionList()
  },
  methods: {
    getActionList() {
      console.log(this.user.uuid)
      getActionList(this.user.uuid).then(response => {
        this.actionList = response.data
        console.log(this.actionList)
        console.log(response.data)
      }).catch(error => {
        console.log(error)
        this.$message.error('获取钱包信息失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .createdtime {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username{
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }

    .post-text {
      margin: 5px 0 0 50px;
      font-size: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.custom-carousel .el-carousel__item {
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s ease-in-out;
}

/* 激活项显示 */
.custom-carousel .el-carousel__item.is-active {
  visibility: visible;
  opacity: 1;
}
</style>
