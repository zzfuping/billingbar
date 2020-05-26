<template>
    <div class="moment-bill-list">
        <van-collapse :value="activeNames" @change="collapseChange">
            <block v-for="(group, groupIndex) in orderSource.rows" :key="groupIndex">
                <van-collapse-item icon="calender-o" :name="groupIndex">
                    <van-row slot="title" class="order-group-title">
                        <van-col :span="9">{{group.month}}</van-col>
                        <van-col :span="5" class="order-total-out">{{group.out_total}}</van-col>
                        <van-col :span="5" class="order-total-in">{{group.in_total}}</van-col>
                        <van-col :span="5">{{group.total}}</van-col>
                    </van-row>
                    <div class="order-group-body">
                        <block v-for="(order, orderIndex) in group.orders" :key="orderIndex">                    
                            <van-swipe-cell right-width="65">
                                <van-cell-group :border="false">
                                    <van-cell size="large"
                                            :custom-class="'order-item-' + order.billType"
                                            :icon="orderTypes[order.type] ? orderTypes[order.type].icon : ''"
                                            :label="order.desc">
                                        <div slot="title" class="order-item-title">
                                            <span>{{orderTypes[order.type] ? orderTypes[order.type].name : ''}}</span>
                                            <van-tag round plain :color="theme.color">{{order.repoter}}</van-tag>
                                        </div>
                                        <span class="order-item-money">{{order.money}}</span>
                                        <div class="order-item-desc">{{order.date}}</div>
                                    </van-cell>
                                </van-cell-group>
                                <div slot="right" class="order-delete-btn">
                                    <van-button type="danger">删除</van-button>
                                </div>
                            </van-swipe-cell>
                        </block>
                    </div>
                </van-collapse-item>
            </block>
        </van-collapse>
    </div>
</template>

<script>
import { getAllBookType } from '@api/book'

export default {
    props: ['momentId'],
    data() {
        return {
            activeNames: [],
            orderTypes: {},
            orderSource: {
                total: 0,
                page: 1,
                pageSize: 10,
                rows: []
            }
        }
    },
    computed: {
      theme() {
        return this.$store.state.theme
      }
    },
    mounted() {
        let $self = this
        $self.loadTypes()
        $self.loadOrders()
    },
    methods: {        
        loadTypes() {
            let $self = this
            // load order types
            getAllBookType().then(req => {
                let types = {}
                req.data.forEach(item => {
                    types[item.id] = {icon: item.avatorKey, name: item.name}
                })
                $self.orderTypes = types
            })
        },
        loadOrders() {
            let $self = this
            // TODO: params: date range, page, pageSize
            $self.orderSource = {
                total: 10,
                page: 1,
                pageSize: 10,
                rows: [
                    {
                        month: '2020年05月', total: '-142.00', out_total: '160.00', in_total: '18.00', orders: [
                            {id: 1, date: '05月16日', repoter: '浮萍', type: 1, money: '18.00', billType: 'in', desc: ''},
                            {id: 2, date: '05月15日', repoter: '微雨红尘', type: 35, money: '60.00', billType: 'out', desc: '4月份'},
                            {id: 3, date: '05月15日', repoter: '浮萍', type: 3, money: '100.00', billType: 'out', desc: ''},
                        ]
                    },
                    {
                        month: '2020年04月', total: '-50.00', out_total: '50.00', in_total: '0.0', orders: [
                            {id: 11, date: '04月16日', repoter: '微雨红尘',  type: 1, money: '40.00', billType: 'out', desc: '地铁充值'},
                            {id: 12, date: '04月13日', repoter: '浮萍',  type: 2, money: '10.00', billType: 'out', desc: '打车'},
                        ]
                    },
                ]
            }
            $self.activeNames = [0, 1]
        },
        collapseChange(e) {
            this.activeNames = e.mp.detail
        },
    }
}
</script>

<style>
.van-collapse-item {
    margin-bottom: 6px;
}
.moment-bill-list {
    --collapse-item-content-padding: 0;
    --collapse-item-content-line-height: 1;
    --collapse-item-content-font-size: 16px;
    --collapse-item-content-background-color: rgb(252, 247, 247);
}
.order-group-title {
    color: #999;
    font-size: 14px;
}
.order-group-title .div:not(:first-child) {
    text-align: center;
}
.order-total-out {
    color: rgb(255, 136, 0);
}
.order-total-in {
    color: rgb(72, 204, 60);
}
.order-group-body {
    --cell-icon-size: 28px;
    --cell-large-title-font-size: 16px;
    --cell-large-value-font-size: 20px;
    --cell-large-label-font-size: 12px;
    --cell-large-vertical-padding: 6px;
}
.order-item-title > span {
    margin-right: 6px;
}
.order-item-out {
    --cell-value-color: rgb(255, 136, 0);
}
.order-item-in, .order-total-in {
    --cell-value-color: rgb(72, 204, 60);
}
.order-item-desc {
    color: #999;
    font-size: 12px;
}
.order-delete-btn {
    height: 100%;
}
</style>