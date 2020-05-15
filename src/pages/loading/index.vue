<template>
  <div>
    loading...
  </div>
</template>

<script>
import { $login } from '@libs/auth'
import { wxCheckSession } from '@api/wx'

export default {
  data () {
    return {
    }
  },
  mounted() {
    let $self = this
    // 检查登录是否有效，失效则重新登录
    wxCheckSession().then(() => {
        //session_key 未过期，并且在本生命周期一直有效
        $self.toLaunch()
      })
      .catch(() => {
        // session_key 已经失效，需要重新执行登录流程
        $login().then((data) => {
          $self.toLaunch()
        }).catch((err) => {
          console.log('login fail', err)
          $self.toLaunch()
        })
      })
  },
  methods: {
    toLaunch() {
      this.$router.replace({path: "/pages/launch/main"})
    }
  }
}
</script>

<style scoped>
</style>
