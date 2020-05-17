<template>
  <div>
      <block v-for="(group, groupIndex) in orderGroups" :key="groupIndex">
        <van-panel class="order-panel" :class="group.totalType"
                   :title="group.date" 
                   :status="group.totalType + ' ' + group.total">
            <view>
                <block v-for="(order, orderIndex) in group.orders" :key="orderIndex">                    
                    <van-swipe-cell right-width="65">
                        <van-cell-group>
                            <van-cell :icon="orderTypes[order.type].icon">
                                <span slot="title">{{orderTypes[order.type].name}}</span>
                                <span class="order-date-money">{{order.money}}</span>
                            </van-cell>
                        </van-cell-group>
                        <div slot="right" class="order-btn-delete">删除</div>
                    </van-swipe-cell>
                </block>
            </view>
        </van-panel>
      </block>
  </div>
</template>

<script>
export default {
    data() {
        return {
            orderTypes: {},
            orderGroups: []
        }
    },
    mounted() {
        this.orderTypes = {
            1: {icon: 'bag', name: '餐饮'},
            2: {icon: 'location-o', name: '交通'}
        }
        this.orderGroups = [
            {
                date: '05月14日', total: '78.00', totalType: '支出', orders: [
                    {id: 1, type: 1, money: '18.00', desc: '', group: ''},
                    {id: 2, type: 2, money: '60.00', desc: '4月份', group: ''},
                ]
            },
            {
                date: '05月13日', total: '50.00', totalType: '支出', orders: [
                    {id: 11, type: 1, money: '40.00', desc: '地铁充值', group: ''},
                    {id: 12, type: 2, money: '10.00', desc: '打车', group: ''},
                ]
            },
        ]
    }
}
</script>

<style>
.order-panel {
    margin: 4px 0;
}
.order-btn-delete {
    width: 100%;
    height: 100%;
    color: #fff;
    background-color: #e45340;
}
</style>