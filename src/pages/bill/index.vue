<template>
  <div class="page">
    <!-- 账单头部 -->
    <div class="order-summary">
        <van-row>
            <van-col :span="14">
                <span class="order-summary-label">本月支出</span>
                <div class="order-summary-outlay">{{orderSummary.outlay}}</div>
            </van-col>
            <van-col :span="10" class="order-summary-date">
                <van-icon name="calender-o" size="18px" />
            </van-col>
        </van-row>
        <van-row>
            <van-col :span="14">
                <span class="order-summary-label">本月收入</span>
                <span class="order-summary-item">{{orderSummary.income}}</span>
            </van-col>
            <van-col :span="10">
                <span class="order-summary-label">本月结余</span>
                <span><van-icon :name="orderSummary.balance > 0 ? 'upgrade' : 'down'" /></span>
                <span class="order-summary-item">{{orderSummary.balance}}</span>
            </van-col>
        </van-row>
    </div>

    <!-- 账单列表 -->
    <block v-for="(group, groupIndex) in orderSource.rows" :key="groupIndex">
        <div class="order-group">
            <van-cell :border="false" icon="calender-o" class="order-group-title" 
                      :title="group.date">{{order.billType == 'in' ? '收入' : '支出'}} {{group.total}}</van-cell>
            <block v-for="(order, orderIndex) in group.orders" :key="orderIndex">                    
                <van-swipe-cell right-width="65">
                    <van-cell-group :border="false">
                        <van-cell size="large"
                                  :custom-class="'order-group-item-' + order.billType"
                                  :icon="orderTypes[order.type] ? orderTypes[order.type].icon : ''"
                                  :label="order.desc">
                            <span slot="title">{{orderTypes[order.type] ? orderTypes[order.type].name : ''}}</span>
                            <span class="order-item-money">{{order.money}}</span>
                        </van-cell>
                    </van-cell-group>
                    <div slot="right" class="order-delete-btn">
                        <van-button type="danger">删除</van-button>
                    </div>
                </van-swipe-cell>
            </block>
        </div>
    </block>

  </div>
</template>

<script>
import { getAllBookType } from '@api/book'

export default {
    data() {
        return {
            orderTypes: {},
            orderSummary: {},
            orderSource: {
                total: 0,
                page: 1,
                pageSize: 10,
                rows: []
            }
        }
    },
    mounted() {
        this.loadTypes()
        this.loadOrder()
    },
    methods: {
        loadTypes() {
            let $self = this
            // load order types
            getAllBookType().then(data => {
                let types = {}
                data.forEach(item => {
                    types[item.id] = {icon: item.avatorKey, name: item.name}
                })
                $self.orderTypes = types
            })
        },
        loadOrder() {
            let $self = this
            // TODO: load order data
            // params: date range
            $self.orderSummary = {                
                day: new Date(),
                outlay: '1280.0',
                income: '10.0',
                balance: -70.0,
            }
            // params: date range, page, pageSize
            $self.orderSource = {
                total: 10,
                page: 1,
                pageSize: 10,
                rows: [
                    {
                        date: '05月16日', total: '0.00', orders: [
                            {id: 1, type: 26, money: '58.00', billType: 'in', desc: '', group: ''},
                        ]
                    },
                    {
                        date: '05月15日', total: '0.00', orders: [
                            {id: 1, type: 4, money: '18.00', billType: 'in', desc: '', group: ''},
                        ]
                    },
                    {
                        date: '05月14日', total: '78.00', orders: [
                            {id: 1, type: 1, money: '18.00', billType: 'out', desc: '', group: ''},
                            {id: 2, type: 35, money: '60.00', billType: 'out', desc: '4月份', group: ''},
                            {id: 3, type: 3, money: '100.00', billType: 'out', desc: '', group: ''},
                        ]
                    },
                    {
                        date: '05月13日', total: '50.00', orders: [
                            {id: 11, type: 1, money: '40.00', billType: 'out', desc: '地铁充值', group: ''},
                            {id: 12, type: 2, money: '10.00', billType: 'out', desc: '打车', group: ''},
                        ]
                    },
                ]
            }
        }
    }
}
</script>

<style>
.order-summary {
    padding: 8px 12px;
    font-size: 13px;
    color: #333;
    background-color: #FBDCDA;
}
.order-summary-label {
    font-size: 12px;
    margin-right: 4px;
}
.order-summary-outlay {
    padding: 4px 0 8px;
    font-size: 22px;
    font-weight: bold;
}
.order-summary-date {
    text-align: right;
}

.order-group {
    padding-bottom: 6px;
    --cell-icon-size: 28px;
    --cell-large-title-font-size: 14px;
    --cell-large-value-font-size: 20px;
    --cell-large-label-font-size: 11px;
}
.order-group-title {
    --cell-icon-size: 14px;
    --cell-font-size: 11px;
    --cell-vertical-padding: 2px;
    --cell-text-color: #999;
}
.order-group-item-out {
    --cell-value-color: rgb(255, 136, 0);
}
.order-group-item-in {
    --cell-value-color: rgb(72, 204, 60);
}
.order-delete-btn {
    height: 100%;
}
</style>