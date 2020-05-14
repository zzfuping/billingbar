<template>
  <div>
    loading...
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  mounted() {
    this.$router.replace({path: "/pages/launch/main"})
  }
}
</script>

<style scoped>
</style>
