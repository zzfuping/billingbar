<template>
  <div class="page">
      <van-cell-group>
        <van-field label="圈子名称"
                   placeholder="请输入10个字以内名称"
                   input-align="right"                 
                   :value="formData.name"
                   @change="setName" />
      </van-cell-group>
      <submit-footer>
          <template slot="desc">
              添加圈子后，圈子成员之间可相互查看圈子账单。
          </template>
          <van-button round block :color="theme.bgColor" @click="submitForm">确认添加</van-button>
      </submit-footer>
  </div>
</template>

<script>
import submitFooter from '@components/submitFooter'
import { createMoment } from '@api/moments'

export default {
    data() {
        return {
            formData: {
                name: '',
            }
        }
    },
    components: {
        submitFooter,
    },
    computed: {
      theme() {
        return this.$store.state.theme
      }
    },
    methods: {
        setName(e) {
            this.formData.name = e.mp.detail
        },
        submitForm() {
            let $self = this
            console.log('create data', $self.formData)
            createMoment($self.formData).then(data => {
                $self.$router.back()
            })
        }
    }
}
</script>

<style>

</style>