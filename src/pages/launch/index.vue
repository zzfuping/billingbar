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
    </van-tabbar>

  </div>
</template>

<script>
import BillPage from '@pages/bill'
import MomentsPage from '@pages/moments/index'

export default {
  components: {
    BillPage,
    MomentsPage,
  },
    data() {
        return {
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
        }
    }
}
</script>

<style>
.tab-content {
  min-height: 100vh;
  background-color: rgb(252, 247, 247);
}
</style>