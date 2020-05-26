<template>
  <div class="page">
    <!-- 圈子信息 -->
    <div class="top-bar">
        <van-nav-bar :title="momentInfo.name">
            <van-icon name="weapp-nav" slot="right" size="20" />
        </van-nav-bar>
    </div>

    <van-tabs :active="activeTab" @change="tabChange">
        <van-tab title="账单">
            <!-- 账单列表 -->
            <moment-bill-list :moment-id="momentInfo.id"></moment-bill-list>
        </van-tab>
        <van-tab title="成员">
            <!-- 成员列表 -->
            <moment-member-list :moment-id="momentInfo.id"></moment-member-list>
        </van-tab>
    </van-tabs>

    <!-- 底部按钮 -->
    <div class="buttom-btn">
        <van-button round block
                    v-if="activeTab == 1"
                    open-type="share"
                    :color="theme.bgColor">添加成员</van-button>
        <van-button round block
                    v-else
                    :color="theme.bgColor"
                    @click="createBill">记一笔</van-button>
    </div>
  </div>
</template>

<script>
import momentBillList from '@components/momentBillList'
import momentMemberList from '@components/momentMemberList'


export default {
    components: {
      momentBillList,
      momentMemberList,
    },
    data() {
        return {
            activeTab: 0,
        }
    },
    onShareAppMessage(opts) {
        let $self = this
        let nickName = "浮萍"
        let { id, name } = $self.momentInfo
        return {
            title: `${nickName} 邀请你加入“${name}”, 一起来记账吧`,
            path: `pages/launch/main?mid=${id}`,  // 路径，传递参数到指定页面。
            // imageUrl:'', // 分享的封面图
            success: function (res) {
                console.log("转发成功:", res);
            },
            fail: function (res) {
                console.log("转发失败:", res);
            }
        }
    },
    computed: {
      theme() {
        return this.$store.state.theme
      },
      momentInfo() {
          return this.$route.query
      }
    },
    mounted() {
    },
    methods: {
        tabChange(e) {
            this.activeTab = e.mp.detail.index
        },
        createBill() {
          this.$router.push('/pages/bill/create/main')
        }
    }
}
</script>

<style>
.top-bar {
    --nav-bar-height: 30px;
    --nav-bar-background-color: #FBDCDA;
}

.buttom-btn {
    width: 80%;
    position: absolute;
    left: calc(10vw);
    bottom: 15px;
    border-radius: 30px;
    background-color: transparent;
}
</style>