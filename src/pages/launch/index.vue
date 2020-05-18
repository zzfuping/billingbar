<template>
  <div class="container">
    <div class="tab-content">
      <div v-show="activeTab == 0">
        <bill-page></bill-page>
      </div>
      <div v-show="activeTab == 1">
        <moments-page></moments-page>
      </div>
      <div v-show="activeTab == 2">
        我的
      </div>
    </div>

    <van-tabbar :active="activeTab">
      <block v-for="(item, tabIndex) in tabs" :key="tabIndex">
        <van-tabbar-item :icon="item.icon" @click="changeTab(tabIndex)">{{item.label}}</van-tabbar-item>
      </block>

      <view class="buttom-btn" @click="createBill">
        <van-icon name="add" size="56px" :color="theme.bgColor" />
      </view>
    </van-tabbar>

  </div>
</template>

<script>
import BillPage from '@pages/bill/index'
import MomentsPage from '@pages/moments/index'

export default {
  components: {
    BillPage,
    MomentsPage,
  },
    data() {
        return {
          theme: {
            color: '#333',
            bgColor: '#FBDCDA',
          },
          activeTab: 0,
          tabs: [
              {index: 0, icon: 'paid', label: '账单'},
              {index: 1, icon: 'user-circle-o', label: '圈子'},
              {index: 2, icon: 'user-o', label: '我的'},
          ]
        }
    },
    methods: {
        changeTab(tabIndex) {
            this.activeTab = tabIndex
        },
        createBill() {
          this.$router.push('/pages/bill/create/main')
        }
    }
}
</script>

<style>
.tab-content {
  min-height: 100vh;
  padding-bottom: 60px;
  background-color: rgb(252, 247, 247);
}
.buttom-btn {
  position: absolute;
  left: calc(50vw - 27px);
  bottom: 50px;
  border-radius: 30px;
  background-color: transparent;
}
</style>