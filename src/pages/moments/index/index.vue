<template>
  <div class="page">
      <block v-for="(moment, momentIndex) in moments" :key="momentIndex">
          <van-cell :title="moment.name">
              <van-icon slot="right-icon" name="add" color="orange" size="20" />
          </van-cell>
      </block>

      <div class="footer-btn">
        <van-button round block size="large" icon="plus" @click="addMoment"></van-button>
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
    methods: {
        loadMoments() {
            let $self = this
            getMomentList().then(res => {
                $self.moments = res.data
                $self.moments.push({
                    id: 2,
                    avatorKey: 'aim',
                    name: '测试圈子'
                })
            })
        },
        addMoment() {
            this.$router.push({path: "/pages/moments/create/main"})
        }
    }
}
</script>

<style>
.footer-btn {
    padding: 8px;
    background: #fff;
    --button-round-border-radius: 8px;
}
</style>