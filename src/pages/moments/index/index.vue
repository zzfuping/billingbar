<template>
  <div class="page">
      <block v-for="(moment, momentIndex) in moments" :key="momentIndex">
          <van-cell :title="moment.name" @click="goDetail(moment)">
              <van-icon slot="right-icon" name="add" size="20" :color="theme.bgColor" @click="addBill" />
          </van-cell>
      </block>

      <div class="bottom-btns"  @click="addMoment">
        <div class="bottom-btn" >
            <van-icon name="plus" size="28" />
        </div>
      </div>
  </div>
</template>

<script>
import { getMomentList } from '@api/moments'

export default {
    props: {
        theme: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            moments: []
        }
    },
    mounted() {
        this.loadMoments()
    },
    computed: {
      theme() {
        return this.$store.state.theme
      }
    },
    methods: {
        loadMoments() {
            let $self = this
            getMomentList().then(res => {
                $self.moments = res.data
            })
        },
        addBill() {
            this.$router.push({path: "/pages/bill/create/main"})
        },
        addMoment() {
            this.$router.push({path: "/pages/moments/create/main"})
        },
        goDetail(moment) {            
            this.$router.push({path: "/pages/moments/info/main", query: { ...moment }})
        }
    }
}
</script>

<style>
.bottom-btns {
    padding: 8px;
    background: #fff;
    text-align: center;
}
.bottom-btn {
    color: #999;
    border: 1px dashed #eaeaea;
    border-radius: 6px;
    padding: 4px;
}
</style>